import * as cdk from 'aws-cdk-lib';

import { Construct } from 'constructs';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import getConfig from "../../config"
import { Cors, LambdaIntegration, RestApi } from 'aws-cdk-lib/aws-apigateway';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import { DatabaseInstance } from 'aws-cdk-lib/aws-rds';
import { SecurityGroup, Vpc } from 'aws-cdk-lib/aws-ec2';

const config = getConfig();

export class NestDeploymentStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const lambdaSG = SecurityGroup.fromLookupById(this, "nest-lambda-sg", config.RESOURCES.NEST_LAMBDA_SG_ID);
    const rdsSG = SecurityGroup.fromLookupById(this, "rds-nest-lambda-sg", config.RESOURCES.RDS_LAMBDA_SG_ID);

    const vpc = Vpc.fromLookup(this, 'vpc', {
      vpcId: config.RESOURCES.VPC_ID
    })

    const dbInstance = DatabaseInstance.fromDatabaseInstanceAttributes(
      this,
      'db-1-instance',
      {
        instanceEndpointAddress: config.DATABASE.DB_HOST,
        instanceIdentifier: config.DATABASE.DB_NAME,
        instanceResourceId: config.DATABASE.DB_RESOURCE_ID,
        port: Number(config.DATABASE.DB_PORT),
        securityGroups: [rdsSG]
      },
    );

    const nestLambda = new NodejsFunction(this, 'NestLambda', {
      runtime: lambda.Runtime.NODEJS_18_X,
      handler: 'main.handler',
      code: lambda.Code.fromAsset("../dist"),
      timeout: cdk.Duration.seconds(10),
      securityGroups: [lambdaSG],
      vpc,
      allowPublicSubnet: true,
      environment: {
        DB_HOST: config.DATABASE.DB_HOST,
        DB_PORT: config.DATABASE.DB_PORT,
        DB_NAME: config.DATABASE.DB_NAME,
        DB_USER: config.DATABASE.DB_USER,
        DB_PASSWORD: config.DATABASE.DB_PASSWORD,
      }
    });

    dbInstance.grantConnect(nestLambda, config.DATABASE.DB_NAME);

    const api = new RestApi(this, "NestLambdaApi", {
      deploy: true,
      defaultCorsPreflightOptions: {
        allowOrigins: Cors.ALL_ORIGINS,
        allowMethods: Cors.ALL_METHODS,
        allowHeaders: Cors.DEFAULT_HEADERS,
      }
    });
  
    api.root.addProxy({
        defaultIntegration: new LambdaIntegration(nestLambda, { proxy: true }),
    });

    new cdk.CfnOutput(this, "NestLambdaApiUrl", {
      value: api.url,
    });
  }
}

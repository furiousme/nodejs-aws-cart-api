import * as cdk from 'aws-cdk-lib';

import { Construct } from 'constructs';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import getConfig from "../../config"
import { LambdaIntegration, RestApi } from 'aws-cdk-lib/aws-apigateway';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';

const config = getConfig();

export class NestDeploymentStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const nestLambda = new NodejsFunction(this, 'NestLambda', {
      runtime: lambda.Runtime.NODEJS_18_X,
      handler: 'main.handler',
      code: lambda.Code.fromAsset("../dist"),
      environment: {
        HOST: config.DATABASE.DB_HOST,
        PORT: config.DATABASE.DB_PORT,
        DB_USER: config.DATABASE.DB_USER,
        BB_PASSWORD: config.DATABASE.DB_PASSWORD,
      }
    });

    const api = new RestApi(this, "NestLambdaApi", {
      deploy: true,
    });
  
    api.root.addProxy({
        defaultIntegration: new LambdaIntegration(nestLambda, { proxy: true }),
    });

    new cdk.CfnOutput(this, "NestLambdaApiUrl", {
      value: api.url,
    });
  }
}

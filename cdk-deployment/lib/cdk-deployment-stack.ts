import * as cdk from 'aws-cdk-lib';

import { Construct } from 'constructs';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import config from "../../config"
import { LambdaIntegration, RestApi } from 'aws-cdk-lib/aws-apigateway';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import { join } from 'node:path';

export class NestDeploymentStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const nestLambda = new NodejsFunction(this, 'NestLambda', {
      runtime: lambda.Runtime.NODEJS_18_X,
      handler: 'main.handler',
      code: lambda.Code.fromAsset("../dist"),
      environment: {
        DB_USER: config.DB_USER || "",
        BB_PASSWORD: config.DB_PASSWORD || ""
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

import * as dotenv from 'dotenv';
import * as path from 'node:path';

dotenv.config({ path: path.resolve(__dirname, ".env") });

export default () => ({
    DATABASE: {
      DB_NAME: process.env.DB_NAME || "",
      DB_HOST: process.env.DB_HOST || "",
      DB_PORT: process.env.DB_PORT || "5432",
      DB_RESOURCE_ID: process.env.DB_RESOURCE_ID || "",
      DB_USER: process.env.DB_USER || "",
      DB_PASSWORD: process.env.DB_PASSWORD || ""
    },
    ACCOUNT: {
      ID: process.env.ACCOUNT_ID,
      REGION: process.env.ACCOUNT_REGION
    },
    RESOURCES: {
      NEST_LAMBDA_SG_ID: process.env.NEST_LAMBDA_SG_ID || "",
      RDS_LAMBDA_SG_ID: process.env.RDS_LAMBDA_SG_ID || "",
      VPC_ID: process.env.VPC_ID || ""
    }
});
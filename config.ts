import * as dotenv from "dotenv";
import * as path from "node:path";

dotenv.config({ path: path.resolve(__dirname, ".env") });

export default {
    DB_LOGIN: process.env.DB_LOGIN,
    DB_PASSWORD: process.env.DB_PASSWORD
}
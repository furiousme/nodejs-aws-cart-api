import { DataSource } from "typeorm";
import configuration from "../config";
import { join } from "node:path";

const config = configuration();

export const dbConfig = {
  type: 'postgres' as const,
  host: config.DATABASE.DB_HOST,
  port:  Number(config.DATABASE.DB_PORT),
  username:  config.DATABASE.DB_USER,
  password:  config.DATABASE.DB_PASSWORD,
  database: config.DATABASE.DB_NAME,
  entities: [join(__dirname, '**', '*.entity.{ts,js}')],
  migrations: ["dist/migrations/*.js"],
  migrationsRun: false,
  ssl: false,
  extra: {
    ssl: {
      rejectUnauthorized: false
    },
  },
  synchronize: false,
}

export default new DataSource(dbConfig);
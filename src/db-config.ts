import { DataSource } from "typeorm";
import configuration from "../config";
import { join } from "node:path";
import { CartItem } from "./cart/entities/cart-item.entity";
import { Cart } from "./cart/entities/cart.entity";

const config = configuration();

export const dbConfig = {
  type: 'postgres' as const,
  host: config.DATABASE.DB_HOST,
  port:  Number(config.DATABASE.DB_PORT),
  username:  config.DATABASE.DB_USER,
  password:  config.DATABASE.DB_PASSWORD,
  database: config.DATABASE.DB_NAME,
  entities: [Cart, CartItem],
  migrations: [join(__dirname, "src", "migrations", '*.{ts,js}')],
  migrationsRun: false,
  logging: true,
  ssl: false,
  extra: {
    ssl: {
      rejectUnauthorized: false
    },
  },
  synchronize: false,
}

export default new DataSource(dbConfig);
import { DataSource } from "typeorm";
import { join } from "node:path";
import { CartItem } from "./cart/entities/cart-item.entity";
import { Cart } from "./cart/entities/cart.entity";

import * as dotenv from "dotenv";

dotenv.config();

export const dbConfig = {
  type: 'postgres' as const,
  host: process.env.DB_HOST,
  port:  Number(process.env.DB_PORT || "5432"),
  username:  process.env.DB_USER,
  password:  process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
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
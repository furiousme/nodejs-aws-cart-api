CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TYPE statuses AS ENUM ('OPEN', 'ORDERED');

CREATE TABLE IF NOT EXISTS carts (
 id uuid NOT NULL DEFAULT uuid_generate_v4() PRIMARY KEY,
 user_id uuid NOT NULL,
 created_at timestamp DEFAULT now() NOT NULL,
 updated_at timestamp DEFAULT now() NOT NULL,
 status statuses
)

CREATE TABLE IF NOT EXISTS cart_items (
 cart_id uuid NOT NULL REFERENCES carts(id),
 product_id uuid NOT NULL,
 count integer NOT NULL
)

INSERT INTO carts (id, user_id, created_at, updated_at, status) VALUES
('b39e1d52-9e8a-438a-8c9b-9c1f2a7ef7b3', 'e7b0b25e-8d47-4ae2-a1f4-6f46a773f9cf', '2024-07-01', '2024-07-01', 'OPEN'),
('e63b77d3-5f59-4c69-9a14-dfb0ae90f7b3', 'a4b1f60e-5b8d-4c25-b4c2-6e90a6b6c16a', '2024-07-01', '2024-07-01', 'ORDERED'),
('c12e1a97-ff5a-4d99-9c50-9fb4e7d2d7b3', 'd3a0b78e-1e7a-4e92-a9c7-5c4a7e9b7e3c', '2024-07-01', '2024-07-01', 'OPEN'),
('d47a1f84-8e3c-4d99-8f9a-9f3e4e7d7e4d', 'f4b1e70e-2c4e-4d25-b5c3-6e90a7b7d16b', '2024-07-01', '2024-07-01', 'ORDERED'),
('e58b27d3-5e69-4c79-9b24-dfb1af90e8b4', 'a5b2e70e-5b9d-4d35-b5c3-7e91b6b7c26c', '2024-07-01', '2024-07-01', 'OPEN');

INSERT INTO cart_items (cart_id, product_id, count) VALUES
('b39e1d52-9e8a-438a-8c9b-9c1f2a7ef7b3', '88e2bfe8-f1fe-457c-87ba-15a36fffd965', 2),
('b39e1d52-9e8a-438a-8c9b-9c1f2a7ef7b3', '53ab0bd2-284b-4afc-8f44-69b81b9693b2', 3),
('e63b77d3-5f59-4c69-9a14-dfb0ae90f7b3', '8772096c-2016-4345-85c7-55e44ebe52a0', 1),
('c12e1a97-ff5a-4d99-9c50-9fb4e7d2d7b3', '97818a62-0463-4fbc-9573-76b5699f38f8', 2),
('c12e1a97-ff5a-4d99-9c50-9fb4e7d2d7b3', 'fedf589b-bd66-4444-b2b5-76ea46f7fd0c', 1),
('d47a1f84-8e3c-4d99-8f9a-9f3e4e7d7e4d', '298e75b7-f9f6-4a4e-bf32-070aaa7a6332', 1),
('d47a1f84-8e3c-4d99-8f9a-9f3e4e7d7e4d', '591ae431-611c-49bf-b7d0-49c602050851', 1),
('e58b27d3-5e69-4c79-9b24-dfb1af90e8b4', '52e02bb4-8318-446a-97a7-cfa676247078', 2),
('e58b27d3-5e69-4c79-9b24-dfb1af90e8b4', '4b68efa1-8608-4744-b6bb-d5e339ce6ef5', 1);

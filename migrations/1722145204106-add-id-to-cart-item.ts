import { MigrationInterface, QueryRunner } from "typeorm";

export class AddIdToCartItem1722145204106 implements MigrationInterface {
    name = 'AddIdToCartItem1722145204106'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cart_items" DROP CONSTRAINT "cart_items_cart_id_fkey"`);
        await queryRunner.query(`ALTER TABLE "cart_items" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "cart_items" ADD CONSTRAINT "PK_6fccf5ec03c172d27a28a82928b" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "carts" DROP COLUMN "user_id"`);
        await queryRunner.query(`ALTER TABLE "carts" ADD "user_id" character varying NOT NULL`);
        await queryRunner.query(`ALTER TYPE "public"."statuses" RENAME TO "statuses_old"`);
        await queryRunner.query(`CREATE TYPE "public"."carts_status_enum" AS ENUM('OPEN', 'ORDERED')`);
        await queryRunner.query(`ALTER TABLE "carts" ALTER COLUMN "status" TYPE "public"."carts_status_enum" USING "status"::"text"::"public"."carts_status_enum"`);
        await queryRunner.query(`DROP TYPE "public"."statuses_old"`);
        await queryRunner.query(`ALTER TABLE "carts" ALTER COLUMN "status" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "carts" ALTER COLUMN "created_at" SET DEFAULT ('now'::text)::timestamp(6) with time zone`);
        await queryRunner.query(`ALTER TABLE "carts" ALTER COLUMN "updated_at" SET DEFAULT ('now'::text)::timestamp(6) with time zone`);
        await queryRunner.query(`ALTER TABLE "cart_items" DROP COLUMN "product_id"`);
        await queryRunner.query(`ALTER TABLE "cart_items" ADD "product_id" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "cart_items" ADD CONSTRAINT "FK_6385a745d9e12a89b859bb25623" FOREIGN KEY ("cart_id") REFERENCES "carts"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cart_items" DROP CONSTRAINT "FK_6385a745d9e12a89b859bb25623"`);
        await queryRunner.query(`ALTER TABLE "cart_items" DROP COLUMN "product_id"`);
        await queryRunner.query(`ALTER TABLE "cart_items" ADD "product_id" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "carts" ALTER COLUMN "updated_at" SET DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "carts" ALTER COLUMN "created_at" SET DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "carts" ALTER COLUMN "status" DROP NOT NULL`);
        await queryRunner.query(`CREATE TYPE "public"."statuses_old" AS ENUM('OPEN', 'ORDERED')`);
        await queryRunner.query(`ALTER TABLE "carts" ALTER COLUMN "status" TYPE "public"."statuses_old" USING "status"::"text"::"public"."statuses_old"`);
        await queryRunner.query(`DROP TYPE "public"."carts_status_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."statuses_old" RENAME TO "statuses"`);
        await queryRunner.query(`ALTER TABLE "carts" DROP COLUMN "user_id"`);
        await queryRunner.query(`ALTER TABLE "carts" ADD "user_id" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "cart_items" DROP CONSTRAINT "PK_6fccf5ec03c172d27a28a82928b"`);
        await queryRunner.query(`ALTER TABLE "cart_items" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "cart_items" ADD CONSTRAINT "cart_items_cart_id_fkey" FOREIGN KEY ("cart_id") REFERENCES "carts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}

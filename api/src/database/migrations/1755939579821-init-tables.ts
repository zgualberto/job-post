import { MigrationInterface, QueryRunner } from "typeorm";

export class InitTables1755939579821 implements MigrationInterface {
    name = 'InitTables1755939579821'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "moderators" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "email" varchar NOT NULL, "otp" integer)`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_41963736910afe3212bbd42390" ON "moderators" ("email") `);
        await queryRunner.query(`CREATE TABLE "job_ads" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "is_external" boolean NOT NULL DEFAULT (0), "external_name" varchar(255) NOT NULL DEFAULT ('system'), "external_id" bigint NOT NULL, "job_ad_action" integer NOT NULL DEFAULT (1), "metadata" text NOT NULL, CONSTRAINT "UQ_0c2e2cf79152a1ce1fb986fd983" UNIQUE ("external_id", "external_name"))`);
        await queryRunner.query(`CREATE TABLE "job_ad_actions" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar(255) NOT NULL)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "job_ad_actions"`);
        await queryRunner.query(`DROP TABLE "job_ads"`);
        await queryRunner.query(`DROP INDEX "IDX_41963736910afe3212bbd42390"`);
        await queryRunner.query(`DROP TABLE "moderators"`);
    }

}

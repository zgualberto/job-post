import { MigrationInterface, QueryRunner } from "typeorm";

export class AddNullablesAndOtherRelevantFieldsJobAdTable1756023324327 implements MigrationInterface {
    name = 'AddNullablesAndOtherRelevantFieldsJobAdTable1756023324327'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "temporary_job_ads" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "is_external" boolean NOT NULL DEFAULT (0), "external_name" varchar(255) NOT NULL DEFAULT ('system'), "external_id" bigint NOT NULL, "metadata" text NOT NULL, "name" varchar(255) NOT NULL, "office" varchar(255) NOT NULL, "job_ad_action_id" integer NOT NULL DEFAULT (2), "email" varchar(255), "token" varchar(255), CONSTRAINT "UQ_0c2e2cf79152a1ce1fb986fd983" UNIQUE ("external_id", "external_name"))`);
        await queryRunner.query(`INSERT INTO "temporary_job_ads"("id", "is_external", "external_name", "external_id", "metadata", "name", "office", "job_ad_action_id", "email") SELECT "id", "is_external", "external_name", "external_id", "metadata", "name", "office", "job_ad_action_id", "email" FROM "job_ads"`);
        await queryRunner.query(`DROP TABLE "job_ads"`);
        await queryRunner.query(`ALTER TABLE "temporary_job_ads" RENAME TO "job_ads"`);
        await queryRunner.query(`CREATE TABLE "temporary_job_ads" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "is_external" boolean NOT NULL DEFAULT (0), "external_name" varchar(255) NOT NULL DEFAULT ('system'), "external_id" bigint NOT NULL, "metadata" text NOT NULL, "name" varchar(255) NOT NULL, "office" varchar(255) NOT NULL, "job_ad_action_id" integer NOT NULL DEFAULT (2), "email" varchar(255), "token" varchar(255))`);
        await queryRunner.query(`INSERT INTO "temporary_job_ads"("id", "is_external", "external_name", "external_id", "metadata", "name", "office", "job_ad_action_id", "email", "token") SELECT "id", "is_external", "external_name", "external_id", "metadata", "name", "office", "job_ad_action_id", "email", "token" FROM "job_ads"`);
        await queryRunner.query(`DROP TABLE "job_ads"`);
        await queryRunner.query(`ALTER TABLE "temporary_job_ads" RENAME TO "job_ads"`);
        await queryRunner.query(`CREATE TABLE "temporary_job_ads" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "is_external" boolean NOT NULL DEFAULT (0), "external_name" varchar(255) NOT NULL DEFAULT ('system'), "external_id" varchar(255), "metadata" text, "name" varchar(255) NOT NULL, "office" varchar(255), "job_ad_action_id" integer NOT NULL DEFAULT (2), "email" varchar(255), "token" varchar(255))`);
        await queryRunner.query(`INSERT INTO "temporary_job_ads"("id", "is_external", "external_name", "external_id", "metadata", "name", "office", "job_ad_action_id", "email", "token") SELECT "id", "is_external", "external_name", "external_id", "metadata", "name", "office", "job_ad_action_id", "email", "token" FROM "job_ads"`);
        await queryRunner.query(`DROP TABLE "job_ads"`);
        await queryRunner.query(`ALTER TABLE "temporary_job_ads" RENAME TO "job_ads"`);
        await queryRunner.query(`CREATE TABLE "temporary_job_ads" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "is_external" boolean NOT NULL DEFAULT (0), "external_name" varchar(255) NOT NULL DEFAULT ('system'), "external_id" varchar(255), "metadata" text, "name" varchar(255) NOT NULL, "office" varchar(255), "job_ad_action_id" integer NOT NULL DEFAULT (2), "email" varchar(255), "token" varchar(255), CONSTRAINT "UQ_0c2e2cf79152a1ce1fb986fd983" UNIQUE ("external_id", "external_name"))`);
        await queryRunner.query(`INSERT INTO "temporary_job_ads"("id", "is_external", "external_name", "external_id", "metadata", "name", "office", "job_ad_action_id", "email", "token") SELECT "id", "is_external", "external_name", "external_id", "metadata", "name", "office", "job_ad_action_id", "email", "token" FROM "job_ads"`);
        await queryRunner.query(`DROP TABLE "job_ads"`);
        await queryRunner.query(`ALTER TABLE "temporary_job_ads" RENAME TO "job_ads"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "job_ads" RENAME TO "temporary_job_ads"`);
        await queryRunner.query(`CREATE TABLE "job_ads" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "is_external" boolean NOT NULL DEFAULT (0), "external_name" varchar(255) NOT NULL DEFAULT ('system'), "external_id" varchar(255), "metadata" text, "name" varchar(255) NOT NULL, "office" varchar(255), "job_ad_action_id" integer NOT NULL DEFAULT (2), "email" varchar(255), "token" varchar(255))`);
        await queryRunner.query(`INSERT INTO "job_ads"("id", "is_external", "external_name", "external_id", "metadata", "name", "office", "job_ad_action_id", "email", "token") SELECT "id", "is_external", "external_name", "external_id", "metadata", "name", "office", "job_ad_action_id", "email", "token" FROM "temporary_job_ads"`);
        await queryRunner.query(`DROP TABLE "temporary_job_ads"`);
        await queryRunner.query(`ALTER TABLE "job_ads" RENAME TO "temporary_job_ads"`);
        await queryRunner.query(`CREATE TABLE "job_ads" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "is_external" boolean NOT NULL DEFAULT (0), "external_name" varchar(255) NOT NULL DEFAULT ('system'), "external_id" bigint NOT NULL, "metadata" text NOT NULL, "name" varchar(255) NOT NULL, "office" varchar(255) NOT NULL, "job_ad_action_id" integer NOT NULL DEFAULT (2), "email" varchar(255), "token" varchar(255))`);
        await queryRunner.query(`INSERT INTO "job_ads"("id", "is_external", "external_name", "external_id", "metadata", "name", "office", "job_ad_action_id", "email", "token") SELECT "id", "is_external", "external_name", "external_id", "metadata", "name", "office", "job_ad_action_id", "email", "token" FROM "temporary_job_ads"`);
        await queryRunner.query(`DROP TABLE "temporary_job_ads"`);
        await queryRunner.query(`ALTER TABLE "job_ads" RENAME TO "temporary_job_ads"`);
        await queryRunner.query(`CREATE TABLE "job_ads" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "is_external" boolean NOT NULL DEFAULT (0), "external_name" varchar(255) NOT NULL DEFAULT ('system'), "external_id" bigint NOT NULL, "metadata" text NOT NULL, "name" varchar(255) NOT NULL, "office" varchar(255) NOT NULL, "job_ad_action_id" integer NOT NULL DEFAULT (2), "email" varchar(255), "token" varchar(255), CONSTRAINT "UQ_0c2e2cf79152a1ce1fb986fd983" UNIQUE ("external_id", "external_name"))`);
        await queryRunner.query(`INSERT INTO "job_ads"("id", "is_external", "external_name", "external_id", "metadata", "name", "office", "job_ad_action_id", "email", "token") SELECT "id", "is_external", "external_name", "external_id", "metadata", "name", "office", "job_ad_action_id", "email", "token" FROM "temporary_job_ads"`);
        await queryRunner.query(`DROP TABLE "temporary_job_ads"`);
        await queryRunner.query(`ALTER TABLE "job_ads" RENAME TO "temporary_job_ads"`);
        await queryRunner.query(`CREATE TABLE "job_ads" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "is_external" boolean NOT NULL DEFAULT (0), "external_name" varchar(255) NOT NULL DEFAULT ('system'), "external_id" bigint NOT NULL, "metadata" text NOT NULL, "name" varchar(255) NOT NULL, "office" varchar(255) NOT NULL, "job_ad_action_id" integer NOT NULL DEFAULT (2), "email" varchar(255), CONSTRAINT "UQ_0c2e2cf79152a1ce1fb986fd983" UNIQUE ("external_id", "external_name"))`);
        await queryRunner.query(`INSERT INTO "job_ads"("id", "is_external", "external_name", "external_id", "metadata", "name", "office", "job_ad_action_id", "email") SELECT "id", "is_external", "external_name", "external_id", "metadata", "name", "office", "job_ad_action_id", "email" FROM "temporary_job_ads"`);
        await queryRunner.query(`DROP TABLE "temporary_job_ads"`);
    }

}

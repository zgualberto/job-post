import { MigrationInterface, QueryRunner } from "typeorm";

export class JobAdUpdates1755946410328 implements MigrationInterface {
    name = 'JobAdUpdates1755946410328'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "temporary_job_ads" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "is_external" boolean NOT NULL DEFAULT (0), "external_name" varchar(255) NOT NULL DEFAULT ('system'), "external_id" bigint NOT NULL, "metadata" text NOT NULL, CONSTRAINT "UQ_0c2e2cf79152a1ce1fb986fd983" UNIQUE ("external_id", "external_name"))`);
        await queryRunner.query(`INSERT INTO "temporary_job_ads"("id", "is_external", "external_name", "external_id", "metadata") SELECT "id", "is_external", "external_name", "external_id", "metadata" FROM "job_ads"`);
        await queryRunner.query(`DROP TABLE "job_ads"`);
        await queryRunner.query(`ALTER TABLE "temporary_job_ads" RENAME TO "job_ads"`);
        await queryRunner.query(`CREATE TABLE "temporary_job_ads" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "is_external" boolean NOT NULL DEFAULT (0), "external_name" varchar(255) NOT NULL DEFAULT ('system'), "external_id" bigint NOT NULL, "metadata" text NOT NULL, "name" varchar(255) NOT NULL, "office" varchar(255) NOT NULL, "job_ad_action_id" integer NOT NULL DEFAULT (1), CONSTRAINT "UQ_0c2e2cf79152a1ce1fb986fd983" UNIQUE ("external_id", "external_name"))`);
        await queryRunner.query(`INSERT INTO "temporary_job_ads"("id", "is_external", "external_name", "external_id", "metadata") SELECT "id", "is_external", "external_name", "external_id", "metadata" FROM "job_ads"`);
        await queryRunner.query(`DROP TABLE "job_ads"`);
        await queryRunner.query(`ALTER TABLE "temporary_job_ads" RENAME TO "job_ads"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "job_ads" RENAME TO "temporary_job_ads"`);
        await queryRunner.query(`CREATE TABLE "job_ads" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "is_external" boolean NOT NULL DEFAULT (0), "external_name" varchar(255) NOT NULL DEFAULT ('system'), "external_id" bigint NOT NULL, "metadata" text NOT NULL, CONSTRAINT "UQ_0c2e2cf79152a1ce1fb986fd983" UNIQUE ("external_id", "external_name"))`);
        await queryRunner.query(`INSERT INTO "job_ads"("id", "is_external", "external_name", "external_id", "metadata") SELECT "id", "is_external", "external_name", "external_id", "metadata" FROM "temporary_job_ads"`);
        await queryRunner.query(`DROP TABLE "temporary_job_ads"`);
        await queryRunner.query(`ALTER TABLE "job_ads" RENAME TO "temporary_job_ads"`);
        await queryRunner.query(`CREATE TABLE "job_ads" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "is_external" boolean NOT NULL DEFAULT (0), "external_name" varchar(255) NOT NULL DEFAULT ('system'), "external_id" bigint NOT NULL, "job_ad_action" integer NOT NULL DEFAULT (1), "metadata" text NOT NULL, CONSTRAINT "UQ_0c2e2cf79152a1ce1fb986fd983" UNIQUE ("external_id", "external_name"))`);
        await queryRunner.query(`INSERT INTO "job_ads"("id", "is_external", "external_name", "external_id", "metadata") SELECT "id", "is_external", "external_name", "external_id", "metadata" FROM "temporary_job_ads"`);
        await queryRunner.query(`DROP TABLE "temporary_job_ads"`);
    }

}

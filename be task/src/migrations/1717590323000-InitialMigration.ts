import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1717590323000 implements MigrationInterface {
    name = 'InitialMigration1717590323000'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "user" (
                "id" SERIAL NOT NULL,
                "name" character varying NOT NULL,
                "username" character varying NOT NULL,
                "email" character varying NOT NULL,
                "address" jsonb NOT NULL,
                "phone" character varying NOT NULL,
                "website" character varying NOT NULL,
                "company" jsonb NOT NULL,
                CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id")
            )
        `);
        
        await queryRunner.query(`
            CREATE TABLE "auth" (
                "id" SERIAL NOT NULL,
                "name" character varying NOT NULL,
                "email" character varying NOT NULL,
                "password_hash" character varying NOT NULL,
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "UQ_b54f616411ef3824f6a5c06ea46" UNIQUE ("email"),
                CONSTRAINT "PK_7e416cf6172bc5aec04244f6459" PRIMARY KEY ("id")
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "auth"`);
        await queryRunner.query(`DROP TABLE "user"`);
    }
}

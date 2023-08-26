import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTables1693071255389 implements MigrationInterface {
    name = 'CreateTables1693071255389'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "menu" DROP COLUMN "nameTag"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "menu" ADD "nameTag" character varying(255) NOT NULL`);
    }

}

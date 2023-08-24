import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateRole1692897152098 implements MigrationInterface {
    name = 'UpdateRole1692897152098'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "permission" DROP COLUMN "deletedAt"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "permission" ADD "deletedAt" TIMESTAMP`);
    }

}

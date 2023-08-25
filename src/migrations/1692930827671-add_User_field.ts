import { MigrationInterface, QueryRunner } from "typeorm";

export class AddUserField1692930827671 implements MigrationInterface {
    name = 'AddUserField1692930827671'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "isRegisteredWithGoogle" boolean NOT NULL DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "isRegisteredWithGoogle"`);
    }

}

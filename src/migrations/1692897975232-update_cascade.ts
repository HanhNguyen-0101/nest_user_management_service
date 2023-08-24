import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateCascade1692897975232 implements MigrationInterface {
    name = 'UpdateCascade1692897975232'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "menu" DROP CONSTRAINT "FK_23ac1b81a7bfb85b14e86bd23a5"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_a19025a009be58684a63961aaf3"`);
        await queryRunner.query(`ALTER TABLE "role" DROP CONSTRAINT "FK_64a1786ac86cd459077a53f411f"`);
        await queryRunner.query(`ALTER TABLE "role" DROP CONSTRAINT "FK_17be5172ac2f4c67687a2e7c67d"`);
        await queryRunner.query(`ALTER TABLE "permission" DROP CONSTRAINT "FK_29b093b202d3ae3e37438ce158c"`);
        await queryRunner.query(`ALTER TABLE "menu" ADD CONSTRAINT "FK_23ac1b81a7bfb85b14e86bd23a5" FOREIGN KEY ("parentId") REFERENCES "menu"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_a19025a009be58684a63961aaf3" FOREIGN KEY ("updatedBy") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "role" ADD CONSTRAINT "FK_64a1786ac86cd459077a53f411f" FOREIGN KEY ("updatedBy") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "role" ADD CONSTRAINT "FK_17be5172ac2f4c67687a2e7c67d" FOREIGN KEY ("createdBy") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "permission" ADD CONSTRAINT "FK_29b093b202d3ae3e37438ce158c" FOREIGN KEY ("permissionGroupId") REFERENCES "permission_group"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "permission" DROP CONSTRAINT "FK_29b093b202d3ae3e37438ce158c"`);
        await queryRunner.query(`ALTER TABLE "role" DROP CONSTRAINT "FK_17be5172ac2f4c67687a2e7c67d"`);
        await queryRunner.query(`ALTER TABLE "role" DROP CONSTRAINT "FK_64a1786ac86cd459077a53f411f"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_a19025a009be58684a63961aaf3"`);
        await queryRunner.query(`ALTER TABLE "menu" DROP CONSTRAINT "FK_23ac1b81a7bfb85b14e86bd23a5"`);
        await queryRunner.query(`ALTER TABLE "permission" ADD CONSTRAINT "FK_29b093b202d3ae3e37438ce158c" FOREIGN KEY ("permissionGroupId") REFERENCES "permission_group"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "role" ADD CONSTRAINT "FK_17be5172ac2f4c67687a2e7c67d" FOREIGN KEY ("createdBy") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "role" ADD CONSTRAINT "FK_64a1786ac86cd459077a53f411f" FOREIGN KEY ("updatedBy") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_a19025a009be58684a63961aaf3" FOREIGN KEY ("updatedBy") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "menu" ADD CONSTRAINT "FK_23ac1b81a7bfb85b14e86bd23a5" FOREIGN KEY ("parentId") REFERENCES "menu"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}

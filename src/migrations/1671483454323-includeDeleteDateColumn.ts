import { MigrationInterface, QueryRunner } from "typeorm";

export class includeDeleteDateColumn1671483454323 implements MigrationInterface {
    name = 'includeDeleteDateColumn1671483454323'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "deletedAt" TIMESTAMP`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "deletedAt"`);
    }

}

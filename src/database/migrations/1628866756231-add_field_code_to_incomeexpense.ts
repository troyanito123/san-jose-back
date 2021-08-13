import {MigrationInterface, QueryRunner} from "typeorm";

export class addFieldCodeToIncomeexpense1628866756231 implements MigrationInterface {
    name = 'addFieldCodeToIncomeexpense1628866756231'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "income_expense" ADD "code" character varying NOT NULL DEFAULT 'NO-CODE'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "income_expense" DROP COLUMN "code"`);
    }

}

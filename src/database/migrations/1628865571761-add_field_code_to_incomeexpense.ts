import {MigrationInterface, QueryRunner} from "typeorm";

export class addFieldCodeToIncomeexpense1628865571761 implements MigrationInterface {
    name = 'addFieldCodeToIncomeexpense1628865571761'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "income_expense" ADD "code" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "income_expense" DROP COLUMN "code"`);
    }

}

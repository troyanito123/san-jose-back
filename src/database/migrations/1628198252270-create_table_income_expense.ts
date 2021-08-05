import {MigrationInterface, QueryRunner} from "typeorm";

export class createTableIncomeExpense1628198252270 implements MigrationInterface {
    name = 'createTableIncomeExpense1628198252270'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "income_expense" ("id" SERIAL NOT NULL, "date" TIMESTAMP NOT NULL, "description" character varying NOT NULL, "mount" integer NOT NULL, "type" character varying NOT NULL, "from_user" character varying NOT NULL, "to_user" character varying NOT NULL, "image" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "userId" integer, CONSTRAINT "PK_598d0441434756926c9b91ed28b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "income_expense" ADD CONSTRAINT "FK_7f9e08d865cdb8208fe3b27cf6a" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "income_expense" DROP CONSTRAINT "FK_7f9e08d865cdb8208fe3b27cf6a"`);
        await queryRunner.query(`DROP TABLE "income_expense"`);
    }

}

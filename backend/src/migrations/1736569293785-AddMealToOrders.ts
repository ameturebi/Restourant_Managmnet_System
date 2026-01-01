import { MigrationInterface, QueryRunner } from "typeorm";

export class AddMealToOrders1736569293785 implements MigrationInterface {
    name = 'AddMealToOrders1736569293785'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`order\` CHANGE \`specialRequest\` \`specialRequest\` varchar(255) NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`order\` CHANGE \`specialRequest\` \`specialRequest\` varchar(255) NULL DEFAULT 'NULL'`);
    }

}

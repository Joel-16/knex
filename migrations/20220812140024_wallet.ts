import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable("wallet", (table) => {
    table.increments("id").primary().unsigned();
    table.integer("owner").unsigned();
    table.string("bankName").defaultTo("empty");
    table.string("accountNo");
    table.integer("balance").defaultTo(0);
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
    table.foreign("owner").references("id").inTable("account");
  });
}


export async function down(knex: Knex): Promise<void> {
    return await knex.schema.dropTable("wallet");
}


import knex from "knex";
import connection from "../../knexfile";

const db = knex(connection.development);

export default db;

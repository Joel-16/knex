import config from "./src/config";

const db = {

  development: {
    client: 'mysql',
    connection:  config.DATABASE_URL
  }
};

export default db;
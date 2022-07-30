// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
  development: {
    client: "sqlite3",
    connection: {
      filename: "./src/database/dev.sqlite3",
    },
    migrations: {
      tablename: "knex_migrations",
      directory: "./src/migrations",
    },
    useNullAsDefault: true,
  },
};

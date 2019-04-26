// Update with your config settings.
require('dotenv').config();
module.exports = {
  development: {
    client: 'pg',
    connection: `postgres://${process.env.DB_USERNAME}:${
      process.env.DB_PASSWORD
    }@localhost/immunizations`,
    migrations: {
      directory: './data/migrations',
    },
    seeds: {
      directory: './data/seeds/dev',
    },
    useNullAsDefault: true,
  },

  testing: {
    client: 'pg',
    connection: `postgres://${process.env.DB_USERNAME}:${
      process.env.DB_PASSWORD
    }@localhost/immunizations_test`,
    migrations: {
      directory: './data/migrations',
    },
    seeds: {
      directory: './data/seeds/testing',
    },
    useNullAsDefault: true,
  },

  staging: {
    client: 'pg',
    connection: process.env.DATABASE_URL,
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      directory: './data/migrations',
      tableName: 'knex_migrations',
    },
    seeds: {
      directory: './data/seeds/staging',
    },
    useNullAsDefault: true,
  },

  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL,
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      directory: './data/migrations',
      tableName: 'knex_migrations',
    },
    seeds: {
      directory: './data/seeds/production',
    },
    useNullAsDefault: true,
  },
};

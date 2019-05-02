// Update with your config settings.
require('dotenv').config();
module.exports = {
  development: {
    // LOCAL PG:

    client: 'pg',
    connection: `postgres://${process.env.DB_USERNAME}:${
      process.env.DB_PASSWORD
    }@localhost/immunizations`,

    // LOCAL SQLITE3:

    // client: 'sqlite3',
    // connection: {
    //   filename: './data/dev.sqlite3',
    // },
    
    migrations: {
      directory: './data/migrations',
    },
    seeds: {
      directory: './data/seeds/dev',
    },
    // pool: {
    //   afterCreate: (conn, cb) => {
    //     conn.run('PRAGMA foreign_keys = ON', cb);
    //   },
    // },
    useNullAsDefault: true,
  },

  testing: {
    client: 'pg',
    // LOCAL PG:

    // connection: `postgres://${process.env.DB_USERNAME}:${
    //   process.env.DB_PASSWORD
    // }@localhost/immunizations_test`,

    // LOCAL SQLITE3:

    // client: 'sqlite3',
    // connection: {
    //   filename: './data/testing.sqlite3',
    // },

    // TRAVIS CI:

    client: 'pg',
    connection: 'postgres://postgres@127.0.0.1:5432/travis_ci_test',
    migrations: {
      directory: './data/migrations',
    },

    seeds: {
      directory: './data/seeds/testing',
    },
    // pool: {
    //   afterCreate: (conn, cb) => {
    //     conn.run('PRAGMA foreign_keys = ON', cb);
    //   },
    // },
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

exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', tbl => {
    tbl.increments();
    tbl
      .string('username', 255)
      .notNullable()
      .unique();
    tbl
      .string('password', 255)
      .notNullable()
      .unique();
    tbl
      .string('email', 255)
      .notNullable()
      .unique();
    tbl
      .integer('providerId')
      .unsigned()
      .defaultTo(null)
      .references('id')
      .inTable('providers');
    tbl.datetime('createdAt').defaultTo(knex.fn.now());
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('users');
};

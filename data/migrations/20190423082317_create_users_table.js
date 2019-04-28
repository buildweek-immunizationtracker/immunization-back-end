exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', tbl => {
    if (knex.client.config.client === 'sqlite3') {
      tbl.increments();
    } else {
      tbl
        .uuid('id')
        .primary()
        .defaultTo(knex.raw('uuid_generate_v4()'));
    }
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
    if (knex.client.config.client === 'sqlite3') {
      tbl
        .integer('providerId')
        .unsigned()
        .defaultTo(null)
        .references('id')
        .inTable('providers')
        .onDelete('CASCADE');
    } else {
      tbl
        .uuid('providerId')
        .defaultTo(null)
        .references('id')
        .inTable('providers')
        .onDelete('CASCADE');
    }
    tbl.datetime('createdAt').defaultTo(knex.fn.now());
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('users');
};

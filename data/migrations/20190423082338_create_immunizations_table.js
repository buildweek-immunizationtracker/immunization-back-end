exports.up = function(knex, Promise) {
  return knex.schema.createTable('immunizations', tbl => {
    if (knex.client.config.client === 'pg') {
      tbl
        .uuid('id')
        .primary()
        .defaultTo(knex.raw('uuid_generate_v4()'));
    } else {
      tbl.increments();
    }
    tbl
      .string('name', 255)
      .notNullable()
      .unique();
    tbl.datetime('createdAt').defaultTo(knex.fn.now());
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('immunizations');
};

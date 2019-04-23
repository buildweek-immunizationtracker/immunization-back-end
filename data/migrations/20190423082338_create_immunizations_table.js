
exports.up = function(knex, Promise) {
  return knex.schema.createTable('immunizations', tbl => {
      tbl.increments();
      tbl.string('name', 255)
        .notNullable()
        .unique();
    tbl.datetime('createdAt').defaultTo(knex.fn.now());
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('immunizations');
};

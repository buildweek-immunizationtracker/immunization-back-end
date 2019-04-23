
exports.up = function(knex, Promise) {
  return knex.schema.createTable('patients', tbl => {
      tbl.increments();
      tbl.string('firstName', 255)
        .notNullable();
    tbl.string('lastName', 255)
        .notNullable();
    tbl.integer('age')
        .notNullable()
        .unsigned();
    tbl.integer('userId')
        .notNullable()
        .unsigned()
        .references('id')
        .inTable('users');
    tbl.datetime('createdAt').defaultTo(knex.fn.now());
  })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('patients');
};

exports.up = function(knex, Promise) {
  return knex.schema.createTable('permissions', tbl => {
    tbl.primary(['patientId', 'providerId']);
    tbl
      .integer('patientId')
      .notNullable()
      .unsigned()
      .references('id')
      .inTable('patients');
    tbl
      .integer('providerId')
      .notNullable()
      .unsigned()
      .references('id')
      .inTable('providers');
    tbl.datetime('createdAt').defaultTo(knex.fn.now());
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('permissions');
};

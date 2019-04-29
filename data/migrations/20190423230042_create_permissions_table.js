exports.up = function(knex, Promise) {
  return knex.schema.createTable('permissions', tbl => {
    tbl.primary(['patientId', 'providerId']);
    if (knex.client.config.client === 'pg') {
      tbl
        .uuid('patientId')
        .notNullable()
        .references('id')
        .inTable('patients')
        .onDelete('CASCADE');
      tbl
        .uuid('providerId')
        .notNullable()
        .references('id')
        .inTable('providers')
        .onDelete('CASCADE');
    } else {
      tbl
        .integer('patientId')
        .notNullable()
        .unsigned()
        .references('id')
        .inTable('patients')
        .onDelete('CASCADE');
      tbl
        .integer('providerId')
        .notNullable()
        .unsigned()
        .references('id')
        .inTable('providers')
        .onDelete('CASCADE');
    }
    tbl.datetime('createdAt').defaultTo(knex.fn.now());
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('permissions');
};

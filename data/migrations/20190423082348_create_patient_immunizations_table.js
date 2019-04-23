
exports.up = function(knex, Promise) {
  return knex.schema.createTable('patient_immunizations', tbl => {
    tbl.primary(['patientId', 'immunizationId', 'appointmentDate']);
    tbl.integer('patientId')
        .notNullable()
        .unsigned()
        .references('id')
        .inTable('patients');
    tbl.integer('immunizationId')
        .notNullable()
        .unsigned()
        .references('id')
        .inTable('immunizations');
    tbl.datetime('appointmentDate')
        .notNullable();
    tbl.integer('physicianId')
        .notNullable()
        .unsigned()
        .references('id')
        .inTable('users');
    tbl.datetime('updateOn')
        .notNullable()
        .defaultTo(null);
    tbl.datetime('createdAt').defaultTo(knex.fn.now());
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('patient_immunizations');
};

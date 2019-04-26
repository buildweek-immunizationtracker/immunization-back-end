
exports.up = function(knex, Promise) {
  return knex.schema.createTable('patient_immunizations', tbl => {
    tbl.primary(['patientId', 'immunizationId', 'appointmentDate']);
    tbl.integer('patientId')
        .notNullable()
        .unsigned()
        .references('id')
        .inTable('patients')
        .onDelete('CASCADE');
    tbl.integer('immunizationId')
        .notNullable()
        .unsigned()
        .references('id')
        .inTable('immunizations')
        .onDelete('CASCADE');
    tbl.datetime('appointmentDate')
        .notNullable();
    tbl.integer('providerId')
        .notNullable()
        .unsigned()
        .references('id')
        .inTable('providers')
        .onDelete('SET NULL');
    tbl.datetime('createdAt').defaultTo(knex.fn.now());
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('patient_immunizations');
};

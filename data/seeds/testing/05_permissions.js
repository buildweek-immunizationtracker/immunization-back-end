exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('permissions')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('permissions').insert([
        { patientId: 1, providerId: 1, createdAt: knex.fn.now() },
        { patientId: 2, providerId: 1, createdAt: knex.fn.now() },
        { patientId: 3, providerId: 2, createdAt: knex.fn.now() },
        { patientId: 3, providerId: 3, createdAt: knex.fn.now() },
        { patientId: 4, providerId: 3, createdAt: knex.fn.now() },
        { patientId: 5, providerId: 2, createdAt: knex.fn.now() },
        { patientId: 6, providerId: 2, createdAt: knex.fn.now() },
        { patientId: 7, providerId: 1, createdAt: knex.fn.now() },
        { patientId: 8, providerId: 1, createdAt: knex.fn.now() },
        { patientId: 9, providerId: 1, createdAt: knex.fn.now() },
        { patientId: 9, providerId: 2, createdAt: knex.fn.now() },
        { patientId: 9, providerId: 3, createdAt: knex.fn.now() },
        { patientId: 10, providerId: 1, createdAt: knex.fn.now() },
        { patientId: 10, providerId: 2, createdAt: knex.fn.now() },
        { patientId: 10, providerId: 3, createdAt: knex.fn.now() },
        { patientId: 11, providerId: 1, createdAt: knex.fn.now() },
        { patientId: 12, providerId: 1, createdAt: knex.fn.now() },
        { patientId: 13, providerId: 3, createdAt: knex.fn.now() },
        { patientId: 14, providerId: 3, createdAt: knex.fn.now() },
        { patientId: 15, providerId: 3, createdAt: knex.fn.now() },
      ]);
    });
};

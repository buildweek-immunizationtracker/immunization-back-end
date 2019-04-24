exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('permissions')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('permissions').insert([
        { userId: 1, providerId: 1, createdAt: knex.fn.now() },
        { userId: 2, providerId: 1, createdAt: knex.fn.now() },
        { userId: 3, providerId: 2, createdAt: knex.fn.now() },
        { userId: 3, providerId: 3, createdAt: knex.fn.now() },
        { userId: 6, providerId: 1, createdAt: knex.fn.now() },
        { userId: 8, providerId: 1, createdAt: knex.fn.now() },
        { userId: 8, providerId: 2, createdAt: knex.fn.now() },
        { userId: 9, providerId: 3, createdAt: knex.fn.now() },
        { userId: 10, providerId: 1, createdAt: knex.fn.now() },
        { userId: 10, providerId: 2, createdAt: knex.fn.now() },
        { userId: 10, providerId: 3, createdAt: knex.fn.now() },
      ]);
    });
};

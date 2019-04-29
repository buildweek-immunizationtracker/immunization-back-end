exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('providers')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('providers').insert([
        { name: 'Gregory House MD', createdAt: knex.fn.now() },
        { name: 'Doogie Howser MD', createdAt: knex.fn.now() },
        { name: 'Stephen Strange MD', createdAt: knex.fn.now() },
      ]);
    });
};

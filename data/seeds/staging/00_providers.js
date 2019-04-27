exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('providers')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('providers').insert([
        { id: 1, name: 'Gregory House, MD', createdAt: knex.fn.now() },
        { id: 2, name: 'Doogie Howser, MD', createdAt: knex.fn.now() },
        { id: 3, name: 'Stephen Strange, MD', createdAt: knex.fn.now() },
      ]);
    });
};

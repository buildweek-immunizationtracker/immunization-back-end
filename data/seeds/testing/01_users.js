
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {id: 1, username: 'edreeseg', password: 'test123', email: 'edreeseg@email.com', providerId: null, createdAt: knex.fn.now() },
        {id: 2, username: 'johndoe', password: 'test234', email: 'johndoe@email.com', providerId: null, createdAt: knex.fn.now() },
        {id: 3, username: 'janedoe', password: 'test345', email: 'janedoe@email.com', providerId: null, createdAt: knex.fn.now() },
        {id: 4, username: 'greghouse', password: 'test456', email: 'greghouse@email.com', providerId: 1, createdAt: knex.fn.now() },
        {id: 5, username: 'dhowser', password: 'test567', email: 'dhowser@email.com', providerId: 2, createdAt: knex.fn.now() },
        {id: 6, username: 'burtjones', password: 'test678', email: 'burtjones@email.com', providerId: null, createdAt: knex.fn.now() },
        {id: 7, username: 'stevestrange', password: 'test789', email: 'stevestrange@email.com', providerId: 3, createdAt: knex.fn.now() },
        {id: 8, username: 'charrison', password: 'test890', email: 'charrison@email.com', providerId: null, createdAt: knex.fn.now() },
        {id: 9, username: 'theresal', password: 'test910', email: 'theresal@email.com', providerId: null, createdAt: knex.fn.now() },
        {id: 10, username: 'glendale', password: 'test101', email: 'glendale@email.com', providerId: null, createdAt: knex.fn.now() },
      ]);
    });
};

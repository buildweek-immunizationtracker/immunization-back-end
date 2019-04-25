
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('patients').del()
    .then(function () {
      // Inserts seed entries
      return knex('patients').insert([
        { id: 1, firstName: 'Ed', lastName: 'Reeseg', age: 27, userId: 1, createdAt: knex.fn.now() },
        { id: 2, firstName: 'Jack', lastName: 'Reeseg', age: 3, userId: 1, createdAt: knex.fn.now() },
        { id: 3, firstName: 'John', lastName: 'Doe', age: 34, userId: 2, createdAt: knex.fn.now() },
        { id: 4, firstName: 'George', lastName: 'Doe', age: 5, userId: 2, createdAt: knex.fn.now() },
        { id: 5, firstName: 'Jane', lastName: 'Doe', age: 45, userId: 3, createdAt: knex.fn.now() },
        { id: 6, firstName: 'Tiny', lastName: 'Tim', age: 9, userId: 3, createdAt: knex.fn.now() },
        { id: 7, firstName: 'Burt', lastName: 'Jones', age: 25, userId: 6, createdAt: knex.fn.now() },
        { id: 8, firstName: 'Scott', lastName: 'Jones', age: 2, userId: 6, createdAt: knex.fn.now() },
        { id: 9, firstName: 'Charlotte', lastName: 'Harrison', age: 39, userId: 8, createdAt: knex.fn.now() },
        { id: 10, firstName: 'Pamela', lastName: 'Harrison', age: 13, userId: 8, createdAt: knex.fn.now() },
        { id: 11, firstName: 'Theresa', lastName: 'Linwood', age: 38, userId: 9, createdAt: knex.fn.now() },
        { id: 12, firstName: 'Robert', lastName: 'Linwood', age: 16, userId: 9, createdAt: knex.fn.now() },
        { id: 13, firstName: 'Glen', lastName: 'Dale', age: 30, userId: 10, createdAt: knex.fn.now() },
        { id: 14, firstName: 'Lily', lastName: 'Dale', age: 10, userId: 10, createdAt: knex.fn.now() },
        { id: 15, firstName: 'Aaron', lastName: 'Dale', age: 7, userId: 10, createdAt: knex.fn.now() },
      ]);
    });
};

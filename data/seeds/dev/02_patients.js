
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('patients').del()
    .then(function () {
      // Inserts seed entries
      return knex('patients').insert([
        { id: 1, firstName: 'Ed', lastName: 'Reeseg', birthDate: '1991-07-12', userId: 1, createdAt: knex.fn.now() },
        { id: 2, firstName: 'Jack', lastName: 'Reeseg', birthDate: '2016-03-21', userId: 1, createdAt: knex.fn.now() },
        { id: 3, firstName: 'John', lastName: 'Doe', birthDate: '1987-05-10', userId: 2, createdAt: knex.fn.now() },
        { id: 4, firstName: 'George', lastName: 'Doe', birthDate: '2014-07-01', userId: 2, createdAt: knex.fn.now() },
        { id: 5, firstName: 'Jane', lastName: 'Doe', birthDate: '1985-12-05', userId: 3, createdAt: knex.fn.now() },
        { id: 6, firstName: 'Tiny', lastName: 'Tim', birthDate: '2010-02-21', userId: 3, createdAt: knex.fn.now() },
        { id: 7, firstName: 'Burt', lastName: 'Jones', birthDate: '1994-10-10', userId: 6, createdAt: knex.fn.now() },
        { id: 8, firstName: 'Scott', lastName: 'Jones', birthDate: '2016-09-07', userId: 6, createdAt: knex.fn.now() },
        { id: 9, firstName: 'Charlotte', lastName: 'Harrison', birthDate: '1978-04-01', userId: 8, createdAt: knex.fn.now() },
        { id: 10, firstName: 'Pamela', lastName: 'Harrison', birthDate: '2006-10-15', userId: 8, createdAt: knex.fn.now() },
        { id: 11, firstName: 'Theresa', lastName: 'Linwood', birthDate: '1979-11-20', userId: 9, createdAt: knex.fn.now() },
        { id: 12, firstName: 'Robert', lastName: 'Linwood', birthDate: '2003-04-25', userId: 9, createdAt: knex.fn.now() },
        { id: 13, firstName: 'Glen', lastName: 'Dale', birthDate: '1989-12-01', userId: 10, createdAt: knex.fn.now() },
        { id: 14, firstName: 'Lily', lastName: 'Dale', birthDate: '2009-06-21', userId: 10, createdAt: knex.fn.now() },
        { id: 15, firstName: 'Aaron', lastName: 'Dale', birthDate: '2012-03-14', userId: 10, createdAt: knex.fn.now() },
      ]);
    });
};


exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('patients').del()
    .then(async function () {
      const newPatients = [];
      const users = await knex('users');
      for (let i = 0; i < users.length; i++){
        if (users[i].providerId) continue;
        const name = users[i].username.split('_');
        newPatients.push({
          firstName: name[0],
          lastName: name[1],
          birthDate: '1970-01-01',
          userId: users[i].id,
          createdAt: knex.fn.now(),
        });
      }
      // Inserts seed entries
      return knex('patients').insert(newPatients);
    });
};

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users')
    .del()
    .then(async function() {
      // Inserts seed entries
      const providerAccounts = [];
      const providers = await knex('providers');
      for (let i = 0; i < providers.length; i++) {
        const name = providers[i].name.split(' ');
        providerAccounts.push({
          username: `${name[0]}_${name[1]}`,
          password: Math.random().toString().slice(3, 19),
          email: `${name[0]}@email.com`,
          providerId: providers[i].id,
          createdAt: knex.fn.now(),
        });
      }
      const nonProviders = [
        {
          username: 'ed_reeseg',
          password: 'test123',
          email: 'edreeseg@email.com',
          providerId: null,
          createdAt: knex.fn.now(),
        },
        {
          username: 'john_doe',
          password: 'test234',
          email: 'johndoe@email.com',
          providerId: null,
          createdAt: knex.fn.now(),
        },
        {
          username: 'jane_doe',
          password: 'test345',
          email: 'janedoe@email.com',
          providerId: null,
          createdAt: knex.fn.now(),
        },
        {
          username: 'burt_jones',
          password: 'test678',
          email: 'burtjones@email.com',
          providerId: null,
          createdAt: knex.fn.now(),
        },
        {
          username: 'charlotte_harrison',
          password: 'test890',
          email: 'charrison@email.com',
          providerId: null,
          createdAt: knex.fn.now(),
        },
        {
          username: 'theresa_linwood',
          password: 'test910',
          email: 'theresal@email.com',
          providerId: null,
          createdAt: knex.fn.now(),
        },
        {
          username: 'glen_dale',
          password: 'test101',
          email: 'glendale@email.com',
          providerId: null,
          createdAt: knex.fn.now(),
        },
      ];
      const newUsers = providerAccounts.concat(nonProviders);
      return knex('users').insert(newUsers);
    });
};

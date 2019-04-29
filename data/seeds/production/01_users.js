const bcrypt = require('bcrypt');

function hashPassword(str) {
  return bcrypt.hashSync(str, 10);
}

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
          password: hashPassword(process.env.SEED_PW),
          email: `${name[0]}@email.com`,
          providerId: providers[i].id,
          createdAt: knex.fn.now(),
        });
      }
      const nonProviders = [
        {
          username: 'ed_reeseg',
          password: hashPassword(process.env.SEED_PW),
          email: 'edreeseg@email.com',
          providerId: null,
          createdAt: knex.fn.now(),
        },
        {
          username: 'john_doe',
          password: hashPassword(process.env.SEED_PW),
          email: 'johndoe@email.com',
          providerId: null,
          createdAt: knex.fn.now(),
        },
        {
          username: 'jane_doe',
          password: hashPassword(process.env.SEED_PW),
          email: 'janedoe@email.com',
          providerId: null,
          createdAt: knex.fn.now(),
        },
        {
          username: 'burt_jones',
          password: hashPassword(process.env.SEED_PW),
          email: 'burtjones@email.com',
          providerId: null,
          createdAt: knex.fn.now(),
        },
        {
          username: 'charlotte_harrison',
          password: hashPassword(process.env.SEED_PW),
          email: 'charrison@email.com',
          providerId: null,
          createdAt: knex.fn.now(),
        },
        {
          username: 'theresa_linwood',
          password: hashPassword(process.env.SEED_PW),
          email: 'theresal@email.com',
          providerId: null,
          createdAt: knex.fn.now(),
        },
        {
          username: 'glen_dale',
          password: hashPassword(process.env.SEED_PW),
          email: 'glendale@email.com',
          providerId: null,
          createdAt: knex.fn.now(),
        },
      ];
      const newUsers = providerAccounts.concat(nonProviders);
      return knex('users').insert(newUsers);
    });
};

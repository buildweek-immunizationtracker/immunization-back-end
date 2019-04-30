const { seedPW } = require('../../../config/secrets');
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
          password: hashPassword(seedPW),
          email: `${name[0]}@email.com`,
          providerId: providers[i].id,
          createdAt: knex.fn.now(),
        });
      }
      const nonProviders = [
        {
          username: 'ed_reeseg',
          password: hashPassword(seedPW),
          email: 'edreeseg@email.com',
          providerId: null,
          createdAt: knex.fn.now(),
        },
        {
          username: 'john_doe',
          password: hashPassword(seedPW),
          email: 'johndoe@email.com',
          providerId: null,
          createdAt: knex.fn.now(),
        },
        {
          username: 'jane_doe',
          password: hashPassword(seedPW),
          email: 'janedoe@email.com',
          providerId: null,
          createdAt: knex.fn.now(),
        },
        {
          username: 'burt_jones',
          password: hashPassword(seedPW),
          email: 'burtjones@email.com',
          providerId: null,
          createdAt: knex.fn.now(),
        },
        {
          username: 'charlotte_harrison',
          password: hashPassword(seedPW),
          email: 'charrison@email.com',
          providerId: null,
          createdAt: knex.fn.now(),
        },
        {
          username: 'theresa_linwood',
          password: hashPassword(seedPW),
          email: 'theresal@email.com',
          providerId: null,
          createdAt: knex.fn.now(),
        },
        {
          username: 'glen_dale',
          password: hashPassword(seedPW),
          email: 'glendale@email.com',
          providerId: null,
          createdAt: knex.fn.now(),
        },
      ];
      const newUsers = providerAccounts.concat(nonProviders);
      return knex('users').insert(newUsers);
    });
};

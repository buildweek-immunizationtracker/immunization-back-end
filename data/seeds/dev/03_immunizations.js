
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('immunizations').del()
    .then(function () {
      // Inserts seed entries
      return knex('immunizations').insert([
        { name: 'HepB - Hepatitis B', createdAt: knex.fn.now() },
        { name: 'DTaP - Diphtheria, tetanus, and acellular pertussis', createdAt: knex.fn.now() },
        { name: 'Hib - Haemophilus influenzae type b', createdAt: knex.fn.now() },
        { name: 'IPV - Inactivated poliovirus', createdAt: knex.fn.now() },
        { name: 'PCV - Pneumococcal conjugate', createdAt: knex.fn.now() },
        { name: 'RV - Rotavirus', createdAt: knex.fn.now() },
        { name: 'Influenza', createdAt: knex.fn.now() },
        { name: 'MMR - Measles, mumps, and rubella', createdAt: knex.fn.now() },
        { name: 'Chickenpox - Varicella', createdAt: knex.fn.now() },
        { name: 'HepA - Hepatitis A', createdAt: knex.fn.now() },
        { name: 'HPV - Human papillomavirus', createdAt: knex.fn.now() },
        { name: 'Tdap - Tetanus, diphtheria, and pertussis booster', createdAt: knex.fn.now() },
        { name: 'Meningococcal conjugate', createdAt: knex.fn.now() },
        { name: 'MenB - Meningococcal B', createdAt: knex.fn.now() },
      ]);
    });
};

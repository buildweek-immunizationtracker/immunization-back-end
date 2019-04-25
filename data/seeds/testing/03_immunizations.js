
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('immunizations').del()
    .then(function () {
      // Inserts seed entries
      return knex('immunizations').insert([
        { id: 1, name: 'HepB - Hepatitis B', createdAt: knex.fn.now() },
        { id: 2, name: 'DTaP - Diphtheria, tetanus, and acellular pertussis', createdAt: knex.fn.now() },
        { id: 3, name: 'Hib - Haemophilus influenzae type b', createdAt: knex.fn.now() },
        { id: 4, name: 'IPV - Inactivated poliovirus', createdAt: knex.fn.now() },
        { id: 5, name: 'PCV - Pneumococcal conjugate', createdAt: knex.fn.now() },
        { id: 6, name: 'RV - Rotavirus', createdAt: knex.fn.now() },
        { id: 7, name: 'Influenza', createdAt: knex.fn.now() },
        { id: 8, name: 'MMR - Measles, mumps, and rubella', createdAt: knex.fn.now() },
        { id: 9, name: 'Chickenpox - Varicella', createdAt: knex.fn.now() },
        { id: 10, name: 'HepA - Hepatitis A', createdAt: knex.fn.now() },
        { id: 11, name: 'HPV - Human papillomavirus', createdAt: knex.fn.now() },
        { id: 12, name: 'Tdap - Tetanus, diphtheria, and pertussis booster', createdAt: knex.fn.now() },
        { id: 13, name: 'Meningococcal conjugate', createdAt: knex.fn.now() },
        { id: 14, name: 'MenB - Meningococcal B', createdAt: knex.fn.now() },
      ]);
    });
};

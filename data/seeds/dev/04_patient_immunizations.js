
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('patient_immunizations').del()
    .then(function () {
      // Inserts seed entries
      return knex('patient_immunizations').insert([
        { patientId: 1, immunizationId: 1, appointmentDate: dateFormat('July 12 1991, 2:00:00'), physicianId: 4, createdAt: knex.fn.now() },
        { patientId: 1, immunizationId: 1, appointmentDate: dateFormat('September 12 1991, 14:00:00'), physicianId: 4, createdAt: knex.fn.now() },
        { patientId: 1, immunizationId: 2, appointmentDate: dateFormat('September 12 1991, 14:00:00'), physicianId: 4, createdAt: knex.fn.now() },
        { patientId: 1, immunizationId: 3, appointmentDate: dateFormat('September 12 1991, 14:00:00'), physicianId: 4, createdAt: knex.fn.now() },
        { patientId: 1, immunizationId: 4, appointmentDate: dateFormat('September 12 1991, 14:00:00'), physicianId: 4, createdAt: knex.fn.now() },
        { patientId: 1, immunizationId: 5, appointmentDate: dateFormat('September 12 1991, 14:00:00'), physicianId: 4, createdAt: knex.fn.now() },
        { patientId: 1, immunizationId: 6, appointmentDate: dateFormat('September 12 1991, 14:00:00'), physicianId: 4, createdAt: knex.fn.now() },
        { patientId: 1, immunizationId: 2, appointmentDate: dateFormat('November 12 1991, 14:00:00'), physicianId: 4, createdAt: knex.fn.now() },
        { patientId: 1, immunizationId: 3, appointmentDate: dateFormat('November 12 1991, 14:00:00'), physicianId: 4, createdAt: knex.fn.now() },
        { patientId: 1, immunizationId: 4, appointmentDate: dateFormat('November 12 1991, 14:00:00'), physicianId: 4, createdAt: knex.fn.now() },
        { patientId: 1, immunizationId: 5, appointmentDate: dateFormat('November 12 1991, 14:00:00'), physicianId: 4, createdAt: knex.fn.now() },
        { patientId: 1, immunizationId: 6, appointmentDate: dateFormat('November 12 1991, 14:00:00'), physicianId: 4, createdAt: knex.fn.now() },
        { patientId: 1, immunizationId: 2, appointmentDate: dateFormat('January 12 1992, 14:00:00'), physicianId: 4, createdAt: knex.fn.now() },
        { patientId: 1, immunizationId: 3, appointmentDate: dateFormat('January 12 1992, 14:00:00'), physicianId: 4, createdAt: knex.fn.now() },
        { patientId: 1, immunizationId: 5, appointmentDate: dateFormat('January 12 1992, 14:00:00'), physicianId: 4, createdAt: knex.fn.now() },
        { patientId: 1, immunizationId: 6, appointmentDate: dateFormat('January 12 1992, 14:00:00'), physicianId: 4, createdAt: knex.fn.now() },
        { patientId: 1, immunizationId: 7, appointmentDate: dateFormat('January 12 1992, 14:00:00'), physicianId: 4, createdAt: knex.fn.now() },
        { patientId: 1, immunizationId: 1, appointmentDate: dateFormat('January 12 1992, 14:00:00'), physicianId: 4, createdAt: knex.fn.now() },
        { patientId: 1, immunizationId: 4, appointmentDate: dateFormat('January 12 1992, 14:00:00'), physicianId: 4, createdAt: knex.fn.now() },
        { patientId: 1, immunizationId: 3, appointmentDate: dateFormat('July 12 1992, 14:00:00'), physicianId: 4, createdAt: knex.fn.now() },
        { patientId: 1, immunizationId: 8, appointmentDate: dateFormat('July 12 1992, 14:00:00'), physicianId: 4, createdAt: knex.fn.now() },
        { patientId: 1, immunizationId: 5, appointmentDate: dateFormat('July 12 1992, 14:00:00'), physicianId: 4, createdAt: knex.fn.now() },
        { patientId: 1, immunizationId: 9, appointmentDate: dateFormat('July 12 1992, 14:00:00'), physicianId: 4, createdAt: knex.fn.now() },
        { patientId: 1, immunizationId: 10, appointmentDate: dateFormat('July 12 1992, 14:00:00'), physicianId: 4, createdAt: knex.fn.now() },
        { patientId: 1, immunizationId: 2, appointmentDate: dateFormat('October 12 1992, 14:00:00'), physicianId: 4, createdAt: knex.fn.now() },
        { patientId: 1, immunizationId: 7, appointmentDate: dateFormat('January 12 1993, 14:00:00'), physicianId: 4, createdAt: knex.fn.now() },
        { patientId: 1, immunizationId: 7, appointmentDate: dateFormat('January 12 1994, 14:00:00'), physicianId: 4, createdAt: knex.fn.now() },
        { patientId: 1, immunizationId: 7, appointmentDate: dateFormat('January 12 1995, 14:00:00'), physicianId: 4, createdAt: knex.fn.now() },
        { patientId: 1, immunizationId: 2, appointmentDate: dateFormat('July 12 1995, 14:00:00'), physicianId: 4, createdAt: knex.fn.now() },
        { patientId: 1, immunizationId: 8, appointmentDate: dateFormat('July 12 1995, 14:00:00'), physicianId: 4, createdAt: knex.fn.now() },
        { patientId: 1, immunizationId: 4, appointmentDate: dateFormat('July 12 1995, 14:00:00'), physicianId: 4, createdAt: knex.fn.now() },
        { patientId: 1, immunizationId: 9, appointmentDate: dateFormat('July 12 1995, 14:00:00'), physicianId: 4, createdAt: knex.fn.now() },
        { patientId: 1, immunizationId: 7, appointmentDate: dateFormat('January 12 1996, 14:00:00'), physicianId: 4, createdAt: knex.fn.now() },
        { patientId: 1, immunizationId: 7, appointmentDate: dateFormat('January 12 1997, 14:00:00'), physicianId: 4, createdAt: knex.fn.now() },
        { patientId: 1, immunizationId: 7, appointmentDate: dateFormat('January 12 1998, 14:00:00'), physicianId: 4, createdAt: knex.fn.now() },
        { patientId: 1, immunizationId: 7, appointmentDate: dateFormat('January 12 1999, 14:00:00'), physicianId: 4, createdAt: knex.fn.now() },
        { patientId: 1, immunizationId: 7, appointmentDate: dateFormat('January 12 2000, 14:00:00'), physicianId: 4, createdAt: knex.fn.now() },
        { patientId: 1, immunizationId: 7, appointmentDate: dateFormat('January 12 2001, 14:00:00'), physicianId: 4, createdAt: knex.fn.now() },
        { patientId: 1, immunizationId: 7, appointmentDate: dateFormat('January 12 2002, 14:00:00'), physicianId: 4, createdAt: knex.fn.now() },
        { patientId: 1, immunizationId: 11, appointmentDate: dateFormat('July 12 2002, 14:00:00'), physicianId: 4, createdAt: knex.fn.now() },
        { patientId: 1, immunizationId: 12, appointmentDate: dateFormat('July 12 2002, 14:00:00'), physicianId: 4, createdAt: knex.fn.now() },
        { patientId: 1, immunizationId: 13, appointmentDate: dateFormat('July 12 2002, 14:00:00'), physicianId: 4, createdAt: knex.fn.now() },
        { patientId: 1, immunizationId: 7, appointmentDate: dateFormat('January 12 2003, 14:00:00'), physicianId: 4, createdAt: knex.fn.now() },
        { patientId: 1, immunizationId: 7, appointmentDate: dateFormat('January 12 2004, 14:00:00'), physicianId: 4, createdAt: knex.fn.now() },
        { patientId: 1, immunizationId: 7, appointmentDate: dateFormat('January 12 2005, 14:00:00'), physicianId: 4, createdAt: knex.fn.now() },
        { patientId: 1, immunizationId: 7, appointmentDate: dateFormat('January 12 2006, 14:00:00'), physicianId: 4, createdAt: knex.fn.now() },
        { patientId: 1, immunizationId: 7, appointmentDate: dateFormat('January 12 2007, 14:00:00'), physicianId: 4, createdAt: knex.fn.now() },
        { patientId: 1, immunizationId: 14, appointmentDate: dateFormat('July 12 2007, 14:00:00'), physicianId: 4, createdAt: knex.fn.now() },
        { patientId: 1, immunizationId: 7, appointmentDate: dateFormat('January 12 2008, 14:00:00'), physicianId: 4, createdAt: knex.fn.now() },
        { patientId: 1, immunizationId: 7, appointmentDate: dateFormat('January 12 2009, 14:00:00'), physicianId: 4, createdAt: knex.fn.now() },
        { patientId: 1, immunizationId: 7, appointmentDate: dateFormat('January 12 2010, 14:00:00'), physicianId: 4, createdAt: knex.fn.now() },
        { patientId: 1, immunizationId: 7, appointmentDate: dateFormat('January 12 2011, 14:00:00'), physicianId: 4, createdAt: knex.fn.now() },
        { patientId: 1, immunizationId: 7, appointmentDate: dateFormat('January 12 2012, 14:00:00'), physicianId: 4, createdAt: knex.fn.now() },
        { patientId: 1, immunizationId: 7, appointmentDate: dateFormat('January 12 2013, 14:00:00'), physicianId: 4, createdAt: knex.fn.now() },
        { patientId: 1, immunizationId: 7, appointmentDate: dateFormat('January 12 2014, 14:00:00'), physicianId: 4, createdAt: knex.fn.now() },
        { patientId: 1, immunizationId: 7, appointmentDate: dateFormat('January 12 2015, 14:00:00'), physicianId: 4, createdAt: knex.fn.now() },
        { patientId: 1, immunizationId: 7, appointmentDate: dateFormat('January 12 2016, 14:00:00'), physicianId: 4, createdAt: knex.fn.now() },
        { patientId: 1, immunizationId: 7, appointmentDate: dateFormat('January 12 2017, 14:00:00'), physicianId: 4, createdAt: knex.fn.now() },
        { patientId: 1, immunizationId: 7, appointmentDate: dateFormat('January 12 2018, 14:00:00'), physicianId: 4, createdAt: knex.fn.now() },
        { patientId: 1, immunizationId: 7, appointmentDate: dateFormat('January 12 2019, 14:00:00'), physicianId: 4, createdAt: knex.fn.now() },
      ]);
    });
};

function dateFormat(date){
    return new Date(date)
        .toISOString()
        .replace('T', ' ')
        .slice(0, -5);
}
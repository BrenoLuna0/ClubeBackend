exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("AGENDA_CONVIDADO_TITULO").del();
};

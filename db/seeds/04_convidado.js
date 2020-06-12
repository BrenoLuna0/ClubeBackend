exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("CONVIDADO_TITULO").del();
};

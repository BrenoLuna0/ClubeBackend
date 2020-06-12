exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("TITULO")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("TITULO").insert([]);
    });
};

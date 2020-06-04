exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("titulo")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("titulo").insert([]);
    });
};

exports.up = function (knex) {
  return knex.schema.createTable("MENSAGEM", (table) => {
    table.increments("MESG_CODIGO").primary();
    table.string("MESG_TITULO", 50);
    table.string("MESG_DESCRICAO", 4000);
    table.date("MESG_DATA_INICIO");
    table.date("MESG_DATA_FIM");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("MENSAGEM");
};

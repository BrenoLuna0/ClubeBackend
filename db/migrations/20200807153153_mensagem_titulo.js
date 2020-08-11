exports.up = function (knex) {
  return knex.schema.createTable("MENSAGEM_TITULO", (table) => {
    table.integer("MESG_CODIGO");
    table.integer("TITU_CODIGO");
    table.primary(["MESG_CODIGO", "TITU_CODIGO"]);
    table.foreign("MESG_CODIGO").references("MENSAGEM.MESG_CODIGO");
    table.foreign("TITU_CODIGO").references("TITULO.TITU_CODIGO");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("MENSAGEM_TITULO");
};

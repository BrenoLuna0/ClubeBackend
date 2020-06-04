exports.up = function (knex) {
  return knex.schema.createTable("AGENDA_CONVIDADO_TITULO", (table) => {
    table.integer("AGEN_CODIGO");
    table.integer("CONV_TITU_CODIGO");
    table.integer("SOCI_CODIGO");
    table.string("AGEN_CONV_TITU_OBSERVACAO");
    table.integer("ID_USUARIO");
    table.integer("ID_USUARIO_INCL");
    table.date("DATA_HORA_INCL");
    table.integer("ID_USUARIO_ALTR");
    table.date("DATA_HORA_ALTR");
    table.primary(["AGEN_CODIGO", "CONV_TITU_CODIGO", "SOCI_CODIGO"]);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("AGENDA_CONVIDADO_TITULO");
};

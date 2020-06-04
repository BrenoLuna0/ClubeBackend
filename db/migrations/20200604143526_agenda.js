exports.up = function (knex) {
  return knex.schema.createTable("AGENDA", (table) => {
    table.increments("AGEN_CODIGO");
    table.date("AGEN_DATA");
    table.string("AGEN_DIA_SEMANA");
    table.integer("AGEN_QTD_CONVIDADO");
    table.integer("ID_USUARIO");
    table.integer("ID_USUARIO_INCL");
    table.date("DATA_HORA_INCL");
    table.integer("ID_USUARIO_ALTR");
    table.date("DATA_HORA_ALTR");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("AGENDA");
};

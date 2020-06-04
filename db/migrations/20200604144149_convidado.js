exports.up = function (knex) {
  return knex.schema.createTable("CONVIDADO_TITULO", (table) => {
    table.increments("CONV_TITU_CODIGO");
    table.string("CONV_TITU_NOME");
    table.integer("SOCI_CODIGO");
    table.string("CONV_TITU_TIPO");
    table.string("CONV_TITU_CPFCNPJ");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("CONVIDADO_TITULO");
};

exports.up = function (knex) {
  return knex.schema.createTable("TITULO", (table) => {
    table.integer("TITU_CODIGO").primary();
    table.integer("TITU_NUME_TITULO");
    table.integer("SOCI_CODIGO");
    table.string("SOCI_NOME");
    table.string("SOCI_CPFCNPJ");
    table.string("SOCI_FONE1");
    table.string("SENHA_WEB_MD5");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("TITULO");
};

const connection = require("../pgConnection");

class Convidado {
  constructor(CONV_TITU_NOME, SOCI_CODIGO, CONV_TITU_TIPO, CONV_TITU_CPFCNPJ) {
    this.CONV_TITU_NOME = CONV_TITU_NOME;
    this.SOCI_CODIGO = SOCI_CODIGO;
    this.CONV_TITU_TIPO = CONV_TITU_TIPO;
    this.CONV_TITU_CPFCNPJ = CONV_TITU_CPFCNPJ;
  }

  async save() {
    const convidado = await connection("CONVIDADO_TITULO")
      .returning("*")
      .insert({
        CONV_TITU_NOME: this.CONV_TITU_NOME,
        SOCI_CODIGO: this.SOCI_CODIGO,
        CONV_TITU_TIPO: this.CONV_TITU_TIPO,
        CONV_TITU_CPFCNPJ: this.CONV_TITU_CPFCNPJ,
      })
      .catch(function (err) {
        console.log(err);
        return false;
      });

    return convidado;
  }

  static async getConvidadoPorTitular(sociCodigo) {
    const titulares = await connection("CONVIDADO_TITULO")
      .where("SOCI_CODIGO", sociCodigo)
      .select("CONV_TITU_CODIGO", "CONV_TITU_NOME", "CONV_TITU_CPFCNPJ")
      .catch(function (err) {
        console.log(err);
        return false;
      });

    return titulares;
  }
}

module.exports = Convidado;

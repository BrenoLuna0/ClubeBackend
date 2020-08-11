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
    const convidados = await connection("CONVIDADO_TITULO")
      .where("SOCI_CODIGO", sociCodigo)
      .select("CONV_TITU_CODIGO", "CONV_TITU_NOME", "CONV_TITU_CPFCNPJ")
      .orderBy("CONV_TITU_CODIGO", "asc")
      .catch(function (err) {
        console.log(err);
        return false;
      });

    return convidados;
  }

  static async getConvidadoPorCpf(cpf, sociCodigo) {
    const convidado = await connection("CONVIDADO_TITULO")
      .where("CONV_TITU_CPFCNPJ", cpf)
      .where("SOCI_CODIGO", sociCodigo)
      .select("CONV_TITU_CPFCNPJ")
      .then((response) => {
        return response.length;
      })
      .catch((err) => {
        console.log(err);
        return false;
      });

    return convidado;
  }

  static async getAgendaConvidados(data, sociCodigo) {
    const convidados = await connection("AGENDA_CONVIDADO_TITULO")
      .join(
        "AGENDA",
        "AGENDA_CONVIDADO_TITULO.AGEN_CODIGO",
        "=",
        "AGENDA.AGEN_CODIGO"
      )
      .join(
        "CONVIDADO_TITULO",
        "AGENDA_CONVIDADO_TITULO.CONV_TITU_CODIGO",
        "=",
        "CONVIDADO_TITULO.CONV_TITU_CODIGO"
      )
      .where("AGENDA.AGEN_DATA", data)
      .andWhere("AGENDA_CONVIDADO_TITULO.SOCI_CODIGO", sociCodigo)
      .select(
        "CONVIDADO_TITULO.CONV_TITU_CODIGO",
        "CONVIDADO_TITULO.CONV_TITU_NOME",
        "CONVIDADO_TITULO.CONV_TITU_CPFCNPJ",
        "AGENDA.AGEN_CODIGO"
      )
      .orderBy("CONVIDADO_TITULO.CONV_TITU_CODIGO", "asc")
      .catch((err) => {
        console.log(err);
        return false;
      });

    return convidados;
  }

  static async remove(id) {
    return await connection("CONVIDADO_TITULO")
      .where("CONV_TITU_CODIGO", id)
      .del()
      .then(() => true)
      .catch((err) => {
        console.log(err);
        return false;
      });
  }
}

module.exports = Convidado;

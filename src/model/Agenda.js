const connection = require("../pgConnection");

class Agenda {
  constructor(AGEN_DATA, AGEN_DIA_SEMANA, AGEN_QTD_CONVIDADO, DATA_HORA_INCL) {
    this.AGEN_DATA = AGEN_DATA;
    this.AGEN_DIA_SEMANA = AGEN_DIA_SEMANA;
    this.AGEN_QTD_CONVIDADO = AGEN_QTD_CONVIDADO;
    this.DATA_HORA_INCL = DATA_HORA_INCL;
  }

  async save() {
    const convidado = await connection("AGENDA")
      .returning("*")
      .insert({
        AGEN_DATA: this.AGEN_DATA,
        AGEN_DIA_SEMANA: this.AGEN_DIA_SEMANA,
        AGEN_QTD_CONVIDADO: this.AGEN_QTD_CONVIDADO,
        DATA_HORA_INCL: this.DATA_HORA_INCL,
      })
      .catch(function (err) {
        console.log(err);
        return false;
      });

    return convidado;
  }

  static async update(agenCodigo, convidados, sociCodigo) {
    const trx = await connection.transaction();

    await trx("AGENDA")
      .where("AGEN_CODIGO", agenCodigo)
      .update("AGEN_QTD_CONVIDADO", convidados.length);

    await trx("AGENDA_CONVIDADO_TITULO").where("AGEN_CODIGO", agenCodigo).del();

    const rows = convidados.map((convidado) => {
      if (convidado != null) {
        return {
          AGEN_CODIGO: agenCodigo,
          CONV_TITU_CODIGO: convidado.CONV_TITU_CODIGO,
          SOCI_CODIGO: sociCodigo,
          AGEN_CONV_TITU_OBSERVACAO: "",
          DATA_HORA_INCL: new Date(),
        };
      }
    });

    const convidado = await trx("AGENDA_CONVIDADO_TITULO")
      .returning("*")
      .insert(rows)
      .catch(function (err) {
        console.log(err);
        return false;
      });

    await trx.commit();

    return convidado;
  }
}

module.exports = Agenda;

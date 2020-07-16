const connection = require("../pgConnection");
const moment = require("moment");

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

  static async delete(agenCodigo) {
    const trx = await connection.transaction();

    await trx("AGENDA_CONVIDADO_TITULO").where("AGEN_CODIGO", agenCodigo).del();
    await trx("AGENDA").where("AGEN_CODIGO", agenCodigo).del();

    await trx.commit();

    return true;
  }

  static async index(sociCodigo) {
    const date = moment(new Date()).format("MM-DD-yyyy");
    const agenda = await connection("AGENDA")
      .join(
        "AGENDA_CONVIDADO_TITULO",
        "AGENDA.AGEN_CODIGO",
        "=",
        "AGENDA_CONVIDADO_TITULO.AGEN_CODIGO"
      )
      .where("AGEN_DATA", ">=", date)
      .andWhere("AGENDA_CONVIDADO_TITULO.SOCI_CODIGO", sociCodigo)
      .select(
        "AGENDA.AGEN_CODIGO",
        "AGENDA.AGEN_DATA",
        "AGENDA_CONVIDADO_TITULO.SOCI_CODIGO"
      )
      .distinct()
      .catch((err) => {
        console.log(err);
        return false;
      });

    const agendaConvidados = agenda.map(async (data, index) => {
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
        .where("AGENDA.AGEN_DATA", data.AGEN_DATA)
        .andWhere("AGENDA_CONVIDADO_TITULO.SOCI_CODIGO", data.SOCI_CODIGO)
        .select(
          "CONVIDADO_TITULO.CONV_TITU_NOME",
          "CONVIDADO_TITULO.CONV_TITU_CODIGO"
        )
        .orderBy("CONVIDADO_TITULO.CONV_TITU_CODIGO", "asc")
        .catch((err) => {
          console.log(err);
          return false;
        });
      return {
        AGEN_CODIGO: data.AGEN_CODIGO,
        AGEN_DATA: data.AGEN_DATA,
        SOCI_CODIGO: data.SOCI_CODIGO,
        CONVIDADOS: convidados,
      };
    });

    let result;
    await Promise.all(agendaConvidados).then((results) => (result = results));

    return result;
  }
}

module.exports = Agenda;

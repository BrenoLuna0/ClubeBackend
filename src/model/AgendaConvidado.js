const connection = require("../pgConnection");

class AgendaConvidado {
  constructor(
    AGEN_CODIGO,
    convidados,
    SOCI_CODIGO,
    AGEN_CONV_TITU_OBSERVACAO,
    DATA_HORA_INCL
  ) {
    this.AGEN_CODIGO = AGEN_CODIGO;
    this.convidados = convidados;
    this.SOCI_CODIGO = SOCI_CODIGO;
    this.AGEN_CONV_TITU_OBSERVACAO = AGEN_CONV_TITU_OBSERVACAO;
    this.DATA_HORA_INCL = DATA_HORA_INCL;
  }

  async save() {
    const rows = this.convidados.map((convidado) => {
      if (convidado != null) {
        return {
          AGEN_CODIGO: this.AGEN_CODIGO,
          CONV_TITU_CODIGO: convidado.CONV_TITU_CODIGO,
          SOCI_CODIGO: this.SOCI_CODIGO,
          AGEN_CONV_TITU_OBSERVACAO: this.AGEN_CONV_TITU_OBSERVACAO,
          DATA_HORA_INCL: this.DATA_HORA_INCL,
        };
      }
    });
    const convidado = await connection("AGENDA_CONVIDADO_TITULO")
      .returning("*")
      .insert(rows)
      .catch(function (err) {
        console.log(err);
        return false;
      });

    return convidado;
  }
}

module.exports = AgendaConvidado;

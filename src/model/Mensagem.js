const connection = require("../pgConnection");
const moment = require("moment");

class Mensagem {
  constructor(MESG_TITULO, MESG_DESCRICAO, MESG_DATA_INICIO, MESG_DATA_FIM) {
    this.MESG_TITULO = MESG_TITULO;
    this.MESG_DESCRICAO = MESG_DESCRICAO;
    this.MESG_DATA_INICIO = MESG_DATA_INICIO;
    this.MESG_DATA_FIM = MESG_DATA_FIM;
  }

  async save() {
    const message = await connection("MENSAGEM")
      .returning("*")
      .insert({
        MESG_TITULO: this.MESG_TITULO,
        MESG_DESCRICAO: this.MESG_DESCRICAO,
        MESG_DATA_INICIO: this.MESG_DATA_INICIO,
        MESG_DATA_FIM: this.MESG_DATA_FIM,
      })
      .catch((err) => {
        console.log(err);
        return false;
      });
    return message;
  }

  static async getReadMessages(tituCodigo) {
    const data = moment(new Date()).format("YYYY-MM-DD");
    return await connection("MENSAGEM")
      .join(
        "MENSAGEM_TITULO",
        "MENSAGEM_TITULO.MESG_CODIGO",
        "=",
        "MENSAGEM.MESG_CODIGO"
      )
      .where("MENSAGEM_TITULO.TITU_CODIGO", tituCodigo)
      .andWhere(function () {
        this.where("MENSAGEM.MESG_DATA_INICIO", "<=", data).andWhere(
          "MENSAGEM.MESG_DATA_FIM",
          ">=",
          data
        );
      })
      .select("*")
      .orderBy("MENSAGEM.MESG_CODIGO", "desc")
      .catch((err) => {
        console.log(err);
        return false;
      });
  }

  static async getNotReadMessage(tituCodigo) {
    const data = moment(new Date()).format("YYYY-MM-DD");
    return await connection
      .raw(
        'SELECT "MESG_CODIGO" FROM "MENSAGEM" EXCEPT SELECT "MESG_CODIGO" FROM "MENSAGEM_TITULO" WHERE "TITU_CODIGO" = ? ORDER BY "MESG_CODIGO" ASC',
        [tituCodigo]
      )
      .then(async (response) => {
        return await connection("MENSAGEM")
          .whereIn(
            "MESG_CODIGO",
            response.rows.map((item) => item.MESG_CODIGO)
          )
          .andWhere(function () {
            this.where("MESG_DATA_INICIO", "<=", data).andWhere(
              "MESG_DATA_FIM",
              ">=",
              data
            );
          });
      })
      .catch((err) => {
        console.log(err);
        return false;
      });
  }

  static async readMessage(MESG_CODIGO, TITU_CODIGO) {
    return await connection("MENSAGEM_TITULO")
      .returning("*")
      .insert({
        MESG_CODIGO,
        TITU_CODIGO,
      })
      .catch((err) => {
        console.log(err);
        return false;
      });
  }

  static async countNotReadMessage(tituCodigo) {
    const data = moment(new Date()).format("YYYY-MM-DD");
    return await connection
      .raw(
        'SELECT "MESG_CODIGO" FROM "MENSAGEM" EXCEPT SELECT "MESG_CODIGO" FROM "MENSAGEM_TITULO" WHERE "TITU_CODIGO" = ? ORDER BY "MESG_CODIGO" ASC',
        [tituCodigo]
      )
      .then(async (response) => {
        return await connection("MENSAGEM")
          .count("MESG_CODIGO")
          .whereIn(
            "MESG_CODIGO",
            response.rows.map((item) => item.MESG_CODIGO)
          )
          .andWhere(function () {
            this.where("MESG_DATA_INICIO", "<=", data).andWhere(
              "MESG_DATA_FIM",
              ">=",
              data
            );
          });
      })
      .catch((err) => {
        console.log(err);
        return false;
      });
  }
}

module.exports = Mensagem;

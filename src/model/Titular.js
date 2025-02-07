const connection = require("../pgConnection");
const jwt = require("jsonwebtoken");
const md5 = require("md5");

class Titular {
  constructor(
    TITU_CODIGO,
    TITU_NUME_TITULO,
    SOCI_CODIGO,
    SOCI_NOME,
    SOCI_CPFCNPJ
  ) {
    this.TITU_CODIGO = TITU_CODIGO;
    this.TITU_NUME_TITULO = TITU_NUME_TITULO;
    this.SOCI_CODIGO = SOCI_CODIGO;
    this.SOCI_NOME = SOCI_NOME;
    this.SOCI_CPFCNPJ = SOCI_CPFCNPJ;
  }

  static async getTitulares() {
    const titulares = await connection("TITULO")
      .select(
        "TITU_CODIGO",
        "TITU_NUME_TITULO",
        "SOCI_CODIGO",
        "SOCI_NOME",
        "SOCI_CPFCNPJ"
      )
      .catch(function (err) {
        console.log(err.message);
        return false;
      });
    return titulares;
  }

  static async login(codigo, senha) {
    let tituCodigo;
    parseInt(codigo.replace(".", "").replace(".", "").replace("-", "")) > 999999
      ? (tituCodigo = 0)
      : (tituCodigo = parseInt(
          codigo.replace(".", "").replace(".", "").replace("-", "")
        ));
    const titular = await connection("TITULO")
      .where("TITU_NUME_TITULO", tituCodigo)
      .orWhere("SOCI_CPFCNPJ", codigo)
      .select(
        "TITU_CODIGO",
        "TITU_NUME_TITULO",
        "SOCI_CODIGO",
        "SOCI_NOME",
        "SOCI_CPFCNPJ",
        "SENHA_WEB_MD5"
      )
      .catch(function (err) {
        console.log(err.message);
        return false;
      });

    if (!titular || titular.length == 0) {
      return false;
    }

    if (titular[0].SENHA_WEB_MD5 === md5(senha).toUpperCase()) {
      const token = jwt.sign(
        {
          id: titular.TITU_CODIGO,
          nome: titular.SOCI_NOME,
        },
        process.env.SECRET
      );

      return {
        titular,
        token,
      };
    } else {
      return false;
    }
  }

  static async changePassword(codigo, novaSenha, senhaAntiga) {
    const verificacao = await connection("TITULO")
      .where("TITU_CODIGO", codigo)
      .andWhere("SENHA_WEB_MD5", md5(senhaAntiga).toUpperCase())
      .select("*")
      .then((response) => {
        if (response.length !== 0) {
          return true;
        } else {
          return false;
        }
      })
      .catch((err) => {
        console.log(err);
        return false;
      });
    if (verificacao) {
      const titular = await connection("TITULO")
        .returning("*")
        .where("TITU_CODIGO", codigo)
        .update("SENHA_WEB_MD5", md5(novaSenha).toUpperCase())
        .catch((err) => {
          console.log(err);
          return false;
        });

      return titular;
    } else {
      return false;
    }
  }
}

module.exports = Titular;

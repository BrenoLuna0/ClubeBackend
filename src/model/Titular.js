const connection = require('../connection');
const jwt = require('jsonwebtoken');
const md5 = require('md5');

class Titular {
    constructor(TITU_CODIGO, TITU_NUME_TITULO, SOCI_CODIGO, SOCI_NOME, SOCI_CPFCNPJ) {
        this.TITU_CODIGO = TITU_CODIGO;
        this.TITU_NUME_TITULO = TITU_NUME_TITULO;
        this.SOCI_CODIGO = SOCI_CODIGO;
        this.SOCI_NOME = SOCI_NOME;
        this.SOCI_CPFCNPJ = SOCI_CPFCNPJ;
    }


    static async getTitulares() {
        const titulares = await connection("SIAC_TS.VW_TITULO").select('TITU_CODIGO', 'TITU_NUME_TITULO', 'SOCI_CODIGO', 'SOCI_NOME', 'SOCI_CPFCNPJ').catch(function (err) {
            console.log(err.message);
            return false;
        });
        return titulares;
    }

    static async login(codigo, senha) {
        const titular = await connection('SIAC_TS.VW_TITULO').where('TITU_NUME_TITULO', parseInt(codigo))
            .orWhere('SOCI_CPFCNPJ', codigo)
            .select('TITU_CODIGO', 'TITU_NUME_TITULO', 'SOCI_CODIGO', 'SOCI_NOME', 'SOCI_CPFCNPJ', 'SENHA_WEB_MD5')
            .catch(function (err) {
                console.log(err.message);
                return false;
            });

        if (!titular || titular.length == 0) {
            return false;
        }

        if (titular[0].SENHA_WEB_MD5 === md5(senha).toUpperCase()) {
            const token = jwt.sign({
                id: titular.TITU_CODIGO,
                nome: titular.SOCI_NOME
            },
                process.env.SECRET);
            
            
            return {
                titular,
                token
            };
        } else {
            return false;
        }
    }
}

module.exports = Titular;
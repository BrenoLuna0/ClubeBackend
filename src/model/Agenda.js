const connection = require('../connection');

class Agenda {
    constructor(AGEN_CODIGO, AGEN_DATA, AGEN_DIA_SEMANA, AGEN_QTD_CONVIDADO, DATA_HORA_INCL){
        this.AGEN_CODIGO = AGEN_CODIGO;
        this.AGEN_DATA = AGEN_DATA;
        this.AGEN_DIA_SEMANA = AGEN_DIA_SEMANA;
        this.AGEN_QTD_CONVIDADO = AGEN_QTD_CONVIDADO;
        this.DATA_HORA_INCL = DATA_HORA_INCL;
    }

    async save(){
        const convidado = await connection('AGENDA')
        .returning('*')
        .insert({
            AGEN_CODIGO : this.AGEN_CODIGO,
            AGEN_DATA : this.AGEN_DATA,
            AGEN_DIA_SEMANA : this.AGEN_DIA_SEMANA,
            AGEN_QTD_CONVIDADO : this.AGEN_QTD_CONVIDADO,
            DATA_HORA_INCL : this.DATA_HORA_INCL
        }).catch(function(err){
            console.log(err);
            return false;
        });

        return convidado;
    }

}

module.exports = Agenda;
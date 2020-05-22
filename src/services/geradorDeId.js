const oracledb = require('oracledb');

async function gerarId(req, res) {
    const connection = await oracledb.getConnection({
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        connectString: process.env.DB_HOST
    });

    const sql = 'select SEQ_CONVIDADO_TITULO.NEXTVAL from dual';

    connection.execute(sql, [], { autoCommit: true }, function (err, result) {
        if (err) {
            console.log('Erro ao gerar ID ' + err.message);
        } else {
            res.send(result.rows[0]);
        }
    })
}

module.exports = gerarId;
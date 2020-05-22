require('dotenv').config();
const express = require('express');

const app = express();

app.use(express.json());
app.use(express.urlencoded());

app.use('/api', require('./src/routes'));
app.listen(process.env.PORT || 3013, ()=>{
    console.log('Servidor ouvindo na porta 3013');
});
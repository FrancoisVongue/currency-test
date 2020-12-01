const dotenv = require('dotenv').config();
const {DATABASE_CONNECTION} = process.env;

const express = require('express');
const {InitDb} = require('./init-db');

const dbConnection = InitDb(DATABASE_CONNECTION);
const {Currency} = require('./CurrencyModel');
const app = express();

app.get('/api/currencies', async (req, res) => {
    const result = Currency.find();
    res.status(200).json({result});
});
app.post('/api/currencies', async (req, res) => {
    console.log(req.body);
/*
    const currencies = req.body.map(({txt, cc, rate}) => {
        return {name: txt, code: cc, course: rate};
    });

    const result = Currency.insertMany(currencies);
    res.status(200).json({result});
*/
});

app.use((err, req, res, next) => {
    res.status(500).json({message: `internal server error`});
})

app.listen(3000, () => console.log('listening at 3000 port'))

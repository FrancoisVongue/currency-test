const dotenv = require('dotenv').config();
const {DATABASE_CONNECTION} = process.env;

const express = require('express');
const {InitDb} = require('./init-db');

const dbConnection = InitDb(DATABASE_CONNECTION);
const app = express();

app.

app.listen(3000, () => console.log('listening at 3000 port'))

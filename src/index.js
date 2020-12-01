const dotenv = require('dotenv').config();
const {DATABASE_CONNECTION, JWT_SECRET} = process.env;

const express = require('express');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const {InitDb} = require('./init-db');

const dbConnection = InitDb(DATABASE_CONNECTION);
const {Currency} = require('./CurrencyModel');
const {User} = require('./UserModel');
const {comparePassword, obfuscatePassword} = require('./SecurityUtil')
const app = express();

app.use(bodyParser.json());

app.post('/api/register', async (req, res) => {
    const {login, password} = req.body;
    if(!login || !password)
        res.status(400).json({message: 'Invalid credentials'})

    const hashedPassword = await obfuscatePassword(password);
    const createdUser = await User.create({login, password: hashedPassword});

    res.status(200).json({
        user: createdUser
    })
});
app.post('/api/login', async(req, res) => {
    const {login, password} = req.body;
    if(!login || !password)
        return res.status(400).json({message: 'Invalid login info'})

    const user = await User.findOne({login: login});
    if(!user)
        return res.status(404).json({message: `User with login ${login} does not exist`})

    const validPassword = await comparePassword(password, user.password);
    if(!validPassword)
        return res.status(404).json({message: `Invalid password`});

    const token = jwt.sign({id: user._id}, JWT_SECRET);
    res.status(200)
        .header('x-auth-token', token)
        .json({ user: user })
});
app.use((req, res, next) => {
    const token = req.header('x-auth-token');
    try {
        const payload = jwt.verify(token, JWT_SECRET);
        req.body.user = payload;
        next();
    } catch(e)  {
        res.status(401).json({
            message: 'Invalid bearer token',
        })
    }
});
app.get('/api/currencies', async (req, res) => {
    const {searchQuery = '', limit = 5, page = 1} = req.query;

    const result = await Currency
        .find({})
        .skip((page - 1) * limit)
        .limit(+limit)
        .select(['name', 'code', 'course', '-_id']);

    const filteredResult = result.filter(({name}) => {
        if(!searchQuery)
            return true;

        let matchedTimes = 0;
        let searchCursor = 0;
        for(let i = 0; i < name.length && searchCursor < searchQuery.length; i++) {
            const character = name[i];
            const searchCharacter = searchQuery[searchCursor];

            if(character.toLowerCase() === searchCharacter.toLowerCase())  {
                matchedTimes++;
                searchCursor++;
            }
        }
        return matchedTimes === searchQuery.length;
    });

    res.status(200).json(filteredResult);
});
app.get('/api/currencies/:id', async (req, res) => {
    const currencyId = req.params.id;
    let currency;
    try {
        currency = await Currency.findOne({_id: currencyId});
    } catch (e) {
        return res.status(404).json({
            message: `Invalid currency Id`
        });
    }

    if(currency) {
        return res.status(200).json(currency);
    }
    return res.status(404).json({
        message: `Currency with id: ${currencyId} does not exist`
    });
});
app.post('/api/currencies', async (req, res) => {
    const currencies = req.body.map(({txt, cc, rate}) => {
        return {name: txt, code: cc, course: rate};
    });

    const result = await Currency.insertMany(currencies);
    res.status(200).json({result});
});

app.use((err, req, res, next) => {
    res.status(500).json({message: `internal server error`});
})

app.listen(3000, () => console.log('listening at 3000 port'))

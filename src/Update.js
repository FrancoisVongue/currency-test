const dotenv = require('dotenv').config({path: '../.env'});
const {DATABASE_CONNECTION} = process.env;
const {Currency} = require('./CurrencyModel');
const {InitDb} = require('./init-db')

const [code, course] = process.argv.slice(2, 4);
const update = async () => {
    await InitDb(DATABASE_CONNECTION);

    try {
        const newCurrency = await Currency.findOneAndUpdate(
            { code },
            { course },
            {new: true});

        if(!newCurrency)
            throw new Error(`Currency with code: ${code} doesn't exist`)

        console.log(`Successfully Updated: ${newCurrency.name}, current value: ${newCurrency.course}`);
    } catch (e) {
        console.log(`Could not update, because: ${e.message}`);
        process.exit(0);
    }
}

update();

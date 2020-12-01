const mongoose = require('mongoose');

let connection = null;
exports.InitDb = async (dbString) => {
    if(connection)
        return Promise.resolve(connection);

    try {
        connection = await mongoose.connect(dbString, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useFindAndModify: false,
            useUnifiedTopology: true,
        });
        console.log('connected to the database');
    } catch (e) {
        console.log('failed to connect to the database using: ' + dbString);
        process.exit(1);
    }
}

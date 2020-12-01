const mongoose = require('mongoose');

exports.InitDb = async (dbString) => {
    try {
        const connection = await mongoose.connect(dbString, {
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

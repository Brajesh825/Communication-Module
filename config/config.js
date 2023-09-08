const mongoose = require('mongoose');

class Database {
    static connect() {
        mongoose.connect('mongodb://localhost:27017/shunyaComm', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }).then(()=> {
            console.log('conected');
        })

    }
}

module.exports = Database;

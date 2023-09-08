const mongoose = require('mongoose');

class Database {
    static connect() {
        mongoose.connect('mongodb+srv://nodejsDeepak:nodejsDeepak@cluster0.lnx1ekk.mongodb.net/COMmod?', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }).then(()=> {
            console.log('conected');
        })

    }
}

module.exports = Database;

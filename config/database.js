const mongoose = require('mongoose')

const configureDB = () =>{
    const connection_uri = 'mongodb://127.0.0.1:27017/full-task'
        mongoose.connect(connection_uri, { useNewUrlParser: true })
        .then(() => {
            console.log(' database: connected')
        })
        .catch((err) => {
            console.log(' database: error')
        })
}

module.exports = configureDB



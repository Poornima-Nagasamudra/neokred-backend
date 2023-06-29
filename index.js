const express = require('express')
const cors = require('cors')
const app = express()
const port = 4005
const configureDB = require('./config/database')
const routes = require('./config/routes')


app.use(express.json())
app.use(cors())
configureDB()
app.use('/', routes)

app.listen(port, function(){
    console.log('server runs ', port)
})

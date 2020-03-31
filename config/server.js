const express = require('express')
const consign = require('consign')
const bodyParser = require('body-parser')
const expressValidator = require('express-validator')

const app = express()

/* setar as variaveis 'view engine' e 'views' do express*/ 
app.set('view engine', 'ejs')
app.set('views', './app/views')

app.use(express.static('./app/public'))

app.use(bodyParser.urlencoded({extended: true}))

app.use(expressValidator())

/** efetua o autoload das rotas, dos models e dos controllers para o objeto app */
consign()
    .include('app/routes')
    .then('app/models')
    .then('app/controllers')
    .into(app)

module.exports = app
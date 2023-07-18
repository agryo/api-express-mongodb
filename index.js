/*
----------------------------
    Configuração inicial
----------------------------
*/

// Importação da Configuração do DB
require('dotenv').config()
// Importação do Express
const express = require('express')
// Importação do Mongoose
const mongoose = require('mongoose')

// Executar o Express (Inicializar)
const app = express()

/* Forma de ler o JSON */
// Middlewares
app.use(
    express.urlencoded({
        extended: true
    })
)
// O Express irá utilizar JSON para pedidos e respostas
app.use(express.json())

/* Rotas da API */
// Importando a Rota
const personRoutes = require('./routes/personRoutes')
// Usando a Rota
app.use('/person', personRoutes)

/* Rota Inicial / endpoint */
app.get('/', (rec, res) => {
    // Mostrar requisição
    res.json({ message: 'Oi Express!' })
})

/* Conexão com o Bando de Dados */
// Pega a variavel "DB_USER" do arquivo ".env"
const DB_USER = process.env.DB_USER
// Pega a variavel "DB_PASSWORD" do arquivo ".env"
const DB_PASSWORD = encodeURIComponent(process.env.DB_PASSWORD)
// Conecta ao MongoDB usando as variaveis acima
mongoose.connect(
    `mongodb+srv://${DB_USER}:${DB_PASSWORD}@apicluster.pic0bce.mongodb.net/?retryWrites=true&w=majority`
)
.then(() => {
    // Ativando a porta da API
    console.log("Conectado ao MongoDB!")
    app.listen(3000)
})
.catch((err) => console.log(err))
/* Configuração inicial */
// Importação UserDB
const UserDB = require('./crypt/UserDB.js')

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

app.use(express.json())

/* Rota Inicial / endpoint */
app.get('/', (rec, res) => {
    // Mostrar requisição
    res.json({ message: 'Oi Express!' })
})

/* Conexão com o Bando de Dados */
mongoose.connect(
    `mongodb+srv://${UserDB.usuario}:${UserDB.senha}@apicluster.pic0bce.mongodb.net/?retryWrites=true&w=majority`
)
.then(() => {
    // Ativando a porta da API
    console.log("Conectado ao MongoDB!")
    app.listen(3000)
})
.catch((err) => console.log(err))
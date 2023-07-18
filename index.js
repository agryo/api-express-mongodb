/*
----------------------------
    Configuração inicial
----------------------------
*/

// Importação UserDB
const UserDB = require('./crypt/UserDB')
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
mongoose.connect(
    `mongodb+srv://${UserDB.usuario}:${UserDB.senha}@apicluster.pic0bce.mongodb.net/?retryWrites=true&w=majority`
)
.then(() => {
    // Ativando a porta da API
    console.log("Conectado ao MongoDB!")
    app.listen(3000)
})
.catch((err) => console.log(err))
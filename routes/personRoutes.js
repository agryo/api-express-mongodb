const router = require('express').Router()

const req = require('express/lib/request')
const Person = require('../models/Person')

// Adicionando os dados ao DB
router.post('/', async (req, res) => {
    /* 
        Aqui o "req.body" é o corpo da requisição
        Ex: {nome: "Teste", salario: 2000, aprovado: false}
    */
    const { nome, salario, aprovado } = req.body

    // Validar se o nome está preechido
    if (!nome) {
        res.status(422).json({ error: 'O nome é obrigatório!' })
        return
    }

    // Objeto person a ser utilizado para inserção
    const person = {
        nome,
        salario,
        aprovado
    }

    try {
        // Criando os Dados no DB do objeto acima person
        await Person.create(person)
        // Resposta de sucesso no HTML do POST
        res.status(201).json({ message: 'Pessoa adicionada com sucesso!' })
    } catch (error) {
        // Resposta de erro no HTML do POST
        res.status(500).json({ error: error })
    }
})

// Leitura dos dados do DB
router.get('/', async (req, res) => {
    try {
        // Pega todos os dados de Person
        const pessoas = await Person.find()
        // Responde com o arquivo JSON com todas as pessoas cadastradas
        res.status(200).json(pessoas)

    } catch (error) {
        // Resposta de erro no HTML do GET
        res.status(500).json({ error: error })
    }
})

router.get('/:id', async (req, res) => {
    // Extrair o dado da requisição, pela URL = req.params (ID do MongoDB)
    const id = req.params.id

    try {
        // Cria a variavel pessoa e pega o "_id" do MongoDB e bota o "id" em pessoa
        const pessoa = await Person.findOne({ _id: id })

        // Testa se o ID existe
        if (!pessoa) {
            res.status(422).json({ message: 'Pessoa não encontrada!' })
            return
        }

        // Responde o status OK com o JSON = pessoa
        res.status(200).json(pessoa)
        
    } catch (error) {
        // Resposta de erro no HTML do GET
        res.status(500).json({ error: error })
    }
})

// Atualização de dados do DB (PUT - Espera atualização completa, PATCH - Espera atualização em parte, parcial)
router.patch('/:id', async (req, res) => {
    const id = req.params.id
    /* 
        Aqui o "req.body" é o corpo da requisição
        Ex: {nome: "Teste", salario: 2000, aprovado: false}
    */
    const { nome, salario, aprovado } = req.body

    // Objeto person a ser utilizado para inserção
    const person = {
        nome,
        salario,
        aprovado
    }

    try {
        // Pega o ID da pessoa que será atualizada
        const atualizaPerson = await Person.updateOne({ _id: id }, person)

        // Testa se conseguiu atualizar alguma coisa
        if (atualizaPerson.matchedCount === 0) {
            res.status(422).json({ message: 'Pessoa não encontrada!' })
            return
        }
        // Responde com o JSON da pessoa atualizada
        res.status(200).json(person)
    } catch (error) {
        res.status(500).json({ error: error })
    }
})

// Delete - Apagar os dados do DB
router.delete('/:id', async (req, res) => {
    // Cria a variavel id
    const id = req.params.id
    
    // Pega o _id do MongoDB para a variavel id
    const pessoa = await Person.findOne({ _id: id })

    // Testa se a pessoa existe
    if (!pessoa) {
        res.status(422).json({ message: 'Pessoa não encontrada!' })
        return
    }

    try {
        // Deleta a pessoa no MongoDB
        await Person.deleteOne({ _id: id })
        // Responde com a mensagem JSON
        res.status(200).json({ message: 'Pessoa removida com sucesso!' })
        
    } catch (error) {
        res.status(500).json({ error: error })
    }
})

module.exports = router
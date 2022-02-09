const express = require('express')
const router = express.Router()
const cors = require('cors')
const posts = require('../model/posts')

const options = {
    origin: 'http://localhost:3000'
}

router.use(cors(options))

router.get('/all', (req, res) => {
    res.json(JSON.stringify(posts.getAll()))
});

router.post('/new', express.json(), (req, res) => {
    let title = req.body.title
    let description = req.body.description
    posts.newPost(title, description)

    res.send('Post adicionado')
});

router.delete('/delete', express.json(), (req, res) => {
    let id = req.body.id
    let result = posts.deletePost(id)

    if (result) {
        res.send(`O post com id ${id} foi apagado`)
    } else {
        res.send(`Não foi encontrado nenhum post com o id ${id}`)
    }
});

module.exports = router
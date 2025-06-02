const express = require('express')
const connectDatabase= require ('./db/db')
const app = express()
app.use(express.json())


app.get('/', async function (req, res){
    const db = await connectDatabase()
    const filmes = await db.all(`SELECT * FROM FILMES`)
    return res.status(200).json(filmes)
    
})

app.delete('/:id', async function (req, res){
    const id =  req.params.id
    const db = await connectDatabase()
    if(isNaN(id)){
        return res.status(400).send('id precisa ser numérico')
    }

    await db.exec(`DELETE FROM FILMES WHERE id = ${id}`)
    return res.status(200).send('Deletado com sucesso')
})

app.put('/:id', async function (req, res){
    const id =req.params.id
    const dados = req.body

    const db = await connectDatabase()
    await db.run(`UPDATE FILMES SET
        titulo ='${dados.nome}', genero='${dados.genero}'
        where id = ${id}`)
        return res.status(200).send('Atualizado com sucesso')
})

app.get('/:id', async function (req, res){
    const id = req.params.id
    const db = await connectDatabase()
    const filmes = await db.get(`SELECT * FROM FILMES where id ${id}`)
    return res.status(200).json(filmes)
    
})

app.post('/', async function (req, res){
    const dados = req.body
    const db = await connectDatabase()
    db.exec(`INSERT INTO FILMES (titulo, genero) VALUES 
        ('${dados.nome}', '${dados.genero}')`)
        return res.status(200).send('cadastrando com sucesso')
    
})

app.listen(3000, async function(){
    console.log('Servidor rodando na porta 3000')
    const db = await connectDatabase()

    await db.exec(`
        CREATE TABLE IF NOT EXISTS FILMES(
        id INTEGER PRIMARY KEY AUTOINCREMENT,   
        titulo varchar(255),
        genero varchar(255)
        )
    `)
}) 
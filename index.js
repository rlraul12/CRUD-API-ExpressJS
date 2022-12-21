const express = require('express')
const app = express()

app.use(express.json()) //necesario para el metedo post

let notes = [
    {
        "id":1,
        "content": "Me tengo que suscribir a Youtube",
        "date": "2019-05-30T17:30:31.0982",
        "importante": true
    },
    {
        "id":2,
        "content": "Tengo que estudiar las clases",
        "date": "2019-05-30T18:30:31.0982",
        "importante": false
    },
    {
        "id":3,
        "content": "Repasar los retos",
        "date": "2019-05-30T19:30:31.0982",
        "importante": true
    }
]

//const http = require('http')
//const app = http.createServer((request, response) => {
//    response.writeHead(200, { 'Content-Type':'text-plain' })
//    response.end('Hello World Raul')
//})

app.get('/', (request, response) => {
    response.send('<h1>Hola</h1>')
})

app.get('/api/notes', (request, response) => {
    response.json(notes)
})

app.get('/api/notes/:id', (request, response) => {
    //response.json(notes)
    const id = Number(request.params.id)
    const note = notes.find(note => note.id === id)
    //console.log({note})
    if (note){
        response.json(note)
    }else{
        response.status(404).end()
    }
    
})

app.delete('/api/notes/:id', (request, response) => {
    const id = Number(request.params.id)
    console.log({id})
    notes = notes.filter(note => note.id !== id) //Almacena todas las notas excepto la que se esta buscando
    response.status(204).end()
})

app.post('/api/notes', (request, response) => {
    const note = request.body

    console.log({note})
    
    if(!note || !note.content){
        return response.status(400).json({
            error: 'note.content is missing'
        })
    }

    const ids = notes.map(note => note.id)
    const maxId =  Math.max(...ids)

    const newNote = {
        id: maxId + 1,
        content: note.content,
        important: typeof note.important != 'undefined' ? note.important : false,
        date: new Date().toISOString()
    }

    notes = notes.concat(newNote)

    response.status(201).json(newNote)
})

const PORT = 3001
app.listen(PORT, () =>{
    console.log(`Server running on port ${PORT}`)
})

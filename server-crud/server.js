
const express = require('express')
const cors = require('cors')
const app = express()


app.use(cors())

app.use(express.json())

let books = [
    { id: 1, title: "book1", author: "1111" },
    { id: 2, title: "book2", author: "2222" }
]

app.get('/', (req, res) => {
    res.send(books)
})

app.get('/books/:id', (req, res) => {
    let bookId = parseInt(req.params.id)
    console.log(bookId);

    let book = books.find(b => b.id === bookId)
    if (book) {
        res.send(book)
    }
    else {
        res.status(404).send("book not found")
    }
})

app.post('/', (req, res) => {
    console.log(req);
    console.log("juhi6fu");
    
    let newBook = {
        id: books.length + 1,
        title: req.body.title,
        author: req.body.author
    }
    books.push(newBook)
    res.status(201).json(newBook)
})

app.put('/books/:id', (req, res) => {
    let bookId = parseInt(req.params.id)
    let editedBook = books.find(b => b.id === bookId)

    if (!editedBook) {
        res.status(404).send("book not found")
    }
    else {
        editedBook.title = req.body.title
        editedBook.author = req.body.author
    }
    res.status(200).send(editedBook)
})

app.delete('/books/:id', (req, res) => {
    let bookId = parseInt(req.params.id)
    let deletedBook = books.find(b => b.id === bookId)

    if (!deletedBook) {
        res.status(404).send("book not found")
    }
    else {
        books = books.filter(b => b.id !== bookId)
    }

    res.status(200).send("deleted")
})

app.listen(5000, () => {
    console.log("hello");
})
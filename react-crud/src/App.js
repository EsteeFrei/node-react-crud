import './App.css';
import { useEffect, useState } from 'react'

function App() {

  const [books, setBooks] = useState([])
  const [selectedId, setSelectedId] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')

  useEffect(() => {
    const fetchBooks = async () => {

      const response = await fetch('http://localhost:5000');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setBooks(data);
    };

    fetchBooks();
  }, []);

  const changeTitle = (e) => {
    setTitle(e.target.value)
  }

  const changeAuthor = (e) => {
    setAuthor(e.target.value)
  }

  const addBook = async (e) => {
    if (title === '' || author === '') {
      alert("an empty book!!!")
    }

    let book = { title: title, author: author }
    const response = await fetch('http://localhost:5000',
      {
        method: "post",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(book)
      })

    if (!response.ok) {
      throw new Error('add response was not ok');
    }

    const newBook = await response.json()
    setBooks((prevBooks) => [...prevBooks, newBook]);

  }

  const deleteBook = async (id) => {
    const response = await fetch(`http://localhost:5000/books/${id}`, { method: "delete" })
    if (!response.ok) {
      throw new Error('delete response was not ok');
    }
    setBooks(books.filter(b => b.id !== id))
  }

  const handleEditClick = (book) => {
    setTitle(book.title);
    setAuthor(book.author);
    setSelectedId(book.id);
  };

  const editBook = async () => {
    let editedBook = { title: title, author: author }
    const response = await fetch(`http://localhost:5000/books/${selectedId}`,
      {
        method: "put",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(editedBook)
      })

    if (!response.ok) {
      throw new Error('edit response was not ok');
    }

    const result = await response.json();
    setBooks((prevBooks) =>
      prevBooks.map(book => (book.id === selectedId ? result : book))
    );

    setTitle('');
    setAuthor('');
    setSelectedId(null);



  }

  return (
    <div class="container">
      <form >
        <label>title</label>
        <input type="input" value={title} onChange={changeTitle}></input>

        <label>Aothor</label>
        <input type="input" value={author} onChange={changeAuthor}></input>

        {!selectedId ? (<button onClick={addBook}>add book</button>) : (<button onClick={editBook}>edit book</button>)}


      </form>

        <h1>Book List</h1>
        <ul>
          {books.map(book => (
            <li key={book.id}>

              <strong>{book.title}</strong> by {book.author}
              <div class="edit-delete-buttons">
                <button onClick={() => handleEditClick(book)} >edit</button>
                <button onClick={() => { deleteBook(book.id) }} >delete</button>
              </div>
            </li>
          ))}
        </ul>


    </div>
  );
}

export default App;

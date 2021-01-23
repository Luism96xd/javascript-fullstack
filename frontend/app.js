import './styles/styles.css';

import UI from "./UI";

//Webpack agrega el script app.js al archivo index.html

const formulario = document.getElementById('book-form');

const cardsContainer = document.getElementById('books-cards');

cardsContainer.addEventListener('click', select);

function select(){
    if(event.target.classList.contains('delete')){
        //Con esto se borra el elemento de la interfaz
        const ui = new UI();
        ui.deleteBook(event.target.getAttribute("_id"));
        ui.renderMessage("The element has been removed","danger",3000);
    }
    event.preventDefault();
}

formulario.addEventListener('submit', getBookInfo);

function getBookInfo(){
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const isbn = document.getElementById('isbn').value;
    const image = document.getElementById('image').files[0];

    const formData = new FormData();
    formData.append('title', title);
    formData.append('author', author);
    formData.append('isbn', isbn)
    formData.append('image', image);

    const ui = new UI();
    ui.addNewBook(formData);
    ui.renderMessage("New book Added","success",4000);

    event.preventDefault();
    console.log(title,author, isbn, image);
}
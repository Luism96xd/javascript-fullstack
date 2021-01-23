class BookService {
    constructor(){
        this.URI = "/api/books";
    }
    async getBooks(){
        const response = await fetch(this.URI);//Devuelve un string raw
        const books = await response.json();
        return books;
    }
    async postBook(book){
        const response = await fetch(this.URI, {
            //headers
            method: "POST",
            body: book,
        });
        const data = await response.json();
        console.log("Libro guardado: ",data)
    }
    //Con esto se borra el elemento de la base de datos, pero no la imagen en uploads
    async deleteBook(bookId){
        const response = await fetch(`${this.URI}/${bookId}`, {
            method: "DELETE",
            headers: { 
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();
        console.log("Libro eliminado",data);
    }
}

module.exports = BookService;
//export default BookService;
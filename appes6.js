class Book{
    constructor(title,author,isbn){
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}

class UI{
    addBookToList(book){
        const list = document.getElementById('book-list');
        const row = document.createElement('tr');
        row.innerHTML=`<td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href="#" class="delete">X</a></td>`;

        list.appendChild(row);
    }

    showAlerts(message,className){
        const div = document.createElement('div');
        div.className = `alert ${className}`;
        div.appendChild(document.createTextNode(message));
        const container = document.querySelector('.container');
        const form = document.querySelector('#book-form');
        container.insertBefore(div,form);
        setTimeout(function(){
            document.querySelector('.alert').remove();
        },3000);
    }

    deleteBook(target){
        if(target.className === 'delete'){
            target.parentElement.parentElement.remove();
        }
    }

    clearFields(){
        document.getElementById('title').value = '';
        document.getElementById('author').value = '';
        document.getElementById('isbn').value = '';
    }
}

class Storage{
    static getBooks(){
        let books;
        if(localStorage.getItem('books') === null){
            books = [];
        }else{
            books = JSON.parse(localStorage.getItem('books'));
        }
        return books;
    }

    static displayBooks(){
        const books = Storage.getBooks();
        books.forEach(function(book){
            const ui = new UI;
            ui.addBookToList(book);
        });
    }

    static addBooks(book){
        const books = Storage.getBooks();
        books.push(book);

        localStorage.setItem('books',JSON.stringify(books));
    }

    static removeBooks(isbn){
        const books = Storage.getBooks();

        books.forEach(function(book,index){
            if(book.isbn === isbn){
                books.splice(index,1);
            }
        });
        localStorage.setItem('books',JSON.stringify(books));
    }
}


//Dom load events

document.addEventListener('DOMContentLoaded',Storage.displayBooks);
const formSubmit = document.querySelector('#book-form');

function loadAllListeners(){
    formSubmit.addEventListener('submit',submitForm);
}

function submitForm(e){
    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    const isbn = document.querySelector('#isbn').value;
   
    const book = new Book(title,author,isbn);
    const ui = new UI();
    if(title === '' || author === '' || isbn === ''){
        ui.showAlerts('Please fill in all fields','error');
    }else{
        ui.addBookToList(book);
        Storage.addBooks(book);
        ui.clearFields();
        ui.showAlerts('Book added','success');
    } 
    e.preventDefault();
}

loadAllListeners();

//Event Listener for delete
document.getElementById('book-list').addEventListener('click',function(e){
    const ui = new UI();
    ui.deleteBook(e.target);
    Storage.removeBooks(e.target.parentElement.previousElementSibling.textContent);
    ui.showAlerts('Delete Success','success');
    e.preventDefault();
});
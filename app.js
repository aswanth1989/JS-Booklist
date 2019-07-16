// Book Constructor
function Book(title,author,isbn){
this.title = title;
this.author = author;
this.isbn = isbn;
}


//UI Constructor
function UI(){
    UI.prototype.addBookToList = function(book){
        const list = document.getElementById('book-list');
        const row = document.createElement('tr');
        row.innerHTML=`<td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href="#" class="delete">X</a></td>`;

        list.appendChild(row);
    }

    UI.prototype.clearFields = function(){
        document.getElementById('title').value = '';
        document.getElementById('author').value = '';
        document.getElementById('isbn').value = '';
    }

    UI.prototype.showAlerts = function(message,className){
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

    UI.prototype.deleteBook = function(target){
        if(target.className === 'delete'){
            target.parentElement.parentElement.remove();
        }
    }
}

//Event listener

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
    ui.showAlerts('Delete Success','success');
    e.preventDefault();
});
console.log('connected');
// book Class
class Book {
  // making constructor 
  constructor(name, author, type) {
    this.name = name;
    this.author = author;
    this.type = type;
  }
}

// Display Class, contains most of the function 

class Display {
 
  // yha hamne ek display nam ki class bnayi hai isme ham display wale sare functions rakhenge jaise add show delete wagera sab aur isme local storage use karke data ko preserve bhi karenge
  add() {
   // is step se local storage se books bula reh hai agar dekho phle se hongi to hi obj bnake object bna legne json se nhi to empty array bna denge fir harr elment pe taravel karne ke liye loop lagaya 
    let books = localStorage.getItem("books");
    let localBookObj;
// upar jo object bnaya hai usme books ka data store hoga
    if (books == null) {
      localBookObj = [];
    } else {
      localBookObj = JSON.parse(books);
    }

    let html = "";
    for (let i = 0; i < localBookObj.length; i++) {
//yha loopp mai travel kar rhe hai sab kuh store karne ke liye 
      html += `<tr>
                      <th scope="row" class="content">${i + 1}</th>
                      <td>${localBookObj[i].name}</td>
                      <td>${localBookObj[i].author}</td>
                      <td>${localBookObj[i].type}</td>
                      <td><button id = "${i}" onclick = "deleteNote(this.id)" class="btn btn-success" style="background-color:red;">Delete Book</button></td>
                </tr>`;
    }
    let tableBody = document.getElementById("tableBody");
   // is wali line se table ka nya elment bnake uska data change kar rhe hai jo upar html bnaya usse ki nyi row add ho jaye suar usme ye sab aa jaye jo stort kiy
    tableBody.innerHTML = html;
  }

  // implementation of clear function, this function clears the screen when we add the book into local storage 
  clear() {
    let libraryForm = document.getElementById("libraryForm");
// yha p reset function ko call kar rhe hai aur jo upar likha hoga use reset kar rrhe ahia new entry ke liye
    libraryForm.reset();
  }

  // implemantaion of show function
  show(type, showMessage) {
    let message = document.getElementById("message");
   // ye wala function upar message display karega ki agar book add nhi ho sakti to red se warna light color se bootstrap se uthqaya hai ye format
    message.innerHTML = `<div class="alert alert-${type} alert-dismissible fade show" role="alert">
                            <strong>Message:  </strong><b>${showMessage}</b>
                            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                         </div>`;
                         setTimeout(function () {
                            message.innerHTML = ''
                        }, 3000);
  }
}


// ye us text ko fetch karega jo sarchtxt id pe hoga
let search = document.getElementById("searchTxt");
// whenever we type anything in search box, it will again and again be called 
search.addEventListener("input", searchTheBooks);
// defining the function that will be executed
function searchTheBooks(e) {
  // this is the value that is added in search box, it will change again and again, as soon as something is typed or deleted from the search box 
  let inputValue = search.value;
  // getting hold of the table body, that is going to be manipulated 
  let tableBody = document.getElementById("tableBody");
  // getting the table rows length 
  let n = tableBody.rows.length;
  // running loop for every row 
  for (let i = 0; i < n; i++) {
    // getting all the text for every row, 
    // text that is present in all the colums 
    // we are getting this, because we will use this to find out whether this row should be displayed or not 
    let text = tableBody.rows[i].innerText;
    // if the inputValue is present in this row value, then this row will be visible 
    if(text.includes(inputValue)){
      tableBody.rows[i].style.display = '';
      // console.log(true);
    }else{
      // otherwise hide the display of this row 
      tableBody.rows[i].style.display = 'none';
      // console.log(false);
    }
  }
}


// Function to delete a book
// we are getting the id of the row, that is need to be deleted  
function deleteNote(id) {
  // getting all the books as a string 
  let book = localStorage.getItem("books");
  let localBookObj;
  // if no book is not present because, user can only delete a book when it is present in library, otherwise delete option would not be there 
  // converting book string into the object 
  localBookObj = JSON.parse(book);

  // deleting the element with given id, using splice function 
  localBookObj.splice(id, 1);
  // storing back again in the form of string in the local storage 
  localStorage.setItem("books", JSON.stringify(localBookObj));
  // again calling add or you can say that display function so that books can be displayed again 
  display.add();
}


// implementation of Validate function
function validate(book) {
  if (book.name.length < 2 || book.author.length < 2) return false;
  else return true;
}

// creating an object of Display class and naming it as display 
let display = new Display()
// this is initial call, when page is opened and suppose there is already items in local storage, this will display this 
// local storage can have previous items because if you already have visited the website 
display.add();



// add Submit event listener to form 'id - libraryForm'
let libraryForm = document.getElementById("libraryForm");
// as soon as someone click add book button, then this will get activated 
libraryForm.addEventListener("submit", libraryFormSubmit);

// function that will run when we click submit button on form
function libraryFormSubmit(e) {
  //   console.log("You have submitted library form");
  // getting all the values, name, author name, type of book 
  let name = document.getElementById("bookName").value;
  let author = document.getElementById("authorName").value;

  let sciencefiction = document.getElementById("sciencefiction");
  let programming = document.getElementById("programming");
  let Horror = document.getElementById("Horror");
  let Comic = document.getElementById("Comic");

  let type;

  // Logic to get, what is this type of book 
  if (sciencefiction.checked) {
    type = sciencefiction.value;
  } else if (programming.checked) {
    type = programming.value;
  } else if (Horror.checked) {
    type = Horror.value;
  }
  else if (Comic.checked) {
    type = Comic.value;
  }

  // adding to the local storage
  let localBook = localStorage.getItem("books");
  if (localBook == null) {
    localBookObj = [];
  } else {
    localBookObj = JSON.parse(localBook);
  }

  let book = new Book(name, author, type);
  //   console.log(book);

  let temp = validate(book);
  // console.log(temp);
  if (temp == true) {
    // if book gets validated, then push into the book object 
    localBookObj.push(book);
    // again setting local storage from book object 
    localStorage.setItem("books", JSON.stringify(localBookObj));
    // now calling add to display the books 
    display.add();
    // clearing form when we done add;
    display.clear();
    // Show Successs message to the user
    display.show("success", "Your book has been added");
  } else {
    // show error to user
    display.show("warning", "Sorry you cannot add this book");
  }
  // this is added to prevent the default behaviour of form, so that it can be easily viewed 
  e.preventDefault();
}
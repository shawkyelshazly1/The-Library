let books = [];

class Book {
  constructor(title, author, pages, isRead) {
    (this.title = title),
      (this.author = author),
      (this.pages = pages),
      (this.isRead = isRead);
  }
}

let mainBooksContainer = document.querySelector(".main");
let booksContainer = document.querySelector(".container");
let addBookFormContainer = document.querySelector(".form_container");

/*
    Switch between add book form and main view with add button
    Close modal button & using Escape button
*/
let addBookBtn = document.querySelector(".add");
addBookBtn.addEventListener("click", () => {
  booksContainer.classList.toggle("hidden");
  addBookFormContainer.classList.toggle("hidden");
  addBookBtn.classList.toggle("hidden");
});

let closeModalBtn = document.querySelector(".close_modal");
closeModalBtn.addEventListener("click", () => {
  booksContainer.classList.toggle("hidden");
  addBookFormContainer.classList.toggle("hidden");
  addBookBtn.classList.toggle("hidden");
});

window.addEventListener("keydown", (e) => {
  if (e.key == "Escape" && booksContainer.classList.contains("hidden")) {
    booksContainer.classList.toggle("hidden");
    addBookFormContainer.classList.toggle("hidden");
    addBookBtn.classList.toggle("hidden");
  }
});

/*
    Displaying, Adding, Removing books
*/

let createBookCard = (newBook, id) => {
  let bookCard = document.createElement("div");
  let titleHeader = document.createElement("h3");
  let bookImage = document.createElement("img");
  let authorParagraph = document.createElement("p");
  let pagesParagraph = document.createElement("p");
  let readContainer = document.createElement("div");
  let readItParagraph = document.createElement("p");
  let readItLabel = document.createElement("label");
  let readItInput = document.createElement("input");
  let readItSpan = document.createElement("span");
  let deleteBtn = document.createElement("button");

  bookCard.classList.add("book");
  authorParagraph.classList.add("author");
  pagesParagraph.classList.add("pages");
  readContainer.classList.add("read");
  readItLabel.classList.add("switch");
  readItSpan.classList.add("slider", "round");
  deleteBtn.classList.add("deleteBook");

  bookImage.setAttribute("src", "./assets/cover_default.png");
  readItInput.setAttribute("type", "checkbox");
  deleteBtn.setAttribute("data-id", id);

  titleHeader.textContent = newBook.title;
  authorParagraph.textContent = `By: ${newBook.author}`;
  pagesParagraph.textContent = `Pages: #${newBook.pages}`;
  deleteBtn.textContent = "Delete";

  if (newBook.isRead) {
    readItInput.checked = true;
  }

  deleteBtn.addEventListener("click", (e) => {
    removeBook(e.target.dataset.id);
  });

  readItLabel.appendChild(readItInput);
  readItLabel.appendChild(readItSpan);
  readContainer.appendChild(readItParagraph);
  readContainer.appendChild(readItLabel);

  bookCard.appendChild(titleHeader);
  bookCard.appendChild(bookImage);
  bookCard.appendChild(authorParagraph);
  bookCard.appendChild(pagesParagraph);
  bookCard.appendChild(readContainer);
  bookCard.appendChild(deleteBtn);

  booksContainer.appendChild(bookCard);
};

let removeBook = (id) => {
  books = books.filter((book) => book.title !== books[id].title);
  updateBooksDisplay();
};

function addBook(title, author, pages, isRead) {
  let newBook = new Book(title, author, pages, isRead);
  books.push(newBook);
  updateBooksDisplay();
}

let resetBooksContainer = () => {
  booksContainer.textContent = "";
};

let displayBooks = () => {
  for (let book in books) {
    createBookCard(books[book], book);
  }
};

let updateBooksDisplay = () => {
  resetBooksContainer();
  displayBooks();
};

/* Inserting New Book from the form */

let newBookForm = document.querySelector(".fields");

let clearForm = () => {
  document.querySelector(".input_title").value = "";
  document.querySelector(".input_author").value = "";
  document.querySelector(".input_pages").value = "";
  document.querySelector(".input_isRead").checked = false;
};

let submitBook = (e) => {
  e.preventDefault();
  let title = document.querySelector(".input_title").value;
  let author = document.querySelector(".input_author").value;
  let pages = document.querySelector(".input_pages").value;
  let isRead = document.querySelector(".input_isRead").checked;
  addBook(title, author, pages, isRead);

  clearForm();

  booksContainer.classList.toggle("hidden");
  addBookFormContainer.classList.toggle("hidden");
  addBookBtn.classList.toggle("hidden");
};

newBookForm.onsubmit = submitBook;

window.onload = updateBooksDisplay();

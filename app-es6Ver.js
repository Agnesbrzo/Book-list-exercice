class Book {
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}

class ActionWithListItem {
  createItem(book) {
    const listContainer = document.querySelector(".table-book__list");
    const listItem = document.createElement("tr");
    listItem.innerHTML = `
      <td>${book.title}</td>
      <td>${book.author}</td>
      <td>${book.isbn}</td>
      <td><a href="#" class="delete">x</a></td>`;
    listContainer.appendChild(listItem);
  }

  deleteItem(target) {
    if (target.className === "delete") {
      target.parentElement.parentElement.remove();
    }
  }
  clearForm() {
    document.querySelector(".title").value = "";
    document.querySelector(".author").value = "";
    document.querySelector(".isbn").value = "";
  }

  showAlert(message, className) {
    const div = document.createElement("div");
    div.className = `alert ${className}`;
    div.innerText = message;
    const container = document.querySelector(".row");
    container.insertBefore(div, form);

    setTimeout(function deleteAlert() {
      document.querySelector(".alert").remove();
    }, 3000);
  }
}
//localstorage
class Store {
  static getBooks() {
    let books;
    if (localStorage.getItem("books") === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem("books"));
    }
    return books;
  }
  static displayBooks() {
    const books = Store.getBooks();
    books.forEach(function (book) {
      const actionWithListItem = new ActionWithListItem();
      actionWithListItem.createItem(book);
    });
  }
  static putBook(book) {
    const books = Store.getBooks();
    books.push(book);
    localStorage.setItem("books", JSON.stringify(books));
  }

  static deleteBook(isbn) {
    const books = Store.getBooks();

    books.forEach(function (book, index) {
      if (book.isbn === isbn) {
        books.splice(index, 1);
      }
    });
    localStorage.setItem("books", JSON.stringify(books));
  }
}

document.addEventListener("DOMContentLoaded", Store.displayBooks);

const form = document.querySelector(".form-book");

form.addEventListener("submit", function (e) {
  const title = document.querySelector(".title").value;
  const author = document.querySelector(".author").value;
  const isbn = document.querySelector(".isbn").value;
  const book = new Book(title, author, isbn);

  const actionWithListItem = new ActionWithListItem();

  if (title === "" || author === "" || isbn === "") {
    actionWithListItem.showAlert("Please, fill all the fields", "error");
  } else {
    actionWithListItem.createItem(book);
    Store.putBook(book);
    actionWithListItem.showAlert("You've added a book", "ok");
    actionWithListItem.clearForm();
  }
  e.preventDefault();
});

const listContainer = document.querySelector(".table-book__list");
listContainer.addEventListener("click", function (e) {
  const actionWithListItem = new ActionWithListItem();
  actionWithListItem.deleteItem(e.target);
  Store.deleteBook(e.target.parentElement.previousElementSibling.textContent);
  actionWithListItem.showAlert("You've deleted a book", "error");
  e.preventDefault;
});

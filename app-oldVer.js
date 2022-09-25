function Book(title, author, isbn) {
  this.title = title;
  this.author = author;
  this.isbn = isbn;
}

function ActionWithListItem() {}

ActionWithListItem.prototype.createItem = function (book) {
  const listContainer = document.querySelector(".table-book__list");
  const listItem = document.createElement("tr");
  listItem.innerHTML = `<td>${book.title}</td>
  <td>${book.author}</td>
  <td>${book.isbn}</td>
  <td><a href="#" class="delete">x</a></td>`;
  listContainer.appendChild(listItem);
};

ActionWithListItem.prototype.clearForm = function () {
  const title = (document.querySelector(".title").value = "");
  const author = (document.querySelector(".author").value = "");
  const isbn = (document.querySelector(".isbn").value = "");
};

ActionWithListItem.prototype.deleteItem = function (e) {
  if (e.target.classList.contains("delete")) {
    e.target.parentElement.remove();
  }
};

ActionWithListItem.prototype.showAlert = function (message, className) {
  const div = document.createElement("div");
  div.className = `alert ${className}`;
  div.innerText = message;
  const container = document.querySelector(".row");
  container.insertBefore(div, form);

  setTimeout(function deleteAlert() {
    document.querySelector(".alert").remove();
  }, 3000);
};

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
    actionWithListItem.showAlert("You've added a book", "ok");
    actionWithListItem.createItem(book);
    actionWithListItem.clearForm();
  }
  e.preventDefault();
});

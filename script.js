// selecting popup-box, popup-overlay, button
let popupBox = document.querySelector(".popup-box");
let popupOverlay = document.querySelector(".popup-overlay");
let popupButton = document.getElementById("add-popupbutton");

popupButton.addEventListener("click", function () {
    popupBox.style.display = "block";
    popupOverlay.style.display = "block"
})

//select cancel button
let cancelButton = document.getElementById("cancel-popup")

cancelButton.addEventListener("click", function (event) {
    event.preventDefault()
    
    // clear input fileds
    bookImage.value = '';
    bookTitle.value = '';
    bookAuthor.value = '';
    bookDescription.value = '';
    bookUrl.value = '';
    bookPages.value = '';
    popupBox.style.display = "none";
    popupOverlay.style.display = "none"
})

//select container, add-book,book-image-input, book-title-input, book-author-input, book-description-input, book-url-input, book-page-read

let Container = document.querySelector(".container");
let addBook = document.getElementById("add-book");
let bookImage = document.getElementById("book-image-input");
let bookTitle = document.getElementById("book-title-input");
let bookAuthor = document.getElementById("book-author-input");
let bookUrl = document.getElementById("book-url-input");
let bookPages = document.getElementById("book-page-read")
let bookDescription = document.getElementById("book-description-input");


addBook.addEventListener("click", function (event) {
    event.preventDefault()
    popupBox.style.display = "none"
    popupOverlay.style.display = "none"
    let div = document.createElement("div");
    div.setAttribute("class", "book-container");
    div.innerHTML = `<img src="${bookImage.value}" alt="BookCover"> <h2>${bookTitle.value}</h2> <h5>${bookAuthor.value}</h5>  <a href="${bookUrl.value}">Click to Read</a> <p>${bookDescription.value}</p> <h4 class="pages">Pages Read:<span>${bookPages.value || 0}</span></h4> <input type="number" class = "update-pages" placeholder = "Update Pages Here"> <button onclick = "updatePages(event)">Update</button> <button onclick="deletebook(event) ">Delete</button>`
    Container.appendChild(div);

    // clear input fileds
    bookImage.value = '';
    bookTitle.value = '';
    bookAuthor.value = '';
    bookDescription.value = '';
    bookUrl.value = '';
    bookPages.value = '';

})

Container.addEventListener("click", function (event) {
    if (event.target.tagName === "A") {
        if (!event.target.href || event.target.href === window.location.href) {
            event.preventDefault();
            alert("No URL provided for this book!");
        }
    }
});

//Delete book
function deletebook(event) {
    if (confirm("Are you sure you want to delete this book?")) {
        event.target.parentElement.remove();
    }
}

//Update Page number
function updatePages(event) {
    let bookDiv = event.target.parentElement;
    let newPages = bookDiv.querySelector(".update-pages").value;
    let pagesSpan = bookDiv.querySelector(".pages span");

    if (newPages && newPages >= 0) {
        pagesSpan.textContent = newPages;

        bookDiv.querySelector(".update-pages").value = "";
        alert("Pages Updated Successfully!");
    }
    else {
        alert("Please Enter a valid number of pages.")
    }
}

//Search box
let searchInput = document.getElementById("search");
searchInput.addEventListener("keyup", function () {
    let searchText = searchInput.value.toLowerCase();
    let Books = document.querySelectorAll(".book-container");
    Books.forEach(function (book) {
        let title = book.querySelector("h2").textContent.toLowerCase();
        let author = book.querySelector("h5").textContent.toLowerCase();

        if (title.includes(searchText) || author.includes(searchText)) {
            book.style.display = "";
        }
        else {
            book.style.display = "none";

        }
    })
})
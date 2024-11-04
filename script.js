const myLibrary = [];

const container = document.querySelector(".container")
const dialog = document.getElementById("dialog")
const showBtn = document.querySelector("#show")
const closeBtn = document.querySelector("#close")

showBtn.addEventListener("click", () => {
    dialog.style.display = "flex"
    dialog.showModal()
})

closeBtn.addEventListener("click", () => {
    dialog.style.display = "none"
    dialog.close()
})

function Book(title, author, pages, read) {

    this.title = title
    this.author = author
    this.pages = pages
    this.read = read
  
}

const bookForm = document.querySelector("#bookForm")

bookForm.addEventListener("submit", (e) => {

    e.preventDefault()

    const titleInput = document.querySelector("#titleInput").value.trim()
    const authorInput = document.querySelector("#authorInput").value.trim()
    const pagesInput = parseInt(document.querySelector("#pagesInput").value)
    const statusSelect = document.querySelector("#statusSelect").value
    
    if (titleInput && authorInput && !isNaN(pagesInput) && pagesInput > 0){

        let status;

        if(statusSelect == "notRead"){
            status = false
        }
        else{
            status = true;
        }
        
        const AddBook = new Book(titleInput, authorInput, pagesInput, status)
        console.log(AddBook);
        addBookToLibrary(AddBook)
        bookForm.reset();
        dialog.style.display = "none"
        dialog.close()
    }
})

function addBookToLibrary(newBook) {
    myLibrary.push(newBook)
    displayBook()
}

addBookToLibrary(new Book("1984", "George Orwell", 338, true))
addBookToLibrary(new Book("Game of Thrones", "George R.R. Martin", 720, false))

console.log(myLibrary);

function displayBook(){

    container.innerHTML = ""

    myLibrary.map((book) => {

        const bookIndex = myLibrary.indexOf(book);

        const card = document.createElement("div")
        card.classList = "card"
        
        const title = document.createElement("h1")
        title.innerHTML = `Title : ${book.title}`

        const author = document.createElement("h2")
        author.innerHTML = `Author : ${book.author}`

        const pages = document.createElement("h2")
        pages.innerHTML = `Pages : ${book.pages}`

        const status = document.createElement("h3")
        status.innerHTML = `Status : ${book.read ? "I've read" : "not read yet"}.`

        const deleteBtn = document.createElement("button")
        deleteBtn.innerText = "Delete"

        deleteBtn.addEventListener("click", () => {
            if (bookIndex !== -1) {
                myLibrary.splice(bookIndex, 1);
                displayBook();
            }
        });

        card.appendChild(title)
        card.appendChild(author)
        card.appendChild(pages)
        card.appendChild(status)
        card.appendChild(deleteBtn)

        console.log(card);

        container.appendChild(card)
    })

}

displayBook()
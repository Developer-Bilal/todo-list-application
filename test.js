const inputText = document.querySelector(".input-text");
const inputBtn = document.querySelector(".input-btn");
const ulContainer = document.querySelector(".ul-container");

// load items from local storage
document.addEventListener("DOMContentLoaded", loadItems);

// add an item
inputBtn.addEventListener("click", addItem);

// add item using "Enter"
inputText.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    addItem();
  }
});

// check or delete item
ulContainer.addEventListener("click", (event) => {
  if (event.target.classList.contains("check")) {
    checkItem(event);
  } else if (event.target.classList.contains("delete")) {
    deleteItem(event);
  }
});

function addItem() {
  if (inputText.value) {
    li = createListElement(inputText.value);

    ulContainer.insertBefore(li, ulContainer.firstChild);
    // clear input field
    inputText.value = "";
    saveItems();
  }
}

function checkItem(event) {
  const li = event.target.closest("li");
  if (li.parentNode === ulContainer) {
    li.style.textDecoration = "line-through";
    ulContainer.appendChild(li);
    saveItems();
  }
}

function deleteItem(event) {
  const li = event.target.closest("li");
  if (li.parentNode === ulContainer) {
    ulContainer.removeChild(li);
    saveItems();
  }
}

// Save items to local storage
function saveItems() {
  const items = [];
  ulContainer.querySelectorAll("li").forEach((li) => {
    items.push({
      text: li.childNodes[0].nodeValue.trim(),
      checked: li.style.textDecoration === "line-through",
    });
  });
  localStorage.setItem("toDoItems", JSON.stringify(items));
}

// Load items from local storage
function loadItems() {
  const items = JSON.parse(localStorage.getItem("toDoItems")) || [];
  items.forEach((item) => {
    li = createListElement(item.text);

    if (item.checked) {
      li.style.textDecoration = "line-through";
    }
    ulContainer.appendChild(li);
  });
}

// create list element
function createListElement(item) {
  const li = document.createElement("li");
  li.className = "item";

  li.innerHTML = `                 
        ${item}
        <div class="state-btns">
            <button class="check">Check</button>
            <button class="delete">Delete</button>
        </div>`;

  return li;
}

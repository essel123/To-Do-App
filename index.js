// Array to store to-do list objects
let todos = [];

// Function to create a new to-do item
function createTodo(title, description, date) {
  const todo = {
    id: Date.now(),
    title,
    description,
    date,
    completed: false // New property to track completion status
  };
  todos.push(todo);
  renderTodos();
}

// Function to render to-do list
function renderTodos() {
  const todoList = document.getElementById("todo-list");
  todoList.innerHTML = "";

  todos.forEach(todo => {
    // Create card elements
    const todoCard = document.createElement("div");
    todoCard.className = "todo-card";
    if (todo.completed) {
      todoCard.classList.add("completed");
    }

    const cardHeader = document.createElement("div");
    cardHeader.className = "card-header";

    const cardTitle = document.createElement("h3");
    cardTitle.className = "card-title";
    cardTitle.textContent = todo.title;

    const cardDate = document.createElement("span");
    cardDate.className = "card-date";
    cardDate.textContent = new Date(todo.date).toLocaleDateString();

    cardHeader.appendChild(cardTitle);
    cardHeader.appendChild(cardDate);

    const cardBody = document.createElement("div");
    cardBody.className = "card-body";
    cardBody.textContent = todo.description;

    const cardFooter = document.createElement("div");
    cardFooter.className = "card-footer";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.className = "checkbox";
    checkbox.checked = todo.completed;
    checkbox.addEventListener("change", () => toggleCompletion(todo.id));

    const updateBtn = document.createElement("button");
    updateBtn.className = " update-btn";
    updateBtn.textContent = "Update";
    updateBtn.addEventListener("click", () => updateTodo(todo.id));

    const deleteBtn = document.createElement("button");
    deleteBtn.className = "btn delete-btn";
    deleteBtn.textContent = "Delete";
    deleteBtn.addEventListener("click", () => deleteTodo(todo.id));

    cardFooter.appendChild(checkbox);
    cardFooter.appendChild(updateBtn);
    cardFooter.appendChild(deleteBtn);

    todoCard.appendChild(cardHeader);
    todoCard.appendChild(cardBody);
    todoCard.appendChild(cardFooter);

    todoList.appendChild(todoCard);
  });
}

// Function to toggle completion status
function toggleCompletion(id) {
  const todo = todos.find(todo => todo.id === id);
  if (todo) {
    todo.completed = !todo.completed; // Toggle the completed status
    renderTodos();
  }
}

// Function to delete a to-do item
function deleteTodo(id) {
  todos = todos.filter(todo => todo.id !== id);
  renderTodos();
}

// Function to update a to-do item
function updateTodo(id) {
  const todo = todos.find(todo => todo.id === id);
  if (todo) {
    document.getElementById("todo-title").value = todo.title;
    document.getElementById("todo-description").value = todo.description;
    document.getElementById("todo-date").value = todo.date;

    deleteTodo(id);
  }
}

// Function to filter to-dos by date
function filterTodos(order) {
  todos.sort((a, b) => {
    return order === "asc"
      ? new Date(a.date) - new Date(b.date)
      : new Date(b.date) - new Date(a.date);
  });
  renderTodos();
}

// Event listeners
document.getElementById("create-btn").addEventListener("click", () => {
  const title = document.getElementById("todo-title").value;
  const description = document.getElementById("todo-description").value;
  const date = document.getElementById("todo-date").value;


  if (title && description && date) {
    createTodo(title, description, date);
    // Clear input fields
    document.getElementById("todo-title").value = "";
    document.getElementById("todo-description").value = "";
    document.getElementById("todo-date").value = "";
  } else {
    document.getElementById("error").style.display = 'flex';
    document.getElementById("close-btn").addEventListener('click',()=>{
      document.getElementById("error").style.display = 'none';
    })
  }
});

document.getElementById("filter-date").addEventListener("change", event => {
  filterTodos(event.target.value);
});

// Selectors
const todoInput = document.querySelector(".todo-input");
const todoBtn = document.querySelector(".todo-btn");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");

// Functions
const addTodo = (e) => {
  e.preventDefault();
  // todo div
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");
  // create LI
  const newTodo = document.createElement("li");
  newTodo.innerText = todoInput.value;
  newTodo.classList.add("todo-item");
  todoDiv.appendChild(newTodo);
  //   Add todo to local storage
  saveLocalTodos(todoInput.value);
  // Checked btn
  const completedBtn = document.createElement("button");
  completedBtn.innerHTML = '<i class="fas fa-check"></i>';
  completedBtn.classList.add("complete-btn");
  todoDiv.appendChild(completedBtn);
  // Trash btn
  const trashBtn = document.createElement("button");
  trashBtn.innerHTML = '<i class="fas fa-trash"></i>';
  trashBtn.classList.add("trash-btn");
  todoDiv.appendChild(trashBtn);
  // Add to div
  todoList.appendChild(todoDiv);
  // cLEAR INPUT
  todoInput.value = "";
};

function deleteCheck(e) {
  const item = e.target;
  //    Delete todo
  if (item.classList[0] === "trash-btn") {
    const todo = item.parentElement;
    // add animation
    todo.classList.add("fall");
    // delete from local storage
    removeLocalTodos(todo);
    // wait for transition and then remove from UI
    todo.addEventListener("transitionend", () => {
      todo.remove();
    });
  }
  //   Check todo
  if (item.classList[0] === "complete-btn") {
    const todo = item.parentElement;
    todo.classList.toggle("completed");
  }
}

function filterTodo(e) {
  const todos = todoList.childNodes;
  todos.forEach((todo) => {
    switch (e.target.value) {
      case "all":
        todo.style.display = "flex";
        break;
      case "completed":
        if (todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
      case "uncompleted":
        if (!todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
    }
  });
}

function saveLocalTodos(todo) {
  // check if theres already that file
  let todos;
  // if there isn"t then create an empty array
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } // if there is take it in its actual form
  else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  // add the parameter to the array
  todos.push(todo);
  // change it to a string and add to local storage
  localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodos(todo) {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } // if there is, take it in its actual form
  else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.forEach((todo) => {
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    // create LI
    const newTodo = document.createElement("li");
    newTodo.innerText = todo;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);
    // Checked btn
    const completedBtn = document.createElement("button");
    completedBtn.innerHTML = '<i class="fas fa-check"></i>';
    completedBtn.classList.add("complete-btn");
    todoDiv.appendChild(completedBtn);
    // Trash btn
    const trashBtn = document.createElement("button");
    trashBtn.innerHTML = '<i class="fas fa-trash"></i>';
    trashBtn.classList.add("trash-btn");
    todoDiv.appendChild(trashBtn);
    // Add to div
    todoList.appendChild(todoDiv);
  });
}

function removeLocalTodos(todo) {
  // check if theres already that file
  let todos;
  // if there isn"t then create an empty array
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } // if there is, take it in its actual form
  else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  //  get the index no of a particular value in local storage
  const todoIndex = todo.children[0].innerText;
  //  delete the particular value using the index no from the array in local storage
  todos.splice(todos.indexOf(todoIndex), 1);
  //  access to  local storage
  localStorage.setItem("todos", JSON.stringify(todos));
}

// Event Listeners
todoBtn.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);
filterOption.addEventListener("click", filterTodo);
document.addEventListener("DOMContentLoaded", getTodos);

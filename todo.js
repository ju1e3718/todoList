const toDoForm = document.querySelector(".todo_form");
const toDoInput = toDoForm.querySelector("input");
const toDoList = document.querySelector(".todo_list");
const inputBtn = document.querySelector("#input_btn")

let toDos = []

function saveTodo() {
    localStorage.setItem("toDos", JSON.stringify(toDos));
}

function printToDo(newToDo) {
    const li = document.createElement("li");
    li.id = newToDo.id;
    const span = document.createElement("span");
    // const checkBtn = document.createElement("button");
    const delBtn = document.createElement("button");
    span.innerHTML = newToDo.text;
    delBtn.innerText = "delete";
    // checkBtn.innerText = "✔";
    // li.append(checkBtn);
    li.appendChild(span);
    li.appendChild(delBtn);
    toDoList.appendChild(li);
    // checkBtn.addEventListener("click", checkTodo);
    // checkBtn.addEventListener("dblclick", uncheckTodo);
    delBtn.addEventListener("click", deleteTodo);
}

function deleteTodo(event) {
    const removingOne = event.target.parentElement;
    removingOne.remove();
    toDos = toDos.filter((toDo) => toDo.id !== parseInt(removingOne.id))
    saveTodo();
}

function addToDo(event) {
    event.preventDefault();
    const newTodo = toDoInput.value;
    toDoInput.value = "";
    const newTodoObj = {
        text: newTodo,
        id: Date.now(),
    }
    toDos.push(newTodoObj);
    printToDo(newTodoObj);

    saveTodo();
}

const savedTodos = localStorage.getItem("toDos")
console.log(savedTodos);
if (savedTodos !== null) {
    const parsedTodos = JSON.parse(savedTodos);
    toDos = parsedTodos;
    parsedTodos.forEach(printToDo);
}


// function checkTodo(event) {
//     const checkOne = event.target.parentElement;
//     checkOne.style.color = "#dddddd";
// }

// function uncheckTodo(event) {
//     const uncheckOne = event.target.parentElement;
//     uncheckOne.style.color = "black";
// }

toDoForm.addEventListener("submit", addToDo);
inputBtn.addEventListener("click", addToDo)
const todoList = [];
let todoID = 0;
const todoInputContent = document.getElementById('addTodo');
const addtodoButton = document.getElementById('addButton');
const editButton = document.getElementById('eButton');

console.log(todos);

window.onload = function () {
  cancelButton.style.display = 'none';
  eButton.style.display = 'none';
};


function deleteTodo(element) {
  console.log(element);

  todoList.splice(element.dataset.id, 1);
  console.log(todoList);
  element.remove();
}

function editTodo(element) {
  console.log(element.innerText);
  todoInputContent.value = element.dataset.content;

  editButton.addEventListener('click', () => {
    console.log(todoList);
    todoList[element.dataset.id].content = todoInputContent.value;
    console.log(todoList);
    showTasks();
  });
}


todoInputContent.addEventListener('keyup', (event) => {
  if (event.keyCode === 13) {
    addtodoButton.click();
  }
});


function showTasks() {
  let todoHtml = '';

  for (let i = 0; i < todoList.length; i++) {
    const todo = todoList[i];

    todoHtml += `<li class="todo" data-id="${todo.id}" data-content="${todo.content}">${todo.content}</li>
          <div class="editDiv">
          <button class="edit">Edit</button>
          <button class="delete">Delete</button>
          </div>
          `;
  }

  document.getElementById('todos').innerHTML = todoHtml;

  document.querySelector('.edit').addEventListener('click', () => {
    console.log('EDIT');
  });
  document.querySelector('.delete').addEventListener('click', () => {
    console.log('DELETE');
  });


  todoInputContent.value = '';
}

addtodoButton.addEventListener('click', () => {
  // Check if the input has been entered
  if (todoInputContent && todoInputContent.value !== '') {
    // If input has been entered create a todo object with an unique id
    const todoObject = {
      id: todoID++,
      content: todoInputContent.value,

    };

    // Add the todo to an array
    todoList.push(todoObject);
  }
  // Display todos on the screen
  showTasks();
});

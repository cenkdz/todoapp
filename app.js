const todoList = [];
let todoID = 0;
const todoInputContent = document.getElementById('addTodo');
const addtodoButton = document.getElementById('addButton');
const eButton = document.getElementById('eButton');
const cancelButton = document.getElementById('cancelButton');

window.onload = function () {
  cancelButton.style.display = 'none';
  eButton.style.display = 'none';
};

function editTodo(id) {
  console.log(`EDIT ${id}`);
}

function deleteTodo(id) {
  for (let a = 0; a < todoList.length; a += 1) {
    if (todoList[a].id === id) {
      todoList.splice(a, 1);
    }
  }

  showTodos();
}

function showTodos() {
  let todoHtml = '';
  const fragments = [];

  for (let i = 0; i < todoList.length; i += 1) {
    const todo = todoList[i];
    todoHtml = `<li class="todo">${todo.content}
          <div class="editDiv">
          <button class="edit">Edit</button>
          <button class="delete">Delete</button>
          </div>
          </li>
          `;

    const documentFragment = document.createRange().createContextualFragment(todoHtml);
    documentFragment.querySelector('.delete').addEventListener('click', () => {
      deleteTodo(todo.id);
    });

    documentFragment.querySelector('.edit').addEventListener('click', () => {
      editTodo(todo.id);
    });
    fragments.push(documentFragment);
  }

  const todosUL = document.getElementById('todos');
  while (todosUL.firstChild) {
    todosUL.firstChild.remove();
  }
  fragments.forEach((fragment) => {
    document.getElementById('todos').appendChild(fragment);
  });

  todoInputContent.value = '';
}
// SOLVE: WHY THE CONTENT ISN'T CLEAN ??

const addTodo = () => {
  // Check if the input has been entered
  if (todoInputContent && todoInputContent.value !== '') {
    const todoObject = {
      id: todoID++,
      content: todoInputContent.value,

    };


    todoList.push(todoObject);
  }

  showTodos();
};

todoInputContent.addEventListener('keyup', (event) => {
  if (event.keyCode === 13) {
    addTodo();
  }
});

addtodoButton.addEventListener('click', addTodo());

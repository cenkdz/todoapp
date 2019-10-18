const todoList = [];
let todoID = 0;
const todoInputContent = document.getElementById('addTodo');
const addEditTodoButton = document.getElementById('add_edit_Button');
const cancelButton = document.getElementById('cancelButton');
let currentPosition;
let mode;

window.onload = function () {
  this.addMode();
};

function clearInput() {
  todoInputContent.value = '';
}

function editMode() {
  mode = 'edit';
  addEditTodoButton.classList.remove('addCompleteB');
  addEditTodoButton.classList.add('editCompleteB');
  cancelButton.classList.remove('hide');
}

function addMode() {
  mode = 'add';
  cancelButton.classList.add('hide');
  addEditTodoButton.classList.remove('editCompleteB');
  addEditTodoButton.classList.add('addCompleteB');
  clearInput();
}
function searchList(id) {
  return todoList.findIndex((todoList) => todoList.id === id);
}

function editTodo(id) {
  editMode();
  if (id !== -1) {
    currentPosition = searchList(id);
    todoInputContent.value = todoList[currentPosition].content;
  } else {
    alert('Error');
    clearInput();
  }
}

function showTodos() {
  let todoHtml = '';
  const fragments = [];

  for (let i = 0; i < todoList.length; i += 1) {
    const todo = todoList[i];
    todoHtml = `<li class="todo">${todo.content}<div class="editDiv">
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
}

function deleteTodo(id) {
  currentPosition = searchList(id);
  todoList.splice(currentPosition, 1);
  addMode();
  showTodos();
}

cancelButton.addEventListener('click', () => {
  addMode();
});

const addTodo = () => {
  if (todoInputContent && todoInputContent.value !== '') {
    const todoObject = {
      id: todoID++,
      content: todoInputContent.value,

    };
    todoList.push(todoObject);
  }
  showTodos();
  clearInput();
};

function executeMode() {
  if (mode === 'add') {
    if (todoInputContent.value === '') {
      alert('Please write a todo.');
    }
    addTodo();
  } else if (mode === 'edit') {
    if (todoInputContent.value !== todoList[currentPosition].content) {
      const response = confirm('Are you sure ?');
      if (response === true) {
        todoList[currentPosition].content = todoInputContent.value;
        addMode();
        showTodos();
      }
    } else if (todoInputContent.value === todoList[currentPosition].content) {
      alert('No change in input!');
    }
    showTodos();
  }
}

todoInputContent.addEventListener('keyup', (event) => {
  if (event.keyCode === 13) {
    executeMode();
  }
});

addEditTodoButton.addEventListener('click', () => {
  executeMode();
});

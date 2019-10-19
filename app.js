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

function sanitizeHTML(string) {
  const temp = document.createElement('div');
  temp.textContent = string;
  return temp.innerHTML;
}

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
  return todoList.findIndex((todo) => todo.id === id);
}

function editTodo(id) {
  editMode();
  currentPosition = searchList(id);
  if (id !== -1) {
    todoInputContent.value = todoList[currentPosition].content;
  } else {
    alert('Error');
    clearInput();
  }
}

function deleteTodo(id) {
  const response = confirm('Are you sure ?');
  if (response === true) {
    todoList.splice(searchList(id), 1);
    addMode();
    showTodos();
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

const addTodo = () => {
  let cleanedInput = todoInputContent.value.replace(/^\s*/, '');
  cleanedInput = sanitizeHTML(cleanedInput);
  if (cleanedInput && cleanedInput !== '') {
    const todoObject = {
      id: todoID++,
      content: cleanedInput,

    };
    todoList.push(todoObject);
    showTodos();
  }

  clearInput();
};

function completeAction() {
  if (mode === 'add') {
    addTodo();
  } else if (mode === 'edit') {
    if (todoInputContent.value !== todoList[currentPosition].content) {
      todoList[currentPosition].content = todoInputContent.value;
      addMode();
      showTodos();
    }
    showTodos();
  }
}

cancelButton.addEventListener('click', () => {
  addMode();
});


todoInputContent.addEventListener('keyup', (event) => {
  if (event.keyCode === 13) {
    completeAction();
  }
});

addEditTodoButton.addEventListener('click', () => {
  completeAction();
});

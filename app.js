const todoList = [];
let todoID = 0;
const todoInputContent = document.getElementById('addTodo');
const addtodoButton = document.getElementById('addButton');
const editButton = document.getElementById('eButton');
const cancelButton = document.getElementById('cancelButton');
let currentPosition;

window.onload = function () {
  this.hideCancelButton();
  this.hideEditButton();
  this.showAddButton();
};

function showAddButton() {
  addtodoButton.style.display = 'initial';
}
function hideAddButton() {
  addtodoButton.style.display = 'none';
}
function showEditButton() {
  editButton.style.display = 'initial';
}
function hideEditButton() {
  editButton.style.display = 'none';
}
function showCancelButton() {
  cancelButton.style.display = 'initial';
}
function hideCancelButton() {
  cancelButton.style.display = 'none';
}

function searchList(id) {
  for (let a = 0; a < todoList.length; a += 1) {
    if (todoList[a].id === id) {
      return a;
    }
  }
}

function editTodo(id) {
  hideAddButton();
  showCancelButton();
  showEditButton();
  currentPosition = searchList(id);
  todoInputContent.value = todoList[currentPosition].content;
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

editButton.addEventListener('click', () => {
  console.log(currentPosition);
  hideEditButton();
  hideCancelButton();
  showAddButton();
  todoList[currentPosition].content = todoInputContent.value;
  todoInputContent.value = '';
  showTodos();
});

function deleteTodo(id) {
  currentPosition = searchList(id);
  todoList.splice(currentPosition, 1);
  showTodos();
}

cancelButton.addEventListener('click', () => {
  hideCancelButton();
  hideEditButton();
  showAddButton();
  todoInputContent.value = '';
});

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
    if (addtodoButton.style.display === 'initial') {
      addTodo();
    } else if (editButton.style.display === 'initial') {
      editButton.click();
    }
  }
});

addtodoButton.addEventListener('click', () => {
  addTodo();
});

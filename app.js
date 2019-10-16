const todoList = [];
let todoID = 0;
const todoInputContent = document.getElementById('addTodo');
const addEditTodoButton = document.getElementById('add_edit_Button');
const editButton = document.getElementById('eButton');
const cancelButton = document.getElementById('cancelButton');
let currentPosition;

window.onload = function () {
  cancelButton.style.display = 'none';
};
function editMode() {
  addEditTodoButton.innerText = 'EDIT';
  cancelButton.style.display = 'initial';
}

function addMode() {
  addEditTodoButton.innerText = 'ADD';
  cancelButton.style.display = 'none';
  todoInputContent.value = '';
}
function searchList(id) {
  console.log('THE ID');
  console.log(id);
  console.log(todoList);
  for (let a = 0; a < todoList.length; a += 1) {
    if (todoList[a].id === id) {
      return a;
    }
  }
  // return todoList.indexOf(todoList[id]);
}

function editTodo(id) {
  editMode();
  currentPosition = searchList(id);
  console.log(currentPosition);
  console.log(todoList);
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

function deleteTodo(id) {
  currentPosition = searchList(id);
  console.log(currentPosition);
  todoList.splice(currentPosition, 1);
  showTodos();
}

cancelButton.addEventListener('click', () => {
  addMode();
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
    if (addEditTodoButton.style.display === 'initial') {
      addTodo();
    } else if (editButton.style.display === 'initial') {
      editButton();
    }
  }
});

addEditTodoButton.addEventListener('click', () => {
  if (addEditTodoButton.innerText === 'EDIT') {
    todoList[currentPosition].content = todoInputContent.value;
    addMode();
    showTodos();
  } else if (addEditTodoButton.innerText === 'ADD') {
    addTodo();
  }
});

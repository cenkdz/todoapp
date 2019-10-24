const todoInputContent = document.getElementById('addTodo');
const addEditTodoButton = document.getElementById('add_edit_Button');
const cancelButton = document.getElementById('cancelButton');
let currentID;
let mode;
let todoList = [];

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
  showTodosPOST();
  cancelButton.classList.add('hide');
  addEditTodoButton.classList.remove('editCompleteB');
  addEditTodoButton.classList.add('addCompleteB');
  clearInput();
}

function editTodo(id) {
  editMode();
  currentID = id;
  readOneTodoPOST(id);
}
function showTodosPOST() {
  axios.post('http://localhost/api/product/read.php')
    .then((response) => {
      todoList = [...response.data.records];
      console.log(todoList);
      let todoHtml = '';
      const fragments = [];

      todoList.forEach((todo) => {
        todoHtml = `<li class="todo">${todo.content}<div class="editDiv">
          <button class="edit">Edit</button>
          <button class="delete">Delete</button>
          </div>
          </li>
          `;

        const documentFragment = document.createRange().createContextualFragment(todoHtml);
        documentFragment.querySelector('.delete').addEventListener('click', () => {
          deleteTodoPOST(todo.id);
        });

        documentFragment.querySelector('.edit').addEventListener('click', () => {
          editTodo(todo.id);
        });
        fragments.push(documentFragment);
      });


      const todosUL = document.getElementById('todos');
      while (todosUL.firstChild) {
        todosUL.firstChild.remove();
      }
      fragments.forEach((fragment) => {
        document.getElementById('todos').appendChild(fragment);
      });
    })
    .catch((error) => {
      console.log(error);
      document.getElementById('todos').firstChild.remove();
    });
}


function deleteTodoPOST(id) {
  const userResponse = confirm('Are you sure ?');
  if (userResponse === true) {
    axios.post('http://localhost/api/product/delete.php',
      {
        id,
      })
      .then((response) => {
        showTodosPOST();
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }
}

function readOneTodoPOST(id) {
  axios.get(`http://localhost/api/product/read_one.php?id=${id}`)
    .then((response) => {
      console.log(response);
      todoInputContent.value = response.data.content;
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => {
    });
}

function editTodoPOST(body) {
  console.log(body);
  axios.post('http://localhost/api/product/update.php', body)
    .then((response) => {
      console.log(response);
      showTodosPOST();
    })
    .catch((error) => {
      console.log(error);
    });
}

const addTodo = () => {
  const cleanedInput = todoInputContent.value.replace(/^\s*/, '').trim();
  if (cleanedInput && cleanedInput !== '') {
    const todoObject = {
      content: cleanedInput,
    };
    axios.post('http://localhost/api/product/create.php', JSON.stringify(todoObject))
      .then((response) => {
        console.log(response);
        showTodosPOST();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  clearInput();
};

function completeAction() {
  if (mode === 'add') {
    addTodo();
  } else if (mode === 'edit') {
    if (todoInputContent) {
      editTodoPOST({
        id: currentID,
        content: todoInputContent.value,
      });
      addMode();
    }
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

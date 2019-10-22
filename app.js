let todoList = [];
let todoID = 1;
const todoInputContent = document.getElementById('addTodo');
const addEditTodoButton = document.getElementById('add_edit_Button');
const cancelButton = document.getElementById('cancelButton');
let currentID;
let mode;

window.onload = function () {
  this.addMode();
};

function sanitizeHTML(string) {
  const temp = document.createElement('div');
  temp.textContent = string;
  console.log('adad');

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
function showTodosPOST()
{
  axios.post('http://localhost/api/product/read.php')
  .then(function (response) {
    let todoHtml = '';
  const fragments = [];

  for (let i = 0; i < response.data.records.length; i += 1) {
    const todo = response.data.records[i];
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
  }

  const todosUL = document.getElementById('todos');
  while (todosUL.firstChild) {
    todosUL.firstChild.remove();
  }
  fragments.forEach((fragment) => {
    document.getElementById('todos').appendChild(fragment);
  });
  })
  .catch(function (error) {
    return console.log(error);
  });
}

function deleteTodoPOST(id)
{
  const response = confirm('Are you sure ?');
  if (response === true) {
  axios.post('http://localhost/api/product/delete.php',
  {
    "id" : id
  })
  .then(function (response) {
    console.log(response);
    showTodosPOST();
  })
  .catch(function (error) {
    console.log(error);

  });

}
 
}

function readOneTodoPOST(id)
{
  axios.get('http://localhost/api/product/read_one.php?id='+id)
  .then(function (response) {
    // handle success
    console.log(response);
    todoInputContent.value =response.data.content;
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
  .finally(function () {
    // always executed
  });
}

function editTodoPOST(body){
  console.log(body);
  axios.post('http://localhost/api/product/update.php', body)
  .then(function (response) {
    console.log(response);
    showTodosPOST();
  })
  .catch(function (error) {
    console.log(error);
  });
};

const addTodo = () => {
  let cleanedInput = todoInputContent.value.replace(/^\s*/, '');
  cleanedInput = sanitizeHTML(cleanedInput);
  if (cleanedInput && cleanedInput !== '') {
    const todoObject = {
      content: cleanedInput
    };
    axios.post('http://localhost/api/product/create.php', JSON.stringify(todoObject))
    .then(function (response) {
      console.log(response);
      showTodosPOST();
    })
    .catch(function (error) {
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
        "id" : currentID,
        "content" : sanitizeHTML(todoInputContent.value)
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

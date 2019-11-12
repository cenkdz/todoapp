import axios from 'axios';
import Source from './Source';

const Home = {
  render: async () => {
    const view = `
        <div class= "container">
        <div class="addDiv">
            <h1>TODO APP</h1>
            <input id="addTodo" type="text" placeholder="Please add a todo.">
        </div>
        <div class="choiceDiv">
            <button type="submit" id="add_edit_Button"></button>
            <button id="cancelButton" class="hide">CANCEL</button>
        </div>
        <h2>Your To-Dos</h2>
        <div class="choiceDiv">
            <ul id="todos">
            </ul>
        </div>
    </div>
        `;
    return view;
  },
  after_render: async () => {
    const jwt = Source.getCookie('jwt');
    let currentUserId = '';

    axios.post('http://localhost/api/validate_token.php', JSON.stringify({ jwt }))
      .then((response) => {
        console.log(response);
        Source.loggedinNavbar();
        currentUserId = response.data.data.id;

        let selectedTodoID;
        let mode;
        let todoList = [];
        const todoInputContent = document.getElementById('addTodo');
        const addEditTodoButton = document.getElementById('add_edit_Button');
        const cancelButton = document.getElementById('cancelButton');

        addMode();

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
          showTodos();
          cancelButton.classList.add('hide');
          addEditTodoButton.classList.remove('editCompleteB');
          addEditTodoButton.classList.add('addCompleteB');
          clearInput();
        }

        function getSelectedTodo(id) {
          editMode();
          selectedTodoID = id;
          readOneTodo(id);
        }

        function getTodos() {
          return axios.get(`http://localhost/todoapi/api/product/read.php?user_id=${currentUserId}`).then((response) => response.data.records);
        }

        function deleteTodo(id) {
          const userResponse = confirm('Are you sure ?');
          if (userResponse === true) {
            axios.post('http://localhost/todoapi/api/product/delete.php',
              JSON.stringify({
                id,
              }))
              .then((response) => {
                console.log(response);
                showTodos();
              })
              .catch((error) => {
                console.log(error);
              });
          }
        }

        function editTodo(body) {
          console.log(body);
          axios.post('http://localhost/todoapi/api/product/update.php', body)
            .then((response) => {
              console.log(response);
              showTodos();
            })
            .catch((error) => {
              console.log(error);
            });
        }

        const addTodo = (todoObject) => {
          axios.post('http://localhost/todoapi/api/product/create.php', JSON.stringify(todoObject))
            .then((response) => {
              console.log(response);
              showTodos();
            })
            .catch((error) => {
              console.log(error);
            });
        };

        function showTodos() {
          getTodos().then((records) => {
            if (records !== undefined) {
              todoList = [...records];
            } else {
              todoList = [];
            }

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
                deleteTodo(todo.id);
              });

              documentFragment.querySelector('.edit').addEventListener('click', () => {
                getSelectedTodo(todo.id);
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
          });
        }

        function readOneTodo(id) {
          axios.get(`http://localhost/todoapi/api/product/read_one.php?id=${id}`)
            .then((response) => {
              console.log(response);
              todoInputContent.value = response.data.content;
            })
            .catch((error) => {
              console.log(error);
              alert('Todo couldn\'t be edited!');
            });
        }

        function completeAction() {
          if (mode === 'add') {
            const cleanedInput = todoInputContent.value.replace(/  +/g, '');
            if (cleanedInput && cleanedInput !== '') {
              const todoObject = {
                content: cleanedInput,
                user_id: currentUserId,
              };
              addTodo(todoObject);
              showTodos();
            }
            clearInput();
          } else if (mode === 'edit') {
            if (todoInputContent) {
              editTodo(JSON.stringify({
                id: selectedTodoID,
                content: todoInputContent.value,
              }));
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
      })
      .catch((error) => {
        console.log(JSON.stringify(jwt));
        alert(error);
        window.location.href = '/#/';
      });
  },

};

export default Home;

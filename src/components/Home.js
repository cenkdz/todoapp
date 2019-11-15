import axios from 'axios';
import Utils from '../services/Utils';

const Home = {
  // Render html
  render: async () => {
    const view = `
        <div>
            <input id="addTodo" type="text" placeholder="Please add a task.">
        </div>
            <button type="submit" id="add_edit_Button"></button>
            <button id="cancelButton" class="hide">CANCEL</button>
            <h2>Your Tasks</h2>
            <ul id="todos"></ul>
        `;
    return view;
  },
  after_render: async () => {
    // After the page is rendered all the functions are stated afterwards

    const jwt = Utils.getCookie('jwt');

    // Validate user token.
    axios.post('http://localhost/todoapi/api/validate_token.php', JSON.stringify({ jwt }))
    // If it's valid continue...
      .then((response) => {
        // Change navbar element visibilities.
        Utils.loggedinNavbar();

        const navHome = document.getElementById('homeLink');
        navHome.innerText = `${response.data.data.firstname} ${response.data.data.lastname}`;

        // Setting the needed variables.
        let currentUserId = '';
        let selectedTodoID;
        let mode;
        let todoList = [];

        // Getting the elements.
        const todoInputContent = document.getElementById('addTodo');
        const addEditTodoButton = document.getElementById('add_edit_Button');
        const cancelButton = document.getElementById('cancelButton');

        // Assigning the loggedin user_id according to the response.
        currentUserId = response.data.data.id;

        // Add mode activated on page load.
        addMode();



        function clearInput() {
          todoInputContent.value = '';
        }
        
        // Called when user clicks the edit button.
        // Adjusts button appeareance(visibility,text) accordingly.
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
        // Sets the id of the clicked todo
        function getSelectedTodo(id) {
          editMode();
          selectedTodoID = id;
          readOneTodo(id);
        }
        // Gets all the todos from the database
        function getTodos() {
          return axios.get(`http://localhost/todoapi/api/product/read.php?user_id=${currentUserId}`).then((response) => response.data.records);
        }
        // Called when user clicks the delete button and deletes it from the database
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
        // Called when the user changes the todo and presses edit button(the one below input)
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
        // Adds the todo to the database
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
        // Prints all todos to the page
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
              todoHtml = `
              <div>
              <li class="todo">${todo.content}<div class="editDiv">
              <button class="edit">EDIT</button>
              <button class="delete">DELETE</button>
              </div>
              </li>
              </div>
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
        // Called when user presses edit button and gets the clicked todo from the database
        // into the input field.
        function readOneTodo(id) {
          axios.get(`http://localhost/todoapi/api/product/read_one.php?id=${id}`)
            .then((response) => {
              console.log(response);
              todoInputContent.value = response.data.content;
            })
            .catch((error) => {
              console.log(error);
              // ALERT DIV WILL BE HERE
            });
        }
        // Decides which function is going to be executed according to the current mode
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
      // If the token is invalid alert the user and redirect to the welcome page
      .catch((error) => {
        console.log(JSON.stringify(jwt));
        // ALERT DIV WILL BE HERE
        window.location.href = '/#/';
      });
  },

};

export default Home;

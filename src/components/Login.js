import axios from 'axios';
import Utils from '../services/Utils';

const Login = {
  render: async () => {
    // Render html
    const view = `
            <h1>Login</h1>
            <div>
                <label for='email'>Email address</label>
                <input type='email' id='email' name='email' placeholder='Enter email' size="30">
                <label for='password'>Password</label>
                <input type='password'id='password' name='password' placeholder='Password' size="30">
            <button id='loginB'>Login</button>
            </div>
            <br>
            <br>
            <br>
            <div id="responseDiv">
            </div>
            </div>
        `;
    return view;
  },
  after_render: async () => {
    // After the page is rendered all the functions are stated afterwards

    // Removes jwt
    Utils.setCookie('jwt', '', 1);

    const emailI = document.getElementById('email');
    const passwordI = document.getElementById('password');
    const loginB = document.getElementById('loginB');
    const responseDiv = document.getElementById('responseDiv');
    let html;

    function formValidation() {
      responseDiv.innerHTML = '';
      if (!Utils.pass_validation(passwordI, 6, 30)) {
        const passwordCheck = `
        <h4>Password should not be empty / length should be between 6 and 30</h4>
        `;
        responseDiv.insertAdjacentHTML('beforeend', passwordCheck);
      }
      if (!Utils.validateEmail(emailI)) {
        const emailCheck = `
        <h4>You have entered an invalid email address</h4>
        `;
        responseDiv.insertAdjacentHTML('beforeend', emailCheck);
      }
      if (Utils.validateEmail(emailI) && Utils.pass_validation(passwordI, 6, 30)) { return true; }
    }

    // Called when user clicks on login button
    function login() {
      const validStatus = formValidation();

      if (validStatus === true) {
        const loginObject = {
          email: emailI.value,
          password: passwordI.value,
        };
        // Sends a request to the database with the username and password
        // If username and password is valid
        // Returns a user-specific genereated jwt token and sets the token as a cookie
        axios.post('http://localhost/todoapi/api/login.php', JSON.stringify(loginObject))
          .then((response) => {
            // Setting the token as a cookie
            Utils.setCookie('jwt', response.data.jwt, 1);
            window.location.href = '/#/home/';
          })
          .catch(() => {
            // ALERT DIV WILL BE HERE
            responseDiv.insertAdjacentHTML('beforeend', '<h4>E-mail or password is incorrect</h4>');
          });
      }
    }

    loginB.addEventListener('click', () => {
      login();
    });

    passwordI.addEventListener('keyup', (event) => {
      if (event.keyCode === 13) {
        login();
      }
    });

    emailI.addEventListener('keyup', (event) => {
      if (event.keyCode === 13) {
        login();
      }
    });
  },

};

export default Login;

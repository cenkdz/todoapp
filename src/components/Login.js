import axios from 'axios';
import Utils from '../services/Utils';

const Login = {
  render: async () => {
    // Render html
    const view = `
            <div class="login">
                <h1>Login</h1>
                <div>
                <label for='email'>Email address</label>
                <input type='email' id='email' name='email' placeholder='Enter email'>
            </div>
            <div>
                <label for='password'>Password</label>
                <input type='password'id='password' name='password' placeholder='Password'>
            </div>
 
            <button id='loginB'>Login</button>
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


    // Called when user clicks on login button
    loginB.addEventListener('click', () => {
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
        });
    });
  },

};

export default Login;

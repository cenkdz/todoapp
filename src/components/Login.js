import axios from 'axios';
import Source from './Source';

const Login = {
  render: async () => {
    const view = `
            <div class="login">
                <h1>Login</h1>
                <div>
                <label for='email'>Email address</label>
                <input type='email'id='email' name='email' placeholder='Enter email'>
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
    Source.setCookie('jwt', '', 1);

    const emailI = document.getElementById('email');
    const passwordI = document.getElementById('password');
    const loginB = document.getElementById('loginB');


    loginB.addEventListener('click', () => {
      const loginObject = {
        email: emailI.value,
        password: passwordI.value,
      };

      axios.post('http://localhost/api/login.php', JSON.stringify(loginObject))
        .then((response) => {
          console.log(response);
          Source.setCookie('jwt', response.data.jwt, 1);
          alert('Successful login ::)');
          window.location.href = '/#/home/';
        })
        .catch((error) => {
          alert('Unsuccessful login :/');
          console.log(error);
        });
    });
  },

};

export default Login;

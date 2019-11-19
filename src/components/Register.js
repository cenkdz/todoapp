import axios from 'axios';
import Utils from '../services/Utils';

const Register = {
  // Render html
  render: async () => `
      <h1>Register</h1>
      <div id="registerDiv">
          <div class="nameDiv">
          <label for="firstname">Firstname</label>
          <input type="text" id="firstname" size="30" required />
          </div>
          <div class="lastnameDiv">
          <label for="lastname">Lastname</label>
          <input type="text"  id="lastname" size="30" required />
          </div>
          <div class="emailDiv">
          <label for="email">Email</label>
          <input type="email" id="email" size="30" required />
          </div>
          <div class="passwordDiv">
          <label for="password">Password</label>
          <input type="password" id="password" size="30" required />
          </div>
      <button id="registerB">Register</button>
      <br>
      <br>
      <br>
      <div id="responseDiv">
      </div>
      </div>
        `,

  after_render: async () => {
    // After the page is rendered all the functions are stated afterwards

    const responseDiv = document.getElementById('responseDiv');
    const registerB = document.getElementById('registerB');
    const firstnameI = document.getElementById('firstname');
    const lastnameI = document.getElementById('lastname');
    const emailI = document.getElementById('email');
    const passwordI = document.getElementById('password');
    let html;

    function validateRegister() {
      responseDiv.innerHTML = '';
      if (Utils.isEmpty(firstnameI)) {
        firstnameI.setAttribute('placeholder', 'Please fill out all the fields');
      }

      if (Utils.isEmpty(lastnameI)) {
        lastnameI.setAttribute('placeholder', 'Please fill out all the fields');
      }

      if (Utils.isEmpty(emailI)) {
        emailI.setAttribute('placeholder', 'Please fill out all the fields');
      }

      if (Utils.isEmpty(passwordI)) {
        passwordI.setAttribute('placeholder', 'Please fill out all the fields');
      }

      if (!Utils.pass_validation(passwordI, 6, 30)) {
        responseDiv.insertAdjacentHTML('beforeend', '<h6>Password length should be min 6 max 30</h4>');
      }
      if (!Utils.validateEmail(emailI)) {
        responseDiv.insertAdjacentHTML('beforeend', '<h6>You have entered an invalid e-mail address</h4>');
      }

      if (firstnameI.value !== '' && lastnameI.value !== '' && !Utils.isEmpty(emailI) && !Utils.isEmpty(passwordI) && Utils.pass_validation(passwordI, 6, 30) && Utils.validateEmail(emailI)) {
        return true;
      }
    }


    // Called when user clicks register
    registerB.addEventListener('click', () => {
      const validStatus = validateRegister();


      if (validStatus === true) {
        const userObject = {
          firstname: firstnameI.value,
          lastname: lastnameI.value,
          email: emailI.value,
          password: passwordI.value,

        };

        // Registers the user to the database
        axios.post('http://localhost/todoapi/api/create_user.php', JSON.stringify(userObject))
          .then(() => {
            // ALERT DIV WILL BE HERE
            window.location.href = '/#/login';
          })
          .catch(() => {
            // ALERT DIV WILL BE HERE
            html = '<h4>We were unable to create your account.</h4>';
            responseDiv.innerHTML = html;
          });
      }
    });
  },
};

export default Register;

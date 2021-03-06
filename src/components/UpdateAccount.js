import axios from 'axios';
import Utils from '../services/Utils';

const UpdateAccount = {
// Render html
  render: async () => {
    const view = `
    <div>
      <h2>Update Account</h2>
              <label for="firstname">Firstname</label>
              <input type="text" name="firstname" id="firstname" required/>
              <label for="lastname">Lastname</label>
              <input type="text" name="lastname" id="lastname" required/>

              <label for="email">Email</label>
              <input type="email" name="email" id="email" required/>
              <label for="password">Password</label>
              <input type="password" name="password" id="password" />
          <button id="updateAccountB" class='btn btn-primary'>
              Save Changes
          </button>
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
    // All functions related with UpdateAccount page.

    const firstnameI = document.getElementById('firstname');
    const lastnameI = document.getElementById('lastname');
    const emailI = document.getElementById('email');
    const passwordI = document.getElementById('password');
    const jwt = Utils.getCookie('jwt');
    const updateB = document.getElementById('updateAccountB');
    const responseDiv = document.getElementById('responseDiv');
    let html;

    // Asks for validation from the server to be able to update account information
    axios.post('http://localhost/todoapi/api/validate_token.php', JSON.stringify({ jwt }))
      .then((vResponse) => {
        const navHome = document.getElementById('homeLink');
        navHome.innerText = `${vResponse.data.data.firstname} ${vResponse.data.data.lastname}`;
        Utils.loggedinNavbar();
        firstnameI.value = vResponse.data.data.firstname;
        lastnameI.value = vResponse.data.data.lastname;
        emailI.value = vResponse.data.data.email;

        updateB.addEventListener('click', () => {
          if (passwordI.value !== '' && firstnameI.value !== '' && lastnameI.value !== '' && emailI.value !== '') {
            const newUserObj = {
              firstname: firstnameI.value,
              lastname: lastnameI.value,
              email: emailI.value,
              password: passwordI.value,
              jwt,
            };
            axios.post('http://localhost/todoapi/api/update_user.php', JSON.stringify(newUserObj))
              .then((uResponse) => {
                html = '<h2>You have successfully updated your credentials.</h2>';
                responseDiv.innerHTML = html;
                window.setTimeout(() => {
                  responseDiv.style.display = 'none';
                }, 1500);
                Utils.setCookie('jwt', uResponse.data.jwt, 1);
              })
              .catch(() => {
                html = '<h3>We were unable to update your account.</h3>';
                responseDiv.innerHTML = html;
                window.setTimeout(() => {
                  responseDiv.style.display = 'none';
                }, 1500);
              });
          }
          responseDiv.innerHTML = '<h3>Please fill out all the information</h3>';
        });
      })
      .catch(() => {
        html = '<h2>You are not authorized.</h2>';
        responseDiv.innerHTML = html;
        window.location.href = '/#/';
      });
  },
};
export default UpdateAccount;

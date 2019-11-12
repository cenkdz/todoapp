import axios from 'axios';
// import { isFunction } from 'util';
import Source from './Source';

const UpdateAccount = {

  render: async () => {
    const view = `
      <h2>Update Account</h2>
          <div>
              <label for="firstname">Firstname</label>
              <input type="text" name="firstname" id="firstname" required/>
          </div>

          <div>
              <label for="lastname">Lastname</label>
              <input type="text" name="lastname" id="lastname" required/>
          </div>

          <div>
              <label for="email">Email</label>
              <input type="email" name="email" id="email" required/>
          </div>

          <div>
              <label for="password">Password</label>
              <input type="password" name="password" id="password" />
          </div>

          <button id="updateAccountB" class='btn btn-primary'>
              Save Changes
          </button>
          `;
    return view;
  },
  after_render: async () => {
    const firstnameI = document.getElementById('firstname');
    const lastnameI = document.getElementById('lastname');
    const emailI = document.getElementById('email');
    const passwordI = document.getElementById('password');
    const jwt = Source.getCookie('jwt');
    const updateB = document.getElementById('updateAccountB');

    axios.post('http://localhost/api/validate_token.php', JSON.stringify({ jwt }))
      .then((response) => {
        console.log(response);
        Source.loggedinNavbar();
        firstnameI.value = response.data.data.firstname;
        lastnameI.value = response.data.data.lastname;
        emailI.value = response.data.data.email;

        updateB.addEventListener('click', () => {
          const newUserObj = {
            firstname: firstnameI.value,
            lastname: lastnameI.value,
            email: emailI.value,
            password: passwordI.value,
            jwt,
          };
          axios.post('http://localhost/api/update_user.php', JSON.stringify(newUserObj))
            .then((response) => {
              console.log(response);
              alert('Successfully updated!!');
              Source.setCookie('jwt', response.data.jwt, 1);
            })
            .catch((error) => {
              alert('Unable to update:/');
              console.log(error);
            });
        });
      })
      .catch((error) => {
        alert(error);
        window.location.href = '/#/';
      });
  },
};
export default UpdateAccount;

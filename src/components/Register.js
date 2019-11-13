import axios from 'axios';

const Register = {
  // Render html
  render: async () => `
      <h1>Register</h1>
      <div>
          <label for="firstname">Firstname</label>
          <input type="text" id="firstname" id="firstname" required />
      <div>
          <label for="lastname">Lastname</label>
          <input type="text" id="lastname" id="lastname" required />
      </div>
      <div>
          <label for="email">Email</label>
          <input type="email" id="email" id="email" required />
      </div>
      <div>
          <label for="password">Password</label>
          <input type="password" id="password" id="password" required />
      </div>
      <button id="registerB">Register</button>
        `,

  after_render: async () => {
    // After the page is rendered all the functions are stated afterwards

    const registerB = document.getElementById('registerB');
    const firstnameI = document.getElementById('firstname');
    const lastnameI = document.getElementById('lastname');
    const emailI = document.getElementById('email');
    const passwordI = document.getElementById('password');

    // Called when user clicks register
    registerB.addEventListener('click', () => {
      const userObject = {
        firstname: firstnameI.value,
        lastname: lastnameI.value,
        email: emailI.value,
        password: passwordI.value,

      };

      // Registers the user to the database
      axios.post('http://localhost/todoapi/api/create_user.php', JSON.stringify(userObject))
        .then((response) => {
          alert('Successfully registered!!');
        })
        .catch((error) => {
          alert('Registration unsuccessful!');
        });
    });
  },
};

export default Register;

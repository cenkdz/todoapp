const Navbar = {
  render: async () => {
    const view = `
    <div id="navbar">
    <a href="/#/home" id="homeLink" class="hide">Home</a>
    <a href="/#/" id="welcome">Welcome</a>
    <a href="/#/register" id="register">Register</a>
    <a href="/#/login" id="login">Login</a>
    <a href="/#/updateaccount" id="updateAccount" class="hide">Update Account</a>
    <a href="/#/login" id="logout" class="hide">Logout</a>
  </div> 
        `;
    return view;
  },
  after_render: async () => {
    const logoutB = document.getElementById('logout');

    logoutB.addEventListener('click', () => {
      alert('You are logged out!');
    });
  },

};

export default Navbar;

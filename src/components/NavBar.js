const Navbar = {
  render: async () => {
    // Render html
    const view = `
    <div id="navbar">
    <a href="/#/home" id="homeLink" class="hide"></a>
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
    // After the page is rendered all the functions are stated afterwards

    const logoutB = document.getElementById('logout');

    // Called when user clicks logout
    logoutB.addEventListener('click', () => {
      alert('You are logged out!');
    });
  },

};

export default Navbar;

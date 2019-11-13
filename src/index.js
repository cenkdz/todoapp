import HomePage from 'components/HomePage';
import Welcome from 'components/Welcome';
import Login from 'components/Login';
import Home from 'components/Home';
import Error404 from 'components/Error404';
import Register from 'components/Register';
import Navbar from 'components/Navbar';
import Utils from 'services/Utils';
import UpdateAccount from 'components/UpdateAccount';
import 'todoStyle.css';

HomePage();

// List of supported routes. Any url other than these routes will throw a 404 error
const routes = {
  '/': Welcome,
  '/home': Home,
  '/updateaccount': UpdateAccount,
  '/register': Register,
  '/login': Login,
};


// The router code. Takes a URL, checks against the list of supported
// routes and then renders the corresponding content page.
const router = async () => {
  // Lazy load view element:
  const header = null || document.getElementById('header_container');
  const content = null || document.getElementById('page_container');

  // Render the Header of the page
  header.innerHTML = await Navbar.render();
  await Navbar.after_render();

  window.onscroll = function () { myFunction(); };

  // Get the navbar
  const navbar = document.getElementById('navbar');

  // Get the offset position of the navbar
  const sticky = navbar.offsetTop;

  // Add the sticky class to the navbar when you reach its scroll position.
  // Remove "sticky" when you leave the scroll position
  function myFunction() {
    if (window.pageYOffset >= sticky) {
      navbar.classList.add('sticky');
    } else {
      navbar.classList.remove('sticky');
    }
  }


  // Get the parsed URl from the addressbar
  const request = Utils.parseRequestURL();

  // Parse the URL and if it has an id part, change it with the string ":id"
  const parsedURL = (request.resource ? `/${request.resource}` : '/') + (request.id ? '/:id' : '') + (request.verb ? `/${request.verb}` : '');

  // Get the page from our hash of supported routes.
  // If the parsed URL is not in our list of supported routes, select the 404 page instead
  const page = routes[parsedURL] ? routes[parsedURL] : Error404;
  content.innerHTML = await page.render();
  await page.after_render();
};

// Listen on hash change:
window.addEventListener('hashchange', router);

// Listen on page load:
window.addEventListener('load', router);

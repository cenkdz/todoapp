const Utils = {
  // --------------------------------
  //  Parse a url and break it into resource, id and verb
  // --------------------------------
  parseRequestURL: () => {
    const url = location.hash.slice(1).toLowerCase() || '/';
    const r = url.split('/');
    const request = {
      resource: null,
      id: null,
      verb: null,
    };
    request.resource = r[1];
    request.id = r[2];
    request.verb = r[3];

    return request;
  },
  // --------------------------------
  //  Simple sleep implementation
  // --------------------------------

  sleep: (ms) => new Promise((resolve) => setTimeout(resolve, ms)),

  setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    const expires = `expires=${d.toUTCString()}`;
    document.cookie = `${cname}=${cvalue};${expires};path=/`;
  },

  getCookie(cname) {
    const name = `${cname}=`;
    const decodedCookie = decodeURIComponent(document.cookie);
    const ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) === 0) {
        return c.substring(name.length, c.length);
      }
    }
    return '';
  },

  loggedinNavbar() {
    document.getElementById('welcome').classList.add('hide');
    document.getElementById('login').classList.add('hide');
    document.getElementById('register').classList.add('hide');
    document.getElementById('logout').classList.remove('hide');
    document.getElementById('homeLink').classList.remove('hide');
    document.getElementById('updateAccount').classList.remove('hide');
    document.getElementById('changeTheme').classList.remove('hide');
  },

  pass_validation(pass, mx, my) {
    const passLen = pass.value.length;
    if (passLen === 0 || passLen >= my || passLen < mx) {
      pass.focus();
      return false;
    }
    return true;
  },

  validateEmail(email) {
    const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (email.value !== '') {
      if (email.value.match(mailformat)) {
        return true;
      }
    }
    email.focus();
    return false;
  },

  isEmpty(element) {
    if (element.value === '') {
      return true;
    }
    return false;
  },

};

export default Utils;

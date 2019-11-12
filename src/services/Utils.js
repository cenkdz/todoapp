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
};

export default Utils;

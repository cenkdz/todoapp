const Welcome = {

  render: async () => {
    const view = `
              <section class="section">
                  <div>
                  <h2 class="wPageE"></h2>
                  <h1 id="appName" class="wPageE">DarkTodo</h1>
                  </div>
                  <h3 class="wPageE">Developed with minimalistic design to make you focus on your tasks better</h3>
              </section>
          `;
    return view;
  },
  after_render: async () => {},
};
export default Welcome;

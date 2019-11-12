const Welcome = {

  render: async () => {
    const view = `
              <section class="section">
                  <h1>Welcome</h1>
              </section>
          `;
    return view;
  },
  after_render: async () => {},
};
export default Welcome;

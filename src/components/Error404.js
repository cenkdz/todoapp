const Error404 = {

  render: async () => {
    const view = `
            <section class="section">
                <h1>Page Not Found!!</h1>
            </section>
        `;
    return view;
  },
  after_render: async () => {},
};
export default Error404;

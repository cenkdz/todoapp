function HomePage() {
  const homeHtml = `
    <body>
    <div id="header_container"></div>

    <div id="page_container" class="container pageEntry" >
        <article> Loading....</article>
    </div>
    </body>
    `;
  window.document.title = 'Todo Application';
  document.body.insertAdjacentHTML('beforeend', homeHtml);
}

export default HomePage;

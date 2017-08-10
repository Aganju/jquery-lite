const Router = require('./router.js');

document.addEventListener("DOMContentLoaded", () => {
  let content = document.querySelector('.content');
  const contentRouter = new Router(content);
  contentRouter.start();
  let targets = document.querySelectorAll('.sidebar-nav li');
  [].slice.call(targets).forEach((el) => {
    el.addEventListener('click', (e) => {
      window.location.hash = e.currentTarget.innerText.toLowerCase();
    });
  });
});

const Router = require('./router.js');
const Inbox = require('./inbox.js');
const Sent = require('./sent.js');

document.addEventListener("DOMContentLoaded", () => {
  let content = document.querySelector('.content');
  const contentRouter = new Router(content, routes);
  contentRouter.start();
  window.location.hash = '#inbox';
  let targets = document.querySelectorAll('.sidebar-nav li');
  [].slice.call(targets).forEach((el) => {
    el.addEventListener('click', (e) => {
      window.location.hash = e.currentTarget.innerText.toLowerCase();
    });
  });
});

const routes = {
  inbox: Inbox,
  sent: Sent
};

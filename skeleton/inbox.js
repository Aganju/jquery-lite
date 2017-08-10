const MesssageStore = require('./message_store.js');

const Inbox = {
  render: function() {
    const ul = document.createElement('ul');
    ul.className = 'messages';
    const messages = MesssageStore.getInboxMessages();
    messages.forEach((message) => {
      ul.appendChild(this.renderMessage(message));
    });
    return ul;
  },

  renderMessage: function(message) {
    const li = document.createElement('li');
    li.className = 'message';
    li.innerHTML = `<span class='from'>${message.from}</span>
                    <span class='subject'>${message.subject}</span>
                    <span class='body'>${message.body}</span>`;
    return li;
  }
};

module.exports = Inbox;

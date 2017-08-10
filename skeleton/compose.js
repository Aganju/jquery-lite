const MesssageStore = require('./message_store.js');

const Compose = {
  render: function() {
    const div = document.createElement('div');
    div.className = 'new-message';
    div.innerHTML = this.renderForm(div);
    div.addEventListener('change', (e) => {
      const name = e.target.name;
      const val = e.target.value;
      MesssageStore.updateDraftField(name, val);
    });
    div.addEventListener('submit', (e) => {
      e.preventDefault();
      MesssageStore.sendDraft();
      window.location.hash = '#inbox';
    });
    return div;
  },

  renderForm: function() {
    const currentDraft = MesssageStore.getMessageDraft();
    return `<p class="new-message-header">New Message</p>
            <form class ='compose-form'>
              <input placeholder='Recipient'
               name='to' type ='text' value=${currentDraft.to || ''}>
              <input placeholder='Subject'
               name='subject' type ='text' value=${currentDraft.subject || ''}>
              <textarea name='body' rows='20'>${currentDraft.body || ''}</textarea>
              <button type='submit' class='btn btn-primary submit-message'>Send</button>
            </form>`;
  }
};

module.exports = Compose;

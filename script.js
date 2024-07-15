const url = 'https://61c7a5a8-fbf2-442f-905d-a687daa25c71-00-1kwplgteasmdd.janeway.replit.dev/';

async function sendMessage() {
  let messageInput = document.getElementById('message-input');
  let message = messageInput.value;
  let fullUrl = url + 'send/' + message;
  await fetch(fullUrl);

}

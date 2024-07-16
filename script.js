const url = 'https://61c7a5a8-fbf2-442f-905d-a687daa25c71-00-1kwplgteasmdd.janeway.replit.dev/';

// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithPopup, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-auth.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-analytics.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "API_KEY",
  authDomain: "ths-chat.firebaseapp.com",
  projectId: "ths-chat",
  storageBucket: "ths-chat.appspot.com",
  messagingSenderId: "772905161590",
  appId: "1:772905161590:web:49709166a8eec26a67a057",
  measurementId: "G-MTGMGGM747"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Get the sign-in button
var signInButton = document.getElementById('sign-in-button');

// Add sign-in event
signInButton.addEventListener('click', async function() {
  const auth = getAuth();
  const provider = new GoogleAuthProvider();
  try {
    await signInWithPopup(auth, provider);
  } catch (error) {
    console.error(error);
    alert('Error: ' + error)
  }
});

let googleUserName = '';

// Get the name input field
let nameInput = document.getElementById('name-input');
let nameLabel = document.getElementById('name-label');

// Add a realtime listener
const auth = getAuth();
onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in
    googleUserName = user.displayName;
    // Hide the name input field
    nameInput.style.display = 'none';
    nameLabel.style.display = 'none';
  } else {
    // User is signed out
    googleUserName = '';
    // Show the name input field
    nameInput.style.display = 'block';
    nameLabel.style.display = 'block';
  }
});

window.sendMessage = async function() {
  // Check if a user is signed in
  if (!googleUserName) {
    console.warn('No user signed in');
    alert('You must be signed in to send a message');
    return;
  }

  let messageInput = document.getElementById('message-input');
  let message = encodeURIComponent(messageInput.value);
  let name = encodeURIComponent(googleUserName); // Use the Google user's name
  let time = Date();
  let fullUrl = url + 'send/' + message + ' (' + name + ', ' + time + ')';
  console.log(fullUrl)
  console.log('sent on ' + time)
  await fetch(fullUrl);
}

window.signOutUser = function() {
  auth.signOut()
    .then(() => {
      // Sign-out successful.
      googleUserName = '';
      // nameInput.style.display = 'name-input';
    })
    .catch((error) => {
      // An error happened.
      console.error('Error signing out: ', error);
    });
}

async function getMessages() {
  let res = await fetch(url);
  let messages = await res.json();

  let messagesDiv = document.getElementById('message-div');
  messagesDiv.innerHTML = '';

  for (let i = messages.length - 1; i >= 0; i--) {
    messagesDiv.innerHTML += '<p>' + messages[i] + '</p>';
  }
}

setInterval(getMessages, 1000);

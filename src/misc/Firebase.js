import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/database';
import 'firebase/compat/storage';

const config = {
  apiKey: 'AIzaSyCpVVVhYwcAeyV6mXwFQsjzXwustGoSBck',
  authDomain: 'chat-web-app-a8c4f.firebaseapp.com',
  projectId: 'chat-web-app-a8c4f',
  storageBucket: 'chat-web-app-a8c4f.appspot.com',
  messagingSenderId: '751590912290',
  appId: '1:751590912290:web:1a439a951637038042b57b',
};

const app = firebase.initializeApp(config);

export const auth = app.auth();

export const database = app.database();

export const storage = app.storage();

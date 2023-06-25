import {initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyDoukhjs7RwgLLrmFt6H9dLB2ZATk9HTq8",
  authDomain: "innobyte-anne.firebaseapp.com",
  projectId: "innobyte-anne",
  storageBucket: "innobyte-anne.appspot.com",
  messagingSenderId: "201978606670",
  appId: "1:201978606670:web:94907c881fc4266cd7ff1f",
  measurementId: "G-RLJ10N6FK5"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
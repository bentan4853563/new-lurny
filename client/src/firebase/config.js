// src/firebase/config.js

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD0CiqHbYQwNOPu3rDFd3-1VZrNCqSKxHc",
  authDomain: "lurny-419016.firebaseapp.com",
  projectId: "lurny-419016",
  storageBucket: "lurny-419016.appspot.com",
  messagingSenderId: "353982547271",
  appId: "1:353982547271:web:1ed2c859a537f39ab43862",
  measurementId: "G-6GFCMTGS5M",
};
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export default app;

import { initializeApp } from "firebase/app";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDcqIvgcT9eTgjQCs6bsk65rU7p9tZPaBw",
  authDomain: "e-commres.firebaseapp.com",
  projectId: "e-commres",
  storageBucket: "e-commres.appspot.com",
  messagingSenderId: "744580487496",
  appId: "1:744580487496:web:6a3fd6663067864dcd7b7d",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;

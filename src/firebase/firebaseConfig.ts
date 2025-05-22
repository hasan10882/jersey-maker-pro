// src/firebase/firebaseConfig.ts
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// ✅ Replace with your actual Firebase project config
const firebaseConfig = {
  apiKey: "AIzaSyA8P89iDnobzCrJw3U8dwByKsQNemJ1_vg",
  authDomain: "jerseymakerpro.firebaseapp.com",
  projectId: "jerseymakerpro",
  storageBucket: "jerseymakerpro.appspot.com",
  messagingSenderId: "250566518773",
  appId: "1:250566518773:web:378850babcddd9f9d0e2bc",
};

// ✅ Initialize Firebase
const app = initializeApp(firebaseConfig);

// ✅ Export everything needed
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app); // ✅ This was missing

// jersey-maker-mobile/lib/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyA8P89iDnobzCrJw3U8dwByKsQNemJ1_vg",
  authDomain: "jerseymakerpro.firebaseapp.com",
  projectId: "jerseymakerpro",
  storageBucket: "jerseymakerpro.appspot.com",
  messagingSenderId: "250566518773",
  appId: "1:250566518773:web:378850babcddd9f9d0e2bc",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const storage = getStorage(app); // ✅ Needed for file upload

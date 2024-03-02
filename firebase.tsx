import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyB_CcqUZb-nLN0mBfPMIneAimQ_mulyutU",
  authDomain: "need-a-hug-21f76.firebaseapp.com",
  projectId: "need-a-hug-21f76",
  storageBucket: "need-a-hug-21f76.appspot.com",
  messagingSenderId: "308666517644",
  appId: "1:308666517644:web:d4b3b652f37fb7dfa553a9"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
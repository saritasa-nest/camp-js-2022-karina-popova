import 'firebase/compat/firestore';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection } from 'firebase/firestore';

const firebaseApp = initializeApp({
  apiKey: 'AIzaSyB8CZNb47y5xel7hJ7uJLt8-0IstMrTP_k',
  authDomain: 'vanilla-7ce84.firebaseapp.com',
  projectId: 'vanilla-7ce84',
  storageBucket: 'vanilla-7ce84.appspot.com',
  messagingSenderId: '542303687819',
  appId: '1:542303687819:web:2fd4506c598f8a5518b08e',
  measurementId: 'G-SY69HM7FKJ',
});

const db = getFirestore(firebaseApp);
export default collection(db, 'films');
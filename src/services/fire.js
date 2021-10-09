import firebase from 'firebase/app';
import 'firebase/auth';
import {
  REACT_APP_API_KEY,
  REACT_APP_API_AUTH_DOMAIN,
  REACT_APP_API_PROJECT_ID,
  REACT_APP_API_PROJECT_BUCKET,
  REACT_APP_API_MESSAGING_SENDER_ID,
  REACT_APP_API_APP_ID,
  REACT_APP_API_MEASUREMENT_ID,
} from '@env';

const firebaseConfig = {
  apiKey: REACT_APP_API_KEY,
  authDomain: REACT_APP_API_AUTH_DOMAIN,
  projectId: REACT_APP_API_PROJECT_ID,
  storageBucket: REACT_APP_API_PROJECT_BUCKET,
  messagingSenderId: REACT_APP_API_MESSAGING_SENDER_ID,
  appId: REACT_APP_API_APP_ID,
  measurementId: REACT_APP_API_MEASUREMENT_ID,
};

const fire = firebase.initializeApp(firebaseConfig);

export default fire;

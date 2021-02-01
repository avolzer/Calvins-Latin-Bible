import React from 'react';
import Contents from './screens/toc';
import Navigator from './routes/drawer';

// import * as firebase from 'firebase';
// import 'firebase/firestore';
// import firebaseConfig from './config';

import {db} from './config';

// Firebase: Cloud Firestore
//export const database = firebase.firestore();

export default function App() {
  global.language = 'English';

  return (
    <Navigator/>
  );
}
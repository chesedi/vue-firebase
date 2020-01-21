import Vue from 'vue'
import * as firebase from 'firebase/app'
import firebaseConfig from '../../firebaseConfig'

import 'firebase/auth'
import 'firebase/firestore'

// const firebaseConfig = {
//   apiKey: 'AIzaSyB9FLSHSGDfohMlR03BrkshH28p9HQ1mRQ',
//   authDomain: 'test-vf-1-8094a.firebaseapp.com',
//   databaseURL: 'https://test-vf-1-8094a.firebaseio.com',
//   projectId: 'test-vf-1-8094a',
//   storageBucket: 'test-vf-1-8094a.appspot.com',
//   messagingSenderId: '928881654915',
//   appId: '1:928881654915:web:610970e31f5dd2f08a2fb6',
//   measurementId: 'G-18RPZ1CZKR'
// }

// Initialize Firebase
firebase.initializeApp(firebaseConfig)

firebase.firestore().collection('test').add({ test: 'aaa' })
  .then(r => console.log(r))
  .catch(e => console.error(e))

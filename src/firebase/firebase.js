import firebase from 'firebase/app';
import 'firebase/firestore';

var firebaseConfig = {
	apiKey: 'AIzaSyD3X9xfRem7shNvdlyN_aIYsIy_bdb4MxU',
	authDomain: 'weatherapp-beetroot.firebaseapp.com',
	projectId: 'weatherapp-beetroot',
	storageBucket: 'weatherapp-beetroot.appspot.com',
	messagingSenderId: '200423584112',
	appId: '1:200423584112:web:15f1e6f6efc3222ae79fb5',
};

// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);
export default firebaseApp.firestore();

// firebase.js or firebaseConfig.js
import { getApp, getApps, initializeApp } from 'firebase/app';
import { getAuth, initializeAuth, browserLocalPersistence } from 'firebase/auth';

// Your Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAUDsVC1qmNjQRSgMZ8MjNJugDdg_okhpI",
    authDomain: "hayas-3d8de.firebaseapp.com",
    projectId: "hayas-3d8de",
    storageBucket: "hayas-3d8de.firebasestorage.app",
    messagingSenderId: "609394469132",
    appId: "1:609394469132:web:cf36e342a0f80b99bb0129"
};

// Initialize Firebase App and Auth
let auth;
if (getApps().length === 0) {
    const app = initializeApp(firebaseConfig);
    auth = initializeAuth(app, {
        persistence: browserLocalPersistence // Enable persistence (uses localStorage by default)
    });
} else {
    auth = getAuth();
}

export default auth;

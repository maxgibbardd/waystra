import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyAHJ4uLW4WbpBZM6OyXtjCT0yrO11MkLQM",
    authDomain: "waystra-ai.firebaseapp.com",
    projectId: "waystra-ai",
    storageBucket: "waystra-ai.firebasestorage.app",
    messagingSenderId: "651776860106",
    appId: "1:651776860106:web:66bda615e2655da007f933",
    measurementId: "G-WFGTM18MGL"
}

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const database = getFirestore(app);
export const analytics = () => getAnalytics(app);

export default app
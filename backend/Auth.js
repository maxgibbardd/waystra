// import { auth } from "./Firebase";
// import { createUserWithEmailAndPassword, signInWithEmailAndPassword, fetchSignInMethodsForEmail } from "firebase/auth";

import { createUserWithEmailAndPassword } from "firebase/auth";

  
export async function signUp(email, password) {
    try {
        const userCreential = await createUserWithEmailAndPassword(auth, email, password);
        return userCredential.user;
    } catch (error) {
        console.error("Error signing up: ", error);
        throw error;
    }
}
import { createContext, useContext, useEffect, useState } from "react";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { firebaseApp } from "@/backend/Firebase";

/**
 * Provides authentication functionality using Firebase Auth.
 * Exports functions for login, registration, and logout.
 */
const auth = getAuth(firebaseApp);
const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Monitor authentication state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // Handles user login
  async function login(email, password) {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    setUser(userCredential.user);
    return userCredential.user;
  }

  // Handles user registration
  async function register(email, password) {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    setUser(userCredential.user);
    return userCredential.user;
  }

  // Handles user logout
  async function logout() {
    await signOut(auth);
    setUser(null);
  }

  if (loading) {
    return <div>Loading...</div>; // Prevent flashing of logged-out state
  }

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook for authentication context
export function useAuth() {
  return useContext(AuthContext);
}

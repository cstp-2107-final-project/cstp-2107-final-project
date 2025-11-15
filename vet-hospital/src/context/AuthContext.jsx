import { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
} from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);   // { uid, name, email }
  const [role, setRole] = useState(null);   // "admin" | "doctor" | "owner" | null
  const [loading, setLoading] = useState(true);

  // ---------------------------
  // SIGNUP
  // ---------------------------
  const signup = async (name, email, password, role) => {
    const result = await createUserWithEmailAndPassword(auth, email, password);

    // Set displayName for convenience
    await updateProfile(result.user, { displayName: name });

    // Create Firestore user doc
    await setDoc(doc(db, "users", result.user.uid), {
      name,
      email,
      role,
      createdAt: new Date(),
    });

    setUser({
      uid: result.user.uid,
      name,
      email,
    });
    setRole(role);
  };

  // ---------------------------
  // LOGIN
  // ---------------------------
  const login = async (email, password) => {
    const result = await signInWithEmailAndPassword(auth, email, password);
    const fbUser = result.user;

    let roleFromDb = null;

    try {
      const snap = await getDoc(doc(db, "users", fbUser.uid));
      if (snap.exists()) {
        roleFromDb = snap.data().role;
      } else {
        console.warn("No Firestore user doc found for UID:", fbUser.uid);
      }
    } catch (err) {
      console.error("Error fetching user role on login:", err);
    }

    setUser({
      uid: fbUser.uid,
      name: fbUser.displayName,
      email: fbUser.email,
    });
    setRole(roleFromDb);

    return roleFromDb;
  };

  // ---------------------------
  // LOGOUT
  // ---------------------------
  const logout = async () => {
    await signOut(auth);
    setUser(null);
    setRole(null);
  };

  // ---------------------------
  // AUTH STATE LISTENER
  // ---------------------------
  useEffect(() => {
    setLoading(true);

    const unsub = onAuthStateChanged(auth, async (fbUser) => {
      try {
        if (!fbUser) {
          // Not logged in
          setUser(null);
          setRole(null);
          return;
        }

        let roleFromDb = null;
        try {
          const snap = await getDoc(doc(db, "users", fbUser.uid));
          if (snap.exists()) {
            roleFromDb = snap.data().role;
          } else {
            console.warn("No Firestore user doc found for UID:", fbUser.uid);
          }
        } catch (err) {
          console.error("Error loading user role in onAuthStateChanged:", err);
        }

        setUser({
          uid: fbUser.uid,
          name: fbUser.displayName,
          email: fbUser.email,
        });
        setRole(roleFromDb);
      } finally {
        // VERY IMPORTANT: never stay stuck on loading
        setLoading(false);
      }
    });

    return () => unsub();
  }, []);

  const value = {
    user,
    role,
    loading,
    signup,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);

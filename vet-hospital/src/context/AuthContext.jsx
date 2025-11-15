import { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile
} from "firebase/auth";
import {
  doc,
  setDoc,
  getDoc
} from "firebase/firestore";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);     // firebase user object
  const [role, setRole] = useState(null);     // "admin" | "doctor" | "owner"
  const [loading, setLoading] = useState(true);

  // -------------------------------------------------
  //  LOGIN
  // -------------------------------------------------
  const login = async (email, password) => {
    const result = await signInWithEmailAndPassword(auth, email, password);
    const fbUser = result.user;

    // Fetch user role from Firestore
    const snap = await getDoc(doc(db, "users", fbUser.uid));

    if (snap.exists()) {
      setRole(snap.data().role);
    }

    setUser({
      uid: fbUser.uid,
      name: fbUser.displayName,
      email: fbUser.email,
    });

    return snap.data().role;
  };

  // -------------------------------------------------
  //  SIGNUP
  // -------------------------------------------------
  const signup = async (name, email, password, role) => {
    const result = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(result.user, { displayName: name });

    // Save user profile in Firestore
    await setDoc(doc(db, "users", result.user.uid), {
      name,
      email,
      role,
      createdAt: new Date(),
    });

    setUser({ uid: result.user.uid, name, email });
    setRole(role);
  };

  // -------------------------------------------------
  //  LOGOUT
  // -------------------------------------------------
  const logout = async () => {
    await signOut(auth);
    setUser(null);
    setRole(null);
  };

  // -------------------------------------------------
  //  AUTO LOGIN LISTENER
  // -------------------------------------------------
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (fbUser) => {
      if (!fbUser) {
        setUser(null);
        setRole(null);
        setLoading(false);
        return;
      }

      // Fetch Firestore role
      const snap = await getDoc(doc(db, "users", fbUser.uid));
      const roleFromDb = snap.exists() ? snap.data().role : null;

      setUser({
        uid: fbUser.uid,
        name: fbUser.displayName,
        email: fbUser.email,
      });
      setRole(roleFromDb);
      setLoading(false);
    });

    return () => unsub();
  }, []);

  return (
    <AuthContext.Provider value={{ user, role, loading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);

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
  const [user, setUser] = useState(null);      // { uid, name, email }
  const [role, setRole] = useState(null);      // "admin" | "doctor" | "owner" | null
  const [loading, setLoading] = useState(true);

  // ---------- SIGN UP ----------
  const signup = async (name, email, password, roleValue) => {
    const result = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(result.user, { displayName: name });

    await setDoc(doc(db, "users", result.user.uid), {
      name,
      email,
      role: roleValue,
      createdAt: new Date(),
    });

    setUser({
      uid: result.user.uid,
      name,
      email,
    });
    setRole(roleValue);
  };

  // ---------- LOGIN ----------
  const login = async (email, password) => {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      const fbUser = result.user;

      // Try to read role from Firestore
      let roleFromDb = null;
      try {
        const snap = await getDoc(doc(db, "users", fbUser.uid));
        if (snap.exists()) {
          roleFromDb = snap.data().role;
        }
      } catch (err) {
        console.error("Error fetching user role on login:", err);
      }

      // Fallbacks so it doesn't become "Invalid login" for real users
      if (!roleFromDb) {
        if (fbUser.email === "admin@clinic.com") {
          roleFromDb = "admin";
        } else {
          roleFromDb = "owner"; // default for normal signups
        }
      }

      setUser({
        uid: fbUser.uid,
        name: fbUser.displayName,
        email: fbUser.email,
      });
      setRole(roleFromDb);

      return roleFromDb;
    } catch (err) {
      console.error("Login error:", err);
      alert(err.message || "Login failed. Check email/password.");
      return null;
    }
  };

  // ---------- LOGOUT ----------
  const logout = async () => {
    await signOut(auth);
    setUser(null);
    setRole(null);
  };

  // ---------- AUTH STATE LISTENER ----------
  useEffect(() => {
    setLoading(true);

    const unsub = onAuthStateChanged(auth, async (fbUser) => {
      try {
        if (!fbUser) {
          setUser(null);
          setRole(null);
          return;
        }

        let roleFromDb = null;
        try {
          const snap = await getDoc(doc(db, "users", fbUser.uid));
          if (snap.exists()) {
            roleFromDb = snap.data().role;
          }
        } catch (err) {
          console.error("Error loading user role:", err);
        }

        if (!roleFromDb) {
          if (fbUser.email === "admin@clinic.com") {
            roleFromDb = "admin";
          } else {
            roleFromDb = "owner";
          }
        }

        setUser({
          uid: fbUser.uid,
          name: fbUser.displayName,
          email: fbUser.email,
        });
        setRole(roleFromDb);
      } finally {
        setLoading(false);
      }
    });

    return () => unsub();
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, role, loading, signup, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);

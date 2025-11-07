export function useAuth() {
  const raw = localStorage.getItem("auth");
  try { return raw ? JSON.parse(raw) : null; } catch { return null; }
}

export function signOut() {
  localStorage.removeItem("auth");
}

export function RoleGate({ allow = ["owner", "admin"], children }) {
  const auth = useAuth();
  if (!auth) return <div className="p-6 text-center">You must log in.</div>;
  if (!allow.includes(auth.role)) return <div className="p-6 text-center">Access denied.</div>;
  return <>{children}</>;
}

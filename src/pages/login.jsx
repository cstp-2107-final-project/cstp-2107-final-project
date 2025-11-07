import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaLock, FaEnvelope, FaUser, FaPhone, FaEye, FaEyeSlash, FaPaw } from "react-icons/fa";

export default function Login() {
  const [mode, setMode] = useState("login");
  const [showPwd, setShowPwd] = useState(false);
  const nav = useNavigate();

  // login
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPwd, setLoginPwd] = useState("");
  const [loginRole, setLoginRole] = useState("owner"); // owner | admin
  const [loginMsg, setLoginMsg] = useState(null);

  // signup (owner)
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [pwd, setPwd] = useState("");
  const [pwd2, setPwd2] = useState("");
  const [petName, setPetName] = useState("");
  const [agree, setAgree] = useState(false);
  const [signupMsg, setSignupMsg] = useState(null);

  const handleLogin = (e) => {
    e.preventDefault();
    setLoginMsg(null);
    if (!/^\S+@\S+\.\S+$/.test(loginEmail) || loginPwd.length < 6) {
      return setLoginMsg({ type: "error", text: "Invalid credentials." });
    }
    const auth = { email: loginEmail, role: loginRole, name: loginEmail.split("@")[0] };
    localStorage.setItem("auth", JSON.stringify(auth));
    nav(loginRole === "admin" ? "/admin-data" : "/dashboard");
  };

  const handleSignup = (e) => {
    e.preventDefault();
    setSignupMsg(null);
    if (!name || !email || !phone || !pwd || !pwd2) return setSignupMsg({ type: "error", text: "Fill all fields." });
    if (!/^\S+@\S+\.\S+$/.test(email)) return setSignupMsg({ type: "error", text: "Invalid email." });
    if (pwd !== pwd2) return setSignupMsg({ type: "error", text: "Passwords do not match." });
    if (!agree) return setSignupMsg({ type: "error", text: "Please accept terms." });

    setSignupMsg({ type: "ok", text: "Owner account created! Please log in." });
    setMode("login");
    setLoginEmail(email);
    setLoginRole("owner");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 via-white to-white flex items-center justify-center px-6 py-10">
      <div className="w-full max-w-4xl grid md:grid-cols-2 gap-8">
        <div className="hidden md:flex flex-col justify-center p-8 rounded-2xl bg-white border border-gray-100 shadow-sm">
          <div className="text-5xl">🐾</div>
          <h1 className="mt-4 text-3xl font-extrabold text-indigo-700">Pet Clinic</h1>
          <p className="mt-2 text-gray-600">Admin and Owner accounts. Role-based dashboards.</p>
        </div>

        <div className="bg-white border border-gray-100 shadow-lg rounded-2xl p-6">
          <div className="flex items-center justify-between bg-gray-50 rounded-xl p-1">
            <button onClick={() => setMode("login")}
              className={`flex-1 py-2 rounded-lg text-sm font-medium transition ${mode === "login" ? "bg-white shadow text-indigo-700" : "text-gray-600"}`}>
              Log in
            </button>
            <button onClick={() => setMode("signup")}
              className={`flex-1 py-2 rounded-lg text-sm font-medium transition ${mode === "signup" ? "bg-white shadow text-indigo-700" : "text-gray-600"}`}>
              Sign up
            </button>
          </div>

          {mode === "login" ? (
            <form onSubmit={handleLogin} className="mt-6 space-y-4">
              <Input label="Email" icon={<FaEnvelope />} value={loginEmail} onChange={setLoginEmail} type="email" />
              <Input label="Password" icon={<FaLock />} value={loginPwd} onChange={setLoginPwd}
                     type={showPwd ? "text" : "password"} togglePwd={() => setShowPwd(!showPwd)} showPwd={showPwd} />
              <div>
                <label className="block text-sm font-medium text-gray-700">Login as</label>
                <select value={loginRole} onChange={(e) => setLoginRole(e.target.value)}
                        className="mt-1 w-full border rounded-lg py-2 px-2">
                  <option value="owner">Owner</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
              <button className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700">Log in</button>
              {loginMsg && <p className={`text-sm ${loginMsg.type === "ok" ? "text-green-700" : "text-red-700"}`}>{loginMsg.text}</p>}
            </form>
          ) : (
            <form onSubmit={handleSignup} className="mt-6 space-y-3">
              <Input label="Full Name" icon={<FaUser />} value={name} onChange={setName} />
              <Input label="Email" icon={<FaEnvelope />} value={email} onChange={setEmail} />
              <Input label="Phone" icon={<FaPhone />} value={phone} onChange={setPhone} />
              <Input label="Pet Name (optional)" icon={<FaPaw />} value={petName} onChange={setPetName} />
              <Input label="Password" icon={<FaLock />} value={pwd} onChange={setPwd}
                     type={showPwd ? "text" : "password"} togglePwd={() => setShowPwd(!showPwd)} showPwd={showPwd} />
              <Input label="Confirm Password" icon={<FaLock />} value={pwd2} onChange={setPwd2} type="password" />
              <label className="flex items-center text-sm">
                <input type="checkbox" checked={agree} onChange={(e) => setAgree(e.target.checked)} className="mr-2" />
                I agree to the <Link to="#" className="text-indigo-600">Terms</Link>.
              </label>
              <button className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700">Create Account</button>
              {signupMsg && <p className={`text-sm ${signupMsg.type === "ok" ? "text-green-700" : "text-red-700"}`}>{signupMsg.text}</p>}
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

function Input({ label, icon, value, onChange, type = "text", togglePwd, showPwd }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <div className="flex items-center border rounded-lg px-3 py-2 mt-1">
        <span className="text-gray-400 mr-2">{icon}</span>
        <input type={type} value={value} onChange={(e) => onChange(e.target.value)} className="w-full focus:outline-none" />
        {togglePwd && (
          <button type="button" onClick={togglePwd} className="text-gray-500 ml-2">
            {showPwd ? <FaEyeSlash /> : <FaEye />}
          </button>
        )}
      </div>
    </div>
  );
}


import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../Home.css";
import infinityLogo from "../assets/infinity-logo.svg";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Run this check only once when component mounts
    const token = localStorage.getItem("token") || localStorage.getItem("guest_token");
    
    if (token) {
      navigate("/home");
    }
    // Empty dependency array to run only once on mount
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!email || !password) {
      setError("Please enter both email and password.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("http://127.0.0.1:5001/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Login failed.");

      localStorage.setItem("token", data.token);
      navigate("/home");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGuestLogin = () => {
    console.log("Guest login clicked");
    const guestToken = `guest-${Date.now()}`;
    const expirationTime = Date.now() + 2 * 60 * 60 * 1000; // 2 hours
    // const expirationTime = Date.now() + 1 * 30 * 1000; // 1 minute for testing

    localStorage.setItem("guest_token", guestToken);
    localStorage.setItem("guest_expiry", expirationTime.toString());

    // Navigate directly without delay
    navigate("/home");
  };

  return (
    <div className="home-container min-vh-100 d-flex flex-column justify-content-center align-items-center position-relative">
      <div className="position-absolute floating-circle top-left" />
      <div className="position-absolute floating-circle bottom-right" />

      <div
        className="glass-effect shadow-3d rounded-4 p-5 text-center"
        style={{ maxWidth: "500px", width: "90%" }}
      >
        <img
          src={infinityLogo}
          alt="Vecaid Logo"
          className="mb-4 logo-animation"
          style={{ width: "100px", height: "auto" }}
        />

        <h1 className="gradient-text display-4 fw-bold mb-4">Login</h1>
        <p className="text-light-pink mb-4" style={{ fontSize: "1.1rem" }}>
          Access your account and explore AI-powered predictions.
        </p>

        {error && (
          <div className="alert alert-danger mb-3" role="alert">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control form-control-lg glass-effect text-center"
              style={{ height: "50px", fontSize: "1.1rem" }}
              required
            />
          </div>

          <div className="mb-3">
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-control form-control-lg glass-effect text-center"
              style={{ height: "50px", fontSize: "1.1rem" }}
              required
            />
          </div>

          <button
            type="submit"
            className="btn btn-lg shadow-3d w-100 mb-3"
            style={{ height: "50px", fontSize: "1.2rem" }}
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <button
          className="btn btn-outline-light shadow-3d w-100 mb-2"
          style={{ height: "45px", fontSize: "1.1rem" }}
          onClick={handleGuestLogin}
        >
          Continue as Guest (2 Hours Access)
        </button>

        <p className="mt-3 text-light-pink">
          Don't have an account?{" "}
          <span
            className="text-primary fw-bold"
            style={{ cursor: "pointer" }}
            onClick={() => navigate("/signup")}
          >
            Sign Up
          </span>
        </p>
      </div>
    </div>
  );
}

export default Login;


// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "../Home.css";
// import infinityLogo from "../assets/infinity-logo.svg";

// // Replace this with your actual Render backend URL
// const BACKEND_URL = "https://vecaid-backend.onrender.com";

// function Login() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const token = localStorage.getItem("token") || localStorage.getItem("guest_token");
//     if (token) navigate("/home");
//   }, []);

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError("");

//     if (!email || !password) {
//       setError("Please enter both email and password.");
//       setLoading(false);
//       return;
//     }

//     try {
//       const response = await fetch(`${BACKEND_URL}/api/login`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ email, password }),
//       });

//       const data = await response.json();
//       if (!response.ok) throw new Error(data.error || "Login failed.");

//       localStorage.setItem("token", data.token);
//       navigate("/home");
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleGuestLogin = () => {
//     const guestToken = `guest-${Date.now()}`;
//     const expirationTime = Date.now() + 2 * 60 * 60 * 1000; // 2 hours

//     localStorage.setItem("guest_token", guestToken);
//     localStorage.setItem("guest_expiry", expirationTime.toString());

//     navigate("/home");
//   };

//   return (
//     <div className="home-container min-vh-100 d-flex flex-column justify-content-center align-items-center position-relative">
//       <div className="position-absolute floating-circle top-left" />
//       <div className="position-absolute floating-circle bottom-right" />

//       <div className="glass-effect shadow-3d rounded-4 p-5 text-center" style={{ maxWidth: "500px", width: "90%" }}>
//         <img
//           src={infinityLogo}
//           alt="Vecaid Logo"
//           className="mb-4 logo-animation"
//           style={{ width: "100px", height: "auto" }}
//         />

//         <h1 className="gradient-text display-4 fw-bold mb-4">Login</h1>
//         <p className="text-light-pink mb-4" style={{ fontSize: "1.1rem" }}>
//           Access your account and explore AI-powered predictions.
//         </p>

//         {error && (
//           <div className="alert alert-danger mb-3" role="alert">
//             {error}
//           </div>
//         )}

//         <form onSubmit={handleLogin}>
//           <div className="mb-3">
//             <input
//               type="email"
//               placeholder="Enter your email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               className="form-control form-control-lg glass-effect text-center"
//               style={{ height: "50px", fontSize: "1.1rem" }}
//               required
//             />
//           </div>

//           <div className="mb-3">
//             <input
//               type="password"
//               placeholder="Enter your password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               className="form-control form-control-lg glass-effect text-center"
//               style={{ height: "50px", fontSize: "1.1rem" }}
//               required
//             />
//           </div>

//           <button
//             type="submit"
//             className="btn btn-lg shadow-3d w-100 mb-3"
//             style={{ height: "50px", fontSize: "1.2rem" }}
//             disabled={loading}
//           >
//             {loading ? "Logging in..." : "Login"}
//           </button>
//         </form>

//         <button
//           className="btn btn-outline-light shadow-3d w-100 mb-2"
//           style={{ height: "45px", fontSize: "1.1rem" }}
//           onClick={handleGuestLogin}
//         >
//           Continue as Guest (2 Hours Access)
//         </button>

//         <p className="mt-3 text-light-pink">
//           Don't have an account?{" "}
//           <span
//             className="text-primary fw-bold"
//             style={{ cursor: "pointer" }}
//             onClick={() => navigate("/signup")}
//           >
//             Sign Up
//           </span>
//         </p>
//       </div>
//     </div>
//   );
// }

// export default Login;



import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../Home.css"; // Importing the existing styles
import infinityLogo from "../assets/infinity-logo.svg";

function Signup() {
  // State variables for user details and errors
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Handle signup form submission
  const handleSignup = async (e) => {
    e.preventDefault();

    // Basic form validation
    if (!name || !email || !password || !confirmPassword) {
      setError("Please fill in all fields.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true); // Show loading state

    try {
      // API call to Flask backend to create a new user
      const response = await fetch("http://127.0.0.1:5001/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Signup failed. Try again!");
      }

      // Automatically login after successful signup
      const loginResponse = await fetch("http://127.0.0.1:5001/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const loginData = await loginResponse.json();

      if (!loginResponse.ok) {
        throw new Error(loginData.error || "Login after signup failed.");
      }

      // Store JWT in localStorage
      localStorage.setItem("token", loginData.token);

      // Redirect to the prediction page after successful signup and login
      navigate("/home");
    } catch (err) {
      setError(err.message || "An error occurred during signup.");
    } finally {
      setLoading(false); // Hide loading state
    }
  };

  return (
    <div className="home-container min-vh-100 d-flex flex-column justify-content-center align-items-center position-relative">
      {/* Floating animated background */}
      <div className="position-absolute floating-circle top-left" />
      <div className="position-absolute floating-circle bottom-right" />

      <div
        className="glass-effect shadow-3d rounded-4 p-5 text-center"
        style={{ maxWidth: "500px", width: "90%" }}
      >
        {/* Logo */}
        <img
          src={infinityLogo}
          alt="Vecaid Logo"
          className="mb-4 logo-animation"
          style={{ width: "100px", height: "auto" }}
        />

        {/* Signup Heading */}
        <h1 className="gradient-text display-4 fw-bold mb-4">Sign Up</h1>
        <p className="text-light-pink mb-4" style={{ fontSize: "1.1rem" }}>
          Create an account to explore AI-powered predictions.
        </p>

        {/* Show error message if signup fails */}
        {error && (
          <div className="alert alert-danger mb-3" role="alert">
            {error}
          </div>
        )}

        {/* Signup Form */}
        <form onSubmit={handleSignup}>
          {/* Name Input */}
          <div className="mb-3">
            <input
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="form-control form-control-lg glass-effect text-center"
              style={{ height: "50px", fontSize: "1.1rem" }}
              required
            />
          </div>

          {/* Email Input */}
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

          {/* Password Input */}
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

          {/* Confirm Password Input */}
          <div className="mb-3">
            <input
              type="password"
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="form-control form-control-lg glass-effect text-center"
              style={{ height: "50px", fontSize: "1.1rem" }}
              required
            />
          </div>

          {/* Signup Button */}
          <button
            type="submit"
            className="btn btn-lg shadow-3d w-100"
            style={{ height: "50px", fontSize: "1.2rem" }}
            disabled={loading}
          >
            {loading ? "Creating Account..." : "Sign Up"}
          </button>
        </form>

        {/* Login Link */}
        <p className="mt-3 text-light-pink">
          Already have an account?{" "}
          <span
            className="text-primary fw-bold"
            style={{ cursor: "pointer" }}
            onClick={() => navigate("/")}
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
}

export default Signup;

// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "../Home.css";
// import infinityLogo from "../assets/infinity-logo.svg";

// function Signup() {
//   const [name, setName] = useState(""); // NOTE: Currently unused by backend
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   const handleSignup = async (e) => {
//     e.preventDefault();

//     if (!name || !email || !password || !confirmPassword) {
//       setError("Please fill in all fields.");
//       return;
//     }

//     if (password !== confirmPassword) {
//       setError("Passwords do not match.");
//       return;
//     }

//     setLoading(true);

//     try {
//       const response = await fetch("https://vecaid-backend.onrender.com/api/signup", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ email, password }), // name is not required in backend
//       });

//       const data = await response.json();

//       if (!response.ok) {
//         throw new Error(data.error || "Signup failed. Try again!");
//       }

//       // Login after signup
//       const loginResponse = await fetch("https://vecaid-backend.onrender.com/api/login", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ email, password }),
//       });

//       const loginData = await loginResponse.json();

//       if (!loginResponse.ok) {
//         throw new Error(loginData.error || "Login after signup failed.");
//       }

//       localStorage.setItem("token", loginData.token);
//       navigate("/home");
//     } catch (err) {
//       setError(err.message || "An error occurred during signup.");
//     } finally {
//       setLoading(false);
//     }
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

//         <h1 className="gradient-text display-4 fw-bold mb-4">Sign Up</h1>
//         <p className="text-light-pink mb-4" style={{ fontSize: "1.1rem" }}>
//           Create an account to explore AI-powered predictions.
//         </p>

//         {error && (
//           <div className="alert alert-danger mb-3" role="alert">
//             {error}
//           </div>
//         )}

//         <form onSubmit={handleSignup}>
//           <div className="mb-3">
//             <input
//               type="text"
//               placeholder="Enter your name"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//               className="form-control form-control-lg glass-effect text-center"
//               style={{ height: "50px", fontSize: "1.1rem" }}
//               required
//             />
//           </div>

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

//           <div className="mb-3">
//             <input
//               type="password"
//               placeholder="Confirm your password"
//               value={confirmPassword}
//               onChange={(e) => setConfirmPassword(e.target.value)}
//               className="form-control form-control-lg glass-effect text-center"
//               style={{ height: "50px", fontSize: "1.1rem" }}
//               required
//             />
//           </div>

//           <button
//             type="submit"
//             className="btn btn-lg shadow-3d w-100"
//             style={{ height: "50px", fontSize: "1.2rem" }}
//             disabled={loading}
//           >
//             {loading ? "Creating Account..." : "Sign Up"}
//           </button>
//         </form>

//         <p className="mt-3 text-light-pink">
//           Already have an account?{" "}
//           <span className="text-primary fw-bold" style={{ cursor: "pointer" }} onClick={() => navigate("/")}>
//             Login
//           </span>
//         </p>
//       </div>
//     </div>
//   );
// }

// export default Signup;

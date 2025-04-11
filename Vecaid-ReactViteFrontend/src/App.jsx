

// import React from "react";
// import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
// import HomeScreen from "./screens/HomeScreen";
// import LoginScreen from "./screens/LoginScreen";
// import SignUpScreen from "./screens/SignUpScreen";
// import PredictionScreen from "./screens/PredictionScreen";
// import ChartScreen from "./screens/ChartScreen";
// import PaywallScreen from "./screens/PaywallScreen";
// import "bootstrap/dist/css/bootstrap.min.css";

// function isAuthenticated() {
//   const token = localStorage.getItem("token");
//   const guestToken = localStorage.getItem("guest_token");
//   const guestExpiry = localStorage.getItem("guest_expiry");

//   if (guestToken && guestExpiry) {
//     const now = Date.now();
//     if (now < parseInt(guestExpiry)) return true;

//     // Guest expired
//     localStorage.removeItem("guest_token");
//     localStorage.removeItem("guest_expiry");
//     return false;
//   }

//   return !!token;
// }

// function App() {
//   return (
//     <Router>
//       <Routes>
//         {/* Public Routes */}
//         <Route path="/" element={<LoginScreen />} />
//         <Route path="/signup" element={<SignUpScreen />} />

//         {/* Protected Routes */}
//         <Route
//           path="/home"
//           element={isAuthenticated() ? <HomeScreen /> : <Navigate to="/" replace />}
//         />
//         <Route
//           path="/predict"
//           element={isAuthenticated() ? <PredictionScreen /> : <Navigate to="/" replace />}
//         />
//         <Route
//           path="/chart"
//           element={isAuthenticated() ? <ChartScreen /> : <Navigate to="/" replace />}
//         />
//         <Route
//           path="/paywall"
//           element={isAuthenticated() ? <PaywallScreen /> : <Navigate to="/" replace />}
//         />
//       </Routes>
//     </Router>
//   );
// }

// export default App;

import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import SignUpScreen from "./screens/SignUpScreen";
import PredictionScreen from "./screens/PredictionScreen";
import ChartScreen from "./screens/ChartScreen";
import PaywallScreen from "./screens/PayWallScreen";
import "bootstrap/dist/css/bootstrap.min.css";

// Create a protected route wrapper component
const ProtectedRoute = ({ children }) => {
  // Check authentication at render time
  const token = localStorage.getItem("token");
  const guestToken = localStorage.getItem("guest_token");
  const guestExpiry = localStorage.getItem("guest_expiry");
  
  if (guestToken && guestExpiry) {
    const now = Date.now();
    if (now < parseInt(guestExpiry)) {
      return children;
    }
    
    // Guest expired
    localStorage.removeItem("guest_token");
    localStorage.removeItem("guest_expiry");
    return <Navigate to="/" replace />;
  }
  
  return token ? children : <Navigate to="/" replace />;
};

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LoginScreen />} />
        <Route path="/signup" element={<SignUpScreen />} />
        <Route path="/paywall" element={<PaywallScreen />} />
        
        {/* Protected Routes */}
        <Route path="/home" element={<ProtectedRoute><HomeScreen /></ProtectedRoute>} />
        <Route path="/predict" element={<ProtectedRoute><PredictionScreen /></ProtectedRoute>} />
        <Route path="/chart" element={<ProtectedRoute><ChartScreen /></ProtectedRoute>} />

        {/* <Route path="/paywall" element={<ProtectedRoute><PaywallScreen /></ProtectedRoute>} /> */}
        
        {/* Catch all route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
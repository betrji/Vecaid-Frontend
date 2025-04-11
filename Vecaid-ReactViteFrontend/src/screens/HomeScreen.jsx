


import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../Home.css";
import infinityLogo from "../assets/infinity-logo.svg";

function Home() {
  const [symbol, setSymbol] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingMsgIndex, setLoadingMsgIndex] = useState(0);
  const [isGuest, setIsGuest] = useState(false);
  const [guestTimeLeft, setGuestTimeLeft] = useState(null);
  const navigate = useNavigate();

  const loadingMessages = [
    "Predicting the future...",
    "Time traveling...",
    `Generating "${symbol || "company"}" prediction...`,
    "Analyzing stock sentiment...",
    "Processing historical data...",
    "Performing backtesting...",
    "Evaluating AI model accuracy...",
  ];

  // Check for authentication on component mount
  useEffect(() => {
    const token = localStorage.getItem("token");
    const guestToken = localStorage.getItem("guest_token");

    if (!token && !guestToken) {
      navigate("/");
    }
  }, [navigate]);

  // Guest expiry check
  useEffect(() => {
    const checkGuestExpiry = () => {
      const guestToken = localStorage.getItem("guest_token");
      const guestExpiry = localStorage.getItem("guest_expiry");
      
      if (guestToken && guestExpiry) {
        const currentTime = Date.now();
        const expiry = parseInt(guestExpiry);
        
        if (currentTime > expiry) {
          // Clear storage first
          localStorage.removeItem("guest_token");
          localStorage.removeItem("guest_expiry");
          console.log("Guest token expired");
          
          // Ensure navigation happens with the correct path
          navigate("/paywall", { replace: true });
        } else {
          setIsGuest(true);
          const timeLeft = Math.floor((expiry - currentTime) / 60000);
          setGuestTimeLeft(timeLeft);
        }
      }
    };
    
    checkGuestExpiry();
    const interval = setInterval(checkGuestExpiry, 30000);
    return () => clearInterval(interval);
  }, [navigate]);
  // useEffect(() => {
  //   const checkGuestExpiry = () => {
  //     const guestToken = localStorage.getItem("guest_token");
  //     const guestExpiry = localStorage.getItem("guest_expiry");

  //     if (guestToken && guestExpiry) {
  //       const currentTime = Date.now();
  //       const expiry = parseInt(guestExpiry);

  //       if (currentTime > expiry) {
  //         localStorage.removeItem("guest_token");
  //         localStorage.removeItem("guest_expiry");
  //         console.log("Guest token expired");
  //         navigate("/paywall", { replace: true });
  //       } else {
  //         setIsGuest(true);
  //         const timeLeft = Math.floor((expiry - currentTime) / 60000);
  //         setGuestTimeLeft(timeLeft);
  //       }
  //     }
  //   };

  //   checkGuestExpiry();
  //   const interval = setInterval(checkGuestExpiry, 30000);
  //   return () => clearInterval(interval);
  // }, [navigate]);

  useEffect(() => {
    let interval;
    if (loading) {
      interval = setInterval(() => {
        setLoadingMsgIndex((prevIndex) => (prevIndex + 1) % loadingMessages.length);
      }, 2500);
    }
    return () => clearInterval(interval);
  }, [loading, loadingMessages.length]);

  const handlePredict = async () => {
    if (symbol.trim() === "") {
      setError("Please enter a stock symbol");
      return;
    }

    setError("");
    setLoading(true);
    const startTime = performance.now();

    try {
      const response = await fetch("http://127.0.0.1:5001/api/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ticker: symbol.toUpperCase() }),
      });

      if (!response.ok) {
        throw new Error("Failed to get prediction. Try again!");
      }

      const data = await response.json();
      const endTime = performance.now();
      const timeTaken = (endTime - startTime) / 1000;

      if (data.error) {
        navigate("/predict", { state: { error: data.error } });
      } else {
        navigate("/predict", { state: { predictionData: data } });
      }
    } catch (err) {
      navigate("/predict", { state: { error: err.message || "An error occurred while fetching prediction." } });
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("guest_token");
    localStorage.removeItem("guest_expiry");
    navigate("/");
  };

  return (
    <div className="home-container min-vh-100 d-flex flex-column justify-content-center align-items-center position-relative">
      <div className="position-absolute floating-circle top-left" />
      <div className="position-absolute floating-circle bottom-right" />

      <div className="glass-effect shadow-3d rounded-4 p-5 text-center" style={{ maxWidth: "600px", width: "90%" }}>
        <img src={infinityLogo} alt="Vecaid Logo" className="mb-4 logo-animation" style={{ width: "120px", height: "auto" }} />

        <div className="d-flex justify-content-between align-items-center mb-3">
          <h1 className="gradient-text display-6 fw-bold mb-0">Vecaid Premium Plus</h1>
          <button onClick={handleLogout} className="btn btn-sm btn-outline-light shadow-sm ms-3">
            Logout
          </button>
        </div>

        <p className="text-light-pink mb-3" style={{ fontSize: "1.1rem" }}>
          Experience the future of stock forecasting with our advanced AI-powered predictions
        </p>

        {isGuest && (
          <div className="alert alert-warning py-2 small" role="alert">
            ⏱️ Guest access: <strong>{guestTimeLeft} min</strong> left before paywall
          </div>
        )}

        {!loading && (
          <div className="hover-scale">
            <div className="mb-3">
              <input
                type="text"
                placeholder="Enter Stock Symbol (e.g., NVDA)"
                value={symbol}
                onChange={(e) => {
                  setSymbol(e.target.value);
                  setError("");
                }}
                className={`form-control form-control-lg glass-effect text-center ${error ? "border-danger" : ""}`}
                style={{ height: "60px", fontSize: "1.1rem" }}
              />
              {error && <div className="text-danger mt-2 small">{error}</div>}
            </div>

            <button onClick={handlePredict} className="btn btn-lg shadow-3d w-100" style={{ height: "60px", fontSize: "1.2rem" }}>
              Generate AI Prediction
            </button>
          </div>
        )}

        {loading && (
          <div className="d-flex flex-column align-items-center mt-4">
            <div className="eight-ball-container">
              <div className="eight-ball">
                <div className="inner-text">{loadingMessages[loadingMsgIndex]}</div>
              </div>
            </div>
            <p className="animate-fade mt-3">{loadingMessages[loadingMsgIndex]}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;

// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "../Home.css";
// import infinityLogo from "../assets/infinity-logo.svg";

// function Home() {
//   const [symbol, setSymbol] = useState("");
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [loadingMsgIndex, setLoadingMsgIndex] = useState(0);
//   const [isGuest, setIsGuest] = useState(false);
//   const [guestTimeLeft, setGuestTimeLeft] = useState(null);
//   const navigate = useNavigate();

//   const loadingMessages = [
//     "Predicting the future...",
//     "Time traveling...",
//     `Generating "${symbol || "company"}" prediction...`,
//     "Analyzing stock sentiment...",
//     "Processing historical data...",
//     "Performing backtesting...",
//     "Evaluating AI model accuracy...",
//   ];

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     const guestToken = localStorage.getItem("guest_token");

//     if (!token && !guestToken) {
//       navigate("/");
//     }
//   }, [navigate]);

//   useEffect(() => {
//     const checkGuestExpiry = () => {
//       const guestToken = localStorage.getItem("guest_token");
//       const guestExpiry = localStorage.getItem("guest_expiry");

//       if (guestToken && guestExpiry) {
//         const currentTime = Date.now();
//         const expiry = parseInt(guestExpiry);

//         if (currentTime > expiry) {
//           localStorage.removeItem("guest_token");
//           localStorage.removeItem("guest_expiry");
//           navigate("/paywall", { replace: true });
//         } else {
//           setIsGuest(true);
//           const timeLeft = Math.floor((expiry - currentTime) / 60000);
//           setGuestTimeLeft(timeLeft);
//         }
//       }
//     };

//     checkGuestExpiry();
//     const interval = setInterval(checkGuestExpiry, 30000);
//     return () => clearInterval(interval);
//   }, [navigate]);

//   useEffect(() => {
//     let interval;
//     if (loading) {
//       interval = setInterval(() => {
//         setLoadingMsgIndex((prevIndex) => (prevIndex + 1) % loadingMessages.length);
//       }, 2500);
//     }
//     return () => clearInterval(interval);
//   }, [loading, loadingMessages.length]);

//   const handlePredict = async () => {
//     if (symbol.trim() === "") {
//       setError("Please enter a stock symbol");
//       return;
//     }

//     setError("");
//     setLoading(true);
//     const startTime = performance.now();

//     try {
//       const response = await fetch("https://vecaid-backend.onrender.com/api/predict", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ ticker: symbol.toUpperCase() }),
//       });

//       if (!response.ok) {
//         throw new Error("Failed to get prediction. Try again!");
//       }

//       const data = await response.json();
//       const endTime = performance.now();
//       const timeTaken = (endTime - startTime) / 1000;

//       if (data.error) {
//         navigate("/predict", { state: { error: data.error } });
//       } else {
//         navigate("/predict", { state: { predictionData: data } });
//       }
//     } catch (err) {
//       navigate("/predict", { state: { error: err.message || "An error occurred while fetching prediction." } });
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("guest_token");
//     localStorage.removeItem("guest_expiry");
//     navigate("/");
//   };

//   return (
//     <div className="home-container min-vh-100 d-flex flex-column justify-content-center align-items-center position-relative">
//       <div className="position-absolute floating-circle top-left" />
//       <div className="position-absolute floating-circle bottom-right" />

//       <div className="glass-effect shadow-3d rounded-4 p-5 text-center" style={{ maxWidth: "600px", width: "90%" }}>
//         <img src={infinityLogo} alt="Vecaid Logo" className="mb-4 logo-animation" style={{ width: "120px", height: "auto" }} />

//         <div className="d-flex justify-content-between align-items-center mb-3">
//           <h1 className="gradient-text display-6 fw-bold mb-0">Vecaid Premium Plus</h1>
//           <button onClick={handleLogout} className="btn btn-sm btn-outline-light shadow-sm ms-3">
//             Logout
//           </button>
//         </div>

//         <p className="text-light-pink mb-3" style={{ fontSize: "1.1rem" }}>
//           Experience the future of stock forecasting with our advanced AI-powered predictions
//         </p>

//         {isGuest && (
//           <div className="alert alert-warning py-2 small" role="alert">
//             ⏱️ Guest access: <strong>{guestTimeLeft} min</strong> left before paywall
//           </div>
//         )}

//         {!loading && (
//           <div className="hover-scale">
//             <div className="mb-3">
//               <input
//                 type="text"
//                 placeholder="Enter Stock Symbol (e.g., NVDA)"
//                 value={symbol}
//                 onChange={(e) => {
//                   setSymbol(e.target.value);
//                   setError("");
//                 }}
//                 className={`form-control form-control-lg glass-effect text-center ${error ? "border-danger" : ""}`}
//                 style={{ height: "60px", fontSize: "1.1rem" }}
//               />
//               {error && <div className="text-danger mt-2 small">{error}</div>}
//             </div>

//             <button onClick={handlePredict} className="btn btn-lg shadow-3d w-100" style={{ height: "60px", fontSize: "1.2rem" }}>
//               Generate AI Prediction
//             </button>
//           </div>
//         )}

//         {loading && (
//           <div className="d-flex flex-column align-items-center mt-4">
//             <div className="eight-ball-container">
//               <div className="eight-ball">
//                 <div className="inner-text">{loadingMessages[loadingMsgIndex]}</div>
//               </div>
//             </div>
//             <p className="animate-fade mt-3">{loadingMessages[loadingMsgIndex]}</p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default Home;

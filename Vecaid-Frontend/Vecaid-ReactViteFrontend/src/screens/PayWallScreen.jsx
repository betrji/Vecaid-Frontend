import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Home.css";
import "bootstrap/dist/css/bootstrap.min.css";
import infinityLogo from "../assets/infinity-logo.svg";

function PaywallScreen() {
  const [price, setPrice] = useState(25);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubscribe = () => {
    if (price < 25 || price > 50) {
      setError("Please choose a price between $25 and $50.");
      return;
    }

    // 👇 Replace with real Stripe redirect logic
    alert(`Redirecting to Stripe for subscription: $${price}/month`);
    // window.location.href = "https://stripe.com/checkout-link-here";
  };

  return (
    <div className="home-container min-vh-100 d-flex flex-column justify-content-center align-items-center position-relative">
      <div className="position-absolute floating-circle top-left" />
      <div className="position-absolute floating-circle bottom-right" />

      <div
        className="glass-effect shadow-3d rounded-4 p-5 text-center"
        style={{ maxWidth: "600px", width: "90%" }}
      >
        <img
          src={infinityLogo}
          alt="Vecaid Logo"
          className="mb-4 logo-animation"
          style={{ width: "120px", height: "auto" }}
        />

        <h1 className="gradient-text display-5 fw-bold mb-3">
          Your Guest Access Has Expired
        </h1>

        <p className="text-light-pink mb-4" style={{ fontSize: "1.1rem" }}>
          To continue using Vecaid Premium Plus, please subscribe.
          <br />
          Choose a fair price between <strong>$25 - $50/month</strong>.
        </p>

        <div className="mb-3">
          <input
            type="number"
            min="25"
            max="50"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            className="form-control form-control-lg glass-effect text-center"
            style={{ height: "60px", fontSize: "1.2rem" }}
          />
          {error && <div className="text-danger mt-2 small">{error}</div>}
        </div>

        <button
          onClick={handleSubscribe}
          className="btn btn-lg btn-primary w-100 shadow-3d"
          style={{ height: "60px", fontSize: "1.2rem" }}
        >
          Subscribe & Continue
        </button>

        <button
          className="btn btn-link text-light-pink mt-3"
          onClick={() => {
            localStorage.removeItem("guest_token");
            localStorage.removeItem("guest_expiry");
            navigate("/");
          }}
        >
          Log In with Account Instead
        </button>
      </div>
    </div>
  );
}

export default PaywallScreen;

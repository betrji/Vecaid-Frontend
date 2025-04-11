
import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../PredictionScreen.css";

function PredictionScreen() {
  const location = useLocation(); // Get data from Home.jsx
  const navigate = useNavigate();

  // Extract predictionData and error from props passed via navigation
  const { predictionData, error } = location.state || {};

  console.log("Prediction Data in PS:", predictionData);

  // Extract prediction_details if available
  const details = predictionData?.prediction_details || {};

  const handleShowChart = () => {
    navigate("/chart", { state: { predictionData } });
  };

  const handleGoBack = () => {
    navigate("/home");
  };

  useEffect(() => {
    if (predictionData) {
      console.log("Prediction Data:", predictionData);
    } else {
      console.error("No prediction data available.");
    }
    if (error) {
      console.error("Error:", error);
    }
  }, [predictionData, error]);

  return (
    <div className="prediction-page min-vh-100 d-flex flex-column justify-content-center align-items-center">
      {/* Floating orbs for background effect */}
      <div
        className="floating-orb"
        style={{
          top: "10%",
          left: "15%",
          width: "200px",
          height: "200px",
          background:
            "radial-gradient(circle at center, rgba(196, 134, 127, 0.1), transparent)",
          animationDelay: "0s",
        }}
      />
      <div
        className="floating-orb"
        style={{
          bottom: "15%",
          right: "10%",
          width: "180px",
          height: "180px",
          background:
            "radial-gradient(circle at center, rgba(255, 236, 243, 0.1), transparent)",
          animationDelay: "-2s",
        }}
      />

      <div className="prediction-card glass-effect shadow-3d p-5 rounded-4 text-center">
        {error ? (
          // Show error message if there's an error
          <div className="text-danger mb-4">
            <h2 className="section-title">Error</h2>
            <p>{error}</p>
          </div>
        ) : predictionData ? (
          // Show prediction results if data is available
          <>
            <h2 className="section-title">ML Weighted Real-Time Prediction</h2>

            <div className="section-content">
              <p>
                <strong>Prediction Direction:</strong>{" "}
                <span
                  className={
                    details.direction === "up" ? "positive" : "negative"
                  }
                >
                  {details.direction === "up" ? "↑" : "↓"}
                </span>
              </p>
              <p>
                <strong>Prediction Difference:</strong>{" "}
                {details.prediction_diff || "0.0"}
              </p>
              <p>
                <strong>Predicted Price:</strong> {details.predicted_price || "N/A"}
              </p>
              <p>
                <strong>Confidence:</strong>{" "}
                {details.confidence_score || "0.0"}
              </p>
              <p>
                <strong>Individual Percent Move:</strong>{" "}
                {details.individual_move || "0.0"}
              </p>
            </div>

            <hr className="divider" />

            <h4 className="sub-section-title">Backtesting Results:</h4>
            <div className="section-content mb-4">
              <p>
                <strong>Accuracy:</strong> {details.accuracy || "0.0"}
              </p>
              <p>
                <strong>Mean Absolute Error:</strong>{" "}
                {details.mae || "N/A"}
              </p>
              <p>
                <strong>Time Completed:</strong>{" "}
                {details.time_completed || "N/A"}
              </p>
            </div>

            <button
              onClick={handleShowChart}
              className="chart-button btn btn-lg shadow-3d mt-3"
            >
              View Detailed Chart Analysis
            </button>
          </>
        ) : (
          // Show fallback message if no data available
          <div className="text-warning">
            <h2 className="section-title">No Prediction Data</h2>
            <p>No prediction data available. Please try again.</p>
          </div>
        )}

        <button
          onClick={handleGoBack}
          className="btn btn-lg mt-4 shadow-3d"
          style={{ height: "50px", fontSize: "1.2rem" }}
        >
          Go Back
        </button>
      </div>
    </div>
  );
}

export default PredictionScreen;

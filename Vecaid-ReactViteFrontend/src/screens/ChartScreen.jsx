// import React from "react";
// import { Line } from "react-chartjs-2";
// import "bootstrap/dist/css/bootstrap.min.css";
// import { Card } from "react-bootstrap";
// import {
//   Chart as ChartJS,
//   LineElement,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   Legend,
//   Tooltip,
// } from "chart.js";

// ChartJS.register(
//   LineElement,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   Legend,
//   Tooltip
// );

// const ChartScreen = () => {
//   const data = {
//     labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
//     datasets: [
//       {
//         label: "Predicted Price",
//         data: [10, 30, 50, 70, 20, 40, 60],
//         borderColor: "#7a7aff",
//         backgroundColor: "rgba(122,122,255,0.2)",
//         tension: 0.3,
//       },
//       {
//         label: "Actual Price",
//         data: [12, 32, 48, 66, 22, 39, 58],
//         borderColor: "#f0c36d",
//         backgroundColor: "rgba(240,195,109,0.2)",
//         tension: 0.3,
//       },
//     ],
//   };

//   const options = {
//     responsive: true,
//     plugins: {
//       legend: {
//         labels: {
//           color: "#fff",
//           font: {
//             size: 14,
//           },
//         },
//       },
//     },
//     scales: {
//       x: {
//         ticks: { color: "#aaa" },
//         grid: { color: "#333" },
//       },
//       y: {
//         ticks: { color: "#aaa" },
//         grid: { color: "#333" },
//       },
//     },
//   };

//   return (
//     <div
//       style={{
//         backgroundColor: "#0d0d0d",
//         minHeight: "100vh",
//         width: "100vw",
//         color: "#fff",
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//         padding: "2rem",
//         boxSizing: "border-box",
//       }}
//     >
//       <div style={{ maxWidth: "800px", width: "100%" }}>
//         <h2
//           className="mb-4 text-center"
//           style={{ color: "#b68a4c", fontWeight: "bold" }}
//         >
//           Predicted vs Actual Price for NVIDIA
//         </h2>
//         <Card
//           className="p-4"
//           style={{
//             backgroundColor: "#1a1a1a",
//             borderColor: "#333",
//             boxShadow: "0 10px 30px rgba(0, 0, 0, 0.5)",
//           }}
//         >
//           <Line data={data} options={options} />
//         </Card>
//       </div>
//     </div>
//   );
// };

// export default ChartScreen;


import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Card } from "react-bootstrap";

const ChartScreen = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { predictionData } = location.state || {};

  // Check if graph data exists
  const graphUrl = predictionData?.graph || "";

  const handleGoBack = () => {
    navigate("/predict", { state: { predictionData } });
  };

  return (
    <div
      style={{
        backgroundColor: "#0d0d0d",
        minHeight: "100vh",
        width: "100vw",
        color: "#fff",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "2rem",
        boxSizing: "border-box",
      }}
    >
      <div style={{ maxWidth: "800px", width: "100%" }}>
        <h2
          className="mb-4 text-center"
          style={{ color: "#b68a4c", fontWeight: "bold" }}
        >
          Predicted vs Actual Price for {predictionData?.ticker || "N/A"}
        </h2>

        {/* Check if graph URL is available */}
        {graphUrl ? (
          <Card
            className="p-4 mb-4"
            style={{
              backgroundColor: "#1a1a1a",
              borderColor: "#333",
              boxShadow: "0 10px 30px rgba(0, 0, 0, 0.5)",
            }}
          >
            <img
              src={graphUrl}
              alt="Stock Prediction Graph"
              style={{
                width: "100%",
                height: "auto",
                borderRadius: "8px",
                border: "1px solid #333",
              }}
            />
          </Card>
        ) : (
          <div className="text-warning text-center mb-4">
            <p>No graph data available. Please try again.</p>
          </div>
        )}

        <button
          onClick={handleGoBack}
          className="btn btn-lg btn-outline-light shadow-3d mt-3 w-100"
        >
          Back to Prediction
        </button>
      </div>
    </div>
  );
};

export default ChartScreen;

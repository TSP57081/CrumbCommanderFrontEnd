import React from "react";
import { useNavigate } from "react-router-dom";
import "./LandingPage.css";

function HomePage() {
  const navigate = useNavigate();

  const handleTrayUpClick = () => {
    navigate("tray-up", { state: { items: {} } });
  };

  const handleRTUClick = () => {
    navigate("/rtu-page", { state: { items: {} } });
  };

  return (
    <div className="container">
      <div className="card" onClick={handleTrayUpClick}>
        <p className="cardText">Tray Up</p>
      </div>
      <div className="card" onClick={handleRTUClick}>
        <p className="cardText">RTU</p>
      </div>
    </div>
  );
}

export default HomePage;

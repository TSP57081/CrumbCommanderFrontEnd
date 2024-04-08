import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./BakeryApp.css";

function BakeryApp() {
  const navigate = useNavigate();

  const [items, setItems] = useState({
    "Margarine Croissants Value Pack 12": 0,
    "Margarine Croissants Six Pack 04": 0,
    "Straight croissants 04": 0,
    "Mini croissants 04": 0,
    "Butter chocolate brioche 04": 0,
    "Raisin brioche 04": 0,
    "Chocolatine 04": 0,
    "Butter Greek yogurt cherry croissants 04": 0,
    "Mini apple strudel 09": 0,
    "Mini blueberry strudel 04": 0,
    "Mini Lemon White Chocolate 04": 0,
    "Mini raspberry strudel 06": 0,
    "Mini cherry strudel 09": 0,
    "Lemon Crown Danishes 03": 0,
    "Cherry Crown Danishes 02": 0,
    "Raspberry Crown Danishes 02": 0,
    "Blueberry Crown Danishes 02": 0,
    "Cherry Blueberry Crown Danishes 02": 0,
    "Lemon apple Crown Danishes 02": 0,
    "Lemon Mini Danishes 03": 0,
    "Cherry Mini Danishes 03": 0,
    "Blueberry Mini Danishes 02": 0,
    "Cherry Blueberry Mini Danishes 04": 0,
    "Lemon Raspberry Mini Danishes 09": 0,
  });

  const handleIncrement = (itemName) => {
    setItems((prevItems) => ({
      ...prevItems,
      [itemName]: prevItems[itemName] + 1,
    }));
  };

  const handleDecrement = (itemName) => {
    setItems((prevItems) => ({
      ...prevItems,
      [itemName]: Math.max(0, prevItems[itemName] - 1),
    }));
  };

  const handleFinalize = () => {
    navigate("/next-page", { state: { items } });
  };

  const handleReset = () => {
    const resetItems = {};
    for (const itemName in items) {
      resetItems[itemName] = 0;
    }
    setItems(resetItems);
  };

  return (
    <div className="container">
      <h1>Tray Up!</h1>
      <div>
        {Object.entries(items).map(([itemName, count]) => {
          const upperLimit = parseInt(itemName.slice(-2), 10);
          const extractedString = itemName.slice(0, -2);
          return (
            <div className="card" key={itemName}>
              <p className="productName">{extractedString}</p>
              <p className="upperLimit">
                Upper Limit: {isNaN(upperLimit) ? 0 : upperLimit}
              </p>
              <div className="counter">
                <button
                  className="button"
                  onClick={() => handleDecrement(itemName)}
                >
                  -
                </button>
                <span>{count}</span>
                <button
                  className="button"
                  onClick={() => handleIncrement(itemName)}
                >
                  +
                </button>
              </div>
            </div>
          );
        })}
      </div>
      <div className="buttons">
        <button className="button" onClick={handleReset}>
          Reset
        </button>
        <button className="button" onClick={handleFinalize}>
          Finalize
        </button>
      </div>
    </div>
  );
}

export default BakeryApp;

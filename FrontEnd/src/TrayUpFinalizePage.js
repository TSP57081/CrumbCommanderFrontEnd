import React from "react";
import { useLocation } from "react-router-dom";
import "./TrayUpFinalizePage.css"; // Import the CSS file for styling

function NextPage() {
  const { state } = useLocation();
  const items = state?.items || {};

  return (
    <div className="container">
      <h2>Entered Values</h2>
      <div className="card-container">
        {Object.entries(items).map(([itemName, count]) => {
          // Extracting the item name without the last two characters
          const itemNameWithoutLastTwoChars = itemName.slice(0, -2);
          return (
            <div className="card" key={itemName}>
              <p className="itemName">{itemNameWithoutLastTwoChars}</p>
              <p className="count">
                Count: <span className="bold">{count}</span>
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default NextPage;

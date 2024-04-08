import React from "react";
import "./card.css";

const InfoCard = (props) => {
  const { cardInfo } = props;

  return (
    <div>
      <div className="profile-section">
        <div className="name-tag">
          <p className="name-sec">{cardInfo.name}</p>
        </div>
      </div>
      <div>
        <p className="card-text">{cardInfo.description}</p>
      </div>
    </div>
  );
};

export default InfoCard;

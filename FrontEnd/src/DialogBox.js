import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import CloseIcon from "@material-ui/icons/Close";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  ratingPopup: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    zIndex: 9999,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  popupContent: {
    backgroundColor: "rgba(255, 255,255, 0.9)",
    padding: "30px",
    borderRadius: "30px",
    maxWidth: "80%",
    position: "relative",
  },
  closeIcon: {
    position: "absolute",
    top: "10px",
    right: "10px",
    cursor: "pointer",
  },
  ratingCard: {
    marginBottom: "10px",
    cursor: "pointer",
  },
  ratingCardContent: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
}));

const RatingPopup = ({ onClose, cards }) => {
  const classes = useStyles();
  const [selectedCard, setSelectedCard] = useState(null);

  const handleCardSelect = (card) => {
    setSelectedCard(card);
  };
  return (
    <div className={classes.ratingPopup}>
      <div className={classes.popupContent}>
        <CloseIcon className={classes.closeIcon} onClick={onClose} />
        <h2>Rate your experience!</h2>
        <h3 style={{ marginTop: "8px" }}>Select a card to rate:</h3>
        <div>
          {cards.map((card, index) => (
            <Card
              key={index}
              className={`${classes.ratingCard} ${
                selectedCard === card ? "selected" : ""
              }`}
              onClick={() => handleCardSelect(card)}
            >
              <CardContent className={classes.ratingCardContent}>
                <span>{card.FirstName}</span>
                <span>{selectedCard === card ? "★" : "☆"}</span>
              </CardContent>
            </Card>
          ))}
        </div>
        <CardActions>
          <Button variant="contained" color="primary" disabled={!selectedCard}>
            SUBMIT
          </Button>
        </CardActions>
      </div>
    </div>
  );
};

export default RatingPopup;

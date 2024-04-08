import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import { Grid } from "@material-ui/core";
import backgroundImage from "../assets/background.png";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import "./trayup.css";

const useStyles = makeStyles((theme) => ({
  gridContainer: {
    padding: "10%",
    alignItems: "center",
    alignContent: "center",
  },
  card: {
    width: "290px",
    borderRadius: "30px",
    margin: "2px",
    height: "200px",
    position: "relative",
    border: "3px solid #fcdda2",
    transition: "transform 0.3s, box-shadow 0.3s",
    "&:hover": {
      transform: "translateY(-5px)",
      boxShadow: "0 10px 20px rgba(0, 0, 0, 0.4)",
    },
  },
  backgroundImage: {
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    // height: "100vh",
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "center",
    marginTop: "20px",
  },
}));

export default function HomeComponent() {
  const classes = useStyles();
  const [finalized, setFinalized] = useState(false);

  const handleFinalize = () => {
    if (finalized) {
      setFinalized(false);
    } else {
      setFinalized(true);
    }
  };

  const handleReset = () => {
    const initialCounts = Array.from({ length: pastries.length }, () => 0);
    setCounts(initialCounts);
    setFinalized(false);
  };

  const pastries = [
    {
      id: 1,
      name: "Margarine Croissants Value Pack",
      upperLimit: 12,
      image:
        "https://images.pexels.com/photos/1339356/pexels-photo-1339356.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
    {
      id: 2,
      name: "Margarine Croissants Six Pack",
      upperLimit: 6,
      image:
        "https://images.pexels.com/photos/1339356/pexels-photo-1339356.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
    {
      id: 3,
      name: "Straight croissants",
      upperLimit: 4,
      image:
        "https://images.pexels.com/photos/1339356/pexels-photo-1339356.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
    {
      id: 4,
      name: "Mini croissants",
      upperLimit: 6,
      image:
        "https://images.pexels.com/photos/1339356/pexels-photo-1339356.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
    {
      id: 5,
      name: "Butter chocolate brioche",
      upperLimit: 4,
      image:
        "https://images.pexels.com/photos/1339356/pexels-photo-1339356.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
    {
      id: 6,
      name: "Raisin brioche",
      upperLimit: 4,
      image:
        "https://images.pexels.com/photos/1339356/pexels-photo-1339356.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
    {
      id: 7,
      name: "Chocolatine",
      upperLimit: 6,
      image:
        "https://images.pexels.com/photos/1339356/pexels-photo-1339356.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
    {
      id: 8,
      name: "Butter Greek yogurt cherry croissants",
      upperLimit: 3,
      image:
        "https://images.pexels.com/photos/1339356/pexels-photo-1339356.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
    {
      id: 9,
      name: "Mini apple strudel",
      upperLimit: 9,
      image:
        "https://images.pexels.com/photos/1339356/pexels-photo-1339356.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
    {
      id: 10,
      name: "Mini blueberry strudel",
      upperLimit: 4,
      image:
        "https://images.pexels.com/photos/1339356/pexels-photo-1339356.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
    {
      id: 11,
      name: "Mini Lemon White Chocolate",
      upperLimit: 4,
      image:
        "https://images.pexels.com/photos/1339356/pexels-photo-1339356.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
    {
      id: 12,
      name: "Mini raspberry strudel",
      upperLimit: 6,
      image:
        "https://images.pexels.com/photos/1339356/pexels-photo-1339356.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
    {
      id: 13,
      name: "Mini cherry strudel",
      upperLimit: 9,
      image:
        "https://images.pexels.com/photos/1339356/pexels-photo-1339356.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
    {
      id: 14,
      name: "Lemon Crown Danishes",
      upperLimit: 3,
      image:
        "https://images.pexels.com/photos/1339356/pexels-photo-1339356.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
    {
      id: 15,
      name: "Cherry Crown Danishes",
      upperLimit: 2,
      image:
        "https://images.pexels.com/photos/1339356/pexels-photo-1339356.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
    {
      id: 16,
      name: "Raspberry Crown Danishes",
      upperLimit: 2,
      image:
        "https://images.pexels.com/photos/1339356/pexels-photo-1339356.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
    {
      id: 17,
      name: "Blueberry Crown Danishes",
      upperLimit: 2,
      image:
        "https://images.pexels.com/photos/1339356/pexels-photo-1339356.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
    {
      id: 18,
      name: "Cherry Blueberry Crown Danishes",
      upperLimit: 2,
      image:
        "https://images.pexels.com/photos/1339356/pexels-photo-1339356.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
    {
      id: 19,
      name: "Lemon apple Crown Danishes",
      upperLimit: 2,
      image:
        "https://images.pexels.com/photos/1339356/pexels-photo-1339356.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
    {
      id: 20,
      name: "Lemon Mini Danishes",
      upperLimit: 3,
      image:
        "https://images.pexels.com/photos/1339356/pexels-photo-1339356.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
    {
      id: 21,
      name: "Cherry Mini Danishes",
      upperLimit: 3,
      image:
        "https://images.pexels.com/photos/1339356/pexels-photo-1339356.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
    {
      id: 22,
      name: "Blueberry Mini Danishes",
      upperLimit: 2,
      image:
        "https://images.pexels.com/photos/1339356/pexels-photo-1339356.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
    {
      id: 23,
      name: "Cherry Blueberry Mini Danishes",
      upperLimit: 4,
      image:
        "https://images.pexels.com/photos/1339356/pexels-photo-1339356.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
    {
      id: 24,
      name: "Lemon Raspberry Mini Danishes",
      upperLimit: 9,
      image:
        "https://images.pexels.com/photos/1339356/pexels-photo-1339356.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
  ];

  const initialCounts = Array.from({ length: pastries.length }, () => 0);
  const [counts, setCounts] = useState(initialCounts);

  const increaseCount = (index) => {
    setCounts((prevCounts) => {
      const newCounts = [...prevCounts];
      if (!finalized) {
        newCounts[index] += 1;
      }
      return newCounts;
    });
  };

  const decreaseCount = (index) => {
    // Update count for the pastry at the specified index
    setCounts((prevCounts) => {
      const newCounts = [...prevCounts];
      if (newCounts[index] > 0 && !finalized) {
        newCounts[index] -= 1;
      }
      return newCounts;
    });
  };

  return (
    // Apply background image class to the body element
    <div className={classes.backgroundImage}>
      <div style={{ justifyContent: "center" }}>
        <Grid container spacing={5} className={classes.gridContainer}>
          {pastries.map((data, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
              <Card className={classes.card}>
                <CardActionArea>
                  <CardContent>
                    <div>
                      <div className="profile-section">
                        <div className="name-tag">
                          <p className="name-sec">{data.name}</p>
                        </div>
                      </div>
                      <div>
                        <p className="card-text">
                          Upper Limit: {data.upperLimit}
                        </p>
                      </div>
                      <div className="count-section">
                        <button
                          className="count-btn"
                          onClick={() => decreaseCount(index)} // Pass index to decreaseCount
                        >
                          <RemoveIcon /> {/* Minus icon */}
                        </button>
                        <p className="count-value">{counts[index]}</p>
                        <button
                          className="count-btn"
                          onClick={() => increaseCount(index)} // Pass index to increaseCount
                        >
                          <AddIcon /> {/* Plus icon */}
                        </button>
                      </div>
                    </div>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      </div>
      <div className={classes.buttonContainer}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleFinalize}
          style={{ marginRight: "20px" }}
        >
          Finalize Values
        </Button>
        <Button variant="contained" color="secondary" onClick={handleReset}>
          Reset Values
        </Button>
      </div>
    </div>
  );
}

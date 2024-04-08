import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import { Link } from "react-router-dom";

import { Grid } from "@material-ui/core";
import CardComponent from "./Card/card.js";

import backgroundImage from "../assets/background.png";
import schedule from "../assets/schedule.png";
import pastries from "../assets/pastries.png";
import rtu from "../assets/rtu.png";
import availability from "../assets/availability.png";
import replace from "../assets/relpace.png";
import add_shift from "../assets/add_shift.png";
import add_employee from "../assets/add_employee.png";

const useStyles = makeStyles((theme) => ({
  gridContainer: {
    padding: "10%",
    alignItems: "center",
    alignContent: "center",
  },
  card: {
    width: "290px",
    borderRadius: "30px",
    margin: "10px",
    height: "380px",
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
}));

export default function HomeComponent() {
  const classes = useStyles();

  const cardData = [
    {
      id: 1,
      name: "Your Schedule",
      description: "Keep a track of your shifts. View, edit, and change!",
    },
    {
      id: 2,
      name: "Add a shift",
      description: "Add a shift for your future reference!",
    },
    {
      id: 3,
      name: "Tray Up",
      description: "Make a list of the amount of pastries to tray up!",
    },
    {
      id: 4,
      name: "Pull RTU",
      description: "Make a list of the items to pull for RTU!",
    },
    {
      id: 5,
      name: "Availability",
      description: "Add or update your availability for the week",
    },
    {
      id: 6,
      name: "Replace",
      description: "Find a replacement for a shift!",
    },
    {
      id: 7,
      name: "Add an Employee",
      description: "Add an employee to assign them shifts",
    },
  ];

  const cardImages = [
    backgroundImage,
    schedule,
    add_shift,
    pastries,
    rtu,
    availability,
    replace,
    add_employee,
  ];

  return (
    <div className={classes.backgroundImage}>
      <div style={{ justifyContent: "center" }}>
        <Grid container spacing={5} className={classes.gridContainer}>
          {cardData.map((data, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
              <Link key={index} to={`/services/${data.id}`}>
                <Card className={classes.card}>
                  <CardActionArea>
                    <CardMedia
                      style={{
                        width: "300px",
                        height: "240px",
                        objectFit: "cover",
                      }}
                      image={cardImages[data.id]}
                    />
                    <CardContent>
                      <CardComponent cardInfo={data} />
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Link>
            </Grid>
          ))}
        </Grid>
      </div>
    </div>
  );
}

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
import "../TrayUp/trayup.css";

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
    const initialCounts = Array.from({ length: products.length }, () => 0);
    setCounts(initialCounts);
    setFinalized(false);
  };

  const products = [
    // Bagels
    { id: 1, name: "Bagels: Cheddar cheese", upperLimit: 6 },
    { id: 2, name: "Bagels: Seseme", upperLimit: 4 },
    { id: 3, name: "Bagels: Plain", upperLimit: 6 },
    { id: 4, name: "Bagels: Cinnamon raisin", upperLimit: 4 },
    { id: 5, name: "Bagels: Blueberry", upperLimit: 4 },
    { id: 6, name: "Bagels: Everything", upperLimit: 6 },
    { id: 7, name: "Bagels: Multigrain", upperLimit: 4 },
    { id: 8, name: "Bagels: Jalapeno cheddar", upperLimit: 6 },
    { id: 9, name: "Montreal Bagels", upperLimit: 16 },

    // Byblos
    { id: 10, name: "Byblos: Cheddar cheese", upperLimit: 3 },
    { id: 11, name: "Byblos: Seseme", upperLimit: 3 },
    { id: 12, name: "Byblos: Cinnamon raisin", upperLimit: 3 },
    { id: 13, name: "Byblos: Plain", upperLimit: 3 },
    { id: 14, name: "Byblos: Blueberry", upperLimit: 3 },
    { id: 15, name: "Byblos: Everything", upperLimit: 3 },
    { id: 16, name: "Byblos: Multigrain", upperLimit: 3 },

    // Ozery Bakery Morning rounds
    {
      id: 17,
      name: "Ozery Bakery Morning rounds: Cranberry orange",
      upperLimit: 2,
    },
    {
      id: 18,
      name: "Ozery Bakery Morning rounds: Apple cinnamon",
      upperLimit: 2,
    },

    // Oakrun farm crumpets
    { id: 19, name: "Oakrun farm crumpets", upperLimit: 4 },

    // Comp cornbread loaf bread
    { id: 20, name: "Comp cornbread loaf bread", upperLimit: 4 },

    // Doughnuts
    { id: 21, name: "Doughnuts: Sugar", upperLimit: 4 },
    { id: 22, name: "Doughnuts: Plain", upperLimit: 4 },
    { id: 23, name: "Doughnuts: Cinnamon", upperLimit: 4 },

    // Mom's Loafs
    { id: 24, name: "Mom's Loafs: Gumdrop loaf", upperLimit: 2 },
    { id: 25, name: "Mom's Loafs: Blueberry Loaf", upperLimit: 3 },
    { id: 26, name: "Mom's Loafs: Apple cinnamon loaf", upperLimit: 2 },
    { id: 27, name: "Mom's Loafs: Lemon loaf", upperLimit: 4 },
    { id: 28, name: "Mom's Loafs: Lemon loaf sliced", upperLimit: 3 },
    { id: 29, name: "Mom's Loafs: Banana loaf", upperLimit: 4 },
    { id: 30, name: "Mom's Loafs: Sliced banana", upperLimit: 3 },

    // Two bite cinnamon rolls
    { id: 31, name: "Two bite cinnamon rolls", upperLimit: 4 },

    // Coconut macaroon bites
    { id: 32, name: "Coconut macaroon bites", upperLimit: 4 },

    // Fudge Brownie Bites
    { id: 33, name: "Fudge Brownie Bites", upperLimit: 4 },

    // Fudge brownie bites big
    { id: 34, name: "Fudge brownie bites big", upperLimit: 2 },

    // Cinnamon Rolls Big
    { id: 35, name: "Cinnamon Rolls Big", upperLimit: 2 },

    // Lemon squares
    { id: 36, name: "Lemon squares", upperLimit: 2 },

    // 7 layer squares
    { id: 37, name: "7 layer squares", upperLimit: 2 },

    // Brownie squares
    { id: 38, name: "Brownie squares", upperLimit: 2 },

    // Le Petit Francis Donut raspberry
    { id: 39, name: "Le Petit Francis Donut raspberry", upperLimit: 6 },

    // Angel food cake
    { id: 40, name: "Angel food cake", upperLimit: 2 },

    // Angel food cake mini
    { id: 41, name: "Angel food cake mini", upperLimit: 2 },

    // Golden Pound Cake
    { id: 42, name: "Golden Pound Cake", upperLimit: 9 },

    // Iced Pound Cake
    { id: 43, name: "Iced Pound Cake", upperLimit: 9 },

    // Dessert Shells
    { id: 44, name: "Dessert Shells", upperLimit: 4 },

    // School Safe
    { id: 45, name: "School Safe: Birthday cake", upperLimit: 2 },
    { id: 46, name: "School Safe: Brownie", upperLimit: 2 },
    { id: 47, name: "School Safe: Banana chocolate chip", upperLimit: 2 },
    { id: 48, name: "School Safe: Blueberry", upperLimit: 2 },

    // Tarts
    { id: 49, name: "Tarts: Raisin", upperLimit: 4 },
    { id: 50, name: "Tarts: Pecan", upperLimit: 4 },

    // Panjimi naan original
    { id: 51, name: "Panjimi naan original", upperLimit: 8 },

    // Panjimi Naan Garlic
    { id: 52, name: "Panjimi Naan Garlic", upperLimit: 8 },

    // Panjimi mini naan
    { id: 53, name: "Panjimi mini naan", upperLimit: 8 },

    // Comp naan rounds original
    { id: 54, name: "Comp naan rounds original", upperLimit: 4 },

    // Compliments Appetizer Flat Bread
    { id: 55, name: "Compliments Appetizer Flat Bread", upperLimit: 2 },

    // Panache mini naan
    { id: 56, name: "Panache mini naan", upperLimit: 6 },

    // Panache naan
    { id: 57, name: "Panache naan", upperLimit: 4 },

    // Panache roasted garlic naan
    { id: 58, name: "Panache roasted garlic naan", upperLimit: 2 },

    // Panache Caramiz Onion
    { id: 59, name: "Panache Caramiz Onion", upperLimit: 2 },

    // Comp pita white mini
    { id: 60, name: "Comp pita white mini", upperLimit: 4 },

    // Comp pita small greek
    { id: 61, name: "Comp pita small greek", upperLimit: 3 },

    // Comp pita small white
    { id: 62, name: "Comp pita small white", upperLimit: 3 },

    // Fanpocket pita small original
    { id: 63, name: "Fanpocket pita small original", upperLimit: 6 },

    // Fanpocket pita small Whole Wheat
    { id: 64, name: "Fanpocket pita small Whole Wheat", upperLimit: 2 },

    // Pizza Crust Circle
    { id: 65, name: "Pizza Crust Circle", upperLimit: 4 },

    // Pizza Crust Square
    { id: 66, name: "Pizza Crust Square", upperLimit: 4 },

    // Muffins
    { id: 67, name: "Muffins: Choco chip", upperLimit: 5 },
    { id: 68, name: "Muffins: Carrot", upperLimit: 4 },
    { id: 69, name: "Muffins: Blueberry", upperLimit: 12 },
    { id: 70, name: "Muffins: Raisin Bran", upperLimit: 4 },
    { id: 71, name: "Muffins: Lemon cranberry", upperLimit: 8 },
    { id: 72, name: "Muffins: Double Choc", upperLimit: 3 },
    { id: 73, name: "Muffins: Banana chocolate chunk", upperLimit: 4 },
    { id: 74, name: "Muffins: Variety pack", upperLimit: 4 },
    { id: 75, name: "Muffins: Blueberry mini", upperLimit: 4 },
    { id: 76, name: "Muffins: Chocolate chip mini", upperLimit: 4 },
    { id: 77, name: "Muffins: Carrot mini", upperLimit: 4 },
    { id: 78, name: "Muffins: Cinnamon coffee cake", upperLimit: 4 },
    { id: 79, name: "Muffins: Double Berry Greek yogurt", upperLimit: 4 },
    { id: 80, name: "Muffins: West Coast Trail Mix", upperLimit: 4 },

    // NSA
    { id: 81, name: "NSA: BLUEBERRY", upperLimit: 3 },
    { id: 82, name: "NSA: Rhubarb Strawberry", upperLimit: 3 },
    { id: 83, name: "NSA: Apple", upperLimit: 3 },

    // Compliments Pies
    { id: 84, name: "Compliments Pies: Pecan", upperLimit: 3 },
    {
      id: 85,
      name: "Compliments Pies: Comp pie northern spy Apple 8 in",
      upperLimit: 3,
    },
    {
      id: 86,
      name: "Compliments Pies: Comp pie rhubarb strawberry 8 in",
      upperLimit: 3,
    },
    {
      id: 87,
      name: "Compliments Pies: Comp pie apple crumble 8in",
      upperLimit: 3,
    },
    { id: 88, name: "Compliments Pies: Blueberry", upperLimit: 3 },
    { id: 89, name: "Compliments Pies: Pumpkin", upperLimit: 3 },
    { id: 90, name: "Compliments Pies: Mincemeat", upperLimit: 3 },
    { id: 91, name: "Compliments Pies: Compliments cherry pie", upperLimit: 3 },
    {
      id: 92,
      name: "Compliments Pies: TableTalk Apple Caramel",
      upperLimit: 3,
    },
    {
      id: 93,
      name: "Compliments Pies: TableTalk Apple Raspberry",
      upperLimit: 3,
    },

    // Pies
    { id: 94, name: "Pies: Blueberry Pie", upperLimit: 3 },
    { id: 95, name: "Pies: Apple crumble", upperLimit: 3 },
    { id: 96, name: "Pies: Strawberry rhubarb", upperLimit: 3 },
    { id: 97, name: "Pies: Northern spy apple", upperLimit: 3 },
    { id: 98, name: "Pies: Pumpkin", upperLimit: 3 },
    { id: 99, name: "Pies: Pecan", upperLimit: 3 },
    { id: 100, name: "Pies: Apple Caramel", upperLimit: 3 },
    { id: 101, name: "Pies: Apple Raspberry", upperLimit: 3 },
  ];

  const initialCounts = Array.from({ length: products.length }, () => 0);
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
    setCounts((prevCounts) => {
      const newCounts = [...prevCounts];
      if (newCounts[index] > 0 && !finalized) {
        newCounts[index] -= 1;
      }
      return newCounts;
    });
  };

  return (
    <div className={classes.backgroundImage}>
      <div style={{ justifyContent: "center" }}>
        <Grid container spacing={5} className={classes.gridContainer}>
          {products.map((data, index) => (
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
                          onClick={() => decreaseCount(index)}
                        >
                          <RemoveIcon />
                        </button>
                        <p className="count-value">{counts[index]}</p>
                        <button
                          className="count-btn"
                          onClick={() => increaseCount(index)}
                        >
                          <AddIcon />
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

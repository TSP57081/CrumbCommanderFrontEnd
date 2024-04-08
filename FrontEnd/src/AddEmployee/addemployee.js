import React, { useState } from "react";

import {
  Grid,
  Paper,
  Typography,
  TextField,
  Button,
  makeStyles,
} from "@material-ui/core";
import { Parallax } from "react-parallax";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import backgroundImage from "../assets/background.png";
import "./addemployee.css";
import dotenv from "dotenv";

const useStyles = makeStyles((theme) => ({
  parentCard: {
    padding: "60px",
    borderRadius: "40px",
    backgroundColor: "rgba(255,255,255,0.87)",
    [theme.breakpoints.down("sm")]: {
      margin: "5%",
      padding: "20px",
    },
  },
  timeContainer: {
    display: "flex",
    alignItems: "center",
  },
  backgroundImage: {
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    height: "100vh",
    alignContent: "center",
    alignItems: "center",
  },
  textfields: {
    marginBottom: "10px",
    marginLeft: "2px",
    width: "100%",
  },
}));

const FindReplacement = () => {
  dotenv.config();
  const classes = useStyles();
  const [formData, setFormData] = useState({
    FirstName: "",
    LastName: "",
    Email: "",
    PhoneNumber: "",
    EmploymentStartDate: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async () => {
    if (
      !formData.FirstName ||
      !formData.LastName ||
      !formData.Email ||
      !formData.PhoneNumber
    ) {
      toast.error("Please fill in all required fields");
      return;
    }

    const employeeData = {
      FirstName: formData.FirstName,
      LastName: formData.LastName,
      Email: formData.Email,
      PhoneNumber: formData.PhoneNumber,
      EmploymentStartDate: "2024-10-04",
    };

    try {
      const employeeResponse = await fetch(
        `${process.env.REACT_APP_BASE_URL}add_employee`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(employeeData),
        }
      );

      if (employeeResponse.status === 200) {
        toast.success("Employee added successfully");
      } else {
        toast.error("Couldn't add employee");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred");
    }
  };

  return (
    <div className={classes.backgroundImage}>
      <Parallax strength={10} className="login-parallax-content">
        <Paper className={classes.parentCard}>
          <Grid container className="login-content">
            <Grid item xs={12} sm={8}>
              <Typography variant="h4" gutterBottom>
                Employee Details:
              </Typography>
              <div>
                <form onSubmit={handleSubmit}>
                  <div className={classes.timeContainer}>
                    <TextField
                      label="First Name"
                      variant="outlined"
                      margin="normal"
                      className={classes.textfields}
                      required
                      name="FirstName"
                      value={formData.FirstName}
                      onChange={handleChange}
                    />
                    <TextField
                      label="Last Name"
                      variant="outlined"
                      margin="normal"
                      className={classes.textfields}
                      required
                      name="LastName"
                      value={formData.LastName}
                      onChange={handleChange}
                    />
                  </div>
                  <TextField
                    label="Email"
                    variant="outlined"
                    margin="normal"
                    className={classes.textfields}
                    required
                    name="Email"
                    value={formData.Email}
                    onChange={handleChange}
                  />
                  <TextField
                    label="Phone No."
                    variant="outlined"
                    margin="normal"
                    className={classes.textfields}
                    required
                    name="PhoneNumber"
                    value={formData.PhoneNumber}
                    onChange={handleChange}
                  />
                  <Button
                    variant="contained"
                    className="login-button"
                    onClick={handleSubmit}
                  >
                    Add Employee!
                  </Button>
                </form>
              </div>
            </Grid>
          </Grid>
        </Paper>
      </Parallax>
      <ToastContainer />
    </div>
  );
};

export default FindReplacement;

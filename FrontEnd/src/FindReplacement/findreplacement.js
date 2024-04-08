import React, { useState } from "react";

import {
  Grid,
  Paper,
  Typography,
  TextField,
  Button,
  makeStyles,
  MenuItem,
} from "@material-ui/core";
import { Parallax } from "react-parallax";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import backgroundImage from "../assets/background.png";
import "./findreplacement.css";
import DialogBox from "../DialogBox.js";
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
  },
  timetextfields: {
    marginBottom: "10px",
    width: "120px",
    marginLeft: "2px",
  },
}));

const FindReplacement = () => {
  dotenv.config();
  const classes = useStyles();
  const [formData, setFormData] = useState({
    StartTimeHour: "",
    StartTimeMinute: "",
    EndTimeHour: "",
    EndTimeMinute: "",
    DayOfWeek: "",
  });
  const [availableEmployees, setAvailableEmployees] = useState([]);
  const [showPopup, setShowPopup] = useState(false);

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async () => {
    if (
      !formData.StartTimeHour ||
      !formData.StartTimeMinute ||
      !formData.EndTimeHour ||
      !formData.EndTimeMinute ||
      !formData.DayOfWeek
    ) {
      toast.error("Please fill in all required fields");
      return;
    }

    const startTime = `${formData.StartTimeHour}:${formData.StartTimeMinute}:00`;
    const endTime = `${formData.EndTimeHour}:${formData.EndTimeMinute}:00`;

    const shiftData = {
      StartTime: startTime,
      EndTime: endTime,
      DayOfWeek: formData.DayOfWeek,
    };

    try {
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}find_available_employees`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(shiftData),
        }
      );

      if (response.status === 200) {
        const data = await response.json();
        setAvailableEmployees(data.employees);
        toast.success("Found available employees");
      } else {
        toast.error("Couldn't find available employees");
      }
    } catch (error) {
      console.error("Error finding available employees:", error);
      toast.error("An error occurred while finding available employees");
    }
  };

  const renderHourOptions = () => {
    const hours = [];
    for (let i = 0; i <= 23; i++) {
      hours.push(
        <MenuItem key={i} value={String(i).padStart(2, "0")}>
          {String(i).padStart(2, "0")}
        </MenuItem>
      );
    }
    return hours;
  };

  const renderMinuteOptions = () => {
    const minutes = [];
    for (let i = 0; i <= 59; i = i + 15) {
      minutes.push(
        <MenuItem key={i} value={String(i).padStart(2, "0")}>
          {String(i).padStart(2, "0")}
        </MenuItem>
      );
    }
    return minutes;
  };

  const renderDayOfWeekOptions = () => {
    const daysOfWeek = [
      { value: "Monday", label: "Monday" },
      { value: "Tuesday", label: "Tuesday" },
      { value: "Wednesday", label: "Wednesday" },
      { value: "Thursday", label: "Thursday" },
      { value: "Friday", label: "Friday" },
      { value: "Saturday", label: "Saturday" },
      { value: "Sunday", label: "Sunday" },
    ];

    return daysOfWeek.map((day) => (
      <MenuItem key={day.value} value={day.value}>
        {day.label}
      </MenuItem>
    ));
  };

  return (
    <div className={classes.backgroundImage}>
      <Parallax strength={10} className="login-parallax-content">
        <Paper className={classes.parentCard}>
          <Grid container className="login-content">
            <Grid item xs={12} sm={8}>
              <Typography variant="h4" gutterBottom>
                Find a replacement!
              </Typography>
              <div>
                <form onSubmit={handleSubmit}>
                  <div className={classes.timeContainer}>
                    <TextField
                      select
                      label="Start Time Hour"
                      variant="outlined"
                      margin="normal"
                      className={classes.timetextfields}
                      required
                      name="StartTimeHour"
                      value={formData.StartTimeHour}
                      onChange={handleChange}
                    >
                      {renderHourOptions()}
                    </TextField>
                    <TextField
                      select
                      label="Start Time Minute"
                      variant="outlined"
                      margin="normal"
                      className={classes.timetextfields}
                      required
                      name="StartTimeMinute"
                      value={formData.StartTimeMinute}
                      onChange={handleChange}
                    >
                      {renderMinuteOptions()}
                    </TextField>
                  </div>
                  <div className={classes.timeContainer}>
                    <TextField
                      select
                      label="End Time Hour"
                      variant="outlined"
                      margin="normal"
                      className={classes.timetextfields}
                      required
                      name="EndTimeHour"
                      value={formData.EndTimeHour}
                      onChange={handleChange}
                    >
                      {renderHourOptions()}
                    </TextField>
                    <TextField
                      select
                      label="End Time Minute"
                      variant="outlined"
                      margin="normal"
                      className={classes.timetextfields}
                      required
                      name="EndTimeMinute"
                      value={formData.EndTimeMinute}
                      onChange={handleChange}
                    >
                      {renderMinuteOptions()}
                    </TextField>
                  </div>
                  <div className={classes.timeContainer}>
                    <TextField
                      select
                      label="Day of Week"
                      variant="outlined"
                      margin="normal"
                      className={classes.timetextfields}
                      required
                      name="DayOfWeek"
                      value={formData.DayOfWeek}
                      onChange={handleChange}
                    >
                      {renderDayOfWeekOptions()}
                    </TextField>
                  </div>
                  <Button
                    variant="contained"
                    className="login-button"
                    onClick={handleSubmit}
                  >
                    Find Replacement
                  </Button>
                </form>
                {availableEmployees.length > 0 && (
                  <div>
                    <Typography variant="h6" style={{ marginTop: 20 }}>
                      Available Employees:
                    </Typography>
                    <ul>
                      {availableEmployees.map((employee) => (
                        <li key={employee.EmployeeID}>
                          {employee.FirstName} {employee.LastName} (ID:{" "}
                          {employee.EmployeeID})
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </Grid>
          </Grid>
        </Paper>
      </Parallax>
      <ToastContainer />
      {showPopup && (
        <DialogBox cards={availableEmployees} onClose={handleClosePopup} />
      )}
    </div>
  );
};

export default FindReplacement;

import React, { useState, useEffect } from "react";
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
import "./addavailability.css";
import dotenv from "dotenv";

const useStyles = makeStyles((theme) => ({
  parentCard: {
    borderRadius: "40px",
    backgroundColor: "rgba(255,255,255,0.87)",
    [theme.breakpoints.down("sm")]: {
      margin: "0%",
      padding: "0px",
    },
    height: "100%",
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
    [theme.breakpoints.down("sm")]: {
      marginBottom: "0%",
    },
    marginRight: "8px",
  },
  timetextfields: {
    marginBottom: "10px",
    [theme.breakpoints.down("sm")]: {
      marginBottom: "0%",
    },
    width: "90px",
    marginRight: "8px",
  },
  formWrapper: {
    [theme.breakpoints.down("sm")]: {
      padding: "2%",
    },
    marginTop: "5px",
    marginBottom: "50px",
  },
  Weekday: {
    width: "170px",
  },
  loginParallaxContent: {
    height: "90vh",
    [theme.breakpoints.down("sm")]: {
      height: "100vh",
    },
    display: "flex",
    alignContent: "center",
    justifyContent: "center",
    overflow: "visible",
  },
}));

const AddAvailability = () => {
  dotenv.config();
  const classes = useStyles();
  const [formData, setFormData] = useState({
    EmployeeID: "",
    EmployeeName: "",
    StartTimeHour: "",
    StartTimeMinute: "",
    EndTimeHour: "",
    EndTimeMinute: "",
    StartTimeHour2: "",
    StartTimeMinute2: "",
    EndTimeHour2: "",
    EndTimeMinute2: "",
    Weekday: "",
  });

  useEffect(() => {
    const currentDate = new Date();
    const year = String(currentDate.getFullYear());
    const month = String(currentDate.getMonth() + 1).padStart(2, "0");
    const day = String(currentDate.getDate()).padStart(2, "0");

    setFormData((prevFormData) => ({
      ...prevFormData,
      Year: year,
      Month: month,
      Day: day,
    }));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = () => {
    if (
      !formData.EmployeeID ||
      !formData.EmployeeName ||
      !formData.StartTimeHour ||
      !formData.StartTimeMinute ||
      !formData.EndTimeHour ||
      !formData.EndTimeMinute ||
      !formData.StartTimeHour2 ||
      !formData.StartTimeMinute2 ||
      !formData.EndTimeHour2 ||
      !formData.EndTimeMinute2 ||
      !formData.Weekday
    ) {
      toast.error("Please fill in all required fields");
    } else {
      const startTime1 = `${formData.StartTimeHour}:${formData.StartTimeMinute}:00`;
      const endTime1 = `${formData.EndTimeHour}:${formData.EndTimeMinute}:00`;
      const startTime2 = `${formData.StartTimeHour2}:${formData.StartTimeMinute2}:00`;
      const endTime2 = `${formData.EndTimeHour2}:${formData.EndTimeMinute2}:00`;

      const shiftData = {
        EmployeeID: parseInt(formData.EmployeeID),
        DayOfWeek: getDayOfWeekString(formData.Weekday),
        StartTime1: startTime1,
        EndTime1: endTime1,
        StartTime2: startTime2,
        EndTime2: endTime2,
      };

      const uploadShift = async () => {
        try {
          const response = await fetch(
            `${process.env.REACT_APP_BASE_URL}add_availability`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(shiftData),
            }
          );

          if (response.ok) {
            toast.success("Availability added successfully");
          } else {
            toast.error("Couldn't add Availability");
          }
        } catch (error) {
          console.error("Error uploading Availability:", error);
          toast.error("An error occurred while uploading Availability");
        }
      };

      uploadShift();
    }
  };

  const getDayOfWeekString = (weekdayIndex) => {
    const daysOfWeek = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    return daysOfWeek[weekdayIndex];
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
      { value: 0, label: "Sunday" },
      { value: 1, label: "Monday" },
      { value: 2, label: "Tuesday" },
      { value: 3, label: "Wednesday" },
      { value: 4, label: "Thursday" },
      { value: 5, label: "Friday" },
      { value: 6, label: "Saturday" },
    ];

    return daysOfWeek.map((day) => (
      <MenuItem key={day.value} value={day.value}>
        {day.label}
      </MenuItem>
    ));
  };

  return (
    <div style={{ overflowY: "auto" }}>
      {" "}
      <div className={classes.backgroundImage}>
        <Parallax strength={10} className={classes.loginParallaxContent}>
          <Paper className={classes.parentCard}>
            <Grid container className="login-content">
              <Grid item xs={12} sm={8}>
                <div className={classes.formWrapper}>
                  <form onSubmit={handleSubmit}>
                    <Typography style={{ fontWeight: "bold" }}>
                      Employee Information:
                    </Typography>
                    <div className={classes.timeContainer}>
                      <TextField
                        label="Emp. ID"
                        placeholder="Emp. ID*"
                        variant="outlined"
                        margin="normal"
                        required
                        className={classes.textfields}
                        name="EmployeeID"
                        value={formData.EmployeeID}
                        onChange={handleChange}
                      />
                      <TextField
                        label="Emp. Name"
                        placeholder="Emp. Name*"
                        variant="outlined"
                        margin="normal"
                        required
                        className={classes.textfields}
                        name="EmployeeName"
                        value={formData.EmployeeName}
                        onChange={handleChange}
                      />
                    </div>
                    <Typography style={{ fontWeight: "bold" }}>
                      Available from:
                    </Typography>
                    <div className={classes.timeContainer}>
                      <TextField
                        select
                        label="Hour"
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
                        label="Mins"
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
                    <Typography style={{ fontWeight: "bold" }}>
                      Available till:
                    </Typography>
                    <div className={classes.timeContainer}>
                      <TextField
                        select
                        label="Hour"
                        variant="outlined"
                        className={classes.timetextfields}
                        margin="normal"
                        required
                        name="EndTimeHour"
                        value={formData.EndTimeHour}
                        onChange={handleChange}
                      >
                        {renderHourOptions()}
                      </TextField>
                      <TextField
                        select
                        label="Mins"
                        variant="outlined"
                        margin="normal"
                        required
                        className={classes.timetextfields}
                        name="EndTimeMinute"
                        value={formData.EndTimeMinute}
                        onChange={handleChange}
                      >
                        {renderMinuteOptions()}
                      </TextField>
                    </div>
                    <Typography style={{ fontWeight: "bold" }}>
                      Available From 2 (Optional):
                    </Typography>
                    <div className={classes.timeContainer}>
                      <TextField
                        select
                        label="Hour"
                        variant="outlined"
                        className={classes.timetextfields}
                        margin="normal"
                        required
                        name="StartTimeHour2"
                        value={formData.StartTimeHour2}
                        onChange={handleChange}
                      >
                        {renderHourOptions()}
                      </TextField>
                      <TextField
                        select
                        label="Mins"
                        variant="outlined"
                        margin="normal"
                        required
                        className={classes.timetextfields}
                        name="StartTimeMinute2"
                        value={formData.StartTimeMinute2}
                        onChange={handleChange}
                      >
                        {renderMinuteOptions()}
                      </TextField>
                    </div>
                    <Typography style={{ fontWeight: "bold" }}>
                      Available till 2 (Optional):
                    </Typography>
                    <div className={classes.timeContainer}>
                      <TextField
                        select
                        label="Hour"
                        variant="outlined"
                        className={classes.timetextfields}
                        margin="normal"
                        required
                        name="EndTimeHour2"
                        value={formData.EndTimeHour2}
                        onChange={handleChange}
                      >
                        {renderHourOptions()}
                      </TextField>
                      <TextField
                        select
                        label="Mins"
                        variant="outlined"
                        margin="normal"
                        required
                        className={classes.timetextfields}
                        name="EndTimeMinute2"
                        value={formData.EndTimeMinute2}
                        onChange={handleChange}
                      >
                        {renderMinuteOptions()}
                      </TextField>
                    </div>
                    <Typography style={{ fontWeight: "bold" }}>Day:</Typography>
                    <div className={classes.timeContainer}>
                      <TextField
                        select
                        label="Week day"
                        variant="outlined"
                        margin="normal"
                        required
                        className={classes.Weekday}
                        name="Weekday"
                        value={formData.Weekday}
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
                      Submit
                    </Button>
                  </form>
                </div>
              </Grid>
            </Grid>
          </Paper>
        </Parallax>
        <ToastContainer />
      </div>
    </div>
  );
};

export default AddAvailability;

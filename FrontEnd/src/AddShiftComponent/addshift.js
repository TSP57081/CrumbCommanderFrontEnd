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
import "./addshift.css";
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
    width: "90px",
    marginLeft: "2px",
  },
}));

const Login = () => {
  dotenv.config();
  const classes = useStyles();
  const [formData, setFormData] = useState({
    EmployeeID: "",
    EmployeeName: "",
    StartTimeHour: "",
    StartTimeMinute: "",
    EndTimeHour: "",
    EndTimeMinute: "",
    Year: "",
    Month: "",
    Day: "",
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
      !formData.Day ||
      !formData.Month ||
      !formData.Year ||
      !formData.StartTimeHour ||
      !formData.StartTimeMinute ||
      !formData.EndTimeHour ||
      !formData.EndTimeMinute ||
      !formData.EmployeeID ||
      !formData.EmployeeName
    ) {
      toast.error("Please fill in all required fields");
    } else {
      const startTime = `${formData.StartTimeHour}:${formData.StartTimeMinute}:00`;
      const endTime = `${formData.EndTimeHour}:${formData.EndTimeMinute}:00`;
      const date = `${formData.Year}-${formData.Month}-${formData.Day}`;

      const shiftData = {
        EmployeeID: parseInt(formData.EmployeeID),
        EmployeeName: formData.EmployeeName,
        StartTime: startTime,
        EndTime: endTime,
        Date: date,
      };

      const uploadShift = async () => {
        const response = await fetch(
          `${process.env.REACT_APP_BASE_URL}add_employee_shift`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(shiftData),
          }
        );
        if (response.status === 200) {
          toast.success("Shift added successfully");
        } else {
          toast.error("Couldn't add shift");
        }
      };
      uploadShift();
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

  return (
    <div className={classes.backgroundImage}>
      <Parallax strength={10} className="login-parallax-content">
        <Paper className={classes.parentCard}>
          <Grid container className="login-content">
            <Grid item xs={12} sm={8}>
              <Typography variant="h4" gutterBottom>
                Add a shift!
              </Typography>
              <div>
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
                    Shift Start Time:
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
                    Shift End Time:
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
                    Shift Date:
                  </Typography>
                  <div className={classes.timeContainer}>
                    <TextField
                      label="Year"
                      placeholder="YYYY"
                      className={classes.timetextfields}
                      variant="outlined"
                      margin="normal"
                      required
                      name="Year"
                      value={formData.Year}
                      onChange={handleChange}
                    />
                    <TextField
                      label="Month"
                      placeholder="MM"
                      variant="outlined"
                      className={classes.timetextfields}
                      margin="normal"
                      required
                      name="Month"
                      value={formData.Month}
                      onChange={handleChange}
                    />
                    <TextField
                      label="Day"
                      placeholder="DD"
                      variant="outlined"
                      margin="normal"
                      className={classes.timetextfields}
                      required
                      name="Day"
                      value={formData.Day}
                      onChange={handleChange}
                    />
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
  );
};

export default Login;

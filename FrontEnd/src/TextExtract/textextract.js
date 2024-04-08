import React, { useState } from "react";
import { Grid, Paper, Typography, Button, makeStyles } from "@material-ui/core";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../AddShiftComponent/addshift.css";
import AWS from "aws-sdk/dist/aws-sdk-react-native";
import ScannedItems from "./scannedList.js";
import dotenv from "dotenv";

const useStyles = makeStyles((theme) => ({
  parentCard: {
    width: "60%",
    padding: "60px",
    borderRadius: "40px",
    backgroundColor: "rgba(255,255,255,0.87)",
    alignContent: "center",
    [theme.breakpoints.down("sm")]: {
      margin: "5%",
      padding: "20px",
    },
  },
  timeContainer: {
    display: "flex",
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

const ExtractTextFromImage = () => {
  const classes = useStyles();
  const [imageFile, setImageFile] = useState(null);
  const [extractedText, setExtractedText] = useState([]);

  dotenv.config();
  console.log(process.env.REACT_APP_ACCESS_KEY_ID);

  AWS.config.update({
    region: "us-east-1",
    accessKeyId: process.env.REACT_APP_ACCESS_KEY_ID,
    secretAccessKey: process.env.REACT_APP_SECRET_ACCESS_KEY,
    sessionToken: process.env.REACT_APP_SESSION_TOKEN,
  });

  const handleFileChange = (event) => {
    setImageFile(event.target.files[0]);
  };

  const extractText = async () => {
    if (!imageFile) {
      alert("Please select an image file.");
      return;
    }

    const textractClient = new AWS.Textract();

    const fileReader = new FileReader();
    fileReader.readAsArrayBuffer(imageFile);
    fileReader.onload = async () => {
      const imageBytes = new Uint8Array(fileReader.result);

      const params = {
        Document: {
          Bytes: imageBytes,
        },
        FeatureTypes: ["TABLES"],
      };
      try {
        const response = await textractClient.analyzeDocument(params).promise();
        console.log(response);
        const newArray = [...extractedText];
        response.Blocks.forEach((block) => {
          if (block.BlockType === "LINE") {
            if (block.Text.length > 10) {
              newArray.push(block.Text);
            }
          }
        });
        setExtractedText(newArray);
        console.log(newArray);
      } catch (error) {
        console.error("Error extracting text:", error);
        alert("Error extracting text from image. Please try again.");
      }
    };
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Paper className={classes.parentCard}>
          <Grid container justifyContent="center" alignContent="center">
            <Grid item xs={12} sm={8}>
              <Typography variant="h4" gutterBottom>
                Extract Text from Image
              </Typography>
              <div>
                <form>
                  <Typography style={{ fontWeight: "bold" }}>
                    Select Image:
                  </Typography>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                  />
                  <Button
                    variant="contained"
                    color="primary"
                    className="login-button"
                    onClick={extractText}
                  >
                    Extract Text
                  </Button>
                </form>
              </div>
            </Grid>
          </Grid>
        </Paper>
        <ToastContainer />
      </div>
      <div>
        {extractedText.length !== 0 && <ScannedItems items={extractedText} />}
      </div>
    </div>
  );
};

export default ExtractTextFromImage;

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
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../AddShiftComponent/addshift.css";
import { CONFIG } from "../config.js";
import AWS from "aws-sdk/dist/aws-sdk-react-native";
import ScannedItems from "./scannedList.js";
import { AlignHorizontalCenter } from "@mui/icons-material";

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

  AWS.config.update({
    region: "us-east-1", // Replace with your AWS region
    accessKeyId: "ASIAU6GDY5AHMRBS4I7P", // Replace with your AWS access key ID
    secretAccessKey: "6vdbvdkzzzpxViBnOHA/qEfHf947JNHGCNLnwZ/p", // Replace with your AWS secret access key
    sessionToken:
      "IQoJb3JpZ2luX2VjELj//////////wEaCXVzLXdlc3QtMiJGMEQCIBsQGQuQvbqaytYiljfU5G4rdNiqx91TtvCJt34eAnpdAiAMFdwSLbkqtqOO4jYS5O0dE1UT1XZOQ212XpymjpswKCqyAgjh//////////8BEAAaDDMzOTcxMjk5MzI5NCIMq/njo0A1Mp3wHwl5KoYCynEiiWtsUG6RsbytIU0l4URzXHlU/LfwIRmZCw0+7qxKohUqs8QQ+SIQSOdWCr9aVDxEWOxuJ9QrGyP8kZAKzSVCBR9UXdjV7ogLV2dPhsbgsTZXSVy1pnWKvKVdbFqfePwHEGMt8XIzbstDt6ftJoCUbrmGYAE9SE+GR5nbyUKnKtDy5FJyXaXU5s4DfNrw3krP7gxCZWixnSad7nF9Rf38mpH+z3YXXM8GUxzNlYIMxpVT0c3qfAGaGnRhufvpT7N/FzQrbN+s/h/YBjtbiwRY9ovC7BBLwAf08fCza7/PuXI/nlDMbdZ3HMcNnAOdMrMoCeFd5SHlRQAPmUvPJuxg2KdJ8DC37cywBjqeASh725w/JyNENLT1NNNlMvb6jhsjuC0Ab7FIovbbuMnHLhNbbW+aRdqV0ZAWlLGjv3ZtDZCxxF/BceixKQ5XcQ3S5I5pvvATSgLZYwKVXkxFtJmUYVRSrftp+CsZiFKFCPnSf8YWYigSRT5BrgCPIvwaNs64v1M9PpRHGPy20XEibYXdePYdkQCPpRFm4tMG9GENNdPWFaSFX7r0Dz1E",
  });

  const handleFileChange = (event) => {
    setImageFile(event.target.files[0]);
  };

  const extractText = async () => {
    if (!imageFile) {
      alert("Please select an image file.");
      return;
    }

    // Initialize Textract client
    const textractClient = new AWS.Textract();

    // Read image file
    const fileReader = new FileReader();
    fileReader.readAsArrayBuffer(imageFile);
    fileReader.onload = async () => {
      const imageBytes = new Uint8Array(fileReader.result);

      // Call Textract detectDocumentText API
      const params = {
        Document: {
          Bytes: imageBytes,
        },
        FeatureTypes: ["TABLES"],
      };
      try {
        const response = await textractClient.analyzeDocument(params).promise();
        console.log(response);
        // Extract text from response
        let text = "";
        const newArray = [...extractedText];
        response.Blocks.forEach((block) => {
          if (block.BlockType === "LINE") {
            if (block.Text.length > 10) {
              //   const newArray = [...extractedText, block.Text];
              //   setExtractedText(newArray);
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

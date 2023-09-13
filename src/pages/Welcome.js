import { useState } from 'react';
import { Container, Typography, Button, LinearProgress, Box, CircularProgress } from '@mui/material';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import HomeIcon from '@mui/icons-material/Home';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import mockDatabase from '../data/mockDatabase';

function Welcome() {
    const [fileUploading, setFileUploading] = useState(false);
    const [fileUploaded, setFileUploaded] = useState(false);
    const [scanInProgress, setScanInProgress] = useState(false);
    const [scanResult, setScanResult] = useState(null);

    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        setFileUploading(true);

        processImageWithAzure(file)
            .then(data => {
                const detectedData = mockDatabase.find(entry => data.includes(entry.name) && data.includes(entry.number));
                setScanResult(detectedData ? "matched" : "not-matched");
            })
            .catch(err => {
                console.error("Error processing image:", err);
                setScanResult("error");
            })
            .finally(() => {
                setFileUploading(false);
                setFileUploaded(true);
            });
    };

    const processImageWithAzure = async (image) => {
        const endpoint = "https://as12.cognitiveservices.azure.com/vision/v3.0/ocr";
        const key = "fbb9f78165254043978f4113a49d6279";
        const requestOptions = {
            method: "POST",
            body: image,
            headers: {
                "Content-Type": "application/octet-stream",
                "Ocp-Apim-Subscription-Key": key
            }
        };

        const response = await fetch(endpoint, requestOptions);
        const data = await response.json();

        let detectedText = "";
        data.regions.forEach(region => {
            region.lines.forEach(line => {
                line.words.forEach(word => {
                    detectedText += word.text + " ";
                });
                detectedText += "\n";
            });
        });

        return detectedText;
    };

    return (
        <div className="welcome-container">
            <Container maxWidth="sm" className="welcome-card">
                <Typography variant="h4" gutterBottom align="center">
                    Welcome to Our Verification Service
                </Typography>
                <Typography variant="body1" gutterBottom align="center">
                    Upload your certificate to verify its authenticity.
                </Typography>

                <Box display="flex" flexDirection="column" gap={2} mt={4}>
                    <Button
                        className="upload-button"
                        startIcon={<UploadFileIcon />}
                        component="label"
                        disabled={fileUploading}
                        variant="contained"
                        color="primary"
                    >
                        Upload Certificate
                        <input
                            type="file"
                            hidden
                            onChange={handleFileUpload}
                        />
                    </Button>

                    <Button 
                        startIcon={<HomeIcon />} 
                        onClick={() => window.location.href='/'}
                        variant="outlined"
                    >
                        Home
                    </Button>
                </Box>

                {fileUploading && (
                    <Box mt={4} display="flex" flexDirection="column" alignItems="center" gap={2}>
                        <CircularProgress />
                        <Typography>Processing...</Typography>
                    </Box>
                )}

                {fileUploaded && scanResult === "matched" && (
                    <Box mt={4} display="flex" alignItems="center" className="scan-success">
                        <CheckCircleIcon color="success" />
                        <Typography color="success" gutterBottom ml={2}>
                            This certificate is valid!
                        </Typography>
                    </Box>
                )}

                {fileUploaded && scanResult === "not-matched" && (
                    <Box mt={4} display="flex" alignItems="center" className="scan-error">
                        <CancelIcon color="error" />
                        <Typography color="error" gutterBottom ml={2}>
                            This certificate did not match our records.
                        </Typography>
                    </Box>
                )}

                {fileUploaded && scanResult === "error" && (
                    <Box mt={4} display="flex" alignItems="center" className="scan-error">
                        <CancelIcon color="error" />
                        <Typography color="error" gutterBottom ml={2}>
                            An error occurred while processing the file.
                        </Typography>
                    </Box>
                )}
            </Container>
        </div>
    );
}

export default Welcome;
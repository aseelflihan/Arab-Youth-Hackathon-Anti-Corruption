import React, { useState, useRef } from 'react';
import { Container, Typography, Button, LinearProgress } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import UploadFileIcon from '@mui/icons-material/Publish';

function Welcome() {
    const [file, setFile] = useState(null);
    const [fileUploading, setFileUploading] = useState(false);
    const [fileUploaded, setFileUploaded] = useState(false);
    const [scanInProgress, setScanInProgress] = useState(false);
    const [scanResult, setScanResult] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);

    const fileInputRef = useRef(null);

    const handleFileUpload = (e) => {
        const selectedFile = e.target.files[0];

        if (!selectedFile) {
            handleReset();
            setErrorMessage("Nothing uploaded.");
            return;
        }

        setErrorMessage(null);
        setFile(selectedFile);
        setFileUploading(true);

        setTimeout(() => {
            setFileUploaded(true);
            setFileUploading(false);
            setScanResult(null);
        }, 3000);
    };

    const handleScan = () => {
        if (!file) {
            setErrorMessage("Please upload a file first.");
            return;
        }

        setScanInProgress(true);
        setTimeout(() => {
            setScanResult(true);
            setScanInProgress(false);
        }, 3000);
    };

    const handleReset = () => {
        setFile(null);
        setFileUploaded(false);
        setFileUploading(false);
        setScanInProgress(false);
        setScanResult(null);
        setErrorMessage(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    return (
        <div className="welcome-container">
            <Container>
                <Typography variant="h4" gutterBottom>
                    Welcome to Our Service
                </Typography>
                <Typography variant="body1" gutterBottom>
                    Upload and scan your files.
                </Typography>

                <Button
                    className="upload-button"
                    startIcon={<UploadFileIcon />}
                    component="label"
                    disabled={fileUploading}
                >
                    Upload File
                    <input
                        ref={fileInputRef}
                        type="file"
                        hidden
                        onChange={handleFileUpload}
                    />
                </Button>

                {fileUploading && <LinearProgress />}

                {fileUploaded && !scanInProgress && (
                    <Typography color="success" gutterBottom>
                        File uploaded successfully!
                    </Typography>
                )}

                {errorMessage && (
                    <Typography color="error" gutterBottom>
                        {errorMessage}
                    </Typography>
                )}

                {fileUploaded && (
                    <>
                        <Button 
                            className="scan-button" 
                            onClick={handleScan}
                            disabled={scanInProgress}
                        >
                            Scan File
                        </Button>
                        <Button 
                            className="reset-button"
                            onClick={handleReset}
                        >
                            Check Another File
                        </Button>
                    </>
                )}

                {scanInProgress && (
                    <Typography gutterBottom>
                        Scanning is in progress. Please wait...
                    </Typography>
                )}

                {scanResult && (
                    <div className="scan-success">
                        <CheckCircleIcon className="scan-success-icon" />
                        <Typography>The certificate is valid.</Typography>
                    </div>
                )}
            </Container>
        </div>
    );
}

export default Welcome;

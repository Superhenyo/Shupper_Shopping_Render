import React, { useState, useEffect } from "react";
import Resizer from "react-image-file-resizer";
import { Container, Row, Col, Button } from "react-bootstrap";

const UploadButton = ({ onImageSelect, resetImage }) => {
    const [selectedImage, setSelectedImage] = useState(null);

    useEffect(() => {
        if (resetImage) {
            setSelectedImage(null);
        }
    }, [resetImage]);

    function removePhoto() {
        setSelectedImage(null);
        onImageSelect(null);
    }

    // Function to resize an image
    const resizeImage = (file) => {
        return new Promise((resolve) => {
            Resizer.imageFileResizer(
                file,
                300, // max width
                300, // max height
                "JPEG", // compress format
                100, // quality
                0, // rotation
                (uri) => {
                    resolve(uri);
                },
                "blob" // output type
            );
        });
    };

    const handleImageChange = async (event) => {
        const selectedFile = event.target.files[0];
        if (selectedFile) {
            // Resize the image before setting it
            const resizedImage = await resizeImage(selectedFile);
            setSelectedImage(resizedImage);
            onImageSelect(resizedImage);
        }
    };

    return (
        <Container>
            <Row>
                <Col>
                    <div className="upload-container">
                        {selectedImage ? (
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                <img
                                    alt="not found"
                                    className="uploaded-image"
                                    src={URL.createObjectURL(selectedImage)}
                                />
                                <Button className="w-200 mt-2" variant="info" size="sm" onClick={removePhoto}>
                                    Remove
                                </Button>
                            </div>
                        ) : (
                            <div className="upload-placeholder">
                                <div className="empty-frame">
                                    click here to add Photo
                                </div>
                                <label className="upload-btn-wrapper">
                                    <input
                                        type="file"
                                        name="image"
                                        onChange={handleImageChange}
                                    />
                                    <Button variant="info" size="sm">
                                        Choose File
                                    </Button>
                                </label>
                            </div>
                        )}
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default UploadButton;

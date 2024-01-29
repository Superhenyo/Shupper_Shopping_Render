import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';

const UserChangePhoto = ({ showModal, handleClose }) => {
    const [imageLink, setImageLink] = useState('');
    const [message, setMessage] = useState('');
;

    const handleChangePhoto = async (e) => {
        e.preventDefault();

        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${process.env.REACT_APP_API_URL}/users/changePhoto`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ newPhoto: imageLink }),
            });

            if (response.ok) {
                setMessage('Photo successfully');
                setImageLink('')
                handleClose()
            } else {
                const errorData = await response.json();
                setMessage(errorData.message);
                
            }
        } catch (error) {
            setMessage('An error occurred. Please try again.');
            console.error(error);
        }
    };

    return (
        <Modal show={showModal} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Reset Photo</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form onSubmit={handleChangePhoto}>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">
                            New Photo Link
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            value={imageLink}
                            onChange={(e) => setImageLink(e.target.value)}
                            required
                        />
                    </div>
                    {message && <div className="alert alert-danger">{message}</div>}
                    <Button type="submit" className="btn btn-primary">
                        Sumbit
                    </Button>
                </form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default UserChangePhoto;

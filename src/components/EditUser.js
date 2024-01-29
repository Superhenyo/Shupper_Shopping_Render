import React, { useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import Swal from 'sweetalert2';

export default function EditUser({ user, fetchData2 }) {
    const [userId, setUserId] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [authority, setAuthority] = useState('false');
    const [showEdit, setShowEdit] = useState(false);

    const openEdit = (userId) => {
        fetch(`${process.env.REACT_APP_API_URL}/users/${userId}`)
            .then(res => res.json())
            .then(data => {
                setUserId(data._id);
                setFirstName(data.firstName);
                setLastName(data.lastName);
                setEmail(data.email);
                setAuthority(String(data.isAdmin));
            })
            .catch(error => {
                console.error('Error fetching user data:', error);
                setAuthority('');
            });
        setShowEdit(true);
    }
    const closeEdit = () => {
        setShowEdit(false);
        setFirstName('');
        setLastName('');
        setEmail('');
        setAuthority('');
    }
    const EditUser = (e, userId) => {
        e.preventDefault();    
        fetch(`${process.env.REACT_APP_API_URL}/users/${userId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({
                firstName: firstName,
                lastName: lastName,
                email: email,
                isAdmin: authority
            })
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data === true) {
                    Swal.fire({
                        title: 'Success!',
                        icon: 'success',
                        text: 'Users Successfully Updated'
                    });
                    closeEdit();
                    fetchData2();
                } else {
                    Swal.fire({
                        title: 'Error!',
                        icon: 'error',
                        text: ' Please try again',
                    });
                    closeEdit();
                    fetchData2();
                }
            });
    }

    return (
        <>
            <Button variant="primary" size="sm" onClick={() => openEdit(user)} className='m-1'> Edit </Button>

            <Modal show={showEdit} onHide={closeEdit}>
                <Form onSubmit={e => EditUser(e, userId)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Edit Users</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form.Group>
                            <Form.Label>First Name</Form.Label>
                            <Form.Control
                                type="text"
                                value={firstName}
                                onChange={e => setFirstName(e.target.value)}
                                required
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control
                                type="text"
                                value={lastName}
                                onChange={e => setLastName(e.target.value)}
                                required
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                required
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Is Admin</Form.Label>
                            <Form.Control
                                type="text"
                                value={authority}
                                onChange={e => setAuthority(e.target.value)}
                                pattern="true|false|yes|no"
                                title="Please enter 'true', 'false', 'yes', or 'no'"
                                required
                            />
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={closeEdit}>Close</Button>
                        <Button variant="success" type="submit">Submit</Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </>
    );
}

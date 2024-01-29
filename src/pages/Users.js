import React, { useState, useEffect } from "react";
import { Container, Table } from "react-bootstrap";
import EditUser from "../components/EditUser";
import DeleteUser from "../components/DeleteUser";

export default function UserView({ fetchData2 }) {

    const [userDetails, setUserDetails] = useState([]);

    const fetchData = () => {
        fetch(`${process.env.REACT_APP_API_URL}/users/allUsers`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                setUserDetails(data);
            })
            .catch(error => {
                console.error("Error fetching user details:", error);
            });
    };
    useEffect(() => {
        fetchData();
    }, []);


    return (
        <Container className="profileContainer m-0 p-0">
            <h1 className="text-center">Admin Dashboard</h1>
            <div className="admin-view-container">
                <Table striped bordered hover responsive>
                    <thead>
                        <tr className="text-center">
                            <th style={{ width: "25%" }}>Name</th>
                            <th style={{ width: "45%" }}>Email</th>
                            <th style={{ width: "10%" }}>Order</th>
                            <th style={{ width: "10%" }}>Admin</th>
                            <th colSpan={3} style={{ width: "10%" }}>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {userDetails.map((user) => (
                            <tr key={user._id} className="text-center align-content-center">
                                <td>{user.firstName + " " + user.lastName}</td>
                                <td>{user.email}</td>
                                <td>
                                    {user.isAdmin ? "Admin" : (
                                        (user.orderedProduct && user.orderedProduct[0] && user.orderedProduct[0].products) ?
                                            user.orderedProduct[0].products.reduce((total, product) => {
                                                const productQuantity = typeof product.quantity === 'number' ? product.quantity : 0;
                                                return total + productQuantity;
                                            }, 0) :
                                            "No order"
                                    )}
                                </td>
                                <td style={{ color: user.isAdmin ? 'blue' : 'red' }}>
                                    {user.isAdmin ? "Yes" : "No"}
                                </td>
                                <td><EditUser user={user._id} fetchData2={fetchData2} /></td>
                                <td><DeleteUser user={user._id} fetchData={fetchData} /></td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
        </Container>
    );
}

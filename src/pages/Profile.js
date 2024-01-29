import { useContext, useEffect, useState } from "react";
import { Row, Col, CardTitle, Container, Button, Image, Table } from "react-bootstrap";
import UserContext from "../UserContext";
import { Navigate } from "react-router-dom";
import ResetPassword from "../components/ResetPassword";
import UserChangePhoto from "../components/userChangePhoto"

export default function Profile() {
    const { user } = useContext(UserContext);

    const [details, setDetails] = useState({});
    const [userOrder, setUserOrder] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [showPhotoModal, setPhotoModal] = useState(false);

    const handleShow = () => setShowModal(true);
    const handleClose = () => setShowModal(false);
    const changePhotoShow = () => setPhotoModal(true);
    const changePhotoClose = () => setPhotoModal(false);

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}/users/userDetails`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        })
            .then((res) => res.json())
            .then((data) => {
                if (typeof data._id !== "undefined") {
                    setDetails(data);
                    setUserOrder(data.orderedProduct)
                }
            });
    }, []);

    const removeProduct = (productId) => {
        fetch(`${process.env.REACT_APP_API_URL}/users/removeProduct/${details._id}/${productId}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        })
            .then((res) => res.json())
            .then((data) => {
                setUserOrder(prevUserOrder => {
                    const updatedUserOrder = prevUserOrder.map(order => {
                        order.products = order.products.filter(product => product._id !== productId);
                        return order;
                    });
                    return updatedUserOrder;
                });
            })
            .catch((error) => {
                console.error('Error removing product:', error);
            });
    };


    return user.id === null ? (
        <Navigate to="/products" />
    ) : (
        <>
            <Container className="profileContainer">
                <Row className="bg-success">
                    <Col className="text-center">
                        <Row>
                            <Col>
                                {details.imageLink ? (
                                    <Image
                                        src={details.imageLink}
                                        alt={details.name}
                                        className="mt-2"
                                        style={{
                                            borderRadius: "25%",
                                            maxWidth: "250px",
                                            maxHeight: "250px",
                                            minHeight: "200px",
                                            minWidth: "200px",
                                        }}
                                    />
                                ) : (
                                    <Image
                                        src="https://i.ibb.co/7Cq4wtp/noimages.jpg"
                                        alt="No Image"
                                        className="mt-2"
                                        style={{
                                            borderRadius: "50%",
                                            maxWidth: "250px",
                                            maxHeight: "250px",
                                            minHeight: "200px",
                                            minWidth: "200px",
                                        }}
                                    />
                                )}
                            </Col>
                        </Row>
                        <Row>
                            <Col className="m-1">
                                <Button className="btn btn-primary mb-3" onClick={changePhotoShow}>
                                    Change Photo
                                </Button>
                                <UserChangePhoto showModal={showPhotoModal} handleClose={changePhotoClose} />
                            </Col>
                        </Row>
                    </Col>
                    <Col className="p-0 m-0">
                        <CardTitle className="profile">
                            <h2 className="mt-5 mx-5">{`${details.firstName} ${details.lastName}`}</h2>
                            <h6 className="mb-1 text-center">
                                {details.isAdmin === true ? "Admin" : "Client"}
                            </h6>
                        </CardTitle>
                        <hr />
                        <h4>Contacts</h4>
                        <ul>
                            <li>Email: {details.email}</li>
                        </ul>
                        <h4>Change Password</h4>
                        <Button className="btn btn-primary mb-3" onClick={handleShow}>
                            Change password
                        </Button>
                        <ResetPassword showModal={showModal} handleClose={handleClose} />
                    </Col>
                </Row>
                <Row className="text-center">
                    <h1>User Orders</h1>
                    <Table striped bordered hover responsive>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>quantity</th>
                                <th>Total</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {userOrder.map((order) => (
                                order.products.map((product) => (
                                    <tr key={product._id}>
                                        <td>{product.productName}</td>
                                        <td>{product.quantity}</td>
                                        <td>{product.subtotal}</td>
                                        <td>
                                            <Button onClick={() => removeProduct(product._id)}>
                                                Remove
                                            </Button>
                                        </td>
                                    </tr>
                                ))
                            ))}
                        </tbody>
                    </Table>
                </Row>
            </Container>
        </>
    );
}

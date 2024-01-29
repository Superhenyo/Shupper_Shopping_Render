import { useState, useContext } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import Swal from "sweetalert2";
import UserContext from "../UserContext";
import { Navigate } from "react-router-dom";

export default function AddProduct() {
    const { user } = useContext(UserContext);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [quantity, setQuantity] = useState("");
    const [price, setPrice] = useState("");
    const [imageLink, setimageLink] = useState("");

    function createProducts(e) {
        e.preventDefault();
        let token = localStorage.getItem("token");
        fetch(`${process.env.REACT_APP_API_URL}/products/create`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                name,
                description,
                price,
                quantity,
                imageLink
            })
        })
            .then(res => res.json())
            .then((data) => {
                if (data) {
                    Swal.fire({
                        icon: "success",
                        title: "Products Added!",
                        text: data.message
                    });
                } else {
                    Swal.fire({
                        icon: "error",
                        title: "Unsuccessful Products Creation",
                        text: data.message,
                    });
                }
            })
            .catch((error) => {
                console.error("Error:", error.message || "Unknown error occurred.");
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "An error occurred while creating the product.",
                });
            })
            .finally(() => {
                setName("");
                setDescription("");
                setPrice("");
                setQuantity("");
                setimageLink("");
            });
    }


    return (
        (user.isAdmin === true) ?
            <>
                <Container style={{height: '87vh'}}>
                    <h1 className="my-3 text-center">Add Product</h1>
                    <Container className="addProductContainer">
                        <Row >
                            <Col>
                                <Form onSubmit={(e) => createProducts(e)}>
                                    <Form.Group>
                                        <Form.Label>Name:</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Enter Name"
                                            required
                                            value={name}
                                            onChange={(e) => {
                                                setName(e.target.value);
                                            }}
                                        />
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label>Description:</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Enter Description"
                                            required
                                            value={description}
                                            onChange={(e) => {
                                                setDescription(e.target.value);
                                            }}
                                        />
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label>Quantity:</Form.Label>
                                        <Form.Control
                                            type="number"
                                            placeholder="Enter Quantity"
                                            required
                                            value={quantity}
                                            onChange={(e) => {
                                                setQuantity(e.target.value);
                                            }}
                                        />
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label>Price:</Form.Label>
                                        <Form.Control
                                            type="number"
                                            placeholder="Enter Price"
                                            required
                                            value={price}
                                            onChange={(e) => {
                                                setPrice(e.target.value);
                                            }}
                                        />
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label>Images Link</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Enter Image Link"
                                            value={imageLink}
                                            onChange={(e) => {
                                                setimageLink(e.target.value);
                                            }}
                                        />
                                    </Form.Group>
                                    <Row className="d-flex justify-content-center p-3">
                                        <Button type="submit" className="btn-sm" style={{ width: '200px', marginTop: '20px' }} variant="info">
                                            Create Product
                                        </Button>
                                    </Row>
                                </Form>
                            </Col>
                        </Row>
                        <hr></hr>
                    </Container>
                </Container>
            </>
            :
            <Navigate to="/products" />
    );
}

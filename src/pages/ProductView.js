import { useState, useEffect, useContext } from 'react';
import { Container, Card, Button, Row, Col, Form } from 'react-bootstrap';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import UserContext from '../UserContext';
import FeaturedProduct from '../components/FeaturedProduct';
import Products from './Product';

export default function ProductView() {
	const { productId } = useParams();
	const { user } = useContext(UserContext);
	const navigate = useNavigate();

	const [name, setName] = useState("");
	const [description, setDescription] = useState("");
	const [price, setPrice] = useState(0);
	const [quantity, setQuantity] = useState(1);
	const [fixedQuantity, setFixedQuantity] = useState();
	const [imageLink, setImageLink] = useState('');

	const handleQuantityChange = (event) => {
		const newQuantity = parseInt(event.target.value, 10);
		setQuantity(isNaN(newQuantity) ? 1 : newQuantity);
	};

	const purchase = () => {
		fetch(`${process.env.REACT_APP_API_URL}/users/checkout`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${localStorage.getItem('token')}`
			},
			body: JSON.stringify({
				productId: productId,
				productName: name,
				quantity: quantity
			})
		})
			.then(res => res.json())
			.then(data => {
				if (data.message === 'successfull') {
					Swal.fire({
						title: "Successful",
						icon: "success",
						text: `You have successfully purchased ${quantity}, amounting ${quantity * price}`
					});
					navigate("/products");
				} else {
					Swal.fire({
						title: "Something went wrong",
						icon: "error",
						text: "Please try again."
					});
				}
			});
	};

	useEffect(() => {
		fetch(`${process.env.REACT_APP_API_URL}/products/${productId}`)
			.then(res => res.json())
			.then(data => {
				setName(data.name);
				setDescription(data.description);
				setPrice(data.price);
				setImageLink(data.imageLink);
				setFixedQuantity(data.quantity);
			});
	}, [productId]);

	return (
		<Container className="mt-5">
			<Row>
				<Col>
					<Card className='productView'>
						<Card.Body>
							<Row>
								<Col className='text-center' xs={12} lg={4} >
									<Card.Img
										variant="top"
										src={imageLink}
										alt={name}
										style={{ maxHeight: '600px', maxWidth: '200px', minHeight: '300px', objectFit: 'cover' }}
										className="text-center"
									/>
								</Col>
								<Col className='d-flex flex-column justify-content-around mt-2 verticalLine' >
									<Card.Title className='productViewTextTitle'>{name}</Card.Title>
									<Card.Subtitle className='boldText'>Description:</Card.Subtitle>
									<Card.Text>{description}</Card.Text>
									<Card.Subtitle className='boldText'>Price:</Card.Subtitle>
									<Card.Text>PhP {price}</Card.Text>
									<Card.Subtitle className='boldText'>Stock:</Card.Subtitle>
									<Card.Text>{fixedQuantity}</Card.Text>
								</Col>
								<Col xs={12} lg={4} className="d-flex flex-column align-items-around">
									<h4 className='text-center'>Quantity:</h4>
									<Form.Group controlId="quantity" className='text-center'>
										<Form.Control
											type="number"
											placeholder="Enter quantity"
											value={quantity}
											className='text-center'
											onChange={handleQuantityChange}
											max={fixedQuantity}
											min={0}
										/>
									</Form.Group>
									{user.id !== null ? (
										<>
											<Button className="m-1" variant="primary" onClick={purchase}>
												Purchase
											</Button >
											<Button className="m-1" variant="primary" onClick={() => { /* Add to Cart logic */ }}>
												Add to Cart
											</Button>
										</>
									) : (
										<Link className="btn btn-danger btn-block" to="/login">
											Log in to buy
										</Link>
									)}
								</Col>
							</Row>
						</Card.Body>
					</Card>
					<hr className='mt-5' />
					<Row>
						<Col>
							<h2 className="text-left ms-5">Suggestions</h2>
							<FeaturedProduct break={2} />
						</Col>
					</Row>


				</Col>
			</Row>
		</Container>
	);
}

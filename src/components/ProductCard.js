import React from 'react';
import { Card, Row, Col, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export default function ProductCard({ productProps, fetchData }) {
	const { _id, name, description, price, quantity, imageLink } = productProps;

	return (
		<Container  >
			<Row >
				<Col className='mb-2'>
					<Card style={{ border: '1px solid black', height: '400px' }} className="text-center cardHighlight">
						<Card.Body >
							<Card.Img
								variant="top"
								src={imageLink}
								alt={name}
								style={{ maxHeight: '120px', maxWidth: '100px', minHeight: '120px', objectFit: 'cover', }}
								className="text-center"
							/>
							<Card.Title>{name}</Card.Title>
							<Card.Subtitle>Description:</Card.Subtitle>
							<Card.Text style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
								{description}
							</Card.Text>
							<Card.Subtitle>Remaining:</Card.Subtitle>
							<Card.Text>{quantity}</Card.Text>
							<Card.Subtitle>Price:</Card.Subtitle>
							<Card.Text>Php {price}</Card.Text>
							<div className="mt-auto">
								<Link className="btn btn-primary " to={`/products/${_id}`}>
									Details
								</Link>
							</div>
						</Card.Body>
					</Card>
				</Col>
			</Row>
		</Container>
	);
}

ProductCard.propTypes = {
	productProps: PropTypes.shape({
		name: PropTypes.string.isRequired,
		description: PropTypes.string.isRequired,
		price: PropTypes.number.isRequired,
		quantity: PropTypes.number,
	}),
};

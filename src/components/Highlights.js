import { Row, Col, Card, Container } from 'react-bootstrap';

export default function Highlights() {
	return (
		<Container>
			<Row>
				<Col xs={12} md={4} className='mt-2'>
					<Card className="cardHighlight">
						<Card.Body>
							<Card.Title>
								<h2>Explore Trendy Products</h2>
							</Card.Title>
							<Card.Text>
								Discover the latest and most stylish products. Find fashion, electronics, and more, all in one place.
							</Card.Text>
						</Card.Body>
					</Card>
				</Col>
				<Col xs={12} md={4} className='mt-2'>
					<Card className="cardHighlight" >
						<Card.Body >
							<Card.Title>
								<h2>Convenient Online Shopping</h2>
							</Card.Title>
							<Card.Text >
								Shop from the comfort of your home. Enjoy the ease and convenience of online shopping with just a few clicks.
							</Card.Text>
						</Card.Body>
					</Card>
				</Col>
				<Col xs={12} md={4} className='mt-2'>
					<Card className="cardHighlight">
						<Card.Body>
							<Card.Title>
								<h2>Join Our Shopping Community</h2>
							</Card.Title>
							<Card.Text>
								Become a part of our growing community of online shoppers. Stay updated on the latest deals and trends.
							</Card.Text>
						</Card.Body>
					</Card>
				</Col>
			</Row>
		</Container>
	);
}

import { Col, Card, Row} from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function PreviewProduct({ data, breakPoint }) {
	const { _id, name, description, price, imageLink } = data;
	return (
		<Col xs={12} sm={5} lg={breakPoint} md={5}  className='m-2'>
			<Card className="mx-2 cardHighlight text-center" >
				<Row className='m-2'>
					<Card.Img
						variant="top"
						src={imageLink}
						alt={name}
						style={{ maxHeight: '230px', minHeight: '230px', objectFit: 'cover', borderRadius: '10%' }}

					/>
				</Row>
				<Card.Body className='p-0 m-0'>
					<Card.Title className="text-center">
						<Link to={`/products/${_id}`}>{name}</Link>
					</Card.Title>
					<Card.Text className='text-center '>{description}</Card.Text>
				</Card.Body>
				<Card.Footer>
					<h5 className="text-center">₱{price}</h5>
					<Link className="btn btn-primary d-block" to={`/products/${_id}`}>Details</Link>
				</Card.Footer>
			</Card>
		</Col>
	)
}


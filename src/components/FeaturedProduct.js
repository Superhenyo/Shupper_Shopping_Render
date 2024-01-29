import { useState, useEffect } from 'react';
import { CardGroup } from 'react-bootstrap';
import PreviewProduct from './PreviewProduct';

export default function FeaturedProduct() {
	const [previews, setPreviews] = useState([]);

	useEffect(() => {
		fetch(`${process.env.REACT_APP_API_URL}/products/active`)
			.then(res => res.json())
			.then(data => {
				const featured = [];
				const numbers = [];
				const breaker = data.length > 5 ? 5 : data.length ;
				const generateRandomNumbers = () => {
					let randomNum = Math.floor(Math.random() * data.length);
					if (numbers.indexOf(randomNum) === -1) {
						numbers.push(randomNum);
					} else {
						generateRandomNumbers();
					}
				}
				for (let i = 0; i < breaker; i++) {
					generateRandomNumbers();
					featured.push(
						<PreviewProduct data={data[numbers[i]]} key={data[numbers[i]]._id} breakPoint={2} />
					)
				}
				setPreviews(featured);
			})
	}, [])
	return (
		<>
			<CardGroup className='justify-content-center m-4'>
				{previews}
			</CardGroup>
		</>
	)
}
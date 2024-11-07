import { useState, useEffect } from 'react';
import { CardGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import PreviewBlogs from './PreviewBlogs'; // Updated import for blog preview component

export default function FeaturedBlogs() { // Updated component name

	const [previews, setPreviews] = useState([]);

	useEffect(() => {
		fetch(`${process.env.REACT_APP_API_BASE_URL}/blogs`) // Updated API endpoint to fetch blogs
			.then(res => res.json())
			.then(data => {
				const numbers = [];
				const featured = [];

				const generateRandomNums = () => {
					let randomNum = Math.floor(Math.random() * data.length);
					if (numbers.indexOf(randomNum) === -1) {
						numbers.push(randomNum);
					} else {
						generateRandomNums();
					}
				};

				for (let i = 0; i < 5; i++) {
					generateRandomNums();
					featured.push(
						<PreviewBlogs data={data[numbers[i]]} key={data[numbers[i]]._id} breakPoint={2} /> // Updated component for preview
					);
				}
				setPreviews(featured);
			});
	}, []);

	return (
		<>
			<h2 className="text-center">Featured Blogs</h2> {/* Updated title */}
			<CardGroup className="justify-content-center">{previews}</CardGroup>
		</>
	);
}

import { Col, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function PreviewBlogs(prop) { // Updated component name

	const { breakPoint, data } = prop;

	const { _id, title, content } = data; // Assuming the blog data has `title` and `content`

	return (
		<Col xs={12} md={breakPoint}>
			<Card className="cardHighlight">
				<Card.Body>
					<Card.Title className="text-center">
						<Link to={`/blogs/${_id}`}>{title}</Link> {/* Updated link to blogs */}
					</Card.Title>
					<Card.Text>{content}</Card.Text> {/* Assuming content replaces description */}
				</Card.Body>
				<Card.Footer>
					<Link className="btn btn-primary d-block" to={`/blogs/${_id}`}>Read More</Link> {/* Updated button text */}
				</Card.Footer>
			</Card>
		</Col>
	);
}

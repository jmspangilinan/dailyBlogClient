import { Row, Col, Card } from 'react-bootstrap';

export default function Highlights() {
	return(
		<Row className="mt-3 mb-3">
			<Col xs={12} md={4}>
				<Card className="cardHighlight p-3">
			      <Card.Body>
			        <Card.Title>
			        	<h2> Turning Point Part 1 </h2>
			        </Card.Title> 
			        <Card.Text>
			          The first taste of despire in terms of academics and soltitude.
			        </Card.Text>
			      </Card.Body>
			    </Card>
			</Col>
			<Col xs={12} md={4}>
				<Card className="cardHighlight p-3">
			      <Card.Body>
			        <Card.Title>
			        	<h2>Turning Point Part 2</h2>
			        </Card.Title> 
			        <Card.Text>
			         The desolation of finding out an ugly truth to the point of questioning reality.
			        </Card.Text>
			      </Card.Body>
			    </Card>
			</Col>
			<Col xs={12} md={4}>
				<Card className="cardHighlight p-3">
			      <Card.Body>
			        <Card.Title>
			        	<h2>Turning Point Part 3</h2>
			        </Card.Title> 
			        <Card.Text>
			          When everything turns upside down, no choice but to continue.
			        </Card.Text>
			      </Card.Body>
			    </Card>
			</Col>
		</Row>
	)
}
// import Button from 'react-bootstrap/Button';

// // Bootstrap Grid Banner 
// import Row from 'react-bootstrap/Row';
// import Col from 'react-bootstrap/Col';
import { Button, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function Banner({ data }) {
  return (
    <Row>
      <Col>
        <h1>{data.title}</h1>
        <p>{data.content}</p>
        <Link to={data.destination}>
          <Button variant="primary">{data.buttonLabel}</Button>
        </Link>
      </Col>
    </Row>
  );
}

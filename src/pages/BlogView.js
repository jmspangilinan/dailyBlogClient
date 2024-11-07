import { useState, useEffect, useContext } from 'react';
import { Container, Card, Button, Row, Col } from 'react-bootstrap';
import { useParams, useNavigate, Link } from 'react-router-dom';
import UserContext from '../context/UserContext';
import { Notyf } from 'notyf';

export default function BlogView() {
    const { blogId } = useParams();  // Renamed to blogId
    const { user } = useContext(UserContext);
    const navigate = useNavigate();
    const notyf = new Notyf();

    const [title, setTitle] = useState('');  // Changed from name to title
    const [content, setContent] = useState('');  // Changed from description to content
    const [price, setPrice] = useState(0);  // Assuming the blog has a price

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_BASE_URL}/blogs/specific/${blogId}`)
        .then(res => res.json())
        .then(data =>  {
            setTitle(data.title);
            setContent(data.content);
            setPrice(data.price);
        });
    }, [blogId]);

    function purchase(blogId) {  // Renamed enroll to purchase
        fetch(`${process.env.REACT_APP_API_BASE_URL}/users/purchase`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({
                purchasedBlogs: [{ blogId }],
                totalPrice: price
            })
        })
        .then(res => res.json())
        .then(data =>  {
            console.log(data);

            if(data.message === 'Admin is forbidden') {
                notyf.error('Admin Forbidden');
            } else if (data.message === 'Purchased successfully') {
                notyf.success('Purchase Successful');
                navigate('/blogs');
            } else {
                notyf.error('Internal Server Error. Notify System Admin');
            }
        });
    }

    return (
        <Row>
            <Col lg={{ span: 6, offset: 3 }}>
                <Card>
                    <Card.Body>
                        <Card.Title>{title}</Card.Title>
                        <Card.Subtitle>Content:</Card.Subtitle>
                        <Card.Text>{content}</Card.Text>
                        <Card.Subtitle>Price:</Card.Subtitle>
                        <Card.Text>PhP {price}</Card.Text>
                        {
                            user.id !== null ?
                                <Button variant="primary" onClick={() => purchase(blogId)} >Purchase</Button> :
                                <Link className="btn btn-danger" to="/login">Login</Link>
                        }
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    );
}

import { useState, useEffect, useContext } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import UserContext from '../context/UserContext';
import { Notyf } from 'notyf';

export default function AddBlog() {
    const { user } = useContext(UserContext);
    const navigate = useNavigate();
    const notyf = new Notyf();

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [author, setAuthor] = useState('');
    const [submitDisabled, setSubmitDisabled] = useState(true);

    useEffect(() => {
        if (user.id === null || !user.isAdmin) {
            navigate('/blogs');
        }
    }, [user, navigate]);

    useEffect(() => {
        if (title && content && author) {
            setSubmitDisabled(false);
        } else {
            setSubmitDisabled(true);
        }
    }, [title, content, author]);

    function addBlog(event) {
        event.preventDefault();

        if (!user.isAdmin) {
            notyf.error("You are not authorized to add blogs.");
            return;
        }

        fetch(`${process.env.REACT_APP_API_BASE_URL}/blogs/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({
                title,
                content,
                author
            })
        })
        .then(res => res.json())
        .then(data => {
            if (data.success) {
                notyf.success('Blog Added Successfully!');
                setTitle('');
                setContent('');
                setAuthor('');
                navigate('/blogs');
            } else {
                notyf.error(data.message || "Failed to create blog");
            }
        })
        .catch(error => notyf.error("An error occurred while adding the blog."));
    }

    return (
        <Row>
            <Col lg={{ span: 8, offset: 2 }}>
                <h1 className="text-center">Add New Blog</h1>
                <Form onSubmit={addBlog}>
                    <Form.Group controlId="formBlogTitle">
                        <Form.Label>Blog Title</Form.Label>
                        <Form.Control
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Enter title"
                        />
                    </Form.Group>
                    <Form.Group controlId="formBlogContent">
                        <Form.Label>Content</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={5}
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            placeholder="Enter content"
                        />
                    </Form.Group>
                    <Form.Group controlId="formBlogAuthor">
                        <Form.Label>Author</Form.Label>
                        <Form.Control
                            type="text"
                            value={author}
                            onChange={(e) => setAuthor(e.target.value)}
                            placeholder="Enter author name"
                        />
                    </Form.Group>
                    <Button
                        variant="primary"
                        type="submit"
                        disabled={submitDisabled}
                    >
                        Submit
                    </Button>
                </Form>
            </Col>
        </Row>
    );
}

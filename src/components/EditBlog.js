import { useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import { Notyf } from 'notyf';

export default function EditBlog({ blog, fetchData }) { // Updated component name and prop

	const notyf = new Notyf();

	const [blogId, setBlogId] = useState(blog._id); // Updated state name
	const [name, setName] = useState('');
	const [description, setDescription] = useState('');
	const [price, setPrice] = useState(0);

	const [showEdit, setShowEdit] = useState(false);

	const openEdit = () => {
		setShowEdit(true);
		setName(blog.name);
		setDescription(blog.description);
		setPrice(blog.price);
	};

	const closeEdit = () => {
		setShowEdit(false);
		setName('');
		setDescription('');
		setPrice(0);
	};

	const editBlog = (e, blogId) => { // Updated function name
		e.preventDefault();

		fetch(`${process.env.REACT_APP_API_BASE_URL}/blogs/${blogId}`, { // Updated URL
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${localStorage.getItem('token')}`
			},
			body: JSON.stringify({
				name,
				description,
				price
			})
		})
		.then(res => res.json())
		.then(data => {
			if (data.success === true) {
				notyf.success('Successfully Updated');
				closeEdit();
				fetchData();
			} else {
				notyf.error('Something went wrong');
				closeEdit();
				fetchData();
			}
		});
	};

	return (
		<>
			<Button variant="primary" size="sm" onClick={() => openEdit()}>Edit</Button>

			<Modal show={showEdit} onHide={closeEdit}>
				<Form onSubmit={e => editBlog(e, blogId)}> {/* Updated function call */}
					<Modal.Header closeButton>
						<Modal.Title>Edit Blog</Modal.Title> {/* Updated title */}
					</Modal.Header>

					<Modal.Body>
						<Form.Group controlId="blogName"> {/* Updated control ID */}
							<Form.Label>Name</Form.Label>
							<Form.Control type="text" required value={name} onChange={e => setName(e.target.value)} />
						</Form.Group>
						<Form.Group controlId="blogDesc"> {/* Updated control ID */}
							<Form.Label>Description</Form.Label>
							<Form.Control type="text" required value={description} onChange={e => setDescription(e.target.value)} />
						</Form.Group>
						<Form.Group controlId="blogPrice"> {/* Updated control ID */}
							<Form.Label>Price</Form.Label>
							<Form.Control type="number" required value={price} onChange={e => setPrice(e.target.value)} />
						</Form.Group>
					</Modal.Body>
					<Modal.Footer>
						<Button variant="secondary" onClick={closeEdit}>Close</Button> {/* Fixed the onClick function */}
						<Button variant="success" type="submit">Submit</Button>
					</Modal.Footer>
				</Form>
			</Modal>
		</>
	);
}

import { useState } from 'react';
import PropTypes from 'prop-types';
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function BlogCard({ blogProp }) {
    const { name, description, price, _id } = blogProp;

    return (
        <Card>
            <Card.Body>
                <Card.Title>{name}</Card.Title>
                <Card.Subtitle>Description:</Card.Subtitle>
                <Card.Text>{description}</Card.Text>
                <Card.Subtitle>Price:</Card.Subtitle>
                <Card.Text>PhP {price}</Card.Text>

                <Link className="btn btn-primary" to={`/blogs/${_id}`}>Details</Link>
            </Card.Body>
        </Card>
    );
}

// Check if the BlogCard component is getting the correct prop types
BlogCard.propTypes = {
    // The "shape" method is used to check if a prop object conforms to a specific "shape"
    blogProp: PropTypes.shape({
        // Define the properties and their expected types
        name: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired
    })
};

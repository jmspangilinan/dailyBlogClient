import { useState } from 'react';
import PropTypes from 'prop-types';
import { Card, Button } from 'react-bootstrap';

export default function NewsCard({ newsProp }) {

    const {name, description} = newsProp;
    const [likes, setLikes] = useState(0);


    const likeNews = () => {
        if (likes < 10) {
            setLikes(likes + 1);
        } else {
            alert("Promo Alert: Since this news has reached a certain number of likes, we would like to offer a discount on your next class.");
        }
    };

    return (
        <Card className="mt-3 mb-3 text-center">
            <Card.Body>
                <Card.Title>{name}</Card.Title>
                <Card.Text>{description}</Card.Text>
                <Card.Subtitle className="mb-3">Likes: {likes}</Card.Subtitle>
            
                <Button variant="primary" onClick={likeNews}>Like</Button>
            </Card.Body>
        </Card>
    );
}

NewsCard.propTypes = {
    newsProp: PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        isActive: PropTypes.bool.isRequired
    })
};

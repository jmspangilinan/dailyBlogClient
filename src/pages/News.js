import { useState, useEffect, useContext } from 'react';
import newsData from '../data/newsData';
import NewsCard from '../components/NewsCard';
import { Form, Button } from 'react-bootstrap';
import UserContext from '../context/UserContext'; 

import { Notyf } from 'notyf';

export default function News() {

    const notyf = new Notyf();


    const { user } = useContext(UserContext); 

    const [news, setNews] = useState([]);
   
    const [email, setEmail] = useState('');
    const [feedback, setFeedback] = useState('');
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);

    useEffect(() => {
        if (email.trim() !== '' && feedback.trim() !== '') {
            setIsButtonDisabled(false);
        } else {
            setIsButtonDisabled(true);
        }
    }, [email, feedback]);

    useEffect(() => {

        //get all active news
        fetch(`${process.env.REACT_APP_API_BASE_URL}/news/`)
        .then(res => res.json())
        .then(data => {
            
            console.log(data);

            setNews(data.map(news => {
                return (
                    <NewsCard key={news._id} newsProp={news}/>
                );
            }));

        });

    }, []);


    const sendFeedback = (e) => {
        e.preventDefault();
        alert("Thank you for your feedback.");
        setEmail('');
        setFeedback('');
        setIsButtonDisabled(true);
    };

    // const news = newsData.map((newsItem) => (
    //     <NewsCard key={newsItem.id} newsProp={newsItem} />
    // ));

    return (
        <>
            <h1>News</h1>
            {news}

           
            {user.id !== null && (
                <Form onSubmit={sendFeedback}>
                    <h1 className="my-5 text-center">Feedback Form</h1>
                    <Form.Group>
                        <Form.Label>Email:</Form.Label>
                        <Form.Control type="email" placeholder="Enter your email" required value={email} onChange={e => setEmail(e.target.value)} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Feedback:</Form.Label>
                        <Form.Control as="textarea" placeholder="Enter your feedback" required value={feedback} onChange={e => setFeedback(e.target.value)} />
                    </Form.Group>
                    <Button variant={isButtonDisabled ? "danger" : "primary"} type="submit" disabled={isButtonDisabled}>
                        Send Feedback
                    </Button>
                </Form>
            )}
        </>
    );
}

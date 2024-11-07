import { useState, useEffect, useContext } from 'react';
// import blogsData from '../data/blogsData';
import BlogCard from '../components/BlogCard';
import UserContext from '../context/UserContext';
import AdminView from '../components/AdminView';
import UserView from '../components/UserView';

export default function Blogs() {

    const { user } = useContext(UserContext);
    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        let fetchURL = user.isAdmin ? `${process.env.REACT_APP_API_BASE_URL}/blogs/all` : `${process.env.REACT_APP_API_BASE_URL}/blogs/`;

        fetch(fetchURL, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        })
        .then(res => res.json())
        .then(data => {
            setBlogs(data); 
        });
    }, []);

    const fetchData = () => {
        let fetchURL = user.isAdmin ? `${process.env.REACT_APP_API_BASE_URL}/blogs/all` : `${process.env.REACT_APP_API_BASE_URL}/blogs`;

        fetch(fetchURL, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        })
        .then(res => res.json())
        .then(data => {
            setBlogs(data); 
        });
    };

    useEffect(() => {
        fetchData();
    }, []);
    
    return (
        <>    
            {user.isAdmin ? (
                <AdminView blogsData={blogs} fetchData={fetchData} />
            ) : (
                <UserView blogsData={blogs} />
            )}
        </>
    );
}

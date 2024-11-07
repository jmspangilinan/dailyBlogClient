import './App.css';
import { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { UserProvider } from './context/UserContext';

// Import components
import AppNavbar from './components/AppNavBar';
import Home from './pages/Home';
import Blog from './pages/Blog';          
import News from './pages/News';
import Register from './pages/Register';
import Login from './pages/Login';
import Logout from './pages/Logout';
import Error from './pages/Error';
import Profile from './pages/Profile';
import BlogView from './pages/BlogView';   
import AddBlog from './pages/AddBlog';     

function App() {
  const [user, setUser] = useState({
    id: null,
    isAdmin: null
  });

  function unsetUser() {
    localStorage.clear();
  }

  useEffect(() => {
    console.log(user);
    console.log(localStorage);
  }, [user]);

  useEffect(() => {
    if (localStorage.getItem("token") !== null) {
      fetch(`${process.env.REACT_APP_API_BASE_URL}/users/details`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      })
        .then(res => res.json())
        .then(data => {
          setUser({
            id: data._id,
            isAdmin: data.isAdmin
          });
        });
    } else {
      setUser({
        id: null,
        isAdmin: null
      });
    }
  }, []);

  return (
    <UserProvider value={{ user, setUser, unsetUser }}>
      <Router>
        <AppNavbar />
        <Container>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/blog" element={<Blog />} />               
            <Route path="/blog/:blogId" element={<BlogView />} />    
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/news" element={<News />} />
            <Route path="/addBlog" element={<AddBlog />} />         
            <Route path="*" element={<Error />} />  {/* Catch-all route */}
          </Routes>
        </Container>
      </Router>
    </UserProvider>
  );
}

export default App;

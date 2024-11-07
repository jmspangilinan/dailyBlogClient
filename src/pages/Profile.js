import { useState, useEffect, useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import UserContext from '../context/UserContext';
import ResetPassword from '../components/ResetPassword';

export default function Profile() {
  const { user } = useContext(UserContext);
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user.id === null) {
      setLoading(false);
      return;
    }

    fetch(`${process.env.REACT_APP_API_BASE_URL}/users/details`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    })
      .then(res => {
        if (res.status === 404) {
          throw new Error("User not found.");
        } else if (!res.ok) {
          throw new Error("Something went wrong, kindly contact us for assistance.");
        }
        return res.json();
      })
      .then(data => {
        setDetails(data);
        setLoading(false);
      });
  }, [user]);

  if (user.id === null) {
    return <Navigate to="/blogs" />; // Redirect to blogs instead of courses
  }
  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <Row>
        <Col className="bg-primary text-white min-vh-50 w-60">
          <Row className="ms-4">
            <Col md={6}>
              <h2 className="my-4">Profile</h2>
              {details ? (
                <div>
                  <h3>
                    {details.firstName} {details.lastName}
                  </h3>
                  <hr className="my-2" />
                  <h5>Contacts:</h5>
                  <ul>
                    <li>Email: {details.email}</li>
                    <li>Mobile Number: {details.mobileNo}</li>
                  </ul>
                </div>
              ) : (
                <p>Loading user details...</p>
              )}
            </Col>
          </Row>
        </Col>
      </Row>

      <Row className="pt-4 mt-4">
        <Col>
          <ResetPassword />
        </Col>
      </Row>
    </>
  );
}

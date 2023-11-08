import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Login.css'; 

const LoginForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = 'Email is required';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const response = await axios.post('https://cd-15springbackend.onrender.com/auth/login/', formData);
      
      if (response.status === 200) {

        sessionStorage.setItem("AuthToken",response.data.authToken);
        navigate('/home');
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setApiError('User not found');
        navigate('/signup');
      } else {
        setApiError('Wrong Password');
      }
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      {apiError && <div className="api-error">{apiError}</div>}
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="email"
            placeholder="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          <span className="error">{errors.email}</span>
        </div>
        <div>
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
          <span className="error">{errors.password}</span>
        </div>
        <button type="submit">Login</button>
        <button onClick={(e)=>{
          e.preventDefault()
          navigate("/signup")
        }}>SignUp</button>
      </form>
    </div>
  );
};

export default LoginForm;

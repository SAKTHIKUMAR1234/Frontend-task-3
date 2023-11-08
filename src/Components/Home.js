import React, { useEffect, useState } from 'react';
import './Home.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

const IndexForm = ({ user, products }) => {
  const [isUserDetailsVisible, setIsUserDetailsVisible] = useState(false);

  const nav = useNavigate();

  const [query, setQuery] = useState('');
  const [searchedProducts, setSearchedProducts] = useState([]);

  useEffect(() => {
    setSearchedProducts(products)
  }, [products])

  const handleSearch = () => {
    const results = products.filter((product) =>
      product.name.toLowerCase().includes(query.toLowerCase())
    );
    setSearchedProducts(results);
  };

  const addToCart = (productId) => {


    axios.get(`https://cd-15springbackend.onrender.com/cart/add/${productId}`, {
      headers: {
        "Authorization": 'Bearer ' + sessionStorage.getItem("AuthToken")
      }
    }).then(response => {
      Swal.fire(
        {
          icon: "success",
          text: response.data,
          confirmButtonColor: "green"
        }
      )
    }).catch(err => {
      Swal.fire(
        {
          icon: "error",
          text: err.data,
          confirmButtonColor: "red"
        }
      )
    })

  };

  const toggleUserDetails = () => {
    setIsUserDetailsVisible(!isUserDetailsVisible);
  };

  return (
    <div className="index-container">
      <nav className="navbar">
        <div className="left-section">
          <span className="app-name">EcommerceWebsite</span>
          <input type="text" placeholder="Search products" className="search-box" value={query} onChange={(e) => {
            setQuery(e.target.value)
          }} />
          <button className="search-button" onClick={() => {
            handleSearch()
          }}>Search</button>
        </div>
        <div className="right-section">
          <div className="user-info" onMouseEnter={toggleUserDetails} onMouseLeave={toggleUserDetails}>
            <span className="username">{user.name}</span>
            {isUserDetailsVisible && (
              <div className="user-details">
                <p>Name: {user.name}</p>
                <p>Email: {user.email}</p>
                <p>Phone Number: {user.phoneNumber}</p>
              </div>
            )}
          </div>
          <button className="cart-button" onClick={() => {
            nav("/cart")
          }}>Cart</button>

          <button className='cart-button'
          onClick={()=>{
            nav("/history")
          }}
          >History</button>
        </div>
      </nav>
      <h2>Welcome, {user.name}</h2>

      <p>Available Products:</p>
      <div className="products">
        {searchedProducts.map((product) => (
          <div key={product.id} className="product">
            <div className="product-info">
              <h3>{product.name}</h3>
              <p>Description: {product.description}</p>
              <p>Price: Rupees {product.price}</p>
            </div>
            <div className="product-image">
              <img src={"https://cd-15springbackend.onrender.com/static/" + product.imageSrc} alt={product.name} />
            </div>
            <button onClick={() => addToCart(product.id)} className="add-to-cart-button">
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default IndexForm;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./ShippingForm.css"
import axios from 'axios';
import Swal from 'sweetalert2';


const ShippingForm = () => {
  const [shippingAddress, setShippingAddress] = useState('');
  const navigate = useNavigate();


  const handlePlaceOrder = () => {
    axios.get("http://localhost:8000/order/placeOrder/"+shippingAddress, {
      headers: {
        "Authorization": 'Bearer ' + sessionStorage.getItem("AuthToken")
      }
    }).then(response=>{
      Swal.fire({
        icon:"success",
        text:response.data
      }).then(()=>{
        navigate("/home")
      })
    }).catch(err=>{
      Swal.fire({
        icon:"error",
        text:"Could not complete your order"
      })
    })
  }


  const handleProceedToHome = () => {
    navigate('/home');
  };

  return (
    <div className="shipping-container">
      <h2>Shipping Information</h2>
      <div className="shipping-form">
        <textarea
          type="text"
          placeholder="Enter your shipping address"
          value={shippingAddress}
          onChange={(e) => setShippingAddress(e.target.value)}
        />
        <br></br>
        <button className='button' onClick={() => {
          handlePlaceOrder()
        }}>Confirm</button>
        <button onClick={handleProceedToHome} className='button'>Proceed to Home</button>
      </div>
    </div>
  );
};

export default ShippingForm;

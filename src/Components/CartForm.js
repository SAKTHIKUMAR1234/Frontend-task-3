import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import "./CartForm.css"
import Swal from 'sweetalert2'

const CartForm = () => {
  const [cartProducts, setCartProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getCartProducts()
  }, []);


  const getCartProducts=async ()=>{
    axios.get('http://localhost:8000/cart/getAllProducts/', {
      headers: {
        "Authorization": 'Bearer ' + sessionStorage.getItem("AuthToken")
      }
    }).then((response) => {
      setCartProducts(response.data);
    });
  }


  const handleRemove = (productId) => {
    axios.get(`http://localhost:8000/cart/remove/${productId}`, {
      headers: {
        "Authorization": 'Bearer ' + sessionStorage.getItem("AuthToken")
      }
    }).then(response => {
      Swal.fire(
        {
          icon:"success",
          text:response.data,
          confirmButtonColor:"green"
        }
      ).then(()=>getCartProducts())
    
    }).catch(err => {
      Swal.fire(
        {
          icon:"error",
          title:"Oops",
          text:err.data,
          confirmButtonColor:"red"
        }
      ).then(()=>getCartProducts())
    })
  }

  const handleProceedToBuy = () => {
    if(cartProducts.length===0){
      Swal.fire(
        {
          icon:"info",
          text:"Your Cart Is Empty",
          confirmButtonColor:"#ff6600"
        }
      ).then(()=>{
        navigate("/home")
      })
    }
    else{
      navigate('/shipping');
    }
  };

  return (
    <div className="cart-container">
      <div className='cart-head'>
        <div>
          <p className='Title'>Cart</p>
        </div>
        <div>
          <button className='button' onClick={() => {
            navigate("/home")
          }}>
            Home
          </button>
        </div>
        <div>
          <button className='button' onClick={handleProceedToBuy}>Proceed to Buy</button>
        </div>
      </div>
      <div className="cart-products">
        {cartProducts.map((product) => (
          <div key={product.id} className="cart-product">
            <img src={"http://localhost:8000/static/" + product.imageSrc} alt={product.name} />
            <h3>{product.name}</h3>
            <p>Price:{product.price}</p>
            <p>{product.description}</p>
            <button onClick={() => {
              handleRemove(product.id)
            }}>Remove</button>
          </div>

        ))}
      </div>

    </div>
  );
};

export default CartForm;

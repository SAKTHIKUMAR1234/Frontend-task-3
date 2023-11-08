import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Home from '../Components/Home';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const [userData, setUserData] = useState({});
  const [products, setProducts] = useState([]);
  const nav = useNavigate()

  useEffect(() => {

    if(sessionStorage.getItem("AuthToken")===null){
      nav("/");
      return;
    }

    axios.get('http://localhost:8000/customer/getData/',{
      headers:{
        "Authorization":'Bearer '+sessionStorage.getItem("AuthToken")
      }
    }).then((response) => {
      setUserData(response.data);
    }).catch(err=>{
      console.log(err)
      nav("/")
    });
    axios.get('http://localhost:8000/customer/getProducts/',{
      headers:{
        "Authorization":'Bearer '+sessionStorage.getItem("AuthToken")
      }
    }).then((response) => {
      setProducts(response.data);
    }).catch(err=>{
      console.log(err)
      nav("/")
    });
  }, []);

  return (
    <div>
      <Home user={userData} products={products} />
    </div>
  );
};

export default Index;

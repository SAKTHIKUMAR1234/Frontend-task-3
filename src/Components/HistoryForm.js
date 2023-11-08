import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2'
import "./HistoryForm.css"


const HistoryForm = () => {


    const [historyData, SetHistoryData] = useState([]);
    const navigate =useNavigate()


    useEffect(() => {
        getHistory()
    }, [])

    const getHistory = () => {
        axios.get(`http://localhost:8000/order/getHistory/`, {
            headers: {
                "Authorization": 'Bearer ' + sessionStorage.getItem("AuthToken")
            }
        }).then((response)=>{
            SetHistoryData(response.data)
        }).catch(err=>{
            Swal.fire({
                icon:"error",
                text:err.data
            })
        })
    }

    return (
        <div>
            <div className='history-head'>
                <div>
                    <p className='Title'>History</p>
                </div>
                <div>
                    <button className='button' onClick={() => {
                        navigate("/home")
                    }}>
                        Home
                    </button>
                </div>
            </div>
            <div className='Histories'>
                {historyData.map((history, index) => (
                    <div className='history' id={index}>
                        <h3>S No:{index+1}</h3>
                        {history.productsList.map((products, i) => (
                            <div className='mini-card' id={i}>
                                <p>{products.name}</p>
                                <img src={"http://localhost:8000/static/" + products.imageSrc} />
                            </div>
                        ))}
                        <br></br>
                        <p>address:{history.address}</p>

                    </div>
                )
                )}
            </div>
        </div>
    );


}

export default HistoryForm;
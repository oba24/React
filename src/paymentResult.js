import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function PaymentResult() {
    const [ paymentResult, setPaymentResult ] = useState(''); 
    const urlParams = new URLSearchParams(window.location.search);
    const paymentId = urlParams.get('paymentId');

    const data = {
            key: paymentId,
            KeyType: 'paymentId'
    };
    
    axios.post('http://localhost:5000/api/getPaymentStatus', {
        data: data
    },
    {
        headers: {
        'Content-Type': 'application/json',
        },
    })
    .then(res => {
        if (res.status == 200)
        {
            console.log(res.status,'===')
            var isSuccess = res.data.data.IsSuccess;
            if (isSuccess == true)
                setPaymentResult('Success Payment');
            else
                setPaymentResult('Failed Payment');
        }
    })

    return (
        <div className="App">
        <h1>Payment Result</h1>
        <p>{paymentResult}</p>
        </div>
    );
}

export default PaymentResult;
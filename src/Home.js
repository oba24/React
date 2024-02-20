import logo from './logo.svg';
import './App.css';
import {Form, Button} from 'react-bootstrap';
import React, { useState, useRef } from 'react';
import axios from 'axios';

function Home() {
  const formRef = useRef(null);
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(formRef.current);
    const values = Object.fromEntries(formData.entries());
    const token = 'rLtt6JWvbUHDDhsZnfpAhpYk4dxYDQkbcPTyGaKp2TYqQgG7FGZ5Th_WD53Oq8Ebz6A53njUoo1w3pjU1D4vs_ZMqFiz_j0urb_BH9Oq9VZoKFoJEDAbRZepGcQanImyYrry7Kt6MnMdgfG5jn4HngWoRdKduNNyP4kzcp3mRv7x00ahkm9LAK7ZRieg7k1PDAnBIOG3EyVSJ5kK4WLMvYr7sCwHbHcu4A5WwelxYK0GMJy37bNAarSJDFQsJ2ZvJjvMDmfWwDVFEVe_5tOomfVNt6bOg9mexbGjMrnHBnKnZR1vQbBtQieDlQepzTZMuQrSuKn-t5XZM7V6fCW7oP-uXGX-sMOajeX65JOf6XVpk29DP6ro8WTAflCDANC193yof8-f5_EYY-3hXhJj7RBXmizDpneEQDSaSz5sFk0sV5qPcARJ9zGG73vuGFyenjPPmtDtXtpx35A-BVcOSBYVIWe9kndG3nclfefjKEuZ3m4jL9Gg1h2JBvmXSMYiZtp9MR5I6pvbvylU_PP5xJFSjVTIz7IQSjcVGO41npnwIxRXNRxFOdIUHn0tjQ-7LwvEcTXyPsHXcMD8WtgBh-wxR8aKX7WPSsT1O8d8reb2aR7K3rkV3K82K_0OgawImEpwSvp9MNKynEAJQS6ZHe_J_l77652xwPNxMRTMASk1ZsJL';
    const baseURL = 'https://apitest.myfatoorah.com';
    const options = {
      method: 'POST',
      url: baseURL + '/v2/SendPayment',
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS"
      },
    };

    const data = {
      NotificationOption: "Lnk",
      CustomerName: "test",
      DisplayCurrencyIso: 'KWD',
      MobileCountryCode: '+965',
      CustomerMobile: values.phoneNumber,
      CustomerEmail:values.email,
      InvoiceValue: parseFloat(values.price) * parseFloat(values.quantity),
      CallBackUrl: 'http://localhost:3002/paymentStatus',
      ErrorUrl: 'http://localhost:3002/paymentStatus',
      Language: 'en',
      InvoiceItems: [{
        ItemName: values.productName,
        Quantity: values.quantity,
        UnitPrice: values.price
      }]
    };

    axios.post('http://localhost:5000/api/sendPayment', data, { headers: options.headers })
    .then(r => {
      if (r.status == 200)
      {
        if (r.data.data.IsSuccess)
        { 
          var InvoiceURL = r.data.data.Data.InvoiceURL;
          window.location.replace(InvoiceURL)
        }
      }
    })
    .catch(error => {
    });

  }

  return (
    <div className="App">
        <div>
            <h1>Payment Form Example</h1>
            <Form className='form' onSubmit={handleSubmit} ref={formRef}>
              <Form.Group controlId='name'>
                <Form.Label>Name:</Form.Label>
                <Form.Control type='text' name='name' />
              </Form.Group>

              <Form.Group controlId='email'>
                <Form.Label>Email:</Form.Label>
                <Form.Control type='email' name='email' />
              </Form.Group>

              <Form.Group controlId='productNumber'>
                <Form.Label>Phone Number:</Form.Label>
                <Form.Control type='text' name='productNumber' />
              </Form.Group>

              <Form.Group controlId='productName'>
                <Form.Label>Product Name:</Form.Label>
                <Form.Control type='text' name='productName' />
              </Form.Group>

              <Form.Group controlId='quantity'>
                <Form.Label>Quantity:</Form.Label>
                <Form.Control type='text' name='quantity' />
              </Form.Group>

              <Form.Group controlId='price'>
                <Form.Label>Price:</Form.Label>
                <Form.Control type='text' name='price' />
              </Form.Group>

              <Button type='submit'>Pay Now</Button>
            </Form>
        </div>
    </div>
  );
}

export default Home;

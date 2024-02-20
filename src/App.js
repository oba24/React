import logo from './logo.svg';
import './App.css';
import PaymentResult from './paymentResult';
import Home from './Home';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/paymentStatus" element={<PaymentResult />} />
      </Routes>
    </Router>
  );
}

export default App;

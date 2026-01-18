import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/user/LandingPage';
import ListingPage from './pages/user/listing';
import OrderPage from './pages/user/order';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/listing" element={<ListingPage />} />
        <Route path="/order" element={<OrderPage />} />
      </Routes>
    </Router>
  );
}

export default App;

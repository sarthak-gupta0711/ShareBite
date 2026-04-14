import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import RegisterCustomer from './pages/RegisterCustomer';
import RegisterSeller from './pages/RegisterSeller';
import FoodList from './pages/FoodList';
import Dashboard from './pages/Dashboard';
import RecipeGenerator from './pages/RecipeGenerator';

function App() {
  return (
    <Router>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register-customer" element={<RegisterCustomer />} />
          <Route path="/register-seller" element={<RegisterSeller />} />
          <Route path="/food-list" element={<FoodList />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/recipes" element={<RecipeGenerator />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const RegisterCustomer = () => {
  const [formData, setFormData] = useState({
    name: '', email: '', password: '', confirm_password: '', phone: '', address: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const submitHandler = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirm_password) {
      return setError('Passwords do not match');
    }
    
    try {
      const res = await fetch('http://localhost:5001/api/auth/register_customer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      
      if (res.ok) {
        localStorage.setItem('userInfo', JSON.stringify(data));
        navigate('/food-list');
      } else {
        setError(data.message || 'Registration failed');
      }
    } catch (err) {
      console.error(err);
      setError('Server error');
    }
  };

  return (
    <div className="container animate-fade-in" style={{ display: 'flex', justifyContent: 'center', padding: '4rem 0' }}>
      <div className="glass-card" style={{ padding: '3rem', width: '100%', maxWidth: '500px' }}>
        <h2 className="heading-lg" style={{ textAlign: 'center', marginBottom: '2rem' }}>Join as Consumer</h2>
        
        {error && <div style={{ background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', padding: '1rem', borderRadius: 'var(--radius-md)', marginBottom: '1.5rem' }}>{error}</div>}
        
        <form onSubmit={submitHandler}>
          <div className="form-group"><label className="form-label">Full Name</label><input type="text" name="name" className="form-control" required onChange={handleChange} /></div>
          <div className="form-group"><label className="form-label">Email</label><input type="email" name="email" className="form-control" required onChange={handleChange} /></div>
          <div className="form-group"><label className="form-label">Phone</label><input type="text" name="phone" className="form-control" required onChange={handleChange} /></div>
          <div className="form-group"><label className="form-label">Shipping Address</label><input type="text" name="address" className="form-control" required onChange={handleChange} /></div>
          <div className="form-group"><label className="form-label">Password</label><input type="password" name="password" className="form-control" required onChange={handleChange} /></div>
          <div className="form-group"><label className="form-label">Confirm Password</label><input type="password" name="confirm_password" className="form-control" required onChange={handleChange} /></div>
          
          <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '1rem' }}>Register</button>
        </form>
        <p style={{ textAlign: 'center', marginTop: '2rem', color: 'var(--color-text-muted)' }}>
          Want to sell food instead? <Link to="/register-seller" style={{ color: 'var(--color-secondary)' }}>Seller Signup</Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterCustomer;

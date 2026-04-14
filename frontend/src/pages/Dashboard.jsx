import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [formData, setFormData] = useState({
    'food-name': '', description: '', price: '', freshness: '', city: ''
  });
  const [image, setImage] = useState(null);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('userInfo'));

  useEffect(() => {
    if (!user || user.user_type !== 'seller') {
      navigate('/login');
    }
  }, [user, navigate]);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  
  const submitHandler = async (e) => {
    e.preventDefault();
    const data = new FormData();
    for (const key in formData) {
        if(key === 'food-name') data.append('food_name', formData[key]);
        else data.append(key, formData[key]);
    }
    data.append('seller_id', user._id);
    if (image) data.append('food-image', image);

    try {
      const res = await fetch('http://localhost:5000/api/listings', {
        method: 'POST',
        body: data
      });
      if (res.ok) {
        alert('Listing Added Successfully!');
        navigate('/food-list');
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (!user) return null;

  return (
    <div className="container animate-fade-in" style={{ padding: '4rem 0' }}>
      <div className="glass-card" style={{ padding: '3rem', maxWidth: '600px', margin: '0 auto' }}>
        <h2 className="heading-lg" style={{ marginBottom: '2rem', textAlign: 'center' }}>Seller Dashboard</h2>
        <p style={{ color: 'var(--color-text-muted)', marginBottom: '2rem', textAlign: 'center' }}>Welcome, {user.name}. Add a new leftover food listing below.</p>
        
        <form onSubmit={submitHandler} encType="multipart/form-data">
          <div className="form-group">
            <label className="form-label">Food Name</label>
            <input type="text" name="food-name" className="form-control" onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label className="form-label">Description</label>
            <textarea name="description" className="form-control" rows="3" onChange={handleChange} required></textarea>
          </div>
          <div className="grid-cols-2">
            <div className="form-group">
              <label className="form-label">Price ($)</label>
              <input type="number" step="0.01" name="price" className="form-control" onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label className="form-label">Freshness / Shelf Life</label>
              <input type="text" name="freshness" placeholder="e.g. 2 days" className="form-control" onChange={handleChange} required />
            </div>
          </div>
          <div className="form-group">
            <label className="form-label">City</label>
            <input type="text" name="city" className="form-control" onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label className="form-label">Image Upload (Max 24hrs expiration by default)</label>
            <input type="file" name="food-image" className="form-control" accept="image/*" onChange={(e) => setImage(e.target.files[0])} />
          </div>

          <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '1rem' }}>Create Listing</button>
        </form>
      </div>
    </div>
  );
};

export default Dashboard;

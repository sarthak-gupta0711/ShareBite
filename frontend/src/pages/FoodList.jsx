import React, { useState, useEffect } from 'react';
import { Clock, MapPin, DollarSign, Image as ImageIcon } from 'lucide-react';

const FoodList = () => {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const res = await fetch('http://localhost:5001/api/listings');
        const data = await res.json();
        setListings(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchListings();
  }, []);

  return (
    <div className="container animate-fade-in" style={{ padding: '4rem 0' }}>
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h2 className="heading-lg">Available <span className="text-gradient">Food Listings</span></h2>
        <p style={{ color: 'var(--color-text-muted)', marginTop: '0.5rem' }}>Rescue delicious food before it's gone!</p>
      </div>

      {loading ? (
        <div style={{ textAlign: 'center' }}>Loading...</div>
      ) : (
        <div className="grid-cols-3">
          {listings.length === 0 ? (
            <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '3rem', background: 'var(--color-surface-1)', borderRadius: 'var(--radius-lg)' }}>
              No food listings available at the moment. Check back soon!
            </div>
          ) : (
            listings.map((item) => (
              <div key={item._id} className="glass-card delay-100" style={{ overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                <div style={{ height: '200px', backgroundColor: 'rgba(0,0,0,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {item.picture_url ? (
                    <img src={`http://localhost:5001/${item.picture_url}`} alt={item.food_name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  ) : (
                    <ImageIcon size={48} color="var(--color-text-muted)" />
                  )}
                </div>
                <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                    <h3 className="heading-md" style={{ fontSize: '1.25rem' }}>{item.food_name}</h3>
                    <span style={{ background: 'rgba(16,185,129,0.1)', color: 'var(--color-primary)', padding: '0.25rem 0.5rem', borderRadius: 'var(--radius-sm)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                      <DollarSign size={14} />{item.price}
                    </span>
                  </div>
                  
                  <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', marginBottom: '1.5rem', flex: 1 }}>{item.description}</p>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.85rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#f59e0b' }}>
                      <Clock size={16} /> Expires in: {item.expires_in}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-text-muted)' }}>
                      <MapPin size={16} /> {item.city}
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default FoodList;

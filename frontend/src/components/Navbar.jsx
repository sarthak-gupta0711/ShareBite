import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Leaf, LogOut, User } from 'lucide-react';

const Navbar = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('userInfo'));

  const logoutHandler = () => {
    localStorage.removeItem('userInfo');
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="container">
        <Link to="/" className="text-gradient heading-md" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Leaf color="var(--color-primary)" />
          EcoEats
        </Link>
        
        <ul className="nav-links">
          <li><Link to="/food-list" className="nav-link">Food Listings</Link></li>
          <li><Link to="/recipes" className="nav-link">Recipes</Link></li>
          
          {user ? (
            <>
              {user.user_type === 'seller' && (
                <li><Link to="/dashboard" className="nav-link">Dashboard</Link></li>
              )}
              <li>
                <button onClick={logoutHandler} className="btn btn-secondary" style={{ padding: '0.4rem 1rem' }}>
                  <LogOut size={16} /> Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li><Link to="/login" className="nav-link">Login</Link></li>
              <li><Link to="/register-customer" className="btn btn-primary">Sign Up</Link></li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;

import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Leaf, Shield, Heart } from 'lucide-react';

const Home = () => {
  return (
    <div className="home-page animate-fade-in">
      <section className="container" style={{ padding: '6rem 1.5rem', textAlign: 'center' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h1 className="heading-xl" style={{ marginBottom: '1.5rem' }}>
            Don't let good food <br />
            <span className="text-gradient">go to waste.</span>
          </h1>
          <p className="heading-md" style={{ color: 'var(--color-text-muted)', marginBottom: '3rem', fontWeight: 400, fontSize: '1.25rem' }}>
            EcoEats connects food sellers with surplus ingredients to eco-conscious consumers. Save money, save the planet.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            <Link to="/food-list" className="btn btn-primary">
              Find Food Near You <ArrowRight size={20} />
            </Link>
            <Link to="/register-seller" className="btn btn-secondary">
              Become a Seller
            </Link>
          </div>
        </div>
      </section>

      <section className="container" style={{ padding: '4rem 1.5rem' }}>
        <div className="grid-cols-3">
          <div className="glass-card" style={{ padding: '2rem', textAlign: 'center' }}>
            <div style={{ background: 'rgba(16,185,129,0.1)', width: '64px', height: '64px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
              <Leaf color="var(--color-primary)" size={32} />
            </div>
            <h3 className="heading-md" style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Sustainable</h3>
            <p style={{ color: 'var(--color-text-muted)' }}>Help reduce carbon footprint by giving leftover food a second chance.</p>
          </div>
          <div className="glass-card delay-100" style={{ padding: '2rem', textAlign: 'center' }}>
            <div style={{ background: 'rgba(59,130,246,0.1)', width: '64px', height: '64px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
              <Heart color="var(--color-secondary)" size={32} />
            </div>
            <h3 className="heading-md" style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Community Driven</h3>
            <p style={{ color: 'var(--color-text-muted)' }}>Connect with local businesses and neighbors to share resources.</p>
          </div>
          <div className="glass-card delay-200" style={{ padding: '2rem', textAlign: 'center' }}>
            <div style={{ background: 'rgba(245,158,11,0.1)', width: '64px', height: '64px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
              <Shield color="var(--color-accent)" size={32} />
            </div>
            <h3 className="heading-md" style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Secure & Safe</h3>
            <p style={{ color: 'var(--color-text-muted)' }}>Trusted local partners and secure platform for all your transactions.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;

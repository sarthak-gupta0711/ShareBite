import React, { useState, useEffect } from 'react';
import { Search, ChefHat } from 'lucide-react';

const RecipeGenerator = () => {
  const [leftover, setLeftover] = useState('');
  const [recipe, setRecipe] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [allRecipes, setAllRecipes] = useState([]);

  useEffect(() => {
    // Optionally fetch all known ingredients to give suggestions
    const fetchAll = async () => {
        try {
            const res = await fetch('http://localhost:5000/api/recipes');
            const data = await res.json();
            setAllRecipes(data.map(r => r.leftover));
        } catch (err) {}
    }
    fetchAll();
  }, []);

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setRecipe('');

    try {
      const res = await fetch('http://localhost:5000/api/recipes/find', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ leftover })
      });
      const data = await res.json();
      if (res.ok) {
        setRecipe(data.recipe);
      } else {
        setError(data.error || 'Recipe not found');
      }
    } catch (err) {
      setError('Failed to fetch recipe.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container animate-fade-in" style={{ padding: '4rem 0', minHeight: '80vh', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(245, 158, 11, 0.1)', width: '80px', height: '80px', borderRadius: '50%', marginBottom: '1.5rem' }}>
          <ChefHat size={40} color="var(--color-accent)" />
        </div>
        <h2 className="heading-lg">Leftover <span className="text-gradient">Recipe Generator</span></h2>
        <p style={{ color: 'var(--color-text-muted)', marginTop: '0.5rem', maxWidth: '600px', margin: '0.5rem auto 0' }}>
          Got randomly assorted ingredients leftover? Type an ingredient below and our engine will figure out a delicious dish for you.
        </p>
      </div>

      <div className="glass-card" style={{ padding: '2rem', width: '100%', maxWidth: '700px' }}>
        <form onSubmit={submitHandler} style={{ display: 'flex', gap: '1rem', position: 'relative' }}>
          <div style={{ flex: 1, position: 'relative' }}>
            <Search style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-muted)' }} size={20} />
            <input 
              type="text" 
              className="form-control" 
              style={{ paddingLeft: '3rem', fontSize: '1.1rem' }}
              value={leftover}
              onChange={(e) => setLeftover(e.target.value)}
              placeholder="e.g. Tomatoes, Potato, Rice..."
              required
            />
          </div>
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? 'Finding...' : 'Generate'}
          </button>
        </form>

        {(recipe || error) && (
            <div className="animate-fade-in" style={{ marginTop: '2rem', padding: '2rem', borderTop: '1px solid var(--color-border)' }}>
            {error ? (
                <div style={{ color: '#ef4444', textAlign: 'center' }}>{error} - Try another ingredient!</div>
            ) : (
                <div>
                <h3 className="heading-md" style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-primary)' }}>
                    <ChefHat size={24} /> Recommended Recipe
                </h3>
                <p style={{ fontSize: '1.1rem', lineHeight: '1.8', color: 'var(--color-text-main)', whiteSpace: 'pre-wrap' }}>
                    {recipe}
                </p>
                </div>
            )}
            </div>
        )}
      </div>
      
      {allRecipes.length > 0 && (
          <div style={{ marginTop: '3rem', textAlign: 'center' }}>
              <p style={{ color: 'var(--color-text-muted)', marginBottom: '1rem' }}>Ingredients available in database:</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', justifyContent: 'center', maxWidth: '800px' }}>
                  {allRecipes.slice(0, 15).map((ing, i) => (
                      <span key={i} style={{ background: 'var(--color-surface-2)', padding: '0.25rem 0.75rem', borderRadius: 'var(--radius-xl)', fontSize: '0.9rem', cursor: 'pointer', transition: 'var(--transition)' }} onClick={() => setLeftover(ing)} className="badge-hover">
                          {ing}
                      </span>
                  ))}
              </div>
          </div>
      )}
    </div>
  );
};

export default RecipeGenerator;

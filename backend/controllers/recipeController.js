const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');

const CSV_FILE = path.join(__dirname, '../food.csv');

// Helper to read recipes from CSV
const readRecipes = () => {
  return new Promise((resolve, reject) => {
    const results = [];
    if (!fs.existsSync(CSV_FILE)) {
        return resolve([]);
    }
    fs.createReadStream(CSV_FILE)
      .pipe(csv({ headers: false, skipLines: 1 })) // Skip header manually due to issues with default behavior on custom csvs
      .on('data', (data) => {
        const parts = Object.values(data);
        if (parts.length >= 2) {
          results.push({ leftover: parts[0].trim(), recipe: parts[1].trim() });
        }
      })
      .on('end', () => {
        resolve(results);
      })
      .on('error', (err) => {
        reject(err);
      });
  });
};

// @desc    Get all recipes
// @route   GET /api/recipes
const getRecipes = async (req, res) => {
  try {
    const recipes = await readRecipes();
    res.json(recipes);
  } catch (error) {
    res.status(500).json({ error: `Error reading file: ${error.message}` });
  }
};

// @desc    Find a recipe by leftover ingredient
// @route   POST /api/recipes/find
const findRecipe = async (req, res) => {
  const { leftover } = req.body;
  if (!leftover) {
    return res.status(400).json({ error: 'Leftover ingredient cannot be empty' });
  }

  try {
    const recipes = await readRecipes();
    const match = recipes.find(r => r.leftover.toLowerCase() === leftover.toLowerCase());
    
    if (match) {
      res.json({ recipe: match.recipe });
    } else {
      res.status(404).json({ error: 'Recipe not found' });
    }
  } catch (error) {
    res.status(500).json({ error: `Error finding recipe: ${error.message}` });
  }
};

module.exports = {
  getRecipes,
  findRecipe
};

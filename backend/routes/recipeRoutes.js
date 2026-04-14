const express = require('express');
const router = express.Router();
const { getRecipes, findRecipe } = require('../controllers/recipeController');

router.get('/', getRecipes);
router.post('/find', findRecipe);

module.exports = router;

import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Button, Typography, Box } from '@mui/material';
import { RootState } from '../Redux/redux-store';

const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const recipe = useSelector((state: RootState) => 
    [...state.recipes.allRecipes, ...state.recipes.localRecipes].find(recipe => recipe.idMeal === id)
  );

  if (!recipe) {
    return <Typography>Recipe not found</Typography>;
  }

  const goBack = () => {
    navigate('/main');
  };

  return (
    <Box sx={{ padding: 2, marginTop: '80px' }}>
      <Button variant="contained" color="primary" onClick={goBack}>
        Back to Home
      </Button>
      <Box sx={{ mt: 2 }}>
        <Typography variant="h4" component="div">
          {recipe.strMeal}
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'column', md: 'row' } }}>
          <Box component="img" src={recipe.strMealThumb} alt={recipe.strMeal} sx={{ width: { xs: '100%', md: '40%' } }} />
          <Typography variant="body1" color="text.secondary" sx={{ mt: 2, fontSize: '20px', marginLeft: { md: '10px' } }}>
            {recipe.strInstructions}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default ProductDetails;



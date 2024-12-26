import React from 'react';
import { useSelector } from 'react-redux';
import { Grid, Typography, Box } from '@mui/material';
import { RootState } from '../Redux/redux-store';
import RecipeCard from '../MainPart/RecipeCard';


const Favorites: React.FC = () => {
  const favorites = useSelector((state: RootState) => state.favorites.favorites);

  return (
    <Box sx={{ padding: 2, marginTop: '80px' }}>
      <Typography variant="h4" component="div" sx={{ mb: 2 }}>
        My Favorites
      </Typography>
      <Grid container spacing={2} justifyContent="center">
        {favorites.length > 0 ? (
          favorites.map((recipe) => (
            <Grid item key={recipe.idMeal} xs={12} sm={6} md={4} lg={3} xl={2}>
              <RecipeCard recipe={recipe} />
            </Grid>
          ))
        ) : (
          <Typography>No favorites added yet</Typography>
        )}
      </Grid>
    </Box>
  );
};

export default Favorites;

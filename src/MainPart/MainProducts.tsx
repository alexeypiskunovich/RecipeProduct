import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Grid, CircularProgress, Typography, Pagination, Box } from '@mui/material';
import RecipeCard from './RecipeCard';
import { AppDispatch, RootState } from '../Redux/redux-store';
import { fetchAllRecipes } from '../Redux/recipe-reducer';
import { Recipe } from '../Redux/recipe-reducer'; // Импортируем интерфейс Recipe

const MainProducts: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { filteredRecipes, status, error } = useSelector((state: RootState) => state.recipes);
  const [currentPage, setCurrentPage] = useState(1);
  const recipesPerPage = 10;

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchAllRecipes());
    }
  }, [status, dispatch]);

  const handlePageChange = (value: number) => {
    setCurrentPage(value);
  };

  if (!filteredRecipes) return <Typography>No recipes found</Typography>;

  const indexOfLastRecipe = currentPage * recipesPerPage;
  const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
  const currentRecipes = filteredRecipes.slice(indexOfFirstRecipe, indexOfLastRecipe);

  if (status === 'loading') return <CircularProgress />;
  if (status === 'failed') return <Typography>{error}</Typography>;

  return (
    <Box sx={{ padding: 2, marginTop: '90px' }}>
      <Grid container spacing={2} justifyContent="center">
        {currentRecipes && currentRecipes.length > 0 ? (
          currentRecipes.map((recipe: Recipe) => (
            <Grid item key={recipe.idMeal} xs={12} sm={6} md={4} lg={3} xl={2}>
              <RecipeCard recipe={recipe} />
            </Grid>
          ))
        ) : (
          <Typography>No recipes found</Typography>
        )}
      </Grid>
      <Pagination
        count={Math.ceil(filteredRecipes.length / recipesPerPage)}
        page={currentPage}
        onChange={(_event, value) => handlePageChange(value)}
        sx={{ marginTop: 2, display: 'flex', justifyContent: 'center' }}
      />
    </Box>
  );
};

export default MainProducts;







import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Card, CardContent, CardMedia, IconButton, Typography } from '@mui/material';
import { Favorite, FavoriteBorder, Delete } from '@mui/icons-material';
import { AppDispatch, RootState } from '../Redux/redux-store';
import { addFavorite, removeFavorite } from '../Redux/favorites-reducer';
import { deleteRecipe } from '../Redux/recipe-reducer';

interface RecipeCardProps {
  recipe: {
    idMeal: string;
    strMeal: string;
    strMealThumb: string;
    strInstructions: string;
  };
}

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe }) => {
  const dispatch = useDispatch<AppDispatch>();
  const favorites = useSelector((state: RootState) => state.favorites.favorites);
  const liked = favorites.some(fav => fav.idMeal === recipe.idMeal);
  const navigate = useNavigate();

  const toggleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (liked) {
      dispatch(removeFavorite(recipe.idMeal));
    } else {
      dispatch(addFavorite(recipe));
    }
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch(deleteRecipe(recipe.idMeal));
  };

  const navigateToDetails = () => {
    navigate(`/products/${recipe.idMeal}`);
  };

  return (
    <Card 
      sx={{ 
        maxWidth: 300, 
        margin: 'auto', 
        bgcolor: liked ? 'background.default' : 'background.paper',
        background: liked 
          ? 'linear-gradient(to bottom right, rgba(255,0,0,0.1), rgba(255,0,0,0.5))' 
          : 'none',
        border: liked ? '1px solid rgba(255,0,0,0.5)' : 'none',
        boxShadow: liked ? '0 0 10px rgba(255,0,0,0.5)' : '1px solid rgba(12, 12, 12, 0.5)',
      }}
      onClick={navigateToDetails} // Добавляем обработчик для клика на карточке
    >
      <CardMedia 
        component="img" 
        height="140" 
        image={recipe.strMealThumb} 
        alt={recipe.strMeal} 
      />
      <CardContent>
        <Typography variant="h6" component="div">
          {recipe.strMeal}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {recipe.strInstructions.substring(0, 100)}...
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <IconButton onClick={toggleLike} color="primary">
            {liked ? <Favorite /> : <FavoriteBorder />}
          </IconButton>
          <IconButton onClick={handleDelete} color="secondary">
            <Delete />
          </IconButton>
        </Box>
      </CardContent>
    </Card>
  );
};

export default RecipeCard;


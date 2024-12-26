import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { recipeApi } from '../api.ts/api';

export interface Recipe {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
  strInstructions: string;
}

interface RecipesState {
  allRecipes: Recipe[];
  localRecipes: Recipe[];
  filteredRecipes: Recipe[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: RecipesState = {
  allRecipes: [],
  localRecipes: [],
  filteredRecipes: [],
  status: 'idle',
  error: null,
};

export const fetchAllRecipes = createAsyncThunk('recipes/fetchAllRecipes', async () => {
  const data = await recipeApi.getAllRecipes();
  return data;
});

const recipesSlice = createSlice({
  name: 'recipes',
  initialState,
  reducers: {
    addRecipe: (state, action: PayloadAction<Recipe>) => {
      state.localRecipes.push(action.payload);
    },
    deleteRecipe: (state, action: PayloadAction<string>) => {
      state.allRecipes = state.allRecipes.filter(recipe => recipe.idMeal !== action.payload);
      state.localRecipes = state.localRecipes.filter(recipe => recipe.idMeal !== action.payload);
      state.filteredRecipes = state.filteredRecipes.filter(recipe => recipe.idMeal !== action.payload);
    },
    searchLocalRecipes: (state, action: PayloadAction<string>) => {
      state.filteredRecipes = [...state.allRecipes, ...state.localRecipes].filter(recipe =>
        recipe.strMeal.toLowerCase().includes(action.payload.toLowerCase())
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllRecipes.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAllRecipes.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.allRecipes = action.payload;
        state.filteredRecipes = [...state.allRecipes, ...state.localRecipes];
      })
      .addCase(fetchAllRecipes.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch recipes';
      });
  },
});

export const { addRecipe, deleteRecipe, searchLocalRecipes } = recipesSlice.actions;
export default recipesSlice.reducer;



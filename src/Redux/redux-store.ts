import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import recipesReducer from './recipe-reducer';
import favoritesReducer from './favorites-reducer' 

const store = configureStore({
  reducer: {
    recipes: recipesReducer,
    favorites: favoritesReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware()
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type BaseThunkType<A extends Action, R = Promise<void>> = ThunkAction<R, RootState, unknown, A>;

export default store;


  
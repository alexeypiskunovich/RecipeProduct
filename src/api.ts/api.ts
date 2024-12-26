import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://www.themealdb.com/api/json/v1/1',
});

export const recipeApi = {
  getRecipe(letter: string) {
    return instance.get(`/search.php?f=${letter}`).then(response => response.data);
  },
  getAllRecipes() {
    const alphabet = 'abcdefghijklmnopqrstuvwxyz';
    const promises = alphabet.split('').map(letter => this.getRecipe(letter));
    return Promise.all(promises).then(results => 
      results.reduce((acc, result) => acc.concat(result.meals || []), [])
    );
  }
};





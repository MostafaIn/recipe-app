import { Recipe } from './recipe.model';

export class RecipeService {
  private recipes: Recipe[] = [
    new Recipe(
      'A Simpel Test',
      'This is a simple test.',
      'https://images.immediate.co.uk/production/volatile/sites/30/2013/05/Puttanesca-fd5810c.jpg?quality=90&webp=true&resize=600,545'
    ),
    new Recipe(
      'Another Test',
      'This is another simple test.',
      'https://images.immediate.co.uk/production/volatile/sites/30/2013/05/Puttanesca-fd5810c.jpg?quality=90&webp=true&resize=600,545'
    ),
    new Recipe(
      'Just a Test',
      'This is just a test.',
      'https://images.immediate.co.uk/production/volatile/sites/30/2013/05/Puttanesca-fd5810c.jpg?quality=90&webp=true&resize=600,545'
    ),
  ];

  getRecipes() {
    return this.recipes.slice();
  }
}

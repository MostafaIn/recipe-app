import { EventEmitter, Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Ingredient } from '../shared/ingredient.model';
import { Recipe } from './recipe.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';

@Injectable()
export class RecipeService {
  recipeSelected = new EventEmitter<Recipe>();
  recipesChanged = new Subject<Recipe[]>();

  private recipes: Recipe[] = [
    new Recipe(
      'Classic Savory Deviled Eggs',
      'Hard-cooked eggs are stuffed with a creamy blend of mayonnaise, Dijon mustard and rice wine vinegar. Fresh dill and garlic powder add a delightful flavor',
      'https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fimages.media-allrecipes.com%2Fuserphotos%2F9368911.jpg&w=595&h=595&c=sc&poi=face&q=60',
      [
        new Ingredient('hard-cooked eggs, halved', 6),
        new Ingredient('mayonnaise', 1),
        new Ingredient('Dijon mustard', 1.5),
      ]
    ),
    new Recipe(
      'Photos of Air-Fried Bang Bang Salmon',
      'Easy, fast, and tasty! These tender, air-fried salmon fillets are full of subtly sweet and spicy flavor. Serve with rice and a green vegetable for the perfect healthy dinner.',
      'https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fpublic-assets.meredithcorp.io%2Fe9966330f27d8e2c09bcfe0705a0f748%2F16493938430F1EF404-7440-49BC-9B0D-B67537A149A3.jpeg&w=596&h=792&c=sc&poi=face&q=60',
      [
        new Ingredient('salmon fillets', 4),
        new Ingredient('tablespoon Sriracha sauce', 1),
        new Ingredient('Sriracha sauce', 1),
      ]
    ),
    new Recipe(
      'Occasion Feel a Little Fancy',
      'Want an easy way to instantly transform ordinary pasta salad into a party-worthy dish? Add some crabmeat to the mix and you will be proud to bring your crab pasta salad to any occasion, from festive brunches to casual potlucks.',
      'https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F43%2F2022%2F02%2F16%2F4483750.jpg&w=400&h=400&c=sc&poi=face&q=60',
      [
        new Ingredient('pound large shrimp, peeled and deveined', 2),
        new Ingredient('olive oil', 2),
        new Ingredient('medium lemon', 1),
      ]
    ),
  ];

  constructor(private shoppingListService: ShoppingListService) {}

  // to overwrite the data from database with dommy
  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipesChanged.next(this.recipes.slice());
  }

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipe(index: number) {
    return this.recipes[index];
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.shoppingListService.addIngredients(ingredients);
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());
  }
}

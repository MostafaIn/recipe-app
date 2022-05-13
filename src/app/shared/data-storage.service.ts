import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Recipe } from '../recipes/recipe.model';
import { RecipeService } from '../recipes/recipe.service';

@Injectable({ providedIn: 'root' })
export class DataStorageService {
  constructor(private http: HttpClient, private recipeService: RecipeService) {}

  storeRecipes() {
    const recipes: Recipe[] = this.recipeService.getRecipes();
    this.http
      .put<Recipe[]>(
        'https://ng-recipes-book-a35f7-default-rtdb.europe-west1.firebasedatabase.app/recipes.json',
        recipes
      )
      .subscribe((res) => console.log(res));
  }

  fetchRecipes() {
    this.http
      .get<Recipe[]>(
        'https://ng-recipes-book-a35f7-default-rtdb.europe-west1.firebasedatabase.app/recipes.json'
      )
      .subscribe((res) => this.recipeService.setRecipes(res));
  }
}

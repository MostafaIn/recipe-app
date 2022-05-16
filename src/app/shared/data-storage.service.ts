import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, tap, take, exhaustMap } from 'rxjs/operators';
import { Recipe } from '../recipes/recipe.model';
import { RecipeService } from '../recipes/recipe.service';
import { AuthService } from '../auth/auth.service';

@Injectable({ providedIn: 'root' })
export class DataStorageService {
  constructor(
    private http: HttpClient,
    private recipeService: RecipeService,
    private authService: AuthService
  ) {}

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
    return this.authService.user.pipe(
      take(1),
      exhaustMap((user) => {
        return this.http.get<Recipe[]>(
          'https://ng-recipes-book-a35f7-default-rtdb.europe-west1.firebasedatabase.app/recipes.json',
          {
            params: new HttpParams().set('auth', user.token),
          }
        );
      }),
      map(
        (recipes) =>
          recipes.map((recipe) => {
            return {
              ...recipe,
              ingredients: recipe.ingredients ? recipe.ingredients : [],
            };
          }),
        tap((res: Recipe[]) => this.recipeService.setRecipes(res))
      )
    );
  }
}

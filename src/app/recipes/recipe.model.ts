export class Recipe {
  public name: string;
  public description: string;
  public imagePath: string;

  constructor(name: string, decs: string, imgPath: string) {
    this.name = name;
    this.description = decs;
    this.imagePath = imgPath;
  }
}

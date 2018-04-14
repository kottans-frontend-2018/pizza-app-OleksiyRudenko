import {API} from '../API';
import {Auth} from '../Auth';

/**
 * Supplies pizza-related images
 */
class PizzaImageryService {
  constructor() {
    this.loadIngredients().then(data => {
      data.push({
        name: 'pizza',
        url: 'static/images/pizza.png',
      });
      return data;
    }).then(list => {
      
    }).then(data => {
      console.log(data);
      return data;
    });

  }

  getImage(imageName) {

  }

  loadIngredients() {
    return Auth.getIngredients().then(data => data.results.map(item => ({
      name: item.name,
      url: item.image_url,
    }))).catch(rejection => console.log('PizzaImageryService.loadIngredients() error', rejection));
  }
}

export const PizzaImagery = new PizzaImageryService();

import {API} from '../API';
import {Auth} from '../Auth';

/**
 * Supplies pizza-related images
 */
class PizzaImageryService {
  constructor() {
    this.images = {};
    console.log('PizzaImageryService constructor');
    this.loadIngredients().then(data => {
      data.push({
        name: 'pizza',
        url: 'static/images/pizza.png',
      });
      return data;
    }).then(list => {
      console.log('PizzaImageryService constructor', list);
      list.forEach(item => {
        const image = new Image();
        image.crossOrigin = '';
        image.src = API.prependAssetUrl(item.url);
        this.images[item.name] = Promise.resolve(image);
      });
      console.log('PizzaImageryService constructor images', this.images);
    }).catch(rejection => console.log('PizzaImageryService.constructor() error', rejection));
  }

  /**
   * Returns cached image
   * @param imageName
   * @returns {Image}
   */
  getImage(imageName) {
    return this.images[imageName] || Promise.reject('no-data');
  }

  loadIngredients() {
    return Auth.getIngredients().then(data => data.map(item => ({
      name: item.name,
      url: item.image_url,
    }))).catch(rejection => console.log('PizzaImageryService.loadIngredients() error', rejection));
  }
}

export const PizzaImagery = new PizzaImageryService();

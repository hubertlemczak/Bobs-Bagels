class Basket {
  constructor() {
    this.basket = [];
  }
  addToBasket(sku) {
    if (!this.basket.includes(inventory.find((x) => x.sku === sku))) {
      this.basket.push(inventory.find((x) => x.sku === sku));
      inventory.find((x) => x.sku === sku).quantity = 1;
    } else inventory.find((x) => x.sku === sku).quantity++;
    return this;
  }
  getBasket() {
    return this.basket;
  }
  removeFromBasket(sku) {
    if (this.basket.includes(this.basket.find((x) => x.sku === sku))) {
      if (this.basket.find((x) => x.sku === sku).quantity === 1) {
        const removeIndex = this.basket.findIndex((x) => x.sku === sku);
        this.basket.splice(removeIndex, removeIndex);
      } else this.basket.find((x) => x.sku === sku).quantity--;
    } else return 'This item is not in your basket';

    return this;
  }
  getBasketTotal() {
    let total = 0;
    for (let i = 0; i < this.basket.length; i++) {
      if (this.basket[i].sku === 'BGLO' || this.basket[i].sku === 'BGLE') {
        const dealPrice = Math.floor(this.basket[i].quantity / 6) * 2.49;
        const dealRemainder = (this.basket[i].quantity % 6) * this.basket[i].price;
        this.basket[i].totalPrice = dealPrice + dealRemainder;
      } else if (this.basket[i].sku === 'BGLP') {
        const dealPrice = Math.floor(this.basket[i].quantity / 12) * 3.99;
        const dealRemainder = (this.basket[i].quantity % 12) * this.basket[i].price;
        this.basket[i].totalPrice = dealPrice + dealRemainder;
      } else {
        this.basket[i].totalPrice = this.basket[i].price * this.basket[i].quantity;
      }
      total += this.basket[i].totalPrice;
    }
    return `£${total.toFixed(2)}`;
  }
  getReceipt() {
    for (let i = 0; i < this.basket.length; i++) {
      console.log(
        `${this.basket[i].variant} ${this.basket[i].name} ${this.basket[i].quantity} £${this.basket[
          i
        ].totalPrice.toFixed(2)}`
      );
    }
    console.log(`Total: ${this.getBasketTotal()}`);
  }
}
// class Manager extends Basket {
//   constructor() {
//     super();
//   }
//   changeBasketLimit(limit) {
//     this.basketLimit = limit;
//     console.log(this.basketLimit);
//   }
// }

// const manager = new Manager();
const basket = new Basket();
// .removeFromBasket('BGLP');
// console.log('basket', basket.getBasket());
// console.log();
//I'd like to know when my basket is full when I try adding an item beyond my basket capacity. sum quantity

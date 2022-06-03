class Basket {
  constructor() {
    this.basket = [];
  }
  addToBasket(sku) {
    if (!this.basket.includes(inventory.find((x) => x.sku === sku))) {
      this.basket.push(inventory.find((x) => x.sku === sku));
      inventory.find((x) => x.sku === sku).quantity = 1;
      basket.renderBasket();
    } else {
      inventory.find((x) => x.sku === sku).quantity++;
      basket.renderBasket();
    }

    return this;
  }
  addDealToBasket(sku) {
    if (!this.basket.includes(inventory.find((x) => x.sku === sku))) {
      this.basket.push(inventory.find((x) => x.sku === sku));
      if (sku === 'BGLE' || sku === 'BGLO') inventory.find((x) => x.sku === sku).quantity = 6;
      if (sku === 'BGLP') inventory.find((x) => x.sku === sku).quantity = 12;
      basket.renderBasket();
    } else {
      if (sku === 'BGLE' || sku === 'BGLO') inventory.find((x) => x.sku === sku).quantity += 6;
      if (sku === 'BGLP') inventory.find((x) => x.sku === sku).quantity += 12;
      basket.renderBasket();
    }
  }
  removeFromBasket(sku) {
    this.basket = this.basket.filter((item) => item.sku !== sku);
    basket.renderBasket();
  }
  decrement(sku) {
    if (this.basket.find((x) => x.sku === sku).quantity === 1) basket.removeFromBasket(sku);
    else this.basket.find((x) => x.sku === sku).quantity--;
    basket.renderBasket();
  }
  getBasket() {
    return this.basket;
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
  renderProducts() {
    const products = document.querySelector('.shop__products');
    inventory.forEach((product) => {
      products.innerHTML += `
        <div class="shop__products">
          <div class="shop__product">
            <div class="shop__product-image">
              <div class="shop__add-to-basket flex-c-c" onclick="(basket.addToBasket('${product.sku}'))">
                <p>ADD TO CART</p>
                <svg viewbox="0 0 24 24" width="100" height="100">
                  <g id="_01_align_center" data-name="01 align center">
                    <path
                      d="M20.164,13H5.419L4.478,5H14V3H4.242L4.2,2.648A3,3,0,0,0,1.222,0H0V2H1.222a1,1,0,0,1,.993.883L3.8,16.351A3,3,0,0,0,6.778,19H20V17H6.778a1,1,0,0,1-.993-.884L5.654,15H21.836l.9-5H20.705Z"
                    />
                    <circle cx="7" cy="22" r="2" />
                    <circle cx="17" cy="22" r="2" />
                    <polygon
                      points="21 3 21 0 19 0 19 3 16 3 16 5 19 5 19 8 21 8 21 5 24 5 24 3 21 3"
                    />
                  </g>
                </svg>
              </div>
              <img src="./assets/images/${product.sku}.jpg" alt="${product.variant}${product.name}" />
            </div>
            <div class="shop__product-text flex-sb">
              <div class="shop__product-name">
                <p>${product.variant} ${product.name}</p>
                <p><span class="shop__text-sm">${product.fillings}</span></p>
              </div>
              <div class="shop__product-price">
                <p><span class="shop__text-sm">£${product.price}</span></p>
              </div>
            </div>
          </div>
        </div>`;
    });
  }
  renderBasket() {
    basket.getBasketTotal();
    const cartProducts = document.querySelector('.basket__products');
    cartProducts.innerHTML = '';
    this.basket.forEach((product) => {
      cartProducts.innerHTML += `
        <div class="basket__product">
          <div class="basket__product-image">
            <img width="100px" src="./assets/images/${product.sku}.jpg" alt="${product.variant} ${
        product.name
      }" />
          </div>
          <div class="basket__text flex-sb-c">
            <div class="basket__product-name">
              <p>${product.variant} ${product.name}</p>
            </div>
            <div class="basket__wrapper flex-sb-c">
              <div class="basket__product-quantity flex-sb-c">
                <div class="basket__product-quantity-decrement" onclick="basket.decrement('${
                  product.sku
                }')">
                  <p>-</p>
                </div>
                <p><span class="basket__text-sm">${product.quantity}</span></p>
                <div class="basket__product-quantity-increment"  onclick="basket.addToBasket('${
                  product.sku
                }')">
                  <p>+</p>
                </div>
              </div>
              <div class="basket__product-total">
                <p><span class="basket__text-sm">£${product.totalPrice.toFixed(2)}</span></p>
              </div>
              <div class="basket__product-remove"  onclick="basket.removeFromBasket('${
                product.sku
              }')">
                <p>X</p>
              </div>
            </div>
          </div>
        </div>`;
    });
    const basketTotal = document.querySelector('.basket__total');
    basketTotal.innerHTML = '';
    if (this.basket.length !== 0)
      basketTotal.innerHTML = `
    <div></div>
    <p>${basket.getBasketTotal()}</p>`;
  }
  renderCheckout() {
    const cartProducts = document.querySelector('.checkout__inner');
    cartProducts.innerHTML = '';
    let totalDiscount = 0;
    this.basket.forEach((product) => {
      const discount = product.price * product.quantity - product.totalPrice;
      totalDiscount += discount;
      if (discount !== 0) {
        cartProducts.innerHTML += `
        <div class="checkout__product">
          <div class="checkout__text flex-sb-c">
            <div class="checkout__product-name">
              <p>${product.variant} ${product.name}</p>
            </div>
            <div class="checkout__wrapper flex-sb-c">
              <div class="checkout__product-quantity flex-sb-c">
                <p><span class="checkout__text-sm">${product.quantity}</span></p>
              </div>
              <div class="checkout__product-total">
                <p>
                  <span class="checkout__text-sm"
                    >£${product.totalPrice.toFixed(2)}</span
                  >
                </p>
              </div>
            </div>
          </div>
          <p class="savings">
            <span class="checkout__text-sm">(-£${discount.toFixed(2)})</span>
          </p>
        </div>
        `;
      } else {
        cartProducts.innerHTML += `
        <div class="checkout__product">
          <div class="checkout__text flex-sb-c">
            <div class="checkout__product-name">
              <p>${product.variant} ${product.name}</p>
            </div>
            <div class="checkout__wrapper flex-sb-c">
              <div class="checkout__product-quantity flex-sb-c">
                <p><span class="checkout__text-sm">${product.quantity}</span></p>
              </div>
              <div class="checkout__product-total">
                <p>
                  <span class="checkout__text-sm"
                    >£${product.totalPrice.toFixed(2)}</span
                  >
                </p>
              </div>
            </div>
          </div>
        </div>
    `;
      }
    });
    const savings = document.querySelector('.checkout__total-saved');
    const checkoutTotal = document.querySelector('.checkout__total');
    const basketTotal = document.querySelector('.basket__total');
    basketTotal.innerHTML = '';
    if (this.basket.length !== 0) {
      basketTotal.innerHTML = `
    <div></div>
    <p>${basket.getBasketTotal()}</p>`;
    }
    checkoutTotal.innerHTML = `<p>Total: ${basket.getBasketTotal()}</p>`;
    if (totalDiscount !== 0)
      savings.innerHTML = `<p>You save a total of £${totalDiscount.toFixed(2)}</p>`;
  }
}
const basket = new Basket();
basket.renderProducts();
basket.renderBasket();
// localStorage.setItem('BASKET', JSON.stringify(this.basket));

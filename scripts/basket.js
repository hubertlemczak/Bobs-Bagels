class Basket {
  constructor() {
    this.basket = JSON.parse(localStorage.getItem('BASKET')) || [];
  }

  addToBasket(sku) {
    const inventoryItem = inventory.find((x) => x.sku === sku);
    let basketFoundItem = this.basket.find((x) => x.sku === sku);
    if (!basketFoundItem) {
      basketFoundItem = { ...inventoryItem };
      basketFoundItem.quantity = 1;
      this.basket.push(basketFoundItem);
    } else if (basketFoundItem.sku.includes(inventoryItem.sku)) {
      basketFoundItem.quantity++;
    }
    basket.renderBasket();
  }

  addDealToBasket(sku) {
    const inventoryItem = inventory.find((x) => x.sku === sku);
    console.log({ ...inventoryItem });
    let basketFoundItem = this.basket.find((x) => x.sku === sku);
    if (!basketFoundItem) {
      basketFoundItem = { ...inventoryItem };
      basketFoundItem.quantity = 0;
      this.basket.push(basketFoundItem);
    }
    if (sku === 'BGLE' || sku === 'BGLO') basketFoundItem.quantity += 6;
    if (sku === 'BGLP') basketFoundItem.quantity += 12;
    basket.renderBasket();
  }

  removeFromBasket(sku) {
    this.basket = this.basket.filter((item) => item.sku !== sku);
    basket.renderBasket();
  }

  decrement(sku) {
    const basketFoundItem = this.basket.find((x) => x.sku === sku);
    if (basketFoundItem.quantity === 1) basket.removeFromBasket(sku);
    else basketFoundItem.quantity--;
    basket.renderBasket();
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
    let totalQuantity = 0;
    this.basket.forEach((product) => {
      totalQuantity += product.quantity;
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
    const checkoutBtn = document.querySelector('.basket__checkout');
    const basketQuantity = document.querySelector('.header__basket-q');
    basketTotal.innerHTML = '';
    checkoutBtn.innerHTML = '';
    basketQuantity.innerHTML = '';
    if (this.basket.length !== 0) {
      basketTotal.innerHTML = `
    <div></div>
    <p>${basket.getBasketTotal()}</p>`;
      checkoutBtn.innerHTML = `
      <button
      onclick="basket.renderCheckout(),document.querySelector('.checkout').classList.add('top'),document.querySelector('.basket').classList.remove('top')"
      class="basket__checkout-btn flex-c-c">
        <span>CHECKOUT</span>
        <svg class="basket__checkout-svg" width="50" viewbox="0 0 86 27.431">
          <path
            d="M9.822,4.485,11.216,3.09a1.5,1.5,0,0,1,2.129,0L25.557,15.3a1.5,1.5,0,0,1,0,2.129L13.346,29.636a1.5,1.5,0,0,1-2.129,0L9.822,28.241a1.509,1.509,0,0,1,.025-2.155l7.569-7.211H-58.492A1.5,1.5,0,0,1-60,17.368v-2.01a1.5,1.5,0,0,1,1.508-1.508H17.416L9.847,6.639A1.5,1.5,0,0,1,9.822,4.485Z"
            transform="translate(60 -2.647)"
            fill="#FFFFFF"
          ></path>
        </svg>
      </button>`;
      basketQuantity.innerHTML = `<span class="header__basket-quantity">${totalQuantity}</span>`;
    }
    localStorage.setItem('BASKET', JSON.stringify(this.basket));
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
basket.renderBasket();

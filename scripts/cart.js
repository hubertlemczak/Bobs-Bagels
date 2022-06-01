const products = document.querySelector('.shop__products');

const renderProducts = () => {
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
            <p><span class="shop__text-sm">$${product.price}</span></p>
          </div>
        </div>
      </div>
    </div>`;
  });
};
renderProducts();

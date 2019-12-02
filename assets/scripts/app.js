class Product {
  constructor(title = "Default", imageUrl, description, price) {
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.description = price;
  }
}

class ProductItem {
  constructor(product) {
    this.product = product;
  }

  render() {
    const prodEl = document.createElement("li");
    prodEl.className = "product-item";
    prodEl.innerHTML = `
        <div>
            <img src="${prod.imageUrl}" alt="${prod.title}">
            <div class="product-item__content">
                <h2>${prod.title}</h2>
                <h3>\$${prod.price} </h3>
                <p>${prod.description} </p>
                <button> Add to Cart</button>
            </div>
        </div>
      `;
  }
}

class ProductList {
  products = [
    new Product(
      "Pillow",
      "https://www.pyrenex.com/home/2051-large_default/pyrenex-cushion-natural-feathers-duck.jpg",
      19.99,
      "A soft Pillow",
    ),
    new Product(
      "A Carpet",
      "https://cdn20.pamono.com/p/s/4/8/482920_f2r70mwwd2/antique-wool-carpet.jpg",
      89.99,
      "A carpet you might like",
    ),
    new Product(),
  ];
  constructor() {}
  render() {
    const renderHook = document.getElementById("app");
    const prodList = document.createElement("ul");
    prodList.className = "product-list";
    for (const prod of this.products) {
      prodList.append(prodEl);
    }
    renderHook.append(prodList);
  }
}

const productList = new ProductList();
productList.render();

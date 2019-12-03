class Product {
  constructor(title = "Default", imageUrl, description, price) {
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }
}

class ElementAttribute {
  constructor(attrName, attrValue) {
    this.name = attrName;
    this.value = attrValue;
  }
}

class Component {
  constructor(renderHookId, shouldRender = true) {
    this.hookId = renderHookId;
    if (shouldRender === true) {
      this.render();
    }
  }

  render() {}
  createRootElement(tag, cssClasses, attributes) {
    const rootElement = document.createElement(tag);
    if (cssClasses) {
      rootElement.className = cssClasses;
    }

    if (attributes && attributes.length > 0) {
      for (const attr of attributes) {
        rootElement.setAttribute(attr.name, attr.value);
      }
    }
    document.getElementById(this.hookId).append(rootElement);
    return rootElement;
  }
}

class ShoppingCart extends Component {
  items = [];

  constructor(renderHookId) {
    super(renderHookId); // Class constructor in parent class
  }

  set cartItems(value) {
    this.items = value;
    this.totalOutput.innerHTML = `<h2>Total: \$ ${this.totalAmount.toFixed(
      2,
    )} </h2>`;
  }

  get totalAmount() {
    const sum = this.items.reduce((prevVal, curItem) => {
      return prevVal + curItem.price;
    }, 0);
    return sum;
  }

  addProduct(product) {
    const updatedItems = [...this.items];
    updatedItems.push(product);
    this.cartItems = updatedItems;
  }

  orderProducts() {
    console.log("Ordering");
    console.log(this.items);
  }
  render() {
    const cartEl = this.createRootElement("section", "cart");
    cartEl.innerHTML = `
            <h2>Total: \$ ${0} </h2>
            <button>Order Now! </button>
        `;
    const orderBtn = cartEl.querySelector("button");
    orderBtn.addEventListener("click", () => {
      this.orderProducts();
    });
    this.totalOutput = cartEl.querySelector("h2");
  }
}

class ProductItem extends Component {
  constructor(product, renderHookId) {
    super(renderHookId, false);
    this.product = product;
    this.render();
  }

  addToCart() {
    App.addProductToCart(this.product);
  }

  render() {
    const prodEl = this.createRootElement("list-item", "product-item");
    prodEl.innerHTML = `
        <div>
            <img src="${this.product.imageUrl}" alt="${this.product.title}">
            <div class="product-item__content">
                <h2>${this.product.title}</h2>
                <h3>\$${this.product.price} </h3>
                <p>${this.product.description} </p>
                <button> Add to Cart</button>
            </div>
        </div>
      `;
    const addCartButton = prodEl.querySelector("button");
    addCartButton.addEventListener("click", this.addToCart.bind(this));
  }
}

class ProductList extends Component {
  #products = [];
  constructor(renderHookId) {
    super(renderHookId, false);
    this.render();
    this.fetchProducts();
  }

  fetchProducts() {
    this.#products = [
      new Product(
        "Pillow",
        "https://www.pyrenex.com/home/2051-large_default/pyrenex-cushion-natural-feathers-duck.jpg",
        "A soft Pillow",
        19.99,
      ),
      new Product(
        "A Carpet",
        "https://cdn20.pamono.com/p/s/4/8/482920_f2r70mwwd2/antique-wool-carpet.jpg",
        "A carpet you might like",
        89.99,
      ),
    ];

    this.renderProducts();
  }

  renderProducts() {
    for (const prod of this.#products) {
      new ProductItem(prod, "prod-list");
    }
  }

  render() {
    const prodList = this.createRootElement("ul", "product-list", [
      new ElementAttribute("id", "prod-list"),
    ]);

    if (this.#products && this.#products.lenght > 0) {
      this.renderProducts();
    }
  }
}

class Shop extends Component {
  constructor() {
    super();
  }
  render() {
    this.cart = new ShoppingCart("app");
    new ProductList("app");
  }
}

class App {
  static cart;

  static init() {
    const shop = new Shop();
    this.cart = shop.cart;
  }

  static addProductToCart(product) {
    this.cart.addProduct(product);
  }
}

App.init();

// Get the main container for the list of products and the total price element
const listProducts = document.querySelector('.list-products');
const totalPriceEl = document.querySelector('.total');

// ============== CLASS IMPLEMENTATIONS ==============

// 1. Product Class
class Product {
  constructor(id, name, price) {
    this.id = id;
    this.name = name;
    this.price = price;
  }

  // Optional: Method to get product info
  getInfo() {
    return `${this.name} - $${this.price}`;
  }
}

// 2. ShoppingCartItem Class
class ShoppingCartItem {
  constructor(product, quantity = 1) {
    this.product = product;
    this.quantity = quantity;
  }

  // Method to calculate total price of this item
  getTotalPrice() {
    return this.product.price * this.quantity;
  }

  // Method to update quantity
  updateQuantity(newQuantity) {
    if (newQuantity >= 0) {
      this.quantity = newQuantity;
    }
  }

  // Method to increment quantity
  incrementQuantity(amount = 1) {
    this.quantity += amount;
  }

  // Method to decrement quantity
  decrementQuantity(amount = 1) {
    this.quantity = Math.max(0, this.quantity - amount);
  }
}

// 3. ShoppingCart Class
class ShoppingCart {
  constructor() {
    this.items = []; // Array of ShoppingCartItem instances
  }

  // Get total number of items in the cart
  getTotalItems() {
    return this.items.reduce((total, item) => total + item.quantity, 0);
  }

  // Get total price of all items in the cart
  getTotalPrice() {
    return this.items.reduce((total, item) => total + item.getTotalPrice(), 0);
  }

  // Add item to the cart
  addItem(product, quantity = 1) {
    // Check if product already exists in cart
    const existingItem = this.items.find(item => item.product.id === product.id);

    if (existingItem) {
      // Update quantity if product already exists
      existingItem.incrementQuantity(quantity);
    } else {
      // Add new item if product doesn't exist
      const newItem = new ShoppingCartItem(product, quantity);
      this.items.push(newItem);
    }

    return this;
  }

  // Remove item from the cart by product id
  removeItem(productId, quantityToRemove = null) {
    const itemIndex = this.items.findIndex(item => item.product.id === productId);

    if (itemIndex === -1) return false; // Item not found

    const item = this.items[itemIndex];

    if (quantityToRemove === null || quantityToRemove >= item.quantity) {
      // Remove entire item
      this.items.splice(itemIndex, 1);
    } else {
      // Remove specific quantity
      item.decrementQuantity(quantityToRemove);
    }

    return true;
  }

  // Find item by product id
  findItem(productId) {
    return this.items.find(item => item.product.id === productId);
  }

  // Update total price display
  updateTotalPrice() {
    totalPriceEl.textContent = `${this.getTotalPrice()} $`;
  }
}

// Initialize products
const products = [
  new Product(1, "Baskets", 100),
  new Product(2, "Socks", 20),
  new Product(3, "Bag", 50)
];

// Create shopping cart
const cart = new ShoppingCart();

// Function to get product by name
function getProductByName(name) {
  return products.find(product => product.name === name);
}

// Use a single event listener on the parent container for efficiency
listProducts.addEventListener('click', (event) => {
  const target = event.target; // The element that was clicked

  // Find the parent card of the clicked element
  const card = target.closest('.card');
  if (!card) return; // Exit if the click was not inside a card

  // The product item to be manipulated (the wrapper div)
  const productItem = card.parentElement;

  // Get the product name from the title
  const productName = card.querySelector('.card-title').textContent;
  const product = getProductByName(productName);
  if (!product) return;

  // Handle liking an item
  if (target.classList.contains('fa-heart')) {
    target.classList.toggle('liked');
  }

  // Handle deleting an item
  if (target.classList.contains('fa-trash-alt')) {
    cart.removeItem(product.id);
    productItem.remove();
    cart.updateTotalPrice(); // Recalculate total after deletion
  }

  // Handle quantity changes
  const quantityEl = productItem.querySelector('.quantity');
  let quantity = parseInt(quantityEl.textContent);

  if (target.classList.contains('fa-plus-circle')) {
    quantity++;
    quantityEl.textContent = quantity;
    cart.addItem(product, 1);
    cart.updateTotalPrice();
  } else if (target.classList.contains('fa-minus-circle') && quantity > 0) {
    quantity--;
    quantityEl.textContent = quantity;
    cart.removeItem(product.id, 1);
    cart.updateTotalPrice();
  }
});


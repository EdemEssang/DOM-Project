// Get the main container for the list of products and the total price element
const listProducts = document.querySelector('.list-products');
const totalPriceEl = document.querySelector('.total');

/**
 * Calculates the total price of all items in the cart and updates the DOM.
 */
function updateTotalPrice() {
  let total = 0;
  // Find all product items currently in the cart
  const productItems = document.querySelectorAll('.list-products > .card-body');

  // Loop through each item to calculate the total
  productItems.forEach(item => {
    const quantity = parseInt(item.querySelector('.quantity').textContent);
    // parseInt will correctly extract the number from a string like "100 $"
    const unitPrice = parseInt(item.querySelector('.unit-price').textContent);
    total += quantity * unitPrice;
  });

  // Update the total price display
  totalPriceEl.textContent = `${total} $`;
}

// Use a single event listener on the parent container for efficiency
listProducts.addEventListener('click', (event) => {
  const target = event.target; // The element that was clicked

  // Find the parent card of the clicked element
  const card = target.closest('.card');
  if (!card) return; // Exit if the click was not inside a card

  // The product item to be manipulated (the wrapper div)
  const productItem = card.parentElement;

  // Handle liking an item
  if (target.classList.contains('fa-heart')) {
    target.classList.toggle('liked');
  }

  // Handle deleting an item
  if (target.classList.contains('fa-trash-alt')) {
    productItem.remove();
    updateTotalPrice(); // Recalculate total after deletion
  }

  // Handle quantity changes
  const quantityEl = productItem.querySelector('.quantity');
  let quantity = parseInt(quantityEl.textContent);

  if (target.classList.contains('fa-plus-circle')) {
    quantity++;
    quantityEl.textContent = quantity;
    updateTotalPrice();
  } else if (target.classList.contains('fa-minus-circle') && quantity > 0) {
    quantity--;
    quantityEl.textContent = quantity;
    updateTotalPrice();
  }
});



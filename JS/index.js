// Array to store cart items
let cart = JSON.parse(localStorage.getItem('cart')) || [];
// Retrieve favorites data from localStorage or initialize empty array
let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

// Function to scroll to the cart section
function scrollToCart() {
    const cartSection = document.getElementById('cart-section');
    cartSection.scrollIntoView({ behavior: 'smooth' });
}

// Add items to cart
function addToCart(name, price, qtyId) {
    const quantity = parseInt(document.getElementById(qtyId).value);
    if (quantity > 0) {
        // Check if the item already exists in the cart
        const existingItem = cart.find(item => item.name === name);
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            cart.push({ name, price, quantity });
        }

        localStorage.setItem('cart', JSON.stringify(cart));

        // Update the cart display
        displayCart();

        alert(`${name} added to the cart.`);
    } else {
        alert("Please enter a valid quantity.");
    }
}

// Display cart in the table
function displayCart() {
    const cartTableBody = document.querySelector('#cart-table tbody');
    const cartTotal = document.getElementById('cart-total');
    let total = 0;

    // Clear existing cart table rows
    cartTableBody.innerHTML = '';

    cart.forEach((item, index) => {
        const row = document.createElement('tr');
        const itemTotal = item.price * item.quantity;
        total += itemTotal;

        row.innerHTML = `
            <td>${item.name}</td>
            <td>LKR ${item.price}</td>
            <td>${item.quantity}</td>
            <td>LKR ${itemTotal.toFixed(2)}</td>
            <td><button onclick="removeItem(${index})">Remove</button></td>
        `;

        cartTableBody.appendChild(row);
    });

    cartTotal.textContent = `LKR ${total.toFixed(2)}`;
}

// Remove an item from the cart
function removeItem(index) {
    cart.splice(index, 1); 
    localStorage.setItem('cart', JSON.stringify(cart)); // Update localStorage
    displayCart(); // Re-render the cart table
}

// Save cart items as favorites
function saveFavorites() {
    if (cart.length === 0) {
        alert("Cart is empty. Cannot save to favorites.");
        return;
    }

    favorites = [...cart]; // Copy current cart items to favorites
    localStorage.setItem('favorites', JSON.stringify(favorites)); // Save to localStorage
    cart = []; // Clear the cart
    localStorage.removeItem('cart'); // Remove cart from localStorage
    displayCart(); // Update cart display
    alert("Items have been saved to favorites.");
}

// Apply favorites to cart table
function applyFavorites() {
    if (favorites.length === 0) {
        alert("No favorites to apply.");
        return;
    }

    cart = [...favorites]; // Load favorites into the cart
    localStorage.setItem('cart', JSON.stringify(cart)); // Update cart in localStorage
    displayCart(); // Update cart display
    alert("Favorites have been applied to the cart.");
}

// Redirect to bill page
function redirectToBill() {
    const combinedItems = [...cart];

    favorites.forEach(favItem => {
        const existingItem = combinedItems.find(item => item.name === favItem.name);
        if (existingItem) {
            existingItem.quantity += favItem.quantity; // Merge quantities
        } else {
            combinedItems.push(favItem); // Add unique favorites
        }
    });

    if (combinedItems.length === 0) {
        alert("Your cart and favorites are both empty!");
        return;
    }

    localStorage.setItem('combinedItems', JSON.stringify(combinedItems)); // Save combined items
    window.location.href = '../WebPages/bill.html'; // Redirect to bill page
}

// Initialize the cart display on page load
document.addEventListener('DOMContentLoaded', () => {
    displayCart();
});

// Attach event listeners for favorites buttons
document.getElementById('SFav-btn').addEventListener('click', saveFavorites);
document.getElementById('AFav-btn').addEventListener('click', applyFavorites);

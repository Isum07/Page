// Retrieve cart data from localStorage
const cart = JSON.parse(localStorage.getItem('cart')) || [];
const favorites = JSON.parse(localStorage.getItem('favorites')) || [];

// Function to display the bill
function displayBill() {
    const billTableBody = document.querySelector('#bill-table tbody');
    const billTotal = document.getElementById('bill-total');
    let total = 0;

    // Clear the table
    billTableBody.innerHTML = '';

    // Combine cart and favorites, merging duplicate items
    const combinedItems = [...cart];
    favorites.forEach(favItem => {
        const existingItem = combinedItems.find(item => item.name === favItem.name);
        if (existingItem) {
            existingItem.quantity += favItem.quantity; 
        } else {
            combinedItems.push(favItem); 
        }
    });

    // Populate the table with combined items
    combinedItems.forEach(item => {
        const row = document.createElement('tr');
        const itemTotal = item.price * item.quantity;
        total += itemTotal;

        row.innerHTML = `
            <td>${item.name}</td>
            <td>LKR ${item.price}</td>
            <td>${item.quantity}</td>
            <td>LKR ${itemTotal.toFixed(2)}</td>
        `;

        billTableBody.appendChild(row);
    });

    // Update the total amount
    billTotal.textContent = total.toFixed(2);
}

// Clear cart and favorites data after displaying the bill
function clearDataAfterPurchase() {
    localStorage.removeItem('cart'); 
    localStorage.removeItem('favorites'); 
}

// Display the bill on page load
document.addEventListener('DOMContentLoaded', () => {
    displayBill();
    clearDataAfterPurchase(); 
});


function validateForm() {
    const name = document.getElementById('name').value.trim();
    const address = document.getElementById('address').value.trim();
    const card = document.getElementById('card').value.trim();
    const cvv = document.getElementById('cvv').value.trim();
    const expiryDate = document.getElementById('expiry-date').value;

    // Name validation (alphabets and spaces only)
    if (!/^[a-zA-Z\s]+$/.test(name)) {
        alert('Please enter a valid name (letters and spaces only).');
        return false;
    }

    // Address validation (non-empty)
    if (address === '') {
        alert('Please enter your address.');
        return false;
    }

    // Card number validation (16 digits)
    if (!/^\d{16}$/.test(card)) {
        alert('Please enter a valid 16-digit card number.');
        return false;
    }

    // CVV validation (3 digits)
    if (!/^\d{3}$/.test(cvv)) {
        alert('Please enter a valid 3-digit CVV.');
        return false;
    }

    // Expiry date validation (non-empty and future date)
    const currentDate = new Date();
    const selectedDate = new Date(expiryDate);
    if (!expiryDate || selectedDate <= currentDate) {
        alert('Please select a valid expiry date (future month/year).');
        return false;
    }

    return true; 
}

// Handle order confirmation
function handleOrderConfirmation(event) {
    event.preventDefault(); // Prevent form submission default behavior

    
    if (!validateForm()) {
        return; 
    }

    alert('Order Placed Successfully and Payment Complete.');

    window.location.href = '../WebPages/index.html';
}


document.getElementById('order-form').addEventListener('submit', handleOrderConfirmation);

// Display the bill on page load
document.addEventListener('DOMContentLoaded', () => {
    displayBill();
    clearCartAfterPurchase(); 
});

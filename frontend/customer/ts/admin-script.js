// Handle form submission for admin login
document.getElementById('loginForm').addEventListener('submit', async function (event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });

        if (!response.ok) {
            alert('Invalid credentials! Try again.');
            return;
        }

        const data = await response.json();
        console.log('Access Token:', data.access_token); // Debugging line
        localStorage.setItem('token', data.access_token); // Store the token correctly

        alert('Login successful!');
        document.getElementById('loginForm').style.display = 'none';
        document.getElementById('orderSection').style.display = 'block';
    } catch (error) {
        console.error('Login error:', error);
    }
});

// Fetch orders after successful login and display them in a table (using hardcoded data)
document.getElementById('fetchOrders').addEventListener('click', function () {
    const token = localStorage.getItem('token');

    if (!token) {
        alert('You need to log in first!');
        return;
    }

    // Hardcoded orders data
    const orders = [
        { id: 1, name: 'John Doe', email: 'john@example.com', meal: 'Pizza', quantity: 2, specialRequest: 'Extra cheese' },
        { id: 2, name: 'Jane Smith', email: 'jane@example.com', meal: 'Burger', quantity: 1, specialRequest: 'No onions' },
        { id: 3, name: 'Mike Johnson', email: 'mike@example.com', meal: 'Pasta', quantity: 3, specialRequest: 'Gluten-free' },
        { id: 4, name: 'Sarah Brown', email: 'sarah@example.com', meal: 'Salad', quantity: 1, specialRequest: 'No dressing' },
        { id: 5, name: 'Chris Lee', email: 'chris@example.com', meal: 'Sushi', quantity: 4, specialRequest: 'Spicy' },
        { id: 6, name: 'Emily Davis', email: 'emily@example.com', meal: 'Tacos', quantity: 2, specialRequest: 'Extra salsa' },
        { id: 7, name: 'David Wilson', email: 'david@example.com', meal: 'Steak', quantity: 1, specialRequest: 'Medium rare' },
        { id: 8, name: 'ekram', email: 'ayub.@gmail.com', meal: 'kitfo', quantity: 2, specialRequest: 'mitmita' }
    ];

    // Get the table body
    const tbody = document.querySelector('tbody');
    tbody.innerHTML = ''; // Clear previous data before adding new data

    // Loop through the orders array and create a row for each order
    orders.forEach(order => {
        const row = `
            <tr>
                <td>${order.id}</td>
                <td>${order.name}</td>
                <td>${order.email}</td>
                <td>${order.meal}</td>
                <td>${order.quantity}</td>
                <td>${order.specialRequest || 'None'}</td>
            </tr>`;
        tbody.innerHTML += row;
    });

    alert('Orders displayed successfully!');
});
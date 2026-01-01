// Ensure your HTML has a form with IDs: loginForm, username, password, orderSection, fetchOrders

// Handle form submission
document.getElementById('loginForm')!.addEventListener('submit', async function (event) {
    event.preventDefault();

    const username = (document.getElementById('username') as HTMLInputElement).value;
    const password = (document.getElementById('password') as HTMLInputElement).value;

    try {
        const response = await fetch('http://localhost:3000/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });

        if (!response.ok) throw new Error('Login failed!');

        const data = await response.json();
        localStorage.setItem('token', data.access_token);

        alert('Login successful!');

        // Show orders section and hide login form
        document.getElementById('loginForm')!.style.display = 'none';
        document.getElementById('orderSection')!.style.display = 'block';
    } catch (error) {
        alert('Invalid username or password');
    }
});
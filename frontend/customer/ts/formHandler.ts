interface Order {
    name: string;
    email: string;
    meal: string;
    quantity: number;
    deliveryOption: string;
    phone: string;
    address?: string;
    specialRequest?: string;
}

async function createOrder(order: Order): Promise<Order> {
    const response = await fetch('http://localhost:3000/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(order),
    });
    if (!response.ok) {
        throw new Error('Failed to create order');
    }
    return response.json();
}

document.addEventListener('DOMContentLoaded', () => {
    const bookingForm = document.getElementById('bookingForm') as HTMLFormElement;

    bookingForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const formData = new FormData(bookingForm);
        const deliveryOption = (formData.get('deliveryOption') as string) || 'on-site';
        const phone = (formData.get('phone') as string) || '';
        const address = (formData.get('address') as string) || '';

        // If user chose delivery, require address and phone
        if (deliveryOption === 'delivery') {
            if (!address.trim()) {
                alert('Please enter an address for delivery.');
                return;
            }
            if (!phone.trim()) {
                alert('Please enter a phone number for delivery.');
                return;
            }
        }

        const order: Order = {
            name: formData.get('name') as string,
            email: formData.get('email') as string,
            meal: formData.get('meal') as string,
            quantity: Number(formData.get('quantity')),
            deliveryOption,
            phone,
            address,
            specialRequest: formData.get('specialRequest') as string
        };

        try {
            const response = await createOrder(order);
            // Show success message and redirect to home
            alert("Order placed successfully. We'll deliver it soon.");
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 2000);
        } catch (error) {
            console.error('Error:', error);
            alert('Order failed.');
        }
    });
});

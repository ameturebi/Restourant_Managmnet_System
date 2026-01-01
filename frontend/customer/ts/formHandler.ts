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
    const response = await fetch('/api/orders', {
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

    // showMessage helper
    function showMessage(type: 'success' | 'error' | 'warning' | 'info', title: string, message: string, autoClose = false, autoCloseMs = 2000, onClose?: () => void) {
        const modalEl = document.getElementById('messageModal') as HTMLElement;
        const titleEl = document.getElementById('messageModalTitle') as HTMLElement;
        const bodyEl = document.getElementById('messageModalBody') as HTMLElement;
        const okBtn = document.getElementById('messageModalOk') as HTMLButtonElement;
        if (modalEl && (window as any).bootstrap) {
            titleEl.textContent = title;
            bodyEl.textContent = message;
            // style modal header based on type
            const header = modalEl.querySelector('.modal-header') as HTMLElement;
            header.classList.remove('bg-success','bg-danger','bg-warning','bg-info','text-white');
            if (type === 'success') header.classList.add('bg-success','text-white');
            if (type === 'error') header.classList.add('bg-danger','text-white');
            if (type === 'warning') header.classList.add('bg-warning');
            if (type === 'info') header.classList.add('bg-info');

            const bsModal = new (window as any).bootstrap.Modal(modalEl);
            okBtn.onclick = () => {
                bsModal.hide();
                if (onClose) onClose();
            };
            bsModal.show();
            if (autoClose) {
                setTimeout(() => {
                    bsModal.hide();
                    if (onClose) onClose();
                }, autoCloseMs);
            }
        } else {
            // fallback to alert
            alert(message);
            if (onClose) onClose();
        }
    }

    bookingForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const formData = new FormData(bookingForm);
        const deliveryOption = (formData.get('deliveryOption') as string) || 'on-site';
        const phone = (formData.get('phone') as string) || '';
        const address = (formData.get('address') as string) || '';

        // If user chose delivery, require address and phone
        if (deliveryOption === 'delivery') {
            if (!address.trim()) {
                showMessage('warning', 'Missing info', 'Please enter an address for delivery.');
                return;
            }
            if (!phone.trim()) {
                showMessage('warning', 'Missing info', 'Please enter a phone number for delivery.');
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
            showMessage('success', 'Order placed', "Order placed successfully. We'll deliver it soon.", true, 2000, () => {
                window.location.href = 'index.html';
            });
        } catch (error) {
            console.error('Error:', error);
            showMessage('error', 'Error', 'Order failed. Please try again.');
        }
    });
});

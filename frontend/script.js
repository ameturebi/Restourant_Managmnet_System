"use strict";
const adminButton = document.getElementById('adminButton');
const userButton = document.getElementById('userButton');
if (adminButton) {
    adminButton.addEventListener('click', () => {
        window.location.href = 'admin/admin-index.html';
    });
}
if (userButton) {
    userButton.addEventListener('click', () => {
        window.location.href = 'customer/index.html';
    });
}

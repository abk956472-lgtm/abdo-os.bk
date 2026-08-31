// js/app.js

document.addEventListener('DOMContentLoaded', () => {
    // التحقق من حالة التاجر وتعديل الزر العلوي
    const navBtns = document.querySelector('.nav-btns');
    if (currentVendor) {
        if (navBtns) {
            navBtns.innerHTML += `
                <button class="btn btn-admin" onclick="openModal('adminModal')">لوحة التاجر 📊</button>
                <button class="btn btn-logout" onclick="logoutVendor()">خروج (${currentVendor.username})</button>
            `;
        }
    } else {
        if (navBtns) {
            navBtns.innerHTML += `
                <button class="btn btn-admin" onclick="openModal('authModal')">دخول / تسجيل تاجر 🔐</button>
            `;
        }
    }

    // تهيئة العناصر الأساسية
    renderProducts();
    renderWilayas();
    updateCartUI();

    // ربط نماذج الإدخال بالأحداث
    const regForm = document.getElementById('registerForm');
    if (regForm) regForm.addEventListener('submit', handleRegister);

    const loginForm = document.getElementById('loginForm');
    if (loginForm) loginForm.addEventListener('submit', handleLogin);

    const productForm = document.getElementById('addProductForm');
    if (productForm) productForm.addEventListener('submit', addNewProduct);

    const checkoutForm = document.getElementById('checkoutForm');
    if (checkoutForm) checkoutForm.addEventListener('submit', sendOrder);
});

// فتح النافذة المنبثقة Modal
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) modal.style.display = 'flex';
}

// إغلاق النافذة المنبثقة Modal
function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) modal.style.display = 'none';
}

// التبديل بين نموذج تسجيل الدخول والتسجيل للتاجر
function toggleAuthMode() {
    const loginBox = document.getElementById('loginBox');
    const registerBox = document.getElementById('registerBox');
    if (loginBox && registerBox) {
        if (loginBox.style.display === 'none') {
            loginBox.style.display = 'block';
            registerBox.style.display = 'none';
        } else {
            loginBox.style.display = 'none';
            registerBox.style.display = 'block';
        }
    }
}


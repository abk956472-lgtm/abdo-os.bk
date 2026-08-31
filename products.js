// js/products.js

let vendors = JSON.parse(localStorage.getItem('abdo_vendors')) || [];
let products = JSON.parse(localStorage.getItem('abdo_products')) || [
    { id: 1, title: "قميص شبابي عصري", price: 2800, img: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=400&auto=format&fit=crop&q=80", owner: "الإدارة العامة", phone: "213600000000" },
    { id: 2, title: "سترة شتوية أنيقة", price: 5500, img: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&auto=format&fit=crop&q=80", owner: "الإدارة العامة", phone: "213600000000" }
];

let currentVendor = JSON.parse(localStorage.getItem('abdo_current_vendor')) || null;

// عرض المنتجات في الصفحة الرئيسية
function renderProducts() {
    const grid = document.getElementById('productsGrid');
    if (!grid) return;
    
    if (products.length === 0) {
        grid.innerHTML = "<p style='color: #94a3b8;'>لا توجد منتجات معروضة حالياً.</p>";
        return;
    }
    
    grid.innerHTML = products.map(p => `
        <div class="product-card">
            <img src="${p.img}" alt="${p.title}" class="product-img">
            <div class="product-info">
                <div class="product-title">${p.title}</div>
                <div class="store-owner-tag">المتجر: ${p.owner}</div>
                <div class="product-price">${p.price} دج</div>
                <button class="add-to-cart-btn" onclick="addToCart(${p.id})">إضافة إلى السلة 🛒</button>
            </div>
        </div>
    `).join('');
    
    if (currentVendor) renderAdminProducts();
}

// تسجيل حساب تاجر جديد
function handleRegister(e) {
    e.preventDefault();
    const username = document.getElementById('regUser').value.trim();
    const phone = document.getElementById('regPhone').value.trim();
    const password = document.getElementById('regPass').value;

    if (vendors.some(v => v.username === username)) {
        alert("اسم المستخدم مستخدم مسبقاً، اختر اسمًا آخر!");
        return;
    }

    const newVendor = { username, phone, password };
    vendors.push(newVendor);
    localStorage.setItem('abdo_vendors', JSON.stringify(vendors));
    
    currentVendor = newVendor;
    localStorage.setItem('abdo_current_vendor', JSON.stringify(currentVendor));

    alert("تم إنشاء الحساب وتسجيل الدخول بنجاح!");
    closeModal('authModal');
    location.reload();
}

// تسجيل دخول التاجر
function handleLogin(e) {
    e.preventDefault();
    const username = document.getElementById('loginUser').value.trim();
    const password = document.getElementById('loginPass').value;

    const vendor = vendors.find(v => v.username === username && v.password === password);
    if (vendor) {
        currentVendor = vendor;
        localStorage.setItem('abdo_current_vendor', JSON.stringify(currentVendor));
        alert("مرحباً بك مجدداً يا " + vendor.username);
        closeModal('authModal');
        location.reload();
    } else {
        alert("خطأ في اسم المستخدم أو كلمة المرور!");
    }
}

// تسجيل الخروج
function logoutVendor() {
    currentVendor = null;
    localStorage.removeItem('abdo_current_vendor');
    location.reload();
    alert("تم تسجيل الخروج بنجاح.");
}

// إضافة منتج جديد للتاجر
function addNewProduct(e) {
    e.preventDefault();
    if (!currentVendor) return;

    const title = document.getElementById('newTitle').value;
    const price = Number(document.getElementById('newPrice').value);
    const img = document.getElementById('newImg').value;

    const newProd = {
        id: Date.now(),
        title,
        price,
        img,
        owner: currentVendor.username,
        phone: currentVendor.phone
    };

    products.push(newProd);
    localStorage.setItem('abdo_products', JSON.stringify(products));

    renderProducts();
    document.getElementById('newTitle').value = '';
    document.getElementById('newPrice').value = '';
    document.getElementById('newImg').value = '';
    alert("تم إضافة المنتج بنجاح وظهوره في المتجر العام!");
}

// عرض منتجات التاجر في لوحة التحكم الخاصة به
function renderAdminProducts() {
    const list = document.getElementById('adminProductsList');
    if (!list || !currentVendor) return;
    
    const myProducts = products.filter(p => p.owner === currentVendor.username);
    
    if (myProducts.length === 0) {
        list.innerHTML = "<p style='color: #94a3b8;'>ليس لديك منتجات مضافة بعد.</p>";
        return;
    }

    list.innerHTML = myProducts.map(p => `
        <div class="admin-item">
            <span>${p.title} (${p.price} دج)</span>
            <button class="delete-btn" onclick="deleteProduct(${p.id})">حذف</button>
        </div>
    `).join('');
}

// حذف منتج
function deleteProduct(id) {
    products = products.filter(p => p.id !== id);
    localStorage.setItem('abdo_products', JSON.stringify(products));
    renderProducts();
}

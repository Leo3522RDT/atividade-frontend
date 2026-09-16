/* StudioCorte - Core Application Logic */

const STORAGE_KEYS = {
  products: 'sc_products',
  settings: 'sc_settings',
  cart: 'sc_cart',
  user: 'sc_user',
  appointments: 'sc_appointments'
};

// ========== DEMO DATA ==========
const DEFAULT_PRODUCTS = [
  { id: 1, name: 'Pomada Modeladora', category: 'Pomadas', price: 45.00, stock: 24, status: 'ok', img: 'https://images.unsplash.com/photo-1620916565914-4a87f2b2f3b8?w=100&h=100&fit=crop' },
  { id: 2, name: 'Shampoo Anticaspa', category: 'Shampoo', price: 35.00, stock: 18, status: 'ok', img: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=100&h=100&fit=crop' },
  { id: 3, name: 'Óleo para Barba', category: 'Óleos e Cremes', price: 35.00, stock: 15, status: 'low', img: 'https://images.unsplash.com/photo-1608248543808-ce0b38d524b4?w=100&h=100&fit=crop' },
  { id: 4, name: 'Kit Pente + Escova', category: 'Acessórios', price: 55.00, stock: 12, status: 'ok', img: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=100&h=100&fit=crop' }
];

const DEFAULT_SETTINGS = {
  nome: 'Studio Corte',
  endereco: 'Rua das Tesouras, 123 — Centro, São Paulo/SP',
  telefone: '(11) 99999-0000',
  horario: 'Seg–Sáb 09h–20h | Dom 10h–16h'
};

const DEMO_CREDENTIALS = {
  email: 'admin@studiocorte.com',
  password: 'demo123'
};

// ========== HELPERS ==========
function getData(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function setData(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function formatMoney(v) {
  return 'R$ ' + Number(v).toFixed(2).replace('.', ',');
}

function showToast(msg, type = 'success') {
  let t = document.querySelector('.toast');
  if (!t) {
    t = document.createElement('div');
    t.className = 'toast';
    document.body.appendChild(t);
  }
  t.textContent = msg;
  t.className = `toast ${type} show`;
  setTimeout(() => t.classList.remove('show'), 3000);
}

function $(sel) { return document.querySelector(sel); }
function $$(sel) { return document.querySelectorAll(sel); }

// ========== AUTH ==========
function isLoggedIn() {
  return !!localStorage.getItem(STORAGE_KEYS.user);
}

function getUser() {
  return getData(STORAGE_KEYS.user, null);
}

function login(email, password) {
  if (email === DEMO_CREDENTIALS.email && password === DEMO_CREDENTIALS.password) {
    const user = { email, name: 'Admin Felipe', role: 'admin' };
    setData(STORAGE_KEYS.user, user);
    return true;
  }
  // Also allow client demo
  if (email === 'lucas.almeida@email.com' && password === 'cliente123') {
    const user = { email, name: 'Lucas Almeida', role: 'client' };
    setData(STORAGE_KEYS.user, user);
    return true;
  }
  return false;
}

function logout() {
  localStorage.removeItem(STORAGE_KEYS.user);
  window.location.href = '../login.html';
}

// ========== PRODUCTS ==========
function getProducts() {
  return getData(STORAGE_KEYS.products, DEFAULT_PRODUCTS);
}

function saveProducts(list) {
  setData(STORAGE_KEYS.products, list);
}

function addProduct(product) {
  const list = getProducts();
  product.id = Date.now();
  product.status = product.stock <= 15 ? 'low' : 'ok';
  list.push(product);
  saveProducts(list);
  return product;
}

function updateProduct(id, data) {
  const list = getProducts();
  const idx = list.findIndex(p => p.id === id);
  if (idx === -1) return null;
  list[idx] = { ...list[idx], ...data, status: data.stock <= 15 ? 'low' : 'ok' };
  saveProducts(list);
  return list[idx];
}

function deleteProduct(id) {
  let list = getProducts();
  list = list.filter(p => p.id !== id);
  saveProducts(list);
}

// ========== SETTINGS ==========
function getSettings() {
  return getData(STORAGE_KEYS.settings, DEFAULT_SETTINGS);
}

function saveSettings(data) {
  setData(STORAGE_KEYS.settings, data);
}

// ========== CART ==========
function getCart() {
  return getData(STORAGE_KEYS.cart, []);
}

function saveCart(cart) {
  setData(STORAGE_KEYS.cart, cart);
}

function removeFromCart(id) {
  let cart = getCart().filter(i => i.id !== id);
  saveCart(cart);
  return cart;
}

// ========== INIT DEFAULTS ==========
function ensureDefaults() {
  if (!localStorage.getItem(STORAGE_KEYS.products)) {
    saveProducts(DEFAULT_PRODUCTS);
  }
  if (!localStorage.getItem(STORAGE_KEYS.settings)) {
    saveSettings(DEFAULT_SETTINGS);
  }
}

// Run on load
ensureDefaults();

// Expose globally
window.SC = {
  login, logout, isLoggedIn, getUser,
  getProducts, addProduct, updateProduct, deleteProduct,
  getSettings, saveSettings,
  getCart, saveCart, removeFromCart,
  formatMoney, showToast, $, $$
};
import { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';
import Dashboard from './pages/Dashboard';
import Orders from './pages/Orders';
import Customers from './pages/Customers';
import { initialOrders } from './data/orders';
import { useLocalStorage } from './hooks/useLocalStorage';
import { todayISO } from './utils/format';
import './App.css';

const titles = {
  '/': 'Dashboard',
  '/orders': 'Buyurtmalar',
  '/customers': 'Mijozlar',
};

function App() {
  const { pathname } = useLocation();
  const [orders, setOrders] = useLocalStorage('daftar_orders', initialOrders);

  // Telefonda yon menyu ochiq/yopiqligi
  const [menuOpen, setMenuOpen] = useState(false);

  // Qorong'i / yorug' rejim (tanlov brauzerda saqlanadi)
  const [theme, setTheme] = useLocalStorage('daftar_theme', 'light');

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  function toggleTheme() {
    setTheme((t) => (t === 'dark' ? 'light' : 'dark'));
  }

  function addOrder(data) {
    const nextId = orders.length ? Math.max(...orders.map((o) => o.id)) + 1 : 1;

    const newOrder = {
      id: nextId,
      status: 'new',
      date: todayISO(),
      ...data,
    };

    setOrders([newOrder, ...orders]);
  }

  // Buyurtmani tahrirlash (id, status, date o'zgarmaydi)
  function updateOrder(id, data) {
    setOrders((prev) =>
      prev.map((order) => (order.id === id ? { ...order, ...data } : order))
    );
  }

  // Buyurtmani o'chirish
  function deleteOrder(id) {
    const ok = window.confirm("Buyurtmani o'chirishni xohlaysizmi?");
    if (ok) setOrders((prev) => prev.filter((order) => order.id !== id));
  }

  function updateOrderStatus(id, status) {
    setOrders((prev) =>
      prev.map((order) => (order.id === id ? { ...order, status } : order))
    );
  }

  function resetOrders() {
    const ok = window.confirm(
      "Hamma buyurtmalar o'chirilib, namunaviy ma'lumotlar qaytariladi. Davom etasizmi?"
    );
    if (ok) setOrders(initialOrders);
  }

  return (
    <div className="layout">
      <Sidebar
        onReset={resetOrders}
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
      />
      {menuOpen && (
        <div className="sidebar-backdrop" onClick={() => setMenuOpen(false)} />
      )}

      <div className="main">
        <Topbar
          title={titles[pathname] ?? 'Sahifa topilmadi'}
          onMenuClick={() => setMenuOpen(true)}
          theme={theme}
          onToggleTheme={toggleTheme}
        />

        <main className="content">
          <Routes>
            <Route path="/" element={<Dashboard orders={orders} />} />

            <Route
              path="/orders"
              element={
                <Orders
                  orders={orders}
                  onAddOrder={addOrder}
                  onUpdateOrder={updateOrder}
                  onDeleteOrder={deleteOrder}
                  onStatusChange={updateOrderStatus}
                />
              }
            />

            <Route path="/customers" element={<Customers orders={orders} />} />

            <Route
              path="*"
              element={
                <div className="card">
                  <p className="placeholder">Bunday sahifa mavjud emas.</p>
                </div>
              }
            />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default App;
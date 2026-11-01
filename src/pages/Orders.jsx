import { useState } from 'react';
import OrderForm from '../components/OrderForm';
import { STATUS_LABELS } from '../data/orders';
import { formatPrice, formatDate } from '../utils/format';

// Filtr tugmalari: "Hammasi" + barcha holatlar
const TABS = [['all', 'Hammasi'], ...Object.entries(STATUS_LABELS)];

function Orders({
  orders,
  onAddOrder,
  onUpdateOrder,
  onDeleteOrder,
  onStatusChange,
}) {
  const [showForm, setShowForm] = useState(false);
  const [editingOrder, setEditingOrder] = useState(null); // YANGI
  const [query, setQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // Ko'rinadigan ro'yxat har safar state'dan hisoblab olinadi (alohida saqlanmaydi)
  const q = query.trim().toLowerCase();
  const visibleOrders = orders.filter((order) => {
    const matchStatus = statusFilter === 'all' || order.status === statusFilter;
    const text = `${order.customer} ${order.phone} ${order.product}`.toLowerCase();
    return matchStatus && (!q || text.includes(q));
  });

  // Har bir holatdagi buyurtmalar soni: { new: 3, delivered: 2, ... }
  const counts = orders.reduce((acc, order) => {
    acc[order.status] = (acc[order.status] || 0) + 1;
    return acc;
  }, {});

  // YANGI: yangi buyurtma uchun formani ochish
  function openNew() {
    setEditingOrder(null);
    setShowForm(true);
  }

  // YANGI: tahrirlash uchun formani ochish
  function openEdit(order) {
    setEditingOrder(order);
    setShowForm(true);
  }

  // YANGI: formani yopish
  function closeForm() {
    setShowForm(false);
    setEditingOrder(null);
  }

  // O'ZGARDI: tahrirlash bo'lsa yangilaydi, bo'lmasa qo'shadi
  function handleSubmit(data) {
    if (editingOrder) {
      onUpdateOrder(editingOrder.id, data);
    } else {
      onAddOrder(data);
    }
    closeForm();
  }

  return (
    <>
      <div className="card">
        <div className="card-header">
          <h2>
            Barcha buyurtmalar <span className="count">{orders.length}</span>
          </h2>
          <button className="btn btn-primary" onClick={openNew}>
            + Yangi buyurtma
          </button>
        </div>

        <div className="toolbar">
          <input
            type="search"
            className="search-input"
            placeholder="Mijoz, telefon yoki mahsulot bo'yicha qidirish..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>

        <div className="tabs">
          {TABS.map(([key, label]) => (
            <button
              key={key}
              className={statusFilter === key ? 'tab active' : 'tab'}
              onClick={() => setStatusFilter(key)}
            >
              {label}
              <span className="tab-count">
                {key === 'all' ? orders.length : counts[key] || 0}
              </span>
            </button>
          ))}
        </div>

        {orders.length === 0 ? (
          <p className="empty-state">Hozircha buyurtma yo'q. Birinchisini qo'shing!</p>
        ) : visibleOrders.length === 0 ? (
          <p className="empty-state">Hech narsa topilmadi. Qidiruv yoki filtrni o'zgartiring.</p>
        ) : (
          <div className="table-wrap">
            <table className="table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Mijoz</th>
                  <th>Mahsulot</th>
                  <th>Summa</th>
                  <th>Manba</th>
                  <th>Holat</th>
                  <th>Sana</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {visibleOrders.map((order) => (
                  <tr key={order.id}>
                    <td>{order.id}</td>
                    <td>
                      <div className="cell-main">{order.customer}</div>
                      <div className="cell-sub">{order.phone}</div>
                    </td>
                    <td>{order.product}</td>
                    <td className="nowrap">{formatPrice(order.amount)}</td>
                    <td>{order.source}</td>
                    <td>
                      <select
                        className={`status-select badge-${order.status}`}
                        value={order.status}
                        onChange={(e) => onStatusChange(order.id, e.target.value)}
                      >
                        {Object.entries(STATUS_LABELS).map(([key, label]) => (
                          <option key={key} value={key}>
                            {label}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="nowrap">{formatDate(order.date)}</td>
                    <td className="nowrap">
                      <div className="row-actions">
                        <button
                          className="btn btn-small"
                          onClick={() => openEdit(order)}
                        >
                          Tahrirlash
                        </button>
                        <button
                          className="btn btn-small btn-danger"
                          onClick={() => onDeleteOrder(order.id)}
                        >
                          O'chirish
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {showForm && (
        <OrderForm
          key={editingOrder ? editingOrder.id : 'new'}
          order={editingOrder}
          onSubmit={handleSubmit}
          onClose={closeForm}
        />
      )}
    </>
  );
}

export default Orders;
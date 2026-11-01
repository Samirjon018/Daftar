import { useState } from 'react';
import StatCard from '../components/StatCard';
import { buildCustomers } from '../utils/customers';
import { formatPrice, formatDate, getInitials } from '../utils/format';

function Customers({ orders }) {
  const [query, setQuery] = useState('');

  const customers = buildCustomers(orders);
  const regulars = customers.filter((c) => c.ordersCount >= 2).length;

  const q = query.trim().toLowerCase();
  const visible = customers.filter(
    (c) => !q || `${c.name} ${c.phone}`.toLowerCase().includes(q)
  );

  return (
    <>
      <div className="stats-grid">
        <StatCard label="Jami mijozlar" value={customers.length} />
        <StatCard
          label="Doimiy mijozlar"
          value={regulars}
          hint="2 va undan ko'p buyurtma bergan"
        />
      </div>

      <div className="card">
        <div className="card-header">
          <h2>
            Mijozlar ro'yxati <span className="count">{customers.length}</span>
          </h2>
        </div>

        <div className="toolbar">
          <input
            type="search"
            className="search-input"
            placeholder="Ism yoki telefon bo'yicha qidirish..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>

        {customers.length === 0 ? (
          <p className="empty-state">Mijozlar buyurtma qo'shilgach paydo bo'ladi.</p>
        ) : visible.length === 0 ? (
          <p className="empty-state">Hech narsa topilmadi.</p>
        ) : (
          <div className="table-wrap">
            <table className="table">
              <thead>
                <tr>
                  <th>Mijoz</th>
                  <th>Buyurtmalar</th>
                  <th>Jami xarid</th>
                  <th>Oxirgi buyurtma</th>
                  <th>Manba</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {visible.map((c) => (
                  <tr key={c.phone}>
                    <td>
                      <div className="customer-cell">
                        <div className="avatar">{getInitials(c.name)}</div>
                        <div>
                          <div className="cell-main">{c.name}</div>
                          <div className="cell-sub">{c.phone}</div>
                        </div>
                      </div>
                    </td>
                    <td>{c.ordersCount}</td>
                    <td className="nowrap">{formatPrice(c.totalSpent)}</td>
                    <td className="nowrap">{formatDate(c.lastDate)}</td>
                    <td>{c.sources.join(', ')}</td>
                    <td>
                      {c.ordersCount >= 2 && (
                        <span className="badge badge-delivered">Doimiy</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
}

export default Customers;
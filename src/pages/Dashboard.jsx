import { Link } from 'react-router-dom';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from 'recharts';
import StatCard from '../components/StatCard';
import { STATUS_LABELS } from '../data/orders';
import { computeStats, revenueByDay } from '../utils/stats';
import { formatPrice, getInitials } from '../utils/format';

function Dashboard({ orders }) {
  const stats = computeStats(orders);
  const chartData = revenueByDay(orders, 7);

  // sort() massivni o'zgartirib yuboradi, shuning uchun avval nusxa olamiz
  const recent = [...orders]
    .sort((a, b) => b.date.localeCompare(a.date) || b.id - a.id)
    .slice(0, 5);

  return (
    <>
      <div className="stats-grid">
        <StatCard
          label="Bugungi buyurtmalar"
          value={stats.todayCount}
          hint="Bugun qabul qilingan"
        />
        <StatCard
          label="Jami savdo"
          value={formatPrice(stats.revenue)}
          hint="Bekor qilinganlarsiz"
        />
        <StatCard
          label="Yangi buyurtmalar"
          value={stats.newCount}
          hint="Javob kutayotgan"
        />
        <StatCard label="O'rtacha chek" value={formatPrice(stats.avgOrder)} />
      </div>

      <div className="card">
        <div className="card-header">
          <h2>Oxirgi 7 kunlik savdo</h2>
        </div>

        <div className="chart-box">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              margin={{ top: 8, right: 8, left: 0, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
              <XAxis
                dataKey="label"
                tickLine={false}
                axisLine={false}
                tick={{ fill: '#6B7280', fontSize: 12 }}
              />
              <YAxis
                width={48}
                tickLine={false}
                axisLine={false}
                tick={{ fill: '#6B7280', fontSize: 12 }}
                tickFormatter={(v) => (v === 0 ? '0' : `${Math.round(v / 1000)}k`)}
              />
              <Tooltip
                cursor={{ fill: '#EEF2FF' }}
                formatter={(value) => [formatPrice(value), 'Savdo']}
                labelFormatter={(label) => `Sana: ${label}`}
              />
              <Bar dataKey="revenue" fill="#4F46E5" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <h2>So'nggi buyurtmalar</h2>
          <Link to="/orders" className="link">
            Hammasini ko'rish →
          </Link>
        </div>

        <ul className="recent-list">
          {recent.map((order) => (
            <li key={order.id} className="recent-item">
              <div className="customer-cell">
                <div className="avatar">{getInitials(order.customer)}</div>
                <div>
                  <div className="cell-main">{order.customer}</div>
                  <div className="cell-sub">{order.product}</div>
                </div>
              </div>

              <div className="recent-right">
                <span className="cell-main nowrap">{formatPrice(order.amount)}</span>
                <span className={`badge badge-${order.status}`}>
                  {STATUS_LABELS[order.status]}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default Dashboard;
import { NavLink } from 'react-router-dom';

const menu = [
  { label: 'Dashboard', icon: '📊', to: '/' },
  { label: 'Buyurtmalar', icon: '🧾', to: '/orders' },
  { label: 'Mijozlar', icon: '👥', to: '/customers' },
];

// O'ZGARDI: open va onClose proplari qo'shildi
function Sidebar({ onReset, open, onClose }) {
  return (
    <aside className={open ? 'sidebar open' : 'sidebar'}>
      <div className="sidebar-logo">
        <span className="mark">D</span>
        Daftar
      </div>

      <nav className="sidebar-nav">
        {menu.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === '/'}
            onClick={onClose}
            className={({ isActive }) =>
              isActive ? 'nav-item active' : 'nav-item'
            }
          >
            <span>{item.icon}</span>
            {item.label}
          </NavLink>
        ))}
      </nav>

      <div className="sidebar-footer">
        <button className="reset-btn" onClick={onReset}>
          ↺ Namunaviy ma'lumotlar
        </button>
        <span>Daftar v0.1</span>
      </div>
    </aside>
  );
}

export default Sidebar;
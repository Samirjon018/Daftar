function Topbar({ title, onMenuClick, theme, onToggleTheme }) {
  return (
    <header className="topbar">
      <button
        className="menu-btn"
        onClick={onMenuClick}
        aria-label="Menyuni ochish"
      >
        ☰
      </button>
      <h1>{title}</h1>
      <div className="user-chip">
        <button
          className="theme-btn"
          onClick={onToggleTheme}
          aria-label="Rejimni almashtirish"
        >
          {theme === 'dark' ? '☀️' : '🌙'}
        </button>
        <span>Mening do'konim</span>
        <div className="avatar">M</div>
      </div>
    </header>
  );
}

export default Topbar;
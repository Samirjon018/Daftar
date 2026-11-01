// O'ZGARDI: onMenuClick prop va ☰ tugmasi qo'shildi
function Topbar({ title, onMenuClick }) {
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
        <span>Mening do'konim</span>
        <div className="avatar">M</div>
      </div>
    </header>
  );
}

export default Topbar;
function Sidebar({ setPagina }) {
  return (
    <div className="sidebar">
      <h2>Menu</h2>

      <button onClick={() => setPagina('dashboard')}>
        Dashboard
      </button>

      <button onClick={() => setPagina('perfil')}>
        Perfil
      </button>
    </div>
  );
}

export default Sidebar;
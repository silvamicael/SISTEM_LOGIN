function Navbar({ onLogout }) {
  return (
    <div className="navbar">
      <h3>Sistema</h3>
      <button onClick={onLogout}>Sair</button>
    </div>
  );
}

export default Navbar;
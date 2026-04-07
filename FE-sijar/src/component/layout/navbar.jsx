function Navbar() {
  const [open, setOpen] = useState(false);
  const links = ["Beranda", "Tentang", "Jurusan", "Barang", "Kontak"];
  return (
    <nav className="navbar">
      <div className="nav-inner">
        <a href="#home" style={{ display: "flex", alignItems: "center", gap: ".5rem", textDecoration: "none" }}>
          <div style={{ width: 38, height: 38, borderRadius: 10, background: "var(--blue-ltr)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>📦</div>
          <span style={{ fontFamily: "'Plus Jakarta Sans'", fontWeight: 800, fontSize: "1.2rem", color: "var(--blue)" }}>SIJAR</span>
        </a>
 
        <div className="hide-md" style={{ display: "flex", alignItems: "center", gap: "2rem" }}>
          {links.map(l => (
            <a key={l} href={`#${l.toLowerCase()}`} className="nav-link">{l}</a>
          ))}
        </div>
 
        <div style={{ display: "flex", alignItems: "center", gap: ".75rem" }}>
          <a href="#home" className="btn-primary hide-md" style={{ display: "inline-flex" }}>
            <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 3h4a2 2 0 012 2v14a2 2 0 01-2 2h-4m-5-4l5-5-5-5m5 5H3"/></svg>
            Login
          </a>
          <button className="show-md" onClick={() => setOpen(!open)} style={{ border: "none", background: "transparent", cursor: "pointer", color: "var(--blue)", padding: ".4rem" }}>
            <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              {open ? <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/> : <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16"/>}
            </svg>
          </button>
        </div>
      </div>
 
      {open && (
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: ".5rem 0" }}>
          <div style={{ background: "#fff", borderRadius: 16, padding: "1rem", boxShadow: "0 4px 20px rgba(74,144,217,.12)", display: "flex", flexDirection: "column", gap: ".6rem" }}>
            {links.map(l => <a key={l} href={`#${l.toLowerCase()}`} className="nav-link" onClick={() => setOpen(false)} style={{ padding: ".35rem 0" }}>{l}</a>)}
            <a href="#home" className="btn-primary" style={{ justifyContent: "center", marginTop: ".25rem" }}>Login</a>
          </div>
        </div>
      )}
    </nav>
  );
}
export default Navbar
import { useState } from "react";
import { useNavigate } from "react-router-dom";

// ─── Global CSS ───────────────────────────────────────────────────────────────
export const adminCss = `
  @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=DM+Sans:wght@400;500;600&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  :root {
    --blue:#4A90D9; --blue-lt:#7BB8E8; --blue-ltr:#D6EAFA;
    --blue-dk:#2563A8; --blue-dkr:#1A3F70;
    --sky:#F0F7FF; --white:#FFFFFF;
    --tx:#1E3A5F; --tx-m:#6B8BAD;
    --green:#3DBD8F; --yellow:#F5C842; --red:#E05252;
    --radius:14px;
    --shadow:0 2px 16px rgba(74,144,217,.08);
    --shadow-h:0 6px 28px rgba(74,144,217,.16);
  }
  html { scroll-behavior:smooth; }
  body { font-family:'DM Sans',sans-serif; }
  ::-webkit-scrollbar{width:5px;} ::-webkit-scrollbar-track{background:var(--sky);} ::-webkit-scrollbar-thumb{background:var(--blue-ltr);border-radius:99px;}

  /* ── Layout ── */
  .admin-root{display:flex;height:100vh;overflow:hidden;background:var(--sky);color:var(--tx);}

  /* ── Sidebar ── */
  .sidebar{width:240px;flex-shrink:0;background:var(--white);border-right:1px solid var(--blue-ltr);display:flex;flex-direction:column;transition:width .3s ease;overflow:hidden;}
  .sidebar.collapsed{width:68px;}
  .sb-logo{padding:1.1rem 1rem;display:flex;align-items:center;gap:.6rem;border-bottom:1px solid var(--blue-ltr);min-height:64px;}
  .sb-logo-icon{width:38px;height:38px;border-radius:11px;background:var(--blue-dkr);display:flex;align-items:center;justify-content:center;font-size:19px;flex-shrink:0;}
  .sb-logo-text{font-family:'Plus Jakarta Sans',sans-serif;font-weight:800;font-size:1.1rem;color:var(--blue-dkr);white-space:nowrap;overflow:hidden;line-height:1.1;}
  .sb-logo-sub{font-size:.62rem;color:var(--tx-m);font-weight:500;}
  .sb-nav{padding:.65rem .6rem;flex:1;overflow-y:auto;overflow-x:hidden;}
  .sb-section-label{font-size:.62rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:var(--tx-m);padding:.5rem .75rem .25rem;white-space:nowrap;overflow:hidden;}
  .sb-item{display:flex;align-items:center;gap:.7rem;padding:.58rem .75rem;border-radius:10px;font-size:.82rem;font-weight:500;color:var(--tx-m);cursor:pointer;transition:.2s;white-space:nowrap;overflow:hidden;text-decoration:none;border:none;background:none;width:100%;text-align:left;}
  .sb-item:hover{background:var(--sky);color:var(--blue-dk);}
  .sb-item.active{background:var(--blue-dkr);color:#fff;font-weight:700;}
  .sb-item.active .sb-item-icon{filter:brightness(10);}
  .sb-item-icon{font-size:15px;flex-shrink:0;width:20px;text-align:center;}
  .sb-badge{margin-left:auto;background:var(--red);color:#fff;font-size:.6rem;font-weight:700;padding:.15rem .45rem;border-radius:99px;flex-shrink:0;}
  .sb-user{padding:.85rem 1rem;border-top:1px solid var(--blue-ltr);display:flex;align-items:center;gap:.65rem;overflow:hidden;}
  .sb-user-info{overflow:hidden;}
  .avatar{flex-shrink:0;border-radius:50%;display:flex;align-items:center;justify-content:center;font-family:'Plus Jakarta Sans',sans-serif;font-weight:700;}

  /* ── Main ── */
  .main-area{flex:1;display:flex;flex-direction:column;overflow:hidden;}
  .topbar{background:var(--white);border-bottom:1px solid var(--blue-ltr);padding:.75rem 1.5rem;display:flex;align-items:center;justify-content:space-between;min-height:64px;gap:1rem;flex-shrink:0;}
  .topbar-left{display:flex;align-items:center;gap:.75rem;}
  .topbar-right{display:flex;align-items:center;gap:.85rem;}
  .page-title{font-family:'Plus Jakarta Sans',sans-serif;font-weight:700;font-size:.95rem;color:var(--blue-dkr);}
  .breadcrumb{font-size:.75rem;color:var(--tx-m);}
  .search-box{background:var(--sky);border:1px solid var(--blue-ltr);border-radius:10px;padding:.42rem .9rem .42rem 2.1rem;font-size:.82rem;color:var(--tx);width:220px;transition:border .2s;}
  .search-box:focus{outline:none;border-color:var(--blue-lt);}
  .search-wrap{position:relative;}
  .search-icon{position:absolute;left:.7rem;top:50%;transform:translateY(-50%);color:var(--tx-m);pointer-events:none;}
  .icon-btn{width:36px;height:36px;border-radius:10px;border:1px solid var(--blue-ltr);background:var(--white);display:flex;align-items:center;justify-content:center;cursor:pointer;transition:.2s;font-size:15px;position:relative;}
  .icon-btn:hover{background:var(--sky);border-color:var(--blue-lt);}
  .notif-dot{position:absolute;top:6px;right:6px;width:7px;height:7px;border-radius:50%;background:var(--red);border:1.5px solid var(--white);}
  .admin-chip{background:var(--blue-dkr);color:#fff;font-size:.68rem;font-weight:700;padding:.22rem .65rem;border-radius:99px;}

  /* ── Content ── */
  .content-area{flex:1;overflow-y:auto;padding:1.5rem 1.75rem;}

  /* ── Cards ── */
  .stats-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:.85rem;margin-bottom:1.25rem;}
  .stat-card{background:var(--white);border-radius:var(--radius);border:1px solid var(--blue-ltr);padding:1.1rem 1.1rem .9rem;transition:box-shadow .25s,transform .25s;}
  .stat-card:hover{box-shadow:var(--shadow-h);transform:translateY(-2px);}
  .stat-icon-wrap{width:38px;height:38px;border-radius:11px;display:flex;align-items:center;justify-content:center;margin-bottom:.75rem;font-size:18px;}
  .stat-label{font-size:.73rem;color:var(--tx-m);font-weight:500;margin-bottom:.25rem;}
  .stat-val{font-family:'Plus Jakarta Sans',sans-serif;font-weight:800;font-size:1.75rem;color:var(--blue-dkr);line-height:1;margin-bottom:.4rem;}
  .stat-pill{display:inline-flex;align-items:center;gap:.3rem;font-size:.68rem;font-weight:600;padding:.2rem .55rem;border-radius:99px;}
  .pill-green{background:#EAF7F0;color:#2A9D6E;} .pill-blue{background:var(--blue-ltr);color:var(--blue-dk);} .pill-yellow{background:#FEF9EC;color:#C4973A;} .pill-red{background:#FEE7E6;color:#C0503E;}

  .grid-2{display:grid;grid-template-columns:1fr 1fr;gap:.85rem;margin-bottom:.85rem;}
  .grid-3{display:grid;grid-template-columns:1fr 1fr 1fr;gap:.85rem;margin-bottom:.85rem;}
  .card{background:var(--white);border-radius:var(--radius);border:1px solid var(--blue-ltr);padding:1.1rem;}
  .card-title{font-family:'Plus Jakarta Sans',sans-serif;font-weight:700;font-size:.83rem;color:var(--blue-dkr);margin-bottom:.9rem;display:flex;align-items:center;justify-content:space-between;gap:.5rem;}
  .card-action{font-size:.72rem;font-weight:600;color:var(--blue);cursor:pointer;text-decoration:none;flex-shrink:0;}
  .card-action:hover{text-decoration:underline;}
  .card-badge{font-size:.65rem;font-weight:700;background:var(--blue-ltr);color:var(--blue-dk);padding:.18rem .5rem;border-radius:99px;}

  /* ── Table ── */
  .tbl-btn{width:26px;height:26px;border-radius:7px;border:none;cursor:pointer;font-size:12px;font-weight:700;display:flex;align-items:center;justify-content:center;transition:.15s;}
  .tbl-btn-ok{background:#EAF7F0;color:#2A9D6E;} .tbl-btn-ok:hover{background:#2A9D6E;color:#fff;}
  .tbl-btn-del{background:#FEE7E6;color:#C0503E;} .tbl-btn-del:hover{background:#C0503E;color:#fff;}
  .tbl-btn-eye{background:var(--blue-ltr);color:var(--blue-dk);} .tbl-btn-eye:hover{background:var(--blue);color:#fff;}
  .tbl-btn-edit{background:#FEF9EC;color:#C4973A;} .tbl-btn-edit:hover{background:#C4973A;color:#fff;}

  /* ── Status badges ── */
  .status-badge{font-size:.68rem;font-weight:700;padding:.22rem .6rem;border-radius:99px;flex-shrink:0;}
  .s-ok{background:#EAF7F0;color:#2A9D6E;}
  .s-pend{background:#FEF9EC;color:#C4973A;}
  .s-late{background:#FEE7E6;color:#C0503E;}
  .s-done{background:var(--blue-ltr);color:var(--blue-dk);}

  /* ── Buttons ── */
  .btn-primary{display:inline-flex;align-items:center;gap:.45rem;background:var(--blue);color:#fff;font-family:'Plus Jakarta Sans',sans-serif;font-weight:700;font-size:.82rem;padding:.6rem 1.25rem;border-radius:10px;border:none;cursor:pointer;transition:.22s;text-decoration:none;}
  .btn-primary:hover{background:var(--blue-dk);transform:translateY(-1px);}
  .btn-danger{display:inline-flex;align-items:center;gap:.45rem;background:var(--red);color:#fff;font-family:'Plus Jakarta Sans',sans-serif;font-weight:700;font-size:.82rem;padding:.6rem 1.25rem;border-radius:10px;border:none;cursor:pointer;transition:.22s;}
  .btn-danger:hover{background:#c03a3a;}
  .btn-ghost{display:inline-flex;align-items:center;gap:.35rem;background:transparent;color:var(--blue);font-size:.8rem;font-weight:600;padding:.5rem 1rem;border-radius:10px;border:1px solid var(--blue-ltr);cursor:pointer;transition:.22s;text-decoration:none;}
  .btn-ghost:hover{background:var(--blue-ltr);}

  /* ── Form ── */
  .form-group{margin-bottom:1rem;}
  .form-label{display:block;font-size:.78rem;font-weight:600;color:var(--blue-dkr);margin-bottom:.4rem;}
  .form-input{width:100%;background:var(--sky);border:1px solid var(--blue-ltr);border-radius:10px;padding:.55rem .85rem;font-size:.83rem;color:var(--tx);font-family:'DM Sans',sans-serif;transition:border .2s;}
  .form-input:focus{outline:none;border-color:var(--blue);background:var(--white);}
  .form-select{width:100%;background:var(--sky);border:1px solid var(--blue-ltr);border-radius:10px;padding:.55rem .85rem;font-size:.83rem;color:var(--tx);font-family:'DM Sans',sans-serif;cursor:pointer;}
  .form-select:focus{outline:none;border-color:var(--blue);}

  /* ── Modal ── */
  .modal-overlay{position:fixed;inset:0;background:rgba(26,63,112,.35);backdrop-filter:blur(4px);display:flex;align-items:center;justify-content:center;z-index:999;padding:1rem;}
  .modal-box{background:var(--white);border-radius:20px;padding:1.75rem;width:100%;max-width:480px;box-shadow:0 20px 60px rgba(26,63,112,.2);}
  .modal-title{font-family:'Plus Jakarta Sans',sans-serif;font-weight:800;font-size:1.1rem;color:var(--blue-dkr);margin-bottom:1.25rem;}

  /* ── Responsive ── */
  @media(max-width:900px){
    .stats-grid{grid-template-columns:repeat(2,1fr);}
    .grid-2,.grid-3{grid-template-columns:1fr;}
    .sidebar{width:68px;}
    .sb-logo-text,.sb-logo-sub,.sb-section-label,.sb-item span:not(.sb-item-icon),.sb-badge,.sb-user-info{display:none;}
  }
`;

const navItems = [
  { section: "Utama" },
  { icon: "🏠", label: "Dashboard",     id: "dashboard" },
  { icon: "📋", label: "Peminjaman",    id: "peminjaman", badge: "7" },
  { icon: "📦", label: "Inventaris",    id: "inventaris" },
  { section: "Manajemen" },
  { icon: "👥", label: "Data Siswa",    id: "siswa" },
  { icon: "🏫", label: "Jurusan",       id: "jurusan" },
  { icon: "📊", label: "Laporan",       id: "laporan" },
  { section: "Sistem" },
  { icon: "⚙️", label: "Pengaturan",   id: "setting" },
];

function getInitials(name = "") {
  return name.split(" ").map(w => w[0]).join("").toUpperCase().slice(0, 2);
}

export default function AdminLayout({ activePage, onNav, children }) {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);

  function handleNav(id) {
    if (onNav) onNav(id);
    else navigate(`/admin/${id}`);
  }

  function handleLogout() {
    localStorage.removeItem("sijar_admin");
    navigate("/login");
  }

  const admin = JSON.parse(localStorage.getItem("sijar_admin") || '{"name":"Admin SIJAR","role":"Super Admin"}');

  return (
    <>
      <style>{adminCss}</style>
      <div className="admin-root">
        {/* Sidebar */}
        <aside className={`sidebar${collapsed ? " collapsed" : ""}`}>
          <div className="sb-logo">
            <div className="sb-logo-icon">🛡️</div>
            {!collapsed && (
              <div>
                <div className="sb-logo-text">SIJAR</div>
                <div className="sb-logo-sub">Admin Panel</div>
              </div>
            )}
            <button onClick={() => setCollapsed(c => !c)}
              style={{ marginLeft:"auto", border:"none", background:"none", cursor:"pointer", color:"var(--tx-m)", fontSize:18, padding:0, flexShrink:0 }}>
              {collapsed ? "›" : "‹"}
            </button>
          </div>

          <nav className="sb-nav">
            {navItems.map((item, i) => {
              if (item.section) return collapsed ? null : (
                <div key={i} className="sb-section-label">{item.section}</div>
              );
              return (
                <button key={item.id}
                  className={`sb-item${activePage === item.id ? " active" : ""}`}
                  onClick={() => handleNav(item.id)}
                  title={collapsed ? item.label : undefined}
                >
                  <span className="sb-item-icon">{item.icon}</span>
                  {!collapsed && <span>{item.label}</span>}
                  {!collapsed && item.badge && <span className="sb-badge">{item.badge}</span>}
                </button>
              );
            })}
          </nav>

          <div className="sb-user">
            <div className="avatar" style={{ width:34, height:34, fontSize:".75rem", background:"var(--blue-dkr)", color:"#fff" }}>
              {getInitials(admin.name)}
            </div>
            {!collapsed && (
              <div className="sb-user-info">
                <div style={{ fontSize:".8rem", fontWeight:600, color:"var(--tx)", whiteSpace:"nowrap", overflow:"hidden", maxWidth:120 }}>{admin.name}</div>
                <div style={{ fontSize:".68rem", color:"var(--tx-m)" }}>{admin.role}</div>
              </div>
            )}
          </div>
        </aside>

        {/* Main */}
        <div className="main-area">
          <header className="topbar">
            <div className="topbar-left">
              <span className="admin-chip">👑 Admin</span>
              <span className="page-title">
                {navItems.find(n => n.id === activePage)?.label || "Dashboard"}
              </span>
            </div>
            <div className="topbar-right">
              <div className="search-wrap">
                <span className="search-icon">
                  <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <circle cx="11" cy="11" r="8"/><path strokeLinecap="round" d="M21 21l-4.35-4.35"/>
                  </svg>
                </span>
                <input className="search-box" placeholder="Cari data..." />
              </div>
              <div className="icon-btn" title="Notifikasi">🔔<div className="notif-dot"/></div>
              <div className="icon-btn" onClick={handleLogout} title="Logout" style={{ cursor:"pointer" }}>🚪</div>
              <div className="avatar" style={{ width:34, height:34, fontSize:".75rem", background:"var(--blue-dkr)", color:"#fff", cursor:"pointer" }}>
                {getInitials(admin.name)}
              </div>
            </div>
          </header>

          <main className="content-area">
            {children}
          </main>
        </div>
      </div>
    </>
  );
}
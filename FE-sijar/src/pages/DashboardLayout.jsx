import { useState, useRef, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logoPeminjaman from "../assets/logo.png";

// ─── TOKENS (unchanged) ───────────────────────────────────────────────────────
const C = {
  ink:     "#07152B", navy:    "#0F2D52", blue:    "#1A5EAB",
  blueMd:  "#2E80D8", blueLt:  "#5FA8E8", bluePale:"#C2DFF7",
  sky:     "#EBF5FD", cyan:    "#06B6D4", teal:    "#0D9488",
  green:   "#10B981", yellow:  "#F59E0B", red:     "#EF4444",
  white:   "#FFFFFF", tx:      "#0F2D52", txM:     "#4A6FA5",
  txL:     "#8AAED4", border:  "rgba(30,90,171,.10)",
};

const navItems = [
  {
    group: "UTAMA",
    items: [
      { to:"/dashboard",            label:"Dashboard",          badge:null,  icon:<svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/></svg> },
      { to:"/dashboard/peminjaman", label:"Peminjaman Barang",  badge:"Baru",icon:<svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M20 7H4a2 2 0 00-2 2v10a2 2 0 002 2h16a2 2 0 002-2V9a2 2 0 00-2-2z"/><path strokeLinecap="round" strokeLinejoin="round" d="M16 3H8a2 2 0 00-2 2v2h12V5a2 2 0 00-2-2z"/></svg> },
      { to:"/dashboard/riwayat",    label:"Riwayat Peminjaman", badge:null,  icon:<svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/></svg> },
      { to:"/dashboard/inventaris", label:"Inventaris",          badge:null,  icon:<svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 7l9-4 9 4v10l-9 4-9-4V7z"/><path strokeLinecap="round" strokeLinejoin="round" d="M12 3v18M3 7l9 4 9-4"/></svg> },
      { to:"/dashboard/jurusan",    label:"Data Jurusan",        badge:null,  icon:<svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/></svg> },
    ],
  },
  {
    group: "AKUN",
    items: [
      { to:"/dashboard/profile",  label:"Profil Saya", badge:null, icon:<svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg> },
      { to:"/dashboard/settings", label:"Pengaturan",  badge:null, icon:<svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"/><path strokeLinecap="round" strokeLinejoin="round" d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/></svg> },
    ],
  },
];

const notifList = [
  { id:1, title:"Barang Terlambat!",       desc:"Arduino Uno kamu sudah 6 hari melewati batas waktu.", tipe:"red",   tgl:"Hari ini", read:false },
  { id:2, title:"Pemeliharaan Peralatan",   desc:"Seluruh alat elektronik dicek 22–23 April 2025.",    tipe:"blue",  tgl:"14 Apr",   read:false },
  { id:3, title:"Kebijakan Baru",           desc:"Maksimal peminjaman jadi 5 barang mulai Mei 2025.",  tipe:"green", tgl:"12 Apr",   read:true  },
  { id:4, title:"Peminjaman Disetujui",     desc:"Laptop Asus VivoBook berhasil dipinjam.",            tipe:"teal",  tgl:"10 Apr",   read:true  },
];

const tipeStyle = {
  red:  { bg:"#FEE2E2", c:"#991B1B", dot:"#EF4444", icon:"⚠️" },
  blue: { bg:"#DBEAFE", c:"#1E40AF", dot:"#2E80D8", icon:"📢" },
  green:{ bg:"#D1FAE5", c:"#065F46", dot:"#10B981", icon:"✅" },
  teal: { bg:"#CCFBF1", c:"#134E4A", dot:"#0D9488", icon:"📦" },
};

const breadcrumbMap = {
  "/dashboard":            ["Dashboard"],
  "/dashboard/peminjaman": ["Dashboard","Peminjaman Barang"],
  "/dashboard/riwayat":    ["Dashboard","Riwayat Peminjaman"],
  "/dashboard/inventaris": ["Dashboard","Inventaris"],
  "/dashboard/jurusan":    ["Dashboard","Data Jurusan"],
  "/dashboard/profile":    ["Dashboard","Profil Saya"],
  "/dashboard/settings":   ["Dashboard","Pengaturan"],
};

// ─── CSS ─────────────────────────────────────────────────────────────────────
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&family=DM+Mono:wght@400;500&display=swap');

*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
body{font-family:'Plus Jakarta Sans',sans-serif;background:#EBF5FD;color:#0F2D52}

::-webkit-scrollbar{width:4px;height:4px}
::-webkit-scrollbar-track{background:transparent}
::-webkit-scrollbar-thumb{background:#C2DFF7;border-radius:99px}
::-webkit-scrollbar-thumb:hover{background:#5FA8E8}

/* ── Keyframes ── */
@keyframes dropIn      {from{opacity:0;transform:translateY(-10px) scale(.97)}to{opacity:1;transform:translateY(0) scale(1)}}
@keyframes fadeInUp    {from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}
@keyframes fadeIn      {from{opacity:0}to{opacity:1}}
@keyframes pulse       {0%,100%{opacity:1;transform:scale(1)}50%{opacity:.6;transform:scale(1.4)}}
@keyframes shimmer     {from{transform:translateX(-120%)}to{transform:translateX(120%)}}
@keyframes slideRight  {from{opacity:0;transform:translateX(-8px)}to{opacity:1;transform:translateX(0)}}
@keyframes notifReveal {from{opacity:0;transform:translateY(8px) scale(.98)}to{opacity:1;transform:translateY(0) scale(1)}}
@keyframes gradientPan {0%{background-position:0% 50%}50%{background-position:100% 50%}100%{background-position:0% 50%}}

/* ── Sidebar nav item ── */
.sb-link {
  display:flex; align-items:center; gap:.7rem;
  padding:.6rem .85rem; border-radius:13px; margin-bottom:.18rem;
  text-decoration:none; position:relative;
  transition:background .2s, transform .18s;
  overflow:hidden;
}
.sb-link::before {
  content:''; position:absolute; left:0; top:18%; bottom:18%;
  width:3px; border-radius:0 3px 3px 0;
  background:linear-gradient(180deg,#2E80D8,#06B6D4);
  transform:scaleY(0); transition:transform .22s cubic-bezier(.22,1,.36,1);
}
.sb-link.active::before { transform:scaleY(1); }
.sb-link.active { background:linear-gradient(135deg,rgba(46,128,216,.15),rgba(6,182,212,.08)); }
.sb-link:not(.active):hover { background:rgba(46,128,216,.07); transform:translateX(3px); }

/* Shimmer on active */
.sb-link.active .sb-shimmer {
  position:absolute; inset:0;
  background:linear-gradient(105deg,transparent 35%,rgba(255,255,255,.35) 50%,transparent 65%);
  animation:shimmer 2.5s ease infinite;
  pointer-events:none;
}

.sb-tooltip {
  display:none; position:absolute; left:calc(100% + 14px); top:50%;
  transform:translateY(-50%);
  background:#07152B; color:#fff; font-size:.73rem; font-weight:700;
  white-space:nowrap; padding:.4rem .85rem; border-radius:10px;
  pointer-events:none; z-index:9999;
  box-shadow:0 6px 20px rgba(7,21,43,.28);
  font-family:'Plus Jakarta Sans',sans-serif;
  animation:fadeIn .15s ease;
}
.sb-tooltip::before {
  content:''; position:absolute; right:100%; top:50%;
  transform:translateY(-50%);
  border:5px solid transparent; border-right-color:#07152B;
}
.sb-link:hover .sb-tooltip { display:block; }

/* ── Topbar button ── */
.tb-btn {
  background:transparent; border:1.5px solid rgba(30,90,171,.10);
  border-radius:12px; width:38px; height:38px;
  display:flex; align-items:center; justify-content:center;
  cursor:pointer; color:#4A6FA5; position:relative;
  transition:background .2s, border-color .2s, color .2s, transform .18s, box-shadow .2s;
  font-family:inherit;
}
.tb-btn:hover {
  background:#EBF5FD; border-color:rgba(46,128,216,.25);
  color:#1A5EAB; transform:scale(1.06);
  box-shadow:0 2px 12px rgba(46,128,216,.14);
}
.tb-btn.active {
  background:#EBF5FD; border-color:rgba(46,128,216,.30);
  color:#1A5EAB;
}

/* ── Notif pulse dot ── */
.notif-pulse {
  position:absolute; top:6px; right:6px;
  width:8px; height:8px;
  background:#EF4444; border-radius:50%;
  border:2px solid #fff;
  animation:pulse 2s infinite;
}
.notif-pulse::after {
  content:''; position:absolute; inset:-3px;
  border-radius:50%; border:1.5px solid rgba(239,68,68,.4);
  animation:pulse 2s infinite reverse;
}

/* ── Breadcrumb ── */
.crumb-link {
  font-size:.77rem; font-weight:600; color:#4A6FA5;
  text-decoration:none; transition:color .15s;
  padding:.1rem .35rem; border-radius:6px;
}
.crumb-link:hover { color:#2E80D8; background:rgba(46,128,216,.08); }

/* ── Notif item ── */
.notif-item {
  display:flex; gap:.75rem; padding:.8rem .9rem;
  border-radius:13px; margin-bottom:.25rem;
  cursor:pointer; transition:background .15s, transform .18s;
  position:relative; animation:notifReveal .3s ease both;
}
.notif-item:hover { transform:translateX(3px); }

/* ── User card in sidebar ── */
.sb-user-card {
  display:flex; align-items:center; gap:.65rem;
  padding:.65rem .8rem; border-radius:14px;
  background:linear-gradient(135deg,#EBF5FD,#F0F6FE);
  border:1px solid rgba(30,90,171,.10);
  transition:background .2s, box-shadow .2s;
  cursor:default;
}
.sb-user-card:hover { background:linear-gradient(135deg,#dbeafe,#EBF5FD); box-shadow:0 2px 12px rgba(46,128,216,.10); }

/* ── Mobile ── */
@media(max-width:768px){
  .dl-sidebar{position:fixed !important;z-index:200;left:0;top:0;bottom:0;transform:translateX(-100%);width:265px !important;transition:transform .28s cubic-bezier(.4,0,.2,1) !important;box-shadow:none !important}
  .dl-sidebar.mob-open{transform:translateX(0) !important;box-shadow:8px 0 40px rgba(15,45,82,.18) !important}
  .dl-main{margin-left:0 !important}
  .dl-desktop-toggle{display:none !important}
  .dl-mobile-toggle{display:flex !important}
}
.dl-mobile-toggle{display:none}
.mob-overlay{display:none;position:fixed;inset:0;background:rgba(7,21,43,.45);backdrop-filter:blur(4px);z-index:199;animation:fadeIn .2s ease}
@media(max-width:768px){.mob-overlay.open{display:block}}
`;

// ─── SideLink ─────────────────────────────────────────────────────────────────
function SideLink({ item, active, collapsed }) {
  return (
    <Link to={item.to} className={`sb-link${active?" active":""}`}
      style={{ justifyContent: collapsed ? "center" : "flex-start", padding: collapsed ? ".6rem" : ".6rem .85rem" }}>
      {active && <span className="sb-shimmer" />}
      <span style={{ color:active?"#2E80D8":"#4A6FA5", flexShrink:0, display:"flex", transition:"color .2s" }}>
        {item.icon}
      </span>
      {!collapsed && (
        <span style={{ fontSize:".84rem", fontWeight:active?700:500, color:active?"#0F2D52":"#4A6FA5", flex:1, whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis", transition:"color .2s" }}>
          {item.label}
        </span>
      )}
      {!collapsed && item.badge && (
        <span style={{ fontSize:".58rem", fontWeight:800, background:"linear-gradient(135deg,#2E80D8,#06B6D4)", color:"#fff", padding:".16rem .55rem", borderRadius:999, letterSpacing:".05em", boxShadow:"0 2px 8px rgba(46,128,216,.35)" }}>
          {item.badge}
        </span>
      )}
      {collapsed && <span className="sb-tooltip">{item.label}</span>}
    </Link>
  );
}

// ─── Notif Dropdown ───────────────────────────────────────────────────────────
function NotifDropdown({ onClose }) {
  const [items, setItems] = useState(notifList);
  const ref = useRef(null);

  useEffect(() => {
    const h = e => { if (ref.current && !ref.current.contains(e.target)) onClose(); };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, [onClose]);

  const unread = items.filter(i => !i.read).length;

  return (
    <div ref={ref} style={{
      position:"absolute", top:"calc(100% + 14px)", right:0, width:350, zIndex:999,
      background:"#fff", borderRadius:22,
      border:"1px solid rgba(30,90,171,.08)",
      boxShadow:"0 24px 72px rgba(15,45,82,.18), 0 4px 20px rgba(15,45,82,.08), 0 0 0 1px rgba(255,255,255,.6)",
      overflow:"hidden",
      animation:"dropIn .22s cubic-bezier(.22,1,.36,1) both",
    }}>
      {/* Header */}
      <div style={{
        padding:"1.1rem 1.25rem .9rem",
        background:"linear-gradient(135deg,#07152B 0%,#0F2D52 55%,#1A5EAB 100%)",
        backgroundSize:"200% 200%", animation:"gradientPan 6s ease infinite",
        display:"flex", alignItems:"center", justifyContent:"space-between",
        position:"relative", overflow:"hidden",
      }}>
        {/* deco circle */}
        <div style={{ position:"absolute",top:-30,right:-30,width:110,height:110,borderRadius:"50%",border:"1.5px solid rgba(255,255,255,.08)",pointerEvents:"none" }} />

        <div>
          <p style={{ fontWeight:800, fontSize:".92rem", color:"#fff", fontFamily:"'Plus Jakarta Sans',sans-serif", letterSpacing:"-.2px" }}>
            Notifikasi
          </p>
          <p style={{ fontSize:".7rem", color:"rgba(255,255,255,.5)", marginTop:".12rem" }}>
            {unread > 0 ? `${unread} belum dibaca` : "Semua sudah dibaca ✓"}
          </p>
        </div>

        {unread > 0 && (
          <button
            onClick={() => setItems(items.map(i => ({...i, read:true})))}
            style={{ background:"rgba(255,255,255,.12)", border:"1px solid rgba(255,255,255,.2)", color:"rgba(255,255,255,.9)", borderRadius:10, padding:".3rem .8rem", fontSize:".72rem", fontWeight:700, cursor:"pointer", fontFamily:"inherit", transition:"background .15s" }}
            onMouseEnter={e => e.currentTarget.style.background="rgba(255,255,255,.22)"}
            onMouseLeave={e => e.currentTarget.style.background="rgba(255,255,255,.12)"}
          >
            Baca semua
          </button>
        )}
      </div>

      {/* Items */}
      <div style={{ maxHeight:340, overflowY:"auto", padding:".6rem .55rem" }}>
        {items.map((n, i) => {
          const s = tipeStyle[n.tipe];
          return (
            <div key={n.id} className="notif-item"
              style={{ background: n.read ? "transparent" : s.bg, animationDelay:`${i*.06}s` }}
              onClick={() => setItems(items.map(x => x.id===n.id ? {...x,read:true} : x))}
              onMouseEnter={e => e.currentTarget.style.background="#EBF5FD"}
              onMouseLeave={e => e.currentTarget.style.background=n.read?"transparent":s.bg}
            >
              {!n.read && (
                <span style={{ position:"absolute", top:12, right:12, width:7, height:7, borderRadius:"50%", background:s.dot, boxShadow:`0 0 0 2px ${s.dot}33` }} />
              )}
              <div style={{ width:38, height:38, borderRadius:12, background:s.bg, display:"flex", alignItems:"center", justifyContent:"center", fontSize:"1rem", flexShrink:0, border:`1.5px solid ${s.dot}28`, boxShadow:`0 2px 8px ${s.dot}18` }}>
                {s.icon}
              </div>
              <div style={{ flex:1, minWidth:0 }}>
                <p style={{ fontWeight:n.read?500:700, fontSize:".82rem", color:"#0F2D52", marginBottom:".2rem", letterSpacing:"-.1px" }}>{n.title}</p>
                <p style={{ fontSize:".72rem", color:"#4A6FA5", lineHeight:1.45, marginBottom:".28rem" }}>{n.desc}</p>
                <p style={{ fontSize:".65rem", color:"#8AAED4", fontWeight:600, fontFamily:"'DM Mono',monospace" }}>{n.tgl}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <div style={{ padding:".75rem 1.1rem", borderTop:"1px solid rgba(30,90,171,.07)", textAlign:"center", background:"linear-gradient(90deg,#f8fbff,#f4f8fd)" }}>
        <Link to="/dashboard/notifikasi" onClick={onClose}
          style={{ fontSize:".78rem", fontWeight:700, color:"#2E80D8", textDecoration:"none", display:"inline-flex", alignItems:"center", gap:".3rem", transition:"gap .15s" }}
          onMouseEnter={e => e.currentTarget.style.gap=".5rem"}
          onMouseLeave={e => e.currentTarget.style.gap=".3rem"}
        >
          Lihat semua notifikasi →
        </Link>
      </div>
    </div>
  );
}

// ─── Main Layout ──────────────────────────────────────────────────────────────
export default function DashboardLayout({ children }) {
  const [collapsed, setCollapsed]   = useState(false);
  const [mobileSide, setMobileSide] = useState(false);
  const [showNotif, setShowNotif]   = useState(false);
  const location  = useLocation();
  const navigate  = useNavigate();
  const unreadCount = notifList.filter(n => !n.read).length;
  const crumbs = breadcrumbMap[location.pathname] || ["Dashboard"];

  return (
    <>
      <style>{CSS}</style>
      <div style={{ display:"flex", minHeight:"100vh", background:"#EBF5FD" }}>
        <div className={`mob-overlay${mobileSide?" open":""}`} onClick={() => setMobileSide(false)} />

        {/* ── SIDEBAR ── */}
        <aside className={`dl-sidebar${mobileSide?" mob-open":""}`} style={{
          width: collapsed ? 70 : 252,
          background: "#fff",
          borderRight: "1px solid rgba(30,90,171,.08)",
          position: "sticky", top:0, height:"100vh",
          flexShrink:0, overflow:"hidden",
          transition: "width .28s cubic-bezier(.4,0,.2,1)",
          display:"flex", flexDirection:"column",
          zIndex:100,
          boxShadow: "inset -1px 0 0 rgba(30,90,171,.05), 6px 0 32px rgba(15,45,82,.04)",
        }}>

          {/* Logo area */}
          <div style={{
            padding: collapsed ? "1rem .65rem" : "1rem 1.1rem",
            borderBottom: "1px solid rgba(30,90,171,.08)",
            display:"flex", alignItems:"center", gap:".7rem",
            minHeight:64, justifyContent: collapsed ? "center" : "flex-start",
            position:"relative", overflow:"hidden",
          }}>
            {/* Subtle bg gradient */}
            <div style={{ position:"absolute",inset:0,background:"linear-gradient(135deg,rgba(46,128,216,.04),transparent)",pointerEvents:"none" }} />

            <div style={{
              width:38, height:38, borderRadius:12, flexShrink:0,
              background:"linear-gradient(135deg,#0F2D52,#1A5EAB,#2E80D8)",
              display:"flex", alignItems:"center", justifyContent:"center",
              boxShadow:"0 4px 14px rgba(46,128,216,.38), 0 0 0 1px rgba(255,255,255,.1)",
              position:"relative", zIndex:1,
            }}>
              <img src={logoPeminjaman} alt="logo" style={{ width:24,height:24,objectFit:"contain",filter:"brightness(0) invert(1)" }} />
            </div>

            {!collapsed && (
              <div style={{ overflow:"hidden", position:"relative", zIndex:1 }}>
                <p style={{ fontWeight:900, fontSize:"1.05rem", color:"#0F2D52", letterSpacing:"-.3px", lineHeight:1.1 }}>SIJAR</p>
                <p style={{ fontSize:".63rem", color:"#8AAED4", fontWeight:600, marginTop:".1rem", letterSpacing:".04em" }}>SMKN 8 Semarang</p>
              </div>
            )}
          </div>

          {/* Nav */}
          <nav style={{ flex:1, padding: collapsed ? ".7rem .45rem" : ".7rem .7rem", overflowY:"auto", overflowX:"hidden" }}>
            {navItems.map((group, gi) => (
              <div key={group.group} style={{ marginBottom:"1.1rem" }}>
                {!collapsed && (
                  <p style={{ fontSize:".6rem", fontWeight:800, letterSpacing:".12em", color:"#8AAED4", padding:"0 .5rem", marginBottom:".45rem", textTransform:"uppercase" }}>
                    {group.group}
                  </p>
                )}
                {collapsed && gi > 0 && (
                  <div style={{ height:1, background:"rgba(30,90,171,.08)", margin:".6rem auto", width:"65%", borderRadius:99 }} />
                )}
                {group.items.map(item => (
                  <SideLink key={item.to} item={item} active={location.pathname === item.to} collapsed={collapsed} />
                ))}
              </div>
            ))}
          </nav>

          {/* User footer */}
          <div style={{ padding: collapsed ? ".7rem .45rem" : ".7rem .7rem", borderTop:"1px solid rgba(30,90,171,.08)" }}>
            {!collapsed ? (
              <div className="sb-user-card">
                {/* Avatar */}
                <div style={{
                  width:34, height:34, borderRadius:"50%", flexShrink:0,
                  background:"linear-gradient(135deg,#1A5EAB,#06B6D4)",
                  display:"flex", alignItems:"center", justifyContent:"center",
                  color:"#fff", fontWeight:800, fontSize:".78rem",
                  boxShadow:"0 2px 10px rgba(46,128,216,.35)",
                }}>AF</div>

                <div style={{ flex:1, overflow:"hidden" }}>
                  <p style={{ fontSize:".82rem", fontWeight:700, color:"#0F2D52", whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis", letterSpacing:"-.1px" }}>Ahmad Fauzi</p>
                  <p style={{ fontSize:".67rem", color:"#8AAED4", fontWeight:500, marginTop:".08rem" }}>XI PPLG 3</p>
                </div>

                <button
                  onClick={() => navigate("/login")}
                  title="Logout"
                  style={{ background:"none", border:"none", cursor:"pointer", color:"#8AAED4", padding:"5px", borderRadius:9, flexShrink:0, transition:"color .15s, background .15s" }}
                  onMouseEnter={e => { e.currentTarget.style.color="#EF4444"; e.currentTarget.style.background="#FEE2E2"; }}
                  onMouseLeave={e => { e.currentTarget.style.color="#8AAED4"; e.currentTarget.style.background="none"; }}
                >
                  <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/>
                  </svg>
                </button>
              </div>
            ) : (
              <div style={{ display:"flex", justifyContent:"center" }}>
                <div style={{ width:34,height:34,borderRadius:"50%",background:"linear-gradient(135deg,#1A5EAB,#06B6D4)",display:"flex",alignItems:"center",justifyContent:"center",color:"#fff",fontWeight:800,fontSize:".78rem",boxShadow:"0 2px 10px rgba(46,128,216,.3)",cursor:"default" }}>
                  AF
                </div>
              </div>
            )}
          </div>
        </aside>

        {/* ── MAIN ── */}
        <div className="dl-main" style={{ flex:1, display:"flex", flexDirection:"column", minWidth:0 }}>

          {/* ── TOPBAR ── */}
          <header style={{
            background:"rgba(255,255,255,.90)",
            backdropFilter:"blur(16px)", WebkitBackdropFilter:"blur(16px)",
            borderBottom:"1px solid rgba(30,90,171,.08)",
            padding:".65rem 1.6rem",
            display:"flex", alignItems:"center", justifyContent:"space-between",
            position:"sticky", top:0, zIndex:50,
            minHeight:64, gap:"1rem",
            boxShadow:"0 1px 0 rgba(30,90,171,.06), 0 4px 20px rgba(15,45,82,.04)",
          }}>

            {/* Left: toggle + breadcrumb */}
            <div style={{ display:"flex", alignItems:"center", gap:".6rem", minWidth:0 }}>
              {/* Mobile hamburger */}
              <button className="dl-mobile-toggle tb-btn" onClick={() => setMobileSide(true)}>
                <svg width="17" height="17" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16"/>
                </svg>
              </button>

              {/* Desktop collapse toggle */}
              <button className="dl-desktop-toggle tb-btn" onClick={() => setCollapsed(c => !c)} title={collapsed?"Perluas":"Ciutkan"}>
                {collapsed ? (
                  <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 5l7 7-7 7M5 5l7 7-7 7"/>
                  </svg>
                ) : (
                  <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M11 19l-7-7 7-7m8 14l-7-7 7-7"/>
                  </svg>
                )}
              </button>

              {/* Divider */}
              <div style={{ width:1, height:22, background:"rgba(30,90,171,.10)", flexShrink:0 }} />

              {/* Breadcrumb */}
              <nav style={{ display:"flex", alignItems:"center", gap:".3rem", flexWrap:"nowrap", overflow:"hidden" }}>
                {crumbs.map((c, i) => (
                  <span key={i} style={{ display:"flex", alignItems:"center", gap:".3rem" }}>
                    {i < crumbs.length - 1 ? (
                      <>
                        <Link to={i===0?"/dashboard":"#"} className="crumb-link">{c}</Link>
                        <svg width="11" height="11" fill="none" stroke="#8AAED4" strokeWidth="2.2" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 18l6-6-6-6"/>
                        </svg>
                      </>
                    ) : (
                      <span style={{ fontSize:".78rem", fontWeight:800, color:"#0F2D52", whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis", maxWidth:180 }}>{c}</span>
                    )}
                  </span>
                ))}
              </nav>
            </div>

            {/* Right: notif + profile */}
            <div style={{ display:"flex", alignItems:"center", gap:".5rem", flexShrink:0 }}>

              {/* Notif bell */}
              <div style={{ position:"relative" }}>
                <button className={`tb-btn${showNotif?" active":""}`}
                  onClick={() => setShowNotif(p => !p)}
                  title="Notifikasi"
                >
                  <svg width="17" height="17" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 10-12 0v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/>
                  </svg>
                  {unreadCount > 0 && <span className="notif-pulse" />}
                </button>
                {showNotif && <NotifDropdown onClose={() => setShowNotif(false)} />}
              </div>

              {/* Divider */}
              <div style={{ width:1, height:22, background:"rgba(30,90,171,.10)" }} />

              {/* Profile pill */}
              <Link to="/dashboard/profile"
                style={{
                  display:"flex", alignItems:"center", gap:".6rem",
                  padding:".35rem .85rem .35rem .35rem",
                  background:"linear-gradient(135deg,#EBF5FD,#F0F6FE)",
                  borderRadius:13, border:"1px solid rgba(30,90,171,.10)",
                  textDecoration:"none",
                  transition:"background .2s, box-shadow .2s, transform .18s",
                  boxShadow:"0 1px 4px rgba(30,90,171,.06)",
                }}
                onMouseEnter={e => { e.currentTarget.style.background="linear-gradient(135deg,#dbeafe,#EBF5FD)"; e.currentTarget.style.boxShadow="0 4px 16px rgba(46,128,216,.14)"; e.currentTarget.style.transform="translateY(-1px)"; }}
                onMouseLeave={e => { e.currentTarget.style.background="linear-gradient(135deg,#EBF5FD,#F0F6FE)"; e.currentTarget.style.boxShadow="0 1px 4px rgba(30,90,171,.06)"; e.currentTarget.style.transform="translateY(0)"; }}
              >
                <div style={{
                  width:30, height:30, borderRadius:"50%",
                  background:"linear-gradient(135deg,#1A5EAB,#06B6D4)",
                  display:"flex", alignItems:"center", justifyContent:"center",
                  color:"#fff", fontWeight:800, fontSize:".72rem",
                  boxShadow:"0 2px 8px rgba(46,128,216,.35)",
                  flexShrink:0,
                }}>AF</div>
                <div>
                  <p style={{ fontSize:".78rem", fontWeight:700, color:"#0F2D52", lineHeight:1.15, letterSpacing:"-.1px" }}>Ahmad Fauzi</p>
                  <p style={{ fontSize:".62rem", color:"#8AAED4", fontWeight:500 }}>XI PPLG 3</p>
                </div>
                <svg width="13" height="13" fill="none" stroke="#8AAED4" strokeWidth="2.2" viewBox="0 0 24 24" style={{ marginLeft:".1rem" }}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 18l6-6-6-6"/>
                </svg>
              </Link>
            </div>
          </header>

          {/* ── PAGE CONTENT ── */}
          <main style={{
            flex:1, padding:"1.6rem",
            overflowX:"hidden",
            background:`
              radial-gradient(ellipse at 15% 15%, rgba(46,128,216,.05) 0%, transparent 55%),
              radial-gradient(ellipse at 85% 85%, rgba(6,182,212,.04) 0%, transparent 55%),
              radial-gradient(ellipse at 50% 50%, rgba(30,90,171,.02) 0%, transparent 70%),
              #EBF5FD
            `,
          }}>
            {children}
          </main>
        </div>
      </div>
    </>
  );
}
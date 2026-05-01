import { useState } from "react";
import DashboardLayout from "./Dashboardlayout";

// ─── Color tokens (unchanged from original) ──────────────────────────────────
const C = {
  blue: "#4A90D9", blueDk: "#2563A8", blueDkr: "#1A3F70",
  blueLtr: "#D6EAFA", sky: "#F0F7FF",
  white: "#FFFFFF", tx: "#1E3A5F", txM: "#6B8BAD",
  green: "#10b981", greenLt: "#d1fae5",
  yellow: "#f59e0b", yellowLt: "#fef3c7",
  red: "#ef4444", redLt: "#fee2e2",
};

const jurusanColor = {
  PPLG: { bg: "#BFDBFE", c: "#2563A8", glow: "#3b82f6" },
  TJKT: { bg: "#FED7AA", c: "#EA580C", glow: "#f97316" },
  DKV:  { bg: "#FEF08A", c: "#CA8A04", glow: "#eab308" },
  LK:   { bg: "#BBF7D0", c: "#16A34A", glow: "#22c55e" },
  PS:   { bg: "#E9D5FF", c: "#7C3AED", glow: "#a855f7" },
};

const statusStyle = {
  aktif:   { bg: "#fffbeb", c: "#d97706", label: "Aktif",        dot: "#f59e0b", border: "#fde68a", icon: "⏳" },
  kembali: { bg: "#f0fdf4", c: "#16a34a", label: "Dikembalikan", dot: "#22c55e", border: "#bbf7d0", icon: "✅" },
  telat:   { bg: "#fff1f2", c: "#e11d48", label: "Terlambat",    dot: "#ef4444", border: "#fecdd3", icon: "🚨" },
};

const riwayat = [
  { id: "SJR-001", nama: "Laptop Asus VivoBook",     jurusan: "PPLG", emoji: "💻", tglPinjam: "15 Apr 2025", tglKembali: "20 Apr 2025", status: "aktif",   ket: "Untuk praktikum web" },
  { id: "SJR-002", nama: "Proyektor Epson EB-X41",   jurusan: "TJKT", emoji: "📽️", tglPinjam: "10 Apr 2025", tglKembali: "12 Apr 2025", status: "kembali", ket: "Presentasi jaringan" },
  { id: "SJR-003", nama: "Arduino Uno Rev3",          jurusan: "PPLG", emoji: "🔌", tglPinjam: "5 Apr 2025",  tglKembali: "10 Apr 2025", status: "telat",   ket: "Proyek IoT" },
  { id: "SJR-004", nama: "Drawing Tablet Wacom",      jurusan: "DKV",  emoji: "🎨", tglPinjam: "1 Apr 2025",  tglKembali: "5 Apr 2025",  status: "kembali", ket: "Desain poster" },
  { id: "SJR-005", nama: "Kamera Canon EOS M50",      jurusan: "DKV",  emoji: "📷", tglPinjam: "28 Mar 2025", tglKembali: "30 Mar 2025", status: "kembali", ket: "Foto produk" },
  { id: "SJR-006", nama: "Router MikroTik RB951",     jurusan: "TJKT", emoji: "📡", tglPinjam: "20 Mar 2025", tglKembali: "25 Mar 2025", status: "kembali", ket: "Lab jaringan" },
  { id: "SJR-007", nama: "Kabel HDMI 3m",             jurusan: "PPLG", emoji: "🖥️", tglPinjam: "13 Apr 2025", tglKembali: "18 Apr 2025", status: "aktif",   ket: "Demo aplikasi" },
];

const ringkasan = [
  { label: "Total Riwayat",  val: 24, icon: "📋", bg: "#eff6ff", c: C.blueDk,  border: "#bfdbfe", trend: "+3 bulan ini",      trendUp: true  },
  { label: "Dikembalikan",   val: 18, icon: "✅", bg: "#f0fdf4", c: "#15803d", border: "#bbf7d0", trend: "75% tepat waktu",   trendUp: true  },
  { label: "Masih Aktif",    val: 5,  icon: "⏳", bg: "#fffbeb", c: "#b45309", border: "#fde68a", trend: "2 hampir jatuh tempo", trendUp: false },
  { label: "Terlambat",      val: 1,  icon: "🚨", bg: "#fff1f2", c: "#be123c", border: "#fecdd3", trend: "Segera kembalikan!", trendUp: false },
];

// ─── CSS ─────────────────────────────────────────────────────────────────────
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,400;0,500;0,600;0,700;0,800;0,900;1,400&family=DM+Mono:wght@400;500&display=swap');

@keyframes fadeSlideUp {
  from { opacity:0; transform:translateY(22px) scale(.98); }
  to   { opacity:1; transform:translateY(0) scale(1); }
}
@keyframes fadeIn {
  from { opacity:0; }
  to   { opacity:1; }
}
@keyframes scaleIn {
  from { opacity:0; transform:scale(.94) translateY(12px); }
  to   { opacity:1; transform:scale(1)   translateY(0); }
}
@keyframes dotPulse {
  0%,100% { transform:scale(1);   opacity:1; }
  50%      { transform:scale(1.7); opacity:.4; }
}
@keyframes rowReveal {
  from { opacity:0; transform:translateX(-12px); }
  to   { opacity:1; transform:translateX(0); }
}
@keyframes cardFloat {
  0%,100% { transform:translateY(0); }
  50%      { transform:translateY(-3px); }
}
@keyframes shimmerSlide {
  0%   { transform:translateX(-100%); }
  100% { transform:translateX(200%); }
}
@keyframes gradientShift {
  0%   { background-position:0% 50%; }
  50%  { background-position:100% 50%; }
  100% { background-position:0% 50%; }
}
@keyframes modalDrop {
  from { opacity:0; transform:scale(.92) translateY(-16px); }
  to   { opacity:1; transform:scale(1)   translateY(0); }
}

.rw-page {
  font-family:'Plus Jakarta Sans',sans-serif;
  animation: fadeIn .35s ease both;
}

/* ── Stat cards ── */
.stat-card {
  position:relative; overflow:hidden;
  background:#fff;
  border-radius:22px;
  padding:1.3rem 1.4rem 1.1rem;
  cursor:default;
  transition:transform .3s cubic-bezier(.22,1,.36,1), box-shadow .3s ease;
  animation: fadeSlideUp .55s cubic-bezier(.22,1,.36,1) both;
  border:1px solid transparent;
}
.stat-card::before {
  content:'';
  position:absolute; inset:0;
  border-radius:22px;
  padding:1px;
  background:linear-gradient(135deg,rgba(255,255,255,.8),rgba(74,144,217,.12));
  -webkit-mask:linear-gradient(#fff 0 0) content-box,linear-gradient(#fff 0 0);
  -webkit-mask-composite:xor; mask-composite:exclude;
  pointer-events:none;
}
.stat-card::after {
  content:'';
  position:absolute; top:-40%; right:-20%;
  width:120px; height:120px;
  border-radius:50%;
  opacity:.055;
  transition:opacity .3s;
  pointer-events:none;
}
.stat-card:hover { transform:translateY(-5px) scale(1.015); }
.stat-card:hover::after { opacity:.11; }

/* Shimmer on hover */
.stat-card .shimmer {
  position:absolute; inset:0; z-index:1; pointer-events:none;
  background:linear-gradient(105deg,transparent 35%,rgba(255,255,255,.45) 50%,transparent 65%);
  transform:translateX(-100%);
  border-radius:22px;
}
.stat-card:hover .shimmer { animation:shimmerSlide .7s ease; }

/* ── Filter chips ── */
.filter-chip {
  border:1.5px solid transparent;
  cursor:pointer;
  border-radius:12px;
  font-family:'Plus Jakarta Sans',sans-serif;
  font-weight:700;
  font-size:.76rem;
  padding:.42rem 1rem;
  transition:all .22s cubic-bezier(.22,1,.36,1);
  letter-spacing:.02em;
  position:relative;
  overflow:hidden;
}
.filter-chip:hover { transform:translateY(-2px); }
.filter-chip:active { transform:translateY(0) scale(.97); }

/* ── Search ── */
.search-input {
  padding:.52rem .95rem .52rem 2.35rem;
  border:1.5px solid #e2eaf5;
  border-radius:13px;
  font-size:.82rem;
  color:${C.tx};
  background:#f7fafd;
  outline:none;
  font-family:'Plus Jakarta Sans',sans-serif;
  width:220px;
  transition:border-color .2s, box-shadow .2s, background .2s;
}
.search-input:focus {
  border-color:${C.blue};
  box-shadow:0 0 0 4px rgba(74,144,217,.10);
  background:#fff;
}
.search-input::placeholder { color:${C.txM}; font-weight:500; }

/* ── Table rows ── */
.rw-row {
  display:grid;
  grid-template-columns:2.4fr 0.75fr 1fr 1fr 1fr 0.4fr;
  gap:.75rem;
  align-items:center;
  padding:.85rem 1.1rem;
  border-radius:15px;
  cursor:pointer;
  transition:background .18s, transform .22s cubic-bezier(.22,1,.36,1), box-shadow .22s;
  animation:rowReveal .4s cubic-bezier(.22,1,.36,1) both;
  position:relative;
}
.rw-row::before {
  content:'';
  position:absolute; left:0; top:15%; bottom:15%;
  width:3px; border-radius:99px;
  background:transparent;
  transition:background .22s, height .22s;
}
.rw-row:hover {
  background:linear-gradient(90deg,rgba(240,247,255,.95),rgba(248,251,255,.6));
  transform:translateX(5px);
  box-shadow:0 4px 20px rgba(74,144,217,.08);
}
.rw-row:hover::before { background:${C.blue}; }

/* ── Modal ── */
.modal-overlay {
  position:fixed; inset:0;
  background:rgba(8,16,40,.5);
  z-index:500;
  display:flex; align-items:center; justify-content:center;
  padding:1rem;
  backdrop-filter:blur(10px) saturate(1.4);
  animation:fadeIn .2s ease;
}
.modal-box {
  background:#fff;
  border-radius:28px;
  width:100%; max-width:460px;
  box-shadow:0 40px 100px rgba(0,0,0,.22),0 0 0 1px rgba(255,255,255,.15);
  overflow:hidden;
  animation:modalDrop .3s cubic-bezier(.22,1,.36,1);
}
.modal-header {
  padding:2rem 1.9rem 1.7rem;
  position:relative; overflow:hidden;
}
.modal-header-bg {
  position:absolute; inset:0;
  background:linear-gradient(135deg,${C.blueDkr} 0%,#1e4a8a 50%,#2563A8 100%);
  background-size:200% 200%;
  animation:gradientShift 6s ease infinite;
}
.modal-header-noise {
  position:absolute; inset:0;
  background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.035'/%3E%3C/svg%3E");
  pointer-events:none;
}
.modal-close {
  position:absolute; top:1.1rem; right:1.1rem; z-index:2;
  background:rgba(255,255,255,.12); border:1px solid rgba(255,255,255,.18);
  border-radius:10px; width:32px; height:32px;
  cursor:pointer; color:#fff; font-size:.9rem;
  display:flex; align-items:center; justify-content:center;
  transition:background .15s, transform .15s;
}
.modal-close:hover { background:rgba(255,255,255,.25); transform:scale(1.08); }
.modal-body { padding:1.6rem 1.9rem; }
.detail-row {
  display:flex; justify-content:space-between; align-items:flex-start;
  padding:.7rem 0;
  border-bottom:1px solid rgba(74,144,217,.06);
}
.detail-row:last-child { border-bottom:none; }
.close-btn {
  width:100%; margin-top:1.4rem;
  padding:.78rem;
  border-radius:14px; border:none;
  background:linear-gradient(130deg,${C.blueDkr} 0%,${C.blue} 100%);
  color:#fff;
  font-family:'Plus Jakarta Sans',sans-serif;
  font-weight:800; font-size:.88rem;
  cursor:pointer; letter-spacing:.03em;
  transition:opacity .15s, transform .15s, box-shadow .15s;
  box-shadow:0 4px 18px rgba(74,144,217,.3);
}
.close-btn:hover { opacity:.92; transform:translateY(-2px); box-shadow:0 8px 28px rgba(74,144,217,.4); }
.close-btn:active { transform:translateY(0); }

/* ── empty state ── */
.empty-state {
  text-align:center; padding:5rem 1rem;
  animation:fadeSlideUp .5s ease;
}
`;

// ─── Helpers ─────────────────────────────────────────────────────────────────
const filterDefs = [
  { key: "Semua",        label: "Semua",        icon: "🗂️", color: C.blueDk,  activeBg: `linear-gradient(135deg,${C.blueDkr},${C.blue})` },
  { key: "Aktif",        label: "Aktif",        icon: "⏳", color: "#d97706", activeBg: "linear-gradient(135deg,#92400e,#f59e0b)" },
  { key: "Dikembalikan", label: "Dikembalikan", icon: "✅", color: "#15803d", activeBg: "linear-gradient(135deg,#14532d,#22c55e)" },
  { key: "Terlambat",    label: "Terlambat",    icon: "🚨", color: "#be123c", activeBg: "linear-gradient(135deg,#7f1d1d,#ef4444)" },
];

// ─── Component ───────────────────────────────────────────────────────────────
export default function RiwayatPage() {
  const [filter, setFilter]   = useState("Semua");
  const [search, setSearch]   = useState("");
  const [detail, setDetail]   = useState(null);
  const [sortBy, setSortBy]   = useState("tglPinjam");
  const [sortAsc, setSortAsc] = useState(false);

  const filtered = riwayat
    .filter(r => {
      const matchStatus =
        filter === "Semua" ||
        (filter === "Aktif"        && r.status === "aktif") ||
        (filter === "Dikembalikan" && r.status === "kembali") ||
        (filter === "Terlambat"    && r.status === "telat");
      const matchSearch =
        r.nama.toLowerCase().includes(search.toLowerCase()) ||
        r.id.toLowerCase().includes(search.toLowerCase()) ||
        r.jurusan.toLowerCase().includes(search.toLowerCase());
      return matchStatus && matchSearch;
    })
    .sort((a, b) => {
      const av = a[sortBy] ?? ""; const bv = b[sortBy] ?? "";
      return sortAsc ? av.localeCompare(bv) : bv.localeCompare(av);
    });

  function handleSort(col) {
    if (sortBy === col) setSortAsc(v => !v);
    else { setSortBy(col); setSortAsc(false); }
  }

  const SortIcon = ({ col }) => (
    <span style={{ fontSize:".65rem", opacity: sortBy === col ? 1 : .3, marginLeft:".25rem", transition:"opacity .2s" }}>
      {sortBy === col ? (sortAsc ? "↑" : "↓") : "↕"}
    </span>
  );

  // ── Premium header banner ──────────────────────────────────────────────────
  const activePinjam = riwayat.filter(r => r.status === "aktif").length;
  const onTimeRate   = Math.round((riwayat.filter(r => r.status === "kembali").length / riwayat.length) * 100);

  return (
    <DashboardLayout>
      <style>{CSS}</style>
      <div className="rw-page">

        {/* ── HERO HEADER ── */}
        <div style={{
          background: `linear-gradient(130deg, ${C.blueDkr} 0%, #1e4a8a 55%, ${C.blue} 100%)`,
          borderRadius: 24, padding: "2rem 2.1rem", marginBottom: "1.5rem",
          position: "relative", overflow: "hidden",
          boxShadow: `0 16px 48px rgba(26,63,112,.28), 0 0 0 1px rgba(255,255,255,.06)`,
        }}>
          {/* Decorative circles */}
          {[
            { w:320, h:320, top:"-100px", right:"-60px",  op:.07 },
            { w:180, h:180, top:"30px",   right:"120px",  op:.05 },
            { w:240, h:240, bottom:"-80px",left:"-60px", op:.06 },
          ].map((d, i) => (
            <div key={i} style={{
              position:"absolute", width:d.w, height:d.h, borderRadius:"50%",
              border:"1.5px solid rgba(255,255,255,.18)",
              top:d.top, right:d.right, bottom:d.bottom, left:d.left,
              opacity:d.op, pointerEvents:"none",
            }} />
          ))}

          <div style={{ position:"relative", zIndex:1, display:"flex", alignItems:"flex-end", justifyContent:"space-between", flexWrap:"wrap", gap:"1.25rem" }}>
            <div>
              {/* Breadcrumb chip */}
              <div style={{
                display:"inline-flex", alignItems:"center", gap:".4rem",
                background:"rgba(255,255,255,.12)", border:"1px solid rgba(255,255,255,.18)",
                color:"rgba(255,255,255,.85)", fontSize:".68rem", fontWeight:700,
                letterSpacing:".1em", textTransform:"uppercase",
                padding:".25rem .8rem", borderRadius:9999, marginBottom:".85rem",
              }}>
                <span style={{ width:6, height:6, borderRadius:"50%", background:"#86efac", animation:"dotPulse 2s ease-in-out infinite", display:"inline-block" }} />
                Riwayat Peminjaman
              </div>

              <h1 style={{
                fontSize:"clamp(1.55rem,3vw,2rem)", fontWeight:900, color:"#fff",
                letterSpacing:"-.6px", lineHeight:1.1, marginBottom:".45rem",
              }}>
                Catatan Pinjamku
              </h1>
              <p style={{ color:"rgba(255,255,255,.65)", fontSize:".85rem", fontWeight:500, maxWidth:380 }}>
                Semua histori peminjaman barang jurusan tercatat di sini — rapi, transparan, real-time.
              </p>
            </div>

            {/* Quick stats row */}
            <div style={{ display:"flex", gap:"1rem", flexWrap:"wrap" }}>
              {[
                { label:"Tepat Waktu", val:`${onTimeRate}%`, icon:"🎯", bg:"rgba(16,185,129,.18)", border:"rgba(52,211,153,.3)", c:"#6ee7b7" },
                { label:"Aktif Kini",  val:activePinjam,    icon:"📦", bg:"rgba(245,158,11,.18)", border:"rgba(252,211,77,.3)",  c:"#fde68a" },
                { label:"Total",       val:riwayat.length,  icon:"📋", bg:"rgba(255,255,255,.10)", border:"rgba(255,255,255,.2)", c:"#fff" },
              ].map(s => (
                <div key={s.label} style={{
                  background:s.bg, border:`1px solid ${s.border}`,
                  borderRadius:16, padding:".7rem 1rem",
                  backdropFilter:"blur(10px)", minWidth:90, textAlign:"center",
                }}>
                  <div style={{ fontSize:"1.1rem", marginBottom:".2rem" }}>{s.icon}</div>
                  <div style={{ fontSize:"1.35rem", fontWeight:900, color:s.c, lineHeight:1 }}>{s.val}</div>
                  <div style={{ fontSize:".65rem", color:"rgba(255,255,255,.6)", fontWeight:600, marginTop:".2rem", letterSpacing:".04em" }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── STAT CARDS ── */}
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(175px,1fr))", gap:".85rem", marginBottom:"1.5rem" }}>
          {ringkasan.map((r, i) => (
            <div key={r.label} className="stat-card"
              style={{
                animationDelay:`${i * .08}s`,
                background:`linear-gradient(145deg,#fff 60%,${r.bg})`,
                boxShadow:`0 2px 16px rgba(74,144,217,.07), 0 0 0 1px ${r.border}`,
              }}>
              <div className="shimmer" />
              {/* bg circle */}
              <div style={{ position:"absolute", top:-30, right:-20, width:100, height:100, borderRadius:"50%", background:r.bg, opacity:.7, pointerEvents:"none" }} />

              <div style={{ position:"relative", zIndex:1 }}>
                <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:".85rem" }}>
                  <div style={{
                    width:42, height:42, borderRadius:13, background:r.bg,
                    border:`1.5px solid ${r.border}`,
                    display:"flex", alignItems:"center", justifyContent:"center",
                    fontSize:"1.15rem",
                    boxShadow:`0 4px 14px ${r.c}22`,
                  }}>
                    {r.icon}
                  </div>
                  <div style={{
                    fontSize:".62rem", fontWeight:700, color: r.trendUp ? "#15803d" : "#be123c",
                    background: r.trendUp ? "#f0fdf4" : "#fff1f2",
                    border:`1px solid ${r.trendUp ? "#bbf7d0" : "#fecdd3"}`,
                    padding:".2rem .6rem", borderRadius:9999,
                    display:"flex", alignItems:"center", gap:".25rem",
                    letterSpacing:".02em",
                  }}>
                    {r.trendUp ? "↑" : "↓"} {r.trend}
                  </div>
                </div>

                <div style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:"2.1rem", fontWeight:900, color:r.c, lineHeight:1, letterSpacing:"-1px" }}>
                  {r.val}
                </div>
                <div style={{ fontSize:".73rem", color:C.txM, marginTop:".3rem", fontWeight:600 }}>{r.label}</div>

                {/* Progress underbar */}
                <div style={{ marginTop:".75rem", height:3, borderRadius:99, background:r.bg, overflow:"hidden" }}>
                  <div style={{
                    height:"100%", width:`${Math.min(100,(r.val/24)*100)}%`,
                    background:`linear-gradient(90deg,${r.c},${r.c}aa)`,
                    borderRadius:99,
                    transition:"width 1s cubic-bezier(.22,1,.36,1)",
                  }} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ── MAIN TABLE CARD ── */}
        <div style={{
          background:"#fff",
          borderRadius:24, overflow:"hidden",
          boxShadow:"0 4px 30px rgba(74,144,217,.08), 0 0 0 1px rgba(74,144,217,.07)",
        }}>

          {/* Table toolbar */}
          <div style={{
            padding:"1.15rem 1.4rem",
            background:"linear-gradient(90deg,#f8fbff,#f4f8fd)",
            borderBottom:"1px solid rgba(74,144,217,.07)",
            display:"flex", alignItems:"center", justifyContent:"space-between",
            flexWrap:"wrap", gap:".85rem",
          }}>
            {/* Filter chips */}
            <div style={{ display:"flex", gap:".4rem", flexWrap:"wrap" }}>
              {filterDefs.map(f => {
                const isActive = filter === f.key;
                const count    = f.key === "Semua" ? riwayat.length
                  : riwayat.filter(r =>
                    f.key === "Aktif" ? r.status === "aktif" :
                    f.key === "Dikembalikan" ? r.status === "kembali" : r.status === "telat"
                  ).length;
                return (
                  <button key={f.key} className="filter-chip"
                    onClick={() => setFilter(f.key)}
                    style={{
                      background: isActive ? f.activeBg : "#fff",
                      color: isActive ? "#fff" : C.txM,
                      borderColor: isActive ? "transparent" : "#e2eaf5",
                      boxShadow: isActive ? `0 4px 14px ${f.color}40` : "none",
                    }}>
                    {f.icon} {f.label}
                    <span style={{
                      marginLeft:".4rem", fontSize:".65rem", fontWeight:800,
                      background: isActive ? "rgba(255,255,255,.22)" : "#eef3f9",
                      color: isActive ? "#fff" : C.txM,
                      padding:".05rem .45rem", borderRadius:9999,
                    }}>
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Search */}
            <div style={{ position:"relative" }}>
              <svg style={{ position:"absolute", left:10, top:"50%", transform:"translateY(-50%)", color:C.txM, pointerEvents:"none" }}
                width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <circle cx="11" cy="11" r="8"/><path strokeLinecap="round" d="M21 21l-4.35-4.35"/>
              </svg>
              <input className="search-input" value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Cari barang, ID, jurusan..." />
            </div>
          </div>

          {/* Column headers */}
          <div style={{
            display:"grid", gridTemplateColumns:"2.4fr 0.75fr 1fr 1fr 1fr 0.4fr",
            gap:".75rem", padding:".6rem 1.4rem",
            background:"linear-gradient(90deg,#f0f5fc,#f7fafd)",
            borderBottom:"1px solid rgba(74,144,217,.06)",
          }}>
            {[
              { label:"Barang & ID", col:"nama" },
              { label:"Jurusan",     col:"jurusan" },
              { label:"Tgl Pinjam",  col:"tglPinjam" },
              { label:"Tgl Kembali", col:"tglKembali" },
              { label:"Status",      col:"status" },
              { label:"",            col:null },
            ].map(h => (
              <button key={h.label}
                onClick={() => h.col && handleSort(h.col)}
                style={{
                  fontSize:".67rem", fontWeight:800, color:C.txM,
                  textTransform:"uppercase", letterSpacing:".08em",
                  background:"none", border:"none", cursor: h.col ? "pointer" : "default",
                  textAlign:"left", padding:0, fontFamily:"'Plus Jakarta Sans',sans-serif",
                  transition:"color .15s",
                }}
                onMouseEnter={e => h.col && (e.target.style.color = C.blueDk)}
                onMouseLeave={e => (e.target.style.color = C.txM)}
              >
                {h.label}
                {h.col && <SortIcon col={h.col} />}
              </button>
            ))}
          </div>

          {/* Rows */}
          <div style={{ padding:".5rem .7rem" }}>
            {filtered.length === 0 ? (
              <div className="empty-state">
                <div style={{ fontSize:"3.5rem", marginBottom:".75rem" }}>📭</div>
                <p style={{ fontWeight:800, fontSize:"1rem", color:C.blueDkr, marginBottom:".35rem" }}>Tidak ada data</p>
                <p style={{ fontSize:".8rem", color:C.txM }}>Coba ubah filter atau kata kunci pencarian</p>
              </div>
            ) : filtered.map((r, i) => {
              const jc = jurusanColor[r.jurusan];
              const ss = statusStyle[r.status];
              return (
                <div key={r.id} className="rw-row"
                  style={{ animationDelay:`${i * .055}s` }}
                  onClick={() => setDetail(r)}>

                  {/* Barang */}
                  <div style={{ display:"flex", alignItems:"center", gap:".75rem", minWidth:0 }}>
                    <div style={{
                      width:44, height:44, borderRadius:14, flexShrink:0,
                      background:`linear-gradient(135deg,${jc.bg}cc,${jc.bg}66)`,
                      border:`1.5px solid ${jc.bg}`,
                      display:"flex", alignItems:"center", justifyContent:"center",
                      fontSize:"1.2rem",
                      boxShadow:`0 4px 12px ${jc.glow}22`,
                      transition:"transform .2s, box-shadow .2s",
                    }}>
                      {r.emoji}
                    </div>
                    <div style={{ minWidth:0 }}>
                      <p style={{ fontWeight:700, fontSize:".84rem", color:C.tx, lineHeight:1.3, whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" }}>{r.nama}</p>
                      <p style={{ fontSize:".67rem", color:C.txM, fontFamily:"'DM Mono',monospace", marginTop:".2rem", letterSpacing:".04em" }}>{r.id}</p>
                    </div>
                  </div>

                  {/* Jurusan */}
                  <div>
                    <span style={{
                      fontSize:".69rem", fontWeight:800,
                      background:jc.bg, color:jc.c,
                      padding:".24rem .65rem", borderRadius:10,
                      letterSpacing:".04em", display:"inline-block",
                      border:`1px solid ${jc.c}22`,
                    }}>
                      {r.jurusan}
                    </span>
                  </div>

                  {/* Tgl Pinjam */}
                  <p style={{ fontSize:".77rem", color:C.txM, fontWeight:500 }}>{r.tglPinjam}</p>

                  {/* Tgl Kembali */}
                  <p style={{
                    fontSize:".77rem", fontWeight:600,
                    color: r.status === "telat" ? "#dc2626" : r.status === "aktif" ? "#d97706" : C.txM,
                  }}>{r.tglKembali}</p>

                  {/* Status */}
                  <div>
                    <span style={{
                      fontSize:".69rem", fontWeight:800,
                      background:ss.bg, color:ss.c,
                      border:`1px solid ${ss.border}`,
                      padding:".26rem .75rem", borderRadius:10,
                      display:"inline-flex", alignItems:"center", gap:".35rem",
                    }}>
                      <span style={{ width:6, height:6, borderRadius:"50%", background:ss.dot, display:"inline-block",
                        ...(r.status === "aktif" ? { animation:"dotPulse 2s ease-in-out infinite" } : {}) }} />
                      {ss.label}
                    </span>
                  </div>

                  {/* Arrow */}
                  <div style={{ display:"flex", justifyContent:"center" }}>
                    <div style={{
                      width:28, height:28, borderRadius:9,
                      background:C.sky, border:`1px solid ${C.blueLtr}`,
                      display:"flex", alignItems:"center", justifyContent:"center",
                      fontSize:".75rem", color:C.txM, transition:"background .18s, color .18s",
                    }}
                    className="rw-arrow">
                      →
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Table footer */}
          <div style={{
            padding:".85rem 1.4rem",
            background:"linear-gradient(90deg,#f8fbff,#f4f8fd)",
            borderTop:"1px solid rgba(74,144,217,.06)",
            display:"flex", justifyContent:"space-between", alignItems:"center",
            flexWrap:"wrap", gap:".5rem",
          }}>
            <p style={{ fontSize:".73rem", color:C.txM, fontWeight:600 }}>
              Menampilkan{" "}
              <span style={{ color:C.blueDk, fontWeight:800 }}>{filtered.length}</span>
              {" "}dari{" "}
              <span style={{ color:C.blueDk, fontWeight:800 }}>{riwayat.length}</span>
              {" "}data peminjaman
            </p>
            <div style={{ display:"flex", alignItems:"center", gap:".5rem" }}>
              <span style={{ width:6, height:6, borderRadius:"50%", background:C.green, display:"inline-block", animation:"dotPulse 2s ease-in-out infinite" }} />
              <p style={{ fontSize:".73rem", color:C.txM, fontWeight:500 }}>Klik baris untuk melihat detail</p>
            </div>
          </div>
        </div>

        {/* ── DETAIL MODAL ── */}
        {detail && (() => {
          const jc = jurusanColor[detail.jurusan];
          const ss = statusStyle[detail.status];
          return (
            <div className="modal-overlay" onClick={e => e.target === e.currentTarget && setDetail(null)}>
              <div className="modal-box">

                {/* Header */}
                <div className="modal-header" style={{ minHeight:160 }}>
                  <div className="modal-header-bg" />
                  <div className="modal-header-noise" />

                  {/* Decorative rings */}
                  <div style={{ position:"absolute", width:200, height:200, borderRadius:"50%", border:"1.5px solid rgba(255,255,255,.12)", top:-80, right:-60, pointerEvents:"none" }} />
                  <div style={{ position:"absolute", width:130, height:130, borderRadius:"50%", border:"1.5px solid rgba(255,255,255,.10)", top:20, right:20, pointerEvents:"none" }} />

                  <button className="modal-close" onClick={() => setDetail(null)}>✕</button>

                  <div style={{ position:"relative", zIndex:2, display:"flex", alignItems:"flex-start", gap:"1.1rem" }}>
                    {/* Emoji icon */}
                    <div style={{
                      width:64, height:64, borderRadius:20, flexShrink:0,
                      background:"rgba(255,255,255,.15)",
                      border:"1.5px solid rgba(255,255,255,.22)",
                      display:"flex", alignItems:"center", justifyContent:"center",
                      fontSize:"1.9rem",
                      boxShadow:"0 8px 24px rgba(0,0,0,.15)",
                    }}>
                      {detail.emoji}
                    </div>

                    <div style={{ flex:1 }}>
                      <div style={{
                        fontSize:".65rem", fontWeight:700, letterSpacing:".1em",
                        textTransform:"uppercase", color:"rgba(255,255,255,.6)",
                        marginBottom:".4rem",
                      }}>
                        Detail Peminjaman
                      </div>
                      <p style={{ color:"#fff", fontWeight:900, fontSize:"1.05rem", lineHeight:1.3, marginBottom:".65rem" }}>
                        {detail.nama}
                      </p>
                      <div style={{ display:"flex", gap:".4rem", flexWrap:"wrap" }}>
                        <span style={{
                          fontSize:".68rem", fontWeight:800,
                          background:jc.bg, color:jc.c,
                          padding:".22rem .65rem", borderRadius:9999,
                          letterSpacing:".04em",
                        }}>
                          {detail.jurusan}
                        </span>
                        <span style={{
                          fontSize:".68rem", fontWeight:800,
                          background:ss.bg, color:ss.c,
                          border:`1px solid ${ss.border}`,
                          padding:".22rem .65rem", borderRadius:9999,
                          display:"inline-flex", alignItems:"center", gap:".3rem",
                        }}>
                          <span style={{ width:5, height:5, borderRadius:"50%", background:ss.dot, display:"inline-block" }} />
                          {ss.label}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Body */}
                <div className="modal-body">
                  {[
                    ["ID Peminjaman", detail.id, "'DM Mono',monospace"],
                    ["Tanggal Pinjam",  detail.tglPinjam,  null],
                    ["Tanggal Kembali", detail.tglKembali, null],
                    ["Keterangan",      detail.ket,         null],
                  ].map(([k, v, ff]) => (
                    <div key={k} className="detail-row">
                      <p style={{ fontSize:".77rem", color:C.txM, fontWeight:500 }}>{k}</p>
                      <p style={{
                        fontSize:".82rem", fontWeight:700, color:C.tx,
                        fontFamily: ff || "inherit", textAlign:"right", maxWidth:"58%",
                        lineHeight:1.4,
                      }}>{v}</p>
                    </div>
                  ))}

                  {/* Status bar visual */}
                  <div style={{
                    marginTop:"1rem", padding:".9rem 1rem",
                    background: ss.bg, border:`1px solid ${ss.border}`,
                    borderRadius:14,
                    display:"flex", alignItems:"center", gap:".65rem",
                  }}>
                    <span style={{ fontSize:"1.1rem" }}>{ss.icon}</span>
                    <div>
                      <p style={{ fontSize:".75rem", fontWeight:800, color:ss.c }}>{ss.label}</p>
                      <p style={{ fontSize:".7rem", color:ss.c, opacity:.75, marginTop:".1rem" }}>
                        {detail.status === "aktif"   && "Barang sedang dalam proses peminjaman."}
                        {detail.status === "kembali" && "Barang telah dikembalikan tepat waktu. Terima kasih!"}
                        {detail.status === "telat"   && "Pengembalian melebihi batas waktu yang ditentukan."}
                      </p>
                    </div>
                  </div>

                  <button className="close-btn" onClick={() => setDetail(null)}>
                    Tutup Detail
                  </button>
                </div>
              </div>
            </div>
          );
        })()}

      </div>
    </DashboardLayout>
  );
}
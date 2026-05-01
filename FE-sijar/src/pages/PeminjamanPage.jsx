import { useState, useEffect, useRef } from "react";
import DashboardLayout from "./Dashboardlayout";

<<<<<<< HEAD
const JURUSAN_THEME = {
  Semua: { bg: "#F0F7FF", active: "#2563A8", activeBg: "#DBEAFE", border: "#DBEAFE", label: "Semua" },
  PPLG: { bg: "#EFF6FF", active: "#2563A8", activeBg: "#BFDBFE", border: "#BFDBFE", label: "PPLG" },
  TJKT: { bg: "#FFF7ED", active: "#EA580C", activeBg: "#FED7AA", border: "#FED7AA", label: "TJKT" },
  DKV: { bg: "#FEFCE8", active: "#CA8A04", activeBg: "#FEF08A", border: "#FEF08A", label: "DKV" },
  LK: { bg: "#F0FDF4", active: "#16A34A", activeBg: "#BBF7D0", border: "#BBF7D0", label: "LK" },
  PS: { bg: "#EFF6FF", active: "#1D4ED8", activeBg: "#BFDBFE", border: "#BFDBFE", label: "PS" },
};

const COLORS = {
  blue: "#4A90D9", blueDk: "#2563A8", blueDkr: "#1A3F70",
  blueLtr: "#D6EAFA", sky: "#F0F7FF",
  white: "#FFFFFF", tx: "#1E3A5F", txM: "#6B8BAD",
  green: "#3DBD8F", greenLt: "#E8F8F2",
  red: "#EF4444", redLt: "#FEF0EF",
};

const barangList = [
  { id: 1, nama: "Laptop Asus VivoBook", jurusan: "PPLG", kategori: "Elektronik", stok: 3, total: 5, emoji: "💻", status: "Tersedia" },
  { id: 2, nama: "Arduino Uno Rev3", jurusan: "PPLG", kategori: "Mikrokontroler", stok: 8, total: 10, emoji: "🔌", status: "Tersedia" },
  { id: 3, nama: "Raspberry Pi 4", jurusan: "PPLG", kategori: "Komputer Mini", stok: 0, total: 4, emoji: "🖥️", status: "Habis" },
  { id: 4, nama: "Proyektor Epson EB-X41", jurusan: "TJKT", kategori: "Elektronik", stok: 2, total: 3, emoji: "📽️", status: "Tersedia" },
  { id: 5, nama: "Router MikroTik RB951", jurusan: "TJKT", kategori: "Jaringan", stok: 6, total: 6, emoji: "📡", status: "Tersedia" },
  { id: 6, nama: "Switch Cisco Catalyst", jurusan: "TJKT", kategori: "Jaringan", stok: 4, total: 4, emoji: "🔌", status: "Tersedia" },
  { id: 7, nama: "Drawing Tablet Wacom", jurusan: "DKV", kategori: "Desain", stok: 3, total: 5, emoji: "🎨", status: "Tersedia" },
  { id: 8, nama: "Kamera Canon EOS M50", jurusan: "DKV", kategori: "Fotografi", stok: 1, total: 2, emoji: "📷", status: "Tersedia" },
  { id: 9, nama: "Mesin Jahit Brother", jurusan: "LK", kategori: "Alat Jahit", stok: 4, total: 8, emoji: "🧵", status: "Tersedia" },
  { id: 10, nama: "Manequin Display", jurusan: "LK", kategori: "Display", stok: 5, total: 5, emoji: "👗", status: "Tersedia" },
  { id: 11, nama: "Peralatan Masak Lengkap", jurusan: "PS", kategori: "Memasak", stok: 2, total: 4, emoji: "🍳", status: "Tersedia" },
  { id: 12, nama: "Timbangan Digital", jurusan: "PS", kategori: "Alat Ukur", stok: 3, total: 3, emoji: "⚖️", status: "Tersedia" },
=======
// ─── Tokens (unchanged) ───────────────────────────────────────────────────────
const C = {
  ink:"#07152B", navy:"#0F2D52", blue:"#1A5EAB", blueMd:"#2E80D8",
  blueLt:"#5FA8E8", bluePale:"#C2DFF7", sky:"#EBF5FD",
  white:"#FFFFFF", tx:"#0F2D52", txM:"#4A6FA5", txL:"#8AAED4",
  green:"#10B981", greenDk:"#065F46", greenLt:"#D1FAE5",
  yellow:"#F59E0B", yellowDk:"#92400E", yellowLt:"#FEF3C7",
  red:"#EF4444", redDk:"#7F1D1D", redLt:"#FEE2E2",
  border:"rgba(30,90,171,.10)",
};

const JURUSAN_THEME = {
  Semua:{ bg:C.sky,      pill:C.bluePale, active:C.blueMd,  dot:C.blueMd,  glow:"#2E80D8" },
  PPLG: { bg:"#EFF6FF",  pill:"#BFDBFE",  active:"#2563AB", dot:"#60A5FA", glow:"#3b82f6" },
  TJKT: { bg:"#FFF7ED",  pill:"#FED7AA",  active:"#C2410C", dot:"#F97316", glow:"#f97316" },
  DKV:  { bg:"#FEFCE8",  pill:"#FEF08A",  active:"#A16207", dot:"#EAB308", glow:"#eab308" },
  LK:   { bg:"#F0FDF4",  pill:"#BBF7D0",  active:"#15803D", dot:"#22C55E", glow:"#22c55e" },
  PS:   { bg:"#EFF6FF",  pill:"#93C5FD",  active:"#1E3A5F", dot:"#1E3A5F", glow:"#1E3A5F" },
};

const barangList = [
  { id:1,  nama:"Laptop Asus VivoBook",        jurusan:"PPLG", kategori:"Elektronik",     stok:3, total:5,  emoji:"💻", kondisi:"Baik", lokasi:"Lab PPLG Lt. 2",   spek:"Core i5 Gen-12, RAM 16GB, SSD 512GB" },
  { id:2,  nama:"Arduino Uno Rev3",             jurusan:"PPLG", kategori:"Mikrokontroler", stok:8, total:10, emoji:"🔌", kondisi:"Baik", lokasi:"Lab PPLG Lt. 2",   spek:"ATmega328P, 14 Digital I/O, 6 Analog" },
  { id:3,  nama:"Raspberry Pi 4 (4GB)",         jurusan:"PPLG", kategori:"Komputer Mini",  stok:0, total:4,  emoji:"🖥️", kondisi:"Baik", lokasi:"Lab PPLG Lt. 2",   spek:"Quad-core ARM, WiFi, BT 5.0, 4K" },
  { id:4,  nama:"Proyektor Epson EB-X41",       jurusan:"TJKT", kategori:"Elektronik",     stok:2, total:3,  emoji:"📽️", kondisi:"Baik", lokasi:"Ruang AV TJKT",    spek:"3600 Lumens, SVGA, HDMI/VGA" },
  { id:5,  nama:"Router MikroTik RB951",        jurusan:"TJKT", kategori:"Jaringan",       stok:6, total:6,  emoji:"📡", kondisi:"Baik", lokasi:"Lab Jaringan",     spek:"5 Port Gigabit, WiFi 2.4GHz" },
  { id:6,  nama:"Switch Cisco Catalyst 2960",   jurusan:"TJKT", kategori:"Jaringan",       stok:4, total:4,  emoji:"🔁", kondisi:"Baik", lokasi:"Lab Jaringan",     spek:"24 Port FastEthernet, Layer 2" },
  { id:7,  nama:"Drawing Tablet Wacom Intous",  jurusan:"DKV",  kategori:"Desain",         stok:3, total:5,  emoji:"🎨", kondisi:"Baik", lokasi:"Studio DKV",       spek:"Medium size, 4096 Pressure Levels" },
  { id:8,  nama:"Kamera Canon EOS M50",         jurusan:"DKV",  kategori:"Fotografi",      stok:1, total:2,  emoji:"📷", kondisi:"Baik", lokasi:"Studio DKV",       spek:"24.1MP, 4K Video, Dual Pixel AF" },
  { id:9,  nama:"Mesin Jahit Brother GS3700D",  jurusan:"LK",   kategori:"Alat Jahit",     stok:4, total:8,  emoji:"🧵", kondisi:"Baik", lokasi:"Lab Busana LK",    spek:"37 Stitch Patterns, Auto Needle" },
  { id:10, nama:"Manequin Display Profesional", jurusan:"LK",   kategori:"Display",        stok:5, total:5,  emoji:"👗", kondisi:"Baik", lokasi:"Lab Busana LK",    spek:"Adjustable, Full Body, Stand" },
  { id:11, nama:"Peralatan Masak Lengkap",      jurusan:"PS",   kategori:"Memasak",        stok:2, total:4,  emoji:"🍳", kondisi:"Baik", lokasi:"Dapur Praktik PS", spek:"Set 20 Pcs, Stainless Steel" },
  { id:12, nama:"Timbangan Digital Presisi",    jurusan:"PS",   kategori:"Alat Ukur",      stok:3, total:3,  emoji:"⚖️", kondisi:"Baik", lokasi:"Dapur Praktik PS", spek:"Max 5kg, Akurasi 0.1g, LED" },
];

const aturan = [
  { icon:"📦", text:"Maksimal peminjaman 3 barang per siswa" },
  { icon:"⏰", text:"Durasi pinjam maksimal 7 hari kerja" },
  { icon:"🔧", text:"Barang harus dikembalikan dalam kondisi sama" },
  { icon:"📋", text:"Keterlambatan tercatat di riwayat akun" },
  { icon:"💰", text:"Kerusakan menjadi tanggung jawab peminjam" },
>>>>>>> 67e6dec (nambah page)
];

// ─── CSS ─────────────────────────────────────────────────────────────────────
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,400;0,500;0,600;0,700;0,800;0,900;1,400&family=DM+Mono:wght@400;500&display=swap');

@keyframes dropIn    { from{opacity:0;transform:translateY(-14px) scale(.96)} to{opacity:1;transform:translateY(0) scale(1)} }
@keyframes fadeInUp  { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:translateY(0)} }
@keyframes fadeIn    { from{opacity:0} to{opacity:1} }
@keyframes popIn     { from{opacity:0;transform:scale(.82)} to{opacity:1;transform:scale(1)} }
@keyframes bounceIn  { 0%{transform:scale(0)} 60%{transform:scale(1.22)} 100%{transform:scale(1)} }
@keyframes loadBar   { from{width:0} to{width:100%} }
@keyframes slideUp   { from{opacity:0;transform:translateY(28px)} to{opacity:1;transform:translateY(0)} }
@keyframes float     { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-6px)} }
@keyframes shimmer   { from{transform:translateX(-120%)} to{transform:translateX(120%)} }
@keyframes cardReveal{ from{opacity:0;transform:translateY(20px) scale(.97)} to{opacity:1;transform:translateY(0) scale(1)} }
@keyframes gradientPan { 0%{background-position:0% 50%} 50%{background-position:100% 50%} 100%{background-position:0% 50%} }
@keyframes pulseRing  { 0%{box-shadow:0 0 0 0 rgba(16,185,129,.5)} 70%{box-shadow:0 0 0 8px rgba(16,185,129,0)} 100%{box-shadow:0 0 0 0 rgba(16,185,129,0)} }
@keyframes dotBlink   { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.4;transform:scale(1.6)} }
@keyframes scanline   { 0%{transform:translateY(-100%)} 100%{transform:translateY(400%)} }
@keyframes toastSlide { from{opacity:0;transform:translateY(24px) scale(.95)} to{opacity:1;transform:translateY(0) scale(1)} }
@keyframes headerGlow { 0%,100%{opacity:.6} 50%{opacity:1} }

/* ── Stat cards ── */
.stat-card-pm {
  position:relative; overflow:hidden;
  border-radius:22px;
  padding:1.15rem 1.2rem;
  cursor:default;
  transition:transform .3s cubic-bezier(.22,1,.36,1), box-shadow .3s ease;
  animation: fadeInUp .55s cubic-bezier(.22,1,.36,1) both;
}
.stat-card-pm::after {
  content:'';
  position:absolute; top:0; left:-100%;
  width:60%; height:100%;
  background:linear-gradient(105deg,transparent,rgba(255,255,255,.55),transparent);
  pointer-events:none;
  transition:none;
}
.stat-card-pm:hover::after { animation:shimmer .65s ease; }
.stat-card-pm:hover { transform:translateY(-6px) scale(1.03); }

/* ── Filter jurusan tabs ── */
.jurusan-tab {
  position:relative;
  padding:.55rem 1.3rem;
  border-radius:14px;
  border:1.5px solid transparent;
  font-family:'Plus Jakarta Sans',sans-serif;
  font-weight:700; font-size:.8rem;
  cursor:pointer;
  transition:all .22s cubic-bezier(.22,1,.36,1);
  white-space:nowrap; overflow:hidden;
}
.jurusan-tab::before {
  content:'';
  position:absolute; inset:0;
  border-radius:14px;
  background:linear-gradient(135deg,rgba(255,255,255,.5),rgba(255,255,255,.0));
  pointer-events:none;
}
.jurusan-tab:hover { transform:translateY(-2px); }
.jurusan-tab:active { transform:translateY(0) scale(.97); }

/* ── Barang card ── */
.barang-card {
  background:#fff;
  border-radius:24px;
  border:1.5px solid rgba(30,90,171,.08);
  overflow:hidden;
  display:flex; flex-direction:column;
  transition:transform .28s cubic-bezier(.22,1,.36,1), box-shadow .28s ease, border-color .28s;
  cursor:pointer;
  position:relative;
}
.barang-card:hover {
  transform:translateY(-8px) scale(1.012);
}
.barang-card .card-shine {
  position:absolute; inset:0; border-radius:24px;
  background:linear-gradient(135deg,rgba(255,255,255,.15) 0%,transparent 60%);
  pointer-events:none; z-index:1;
  opacity:0; transition:opacity .3s;
}
.barang-card:hover .card-shine { opacity:1; }

/* ── Search ── */
.search-pm {
  border:1.5px solid rgba(30,90,171,.12);
  border-radius:14px;
  padding:.58rem .95rem .58rem 2.35rem;
  font-size:.83rem;
  font-family:'Plus Jakarta Sans',sans-serif;
  outline:none;
  background:#F8FBFF;
  color:#0F2D52;
  width:230px;
  transition:border-color .2s, box-shadow .22s, background .2s;
}
.search-pm:focus { border-color:#2E80D8; box-shadow:0 0 0 4px rgba(46,128,216,.10); background:#fff; }
.search-pm::placeholder { color:#8AAED4; font-weight:500; }

/* ── Pinjam button ── */
.pinjam-btn {
  width:100%; padding:.72rem;
  border-radius:14px; border:none;
  font-family:'Plus Jakarta Sans',sans-serif;
  font-weight:800; font-size:.84rem;
  cursor:pointer; letter-spacing:.02em;
  position:relative; overflow:hidden;
  transition:opacity .18s, transform .2s, box-shadow .2s;
}
.pinjam-btn::after {
  content:'';
  position:absolute; inset:0;
  background:linear-gradient(105deg,transparent 40%,rgba(255,255,255,.28) 50%,transparent 60%);
  transform:translateX(-120%); pointer-events:none;
}
.pinjam-btn:not(:disabled):hover::after { animation:shimmer .55s ease; }
.pinjam-btn:not(:disabled):hover { transform:translateY(-2px) scale(1.025); }
.pinjam-btn:not(:disabled):active { transform:scale(.97); }

/* ── Toast ── */
.toast-pm {
  position:fixed; bottom:2.2rem; right:2.2rem; z-index:600;
  background:linear-gradient(135deg,#065F46,#059669,#10B981);
  background-size:200% 200%;
  animation:toastSlide .38s cubic-bezier(.22,1,.36,1) both, gradientPan 4s ease infinite;
  color:#fff; border-radius:20px;
  padding:1rem 1.5rem;
  display:flex; align-items:center; gap:.75rem;
  font-family:'Plus Jakarta Sans',sans-serif; font-weight:700; font-size:.875rem;
  box-shadow:0 16px 48px rgba(16,185,129,.4), 0 0 0 1px rgba(255,255,255,.1);
  max-width:340px;
}

/* ── Modal step indicator ── */
.step-line {
  flex:1; height:2px; border-radius:99px;
  transition:background .4s cubic-bezier(.22,1,.36,1);
}

/* ── Form inputs ── */
.modal-input {
  width:100%;
  padding:.68rem .95rem;
  border:1.5px solid rgba(30,90,171,.12);
  border-radius:13px; font-size:.85rem;
  color:#0F2D52;
  font-family:'Plus Jakarta Sans',sans-serif;
  outline:none; background:#F8FBFF;
  transition:border-color .2s, box-shadow .2s, background .2s;
}
.modal-input:focus { border-color:#2E80D8; box-shadow:0 0 0 4px rgba(46,128,216,.10); background:#fff; }

/* ── Scrollbar ── */
::-webkit-scrollbar{width:5px} ::-webkit-scrollbar-track{background:#EBF5FD} ::-webkit-scrollbar-thumb{background:#C2DFF7;border-radius:99px}

/* ── Empty state ── */
.empty-pm { text-align:center; padding:5rem 1rem; animation:fadeInUp .5s ease both; }
`;

// ─── Counter hook ────────────────────────────────────────────────────────────
function useCounter(target, duration = 900) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let s = 0; const step = Math.ceil(target / (duration / 16));
    const t = setInterval(() => { s += step; if (s >= target) { setCount(target); clearInterval(t); } else setCount(s); }, 16);
    return () => clearInterval(t);
  }, [target]);
  return count;
}

// ─── Stat Card ───────────────────────────────────────────────────────────────
function StatCard({ icon, label, val, bg, c, border, delay = 0 }) {
  const counted = useCounter(val, 900);
  return (
    <div className="stat-card-pm" style={{
      background: `linear-gradient(145deg, ${bg}, ${bg}dd)`,
      border:`1.5px solid ${border}`,
      boxShadow:`0 2px 12px ${c}18`,
      animationDelay:`${delay}s`,
    }}>
      {/* Decorative bg circle */}
      <div style={{ position:"absolute", top:-20, right:-20, width:80, height:80, borderRadius:"50%", background:`${c}15`, pointerEvents:"none" }} />
      <div style={{ position:"relative", zIndex:1 }}>
        <div style={{
          width:40, height:40, borderRadius:13, marginBottom:".75rem",
          background:`${c}20`, border:`1.5px solid ${c}35`,
          display:"flex", alignItems:"center", justifyContent:"center",
          fontSize:"1.2rem",
          boxShadow:`0 4px 16px ${c}22`,
        }}>{icon}</div>
        <p style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontWeight:900, fontSize:"1.55rem", color:c, lineHeight:1, letterSpacing:"-1px", marginBottom:".25rem" }}>{counted}</p>
        <p style={{ fontSize:".7rem", color:C.txM, fontWeight:600 }}>{label}</p>
        {/* Progress micro bar */}
        <div style={{ marginTop:".65rem", height:3, borderRadius:99, background:`${c}20`, overflow:"hidden" }}>
          <div style={{ height:"100%", width:`${Math.min(100,(val/12)*100)}%`, background:`linear-gradient(90deg,${c},${c}88)`, borderRadius:99 }} />
        </div>
      </div>
    </div>
  );
}

// ─── Barang Card ─────────────────────────────────────────────────────────────
function BarangCard({ b, onPinjam }) {
  const [hov, setHov] = useState(false);
  const jt = JURUSAN_THEME[b.jurusan];
  const persen = Math.round((b.stok / b.total) * 100);
  const habis = b.stok === 0;
  const low = !habis && persen < 40;

  return (
    <div className="barang-card"
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        borderColor: hov && !habis ? `${jt.dot}55` : "rgba(30,90,171,.08)",
        boxShadow: hov && !habis
          ? `0 24px 60px ${jt.glow}22, 0 0 0 1px ${jt.dot}22`
          : "0 2px 10px rgba(15,45,82,.05)",
      }}>
      <div className="card-shine" />

      {/* Card image area */}
      <div style={{
        height:158,
        background: habis
          ? "linear-gradient(145deg,#f1f5f9,#e2e8f0)"
          : `linear-gradient(145deg, ${jt.bg}, ${jt.pill}66)`,
        display:"flex", alignItems:"center", justifyContent:"center",
        fontSize:"3.5rem", position:"relative", flexShrink:0,
        overflow:"hidden",
      }}>
        {/* Decorative blur blob */}
        <div style={{
          position:"absolute", width:120, height:120, borderRadius:"50%",
          background:`${jt.dot}22`, filter:"blur(30px)",
          top:"50%", left:"50%", transform:"translate(-50%,-50%)",
          pointerEvents:"none",
          transition:"opacity .3s",
          opacity: hov ? 1 : 0.5,
        }} />
        <span style={{
          position:"relative", zIndex:1,
          filter: habis ? "grayscale(1) opacity(.4)" : "none",
          transition:"transform .3s cubic-bezier(.22,1,.36,1)",
          display:"block",
          transform: hov && !habis ? "scale(1.12) translateY(-2px)" : "scale(1)",
        }}>{b.emoji}</span>

        {/* Status badge */}
        <div style={{
          position:"absolute", top:11, right:11,
          fontSize:".65rem", fontWeight:800,
          background: habis ? C.redLt : low ? C.yellowLt : C.greenLt,
          color: habis ? "#be123c" : low ? C.yellowDk : C.greenDk,
          padding:".26rem .72rem", borderRadius:999,
          border:`1px solid ${habis?"#fecdd3":low?"#fde68a":"#6ee7b7"}`,
          backdropFilter:"blur(8px)",
          boxShadow:"0 2px 8px rgba(0,0,0,.08)",
          display:"flex", alignItems:"center", gap:".3rem",
        }}>
          <span style={{
            width:5, height:5, borderRadius:"50%",
            background: habis?"#ef4444":low?"#f59e0b":"#10b981",
            display:"inline-block",
            animation: !habis ? "dotBlink 2s ease-in-out infinite" : "none",
          }} />
          {habis ? "Habis" : low ? `${b.stok} tersisa` : "Tersedia"}
        </div>

        {/* Jurusan pill */}
        <div style={{
          position:"absolute", top:11, left:11,
          fontSize:".65rem", fontWeight:800,
          background: jt.pill, color: jt.active,
          padding:".26rem .72rem", borderRadius:999,
          backdropFilter:"blur(8px)",
          boxShadow:"0 2px 8px rgba(0,0,0,.06)",
        }}>{b.jurusan}</div>

        {/* Habis overlay */}
        {habis && (
          <div style={{
            position:"absolute", inset:0,
            background:"rgba(248,250,252,.55)",
            backdropFilter:"blur(1px)",
          }} />
        )}
      </div>

      {/* Card body */}
      <div style={{ padding:"1.1rem 1.2rem 1.2rem", flex:1, display:"flex", flexDirection:"column", gap:".5rem" }}>
        <div>
          <p style={{ fontWeight:800, fontSize:".9rem", color:C.tx, lineHeight:1.3, marginBottom:".22rem" }}>{b.nama}</p>
          <p style={{ fontSize:".68rem", color:C.txM, fontWeight:500 }}>📍 {b.lokasi}</p>
        </div>

        <p style={{ fontSize:".67rem", color:C.txL, lineHeight:1.5, fontFamily:"'DM Mono',monospace" }}>{b.spek}</p>

        {/* Stok bar */}
        <div>
          <div style={{ display:"flex", justifyContent:"space-between", fontSize:".68rem", marginBottom:".35rem" }}>
            <span style={{ color:C.txM, fontWeight:500 }}>Stok tersedia</span>
            <span style={{
              fontWeight:800,
              color: habis?"#be123c":low?C.yellowDk:C.greenDk,
              fontFamily:"'DM Mono',monospace",
            }}>{b.stok}/{b.total}</span>
          </div>
          <div style={{ height:5, borderRadius:99, background:C.sky, overflow:"hidden", position:"relative" }}>
            <div style={{
              position:"absolute", height:"100%",
              width:`${persen}%`, borderRadius:99,
              background: habis
                ? `linear-gradient(90deg,${C.redLt},${C.red})`
                : low
                  ? `linear-gradient(90deg,#fde68a,${C.yellow})`
                  : `linear-gradient(90deg,${jt.pill},${jt.dot})`,
              transition:"width .7s cubic-bezier(.22,1,.36,1)",
              boxShadow: !habis ? `0 0 8px ${jt.dot}66` : "none",
            }} />
          </div>
        </div>

        {/* Kategori tag */}
        <div>
          <span style={{
            fontSize:".64rem", fontWeight:700,
            background:C.sky, color:C.txM,
            border:`1px solid ${C.border}`,
            padding:".2rem .6rem", borderRadius:9999,
          }}>{b.kategori}</span>
        </div>

        {/* CTA */}
        <button className="pinjam-btn"
          disabled={habis}
          onClick={() => !habis && onPinjam(b)}
          style={{
            marginTop:"auto",
            background: habis
              ? "#F1F5F9"
              : `linear-gradient(135deg, ${jt.active}, ${jt.dot})`,
            color: habis ? C.txM : "#fff",
            cursor: habis ? "not-allowed" : "pointer",
            boxShadow: habis ? "none" : `0 6px 20px ${jt.glow}44`,
          }}>
          {habis ? "Stok Habis" : "✦ Pinjam Sekarang"}
        </button>
      </div>
    </div>
  );
}

// ─── Pinjam Modal ─────────────────────────────────────────────────────────────
function PinjamModal({ modal, onClose }) {
  const [step, setStep] = useState(1);
  const [tgl, setTgl] = useState("");
  const [tglKembali, setTglKembali] = useState("");
  const [catatan, setCatatan] = useState("");
  const [done, setDone] = useState(false);
  const jt = JURUSAN_THEME[modal.jurusan];
  const durasi = tgl && tglKembali ? Math.max(0, Math.round((new Date(tglKembali) - new Date(tgl)) / 86400000)) : 0;
  const canNext = tgl && tglKembali && durasi > 0 && durasi <= 7;

  const handleConfirm = () => { setDone(true); setTimeout(() => onClose(true), 2000); };

  // ── Success screen
  if (done) return (
    <div style={{ position:"fixed",inset:0,background:"rgba(7,21,43,.65)",zIndex:500,display:"flex",alignItems:"center",justifyContent:"center",backdropFilter:"blur(10px)",animation:"fadeIn .2s ease" }}>
      <div style={{ background:C.white,borderRadius:30,padding:"3rem 2.5rem",textAlign:"center",maxWidth:360,width:"90%",animation:"popIn .4s cubic-bezier(.34,1.56,.64,1) both",boxShadow:"0 40px 100px rgba(7,21,43,.3)" }}>
        <div style={{ width:80,height:80,borderRadius:"50%",background:C.greenLt,display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 1.25rem",fontSize:"2.5rem",animation:"bounceIn .6s ease both",boxShadow:`0 0 0 0 rgba(16,185,129,.5)`,animationName:"bounceIn,pulseRing" }}>
          🎉
        </div>
        <h3 style={{ fontSize:"1.3rem",fontWeight:900,color:C.navy,marginBottom:".5rem",letterSpacing:"-.3px" }}>Berhasil Diajukan!</h3>
        <p style={{ fontSize:".85rem",color:C.txM,lineHeight:1.65 }}>
          Peminjaman <strong style={{ color:C.tx }}>{modal.nama}</strong> berhasil diajukan. Cek riwayat untuk detailnya.
        </p>
        <div style={{ marginTop:"1.75rem",height:4,borderRadius:99,background:C.sky,overflow:"hidden" }}>
          <div style={{ height:"100%",borderRadius:99,background:`linear-gradient(90deg,${jt.active},${jt.dot})`,animation:"loadBar 2s linear both" }} />
        </div>
        <p style={{ fontSize:".7rem",color:C.txL,marginTop:".6rem" }}>Menutup otomatis...</p>
      </div>
    </div>
  );

  return (
    <div
      style={{ position:"fixed",inset:0,background:"rgba(7,21,43,.65)",zIndex:500,display:"flex",alignItems:"center",justifyContent:"center",padding:"1rem",backdropFilter:"blur(10px) saturate(1.4)",animation:"fadeIn .2s ease" }}
      onClick={e => e.target === e.currentTarget && onClose(false)}
    >
      <div style={{
        background:C.white, borderRadius:30, width:"100%", maxWidth:560,
        maxHeight:"92vh", display:"flex", flexDirection:"column",
        boxShadow:"0 48px 120px rgba(7,21,43,.32), 0 0 0 1px rgba(255,255,255,.08)",
        animation:"dropIn .32s cubic-bezier(.22,1,.36,1) both",
        overflow:"hidden",
      }}>

        {/* ── Header ── */}
        <div style={{ background:`linear-gradient(135deg,${C.navy} 0%,${C.blue} 60%,${C.blueMd} 100%)`, padding:"1.6rem 1.9rem 1.4rem", flexShrink:0, position:"relative", overflow:"hidden" }}>
          {/* Decorative circles */}
          {[{w:200,h:200,top:-80,right:-50,op:.07},{w:100,h:100,top:20,right:80,op:.05}].map((d,i)=>(
            <div key={i} style={{ position:"absolute",width:d.w,height:d.h,borderRadius:"50%",border:"1.5px solid rgba(255,255,255,.18)",top:d.top,right:d.right,opacity:d.op,pointerEvents:"none" }} />
          ))}

          <button onClick={() => onClose(false)} style={{ position:"absolute",top:14,right:14,background:"rgba(255,255,255,.12)",border:"1px solid rgba(255,255,255,.18)",borderRadius:10,width:32,height:32,display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",color:"#fff",fontSize:".9rem",transition:"background .15s",zIndex:2 }}
            onMouseEnter={e=>e.target.style.background="rgba(255,255,255,.25)"}
            onMouseLeave={e=>e.target.style.background="rgba(255,255,255,.12)"}
          >✕</button>

          {/* Item info */}
          <div style={{ display:"flex",alignItems:"center",gap:"1.1rem",marginBottom:"1.35rem",position:"relative",zIndex:1 }}>
            <div style={{ width:60,height:60,borderRadius:18,background:"rgba(255,255,255,.14)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"2.1rem",flexShrink:0,border:"1.5px solid rgba(255,255,255,.22)",boxShadow:"0 8px 24px rgba(0,0,0,.15)" }}>{modal.emoji}</div>
            <div>
              <h3 style={{ fontWeight:900,fontSize:"1.05rem",color:"#fff",marginBottom:".4rem",letterSpacing:"-.2px" }}>{modal.nama}</h3>
              <div style={{ display:"flex",gap:".4rem",flexWrap:"wrap" }}>
                <span style={{ fontSize:".67rem",fontWeight:800,background:jt.pill,color:jt.active,padding:".22rem .65rem",borderRadius:999 }}>{modal.jurusan}</span>
                <span style={{ fontSize:".67rem",color:"rgba(255,255,255,.75)",background:"rgba(255,255,255,.12)",padding:".22rem .65rem",borderRadius:999 }}>{modal.kategori}</span>
                <span style={{ fontSize:".67rem",fontWeight:800,background:C.greenLt,color:C.greenDk,padding:".22rem .65rem",borderRadius:999 }}>✅ {modal.stok} unit</span>
              </div>
            </div>
          </div>

          {/* Step indicator */}
          <div style={{ display:"flex",alignItems:"center",gap:0,position:"relative",zIndex:1 }}>
            {["Isi Detail","Konfirmasi"].map((label, i) => {
              const s = i + 1;
              const active = step === s; const isDone = step > s;
              return (
                <div key={s} style={{ display:"flex",alignItems:"center",flex:1 }}>
                  <div style={{ display:"flex",alignItems:"center",gap:".5rem" }}>
                    <div style={{
                      width:30,height:30,borderRadius:"50%",
                      display:"flex",alignItems:"center",justifyContent:"center",
                      fontWeight:800,fontSize:".75rem",
                      background: isDone?"#10B981":active?"#fff":"rgba(255,255,255,.18)",
                      color: isDone?"#fff":active?C.blue:"rgba(255,255,255,.55)",
                      transition:"all .35s cubic-bezier(.22,1,.36,1)",
                      flexShrink:0,
                      boxShadow: active?"0 0 0 4px rgba(255,255,255,.25)":isDone?"0 0 0 4px rgba(16,185,129,.3)":"none",
                    }}>
                      {isDone ? "✓" : s}
                    </div>
                    <span style={{ fontSize:".75rem",fontWeight:active||isDone?700:500,color:active?"#fff":isDone?"#6EE7B7":"rgba(255,255,255,.45)" }}>{label}</span>
                  </div>
                  {s < 2 && <div className="step-line" style={{ flex:1,margin:"0 .75rem",background:isDone?"#10B981":"rgba(255,255,255,.18)" }} />}
                </div>
              );
            })}
          </div>
        </div>

        {/* ── Body ── */}
        <div style={{ flex:1,overflowY:"auto",padding:"1.5rem 1.85rem" }}>
          {/* Step 1 */}
          {step === 1 && (
            <div style={{ display:"flex",flexDirection:"column",gap:"1.1rem",animation:"fadeInUp .3s ease both" }}>

              {/* Barang info */}
              <div style={{ background:"linear-gradient(145deg,#f8fbff,#f0f7fd)",borderRadius:18,padding:"1.05rem 1.1rem",border:`1px solid ${C.border}` }}>
                <p style={{ fontSize:".65rem",fontWeight:800,color:C.txM,letterSpacing:".1em",textTransform:"uppercase",marginBottom:".75rem" }}>Detail Barang</p>
                <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:".6rem" }}>
                  {[["📍 Lokasi",modal.lokasi],["🔧 Kondisi",modal.kondisi],["📦 Stok",`${modal.stok}/${modal.total} unit`],["⚙️ Spesifikasi",modal.spek]].map(([k,v])=>(
                    <div key={k} style={{ background:C.white,borderRadius:12,padding:".65rem .8rem",border:`1px solid ${C.border}` }}>
                      <p style={{ fontSize:".65rem",color:C.txL,marginBottom:".2rem",fontWeight:500 }}>{k}</p>
                      <p style={{ fontSize:".78rem",fontWeight:700,color:C.tx,lineHeight:1.35 }}>{v}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Jadwal */}
              <div>
                <p style={{ fontSize:".78rem",fontWeight:700,color:C.tx,marginBottom:".7rem" }}>📅 Jadwal Peminjaman</p>
                <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:".75rem" }}>
                  {[{label:"Tanggal Pinjam",val:tgl,set:setTgl},{label:"Tanggal Kembali",val:tglKembali,set:setTglKembali}].map(({label,val,set})=>(
                    <div key={label}>
                      <label style={{ fontSize:".72rem",fontWeight:700,color:C.txM,display:"block",marginBottom:".38rem" }}>{label}</label>
                      <input type="date" value={val} onChange={e=>set(e.target.value)} className="modal-input"
                        onFocus={e=>{e.target.style.borderColor=C.blueMd;e.target.style.boxShadow="0 0 0 4px rgba(46,128,216,.10)";e.target.style.background="#fff";}}
                        onBlur={e=>{e.target.style.borderColor="rgba(30,90,171,.12)";e.target.style.boxShadow="none";e.target.style.background="#F8FBFF";}}
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Durasi feedback */}
              {durasi > 0 && (
                <div style={{
                  borderRadius:14,padding:".8rem 1rem",
                  display:"flex",alignItems:"center",gap:".7rem",
                  background:durasi>7?C.redLt:C.greenLt,
                  border:`1px solid ${durasi>7?"#fca5a5":"#6ee7b7"}`,
                  animation:"fadeInUp .3s ease both",
                  boxShadow:`0 4px 16px ${durasi>7?"#ef444422":"#10b98122"}`,
                }}>
                  <span style={{ fontSize:"1.25rem",flexShrink:0 }}>{durasi>7?"⚠️":"✅"}</span>
                  <div>
                    <p style={{ fontWeight:800,fontSize:".83rem",color:durasi>7?C.redDk:C.greenDk }}>Durasi: {durasi} hari</p>
                    <p style={{ fontSize:".72rem",color:durasi>7?C.red:C.green,marginTop:".1rem" }}>{durasi>7?"Melebihi batas maksimal 7 hari!":"Dalam batas waktu normal ✓"}</p>
                  </div>
                </div>
              )}

              {/* Catatan */}
              <div>
                <label style={{ fontSize:".72rem",fontWeight:700,color:C.txM,display:"block",marginBottom:".38rem" }}>📝 Catatan (opsional)</label>
                <textarea value={catatan} onChange={e=>setCatatan(e.target.value)} rows={3}
                  placeholder="Contoh: untuk praktikum IoT kelas XI PPLG..."
                  className="modal-input"
                  style={{ resize:"none",lineHeight:1.65 }}
                  onFocus={e=>{e.target.style.borderColor=C.blueMd;e.target.style.boxShadow="0 0 0 4px rgba(46,128,216,.10)";e.target.style.background="#fff";}}
                  onBlur={e=>{e.target.style.borderColor="rgba(30,90,171,.12)";e.target.style.boxShadow="none";e.target.style.background="#F8FBFF";}}
                />
              </div>

              {/* Aturan */}
              <div style={{ background:`linear-gradient(135deg,${C.yellowLt},#fffbeb)`,borderRadius:16,padding:"1rem 1.1rem",border:"1px solid #fde68a",boxShadow:"0 2px 10px #f59e0b18" }}>
                <p style={{ fontSize:".68rem",fontWeight:800,color:C.yellowDk,marginBottom:".7rem",letterSpacing:".06em",textTransform:"uppercase" }}>⚠️ Syarat & Ketentuan</p>
                <div style={{ display:"flex",flexDirection:"column",gap:".45rem" }}>
                  {aturan.map((a,i)=>(
                    <div key={i} style={{ display:"flex",alignItems:"center",gap:".65rem",fontSize:".77rem",color:"#78350f" }}>
                      <span style={{ fontSize:".9rem",flexShrink:0 }}>{a.icon}</span>{a.text}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 2 */}
          {step === 2 && (
            <div style={{ display:"flex",flexDirection:"column",gap:"1.1rem",animation:"fadeInUp .3s ease both" }}>
              <div style={{ background:"linear-gradient(145deg,#f8fbff,#eef5fc)",borderRadius:20,padding:"1.35rem",border:`1px solid ${C.border}` }}>
                <p style={{ fontSize:".65rem",fontWeight:800,color:C.txM,letterSpacing:".1em",textTransform:"uppercase",marginBottom:"1.1rem" }}>Ringkasan Peminjaman</p>
                {/* Item preview */}
                <div style={{ display:"flex",alignItems:"center",gap:".9rem",background:C.white,borderRadius:15,padding:".9rem 1rem",marginBottom:"1rem",border:`1px solid ${C.border}`,boxShadow:"0 2px 8px rgba(15,45,82,.04)" }}>
                  <div style={{ width:50,height:50,borderRadius:14,background:jt.pill,display:"flex",alignItems:"center",justifyContent:"center",fontSize:"1.75rem",flexShrink:0,boxShadow:`0 4px 12px ${jt.glow}22` }}>{modal.emoji}</div>
                  <div>
                    <p style={{ fontWeight:800,fontSize:".9rem",color:C.tx }}>{modal.nama}</p>
                    <p style={{ fontSize:".71rem",color:C.txM,marginTop:".15rem" }}>📍 {modal.lokasi}</p>
                  </div>
                </div>
                {[
                  ["Jurusan",modal.jurusan],
                  ["Tanggal Pinjam", new Date(tgl).toLocaleDateString("id-ID",{day:"numeric",month:"long",year:"numeric"})],
                  ["Tanggal Kembali", new Date(tglKembali).toLocaleDateString("id-ID",{day:"numeric",month:"long",year:"numeric"})],
                  ["Durasi", `${durasi} hari`],
                  ...(catatan?[["Catatan",catatan]]:[]),
                ].map(([k,v])=>(
                  <div key={k} style={{ display:"flex",justifyContent:"space-between",alignItems:"flex-start",padding:".52rem 0",borderBottom:`1px solid ${C.border}` }}>
                    <p style={{ fontSize:".77rem",color:C.txM,fontWeight:500 }}>{k}</p>
                    <p style={{ fontSize:".8rem",fontWeight:700,color:C.tx,textAlign:"right",maxWidth:"58%",lineHeight:1.4 }}>{v}</p>
                  </div>
                ))}
              </div>

              <div style={{ background:`linear-gradient(135deg,${C.greenLt},#ecfdf5)`,borderRadius:16,padding:"1rem 1.1rem",border:"1px solid #6ee7b7",display:"flex",gap:".75rem",alignItems:"flex-start",boxShadow:"0 2px 10px #10b98118" }}>
                <span style={{ fontSize:"1.3rem",flexShrink:0 }}>✅</span>
                <p style={{ fontSize:".8rem",color:C.greenDk,fontWeight:600,lineHeight:1.65 }}>
                  Dengan mengkonfirmasi, kamu menyetujui seluruh syarat & ketentuan peminjaman barang SIJAR dan bertanggung jawab atas kondisi barang selama masa pinjam.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* ── Footer actions ── */}
        <div style={{ padding:"1.15rem 1.85rem",borderTop:`1px solid ${C.border}`,display:"flex",gap:".75rem",flexShrink:0,background:"#fafcff" }}>
          <button onClick={() => step===1?onClose(false):setStep(1)}
            style={{ flex:1,padding:".72rem",borderRadius:14,border:`1.5px solid ${C.border}`,background:"transparent",color:C.txM,fontFamily:"'Plus Jakarta Sans',sans-serif",fontWeight:700,fontSize:".85rem",cursor:"pointer",transition:"background .15s,color .15s" }}
            onMouseEnter={e=>{e.currentTarget.style.background=C.sky;e.currentTarget.style.color=C.tx;}}
            onMouseLeave={e=>{e.currentTarget.style.background="transparent";e.currentTarget.style.color=C.txM;}}
          >{step===1?"Batal":"← Kembali"}</button>
          <button
            disabled={step===1&&!canNext}
            onClick={()=>step===1?setStep(2):handleConfirm()}
            style={{
              flex:2,padding:".72rem",borderRadius:14,border:"none",
              fontFamily:"'Plus Jakarta Sans',sans-serif",fontWeight:800,fontSize:".87rem",
              cursor:step===1&&!canNext?"not-allowed":"pointer",
              background:step===2?`linear-gradient(135deg,${C.greenDk},${C.green})`:(canNext?`linear-gradient(135deg,${jt.active},${jt.dot})`:"#E2E8F0"),
              color:step===2?"#fff":(canNext?"#fff":C.txM),
              boxShadow:step===2?`0 6px 22px ${C.green}44`:canNext?`0 6px 22px ${jt.glow}44`:"none",
              transition:"opacity .15s,transform .2s,box-shadow .2s",
              position:"relative",overflow:"hidden",
            }}
            onMouseEnter={e=>{if(step===2||(step===1&&canNext)){e.currentTarget.style.transform="scale(1.025)";e.currentTarget.style.opacity=".95";}}}
            onMouseLeave={e=>{e.currentTarget.style.transform="scale(1)";e.currentTarget.style.opacity="1";}}
          >
            {step===1?"Lanjut → Konfirmasi":"✅ Konfirmasi Pinjam"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function PeminjamanPage() {
  const [activeJurusan, setActiveJurusan] = useState("Semua");
  const [search, setSearch] = useState("");
  const [modal, setModal] = useState(null);
<<<<<<< HEAD
  const [tgl, setTgl] = useState("");
  const [tglKembali, setTglKembali] = useState("");
  const [berhasil, setBerhasil] = useState(false);
=======
  const [toast, setToast] = useState(false);
>>>>>>> 67e6dec (nambah page)

  const theme = JURUSAN_THEME[activeJurusan];

  const filtered = barangList.filter(b => {
    const matchJ = activeJurusan === "Semua" || b.jurusan === activeJurusan;
    const matchS = b.nama.toLowerCase().includes(search.toLowerCase());
    return matchJ && matchS;
  });

<<<<<<< HEAD
  const handlePinjam = () => {
    if (!tgl || !tglKembali) return;
    setModal(null);
    setBerhasil(true);
    setTgl(""); setTglKembali("");
    setTimeout(() => setBerhasil(false), 3000);
  };

  return (
    <DashboardLayout>
      <style>{`
        .barang-card { background: #fff; border-radius: 18px; border: 1px solid rgba(74,144,217,.08); overflow: hidden; transition: box-shadow .22s, transform .22s; }
        .barang-card:hover { box-shadow: 0 10px 32px rgba(74,144,217,.13); transform: translateY(-3px); }
        .jurusan-btn { border: none; cursor: pointer; border-radius: 99px; font-family: 'Plus Jakarta Sans',sans-serif; font-weight: 600; font-size: .82rem; padding: .45rem 1.1rem; transition: all .18s; }
        .modal-overlay { position: fixed; inset: 0; background: rgba(15,30,60,.5); z-index: 300; display: flex; align-items: center; justify-content: center; padding: 1rem; backdrop-filter: blur(6px); }
        .modal-box { background: #fff; border-radius: 24px; padding: 2rem; width: 100%; max-width: 440px; box-shadow: 0 24px 64px rgba(0,0,0,.15); }
        .form-input { width: 100%; padding: .65rem .9rem; border: 1.5px solid #E8EFF8; border-radius: 10px; font-family: 'DM Sans',sans-serif; font-size: .875rem; color: #1E3A5F; outline: none; transition: border-color .18s; background: #F8FBFF; }
        .form-input:focus { border-color: #4A90D9; background: #fff; }
        .toast { position: fixed; bottom: 2rem; right: 2rem; background: #1A3F70; color: #fff; padding: .85rem 1.4rem; border-radius: 14px; font-size: .875rem; font-weight: 600; z-index: 500; box-shadow: 0 8px 24px rgba(0,0,0,.15); display: flex; align-items: center; gap: .5rem; animation: slideIn .3s ease; }
        @keyframes slideIn { from { transform: translateX(20px); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
        .progress-bar { height: 5px; border-radius: 99px; background: rgba(74,144,217,.12); overflow: hidden; }
        .progress-fill { height: 100%; border-radius: 99px; }
      `}</style>

      {/* Header */}
      <div style={{ marginBottom: "1.75rem" }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: ".35rem", background: COLORS.blueLtr, color: COLORS.blueDk, fontSize: ".7rem", fontWeight: 700, letterSpacing: ".07em", textTransform: "uppercase", padding: ".25rem .75rem", borderRadius: 9999, marginBottom: ".5rem" }}>
          📦 Peminjaman
        </div>
        <h1 style={{ fontSize: "1.6rem", fontWeight: 800, color: COLORS.blueDkr, marginBottom: ".25rem" }}>Peminjaman Barang</h1>
        <p style={{ color: COLORS.txM, fontSize: ".88rem" }}>Pilih barang yang ingin kamu pinjam dari inventaris jurusan.</p>
      </div>

      {/* Filter bar */}
      <div style={{ background: COLORS.white, borderRadius: 16, border: "1px solid rgba(74,144,217,.08)", padding: "1rem 1.25rem", marginBottom: "1.5rem", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: ".75rem" }}>
        <div style={{ display: "flex", gap: ".5rem", flexWrap: "wrap" }}>
          {Object.keys(JURUSAN_THEME).map(j => {
            const t = JURUSAN_THEME[j];
            const isActive = activeJurusan === j;
            return (
              <button
                key={j}
                className="jurusan-btn"
                onClick={() => setActiveJurusan(j)}
                style={{
                  background: isActive ? t.activeBg : "#F0F7FF",
                  color: isActive ? t.active : COLORS.txM,
                  border: isActive ? `2px solid ${t.active}` : "2px solid transparent",
                  boxShadow: isActive ? `0 2px 10px ${t.activeBg}` : "none",
                }}
              >
=======
  const handleClose = (success) => {
    setModal(null);
    if (success) { setToast(true); setTimeout(() => setToast(false), 3800); }
  };

  const statData = [
    { icon:"✅", label:"Tersedia",    val:barangList.filter(b=>b.stok>0).length,  bg:C.greenLt,  c:C.greenDk,  border:"#6EE7B7", delay:0    },
    { icon:"⛔", label:"Stok Habis",  val:barangList.filter(b=>b.stok===0).length, bg:C.redLt,    c:C.redDk,    border:"#FCA5A5", delay:.07  },
    { icon:"📦", label:"Total Jenis", val:barangList.length,                        bg:C.sky,      c:C.blue,     border:C.bluePale,delay:.14  },
    { icon:"🏫", label:"Jurusan",     val:5,                                         bg:C.yellowLt, c:C.yellowDk, border:"#FDE68A", delay:.21  },
  ];

  return (
    <DashboardLayout>
      <style>{CSS}</style>

      {/* ── HERO HEADER ── */}
      <div style={{
        background:`linear-gradient(130deg,${C.navy} 0%,${C.blue} 55%,${C.blueMd} 100%)`,
        borderRadius:26, padding:"2rem 2.25rem", marginBottom:"1.5rem",
        position:"relative", overflow:"hidden",
        boxShadow:`0 18px 56px rgba(15,45,82,.28), 0 0 0 1px rgba(255,255,255,.06)`,
        animation:"fadeInUp .5s ease both",
      }}>
        {/* BG circles */}
        {[{w:340,h:340,top:"-110px",right:"-80px",op:.07},{w:200,h:200,top:"30px",right:"140px",op:.05},{w:260,h:260,bottom:"-90px",left:"-70px",op:.06}].map((d,i)=>(
          <div key={i} style={{ position:"absolute",width:d.w,height:d.h,borderRadius:"50%",border:"1.5px solid rgba(255,255,255,.18)",top:d.top,right:d.right,bottom:d.bottom,left:d.left,opacity:d.op,pointerEvents:"none" }} />
        ))}

        <div style={{ position:"relative",zIndex:1,display:"flex",alignItems:"flex-end",justifyContent:"space-between",flexWrap:"wrap",gap:"1.25rem" }}>
          <div>
            <div style={{ display:"inline-flex",alignItems:"center",gap:".4rem",background:"rgba(255,255,255,.12)",border:"1px solid rgba(255,255,255,.2)",color:"rgba(255,255,255,.9)",fontSize:".68rem",fontWeight:700,letterSpacing:".1em",textTransform:"uppercase",padding:".26rem .85rem",borderRadius:9999,marginBottom:".8rem" }}>
              📦 Peminjaman Barang
            </div>
            <h1 style={{ fontSize:"clamp(1.5rem,3vw,2rem)",fontWeight:900,color:"#fff",letterSpacing:"-.5px",lineHeight:1.1,marginBottom:".45rem" }}>
              Pinjam Peralatan Jurusan
            </h1>
            <p style={{ color:"rgba(255,255,255,.65)",fontSize:".85rem",fontWeight:500,maxWidth:380 }}>
              Pilih barang dari inventaris dan ajukan peminjaman dengan mudah & transparan.
            </p>
          </div>

          {/* Hero quick stats */}
          <div style={{ display:"flex",gap:".85rem",flexWrap:"wrap" }}>
            {[
              { label:"Total Barang", val:barangList.length, icon:"📦", bg:"rgba(255,255,255,.10)", border:"rgba(255,255,255,.2)", c:"#fff" },
              { label:"Tersedia",     val:barangList.filter(b=>b.stok>0).length, icon:"✅", bg:"rgba(16,185,129,.18)", border:"rgba(52,211,153,.3)", c:"#6ee7b7" },
            ].map(s=>(
              <div key={s.label} style={{ background:s.bg,border:`1px solid ${s.border}`,borderRadius:16,padding:".8rem 1.1rem",backdropFilter:"blur(10px)",textAlign:"center",minWidth:90 }}>
                <div style={{ fontSize:"1.1rem",marginBottom:".2rem" }}>{s.icon}</div>
                <div style={{ fontSize:"1.4rem",fontWeight:900,color:s.c,lineHeight:1 }}>{s.val}</div>
                <div style={{ fontSize:".62rem",color:"rgba(255,255,255,.55)",fontWeight:600,marginTop:".2rem",letterSpacing:".04em" }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── STAT CARDS ── */}
      <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(145px,1fr))",gap:".85rem",marginBottom:"1.5rem" }}>
        {statData.map((s,i)=><StatCard key={i} {...s} />)}
      </div>

      {/* ── FILTER + SEARCH BAR ── */}
      <div style={{
        background:C.white, borderRadius:20,
        border:`1px solid rgba(30,90,171,.08)`,
        padding:"1rem 1.3rem", marginBottom:"1.5rem",
        display:"flex", alignItems:"center", justifyContent:"space-between",
        flexWrap:"wrap", gap:".75rem",
        boxShadow:"0 2px 12px rgba(15,45,82,.05)",
        animation:"fadeInUp .45s ease .1s both",
      }}>
        <div style={{ display:"flex",gap:".45rem",flexWrap:"wrap" }}>
          {Object.entries(JURUSAN_THEME).map(([j, t]) => {
            const isA = activeJurusan === j;
            const count = j === "Semua" ? barangList.length : barangList.filter(b=>b.jurusan===j).length;
            return (
              <button key={j} className="jurusan-tab"
                onClick={() => setActiveJurusan(j)}
                style={{
                  background: isA ? `linear-gradient(135deg,${t.active},${t.dot})` : C.sky,
                  color: isA ? "#fff" : C.txM,
                  borderColor: isA ? "transparent" : "transparent",
                  boxShadow: isA ? `0 4px 16px ${t.glow}44` : "none",
                }}>
>>>>>>> 67e6dec (nambah page)
                {j}
                <span style={{
                  marginLeft:".35rem",
                  background:isA?"rgba(255,255,255,.22)":"#dde8f5",
                  color:isA?"#fff":C.txM,
                  fontSize:".62rem",fontWeight:800,
                  padding:".05rem .45rem",borderRadius:9999,
                }}>{count}</span>
              </button>
            );
          })}
        </div>
<<<<<<< HEAD
        <div style={{ position: "relative" }}>
          <svg style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", color: COLORS.txM }} width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35"/></svg>
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Cari barang..."
            style={{ paddingLeft: "2.2rem", paddingRight: ".9rem", paddingTop: ".55rem", paddingBottom: ".55rem", border: "1.5px solid #E8EFF8", borderRadius: 12, fontSize: ".85rem", color: COLORS.tx, background: "#F8FBFF", outline: "none", fontFamily: "'DM Sans',sans-serif", width: 200 }}
          />
        </div>
      </div>

      {/* Barang grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "1.1rem" }}>
        {filtered.length === 0 ? (
          <div style={{ gridColumn: "1/-1", textAlign: "center", padding: "3rem", color: COLORS.txM }}>
            <p style={{ fontSize: "2rem", marginBottom: ".5rem" }}>🔍</p>
            <p style={{ fontWeight: 600 }}>Barang tidak ditemukan</p>
          </div>
        ) : filtered.map(b => {
          const jTheme = JURUSAN_THEME[b.jurusan];
          const persen = Math.round((b.stok / b.total) * 100);
          return (
            <div key={b.id} className="barang-card">
              <div style={{ height: 130, background: `linear-gradient(135deg, ${jTheme.bg}, ${jTheme.activeBg}30)`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "3.5rem" }}>
                {b.emoji}
              </div>
              <div style={{ padding: "1rem 1.1rem" }}>
                <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: ".5rem" }}>
                  <p style={{ fontWeight: 700, fontSize: ".9rem", color: COLORS.tx, flex: 1, marginRight: ".5rem" }}>{b.nama}</p>
                  <span style={{ fontSize: ".68rem", fontWeight: 700, background: b.status === "Tersedia" ? COLORS.greenLt : COLORS.redLt, color: b.status === "Tersedia" ? COLORS.green : COLORS.red, padding: ".2rem .55rem", borderRadius: 9999, flexShrink: 0 }}>
                    {b.status}
                  </span>
                </div>
                <div style={{ display: "flex", gap: ".4rem", marginBottom: ".75rem" }}>
                  <span style={{ fontSize: ".7rem", fontWeight: 700, background: jTheme.activeBg, color: jTheme.active, padding: ".15rem .5rem", borderRadius: 9999 }}>{b.jurusan}</span>
                  <span style={{ fontSize: ".7rem", color: COLORS.txM, background: COLORS.sky, padding: ".15rem .5rem", borderRadius: 9999 }}>{b.kategori}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: ".72rem", color: COLORS.txM, marginBottom: ".35rem" }}>
                  <span>Stok tersedia</span>
                  <span style={{ fontWeight: 700, color: b.stok === 0 ? COLORS.red : COLORS.tx }}>{b.stok}/{b.total}</span>
                </div>
                <div className="progress-bar" style={{ marginBottom: ".85rem" }}>
                  <div className="progress-fill" style={{ width: `${persen}%`, background: b.stok === 0 ? COLORS.red : persen < 40 ? COLORS.yellow : `linear-gradient(90deg, ${jTheme.active}, ${jTheme.activeBg})` }} />
                </div>
                <button
                  disabled={b.stok === 0}
                  onClick={() => b.stok > 0 && setModal(b)}
                  style={{ width: "100%", padding: ".6rem", borderRadius: 12, border: "none", fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 700, fontSize: ".83rem", cursor: b.stok === 0 ? "not-allowed" : "pointer", background: b.stok === 0 ? "#E8EFF8" : `linear-gradient(135deg, ${jTheme.active}, ${COLORS.blueDk})`, color: b.stok === 0 ? COLORS.txM : "#fff", transition: "opacity .18s" }}
                >
                  {b.stok === 0 ? "Stok Habis" : "Pinjam Sekarang"}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal pinjam */}
      {modal && (
        <div className="modal-overlay" onClick={e => e.target === e.currentTarget && setModal(null)}>
          <div className="modal-box">
            <div style={{ display: "flex", alignItems: "center", gap: ".85rem", marginBottom: "1.5rem" }}>
              <div style={{ width: 52, height: 52, borderRadius: 14, background: JURUSAN_THEME[modal.jurusan].activeBg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.6rem" }}>{modal.emoji}</div>
              <div>
                <h3 style={{ fontWeight: 800, fontSize: "1rem", color: COLORS.blueDkr }}>{modal.nama}</h3>
                <p style={{ fontSize: ".78rem", color: COLORS.txM }}>{modal.jurusan} · {modal.kategori}</p>
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: ".85rem", marginBottom: "1.25rem" }}>
              <div>
                <label style={{ fontSize: ".78rem", fontWeight: 600, color: COLORS.tx, display: "block", marginBottom: ".35rem" }}>Tanggal Pinjam</label>
                <input type="date" className="form-input" value={tgl} onChange={e => setTgl(e.target.value)} />
              </div>
              <div>
                <label style={{ fontSize: ".78rem", fontWeight: 600, color: COLORS.tx, display: "block", marginBottom: ".35rem" }}>Tanggal Kembali</label>
                <input type="date" className="form-input" value={tglKembali} onChange={e => setTglKembali(e.target.value)} />
              </div>
            </div>
            <div style={{ display: "flex", gap: ".75rem" }}>
              <button onClick={() => setModal(null)} style={{ flex: 1, padding: ".65rem", borderRadius: 12, border: "1.5px solid #D6EAFA", background: "transparent", color: COLORS.blue, fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 600, cursor: "pointer" }}>Batal</button>
              <button onClick={handlePinjam} style={{ flex: 2, padding: ".65rem", borderRadius: 12, border: "none", background: `linear-gradient(135deg, ${COLORS.blueDk}, ${COLORS.blue})`, color: "#fff", fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 700, cursor: "pointer" }}>Konfirmasi Pinjam</button>
            </div>
          </div>
        </div>
      )}

      {berhasil && <div className="toast">✅ Peminjaman berhasil diajukan!</div>}
=======

        {/* Search */}
        <div style={{ position:"relative" }}>
          <svg style={{ position:"absolute",left:11,top:"50%",transform:"translateY(-50%)",pointerEvents:"none" }} width="14" height="14" fill="none" stroke={C.txM} strokeWidth="2" viewBox="0 0 24 24">
            <circle cx="11" cy="11" r="8"/><path strokeLinecap="round" d="M21 21l-4.35-4.35"/>
          </svg>
          <input className="search-pm"
            placeholder="Cari nama barang..."
            value={search} onChange={e=>setSearch(e.target.value)} />
        </div>
      </div>

      {/* ── RESULTS INFO ── */}
      {(search || activeJurusan !== "Semua") && (
        <div style={{ marginBottom:"1rem",display:"flex",alignItems:"center",gap:".5rem",animation:"fadeInUp .3s ease both" }}>
          <span style={{ fontSize:".75rem",color:C.txM,fontWeight:500 }}>Menampilkan</span>
          <span style={{ fontWeight:800,color:C.blue,fontSize:".8rem" }}>{filtered.length}</span>
          <span style={{ fontSize:".75rem",color:C.txM }}>barang</span>
          {activeJurusan !== "Semua" && (
            <span style={{ fontSize:".72rem",fontWeight:700,background:JURUSAN_THEME[activeJurusan].pill,color:JURUSAN_THEME[activeJurusan].active,padding:".2rem .65rem",borderRadius:9999 }}>
              Jurusan {activeJurusan}
            </span>
          )}
          {search && (
            <span style={{ fontSize:".72rem",fontWeight:600,color:C.txM }}>· kata kunci "{search}"</span>
          )}
        </div>
      )}

      {/* ── GRID ── */}
      {filtered.length === 0 ? (
        <div className="empty-pm">
          <div style={{ fontSize:"3.5rem",marginBottom:".75rem" }}>🔍</div>
          <p style={{ fontWeight:800,fontSize:".95rem",color:C.tx,marginBottom:".35rem" }}>Barang tidak ditemukan</p>
          <p style={{ fontSize:".82rem",color:C.txM }}>Coba ubah filter jurusan atau kata kunci pencarian</p>
        </div>
      ) : (
        <div style={{
          display:"grid",
          gridTemplateColumns:"repeat(auto-fill,minmax(265px,1fr))",
          gap:"1.15rem",
        }}>
          {filtered.map((b, i) => (
            <div key={b.id} style={{ animation:`cardReveal .45s cubic-bezier(.22,1,.36,1) ${i*.055}s both` }}>
              <BarangCard b={b} onPinjam={setModal} />
            </div>
          ))}
        </div>
      )}

      {modal && <PinjamModal modal={modal} onClose={handleClose} />}

      {/* ── TOAST ── */}
      {toast && (
        <div className="toast-pm">
          <div style={{ width:36,height:36,borderRadius:11,background:"rgba(255,255,255,.18)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"1.2rem",flexShrink:0 }}>🎉</div>
          <div>
            <p style={{ fontWeight:800,fontSize:".875rem",marginBottom:".1rem" }}>Peminjaman Berhasil Diajukan!</p>
            <p style={{ fontWeight:500,fontSize:".75rem",opacity:.85 }}>Cek halaman riwayat untuk detail status.</p>
          </div>
        </div>
      )}
>>>>>>> 67e6dec (nambah page)
    </DashboardLayout>
  );
}
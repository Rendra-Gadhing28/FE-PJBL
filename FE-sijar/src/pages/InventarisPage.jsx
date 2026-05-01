<<<<<<< HEAD
import { useState } from "react";
import DashboardLayout from "./DashboardLayout";
=======
import { useState, useEffect } from "react";
import DashboardLayout from "./Dashboardlayout";
>>>>>>> 67e6dec (nambah page)

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

const JT = {
  PPLG:{ bg:"#EFF6FF", pill:"#BFDBFE", active:"#2563AB", dot:"#60A5FA", glow:"#3b82f6" },
  TJKT:{ bg:"#FFF7ED", pill:"#FED7AA", active:"#C2410C", dot:"#F97316", glow:"#f97316" },
  DKV: { bg:"#FEFCE8", pill:"#FEF08A", active:"#A16207", dot:"#EAB308", glow:"#eab308" },
  LK:  { bg:"#F0FDF4", pill:"#BBF7D0", active:"#15803D", dot:"#22C55E", glow:"#22c55e" },
  PS:  { bg:"#EFF6FF", pill:"#93C5FD", active:"#1E3A5F", dot:"#1E3A5F", glow:"#1E3A5F" },
};
const getJT = j => JT[j] || { bg:C.sky, pill:C.bluePale, active:C.blueMd, dot:C.blueMd, glow:C.blueMd };

const inventarisData = [
  { id:"INV-001", name:"Laptop Dell Inspiron 15",        jurusan:"PPLG", kategori:"Elektronik",     total:8,  tersedia:5, dipinjam:3, kondisi:"Baik", tahun:2022, icon:"💻" },
  { id:"INV-002", name:"Laptop ASUS VivoBook 14",         jurusan:"PPLG", kategori:"Elektronik",     total:6,  tersedia:3, dipinjam:3, kondisi:"Baik", tahun:2023, icon:"💻" },
  { id:"INV-003", name:"Arduino Uno Rev3",                jurusan:"PPLG", kategori:"Mikrokontroler", total:10, tersedia:8, dipinjam:2, kondisi:"Baik", tahun:2023, icon:"🔌" },
  { id:"INV-004", name:"Proyektor Epson EB-X41",          jurusan:"TJKT", kategori:"Elektronik",     total:3,  tersedia:2, dipinjam:1, kondisi:"Baik", tahun:2021, icon:"📽️" },
  { id:"INV-005", name:"Router MikroTik RB951",           jurusan:"TJKT", kategori:"Jaringan",       total:6,  tersedia:6, dipinjam:0, kondisi:"Baik", tahun:2022, icon:"📡" },
  { id:"INV-006", name:"Switch Cisco Catalyst 2960",      jurusan:"TJKT", kategori:"Jaringan",       total:4,  tersedia:4, dipinjam:0, kondisi:"Baik", tahun:2022, icon:"🔁" },
  { id:"INV-007", name:"Stetoskop Littmann Classic III",  jurusan:"LK",   kategori:"Medis",          total:4,  tersedia:0, dipinjam:4, kondisi:"Baik", tahun:2023, icon:"🩺" },
  { id:"INV-008", name:"Tensimeter Digital Omron",        jurusan:"LK",   kategori:"Medis",          total:5,  tersedia:3, dipinjam:2, kondisi:"Baik", tahun:2023, icon:"🩸" },
  { id:"INV-009", name:"Manekin Anatomi Manusia",         jurusan:"LK",   kategori:"Medis",          total:2,  tersedia:2, dipinjam:0, kondisi:"Baik", tahun:2020, icon:"🫀" },
  { id:"INV-010", name:"Kamera DSLR Canon EOS 200D",      jurusan:"DKV",  kategori:"Elektronik",     total:3,  tersedia:3, dipinjam:0, kondisi:"Baik", tahun:2022, icon:"📷" },
  { id:"INV-011", name:"Tablet Grafis Wacom Intuos",      jurusan:"DKV",  kategori:"Elektronik",     total:5,  tersedia:4, dipinjam:1, kondisi:"Baik", tahun:2023, icon:"🎨" },
  { id:"INV-012", name:"Tripod Kamera Beike BK-666",      jurusan:"DKV",  kategori:"Aksesoris",      total:5,  tersedia:5, dipinjam:0, kondisi:"Baik", tahun:2022, icon:"📸" },
  { id:"INV-013", name:"Peralatan Masak Lengkap",         jurusan:"PS",   kategori:"Memasak",        total:4,  tersedia:2, dipinjam:2, kondisi:"Baik", tahun:2022, icon:"🍳" },
  { id:"INV-014", name:"Timbangan Digital Presisi",       jurusan:"PS",   kategori:"Alat Ukur",      total:3,  tersedia:3, dipinjam:0, kondisi:"Baik", tahun:2023, icon:"⚖️" },
];

// ─── Counter hook ─────────────────────────────────────────────────────────────
function useCounter(target, dur = 950) {
  const [n, setN] = useState(0);
  useEffect(() => {
    let s = 0; const step = Math.ceil(target / (dur / 16));
    const t = setInterval(() => { s += step; if (s >= target) { setN(target); clearInterval(t); } else setN(s); }, 16);
    return () => clearInterval(t);
  }, [target]);
  return n;
}

// ─── CSS ─────────────────────────────────────────────────────────────────────
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,400;0,500;0,600;0,700;0,800;0,900&family=DM+Mono:wght@400;500&display=swap');

@keyframes fadeInUp  { from{opacity:0;transform:translateY(18px)} to{opacity:1;transform:translateY(0)} }
@keyframes fadeIn    { from{opacity:0} to{opacity:1} }
@keyframes cardReveal{ from{opacity:0;transform:translateY(22px) scale(.97)} to{opacity:1;transform:translateY(0) scale(1)} }
@keyframes modalDrop { from{opacity:0;transform:scale(.93) translateY(-14px)} to{opacity:1;transform:scale(1) translateY(0)} }
@keyframes shimmer   { from{transform:translateX(-120%)} to{transform:translateX(120%)} }
@keyframes dotBlink  { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.4;transform:scale(1.6)} }
@keyframes gradPan   { 0%{background-position:0% 50%} 50%{background-position:100% 50%} 100%{background-position:0% 50%} }
@keyframes rowSlide  { from{opacity:0;transform:translateX(-10px)} to{opacity:1;transform:translateX(0)} }
@keyframes float     { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-5px)} }

/* ── Stat cards ── */
.inv-stat {
  position:relative; overflow:hidden;
  border-radius:22px; padding:1.15rem 1.2rem;
  cursor:default;
  transition:transform .3s cubic-bezier(.22,1,.36,1), box-shadow .3s;
  animation:fadeInUp .55s cubic-bezier(.22,1,.36,1) both;
}
.inv-stat::after {
  content:''; position:absolute; top:0; left:-100%;
  width:55%; height:100%;
  background:linear-gradient(105deg,transparent,rgba(255,255,255,.55),transparent);
  pointer-events:none;
}
.inv-stat:hover { transform:translateY(-6px) scale(1.03); }
.inv-stat:hover::after { animation:shimmer .65s ease; }

/* ── Filter tabs ── */
.inv-tab {
  position:relative; overflow:hidden;
  padding:.52rem 1.2rem; border-radius:13px;
  border:1.5px solid transparent;
  font-family:'Plus Jakarta Sans',sans-serif;
  font-weight:700; font-size:.79rem;
  cursor:pointer; white-space:nowrap;
  transition:all .22s cubic-bezier(.22,1,.36,1);
}
.inv-tab:hover { transform:translateY(-2px); }
.inv-tab:active { transform:scale(.97); }

/* ── Search ── */
.inv-search {
  border:1.5px solid rgba(30,90,171,.12); border-radius:13px;
  padding:.56rem .92rem .56rem 2.3rem;
  font-size:.83rem; font-family:'Plus Jakarta Sans',sans-serif;
  outline:none; background:#F8FBFF; color:#0F2D52; width:225px;
  transition:border-color .2s, box-shadow .2s, background .2s;
}
.inv-search:focus { border-color:#2E80D8; box-shadow:0 0 0 4px rgba(46,128,216,.10); background:#fff; }
.inv-search::placeholder { color:#8AAED4; font-weight:500; }

/* ── Inv card ── */
.inv-card {
  background:#fff; border-radius:24px;
  border:1.5px solid rgba(30,90,171,.08);
  overflow:hidden; display:flex; flex-direction:column;
  cursor:pointer; position:relative;
  transition:transform .28s cubic-bezier(.22,1,.36,1), box-shadow .28s, border-color .28s;
}
.inv-card:hover { transform:translateY(-7px) scale(1.012); }
.inv-card .card-shine {
  position:absolute; inset:0; border-radius:24px;
  background:linear-gradient(135deg,rgba(255,255,255,.18) 0%,transparent 55%);
  pointer-events:none; z-index:1; opacity:0; transition:opacity .3s;
}
.inv-card:hover .card-shine { opacity:1; }

/* ── View toggle ── */
.view-btn {
  padding:.42rem .6rem; border-radius:9px; border:none;
  cursor:pointer; transition:all .15s;
  display:flex; align-items:center; justify-content:center;
}

/* ── Table rows ── */
.tbl-row {
  display:grid;
  grid-template-columns:95px 2.5fr 80px 100px 65px 75px 78px 72px;
  gap:.5rem; align-items:center;
  padding:.72rem 1.1rem; border-radius:13px;
  cursor:pointer; position:relative;
  transition:background .16s, transform .2s;
  animation:rowSlide .38s cubic-bezier(.22,1,.36,1) both;
}
.tbl-row::before {
  content:''; position:absolute; left:0; top:20%; bottom:20%;
  width:3px; border-radius:99px; background:transparent;
  transition:background .2s;
}
.tbl-row:hover { background:linear-gradient(90deg,rgba(235,245,253,.95),rgba(248,251,255,.5)); transform:translateX(4px); }
.tbl-row:hover::before { background:#2E80D8; }

/* ── Detail btn ── */
.detail-btn {
  background:#EBF5FD; border:1px solid rgba(30,90,171,.12);
  border-radius:10px; padding:.32rem .7rem;
  cursor:pointer; color:#1A5EAB;
  font-size:.72rem; font-weight:700;
  font-family:'Plus Jakarta Sans',sans-serif;
  transition:background .15s, transform .15s, box-shadow .15s;
}
.detail-btn:hover { background:#C2DFF7; transform:scale(1.05); box-shadow:0 2px 8px rgba(46,128,216,.2); }

/* ── Modal ── */
.modal-overlay {
  position:fixed; inset:0; background:rgba(7,21,43,.6); z-index:500;
  display:flex; align-items:center; justify-content:center;
  padding:1rem; backdrop-filter:blur(10px) saturate(1.4);
  animation:fadeIn .2s ease;
}
.modal-box {
  background:#fff; border-radius:30px; width:100%; max-width:490px;
  box-shadow:0 48px 120px rgba(7,21,43,.3), 0 0 0 1px rgba(255,255,255,.08);
  animation:modalDrop .3s cubic-bezier(.22,1,.36,1) both;
  overflow:hidden; max-height:92vh; display:flex; flex-direction:column;
}
.modal-header-bg {
  background:linear-gradient(135deg,#0F2D52 0%,#1A5EAB 60%,#2E80D8 100%);
  background-size:200% 200%; animation:gradPan 6s ease infinite;
}
.modal-close {
  position:absolute; top:14px; right:14px; z-index:2;
  background:rgba(255,255,255,.12); border:1px solid rgba(255,255,255,.2);
  border-radius:10px; width:32px; height:32px;
  display:flex; align-items:center; justify-content:center;
  cursor:pointer; color:#fff; font-size:.9rem;
  transition:background .15s, transform .15s;
}
.modal-close:hover { background:rgba(255,255,255,.28); transform:scale(1.08); }

/* ── scrollbar ── */
::-webkit-scrollbar{width:5px} ::-webkit-scrollbar-track{background:#EBF5FD} ::-webkit-scrollbar-thumb{background:#C2DFF7;border-radius:99px}

/* ── Empty ── */
.inv-empty { text-align:center; padding:5rem 1rem; animation:fadeInUp .5s ease both; }
`;

// ─── Stat Card ────────────────────────────────────────────────────────────────
function StatCard({ icon, label, val, bg, c, border, delay }) {
  const counted = useCounter(val);
  return (
    <div className="inv-stat" style={{ background:`linear-gradient(145deg,${bg},${bg}cc)`, border:`1.5px solid ${border}`, boxShadow:`0 2px 14px ${c}18`, animationDelay:`${delay}s` }}>
      <div style={{ position:"absolute", top:-22, right:-18, width:80, height:80, borderRadius:"50%", background:`${c}14`, pointerEvents:"none" }} />
      <div style={{ position:"relative", zIndex:1 }}>
        <div style={{ width:40, height:40, borderRadius:13, background:`${c}1e`, border:`1.5px solid ${c}33`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:"1.2rem", marginBottom:".75rem", boxShadow:`0 4px 14px ${c}22` }}>
          {icon}
        </div>
        <p style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontWeight:900, fontSize:"1.55rem", color:c, lineHeight:1, letterSpacing:"-1px", marginBottom:".25rem" }}>{counted}</p>
        <p style={{ fontSize:".7rem", color:C.txM, fontWeight:600 }}>{label}</p>
        <div style={{ marginTop:".65rem", height:3, borderRadius:99, background:`${c}1e`, overflow:"hidden" }}>
          <div style={{ height:"100%", width:`${Math.min(100,(val/60)*100)}%`, background:`linear-gradient(90deg,${c},${c}88)`, borderRadius:99 }} />
        </div>
      </div>
    </div>
  );
}

// ─── Detail Modal ─────────────────────────────────────────────────────────────
function DetailModal({ item, onClose }) {
  const jt = getJT(item.jurusan);
  const persen = Math.round((item.tersedia / item.total) * 100);
  const habis = item.tersedia === 0;
  const low = !habis && persen < 40;

  return (
    <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal-box">

        {/* Header */}
        <div className="modal-header-bg" style={{ padding:"1.75rem 1.9rem 1.55rem", flexShrink:0, position:"relative", overflow:"hidden" }}>
          {/* Deco rings */}
          {[{w:200,h:200,t:-80,r:-50,op:.07},{w:110,h:110,t:20,r:80,op:.05}].map((d,i)=>(
            <div key={i} style={{ position:"absolute",width:d.w,height:d.h,borderRadius:"50%",border:"1.5px solid rgba(255,255,255,.18)",top:d.t,right:d.r,opacity:d.op,pointerEvents:"none" }} />
          ))}

          <button className="modal-close" onClick={onClose}>✕</button>

          <div style={{ display:"flex", alignItems:"flex-start", gap:"1.1rem", position:"relative", zIndex:1 }}>
            <div style={{
              width:64, height:64, borderRadius:20, flexShrink:0,
              background:"rgba(255,255,255,.14)", border:"1.5px solid rgba(255,255,255,.22)",
              display:"flex", alignItems:"center", justifyContent:"center",
              fontSize:"2.1rem", boxShadow:"0 8px 24px rgba(0,0,0,.15)",
            }}>{item.icon}</div>
            <div style={{ flex:1 }}>
              <p style={{ fontSize:".65rem", color:"rgba(255,255,255,.55)", fontFamily:"'DM Mono',monospace", marginBottom:".25rem", letterSpacing:".06em" }}>{item.id}</p>
              <h3 style={{ fontWeight:900, fontSize:"1.05rem", color:"#fff", marginBottom:".5rem", letterSpacing:"-.2px", lineHeight:1.3 }}>{item.name}</h3>
              <div style={{ display:"flex", gap:".4rem", flexWrap:"wrap" }}>
                <span style={{ fontSize:".67rem", fontWeight:800, background:jt.pill, color:jt.active, padding:".22rem .65rem", borderRadius:999 }}>{item.jurusan}</span>
                <span style={{ fontSize:".67rem", color:"rgba(255,255,255,.75)", background:"rgba(255,255,255,.12)", padding:".22rem .65rem", borderRadius:999 }}>{item.kategori}</span>
                <span style={{
                  fontSize:".67rem", fontWeight:800,
                  background: habis?C.redLt:low?C.yellowLt:C.greenLt,
                  color: habis?"#be123c":low?C.yellowDk:C.greenDk,
                  padding:".22rem .65rem", borderRadius:999,
                }}>
                  {habis?"⛔ Habis":low?`⚠️ ${item.tersedia} tersisa`:"✅ Tersedia"}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Body */}
        <div style={{ flex:1, overflowY:"auto", padding:"1.55rem 1.9rem" }}>

          {/* Stats 3-col */}
          <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:".75rem", marginBottom:"1.25rem" }}>
            {[
              ["📦","Total",    item.total,    C.blueMd,   "#dbeafe"],
              ["✅","Tersedia", item.tersedia, C.greenDk,  "#d1fae5"],
              ["⏳","Dipinjam", item.dipinjam, C.yellowDk, "#fef3c7"],
            ].map(([ico,l,v,c,bg])=>(
              <div key={l} style={{ background:bg, borderRadius:16, padding:"1rem .85rem", textAlign:"center", border:`1px solid ${c}22`, boxShadow:`0 2px 10px ${c}14` }}>
                <div style={{ fontSize:"1.3rem", marginBottom:".35rem" }}>{ico}</div>
                <p style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontWeight:900, fontSize:"1.45rem", color:c, lineHeight:1 }}>{v}</p>
                <p style={{ fontSize:".68rem", color:C.txM, marginTop:".25rem", fontWeight:600 }}>{l}</p>
              </div>
            ))}
          </div>

          {/* Stok progress */}
          <div style={{ background:"linear-gradient(145deg,#f8fbff,#f0f7fd)", borderRadius:16, padding:"1.05rem 1.1rem", marginBottom:"1.1rem", border:`1px solid ${C.border}` }}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:".65rem" }}>
              <p style={{ fontSize:".77rem", fontWeight:700, color:C.txM }}>Ketersediaan Stok</p>
              <span style={{
                fontSize:".72rem", fontWeight:800, padding:".22rem .6rem", borderRadius:999,
                background: habis?"#fee2e2":low?"#fef3c7":"#d1fae5",
                color: habis?"#be123c":low?C.yellowDk:C.greenDk,
              }}>{persen}%</span>
            </div>
            <div style={{ height:8, borderRadius:99, background:"rgba(30,90,171,.08)", overflow:"hidden", position:"relative" }}>
              <div style={{
                width:`${persen}%`, height:"100%", borderRadius:99,
                background: habis?`linear-gradient(90deg,${C.redLt},${C.red})`
                  :low?`linear-gradient(90deg,#fde68a,${C.yellow})`
                  :`linear-gradient(90deg,${jt.pill},${jt.dot})`,
                transition:"width .7s cubic-bezier(.22,1,.36,1)",
                boxShadow: !habis?`0 0 10px ${jt.dot}55`:"none",
              }} />
            </div>
            <div style={{ display:"flex", justifyContent:"space-between", marginTop:".45rem", fontSize:".68rem", color:C.txL }}>
              <span>0 unit</span><span>{item.total} unit (total)</span>
            </div>
          </div>

          {/* Info rows */}
          <div style={{ display:"flex", flexDirection:"column", gap:".5rem" }}>
            {[
              ["📍 Jurusan",          item.jurusan],
              ["🏷️ Kategori",         item.kategori],
              ["🔧 Kondisi",          item.kondisi],
              ["📅 Tahun Pengadaan",  item.tahun],
            ].map(([k,v])=>(
              <div key={k} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:".62rem .9rem", background:"linear-gradient(90deg,#f8fbff,#f4f8fd)", borderRadius:12, border:`1px solid ${C.border}` }}>
                <p style={{ fontSize:".77rem", color:C.txM, fontWeight:500 }}>{k}</p>
                <p style={{ fontSize:".8rem", fontWeight:700, color:C.tx }}>{v}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div style={{ padding:"1.1rem 1.9rem", borderTop:`1px solid ${C.border}`, flexShrink:0, background:"#fafcff" }}>
          <button onClick={onClose} style={{
            width:"100%", padding:".75rem", borderRadius:14, border:"none",
            background:`linear-gradient(135deg,${C.navy},${C.blue})`,
            color:"#fff", fontFamily:"'Plus Jakarta Sans',sans-serif",
            fontWeight:800, fontSize:".87rem", cursor:"pointer",
            boxShadow:`0 6px 20px ${C.blue}44`,
            transition:"opacity .15s, transform .15s",
          }}
          onMouseEnter={e=>{e.currentTarget.style.opacity=".9";e.currentTarget.style.transform="translateY(-1px)";}}
          onMouseLeave={e=>{e.currentTarget.style.opacity="1";e.currentTarget.style.transform="translateY(0)";}}
          >Tutup</button>
        </div>
      </div>
    </div>
  );
}

// ─── Inv Card (grid view) ─────────────────────────────────────────────────────
function InvCard({ b, onClick }) {
  const [hov, setHov] = useState(false);
  const jt = getJT(b.jurusan);
  const persen = Math.round((b.tersedia / b.total) * 100);
  const habis = b.tersedia === 0;
  const low = !habis && persen < 40;

  return (
    <div className="inv-card"
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      onClick={onClick}
      style={{
        borderColor: hov ? `${jt.dot}55` : "rgba(30,90,171,.08)",
        boxShadow: hov ? `0 22px 58px ${jt.glow}22, 0 0 0 1px ${jt.dot}22` : "0 2px 10px rgba(15,45,82,.05)",
      }}>
      <div className="card-shine" />

      {/* Image area */}
      <div style={{
        height:140,
        background: habis
          ? "linear-gradient(145deg,#f1f5f9,#e2e8f0)"
          : `linear-gradient(145deg,${jt.bg},${jt.pill}66)`,
        display:"flex", alignItems:"center", justifyContent:"center",
        fontSize:"3.2rem", position:"relative", flexShrink:0, overflow:"hidden",
      }}>
        {/* Blob */}
        <div style={{ position:"absolute", width:110, height:110, borderRadius:"50%", background:`${jt.dot}1e`, filter:"blur(25px)", top:"50%", left:"50%", transform:"translate(-50%,-50%)", pointerEvents:"none", opacity:hov?1:.5, transition:"opacity .3s" }} />

        <span style={{
          position:"relative", zIndex:1,
          filter: habis?"grayscale(1) opacity(.35)":"none",
          display:"block",
          transition:"transform .3s cubic-bezier(.22,1,.36,1)",
          transform: hov&&!habis ? "scale(1.14) translateY(-2px)" : "scale(1)",
        }}>{b.icon}</span>

        {/* Status badge */}
        <div style={{
          position:"absolute", top:10, right:10,
          fontSize:".63rem", fontWeight:800,
          background: habis?C.redLt:low?C.yellowLt:C.greenLt,
          color: habis?"#be123c":low?C.yellowDk:C.greenDk,
          padding:".24rem .68rem", borderRadius:999,
          border:`1px solid ${habis?"#fecdd3":low?"#fde68a":"#6ee7b7"}`,
          backdropFilter:"blur(6px)",
          display:"flex", alignItems:"center", gap:".3rem",
          boxShadow:"0 2px 8px rgba(0,0,0,.08)",
        }}>
          <span style={{
            width:5, height:5, borderRadius:"50%", display:"inline-block",
            background:habis?C.red:low?C.yellow:C.green,
            animation:!habis?"dotBlink 2s ease-in-out infinite":"none",
          }}/>
          {habis?"Habis":low?`${b.tersedia} sisa`:"Ada"}
        </div>

        {/* Jurusan */}
        <div style={{ position:"absolute", top:10, left:10, fontSize:".63rem", fontWeight:800, background:jt.pill, color:jt.active, padding:".24rem .68rem", borderRadius:999, backdropFilter:"blur(6px)", boxShadow:"0 2px 6px rgba(0,0,0,.06)" }}>
          {b.jurusan}
        </div>

        {habis && <div style={{ position:"absolute", inset:0, background:"rgba(248,250,252,.5)", backdropFilter:"blur(1px)" }} />}
      </div>

      {/* Body */}
      <div style={{ padding:"1rem 1.15rem 1.15rem", flex:1, display:"flex", flexDirection:"column", gap:".4rem" }}>
        <p style={{ fontSize:".65rem", color:C.txL, fontFamily:"'DM Mono',monospace", fontWeight:500, letterSpacing:".04em" }}>{b.id}</p>
        <p style={{ fontWeight:800, fontSize:".88rem", color:C.tx, lineHeight:1.3 }}>{b.name}</p>
        <span style={{ fontSize:".65rem", fontWeight:700, color:C.txM, background:C.sky, border:`1px solid ${C.border}`, padding:".18rem .55rem", borderRadius:9999, alignSelf:"flex-start" }}>{b.kategori}</span>

        <div style={{ display:"flex", justifyContent:"space-between", fontSize:".7rem", marginTop:".2rem" }}>
          <span style={{ color:C.greenDk, fontWeight:700 }}>✓ {b.tersedia} tersedia</span>
          <span style={{ color:C.yellowDk, fontWeight:700 }}>⏳ {b.dipinjam} dipinjam</span>
        </div>

        {/* Stok bar */}
        <div style={{ height:5, borderRadius:99, background:C.sky, overflow:"hidden", position:"relative" }}>
          <div style={{
            width:`${persen}%`, height:"100%", borderRadius:99,
            background: habis?`linear-gradient(90deg,${C.redLt},${C.red})`
              :low?`linear-gradient(90deg,#fde68a,${C.yellow})`
              :`linear-gradient(90deg,${jt.pill},${jt.dot})`,
            transition:"width .7s cubic-bezier(.22,1,.36,1)",
            boxShadow:!habis?`0 0 8px ${jt.dot}55`:"none",
          }} />
        </div>

        <div style={{ display:"flex", justifyContent:"space-between", fontSize:".67rem" }}>
          <span style={{ color:C.txL }}>{b.total} total unit · {b.tahun}</span>
          <span style={{ fontWeight:800, color:habis?C.red:low?C.yellow:C.greenDk }}>{persen}%</span>
        </div>
      </div>
    </div>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────
export default function InventarisPage() {
  const [filterJurusan, setFilterJurusan] = useState("Semua");
  const [search, setSearch] = useState("");
  const [view, setView] = useState("grid");
  const [detail, setDetail] = useState(null);

  const filtered = inventarisData.filter(b => {
    const mJ = filterJurusan === "Semua" || b.jurusan === filterJurusan;
    const mS = b.name.toLowerCase().includes(search.toLowerCase()) || b.id.toLowerCase().includes(search.toLowerCase());
    return mJ && mS;
  });

  const totalUnit     = inventarisData.reduce((a,b) => a + b.total, 0);
  const totalTersedia = inventarisData.reduce((a,b) => a + b.tersedia, 0);
  const totalDipinjam = inventarisData.reduce((a,b) => a + b.dipinjam, 0);

  const statData = [
    { icon:"📦", label:"Total Unit",   val:totalUnit,              bg:C.sky,      c:C.blue,    border:C.bluePale, delay:0    },
    { icon:"✅", label:"Tersedia",     val:totalTersedia,          bg:C.greenLt,  c:C.greenDk, border:"#6EE7B7",  delay:.07  },
    { icon:"⏳", label:"Dipinjam",     val:totalDipinjam,          bg:C.yellowLt, c:C.yellowDk,border:"#FDE68A",  delay:.14  },
    { icon:"🏷️", label:"Jenis Barang", val:inventarisData.length,  bg:C.sky,      c:C.blueMd,  border:C.bluePale, delay:.21  },
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
        {/* Deco circles */}
        {[{w:340,h:340,t:"-110px",r:"-80px",op:.07},{w:200,h:200,t:"30px",r:"140px",op:.05},{w:260,h:260,b:"-90px",l:"-70px",op:.06}].map((d,i)=>(
          <div key={i} style={{ position:"absolute",width:d.w,height:d.h,borderRadius:"50%",border:"1.5px solid rgba(255,255,255,.18)",top:d.t,right:d.r,bottom:d.b,left:d.l,opacity:d.op,pointerEvents:"none" }} />
        ))}

        <div style={{ position:"relative", zIndex:1, display:"flex", alignItems:"flex-end", justifyContent:"space-between", flexWrap:"wrap", gap:"1.25rem" }}>
          <div>
            <div style={{ display:"inline-flex", alignItems:"center", gap:".4rem", background:"rgba(255,255,255,.12)", border:"1px solid rgba(255,255,255,.2)", color:"rgba(255,255,255,.9)", fontSize:".68rem", fontWeight:700, letterSpacing:".1em", textTransform:"uppercase", padding:".26rem .85rem", borderRadius:9999, marginBottom:".8rem" }}>
              🗃️ Inventaris Barang
            </div>
            <h1 style={{ fontSize:"clamp(1.5rem,3vw,2rem)", fontWeight:900, color:"#fff", letterSpacing:"-.5px", lineHeight:1.1, marginBottom:".45rem" }}>
              Daftar Inventaris Jurusan
            </h1>
            <p style={{ color:"rgba(255,255,255,.65)", fontSize:".85rem", fontWeight:500, maxWidth:380 }}>
              Data lengkap semua barang inventaris jurusan di SMKN 8 Semarang — real-time & transparan.
            </p>
          </div>

          {/* Hero quick stats */}
          <div style={{ display:"flex", gap:".85rem", flexWrap:"wrap" }}>
            {[
              { label:"Total Jenis", val:inventarisData.length, icon:"🏷️", bg:"rgba(255,255,255,.10)", border:"rgba(255,255,255,.2)",  c:"#fff"    },
              { label:"Tersedia",    val:totalTersedia,          icon:"✅", bg:"rgba(16,185,129,.18)",  border:"rgba(52,211,153,.3)",  c:"#6ee7b7" },
            ].map(s=>(
              <div key={s.label} style={{ background:s.bg, border:`1px solid ${s.border}`, borderRadius:16, padding:".8rem 1.1rem", backdropFilter:"blur(10px)", textAlign:"center", minWidth:90 }}>
                <div style={{ fontSize:"1.1rem", marginBottom:".2rem" }}>{s.icon}</div>
                <div style={{ fontSize:"1.4rem", fontWeight:900, color:s.c, lineHeight:1 }}>{s.val}</div>
                <div style={{ fontSize:".62rem", color:"rgba(255,255,255,.55)", fontWeight:600, marginTop:".2rem", letterSpacing:".04em" }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── STAT CARDS ── */}
      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(145px,1fr))", gap:".85rem", marginBottom:"1.5rem" }}>
        {statData.map((s,i) => <StatCard key={i} {...s} />)}
      </div>

      {/* ── TOOLBAR ── */}
      <div style={{
        background:C.white, borderRadius:20, border:`1px solid rgba(30,90,171,.08)`,
        padding:"1rem 1.3rem", marginBottom:"1.5rem",
        display:"flex", alignItems:"center", justifyContent:"space-between",
        flexWrap:"wrap", gap:".75rem",
        boxShadow:"0 2px 12px rgba(15,45,82,.05)",
        animation:"fadeInUp .45s ease .1s both",
      }}>
        {/* Jurusan tabs */}
        <div style={{ display:"flex", gap:".42rem", flexWrap:"wrap" }}>
          {["Semua","PPLG","TJKT","LK","DKV","PS"].map(j => {
            const isA = filterJurusan === j;
            const jt = JT[j];
            const count = j === "Semua" ? inventarisData.length : inventarisData.filter(b=>b.jurusan===j).length;
            return (
              <button key={j} className="inv-tab"
                onClick={() => setFilterJurusan(j)}
                style={{
                  background: isA ? (jt?`linear-gradient(135deg,${jt.active},${jt.dot})`:`linear-gradient(135deg,${C.blue},${C.blueMd})`) : C.sky,
                  color: isA ? "#fff" : C.txM,
                  borderColor: "transparent",
                  boxShadow: isA ? `0 4px 16px ${jt?jt.glow:C.blue}44` : "none",
                }}>
                {j}
                <span style={{ marginLeft:".35rem", fontSize:".62rem", fontWeight:800, background:isA?"rgba(255,255,255,.22)":"#dde8f5", color:isA?"#fff":C.txM, padding:".05rem .45rem", borderRadius:9999 }}>{count}</span>
              </button>
            );
          })}
        </div>

        <div style={{ display:"flex", gap:".55rem", alignItems:"center" }}>
          {/* Search */}
          <div style={{ position:"relative" }}>
            <svg style={{ position:"absolute",left:10,top:"50%",transform:"translateY(-50%)",pointerEvents:"none" }} width="14" height="14" fill="none" stroke={C.txM} strokeWidth="2" viewBox="0 0 24 24">
              <circle cx="11" cy="11" r="8"/><path strokeLinecap="round" d="M21 21l-4.35-4.35"/>
            </svg>
            <input className="inv-search" placeholder="Cari barang / ID..." value={search} onChange={e=>setSearch(e.target.value)} />
          </div>

          {/* View toggle */}
          <div style={{ display:"flex", gap:".28rem", background:C.sky, padding:".28rem", borderRadius:11, border:`1px solid ${C.border}` }}>
            {[
              { val:"grid",  title:"Grid",
                icon:<svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/></svg> },
              { val:"table", title:"Tabel",
                icon:<svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01"/></svg> },
            ].map(btn => (
              <button key={btn.val} className="view-btn"
                onClick={() => setView(btn.val)}
                title={btn.title}
                style={{
                  background: view===btn.val ? C.white : "transparent",
                  color: view===btn.val ? C.blue : C.txM,
                  boxShadow: view===btn.val ? "0 1px 6px rgba(0,0,0,.09)" : "none",
                }}>
                {btn.icon}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Results label */}
      {(search || filterJurusan !== "Semua") && (
        <div style={{ marginBottom:"1rem", display:"flex", alignItems:"center", gap:".5rem", animation:"fadeInUp .3s ease both" }}>
          <span style={{ fontSize:".75rem", color:C.txM }}>Menampilkan</span>
          <span style={{ fontWeight:800, color:C.blue, fontSize:".8rem" }}>{filtered.length}</span>
          <span style={{ fontSize:".75rem", color:C.txM }}>barang</span>
          {filterJurusan !== "Semua" && (
            <span style={{ fontSize:".71rem", fontWeight:700, background:JT[filterJurusan]?.pill, color:JT[filterJurusan]?.active, padding:".2rem .65rem", borderRadius:9999 }}>
              Jurusan {filterJurusan}
            </span>
          )}
        </div>
      )}

      {/* ── GRID VIEW ── */}
      {view === "grid" && (
        filtered.length === 0 ? (
          <div className="inv-empty">
            <div style={{ fontSize:"3.5rem", marginBottom:".75rem" }}>🔍</div>
            <p style={{ fontWeight:800, fontSize:".95rem", color:C.tx, marginBottom:".35rem" }}>Barang tidak ditemukan</p>
            <p style={{ fontSize:".82rem", color:C.txM }}>Coba ubah filter jurusan atau kata kunci</p>
          </div>
        ) : (
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(245px,1fr))", gap:"1.15rem" }}>
            {filtered.map((b,i) => (
              <div key={b.id} style={{ animation:`cardReveal .45s cubic-bezier(.22,1,.36,1) ${i*.055}s both` }}>
                <InvCard b={b} onClick={() => setDetail(b)} />
              </div>
            ))}
          </div>
        )
      )}

      {/* ── TABLE VIEW ── */}
      {view === "table" && (
        <div style={{ background:C.white, borderRadius:22, border:`1px solid rgba(30,90,171,.07)`, overflow:"hidden", boxShadow:"0 4px 24px rgba(15,45,82,.06)" }}>
          {/* Head */}
          <div style={{ display:"grid", gridTemplateColumns:"95px 2.5fr 80px 100px 65px 75px 78px 72px", gap:".5rem", padding:".7rem 1.4rem", background:"linear-gradient(90deg,#f0f5fc,#f7fafd)", borderBottom:`1px solid ${C.border}` }}>
            {["ID","Nama Barang","Jurusan","Kategori","Total","Tersedia","Dipinjam",""].map(h=>(
              <p key={h} style={{ fontSize:".66rem", fontWeight:800, color:C.txM, textTransform:"uppercase", letterSpacing:".08em" }}>{h}</p>
            ))}
          </div>

          {filtered.length === 0 ? (
            <div className="inv-empty" style={{ padding:"3.5rem" }}>
              <div style={{ fontSize:"3rem", marginBottom:".75rem" }}>📭</div>
              <p style={{ fontWeight:800, fontSize:".9rem", color:C.tx }}>Tidak ada data</p>
            </div>
          ) : (
            <div style={{ padding:".4rem .6rem" }}>
              {filtered.map((b,i)=>{
                const jt = getJT(b.jurusan);
                return (
                  <div key={b.id} className="tbl-row"
                    style={{ animationDelay:`${i*.04}s`, borderBottom:`1px solid ${C.border}` }}
                    onClick={() => setDetail(b)}>
                    <span style={{ fontSize:".68rem", fontWeight:700, color:C.blueMd, fontFamily:"'DM Mono',monospace", letterSpacing:".04em" }}>{b.id}</span>
                    <div style={{ display:"flex", alignItems:"center", gap:".6rem", minWidth:0 }}>
                      <span style={{ fontSize:"1.15rem", flexShrink:0 }}>{b.icon}</span>
                      <span style={{ fontSize:".83rem", fontWeight:700, color:C.tx, whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" }}>{b.name}</span>
                    </div>
                    <span style={{ fontSize:".68rem", fontWeight:800, background:jt.pill, color:jt.active, padding:".2rem .55rem", borderRadius:999, textAlign:"center", letterSpacing:".03em" }}>{b.jurusan}</span>
                    <span style={{ fontSize:".75rem", color:C.txM }}>{b.kategori}</span>
                    <span style={{ fontSize:".88rem", fontWeight:800, color:C.tx, textAlign:"center" }}>{b.total}</span>
                    <span style={{ fontSize:".88rem", fontWeight:800, color:b.tersedia===0?C.red:C.greenDk, textAlign:"center" }}>{b.tersedia}</span>
                    <span style={{ fontSize:".88rem", fontWeight:800, color:b.dipinjam===0?C.txL:C.yellowDk, textAlign:"center" }}>{b.dipinjam}</span>
                    <button className="detail-btn" onClick={e=>{e.stopPropagation();setDetail(b);}}>Detail →</button>
                  </div>
                );
              })}
            </div>
          )}

          {/* Footer */}
          <div style={{ padding:".75rem 1.4rem", borderTop:`1px solid ${C.border}`, background:"linear-gradient(90deg,#f8fbff,#f4f8fd)", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
            <p style={{ fontSize:".72rem", color:C.txM, fontWeight:600 }}>
              Menampilkan <span style={{ color:C.blue, fontWeight:800 }}>{filtered.length}</span> dari <span style={{ color:C.blue, fontWeight:800 }}>{inventarisData.length}</span> barang
            </p>
            <p style={{ fontSize:".72rem", color:C.txM }}>Klik baris untuk detail →</p>
          </div>
        </div>
      )}

      {detail && <DetailModal item={detail} onClose={() => setDetail(null)} />}
    </DashboardLayout>
  );
}
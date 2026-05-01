import { useState } from "react";
import DashboardLayout from "./Dashboardlayout";

// ─── TOKENS ───────────────────────────────────────────────────────────────────
const C = {
  ink:      "#07152B",
  navy:     "#0F2D52",
  blue:     "#1A5EAB",
  blueMd:   "#2E80D8",
  blueLt:   "#5FA8E8",
  bluePale: "#C2DFF7",
  sky:      "#EBF5FD",
  white:    "#FFFFFF",
  tx:       "#0F2D52",
  txM:      "#4A6FA5",
  txL:      "#8AAED4",
  green:    "#10B981",
  greenDk:  "#065F46",
  greenLt:  "#D1FAE5",
  yellow:   "#F59E0B",
  yellowDk: "#92400E",
  yellowLt: "#FEF3C7",
  red:      "#EF4444",
  redLt:    "#FEE2E2",
  border:   "rgba(30,90,171,.10)",
};

// ─── JURUSAN THEME (sama persis PeminjamanPage & InventarisPage) ──────────────
const JT = {
  PPLG: { bg:"#EFF6FF", pill:"#BFDBFE", active:"#60A5FA", dot:"#60A5FA", dark:"#1D4ED8" },
  TJKT: { bg:"#FFF7ED", pill:"#FED7AA", active:"#F97316", dot:"#F97316", dark:"#C2410C" },
  DKV:  { bg:"#FEFCE8", pill:"#FEF08A", active:"#EAB308", dot:"#EAB308", dark:"#A16207" },
  LK:   { bg:"#F0FDF4", pill:"#BBF7D0", active:"#22C55E", dot:"#22C55E", dark:"#15803D" },
  PS:   { bg:"#EFF6FF", pill:"#93C5FD", active:"#1E3A5F", dot:"#1E3A5F", dark:"#0F2D52" },
};

const jurusanData = [
  {
    kode:"PPLG", nama:"Pengembangan Perangkat Lunak & GIM", icon:"💻",
    konsentrasi:["Rekayasa Perangkat Lunak","Pengembangan Game","UI/UX Design"],
    totalBarang:14, tersedia:8, petugas:"Bpk. Arif Setiawan, S.Kom.",
    desc:"Jurusan PPLG berfokus pada pengembangan aplikasi berbasis web, mobile, dan desktop serta teknologi pengembangan game modern.",
    kelas:["X PPLG 1","X PPLG 2","XI PPLG 1","XI PPLG 2","XI PPLG 3","XII PPLG 1","XII PPLG 2"],
    highlight:["React & Next.js","Flutter Mobile","Unity Game Dev"],
  },
  {
    kode:"TJKT", nama:"Teknik Jaringan Komputer & Telekomunikasi", icon:"🌐",
    konsentrasi:["Jaringan Komputer","Telekomunikasi","Keamanan Jaringan"],
    totalBarang:13, tersedia:12, petugas:"Ibu Dewi Rahayu, S.T.",
    desc:"TJKT mempersiapkan siswa menguasai instalasi dan manajemen jaringan komputer serta teknologi telekomunikasi modern.",
    kelas:["X TJKT 1","X TJKT 2","XI TJKT 1","XI TJKT 2","XII TJKT 1","XII TJKT 2"],
    highlight:["Cisco Networking","Mikrotik","Network Security"],
  },
  {
    kode:"LK", nama:"Layanan Kesehatan", icon:"🏥",
    konsentrasi:["Keperawatan","Farmasi Klinis","Asisten Tenaga Kesehatan"],
    totalBarang:11, tersedia:5, petugas:"Ibu Sri Mulyani, S.Kep.",
    desc:"Program LK menyiapkan tenaga asisten kesehatan yang kompeten di bidang keperawatan dan layanan kesehatan masyarakat.",
    kelas:["X LK 1","X LK 2","XI LK 1","XI LK 2","XII LK 1","XII LK 2"],
    highlight:["Keperawatan Dasar","Farmakologi","Anatomi Manusia"],
  },
  {
    kode:"DKV", nama:"Desain Komunikasi Visual", icon:"🎨",
    konsentrasi:["Desain Grafis","Fotografi & Videografi","Animasi Digital"],
    totalBarang:12, tersedia:9, petugas:"Bpk. Hendra Kusuma, S.Sn.",
    desc:"DKV mengembangkan kemampuan kreativitas visual siswa untuk berkarir di industri desain grafis, media, dan periklanan.",
    kelas:["X DKV 1","X DKV 2","XI DKV 1","XI DKV 2","XII DKV 1","XII DKV 2"],
    highlight:["Adobe Illustrator","Premiere Pro","3D Modeling"],
  },
  {
    kode:"PS", nama:"Perhotelan & Spa", icon:"🏨",
    konsentrasi:["Tata Graha","Front Office","Spa & Beauty"],
    totalBarang:8, tersedia:7, petugas:"Ibu Anita Wijaya, S.Par.",
    desc:"Jurusan PS membekali siswa dengan keterampilan profesional di industri perhotelan, pariwisata, dan layanan spa.",
    kelas:["X PS 1","XI PS 1","XII PS 1"],
    highlight:["Hotel Management","Guest Service","Spa Treatment"],
  },
];

// ─── DETAIL MODAL ──────────────────────────────────────────────────────────────
function JurusanModal({ j, onClose }) {
  const jt = JT[j.kode];
  const persen = Math.round((j.tersedia / j.totalBarang) * 100);

  return (
    <div
      style={{ position:"fixed",inset:0,background:"rgba(7,21,43,.6)",zIndex:400,display:"flex",alignItems:"center",justifyContent:"center",padding:"1rem",backdropFilter:"blur(8px)" }}
      onClick={e => e.target === e.currentTarget && onClose()}
    >
      <div style={{ background:C.white,borderRadius:28,width:"100%",maxWidth:520,boxShadow:"0 40px 100px rgba(7,21,43,.3)",animation:"dropIn .3s cubic-bezier(.34,1.4,.64,1) both",overflow:"hidden",maxHeight:"92vh",display:"flex",flexDirection:"column" }}>
        {/* Header */}
        <div style={{ background:`linear-gradient(135deg,${jt.dark || jt.active},${jt.active})`,padding:"1.5rem 1.75rem",flexShrink:0,position:"relative",overflow:"hidden" }}>
          <div style={{ position:"absolute",top:-40,right:-40,width:160,height:160,borderRadius:"50%",background:"rgba(255,255,255,.07)" }} />
          <div style={{ position:"absolute",bottom:-50,left:60,width:100,height:100,borderRadius:"50%",background:"rgba(255,255,255,.05)" }} />
          <button onClick={onClose} style={{ position:"absolute",top:14,right:14,background:"rgba(255,255,255,.15)",border:"none",borderRadius:"50%",width:32,height:32,display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",color:"#fff",fontSize:"1rem" }}
            onMouseEnter={e=>e.currentTarget.style.background="rgba(255,255,255,.25)"}
            onMouseLeave={e=>e.currentTarget.style.background="rgba(255,255,255,.15)"}
          >✕</button>
          <div style={{ display:"flex",alignItems:"center",gap:"1rem",position:"relative",zIndex:1 }}>
            <div style={{ width:62,height:62,borderRadius:18,background:"rgba(255,255,255,.18)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"2.2rem",border:"1.5px solid rgba(255,255,255,.25)",flexShrink:0 }}>{j.icon}</div>
            <div>
              <h3 style={{ fontWeight:800,fontSize:"1.3rem",color:"#fff",marginBottom:".2rem",fontFamily:"'Plus Jakarta Sans',sans-serif" }}>{j.kode}</h3>
              <p style={{ fontSize:".78rem",color:"rgba(255,255,255,.75)",lineHeight:1.4 }}>{j.nama}</p>
            </div>
          </div>
        </div>

        {/* Body */}
        <div style={{ flex:1,overflowY:"auto",padding:"1.5rem 1.75rem" }}>
          {/* Desc */}
          <div style={{ background:C.sky,borderRadius:14,padding:"1rem 1.1rem",marginBottom:"1.25rem",border:`1px solid ${C.border}` }}>
            <p style={{ fontSize:".82rem",color:C.txM,lineHeight:1.7 }}>{j.desc}</p>
          </div>

          {/* Stats */}
          <div style={{ display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:".75rem",marginBottom:"1.25rem" }}>
            {[
              ["Total Barang", j.totalBarang, jt.active, "📦"],
              ["Tersedia",     j.tersedia,    C.green,   "✅"],
              ["Kelas",        j.kelas.length, C.yellow, "🏫"],
            ].map(([l,v,c,ico]) => (
              <div key={l} style={{ background:C.sky,borderRadius:14,padding:".85rem",textAlign:"center",border:`1px solid ${C.border}` }}>
                <p style={{ fontSize:"1.3rem",marginBottom:".2rem" }}>{ico}</p>
                <p style={{ fontWeight:800,fontSize:"1.3rem",color:c,fontFamily:"'Plus Jakarta Sans',sans-serif",lineHeight:1 }}>{v}</p>
                <p style={{ fontSize:".68rem",color:C.txM,marginTop:".2rem" }}>{l}</p>
              </div>
            ))}
          </div>

          {/* Progress */}
          <div style={{ background:C.sky,borderRadius:14,padding:"1rem 1.1rem",marginBottom:"1.25rem",border:`1px solid ${C.border}` }}>
            <div style={{ display:"flex",justifyContent:"space-between",marginBottom:".5rem" }}>
              <p style={{ fontSize:".75rem",fontWeight:700,color:C.txM }}>Ketersediaan Barang</p>
              <p style={{ fontSize:".75rem",fontWeight:800,color:jt.active }}>{persen}%</p>
            </div>
            <div style={{ height:7,borderRadius:99,background:"rgba(30,90,171,.1)",overflow:"hidden" }}>
              <div style={{ width:`${persen}%`,height:"100%",borderRadius:99,background:`linear-gradient(90deg,${jt.active},${jt.dot})` }} />
            </div>
          </div>

          {/* Highlight tools */}
          <div style={{ marginBottom:"1.1rem" }}>
            <p style={{ fontSize:".7rem",fontWeight:800,color:C.txM,letterSpacing:".08em",textTransform:"uppercase",marginBottom:".6rem" }}>Teknologi / Fokus Keahlian</p>
            <div style={{ display:"flex",flexWrap:"wrap",gap:".4rem" }}>
              {j.highlight.map(h => (
                <span key={h} style={{ fontSize:".75rem",fontWeight:700,background:jt.pill,color:jt.dark||jt.active,padding:".3rem .75rem",borderRadius:999,border:`1px solid ${jt.dot}33` }}>{h}</span>
              ))}
            </div>
          </div>

          {/* Konsentrasi */}
          <div style={{ marginBottom:"1.1rem" }}>
            <p style={{ fontSize:".7rem",fontWeight:800,color:C.txM,letterSpacing:".08em",textTransform:"uppercase",marginBottom:".6rem" }}>Konsentrasi Keahlian</p>
            <div style={{ display:"flex",flexDirection:"column",gap:".4rem" }}>
              {j.konsentrasi.map((k,i) => (
                <div key={k} style={{ display:"flex",alignItems:"center",gap:".75rem",background:C.sky,borderRadius:11,padding:".6rem .85rem",border:`1px solid ${C.border}` }}>
                  <div style={{ width:24,height:24,borderRadius:"50%",background:jt.pill,display:"flex",alignItems:"center",justifyContent:"center",fontSize:".72rem",fontWeight:800,color:jt.active,flexShrink:0 }}>{i+1}</div>
                  <p style={{ fontSize:".82rem",fontWeight:600,color:C.tx }}>{k}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Kelas */}
          <div style={{ marginBottom:"1.1rem" }}>
            <p style={{ fontSize:".7rem",fontWeight:800,color:C.txM,letterSpacing:".08em",textTransform:"uppercase",marginBottom:".6rem" }}>Daftar Kelas ({j.kelas.length} kelas)</p>
            <div style={{ display:"flex",flexWrap:"wrap",gap:".4rem" }}>
              {j.kelas.map(k => (
                <span key={k} style={{ fontSize:".73rem",fontWeight:600,background:C.sky,color:C.txM,padding:".28rem .7rem",borderRadius:999,border:`1px solid ${C.border}` }}>{k}</span>
              ))}
            </div>
          </div>

          {/* Petugas */}
          <div style={{ display:"flex",alignItems:"center",gap:".75rem",background:`linear-gradient(135deg,${jt.bg},${jt.pill}44)`,borderRadius:14,padding:".85rem 1rem",border:`1px solid ${jt.dot}22` }}>
            <div style={{ width:38,height:38,borderRadius:"50%",background:jt.pill,display:"flex",alignItems:"center",justifyContent:"center",color:jt.active,flexShrink:0 }}>
              <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
            </div>
            <div>
              <p style={{ fontSize:".68rem",color:C.txM }}>Penanggung Jawab</p>
              <p style={{ fontSize:".85rem",fontWeight:700,color:C.tx }}>{j.petugas}</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div style={{ padding:"1rem 1.75rem",borderTop:`1px solid ${C.border}`,flexShrink:0 }}>
          <button onClick={onClose} style={{ width:"100%",padding:".7rem",borderRadius:13,border:"none",background:`linear-gradient(135deg,${jt.dark||jt.active},${jt.active})`,color:"#fff",fontFamily:"'Plus Jakarta Sans',sans-serif",fontWeight:800,fontSize:".87rem",cursor:"pointer",boxShadow:`0 6px 20px ${jt.dot}44` }}>
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── JURUSAN CARD ──────────────────────────────────────────────────────────────
function JurusanCard({ j, onClick, index }) {
  const [hov, setHov] = useState(false);
  const jt = JT[j.kode];
  const persen = Math.round((j.tersedia / j.totalBarang) * 100);

  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      onClick={onClick}
      style={{
        background: C.white, borderRadius: 22, cursor: "pointer", overflow: "hidden",
        border: `1.5px solid ${hov ? jt.dot + "55" : C.border}`,
        transition: "box-shadow .25s, transform .25s, border-color .25s",
        boxShadow: hov ? `0 20px 56px ${jt.dot}25` : "0 2px 8px rgba(15,45,82,.05)",
        transform: hov ? "translateY(-6px)" : "none",
        animation: `fadeInUp .45s ease ${index * .1}s both`,
      }}
    >
      {/* Colored top bar */}
      <div style={{ height: 6, background: `linear-gradient(90deg,${jt.dark||jt.active},${jt.dot})` }} />

      {/* Top visual area */}
      <div style={{ background:`linear-gradient(145deg,${jt.bg},${jt.pill}40)`, padding:"1.5rem 1.5rem 1rem", position:"relative" }}>
        <div style={{ display:"flex",alignItems:"flex-start",gap:"1rem" }}>
          <div style={{ width:58,height:58,borderRadius:18,background:jt.pill,display:"flex",alignItems:"center",justifyContent:"center",fontSize:"2rem",flexShrink:0,border:`2px solid ${jt.dot}33`,boxShadow:`0 4px 14px ${jt.dot}22` }}>
            {j.icon}
          </div>
          <div style={{ flex:1,minWidth:0 }}>
            <div style={{ display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:".25rem" }}>
              <h3 style={{ fontWeight:800,fontSize:"1.15rem",color:jt.dark||jt.active,fontFamily:"'Plus Jakarta Sans',sans-serif" }}>{j.kode}</h3>
              <span style={{ fontSize:".68rem",fontWeight:800,background:jt.pill,color:jt.active,padding:".2rem .6rem",borderRadius:999,flexShrink:0 }}>{j.kelas.length} kelas</span>
            </div>
            <p style={{ fontSize:".77rem",color:C.txM,lineHeight:1.4 }}>{j.nama}</p>
          </div>
        </div>

        {/* Highlight chips */}
        <div style={{ display:"flex",gap:".35rem",flexWrap:"wrap",marginTop:".85rem" }}>
          {j.highlight.map(h => (
            <span key={h} style={{ fontSize:".66rem",fontWeight:700,background:"rgba(255,255,255,.7)",color:jt.dark||jt.active,padding:".18rem .55rem",borderRadius:999,border:`1px solid ${jt.dot}33`,backdropFilter:"blur(4px)" }}>{h}</span>
          ))}
        </div>
      </div>

      {/* Body */}
      <div style={{ padding:"1rem 1.5rem 1.35rem" }}>
        <p style={{ fontSize:".8rem",color:C.txM,lineHeight:1.6,marginBottom:"1rem" }}>{j.desc}</p>

        {/* Konsentrasi */}
        <div style={{ marginBottom:"1rem" }}>
          <p style={{ fontSize:".67rem",fontWeight:800,color:C.txL,letterSpacing:".08em",textTransform:"uppercase",marginBottom:".45rem" }}>Konsentrasi</p>
          <div style={{ display:"flex",flexWrap:"wrap",gap:".35rem" }}>
            {j.konsentrasi.map(k => (
              <span key={k} style={{ fontSize:".7rem",fontWeight:600,background:jt.bg,color:jt.dark||jt.active,padding:".22rem .6rem",borderRadius:999,border:`1px solid ${jt.dot}22` }}>{k}</span>
            ))}
          </div>
        </div>

        {/* Stats row */}
        <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:".6rem",marginBottom:"1rem" }}>
          {[
            ["📦 Total Barang", j.totalBarang, jt.active],
            ["✅ Tersedia",     j.tersedia,    C.greenDk],
          ].map(([l,v,c]) => (
            <div key={l} style={{ background:C.sky,borderRadius:12,padding:".65rem .8rem",border:`1px solid ${C.border}` }}>
              <p style={{ fontWeight:800,fontSize:"1.1rem",color:c,fontFamily:"'Plus Jakarta Sans',sans-serif",lineHeight:1 }}>{v}</p>
              <p style={{ fontSize:".68rem",color:C.txM,marginTop:".15rem" }}>{l}</p>
            </div>
          ))}
        </div>

        {/* Progress */}
        <div style={{ marginBottom:".85rem" }}>
          <div style={{ display:"flex",justifyContent:"space-between",fontSize:".68rem",marginBottom:".3rem" }}>
            <span style={{ color:C.txM,fontWeight:600 }}>Ketersediaan</span>
            <span style={{ fontWeight:800,color:jt.active }}>{persen}%</span>
          </div>
          <div style={{ height:5,borderRadius:99,background:C.sky,overflow:"hidden" }}>
            <div style={{ width:`${persen}%`,height:"100%",borderRadius:99,background:`linear-gradient(90deg,${jt.active},${jt.dot})`,transition:"width .6s ease" }} />
          </div>
        </div>

        {/* Petugas */}
        <div style={{ display:"flex",alignItems:"center",gap:".5rem",fontSize:".75rem",color:C.txM }}>
          <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
          <span>{j.petugas}</span>
        </div>
      </div>
    </div>
  );
}

// ─── MAIN ─────────────────────────────────────────────────────────────────────
export default function JurusanPage() {
  const [active, setActive] = useState(null);
  const totalAll = jurusanData.reduce((a,b) => a + b.totalBarang, 0);

  return (
    <DashboardLayout>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
        @keyframes dropIn{from{opacity:0;transform:translateY(-12px) scale(.96)}to{opacity:1;transform:translateY(0) scale(1)}}
        @keyframes fadeInUp{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:translateY(0)}}
      `}</style>

      {/* HEADER */}
      <div style={{ marginBottom:"1.75rem",animation:"fadeInUp .4s ease both" }}>
        <div style={{ display:"inline-flex",alignItems:"center",gap:".4rem",background:C.sky,color:C.blue,fontSize:".68rem",fontWeight:800,letterSpacing:".08em",textTransform:"uppercase",padding:".25rem .85rem",borderRadius:999,marginBottom:".6rem",border:`1px solid ${C.bluePale}` }}>
          🏫 Data Jurusan
        </div>
        <h1 style={{ fontSize:"1.65rem",fontWeight:800,color:C.navy,marginBottom:".3rem" }}>Program Keahlian</h1>
        <p style={{ color:C.txM,fontSize:".88rem" }}>5 program keahlian unggulan di SMKN 8 Semarang.</p>
      </div>

      {/* SUMMARY CARDS */}
      <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(150px,1fr))",gap:".85rem",marginBottom:"1.75rem" }}>
        {[
          { label:"Total Jurusan",   val:jurusanData.length, icon:"🏫", bg:C.sky,      c:C.blue,    border:C.bluePale },
          { label:"Total Barang",    val:totalAll,           icon:"📦", bg:C.greenLt,  c:C.greenDk, border:"#6EE7B7"  },
          { label:"Konsentrasi",     val:jurusanData.reduce((a,b)=>a+b.konsentrasi.length,0), icon:"📚", bg:C.yellowLt, c:C.yellowDk, border:"#FDE68A" },
          { label:"Total Kelas",     val:jurusanData.reduce((a,b)=>a+b.kelas.length,0), icon:"🏛️", bg:C.sky, c:C.blueMd, border:C.bluePale },
        ].map((s,i) => (
          <div key={s.label} style={{ background:s.bg,borderRadius:16,padding:".9rem 1rem",display:"flex",alignItems:"center",gap:".7rem",border:`1px solid ${s.border}`,animation:`fadeInUp .4s ease ${i*.07}s both` }}>
            <span style={{ fontSize:"1.3rem" }}>{s.icon}</span>
            <div>
              <p style={{ fontWeight:800,fontSize:"1.2rem",color:s.c,fontFamily:"'Plus Jakarta Sans',sans-serif",lineHeight:1 }}>{s.val}</p>
              <p style={{ fontSize:".68rem",color:C.txM,marginTop:".1rem" }}>{s.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* JURUSAN GRID */}
      <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(320px,1fr))",gap:"1.25rem" }}>
        {jurusanData.map((j,i) => (
          <JurusanCard key={j.kode} j={j} index={i} onClick={() => setActive(j)} />
        ))}
      </div>

      {active && <JurusanModal j={active} onClose={() => setActive(null)} />}
    </DashboardLayout>
  );
}
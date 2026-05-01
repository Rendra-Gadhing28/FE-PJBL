import { useState } from "react";
import AdminLayout from "./AdminLayout";

const initialJurusan = [
  { id:"JRS-01", kode:"PPLG", nama:"Pengembangan Perangkat Lunak & GIM", icon:"💻", kaprodi:"Bpk. Hendra S., S.Kom", siswa:186, barang:38, dipinjam:9,  color:"#4A90D9" },
  { id:"JRS-02", kode:"TJKT", nama:"Teknik Jaringan Komputer & Telekomunikasi", icon:"🌐", kaprodi:"Ibu Sari W., S.T", siswa:172, barang:31, dipinjam:6,  color:"#3DBD8F" },
  { id:"JRS-03", kode:"LK",   nama:"Layanan Kesehatan", icon:"🏥", kaprodi:"Ibu Dewi R., S.Kep", siswa:134, barang:27, dipinjam:4,  color:"#F5C842" },
  { id:"JRS-04", kode:"DKV",  nama:"Desain Komunikasi Visual", icon:"🎨", kaprodi:"Bpk. Andri M., S.Sn", siswa:148, barang:35, dipinjam:8,  color:"#E07B54" },
  { id:"JRS-05", kode:"PS",   nama:"Perhotelan & Spa", icon:"🏨", kaprodi:"Ibu Ratna K., S.Par", siswa:98,  barang:17, dipinjam:3,  color:"#9B7ED6" },
];

export default function AdminJurusan() {
  const [jurusan, setJurusan] = useState(initialJurusan);
  const [selected, setSelected] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ kode:"", nama:"", icon:"🏫", kaprodi:"", color:"#4A90D9" });

  function openAdd() { setForm({ kode:"", nama:"", icon:"🏫", kaprodi:"", color:"#4A90D9" }); setShowForm(true); }
  function submitForm(e) {
    e.preventDefault();
    const newId = `JRS-0${jurusan.length + 1}`;
    setJurusan(prev => [...prev, { ...form, id:newId, siswa:0, barang:0, dipinjam:0 }]);
    setShowForm(false);
  }

  return (
    <AdminLayout activePage="jurusan">
      <div style={{ display:"flex", justifyContent:"flex-end", marginBottom:"1rem" }}>
        <button className="btn-primary" onClick={openAdd}>+ Tambah Jurusan</button>
      </div>

      {/* Cards */}
      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill, minmax(300px,1fr))", gap:"1rem", marginBottom:"1rem" }}>
        {jurusan.map(j => (
          <div key={j.id} className="card"
            style={{ cursor:"pointer", borderLeft:`4px solid ${j.color}`, transition:"box-shadow .25s, transform .25s" }}
            onClick={() => setSelected(selected?.id === j.id ? null : j)}
            onMouseEnter={e => { e.currentTarget.style.boxShadow="var(--shadow-h)"; e.currentTarget.style.transform="translateY(-2px)"; }}
            onMouseLeave={e => { e.currentTarget.style.boxShadow=""; e.currentTarget.style.transform=""; }}>
            <div style={{ display:"flex", alignItems:"center", gap:".85rem", marginBottom:".85rem" }}>
              <div style={{ width:48, height:48, borderRadius:14, background:j.color+"22", display:"flex", alignItems:"center", justifyContent:"center", fontSize:26, flexShrink:0 }}>
                {j.icon}
              </div>
              <div>
                <div style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontWeight:800, fontSize:"1.1rem", color:"var(--blue-dkr)" }}>{j.kode}</div>
                <div style={{ fontSize:".73rem", color:"var(--tx-m)", lineHeight:1.4 }}>{j.nama}</div>
              </div>
            </div>
            <div style={{ fontSize:".75rem", color:"var(--tx-m)", marginBottom:".85rem" }}>
              <span>👤 {j.kaprodi}</span>
            </div>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:".5rem" }}>
              {[["Siswa", j.siswa, j.color], ["Barang", j.barang, j.color], ["Dipinjam", j.dipinjam, "#C4973A"]].map(([label, val, c]) => (
                <div key={label} style={{ background:"var(--sky)", borderRadius:9, padding:".5rem", textAlign:"center" }}>
                  <div style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontWeight:800, fontSize:"1.1rem", color:c }}>{val}</div>
                  <div style={{ fontSize:".65rem", color:"var(--tx-m)" }}>{label}</div>
                </div>
              ))}
            </div>
            {selected?.id === j.id && (
              <div style={{ marginTop:".85rem", paddingTop:".85rem", borderTop:"1px solid var(--sky)" }}>
                <div style={{ fontSize:".75rem", fontWeight:600, color:"var(--blue-dkr)", marginBottom:".45rem" }}>Utilisasi Barang</div>
                <div style={{ height:7, background:"var(--sky)", borderRadius:99, overflow:"hidden", marginBottom:".3rem" }}>
                  <div style={{ height:"100%", width:`${Math.round((j.dipinjam/j.barang)*100)}%`, background:j.color, borderRadius:99 }} />
                </div>
                <div style={{ fontSize:".7rem", color:"var(--tx-m)" }}>{Math.round((j.dipinjam/j.barang)*100)}% barang sedang dipinjam</div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Summary table */}
      <div className="card">
        <div className="card-title">Ringkasan Semua Jurusan</div>
        <table style={{ width:"100%", borderCollapse:"collapse", fontSize:".8rem" }}>
          <thead>
            <tr style={{ borderBottom:"1px solid var(--blue-ltr)" }}>
              {["Kode","Nama Jurusan","Kaprodi","Siswa","Barang","Dipinjam","Tersedia"].map(h => (
                <th key={h} style={{ padding:".5rem .65rem", textAlign:"left", fontWeight:700, fontSize:".7rem", color:"var(--tx-m)", letterSpacing:".04em", textTransform:"uppercase" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {jurusan.map(j => (
              <tr key={j.id} style={{ borderBottom:"1px solid var(--sky)" }}
                onMouseEnter={e => e.currentTarget.style.background="var(--sky)"}
                onMouseLeave={e => e.currentTarget.style.background="transparent"}>
                <td style={{ padding:".55rem .65rem" }}>
                  <span style={{ background:j.color+"22", color:j.color, fontSize:".75rem", fontWeight:800, padding:".22rem .65rem", borderRadius:99 }}>{j.kode}</span>
                </td>
                <td style={{ padding:".55rem .65rem", fontWeight:600 }}>{j.icon} {j.nama}</td>
                <td style={{ padding:".55rem .65rem", color:"var(--tx-m)", fontSize:".75rem" }}>{j.kaprodi}</td>
                <td style={{ padding:".55rem .65rem", fontWeight:600, color:"var(--blue-dkr)", textAlign:"center" }}>{j.siswa}</td>
                <td style={{ padding:".55rem .65rem", fontWeight:600, textAlign:"center" }}>{j.barang}</td>
                <td style={{ padding:".55rem .65rem", fontWeight:600, color:"#C4973A", textAlign:"center" }}>{j.dipinjam}</td>
                <td style={{ padding:".55rem .65rem", fontWeight:700, color:"#2A9D6E", textAlign:"center" }}>{j.barang - j.dipinjam}</td>
              </tr>
            ))}
            <tr style={{ borderTop:"2px solid var(--blue-ltr)", background:"var(--sky)" }}>
              <td colSpan={3} style={{ padding:".55rem .65rem", fontWeight:700, fontSize:".78rem", color:"var(--blue-dkr)" }}>Total</td>
              <td style={{ padding:".55rem .65rem", fontWeight:800, color:"var(--blue-dkr)", textAlign:"center" }}>{jurusan.reduce((a,j)=>a+j.siswa,0)}</td>
              <td style={{ padding:".55rem .65rem", fontWeight:800, color:"var(--blue-dkr)", textAlign:"center" }}>{jurusan.reduce((a,j)=>a+j.barang,0)}</td>
              <td style={{ padding:".55rem .65rem", fontWeight:800, color:"#C4973A", textAlign:"center" }}>{jurusan.reduce((a,j)=>a+j.dipinjam,0)}</td>
              <td style={{ padding:".55rem .65rem", fontWeight:800, color:"#2A9D6E", textAlign:"center" }}>{jurusan.reduce((a,j)=>a+j.barang-j.dipinjam,0)}</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Add modal */}
      {showForm && (
        <div className="modal-overlay" onClick={() => setShowForm(false)}>
          <div className="modal-box" onClick={e => e.stopPropagation()}>
            <div className="modal-title">Tambah Jurusan Baru</div>
            <form onSubmit={submitForm}>
              <div className="form-group">
                <label className="form-label">Kode Jurusan</label>
                <input className="form-input" value={form.kode} onChange={e => setForm(f=>({...f,kode:e.target.value}))} required placeholder="Contoh: RPL" />
              </div>
              <div className="form-group">
                <label className="form-label">Nama Lengkap Jurusan</label>
                <input className="form-input" value={form.nama} onChange={e => setForm(f=>({...f,nama:e.target.value}))} required placeholder="Nama jurusan..." />
              </div>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:".75rem" }}>
                <div className="form-group">
                  <label className="form-label">Ikon (emoji)</label>
                  <input className="form-input" value={form.icon} onChange={e => setForm(f=>({...f,icon:e.target.value}))} maxLength={2} />
                </div>
                <div className="form-group">
                  <label className="form-label">Warna Aksen</label>
                  <input type="color" className="form-input" value={form.color} onChange={e => setForm(f=>({...f,color:e.target.value}))} style={{ height:42, padding:".25rem" }} />
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Nama Kaprodi</label>
                <input className="form-input" value={form.kaprodi} onChange={e => setForm(f=>({...f,kaprodi:e.target.value}))} placeholder="Nama kaprodi..." />
              </div>
              <div style={{ display:"flex", gap:".65rem", justifyContent:"flex-end" }}>
                <button type="submit" className="btn-primary">➕ Tambah</button>
                <button type="button" className="btn-ghost" onClick={() => setShowForm(false)}>Batal</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
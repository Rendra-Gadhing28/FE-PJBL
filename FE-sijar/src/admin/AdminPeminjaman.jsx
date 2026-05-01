import { useState } from "react";
import AdminLayout from "./AdminLayout";

const initialSiswa = [
  { id:"S001", nama:"Aldi Darmawan",   kelas:"XI PPLG 3", jurusan:"PPLG", poin:96, totalPinjam:14, aktif:2, status:"Aktif" },
  { id:"S002", nama:"Siti Rahma",      kelas:"X DKV 1",   jurusan:"DKV",  poin:88, totalPinjam:9,  aktif:1, status:"Aktif" },
  { id:"S003", nama:"Budi Santoso",    kelas:"XII TJKT 2", jurusan:"TJKT", poin:72, totalPinjam:21, aktif:1, status:"Aktif" },
  { id:"S004", nama:"Lestari N.",      kelas:"XI LK 1",   jurusan:"LK",   poin:95, totalPinjam:7,  aktif:1, status:"Aktif" },
  { id:"S005", nama:"Doni Prasetyo",   kelas:"XII PS 1",  jurusan:"PS",   poin:55, totalPinjam:18, aktif:1, status:"Peringatan" },
  { id:"S006", nama:"Maya Putri",      kelas:"XI DKV 2",  jurusan:"DKV",  poin:91, totalPinjam:12, aktif:0, status:"Aktif" },
  { id:"S007", nama:"Rizky Aditya",    kelas:"XII PPLG 1",jurusan:"PPLG", poin:84, totalPinjam:16, aktif:0, status:"Aktif" },
  { id:"S008", nama:"Anisa Dewi",      kelas:"X LK 2",    jurusan:"LK",   poin:90, totalPinjam:5,  aktif:1, status:"Aktif" },
  { id:"S009", nama:"Fajar Nugroho",   kelas:"XI TJKT 1", jurusan:"TJKT", poin:41, totalPinjam:23, aktif:1, status:"Diblokir" },
  { id:"S010", nama:"Putri Handayani", kelas:"XII PS 2",  jurusan:"PS",   poin:79, totalPinjam:8,  aktif:0, status:"Aktif" },
];

function poinColor(p) {
  if (p >= 80) return { bg:"#EAF7F0", color:"#2A9D6E" };
  if (p >= 60) return { bg:"#FEF9EC", color:"#C4973A" };
  return { bg:"#FEE7E6", color:"#C0503E" };
}

const statusMap = { Aktif:"s-ok", Peringatan:"s-pend", Diblokir:"s-late" };

export default function AdminSiswa() {
  const [siswa, setSiswa] = useState(initialSiswa);
  const [filter, setFilter] = useState("Semua");
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(null);

  const filtered = siswa.filter(s => {
    const mf = filter === "Semua" || s.jurusan === filter || s.status === filter;
    const ms = s.nama.toLowerCase().includes(search.toLowerCase()) || s.kelas.toLowerCase().includes(search.toLowerCase());
    return mf && ms;
  });

  function toggleBlock(id) {
    setSiswa(prev => prev.map(s => s.id === id
      ? { ...s, status: s.status === "Diblokir" ? "Aktif" : "Diblokir" }
      : s));
  }

  return (
    <AdminLayout activePage="siswa">
      <div style={{ display:"flex", gap:".5rem", marginBottom:"1rem", flexWrap:"wrap", alignItems:"center" }}>
        {["Semua","PPLG","TJKT","LK","DKV","PS","Peringatan","Diblokir"].map(f => (
          <button key={f} onClick={() => setFilter(f)}
            style={{ padding:".4rem .85rem", borderRadius:99, border:"1px solid", fontSize:".75rem", fontWeight:600, cursor:"pointer", transition:".2s",
              borderColor: filter===f ? "var(--blue-dk)" : "var(--blue-ltr)",
              background: filter===f ? "var(--blue-dkr)" : "var(--white)",
              color: filter===f ? "#fff" : "var(--tx-m)" }}>
            {f}
          </button>
        ))}
        <input style={{ marginLeft:"auto", background:"var(--sky)", border:"1px solid var(--blue-ltr)", borderRadius:10, padding:".4rem .85rem", fontSize:".8rem", color:"var(--tx)", width:200 }}
          placeholder="🔍 Cari siswa..." value={search} onChange={e => setSearch(e.target.value)} />
      </div>

      <div className="card">
        <div className="card-title">
          Data Siswa
          <span style={{ fontSize:".72rem", color:"var(--tx-m)", fontWeight:400 }}>{filtered.length} siswa</span>
        </div>
        <div style={{ overflowX:"auto" }}>
          <table style={{ width:"100%", borderCollapse:"collapse", fontSize:".8rem" }}>
            <thead>
              <tr style={{ borderBottom:"1px solid var(--blue-ltr)" }}>
                {["ID","Nama","Kelas","Jurusan","Poin","Total Pinjam","Aktif","Status","Aksi"].map(h => (
                  <th key={h} style={{ padding:".5rem .65rem", textAlign:"left", fontWeight:700, fontSize:".7rem", color:"var(--tx-m)", letterSpacing:".04em", textTransform:"uppercase", whiteSpace:"nowrap" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map(s => {
                const pc = poinColor(s.poin);
                return (
                  <tr key={s.id} style={{ borderBottom:"1px solid var(--sky)" }}
                    onMouseEnter={e => e.currentTarget.style.background="var(--sky)"}
                    onMouseLeave={e => e.currentTarget.style.background="transparent"}>
                    <td style={{ padding:".55rem .65rem", color:"var(--tx-m)", fontSize:".7rem", fontFamily:"monospace" }}>{s.id}</td>
                    <td style={{ padding:".55rem .65rem" }}>
                      <div style={{ display:"flex", alignItems:"center", gap:".55rem" }}>
                        <div style={{ width:28, height:28, borderRadius:"50%", background:"var(--blue-ltr)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:".68rem", fontWeight:700, color:"var(--blue-dk)", flexShrink:0 }}>
                          {s.nama.split(" ").map(w=>w[0]).join("").slice(0,2)}
                        </div>
                        <span style={{ fontWeight:600 }}>{s.nama}</span>
                      </div>
                    </td>
                    <td style={{ padding:".55rem .65rem", color:"var(--tx-m)", fontSize:".75rem" }}>{s.kelas}</td>
                    <td style={{ padding:".55rem .65rem" }}>
                      <span style={{ background:"var(--blue-ltr)", color:"var(--blue-dk)", fontSize:".67rem", fontWeight:700, padding:".15rem .5rem", borderRadius:99 }}>{s.jurusan}</span>
                    </td>
                    <td style={{ padding:".55rem .65rem" }}>
                      <span style={{ background: pc.bg, color: pc.color, fontSize:".75rem", fontWeight:700, padding:".18rem .55rem", borderRadius:99 }}>{s.poin}</span>
                    </td>
                    <td style={{ padding:".55rem .65rem", fontWeight:600, color:"var(--blue-dkr)", textAlign:"center" }}>{s.totalPinjam}</td>
                    <td style={{ padding:".55rem .65rem", fontWeight:600, color: s.aktif > 0 ? "#C4973A" : "var(--tx-m)", textAlign:"center" }}>{s.aktif}</td>
                    <td style={{ padding:".55rem .65rem" }}>
                      <span className={`status-badge ${statusMap[s.status]}`}>{s.status}</span>
                    </td>
                    <td style={{ padding:".55rem .65rem" }}>
                      <div style={{ display:"flex", gap:".3rem" }}>
                        <button className="tbl-btn tbl-btn-eye" onClick={() => setSelected(selected?.id === s.id ? null : s)} title="Detail">👁</button>
                        <button className={`tbl-btn ${s.status === "Diblokir" ? "tbl-btn-ok" : "tbl-btn-del"}`}
                          onClick={() => toggleBlock(s.id)}
                          title={s.status === "Diblokir" ? "Buka Blokir" : "Blokir"}>
                          {s.status === "Diblokir" ? "🔓" : "🔒"}
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Detail panel */}
      {selected && (
        <div className="card" style={{ marginTop:".85rem" }}>
          <div className="card-title">
            Detail Siswa — {selected.nama}
            <button className="btn-ghost" style={{ fontSize:".72rem", padding:".3rem .75rem" }} onClick={() => setSelected(null)}>✕ Tutup</button>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:"1rem" }}>
            {[
              ["ID Siswa", selected.id],
              ["Kelas", selected.kelas],
              ["Jurusan", selected.jurusan],
              ["Status", selected.status],
              ["Total Peminjaman", selected.totalPinjam + "x"],
              ["Sedang Dipinjam", selected.aktif + " barang"],
              ["Poin Kepercayaan", selected.poin + "/100"],
            ].map(([l,v]) => (
              <div key={l} style={{ background:"var(--sky)", borderRadius:10, padding:".65rem .85rem" }}>
                <div style={{ fontSize:".68rem", color:"var(--tx-m)", fontWeight:600, marginBottom:".2rem" }}>{l}</div>
                <div style={{ fontSize:".88rem", fontWeight:700, color:"var(--tx)" }}>{v}</div>
              </div>
            ))}
          </div>
          {/* Poin bar */}
          <div style={{ marginTop:"1rem" }}>
            <div style={{ display:"flex", justifyContent:"space-between", marginBottom:".35rem" }}>
              <span style={{ fontSize:".75rem", fontWeight:600, color:"var(--tx-m)" }}>Poin Kepercayaan</span>
              <span style={{ fontSize:".75rem", fontWeight:700, color: poinColor(selected.poin).color }}>{selected.poin}/100</span>
            </div>
            <div style={{ height:8, background:"var(--sky)", borderRadius:99, overflow:"hidden", border:"1px solid var(--blue-ltr)" }}>
              <div style={{ height:"100%", width:`${selected.poin}%`, background: selected.poin >= 80 ? "#3DBD8F" : selected.poin >= 60 ? "#F5C842" : "#E05252", borderRadius:99, transition:"width .5s" }} />
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
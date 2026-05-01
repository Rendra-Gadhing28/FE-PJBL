import { useState } from "react";
import AdminLayout from "./AdminLayout";

const monthlyData = [
  { bulan:"Jan", total:45, selesai:40, terlambat:5 },
  { bulan:"Feb", total:52, selesai:48, terlambat:4 },
  { bulan:"Mar", total:61, selesai:55, terlambat:6 },
  { bulan:"Apr", total:48, selesai:41, terlambat:7 },
];

const laporanList = [
  { id:"RPT-001", judul:"Laporan Peminjaman Maret 2026",   tgl:"01 Apr 2026", tipe:"Bulanan",  status:"Selesai" },
  { id:"RPT-002", judul:"Laporan Inventaris Q1 2026",      tgl:"31 Mar 2026", tipe:"Kuartalan",status:"Selesai" },
  { id:"RPT-003", judul:"Laporan Peminjaman Februari 2026",tgl:"01 Mar 2026", tipe:"Bulanan",  status:"Selesai" },
  { id:"RPT-004", judul:"Rekap Barang Rusak Maret 2026",   tgl:"28 Mar 2026", tipe:"Khusus",   status:"Selesai" },
  { id:"RPT-005", judul:"Laporan Peminjaman April 2026",   tgl:"--",           tipe:"Bulanan",  status:"Proses" },
];

const jurusanPerform = [
  { name:"PPLG", total:87, tepat:80, terlambat:7,  color:"#4A90D9" },
  { name:"TJKT", total:63, tepat:55, terlambat:8,  color:"#3DBD8F" },
  { name:"DKV",  total:74, tepat:70, terlambat:4,  color:"#E07B54" },
  { name:"LK",   total:41, tepat:40, terlambat:1,  color:"#F5C842" },
  { name:"PS",   total:28, tepat:24, terlambat:4,  color:"#9B7ED6" },
];

export default function AdminLaporan() {
  const [activeTab, setActiveTab] = useState("ringkasan");

  return (
    <AdminLayout activePage="laporan">
      {/* Tabs */}
      <div style={{ display:"flex", gap:".4rem", marginBottom:"1.25rem", borderBottom:"1px solid var(--blue-ltr)", paddingBottom:".65rem" }}>
        {[["ringkasan","📊 Ringkasan"],["riwayat","📋 Riwayat Laporan"],["jurusan","🏫 Per Jurusan"]].map(([id,label]) => (
          <button key={id} onClick={() => setActiveTab(id)}
            style={{ padding:".45rem 1.1rem", borderRadius:"10px 10px 0 0", border:"1px solid", fontSize:".8rem", fontWeight:600, cursor:"pointer", transition:".2s",
              borderColor: activeTab===id ? "var(--blue-ltr)" : "transparent",
              borderBottomColor: activeTab===id ? "var(--white)" : "transparent",
              background: activeTab===id ? "var(--white)" : "transparent",
              color: activeTab===id ? "var(--blue-dk)" : "var(--tx-m)",
              marginBottom: activeTab===id ? "-1px" : 0 }}>
            {label}
          </button>
        ))}
      </div>

      {/* Tab: Ringkasan */}
      {activeTab === "ringkasan" && (
        <>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:".85rem", marginBottom:"1.25rem" }}>
            {[
              { label:"Total Peminjaman 2026", val:"293", ic:"📋", bg:"#D6EAFA" },
              { label:"Tingkat Pengembalian",  val:"94%", ic:"✅", bg:"#EAF7F0" },
              { label:"Rata-rata per Bulan",   val:"61",  ic:"📈", bg:"#FEF9EC" },
              { label:"Barang Terlambat",      val:"22",  ic:"⚠️", bg:"#FEE7E6" },
            ].map(s => (
              <div className="stat-card" key={s.label}>
                <div className="stat-icon-wrap" style={{ background:s.bg }}>{s.ic}</div>
                <div className="stat-label">{s.label}</div>
                <div className="stat-val">{s.val}</div>
              </div>
            ))}
          </div>

          {/* Bar chart bulanan */}
          <div className="card" style={{ marginBottom:".85rem" }}>
            <div className="card-title">Tren Peminjaman Bulanan 2026</div>
            <div style={{ display:"flex", alignItems:"flex-end", gap:"1.5rem", height:160, paddingBottom:8, borderBottom:"1px solid var(--sky)" }}>
              {monthlyData.map(m => (
                <div key={m.bulan} style={{ flex:1, display:"flex", flexDirection:"column", alignItems:"center", gap:4 }}>
                  <div style={{ width:"100%", display:"flex", gap:4, alignItems:"flex-end", height:130 }}>
                    <div style={{ flex:1, background:"var(--blue)", borderRadius:"4px 4px 0 0", height:`${(m.selesai/65)*130}px`, minWidth:0 }} title={`Selesai: ${m.selesai}`} />
                    <div style={{ flex:1, background:"#FEE7E6", borderRadius:"4px 4px 0 0", height:`${(m.terlambat/65)*130}px`, minWidth:0 }} title={`Terlambat: ${m.terlambat}`} />
                  </div>
                  <span style={{ fontSize:".7rem", fontWeight:600, color:"var(--tx-m)" }}>{m.bulan}</span>
                </div>
              ))}
            </div>
            <div style={{ display:"flex", gap:"1.25rem", marginTop:".65rem" }}>
              <div style={{ display:"flex", alignItems:"center", gap:".35rem", fontSize:".72rem", color:"var(--tx-m)" }}>
                <div style={{ width:10, height:10, background:"var(--blue)", borderRadius:3 }} /> Tepat Waktu
              </div>
              <div style={{ display:"flex", alignItems:"center", gap:".35rem", fontSize:".72rem", color:"var(--tx-m)" }}>
                <div style={{ width:10, height:10, background:"#FEE7E6", borderRadius:3, border:"1px solid #C0503E" }} /> Terlambat
              </div>
            </div>
          </div>

          <div className="card">
            <div className="card-title">Ekspor Laporan</div>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:".85rem" }}>
              {[
                { label:"Laporan Bulanan", desc:"Rekap semua peminjaman bulan ini", icon:"📅" },
                { label:"Laporan Inventaris", desc:"Status lengkap semua barang", icon:"📦" },
                { label:"Laporan Siswa", desc:"Riwayat & poin kepercayaan siswa", icon:"👥" },
              ].map(e => (
                <div key={e.label} style={{ background:"var(--sky)", borderRadius:12, padding:"1rem", border:"1px solid var(--blue-ltr)" }}>
                  <div style={{ fontSize:28, marginBottom:".5rem" }}>{e.icon}</div>
                  <div style={{ fontWeight:700, fontSize:".83rem", color:"var(--blue-dkr)", marginBottom:".25rem" }}>{e.label}</div>
                  <div style={{ fontSize:".72rem", color:"var(--tx-m)", marginBottom:".75rem" }}>{e.desc}</div>
                  <div style={{ display:"flex", gap:".4rem" }}>
                    <button className="btn-primary" style={{ fontSize:".72rem", padding:".38rem .75rem" }}>📄 PDF</button>
                    <button className="btn-ghost" style={{ fontSize:".72rem", padding:".38rem .75rem" }}>📊 Excel</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {/* Tab: Riwayat Laporan */}
      {activeTab === "riwayat" && (
        <div className="card">
          <div className="card-title">Riwayat Laporan</div>
          <table style={{ width:"100%", borderCollapse:"collapse", fontSize:".8rem" }}>
            <thead>
              <tr style={{ borderBottom:"1px solid var(--blue-ltr)" }}>
                {["ID","Judul Laporan","Tanggal","Tipe","Status","Aksi"].map(h => (
                  <th key={h} style={{ padding:".5rem .65rem", textAlign:"left", fontWeight:700, fontSize:".7rem", color:"var(--tx-m)", textTransform:"uppercase", letterSpacing:".04em" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {laporanList.map(l => (
                <tr key={l.id} style={{ borderBottom:"1px solid var(--sky)" }}
                  onMouseEnter={e => e.currentTarget.style.background="var(--sky)"}
                  onMouseLeave={e => e.currentTarget.style.background="transparent"}>
                  <td style={{ padding:".55rem .65rem", color:"var(--tx-m)", fontSize:".7rem", fontFamily:"monospace" }}>{l.id}</td>
                  <td style={{ padding:".55rem .65rem", fontWeight:600 }}>{l.judul}</td>
                  <td style={{ padding:".55rem .65rem", color:"var(--tx-m)" }}>{l.tgl}</td>
                  <td style={{ padding:".55rem .65rem" }}>
                    <span style={{ background:"var(--blue-ltr)", color:"var(--blue-dk)", fontSize:".67rem", fontWeight:700, padding:".15rem .5rem", borderRadius:99 }}>{l.tipe}</span>
                  </td>
                  <td style={{ padding:".55rem .65rem" }}>
                    <span className={`status-badge ${l.status === "Selesai" ? "s-ok" : "s-pend"}`}>{l.status}</span>
                  </td>
                  <td style={{ padding:".55rem .65rem" }}>
                    {l.status === "Selesai" && (
                      <div style={{ display:"flex", gap:".35rem" }}>
                        <button className="tbl-btn tbl-btn-ok" title="Download PDF">📄</button>
                        <button className="tbl-btn tbl-btn-eye" title="Lihat">👁</button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Tab: Per Jurusan */}
      {activeTab === "jurusan" && (
        <>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(5,1fr)", gap:".85rem", marginBottom:"1.25rem" }}>
            {jurusanPerform.map(j => (
              <div key={j.name} className="stat-card" style={{ textAlign:"center", padding:"1.1rem .85rem" }}>
                <div style={{ fontSize:".72rem", color:"var(--tx-m)", marginBottom:".3rem" }}>{j.name}</div>
                <div style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontWeight:800, fontSize:"1.6rem", color:j.color, marginBottom:".3rem" }}>{j.total}</div>
                <div style={{ fontSize:".7rem", color:"var(--tx-m)" }}>total pinjam</div>
                <div style={{ marginTop:".65rem", height:5, background:"var(--sky)", borderRadius:99, overflow:"hidden" }}>
                  <div style={{ height:"100%", width:`${(j.tepat/j.total)*100}%`, background:j.color, borderRadius:99 }} />
                </div>
                <div style={{ marginTop:".3rem", fontSize:".65rem", color:"var(--tx-m)" }}>{Math.round((j.tepat/j.total)*100)}% tepat waktu</div>
              </div>
            ))}
          </div>

          <div className="card">
            <div className="card-title">Perbandingan Performa Jurusan</div>
            {jurusanPerform.map(j => (
              <div key={j.name} style={{ marginBottom:"1rem" }}>
                <div style={{ display:"flex", justifyContent:"space-between", marginBottom:".35rem" }}>
                  <span style={{ fontSize:".82rem", fontWeight:700 }}>{j.name}</span>
                  <div style={{ display:"flex", gap:".75rem", fontSize:".72rem", color:"var(--tx-m)" }}>
                    <span style={{ color:"#2A9D6E" }}>✓ {j.tepat} tepat</span>
                    <span style={{ color:"#C0503E" }}>⚠ {j.terlambat} terlambat</span>
                  </div>
                </div>
                <div style={{ display:"flex", height:12, borderRadius:99, overflow:"hidden", background:"var(--sky)", border:"1px solid var(--blue-ltr)" }}>
                  <div style={{ width:`${(j.tepat/j.total)*100}%`, background:j.color, transition:"width .5s" }} />
                  <div style={{ width:`${(j.terlambat/j.total)*100}%`, background:"#FEE7E6" }} />
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </AdminLayout>
  );
}
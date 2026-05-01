import { useState, useEffect } from "react";
import AdminLayout from "./AdminLayout";

const statsData = [
  { icon: "📦", label: "Total Barang",       val: "148", sub: "+4 bulan ini",   pillClass: "pill-blue",   iconBg: "#D6EAFA" },
  { icon: "🔄", label: "Sedang Dipinjam",    val: "23",  sub: "dari 5 jurusan", pillClass: "pill-yellow", iconBg: "#FEF9EC" },
  { icon: "✅", label: "Selesai Bulan Ini",  val: "61",  sub: "+12% vs bulan lalu", pillClass: "pill-green", iconBg: "#EAF7F0" },
  { icon: "⚠️", label: "Perlu Persetujuan",  val: "7",   sub: "menunggu admin", pillClass: "pill-red",    iconBg: "#FEE7E6" },
];

const recentBorrows = [
  { name: "Aldi Darmawan",   jurusan: "PPLG", barang: "Laptop Dell Inspiron", tgl: "13 Apr",  status: "Aktif",    sc: "s-ok" },
  { name: "Siti Rahma",      jurusan: "DKV",  barang: "Kamera Canon DSLR",    tgl: "13 Apr",  status: "Aktif",    sc: "s-ok" },
  { name: "Budi Santoso",    jurusan: "TJKT", barang: "Router MikroTik",       tgl: "12 Apr",  status: "Pending",  sc: "s-pend" },
  { name: "Lestari N.",      jurusan: "LK",   barang: "Stetoskop Littmann",    tgl: "12 Apr",  status: "Aktif",    sc: "s-ok" },
  { name: "Doni Prasetyo",   jurusan: "PS",   barang: "Laptop Asus VivoBook",  tgl: "11 Apr",  status: "Terlambat",sc: "s-late" },
  { name: "Maya Putri",      jurusan: "DKV",  barang: "Tablet Grafis Wacom",   tgl: "11 Apr",  status: "Selesai",  sc: "s-done" },
];

const jurusanStats = [
  { icon: "💻", name: "PPLG", total: 38, dipinjam: 9,  color: "#4A90D9" },
  { icon: "🌐", name: "TJKT", total: 31, dipinjam: 6,  color: "#3DBD8F" },
  { icon: "🏥", name: "LK",   total: 27, dipinjam: 4,  color: "#F5C842" },
  { icon: "🎨", name: "DKV",  total: 35, dipinjam: 8,  color: "#E07B54" },
  { icon: "🏨", name: "PS",   total: 17, dipinjam: 3,  color: "#9B7ED6" },  // fixed: was "HS" but should be PS
];

const topBarang = [
  { name: "Laptop Dell Inspiron", count: 24, jurusan: "PPLG" },
  { name: "Proyektor Epson",       count: 18, jurusan: "TJKT" },
  { name: "Kamera Canon DSLR",     count: 15, jurusan: "DKV" },
  { name: "Tensimeter Digital",    count: 11, jurusan: "LK" },
  { name: "Tablet Grafis Wacom",   count: 9,  jurusan: "DKV" },
];

export default function AdminDashboard() {
  return (
    <AdminLayout activePage="dashboard">
      {/* Stats */}
      <div className="stats-grid">
        {statsData.map(s => (
          <div className="stat-card" key={s.label}>
            <div className="stat-icon-wrap" style={{ background: s.iconBg }}>{s.icon}</div>
            <div className="stat-label">{s.label}</div>
            <div className="stat-val">{s.val}</div>
            <span className={`stat-pill ${s.pillClass}`}>{s.sub}</span>
          </div>
        ))}
      </div>

      {/* Chart area (bar visual) + Jurusan */}
      <div className="grid-2" style={{ marginBottom: ".85rem" }}>
        <div className="card">
          <div className="card-title">
            Aktivitas Peminjaman — April 2026
            <span className="card-badge">Bulan Ini</span>
          </div>
          {/* Simple bar chart */}
          <div style={{ display: "flex", alignItems: "flex-end", gap: "6px", height: 120, paddingBottom: "8px", borderBottom: "1px solid var(--sky)" }}>
            {[14,22,18,30,25,28,20,35,19,26,32,23,27,29,21,33,18,24,30,28,22,19,26,31,20,27,23,35,18,29].map((v,i) => (
              <div key={i} style={{
                flex: 1, background: i === 29 ? "var(--blue)" : "var(--blue-ltr)",
                borderRadius: "4px 4px 0 0", height: `${(v/35)*100}%`,
                transition: ".2s", cursor: "pointer",
                minWidth: 0,
              }}
              onMouseEnter={e => e.target.style.background = "var(--blue)"}
              onMouseLeave={(e,idx=i) => e.target.style.background = idx===29 ? "var(--blue)" : "var(--blue-ltr)"}
              title={`${v} peminjaman`}
              />
            ))}
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: ".4rem" }}>
            <span style={{ fontSize: ".65rem", color: "var(--tx-m)" }}>1 Apr</span>
            <span style={{ fontSize: ".65rem", color: "var(--tx-m)" }}>15 Apr</span>
            <span style={{ fontSize: ".65rem", color: "var(--tx-m)" }}>30 Apr</span>
          </div>
        </div>

        <div className="card">
          <div className="card-title">Distribusi per Jurusan</div>
          {jurusanStats.map(j => (
            <div key={j.name} style={{ padding: ".42rem 0", borderBottom: "1px solid var(--sky)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: ".3rem" }}>
                <span style={{ fontSize: ".8rem", fontWeight: 600 }}>{j.icon} {j.name}</span>
                <span style={{ fontSize: ".71rem", color: "var(--tx-m)" }}>{j.dipinjam}/{j.total} dipinjam</span>
              </div>
              <div style={{ height: 5, background: "var(--sky)", borderRadius: 99, overflow: "hidden" }}>
                <div style={{ height: "100%", width: `${(j.dipinjam/j.total)*100}%`, background: j.color, borderRadius: 99 }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent borrows table */}
      <div className="card" style={{ marginBottom: ".85rem" }}>
        <div className="card-title">
          Peminjaman Terbaru
          <a href="#peminjaman" className="card-action">Kelola semua →</a>
        </div>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: ".8rem" }}>
          <thead>
            <tr style={{ borderBottom: "1px solid var(--blue-ltr)" }}>
              {["Peminjam","Jurusan","Barang","Tanggal","Status","Aksi"].map(h => (
                <th key={h} style={{ padding: ".5rem .6rem", textAlign: "left", fontWeight: 700, fontSize: ".72rem", color: "var(--tx-m)", letterSpacing: ".04em", textTransform: "uppercase" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {recentBorrows.map((r, i) => (
              <tr key={i} style={{ borderBottom: "1px solid var(--sky)" }}
                onMouseEnter={e => e.currentTarget.style.background = "var(--sky)"}
                onMouseLeave={e => e.currentTarget.style.background = "transparent"}
              >
                <td style={{ padding: ".55rem .6rem", fontWeight: 600 }}>{r.name}</td>
                <td style={{ padding: ".55rem .6rem" }}>
                  <span style={{ background: "var(--blue-ltr)", color: "var(--blue-dk)", fontSize: ".68rem", fontWeight: 700, padding: ".18rem .55rem", borderRadius: 99 }}>{r.jurusan}</span>
                </td>
                <td style={{ padding: ".55rem .6rem", color: "var(--tx-m)" }}>{r.barang}</td>
                <td style={{ padding: ".55rem .6rem", color: "var(--tx-m)" }}>{r.tgl}</td>
                <td style={{ padding: ".55rem .6rem" }}>
                  <span className={`status-badge ${r.sc}`}>{r.status}</span>
                </td>
                <td style={{ padding: ".55rem .6rem" }}>
                  <div style={{ display: "flex", gap: ".35rem" }}>
                    <button className="tbl-btn tbl-btn-ok" title="Setujui">✓</button>
                    <button className="tbl-btn tbl-btn-del" title="Tolak">✕</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Top barang */}
      <div className="card">
        <div className="card-title">Barang Paling Sering Dipinjam</div>
        <div style={{ display: "flex", flexDirection: "column", gap: ".5rem" }}>
          {topBarang.map((b, i) => (
            <div key={b.name} style={{ display: "flex", alignItems: "center", gap: ".75rem" }}>
              <span style={{ fontSize: ".72rem", fontWeight: 800, color: "var(--tx-m)", width: 16, textAlign: "right" }}>{i + 1}</span>
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: ".25rem" }}>
                  <span style={{ fontSize: ".8rem", fontWeight: 600 }}>{b.name}</span>
                  <span style={{ fontSize: ".71rem", color: "var(--tx-m)" }}>{b.count}x</span>
                </div>
                <div style={{ height: 5, background: "var(--sky)", borderRadius: 99, overflow: "hidden" }}>
                  <div style={{ height: "100%", width: `${(b.count/24)*100}%`, background: "var(--blue)", borderRadius: 99 }} />
                </div>
              </div>
              <span style={{ fontSize: ".65rem", fontWeight: 700, color: "var(--blue-dk)", background: "var(--blue-ltr)", padding: ".15rem .45rem", borderRadius: 99 }}>{b.jurusan}</span>
            </div>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
}
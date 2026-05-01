import { useState } from "react";
<<<<<<< HEAD
import DashboardLayout from "./Dashboardlayout";

export default function ProfilePage() {
  return (
    <DashboardLayout>
      <h1>Profil</h1>
=======
import { Link } from "react-router-dom";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import DashboardLayout from "./Dashboardlayout";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

const C = {
  blueDkr: "#0F2D52", blueDk: "#1A4A8A", blue: "#2563A8",
  blueMd: "#4A90D9", blueLt: "#7BB8E8", blueLtr: "#C8E4F8",
  sky: "#EBF5FD", white: "#FFFFFF", bg: "#F4F8FD",
  tx: "#0F2D52", txM: "#5A7A9B", txL: "#9BB5CC",
  green: "#10B981", greenDk: "#065F46", greenLt: "#D1FAE5",
  yellow: "#F59E0B", yellowDk: "#92400E", yellowLt: "#FEF3C7",
  red: "#EF4444", redDk: "#7F1D1D", redLt: "#FEE2E2",
  purple: "#7C3AED", purpleLt: "#EDE9FE", purpleDk: "#4C1D95",
  orange: "#F97316", orangeLt: "#FFEDD5",
  teal: "#0D9488", tealLt: "#CCFBF1",
};

const riwayatSingkat = [
  { nama: "Laptop Asus VivoBook", tgl: "15 Apr 2025", status: "aktif", emoji: "💻" },
  { nama: "Proyektor Epson EB-X41", tgl: "10 Apr 2025", status: "kembali", emoji: "📽️" },
  { nama: "Arduino Uno Rev3", tgl: "5 Apr 2025", status: "telat", emoji: "🔌" },
  { nama: "Drawing Tablet Wacom", tgl: "1 Apr 2025", status: "kembali", emoji: "🎨" },
];

const statusStyle = {
  aktif: { bg: C.yellowLt, c: C.yellowDk, label: "Aktif" },
  kembali: { bg: C.greenLt, c: C.greenDk, label: "Kembali" },
  telat: { bg: C.redLt, c: C.redDk, label: "Terlambat" },
};

const stats = [
  { label: "Total Pinjam", val: 24, icon: "📋", color: C.blue, bg: C.sky },
  { label: "Dikembalikan", val: 18, icon: "✅", color: C.green, bg: C.greenLt },
  { label: "Aktif", val: 5, icon: "⏳", color: C.yellow, bg: C.yellowLt },
  { label: "Terlambat", val: 1, icon: "⚠️", color: C.red, bg: C.redLt },
];

const monthlyData = [
  { bulan: "Nov", val: 2 },
  { bulan: "Des", val: 4 },
  { bulan: "Jan", val: 5 },
  { bulan: "Feb", val: 3 },
  { bulan: "Mar", val: 7 },
  { bulan: "Apr", val: 3 },
];

// ── Area Chart Chart.js ──────────────────────────────────────────────────────
function MonthlyAreaChart({ data }) {
  const chartData = {
    labels: data.map((d) => d.bulan),
    datasets: [
      {
        label: "Peminjaman",
        data: data.map((d) => d.val),
        fill: true,
        tension: 0.45,
        borderColor: "#2563A8",
        borderWidth: 2.5,
        backgroundColor: (ctx) => {
          const gradient = ctx.chart.ctx.createLinearGradient(0, 0, 0, 180);
          gradient.addColorStop(0, "rgba(37,99,168,0.32)");
          gradient.addColorStop(1, "rgba(37,99,168,0.02)");
          return gradient;
        },
        pointBackgroundColor: "#2563A8",
        pointBorderColor: "#fff",
        pointBorderWidth: 2,
        pointRadius: 5,
        pointHoverRadius: 7,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: { mode: "index", intersect: false },
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: "#0F2D52",
        titleColor: "#C8E4F8",
        bodyColor: "#fff",
        borderColor: "#2563A8",
        borderWidth: 1,
        padding: 10,
        cornerRadius: 10,
        callbacks: {
          label: (ctx) => ` ${ctx.parsed.y} peminjaman`,
        },
      },
    },
    scales: {
      x: {
        grid: { display: false },
        border: { display: false },
        ticks: { color: "#5A7A9B", font: { size: 11, weight: "600" } },
      },
      y: {
        grid: { color: "rgba(200,228,248,0.5)" },
        border: { display: false, dash: [4, 4] },
        ticks: { color: "#9BB5CC", font: { size: 10 }, stepSize: 2 },
        beginAtZero: true,
      },
    },
  };

  return (
    <div style={{ height: 180, width: "100%" }}>
      <Line data={chartData} options={options} />
    </div>
  );
}
// ─────────────────────────────────────────────────────────────────────────────

const tips = [
  {
    icon: "📅",
    title: "Perhatikan Batas Waktu",
    desc: "Selalu cek tanggal pengembalian barang yang kamu pinjam. Keterlambatan bisa mempengaruhi skor ketepatan kamu.",
    color: C.blue,
    bg: C.sky,
    border: C.blueLtr,
  },
  {
    icon: "🔍",
    title: "Cek Stok Sebelum Meminjam",
    desc: "Pastikan barang yang ingin kamu pinjam tersedia di inventaris. Kamu bisa cek di halaman Inventaris sebelum mengajukan peminjaman.",
    color: C.teal,
    bg: C.tealLt,
    border: "#5EEAD4",
  },
  {
    icon: "📦",
    title: "Maksimal 5 Barang Sekaligus",
    desc: "Setiap siswa hanya boleh meminjam maksimal 5 barang dalam waktu bersamaan sesuai kebijakan terbaru Mei 2025.",
    color: C.purple,
    bg: C.purpleLt,
    border: "#C4B5FD",
  },
  {
    icon: "⚠️",
    title: "Jaga Kondisi Barang",
    desc: "Kembalikan barang dalam kondisi yang sama seperti saat dipinjam. Kerusakan akibat kelalaian bisa dikenakan sanksi.",
    color: C.yellowDk,
    bg: C.yellowLt,
    border: "#FDE68A",
  },
  {
    icon: "📞",
    title: "Hubungi Admin Jika Ada Masalah",
    desc: "Jika barang mengalami kerusakan atau kamu tidak bisa mengembalikan tepat waktu, segera hubungi admin sekolah.",
    color: C.green,
    bg: C.greenLt,
    border: "#6EE7B7",
  },
  {
    icon: "📝",
    title: "Cara Ajukan Peminjaman",
    desc: "Masuk ke menu Peminjaman Baru → pilih barang → isi tanggal → kirim. Admin akan menyetujui dalam 1×24 jam.",
    color: C.orange,
    bg: C.orangeLt,
    border: "#FDBA74",
  },
];

export default function ProfilePage() {
  const [editMode, setEditMode] = useState(false);
  const [activeTab, setActiveTab] = useState("info");
  const [saved, setSaved] = useState(false);
  const [profile, setProfile] = useState({
    nama: "Ahmad Fauzi",
    nis: "123456789",
    kelas: "XI PPLG 3",
    jurusan: "PPLG",
    email: "ahmad.fauzi@smkn8smg.sch.id",
    noHp: "081234567890",
    alamat: "Jl. Merdeka No. 45, Semarang Tengah",
    bio: "Siswa aktif kelas XI PPLG 3 yang senang coding dan belajar teknologi baru. Hobi membuat proyek IoT dan web development.",
  });
  const [draft, setDraft] = useState(profile);

  const handleSave = () => {
    setProfile(draft);
    setEditMode(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  // 3 tab saja: badge dihapus
  const tabs = ["info", "statistik", "tips", "riwayat"];
  const tabLabel = { info: "👤 Info", statistik: "📊 Statistik", tips: "💡 Tips & Info", riwayat: "📋 Riwayat" };

  return (
    <DashboardLayout>
      <style>{`
        .pro-card { background: #fff; border-radius: 20px; border: 1.5px solid ${C.blueLtr}; }
        .pro-tab { padding: .5rem 1.1rem; border-radius: 999px; border: 1.5px solid transparent; font-weight: 700; font-size: .8rem; cursor: pointer; transition: all .2s; font-family: 'Plus Jakarta Sans', sans-serif; }
        .pro-tab.active { background: ${C.blue}; color: #fff; border-color: ${C.blue}; }
        .pro-tab:not(.active) { background: transparent; color: ${C.txM}; border-color: ${C.blueLtr}; }
        .pro-tab:not(.active):hover { background: ${C.sky}; }
        .form-input { width: 100%; padding: .65rem .9rem; border: 1.5px solid ${C.blueLtr}; border-radius: 12px; font-family: 'Plus Jakarta Sans',sans-serif; font-size: .875rem; color: ${C.tx}; outline: none; transition: border-color .18s, box-shadow .18s; background: ${C.bg}; }
        .form-input:focus { border-color: ${C.blue}; background: #fff; box-shadow: 0 0 0 3px ${C.blueLtr}40; }
        .form-input:disabled { background: ${C.sky}; color: ${C.txM}; border-color: transparent; cursor: default; }
        .stat-mini { border-radius: 14px; padding: .85rem 1rem; text-align: center; transition: transform .2s; }
        .stat-mini:hover { transform: translateY(-2px); }
        .toast { position: fixed; bottom: 2rem; right: 2rem; background: ${C.blueDkr}; color: #fff; padding: .85rem 1.4rem; border-radius: 14px; font-size: .875rem; font-weight: 600; z-index: 500; box-shadow: 0 8px 24px rgba(0,0,0,.15); display: flex; align-items: center; gap: .5rem; animation: slideIn .3s ease; }
        @keyframes slideIn { from { transform: translateX(20px); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
        .ring-chart { transform: rotate(-90deg); }
        .tip-card { border-radius: 16px; padding: 1.1rem 1.25rem; border: 1.5px solid; transition: transform .2s, box-shadow .2s; }
        .tip-card:hover { transform: translateY(-3px); box-shadow: 0 8px 24px rgba(37,99,168,.1); }
      `}</style>

      {/* Header */}
      <div style={{ marginBottom: "1.5rem" }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: ".35rem", background: C.sky, color: C.blue, fontSize: ".7rem", fontWeight: 700, letterSpacing: ".07em", textTransform: "uppercase", padding: ".25rem .75rem", borderRadius: 9999, marginBottom: ".5rem", border: `1px solid ${C.blueLtr}` }}>
          👤 Profil Saya
        </div>
        <h1 style={{ fontSize: "1.6rem", fontWeight: 800, color: C.blueDkr, marginBottom: ".2rem" }}>Profil Saya</h1>
        <p style={{ color: C.txM, fontSize: ".88rem" }}>Kelola informasi akun dan lihat statistik peminjaman kamu.</p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "300px 1fr", gap: "1.25rem", alignItems: "flex-start" }}>

        {/* ── LEFT ── */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {/* Avatar card */}
          <div className="pro-card" style={{ overflow: "hidden" }}>
            <div style={{ height: 90, background: `linear-gradient(135deg, ${C.blueDkr}, ${C.blue}, ${C.blueMd})`, position: "relative" }}>
              <div style={{ position: "absolute", top: -20, right: -20, width: 100, height: 100, borderRadius: "50%", background: "rgba(255,255,255,.07)" }} />
              <div style={{ position: "absolute", bottom: -30, left: -20, width: 80, height: 80, borderRadius: "50%", background: "rgba(255,255,255,.05)" }} />
            </div>
            <div style={{ padding: "0 1.5rem 1.5rem", position: "relative" }}>
              <div style={{ position: "relative", display: "inline-block", marginTop: -35 }}>
                <div style={{ width: 72, height: 72, borderRadius: "50%", background: `linear-gradient(135deg, ${C.blue}, ${C.blueMd})`, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: "1.5rem", fontWeight: 800, border: `4px solid #fff`, boxShadow: `0 4px 16px ${C.blue}44`, fontFamily: "'Plus Jakarta Sans',sans-serif" }}>
                  AF
                </div>
                <div style={{ position: "absolute", bottom: 2, right: 2, width: 20, height: 20, borderRadius: "50%", background: C.green, border: "3px solid #fff", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <span style={{ fontSize: ".5rem", color: "#fff" }}>✓</span>
                </div>
              </div>
              <div style={{ marginTop: ".75rem" }}>
                <h2 style={{ fontSize: "1.05rem", fontWeight: 800, color: C.blueDkr, marginBottom: ".15rem" }}>{profile.nama}</h2>
                <p style={{ fontSize: ".78rem", color: C.txM, marginBottom: ".5rem" }}>NIS: {profile.nis}</p>
                <div style={{ display: "flex", gap: ".4rem", flexWrap: "wrap" }}>
                  <span style={{ fontSize: ".7rem", fontWeight: 700, background: C.sky, color: C.blue, padding: ".2rem .65rem", borderRadius: 999, border: `1px solid ${C.blueLtr}` }}>💻 {profile.kelas}</span>
                  <span style={{ fontSize: ".7rem", fontWeight: 700, background: C.greenLt, color: C.greenDk, padding: ".2rem .65rem", borderRadius: 999 }}>🎖️ Aktif</span>
                </div>
              </div>
            </div>
          </div>

          {/* Skor ketepatan */}
          <div className="pro-card" style={{ padding: "1.25rem" }}>
            <p style={{ fontSize: ".78rem", fontWeight: 700, color: C.txM, textTransform: "uppercase", letterSpacing: ".07em", marginBottom: "1rem" }}>Skor Ketepatan</p>
            <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
              <div style={{ position: "relative", flexShrink: 0 }}>
                <svg width="72" height="72" className="ring-chart">
                  <circle cx="36" cy="36" r="28" fill="none" stroke={C.sky} strokeWidth="8" />
                  <circle cx="36" cy="36" r="28" fill="none" stroke={C.green} strokeWidth="8"
                    strokeDasharray={`${2 * Math.PI * 28}`}
                    strokeDashoffset={`${2 * Math.PI * 28 * (1 - 0.87)}`}
                    strokeLinecap="round" />
                </svg>
                <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <p style={{ fontSize: ".85rem", fontWeight: 800, color: C.green }}>87%</p>
                </div>
              </div>
              <div>
                <p style={{ fontWeight: 800, fontSize: "1rem", color: C.greenDk }}>Sangat Baik</p>
                <p style={{ fontSize: ".73rem", color: C.txM, lineHeight: 1.4, marginTop: ".2rem" }}>Dari 24 peminjaman,<br/>18 dikembalikan tepat waktu</p>
              </div>
            </div>
          </div>

          {/* Mini stats */}
          <div className="pro-card" style={{ padding: "1rem" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: ".6rem" }}>
              {stats.map(s => (
                <div key={s.label} className="stat-mini" style={{ background: s.bg }}>
                  <p style={{ fontSize: "1.3rem", marginBottom: ".15rem" }}>{s.icon}</p>
                  <p style={{ fontSize: "1.25rem", fontWeight: 800, color: s.color, lineHeight: 1 }}>{s.val}</p>
                  <p style={{ fontSize: ".67rem", color: C.txM, marginTop: ".2rem" }}>{s.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div className="pro-card" style={{ padding: "1rem" }}>
            {[
              { to: "/dashboard/riwayat", icon: "📋", label: "Lihat Riwayat Lengkap" },
              { to: "/dashboard/settings", icon: "⚙️", label: "Pengaturan Akun" },
              { to: "/dashboard/peminjaman", icon: "📦", label: "Pinjam Barang Baru" },
            ].map((l, i) => (
              <Link key={i} to={l.to} style={{ display: "flex", alignItems: "center", gap: ".65rem", padding: ".6rem .75rem", borderRadius: 10, textDecoration: "none", color: C.tx, fontSize: ".82rem", fontWeight: 600, transition: "background .15s", marginBottom: i < 2 ? ".3rem" : 0 }}
                onMouseEnter={e => e.currentTarget.style.background = C.sky}
                onMouseLeave={e => e.currentTarget.style.background = "transparent"}
              >
                <span style={{ fontSize: "1rem" }}>{l.icon}</span> {l.label}
                <span style={{ marginLeft: "auto", color: C.txL }}>→</span>
              </Link>
            ))}
          </div>
        </div>

        {/* ── RIGHT ── */}
        <div>
          {/* Tab nav */}
          <div style={{ display: "flex", gap: ".5rem", marginBottom: "1.1rem", flexWrap: "wrap" }}>
            {tabs.map(t => (
              <button key={t} className={`pro-tab ${activeTab === t ? "active" : ""}`} onClick={() => setActiveTab(t)}>
                {tabLabel[t]}
              </button>
            ))}
          </div>

          {/* ── TAB: Info ── */}
          {activeTab === "info" && (
            <div className="pro-card" style={{ padding: "1.75rem" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.5rem" }}>
                <h3 style={{ fontWeight: 700, fontSize: ".95rem", color: C.blueDkr }}>Informasi Pribadi</h3>
                {!editMode ? (
                  <button onClick={() => { setDraft(profile); setEditMode(true); }} style={{ display: "flex", alignItems: "center", gap: ".4rem", background: C.sky, color: C.blue, border: `1.5px solid ${C.blueLtr}`, padding: ".45rem 1rem", borderRadius: 10, fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 700, fontSize: ".8rem", cursor: "pointer" }}>
                    ✏️ Edit Profil
                  </button>
                ) : (
                  <div style={{ display: "flex", gap: ".5rem" }}>
                    <button onClick={() => setEditMode(false)} style={{ padding: ".45rem 1rem", borderRadius: 10, border: `1.5px solid ${C.blueLtr}`, background: "transparent", color: C.blue, fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 600, fontSize: ".8rem", cursor: "pointer" }}>Batal</button>
                    <button onClick={handleSave} style={{ padding: ".45rem 1rem", borderRadius: 10, border: "none", background: `linear-gradient(135deg, ${C.blueDk}, ${C.blue})`, color: "#fff", fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 700, fontSize: ".8rem", cursor: "pointer" }}>💾 Simpan</button>
                  </div>
                )}
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1rem" }}>
                {[
                  { label: "Nama Lengkap", key: "nama", type: "text", icon: "👤" },
                  { label: "NIS / ID Siswa", key: "nis", type: "text", icon: "🪪" },
                  { label: "Kelas", key: "kelas", type: "text", icon: "🏫" },
                  { label: "Jurusan", key: "jurusan", type: "text", icon: "📚" },
                  { label: "Email", key: "email", type: "email", icon: "✉️" },
                  { label: "No. HP", key: "noHp", type: "tel", icon: "📱" },
                ].map(f => (
                  <div key={f.key}>
                    <label style={{ fontSize: ".75rem", fontWeight: 700, color: C.txM, display: "flex", alignItems: "center", gap: ".35rem", marginBottom: ".4rem" }}>
                      <span>{f.icon}</span> {f.label}
                    </label>
                    <input type={f.type} className="form-input" value={editMode ? draft[f.key] : profile[f.key]} disabled={!editMode} onChange={e => setDraft({ ...draft, [f.key]: e.target.value })} />
                  </div>
                ))}
              </div>
              <div style={{ marginBottom: "1rem" }}>
                <label style={{ fontSize: ".75rem", fontWeight: 700, color: C.txM, display: "flex", alignItems: "center", gap: ".35rem", marginBottom: ".4rem" }}>📍 Alamat</label>
                <input type="text" className="form-input" value={editMode ? draft.alamat : profile.alamat} disabled={!editMode} onChange={e => setDraft({ ...draft, alamat: e.target.value })} />
              </div>
              <div>
                <label style={{ fontSize: ".75rem", fontWeight: 700, color: C.txM, display: "flex", alignItems: "center", gap: ".35rem", marginBottom: ".4rem" }}>📝 Bio</label>
                <textarea className="form-input" rows={3} value={editMode ? draft.bio : profile.bio} disabled={!editMode} onChange={e => setDraft({ ...draft, bio: e.target.value })} style={{ resize: "vertical" }} />
              </div>
              {!editMode && (
                <div style={{ marginTop: "1.25rem", padding: ".9rem 1.1rem", background: C.sky, borderRadius: 12, border: `1px dashed ${C.blueLtr}`, display: "flex", gap: ".65rem", alignItems: "center" }}>
                  <span style={{ fontSize: "1.2rem" }}>🔒</span>
                  <div>
                    <p style={{ fontSize: ".78rem", fontWeight: 700, color: C.blue }}>Data Terproteksi</p>
                    <p style={{ fontSize: ".72rem", color: C.txM, marginTop: ".1rem" }}>Data profilmu tersimpan aman dan hanya bisa dilihat admin sekolah.</p>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ── TAB: Statistik ── */}
          {activeTab === "statistik" && (
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              {/* Area chart Chart.js */}
              <div className="pro-card" style={{ padding: "1.5rem" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.1rem" }}>
                  <div>
                    <h3 style={{ fontWeight: 700, fontSize: ".92rem", color: C.blueDkr, marginBottom: ".15rem" }}>📊 Aktivitas per Bulan</h3>
                    <p style={{ fontSize: ".72rem", color: C.txM }}>Jumlah peminjaman 6 bulan terakhir</p>
                  </div>
                  <span style={{ display: "flex", alignItems: "center", gap: ".4rem", fontSize: ".72rem", color: C.txM }}>
                    <span style={{ width: 10, height: 10, borderRadius: 3, background: C.blue, display: "inline-block" }} /> Peminjaman
                  </span>
                </div>
                <MonthlyAreaChart data={monthlyData} />
              </div>

              {/* Kategori barang */}
              <div className="pro-card" style={{ padding: "1.5rem" }}>
                <h3 style={{ fontWeight: 700, fontSize: ".92rem", color: C.blueDkr, marginBottom: "1.1rem" }}>🗂️ Kategori Barang Dipinjam</h3>
                {[
                  { kat: "Elektronik", jml: 10, color: C.blue, persen: 42 },
                  { kat: "Mikrokontroler", jml: 8, color: C.purple, persen: 33 },
                  { kat: "Aksesori", jml: 4, color: C.green, persen: 17 },
                  { kat: "AV / Proyektor", jml: 2, color: C.orange, persen: 8 },
                ].map((k, i) => (
                  <div key={i} style={{ marginBottom: ".85rem" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: ".35rem" }}>
                      <p style={{ fontSize: ".8rem", fontWeight: 600, color: C.tx }}>{k.kat}</p>
                      <p style={{ fontSize: ".78rem", color: C.txM }}>{k.jml}x <span style={{ fontWeight: 700, color: k.color }}>({k.persen}%)</span></p>
                    </div>
                    <div style={{ height: 7, borderRadius: 99, background: C.sky, overflow: "hidden" }}>
                      <div style={{ width: `${k.persen}%`, height: "100%", borderRadius: 99, background: k.color, transition: "width .6s ease" }} />
                    </div>
                  </div>
                ))}
              </div>

              {/* Info kartu */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: ".85rem" }}>
                {[
                  { label: "Rata-rata Durasi Pinjam", val: "4.2 hari", icon: "📅", color: C.blue, bg: C.sky },
                  { label: "Keterlambatan Rata-rata", val: "0.3 hari", icon: "⏰", color: C.orange, bg: C.orangeLt },
                  { label: "Jurusan Favorit", val: "PPLG", icon: "🏫", color: C.purple, bg: C.purpleLt },
                ].map((s, i) => (
                  <div key={i} style={{ background: s.bg, borderRadius: 14, padding: "1rem", textAlign: "center" }}>
                    <p style={{ fontSize: "1.4rem", marginBottom: ".4rem" }}>{s.icon}</p>
                    <p style={{ fontWeight: 800, fontSize: ".95rem", color: s.color }}>{s.val}</p>
                    <p style={{ fontSize: ".67rem", color: C.txM, marginTop: ".2rem", lineHeight: 1.3 }}>{s.label}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── TAB: Tips & Info ── */}
          {activeTab === "tips" && (
            <div style={{ display: "flex", flexDirection: "column", gap: ".85rem" }}>
              {/* Banner */}
              <div style={{ background: `linear-gradient(135deg, ${C.blueDkr}, ${C.blue})`, borderRadius: 20, padding: "1.35rem 1.5rem", display: "flex", alignItems: "center", gap: "1.1rem", position: "relative", overflow: "hidden" }}>
                <div style={{ position: "absolute", top: -20, right: -20, width: 120, height: 120, borderRadius: "50%", background: "rgba(255,255,255,.06)" }} />
                <div style={{ fontSize: "2.2rem", flexShrink: 0 }}>💡</div>
                <div>
                  <p style={{ fontWeight: 800, fontSize: "1rem", color: "#fff", marginBottom: ".25rem" }}>Panduan Peminjaman Barang</p>
                  <p style={{ fontSize: ".78rem", color: "rgba(255,255,255,.7)", lineHeight: 1.5 }}>Baca tips berikut agar proses peminjaman kamu berjalan lancar dan tidak terlambat.</p>
                </div>
              </div>

              {/* Tips grid */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: ".85rem" }}>
                {tips.map((t, i) => (
                  <div key={i} className="tip-card" style={{ background: t.bg, borderColor: t.border }}>
                    <div style={{ display: "flex", alignItems: "center", gap: ".6rem", marginBottom: ".55rem" }}>
                      <div style={{ width: 38, height: 38, borderRadius: 11, background: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.2rem", flexShrink: 0, boxShadow: `0 2px 8px ${t.color}22` }}>
                        {t.icon}
                      </div>
                      <p style={{ fontWeight: 700, fontSize: ".83rem", color: t.color }}>{t.title}</p>
                    </div>
                    <p style={{ fontSize: ".75rem", color: C.txM, lineHeight: 1.55 }}>{t.desc}</p>
                  </div>
                ))}
              </div>

              {/* Kontak admin */}
              <div style={{ background: C.white, borderRadius: 16, border: `1.5px solid ${C.blueLtr}`, padding: "1.1rem 1.25rem", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "1rem", flexWrap: "wrap" }}>
                <div style={{ display: "flex", alignItems: "center", gap: ".75rem" }}>
                  <div style={{ width: 42, height: 42, borderRadius: 12, background: C.sky, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.2rem", flexShrink: 0 }}>📞</div>
                  <div>
                    <p style={{ fontWeight: 700, fontSize: ".83rem", color: C.tx }}>Butuh Bantuan?</p>
                    <p style={{ fontSize: ".73rem", color: C.txM, marginTop: ".1rem" }}>Hubungi admin SIJAR di ruang TU atau melalui kontak berikut.</p>
                  </div>
                </div>
                <div style={{ display: "flex", gap: ".5rem", flexShrink: 0 }}>
                  <a href="mailto:admin@smkn8smg.sch.id" style={{ background: C.sky, color: C.blue, border: `1.5px solid ${C.blueLtr}`, fontSize: ".75rem", fontWeight: 700, padding: ".45rem .9rem", borderRadius: 10, textDecoration: "none", display: "flex", alignItems: "center", gap: ".35rem" }}>
                    ✉️ Email
                  </a>
                  <a href="https://wa.me/6281568386853" target="_blank" rel="noopener noreferrer" style={{ background: "#25D366", color: "#fff", fontSize: ".75rem", fontWeight: 700, padding: ".45rem .9rem", borderRadius: 10, textDecoration: "none", display: "flex", alignItems: "center", gap: ".35rem" }}>
                    💬 WhatsApp
                  </a>
                </div>
              </div>
            </div>
          )}

          {/* ── TAB: Riwayat ── */}
          {activeTab === "riwayat" && (
            <div className="pro-card" style={{ padding: "1.5rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.1rem" }}>
                <h3 style={{ fontWeight: 700, fontSize: ".92rem", color: C.blueDkr }}>📋 Riwayat Terbaru</h3>
                <Link to="/dashboard/riwayat" style={{ fontSize: ".78rem", color: C.blue, fontWeight: 700, textDecoration: "none" }}>Lihat semua →</Link>
              </div>
              {riwayatSingkat.map((r, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: ".8rem", borderRadius: 12, marginBottom: ".5rem", background: C.sky, border: `1px solid ${C.blueLtr}` }}>
                  <div style={{ display: "flex", alignItems: "center", gap: ".7rem" }}>
                    <div style={{ width: 38, height: 38, borderRadius: 10, background: statusStyle[r.status].bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.1rem" }}>{r.emoji}</div>
                    <div>
                      <p style={{ fontWeight: 600, fontSize: ".82rem", color: C.tx }}>{r.nama}</p>
                      <p style={{ fontSize: ".7rem", color: C.txM }}>{r.tgl}</p>
                    </div>
                  </div>
                  <span style={{ fontSize: ".7rem", fontWeight: 700, background: statusStyle[r.status].bg, color: statusStyle[r.status].c, padding: ".22rem .65rem", borderRadius: 999 }}>
                    {statusStyle[r.status].label}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {saved && <div className="toast">✅ Profil berhasil disimpan!</div>}
>>>>>>> 67e6dec (nambah page)
    </DashboardLayout>
  );
}
import { useState } from "react";
import AdminLayout from "./AdminLayout";

export default function AdminSetting() {
  const [form, setForm] = useState({
    namaSekolah: "SMKN 8 Semarang",
    alamat: "Jl. Pandanaran II No.9, Semarang",
    email: "sijar@smkn8semarang.sch.id",
    notifEmail: true,
    notifWA: false,
    maxHariPinjam: 7,
    autoApprove: false,
    poinAwal: 100,
    penguranganTerlambat: 10,
  });
  const [saved, setSaved] = useState(false);
  const [adminList] = useState([
    { nama:"Hendra Setiawan", role:"Super Admin", email:"hendra@smkn8.sch.id", aktif:true },
    { nama:"Sari Wulandari",  role:"Admin TJKT",   email:"sari@smkn8.sch.id",   aktif:true },
    { nama:"Dewi Rahayu",     role:"Admin LK",     email:"dewi@smkn8.sch.id",    aktif:false },
  ]);

  function handleSave(e) {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  }

  const Toggle = ({ checked, onChange }) => (
    <div onClick={onChange}
      style={{ width:42, height:24, borderRadius:99, background: checked ? "var(--blue)" : "var(--blue-ltr)", cursor:"pointer", position:"relative", transition:".25s", flexShrink:0 }}>
      <div style={{ position:"absolute", top:3, left: checked ? 20 : 3, width:18, height:18, borderRadius:"50%", background:"#fff", transition:".25s", boxShadow:"0 1px 4px rgba(0,0,0,.2)" }} />
    </div>
  );

  return (
    <AdminLayout activePage="setting">
      {saved && (
        <div style={{ background:"#EAF7F0", border:"1px solid #3DBD8F", borderRadius:10, padding:".75rem 1.1rem", marginBottom:"1rem", display:"flex", alignItems:"center", gap:".65rem", color:"#2A9D6E", fontSize:".83rem", fontWeight:600 }}>
          ✅ Pengaturan berhasil disimpan!
        </div>
      )}

      <form onSubmit={handleSave}>
        <div className="grid-2" style={{ alignItems:"start" }}>
          {/* Info Sekolah */}
          <div className="card">
            <div className="card-title">🏫 Informasi Sekolah</div>
            <div className="form-group">
              <label className="form-label">Nama Sekolah</label>
              <input className="form-input" value={form.namaSekolah} onChange={e => setForm(f=>({...f,namaSekolah:e.target.value}))} />
            </div>
            <div className="form-group">
              <label className="form-label">Alamat</label>
              <textarea className="form-input" rows={2} value={form.alamat} onChange={e => setForm(f=>({...f,alamat:e.target.value}))} style={{ resize:"none" }} />
            </div>
            <div className="form-group">
              <label className="form-label">Email Resmi</label>
              <input className="form-input" type="email" value={form.email} onChange={e => setForm(f=>({...f,email:e.target.value}))} />
            </div>
          </div>

          {/* Notifikasi */}
          <div className="card">
            <div className="card-title">🔔 Notifikasi</div>
            {[
              ["notifEmail", "Notifikasi Email", "Kirim email saat peminjaman disetujui/ditolak"],
              ["notifWA",    "Notifikasi WhatsApp", "Kirim pesan WA saat ada aktivitas peminjaman"],
              ["autoApprove","Auto Approve", "Setujui peminjaman otomatis tanpa konfirmasi admin"],
            ].map(([key, label, desc]) => (
              <div key={key} style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:".65rem 0", borderBottom:"1px solid var(--sky)" }}>
                <div>
                  <div style={{ fontSize:".82rem", fontWeight:600, color:"var(--tx)", marginBottom:".15rem" }}>{label}</div>
                  <div style={{ fontSize:".72rem", color:"var(--tx-m)" }}>{desc}</div>
                </div>
                <Toggle checked={form[key]} onChange={() => setForm(f=>({...f,[key]:!f[key]}))} />
              </div>
            ))}
          </div>

          {/* Aturan Peminjaman */}
          <div className="card">
            <div className="card-title">📋 Aturan Peminjaman</div>
            <div className="form-group">
              <label className="form-label">Maksimal Hari Peminjaman</label>
              <div style={{ display:"flex", alignItems:"center", gap:".75rem" }}>
                <input type="range" min={1} max={30} value={form.maxHariPinjam}
                  onChange={e => setForm(f=>({...f,maxHariPinjam:+e.target.value}))}
                  style={{ flex:1 }} />
                <span style={{ fontWeight:700, color:"var(--blue-dk)", minWidth:40, fontSize:".9rem" }}>{form.maxHariPinjam}h</span>
              </div>
            </div>
            <div className="form-group">
              <label className="form-label">Poin Awal Siswa Baru</label>
              <input className="form-input" type="number" min={0} max={100} value={form.poinAwal}
                onChange={e => setForm(f=>({...f,poinAwal:+e.target.value}))} />
            </div>
            <div className="form-group">
              <label className="form-label">Pengurangan Poin saat Terlambat</label>
              <input className="form-input" type="number" min={0} max={50} value={form.penguranganTerlambat}
                onChange={e => setForm(f=>({...f,penguranganTerlambat:+e.target.value}))} />
              <div style={{ fontSize:".7rem", color:"var(--tx-m)", marginTop:".3rem" }}>Poin dikurangi setiap keterlambatan pengembalian.</div>
            </div>
          </div>

          {/* Admin accounts */}
          <div className="card">
            <div className="card-title">
              👑 Akun Admin
              <button type="button" className="btn-ghost" style={{ fontSize:".72rem", padding:".3rem .75rem" }}>+ Tambah</button>
            </div>
            {adminList.map((a, i) => (
              <div key={i} style={{ display:"flex", alignItems:"center", gap:".75rem", padding:".6rem 0", borderBottom:"1px solid var(--sky)" }}>
                <div style={{ width:34, height:34, borderRadius:"50%", background:"var(--blue-dkr)", color:"#fff", display:"flex", alignItems:"center", justifyContent:"center", fontWeight:700, fontSize:".72rem", flexShrink:0 }}>
                  {a.nama.split(" ").map(w=>w[0]).join("").slice(0,2)}
                </div>
                <div style={{ flex:1 }}>
                  <div style={{ fontSize:".82rem", fontWeight:600 }}>{a.nama}</div>
                  <div style={{ fontSize:".7rem", color:"var(--tx-m)" }}>{a.email}</div>
                </div>
                <span style={{ fontSize:".68rem", fontWeight:700, padding:".18rem .55rem", borderRadius:99,
                  background: a.aktif ? "#EAF7F0" : "#FEE7E6",
                  color: a.aktif ? "#2A9D6E" : "#C0503E" }}>{a.aktif ? "Aktif" : "Nonaktif"}</span>
                <span style={{ fontSize:".68rem", background:"var(--blue-ltr)", color:"var(--blue-dk)", fontWeight:600, padding:".15rem .5rem", borderRadius:99 }}>{a.role}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ display:"flex", justifyContent:"flex-end", marginTop:".5rem", gap:".65rem" }}>
          <button type="button" className="btn-ghost">Reset ke Default</button>
          <button type="submit" className="btn-primary">💾 Simpan Pengaturan</button>
        </div>
      </form>
    </AdminLayout>
  );
}
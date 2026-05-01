import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import LoginPages from "./pages/LoginPages";
import DashboardHome from "./pages/DashboardHome";
import PeminjamanPage from "./pages/PeminjamanPage";
import RiwayatPage from "./pages/RiwayatPage";
import InventarisPage from "./pages/InventarisPage";
import JurusanPage from "./pages/JurusanPage";
import ProfilePage from "./pages/ProfilePage";
import SettingsPage from "./pages/SettingsPage";
// ADMIN
import AdminDashboard from "./admin/AdminDashboard";
import AdminInventaris from "./admin/AdminInventaris";
import AdminJurusan from "./admin/AdminJurusan";
import AdminLaporan from "./admin/AdminLaporan";
import AdminLayout from "./admin/Adminlayout";
import AdminPeminjaman from "./admin/AdminPeminjaman";
import AdminSetting from "./admin/AdminSetting";
import AdminSiswa from "./admin/AdminSiswa";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Landing page */}
        <Route path="/" element={<LandingPage />} />

        {/* Auth */}
        <Route path="/login" element={<LoginPages />} />

        {/* Dashboard routes */}
        <Route path="/dashboard" element={<DashboardHome />} />
        <Route path="/dashboard/peminjaman" element={<PeminjamanPage />} />
        <Route path="/dashboard/riwayat" element={<RiwayatPage />} />
        <Route path="/dashboard/inventaris" element={<InventarisPage />} />
        <Route path="/dashboard/jurusan" element={<JurusanPage />} />
        <Route path="/dashboard/profile" element={<ProfilePage />} />
        <Route path="/dashboard/settings" element={<SettingsPage />} />


        {/* ADMIN ROUTES */}
<Route path="/admin" element={<AdminLayout />}>
  <Route index element={<AdminDashboard />} />
  <Route path="inventaris" element={<AdminInventaris />} />
  <Route path="jurusan" element={<AdminJurusan />} />
  <Route path="laporan" element={<AdminLaporan />} />
  <Route path="peminjaman" element={<AdminPeminjaman />} />
  <Route path="settings" element={<AdminSetting />} />
  <Route path="siswa" element={<AdminSiswa />} />
</Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

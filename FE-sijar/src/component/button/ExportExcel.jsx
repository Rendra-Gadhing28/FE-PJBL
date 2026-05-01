import React, { useState } from 'react';
import { downloadExcel } from '../../services/laporanService';
import iconLoading from '../../assets/loading_gray.json';
import { Player } from '@lottiefiles/react-lottie-player';
import iconExcel from '../../assets/sheets.png';
function ExportExcelButton({ filters, label, className, onSuccess, onError }) {
  const [loading, setLoading] = useState(false);

  const handleExport = async () => {
    setLoading(true);
    try {
      await downloadExcel(filters);
      if (onSuccess) onSuccess('Excel berhasil diunduh');
    } catch (error) {
      console.error('Error:', error);
      if (onError) onError('Gagal mengunduh Excel');
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleExport}
      disabled={loading}
      className={`btn-excel ${className || ''}`}
      style={{
        backgroundColor: '#28a745',
        color: 'white',
        padding: '8px 16px',
        borderRadius: '6px',
        border: 'none',
        cursor: loading ? 'not-allowed' : 'pointer',
        display: 'inline-flex',
        alignItems: 'center',
        gap: '8px',
        opacity: loading ? 0.6 : 1
      }}
    >
      {loading ? (
        <Player
        autoplay
        loop
        src={iconLoading}
        style={{height:'150px', width:'150px'}}
        />
      ) : (
        <>
          <img src={iconExcel} alt="Excel Icon" height={24} width={24} /> {label || 'Export Excel'}
        </>
      )}
    </button>
  );
}

export default ExportExcelButton;
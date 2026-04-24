import React, { useState } from 'react';
import { downloadExcel } from '../../services/laporanService';
import iconLoading from '../../assets/loading_gray.json';
import { Player } from '@lottiefiles/react-lottie-player';
import iconPdf from '../../assets/pdf-logo.png';
function ExportPDFButton({ filters, label, className, onSuccess, onError }) {
  const [loading, setLoading] = useState(false);

  const handleExport = async () => {
    setLoading(true);
    try {
      await downloadExcel(filters);
      if (onSuccess) onSuccess('PDF berhasil diunduh');
    } catch (error) {
      console.error('Error:', error);
      if (onError) onError('Gagal mengunduh PDF');
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleExport}
      disabled={loading}
      className={`btn-pdf ${className || ''}`}
      style={{
        backgroundColor: '#dc3545',
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
          <span>📊</span> {label || 'Export PDF'}
        </>
      )}
    </button>
  );
}

export default ExportPDFButton;
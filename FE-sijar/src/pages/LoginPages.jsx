import { useState } from 'react';
import heroPeminjaman from '../assets/hero_peminjaman.png'
import logoPeminjaman from '../assets/logo.png'
const COLORS = {
  bluePrimary: "#4A90D9",
  blueLight: "#7BB8E8",
  blueLighter: "#D6EAFA",
  blueDark: "#2563A8",
  blueDarker: "#1A3F70",
  sky: "#F0F7FF",
  white: "#FFFFFF",
  textMain: "#1E3A5F",
  textMuted: "#6B8BAD",
  greenSoft: "#3DBD8F",
  yellowSoft: "#F5C842",
};

export default function SijarLogin() {
  const [kodeKelas, setKodeKelas] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [focusedInput, setFocusedInput] = useState('');

  const handleSubmit = () => {
    if(kodeKelas && password) {
      alert(`✅ Login berhasil!\nKode Kelas: ${kodeKelas}`);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: `linear-gradient(135deg, ${COLORS.sky} 0%, ${COLORS.blueLighter} 50%, ${COLORS.white} 100%)`,
      display: 'flex',
      position: 'relative',
      overflow: 'hidden',
      fontFamily: "'Plus Jakarta Sans', sans-serif",
    }}>
      
      {/* Animated Grid Background */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: `
          linear-gradient(${COLORS.blueLighter}40 1px, transparent 1px),
          linear-gradient(90deg, ${COLORS.blueLighter}40 1px, transparent 1px)
        `,
        backgroundSize: '50px 50px',
        opacity: 0.3,
        animation: 'gridMove 20s linear infinite',
      }}/>

      {/* Floating Orbs */}
      {[...Array(8)].map((_, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            width: `${100 + i * 50}px`,
            height: `${100 + i * 50}px`,
            borderRadius: '50%',
            background: `radial-gradient(circle, ${i % 2 === 0 ? COLORS.bluePrimary : COLORS.blueLight}20 0%, transparent 70%)`,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            animation: `float${i} ${15 + i * 2}s ease-in-out infinite`,
            filter: 'blur(40px)',
          }}
        />
      ))}

      <style>{`
        @keyframes gridMove {
          0% { transform: translateY(0); }
          100% { transform: translateY(50px); }
        }
        
        ${[...Array(8)].map((_, i) => `
          @keyframes float${i} {
            0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.3; }
            50% { transform: translate(${30 + i * 10}px, ${-30 - i * 5}px) scale(1.2); opacity: 0.5; }
          }
        `).join('')}
        
        @keyframes slideInLeft {
          from { opacity: 0; transform: translateX(-100px); }
          to { opacity: 1; transform: translateX(0); }
        }
        
        @keyframes slideInRight {
          from { opacity: 0; transform: translateX(100px); }
          to { opacity: 1; transform: translateX(0); }
        }
        
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        
        @keyframes shimmer {
          0% { background-position: -1000px 0; }
          100% { background-position: 1000px 0; }
        }
        
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>


    <div style={{
        display:"flex",
        flex: 1,
        gap: 4,
        justifyContent: "center",
        alignContent:"center",
        alignItems: "center", 
    }}>
      {/* Left Side - Illustration/Info */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '60px',
        position: 'relative',
        zIndex: 1,
        animation: 'slideInLeft 0.8s ease',
      }}>
        
        {/* Decorative Circles */}
        <div style={{
          position: 'absolute',
          top: '15%',
          left: '10%',
          width: '150px',
          height: '150px',
          borderRadius: '50%',
          border: `3px solid ${COLORS.bluePrimary}30`,
          animation: 'spin 20s linear infinite',
        }}/>
        
        <div style={{
          position: 'absolute',
          bottom: '20%',
          right: '15%',
          width: '100px',
          height: '100px',
          borderRadius: '50%',
          background: `linear-gradient(135deg, ${COLORS.yellowSoft}20 0%, transparent 100%)`,
          animation: 'pulse 4s ease-in-out infinite',
        }}/>

        {/* Logo Big */}
        <div style={{
          width: '180px',
          height: '180px',
          background: `linear-gradient(135deg, ${COLORS.bluePrimary} 0%, ${COLORS.blueLight} 100%)`,
          borderRadius: '40px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '90px',
          boxShadow: `0 20px 60px ${COLORS.bluePrimary}50`,
          position: 'relative',
          marginBottom: '40px',
          animation: 'pulse 3s ease-in-out infinite',
        }}>
          <div style={{
            inset: '-10px',
            borderRadius: '45px',
            background: `linear-gradient(135deg, ${COLORS.bluePrimary}30, ${COLORS.blueLight}30)`,
            filter: 'blur(20px)',
            zIndex: -1,
          }}/>
          <img src={logoPeminjaman} alt="" style={{width: 250, objectFit:"cover"}} />
        </div>

        {/* Title */}
        <h1 style={{
          fontSize: '72px',
          fontWeight: '900',
          background: `linear-gradient(135deg, ${COLORS.blueDark} 0%, ${COLORS.bluePrimary} 50%, ${COLORS.blueLight} 100%)`,
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          marginBottom: '1px',
          letterSpacing: '-2px',
          textAlign: 'center',
        }}>
          SIJAR
        </h1>

        <p style={{
          fontSize: '24px',
          color: COLORS.textMain,
          fontWeight: '600',
          marginBottom: '15px',
          textAlign: 'center',
        }}>
          Sistem Inventaris Jurusan
        </p>

        <p style={{
          fontSize: '16px',
          color: COLORS.textMuted,
          textAlign: 'center',
          maxWidth: '400px',
          lineHeight: '1.6',
        }}>
          Platform modern untuk mengelola dan meminjam barang jurusan dengan mudah, cepat, dan efisien
        </p>
      </div>

      {/* Right Side - Login Form */}
      <div style={{
        width: '100%',
        maxWidth: '550px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px',
        position: 'relative',
        zIndex: 1,
      }}>
        
        {/* Login Card */}
        <div style={{
          background: COLORS.white,
          padding: '60px 50px',
          borderRadius: '32px',
          width: '100%',
          boxShadow: '0 30px 80px rgba(74,144,217,0.25)',
          position: 'relative',
          animation: 'slideInRight 0.8s ease',
          border: `1px solid ${COLORS.blueLighter}`,
        }}>
          
          {/* Shimmer Effect */}
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '100%',
            background: `linear-gradient(90deg, transparent 0%, ${COLORS.white} 50%, transparent 100%)`,
            backgroundSize: '200% 100%',
            animation: 'shimmer 3s infinite',
            borderRadius: '32px',
            pointerEvents: 'none',
            opacity: 0.3,
          }}/>

          {/* Top Badge */}
          <div style={{
            position: 'absolute',
            top: '-20px',
            left: '50%',
            transform: 'translateX(-50%)',
            background: `linear-gradient(135deg, ${COLORS.bluePrimary} 0%, ${COLORS.blueLight} 100%)`,
            padding: '10px 30px',
            borderRadius: '25px',
            color: COLORS.white,
            fontSize: '14px',
            fontWeight: '700',
            boxShadow: `0 10px 30px ${COLORS.bluePrimary}40`,
          }}>
            🔐 Login Portal
          </div>

          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: '40px', marginTop: '20px' }}>
            <h2 style={{
              fontSize: '32px',
              fontWeight: '800',
              color: COLORS.textMain,
              marginBottom: '8px',
            }}>
              Selamat Datang!
            </h2>
            <p style={{
              color: COLORS.textMuted,
              fontSize: '15px',
              fontWeight: '500',
            }}>
              Masuk dengan kode kelas Anda
            </p>
          </div>

          {/* Kode Kelas */}
          <div style={{ marginBottom: '24px' }}>
            <label style={{
              display: 'block',
              marginBottom: '12px',
              color: COLORS.textMain,
              fontSize: '15px',
              fontWeight: '700',
              letterSpacing: '0.3px',
            }}>
              Kode Kelas
            </label>
            
            <div style={{ position: 'relative' }}>
              <div style={{
                position: 'absolute',
                left: '20px',
                top: '50%',
                transform: 'translateY(-50%)',
                fontSize: '22px',
                transition: 'all 0.3s ease',
                filter: focusedInput === 'kode' ? 'none' : 'grayscale(1)',
              }}>
                🎓
              </div>
              
              <input
                type="text"
                value={kodeKelas}
                onChange={(e) => setKodeKelas(e.target.value)}
                onFocus={() => setFocusedInput('kode')}
                onBlur={() => setFocusedInput('')}
                placeholder="Contoh: TI447"
                style={{
                  width: '100%',
                  padding: '18px 20px 18px 60px',
                  border: `3px solid ${focusedInput === 'kode' ? COLORS.bluePrimary : COLORS.blueLighter}`,
                  borderRadius: '16px',
                  fontSize: '16px',
                  color: COLORS.textMain,
                  background: focusedInput === 'kode' ? `${COLORS.sky}` : COLORS.white,
                  transition: 'all 0.3s ease',
                  outline: 'none',
                  fontFamily: "'DM Sans', sans-serif",
                  fontWeight: '600',
                  boxShadow: focusedInput === 'kode' ? `0 0 0 4px ${COLORS.bluePrimary}15` : 'none',
                }}
              />
            </div>
          </div>

          {/* Password */}
          <div style={{ marginBottom: '32px' }}>
            <label style={{
              display: 'block',
              marginBottom: '12px',
              color: COLORS.textMain,
              fontSize: '15px',
              fontWeight: '700',
              letterSpacing: '0.3px',
            }}>
              Password
            </label>
            
            <div style={{ position: 'relative' }}>
              <div style={{
                position: 'absolute',
                left: '20px',
                top: '50%',
                transform: 'translateY(-50%)',
                fontSize: '22px',
                transition: 'all 0.3s ease',
                filter: focusedInput === 'password' ? 'none' : 'grayscale(1)',
              }}>
                🔒
              </div>
              
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onFocus={() => setFocusedInput('password')}
                onBlur={() => setFocusedInput('')}
                placeholder="Masukkan password"
                style={{
                  width: '100%',
                  padding: '18px 60px 18px 60px',
                  border: `3px solid ${focusedInput === 'password' ? COLORS.bluePrimary : COLORS.blueLighter}`,
                  borderRadius: '16px',
                  fontSize: '16px',
                  color: COLORS.textMain,
                  background: focusedInput === 'password' ? `${COLORS.sky}` : COLORS.white,
                  transition: 'all 0.3s ease',
                  outline: 'none',
                  fontFamily: "'DM Sans', sans-serif",
                  fontWeight: '600',
                  boxShadow: focusedInput === 'password' ? `0 0 0 4px ${COLORS.bluePrimary}15` : 'none',
                }}
              />
              
              <button
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: 'absolute',
                  right: '20px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '22px',
                  transition: 'all 0.3s ease',
                  opacity: 0.7,
                }}
                onMouseEnter={(e) => e.target.style.opacity = '1'}
                onMouseLeave={(e) => e.target.style.opacity = '0.7'}
              >
                {showPassword ? '🙈' : '👁️'}
              </button>
            </div>
          </div>

          {/* Remember & Forgot */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '28px',
            fontSize: '14px',
          }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
              <input type="checkbox" style={{ width: '18px', height: '18px', cursor: 'pointer' }} />
              <span style={{ color: COLORS.textMuted, fontWeight: '500' }}>Ingat saya</span>
            </label>
            
            <a
              href="#"
              onClick={(e) => { e.preventDefault(); alert('Hubungi admin!'); }}
              style={{
                color: COLORS.bluePrimary,
                textDecoration: 'none',
                fontWeight: '600',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => e.target.style.color = COLORS.blueLight}
              onMouseLeave={(e) => e.target.style.color = COLORS.bluePrimary}
            >
              Lupa Password?
            </a>
          </div>

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            style={{
              width: '100%',
              padding: '20px',
              background: `linear-gradient(135deg, ${COLORS.bluePrimary} 0%, ${COLORS.blueLight} 100%)`,
              border: 'none',
              borderRadius: '16px',
              color: COLORS.white,
              fontSize: '18px',
              fontWeight: '800',
              cursor: 'pointer',
              boxShadow: `0 10px 30px ${COLORS.bluePrimary}50`,
              transition: 'all 0.3s ease',
              position: 'relative',
              overflow: 'hidden',
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = 'translateY(-3px)';
              e.target.style.boxShadow = `0 15px 40px ${COLORS.bluePrimary}60`;
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = `0 10px 30px ${COLORS.bluePrimary}50`;
            }}
          >
            🚀 Masuk Sekarang
          </button>

          {/* Divider */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '15px',
            margin: '30px 0',
          }}>
            <div style={{ flex: 1, height: '2px', background: COLORS.blueLighter }}/>
            <span style={{ color: COLORS.textMuted, fontSize: '13px', fontWeight: '600' }}>ATAU</span>
            <div style={{ flex: 1, height: '2px', background: COLORS.blueLighter }}/>
          </div>

          {/* Register Link */}
          <div style={{ textAlign: 'center' }}>
            <p style={{ color: COLORS.textMuted, fontSize: '15px', fontWeight: '500' }}>
              Belum punya akun?{' '}
              <a
                href="#"
                onClick={(e) => { e.preventDefault(); alert('Hubungi admin untuk registrasi!'); }}
                style={{
                  color: COLORS.bluePrimary,
                  textDecoration: 'none',
                  fontWeight: '700',
                  transition: 'all 0.3s ease',
                }}
                onMouseEnter={(e) => e.target.style.color = COLORS.blueLight}
                onMouseLeave={(e) => e.target.style.color = COLORS.bluePrimary}
              >
                Daftar Sekarang
              </a>
            </p>
          </div>

          {/* Bottom Decoration */}
          <div style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '8px',
            background: `linear-gradient(90deg, ${COLORS.bluePrimary} 0%, ${COLORS.blueLight} 50%, ${COLORS.yellowSoft} 100%)`,
            borderRadius: '0 0 32px 32px',
          }}/>
        </div>
      </div>
      </div>

      {/* Bottom Info */}
      <div style={{
        position: 'absolute',
        bottom: '25px',
        left: '50%',
        transform: 'translateX(-50%)',
        background: COLORS.white,
        padding: '14px 28px',
        borderRadius: '25px',
        boxShadow: '0 8px 25px rgba(74,144,217,0.15)',
        fontSize: '14px',
        color: COLORS.textMuted,
        fontWeight: '600',
        zIndex: 2,
      }}>
        © 2026 SIJAR • Made with ❤️ by XI PPLG 3
      </div>
    </div>
  );
}
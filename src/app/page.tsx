"use client";
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Gamepad2, Shield, LogIn, LogOut, CheckCircle, Smartphone, User, Star, CreditCard } from 'lucide-react';

const games = [
  { id: 1, title: "EA SPORTS FC 26", category: "Sports", image: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=500&q=80", rating: "4.9" },
  { id: 2, title: "EA SPORTS FC 25", category: "Sports", image: "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?w=500&q=80", rating: "4.7" },
  { id: 3, title: "MotoGP 25", category: "Racing", image: "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=500&q=80", rating: "4.8" },
  { id: 4, title: "MotoGP 24", category: "Racing", image: "https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=500&q=80", rating: "4.6" },
  { id: 5, title: "Alan Wake 2", category: "Horror / Action", image: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=500&q=80", rating: "4.9" },
  { id: 6, title: "Hogwarts Legacy", category: "RPG / Fantasy", image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=500&q=80", rating: "4.9" },
];

const plans = [
  { name: "1 Minggu", price: "Rp 40.000", value: "40k", duration: "7 Hari" },
  { name: "1 Bulan", price: "Rp 60.000", value: "60k", duration: "30 Hari", popular: true },
  { name: "2 Bulan", price: "Rp 100.000", value: "100k", duration: "60 Hari" },
  { name: "3 Bulan", price: "Rp 150.000", value: "150k", duration: "90 Hari" },
];

export default function Home() {
  const [user, setUser] = useState<null | { name: string; email: string; role: 'user' | 'admin' }>(null);
  const [showLogin, setShowLogin] = useState(false);
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [checkoutPlan, setCheckoutPlan] = useState<typeof plans[0] | null>(null);

  const handleGoogleLogin = (role: 'user' | 'admin') => {
    setUser({
      name: role === 'admin' ? 'Alex (Admin)' : 'Gamer User',
      email: role === 'admin' ? 'admin@alexcloud.com' : 'user@gmail.com',
      role: role
    });
    setShowLogin(false);
  };

  const handleCheckout = (plan: typeof plans[0]) => {
    if (!user) {
      setShowLogin(true);
      return;
    }
    setCheckoutPlan(plan);
  };

  const sendToWhatsApp = () => {
    const message = `Halo AlexCloud, saya ingin membeli paket Cloud Gaming: *${checkoutPlan?.name} (${checkoutPlan?.price})*. Akun Email saya: ${user?.email}. Saya sudah memindai QRIS Anda.`;
    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/6281234567890?text=${encoded}`, '_blank');
  };

  return (
    <div className="min-h-screen relative text-gray-100 selection:bg-blue-500 selection:text-white">
      {/* Background Glows */}
      <div className="fixed inset-0 -z-10 bg-[#09090b]">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[150px]" />
      </div>

      {/* Navbar */}
      <nav className="sticky top-0 z-40 border-b border-white/10 bg-black/60 backdrop-blur-md px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Gamepad2 className="text-blue-500 h-7 w-7" />
          <span className="text-xl font-bold tracking-wider bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">ALEXCLOUD</span>
        </div>
        <div className="flex items-center gap-4">
          {user ? (
            <>
              {user.role === 'admin' && (
                <button 
                  onClick={() => setIsAdminMode(!isAdminMode)}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all ${isAdminMode ? 'bg-purple-600 text-white' : 'bg-purple-950/40 text-purple-300 border border-purple-500/30'}`}
                >
                  <Shield className="h-3.5 w-3.5" />
                  {isAdminMode ? 'Mode Admin Aktif' : 'Masuk Dashboard Admin'}
                </button>
              )}
              <div className="flex items-center gap-2 text-sm text-gray-300 bg-white/5 px-3 py-1.5 rounded-full border border-white/10">
                <User className="h-4 w-4 text-blue-400" />
                <span>{user.name}</span>
              </div>
              <button onClick={() => { setUser(null); setIsAdminMode(false); }} className="text-gray-400 hover:text-white transition-colors">
                <LogOut className="h-5 w-5" />
              </button>
            </>
          ) : (
            <button onClick={() => setShowLogin(true)} className="bg-blue-600 hover:bg-blue-500 text-white font-medium text-sm px-5 py-2 rounded-full flex items-center gap-2 shadow-lg shadow-blue-500/20 transition-all active:scale-95">
              <LogIn className="h-4 w-4" /> Login Akun
            </button>
          )}
        </div>
      </nav>

      {isAdminMode && user?.role === 'admin' ? (
        /* Admin Section view */
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="glass-panel p-8 rounded-2xl border border-purple-500/20">
            <h2 className="text-2xl font-bold mb-2 flex items-center gap-2 text-purple-400"><Shield /> Admin Control Center (Khusus Alex)</h2>
            <p className="text-gray-400 text-sm mb-6">Database Terkoneksi & Online. Kelola pesanan cloud gaming dan status server di sini.</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                <div className="text-xs text-gray-400 mb-1">Total Pendapatan Langganan</div>
                <div className="text-3xl font-bold text-green-400">Rp 4.250.000</div>
              </div>
              <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                <div className="text-xs text-gray-400 mb-1">User Aktif Main Cloud</div>
                <div className="text-3xl font-bold text-blue-400">42 Players</div>
              </div>
              <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                <div className="text-xs text-gray-400 mb-1">Status Server AlexCloud</div>
                <div className="text-3xl font-bold text-emerald-400">100% ONLINE</div>
              </div>
            </div>
            <div className="mt-8 bg-black/40 rounded-xl p-4 border border-white/5">
              <h3 className="text-sm font-semibold mb-3">Antrean Validasi Pembayaran QRIS Masuk (Simulasi DB)</h3>
              <div className="space-y-2">
                <div className="flex justify-between items-center bg-white/5 p-3 rounded-lg text-xs">
                  <div><span className="font-bold">gamer_pro22@gmail.com</span> membeli Paket 1 Bulan</div>
                  <span className="text-amber-400 font-semibold">Menunggu Konfirmasi WA</span>
                </div>
                <div className="flex justify-between items-center bg-white/5 p-3 rounded-lg text-xs">
                  <div><span className="font-bold">user_wkwk@gmail.com</span> membeli Paket 1 Minggu</div>
                  <span className="text-green-400 font-semibold">Sukses Diverifikasi</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Regular User Homepage */
        <main className="max-w-7xl mx-auto px-6 py-12 space-y-20">
          
          {/* Hero Section */}
          <div className="text-center max-w-3xl mx-auto space-y-6">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <span className="px-4 py-1.5 rounded-full text-xs font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/20 uppercase tracking-widest">Premium Cloud Gaming Platform</span>
              <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mt-4 leading-tight">
                Main Game Spek Dewa <br />Di <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">Hp & Laptop Kentang</span>
              </h1>
              <p className="text-gray-400 text-lg mt-4">
                Nikmati performa cloud server gaming super lancar dengan ratusan game premium tanpa perlu instalasi. Tanpa Ribet, Cukup Klik & Play.
              </p>
            </motion.div>
          </div>

          {/* Catalog Games */}
          <div className="space-y-6">
            <div className="flex justify-between items-end">
              <div>
                <h2 className="text-2xl font-bold">Katalog Game Populer</h2>
                <p className="text-gray-400 text-sm">Mainkan langsung semua game AAA ini di AlexCloud</p>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {games.map((game) => (
                <div key={game.id} className="glass-panel rounded-xl overflow-hidden group hover:border-blue-500/40 transition-all duration-300">
                  <div className="h-40 relative bg-gray-800 overflow-hidden">
                    <img src={game.image} alt={game.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 opacity-80 group-hover:opacity-100" />
                    <span className="absolute top-2 right-2 text-[10px] font-bold px-2 py-0.5 rounded bg-black/70 text-amber-400 flex items-center gap-0.5">
                      <Star className="h-2.5 w-2.5 fill-current" /> {game.rating}
                    </span>
                  </div>
                  <div className="p-3 space-y-1">
                    <div className="text-[10px] text-blue-400 font-medium tracking-wide uppercase">{game.category}</div>
                    <div className="font-semibold text-sm truncate text-white">{game.title}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Pricing Section */}
          <div className="space-y-6">
            <div className="text-center max-w-xl mx-auto mb-10">
              <h2 className="text-3xl font-bold">Pilihan Paket Hemat</h2>
              <p className="text-gray-400 text-sm mt-2">Mulai main sekarang dengan harga terbaik. Proses otomatis pembayaran via QRIS ke WhatsApp Admin Alex.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {plans.map((plan, i) => (
                <div key={i} className={`glass-panel rounded-2xl p-6 relative flex flex-col justify-between transition-all ${plan.popular ? 'border-blue-500/50 shadow-xl shadow-blue-500/5' : 'hover:border-white/20'}`}>
                  {plan.popular && <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-600 text-white font-bold text-[10px] px-3 py-1 rounded-full uppercase tracking-wider">Paling Laris</span>}
                  <div className="space-y-4">
                    <div className="text-gray-400 text-sm">{plan.name}</div>
                    <div className="text-3xl font-extrabold text-white">{plan.price}</div>
                    <div className="text-xs text-blue-400 flex items-center gap-1 bg-blue-500/5 p-2 rounded-lg">
                      <CheckCircle className="h-3.5 w-3.5 shrink-0" /> Durasi Penuh {plan.duration}
                    </div>
                    <ul className="text-xs text-gray-400 space-y-2 pt-2">
                      <li className="flex items-center gap-2">✓ Akses Semua Game Populer</li>
                      <li className="flex items-center gap-2">✓ Server Premium Latency Rendah</li>
                      <li className="flex items-center gap-2">✓ Dukungan Akun Save Cloud Data</li>
                    </ul>
                  </div>
                  <button onClick={() => handleCheckout(plan)} className={`w-full text-center py-2.5 rounded-xl font-semibold text-sm mt-6 transition-all ${plan.popular ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-lg' : 'bg-white/10 hover:bg-white/10 text-white border border-white/10'}`}>
                    Beli Sekarang
                  </button>
                </div>
              ))}
            </div>
          </div>

        </main>
      )}

      {/* Footer */}
      <footer className="border-t border-white/10 bg-black/40 py-8 px-6 text-center text-sm text-gray-500 mt-20">
        <p>© 2026 ALEXCLOUD. All Rights Reserved. Reverse Engineered UI/UX Premium Cloud Platform.</p>
      </footer>

      {/* Login Modal Simulation with Google Option */}
      <AnimatePresence>
        {showLogin && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
            <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} className="glass-panel max-w-sm w-full p-6 rounded-2xl border border-white/10 space-y-6">
              <div className="text-center">
                <h3 className="text-xl font-bold">Masuk ke AlexCloud</h3>
                <p className="text-gray-400 text-xs mt-1">Gunakan Akun Simulasi untuk mencoba fitur transaksi & database premium</p>
              </div>
              <div className="space-y-2">
                <button onClick={() => handleGoogleLogin('user')} className="w-full flex items-center justify-center gap-3 bg-white text-black font-semibold text-sm py-2.5 px-4 rounded-xl hover:bg-gray-100 transition-colors">
                  <svg className="h-4 w-4" viewBox="0 0 24 24"><path fill="#EA4335" d="M12 5.04c1.64 0 3.12.56 4.28 1.67l3.2-3.2C17.52 1.58 14.96 1 12 1 7.35 1 3.4 3.65 1.5 7.5l3.6 2.8C6.01 7.34 8.78 5.04 12 5.04z"/><path fill="#4285F4" d="M23.5 12.25c0-.82-.07-1.6-.2-2.35H12v4.45h6.45c-.28 1.47-1.11 2.72-2.36 3.56l3.66 2.84c2.14-1.97 3.37-4.87 3.37-8.5z"/><path fill="#FBBC05" d="M5.1 14.7c-.25-.75-.4-1.55-.4-2.38s.15-1.63.4-2.38L1.5 7.14C.54 9.07 0 11.23 0 12.5s.54 3.43 1.5 5.36l3.6-2.86z"/><path fill="#34A853" d="M12 23c3.24 0 5.97-1.07 7.96-2.91l-3.66-2.84c-1.01.68-2.31 1.09-4.3 1.09-3.22 0-6-2.3-6.9-5.46L1.5 15.74C3.4 19.59 7.35 23 12 23z"/></svg>
                  Masuk via Google
                </button>
                <button onClick={() => handleGoogleLogin('admin')} className="w-full flex items-center justify-center gap-2 bg-purple-600/30 text-purple-300 border border-purple-500/50 text-xs py-2 rounded-xl hover:bg-purple-600/50 transition-colors">
                  <Shield className="h-3.5 w-3.5" /> Masuk Sebagai Owner (Alex Admin)
                </button>
              </div>
              <button onClick={() => setShowLogin(false)} className="w-full text-center text-xs text-gray-400 hover:text-white transition-colors">Batal</button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Checkout QRIS Modal */}
      <AnimatePresence>
        {checkoutPlan && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
            <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} className="glass-panel max-w-md w-full p-6 rounded-2xl border border-blue-500/30 space-y-4 text-center">
              <div>
                <h3 className="text-xl font-bold text-white flex items-center justify-center gap-2"><CreditCard className="text-blue-400" /> Pembayaran QRIS Otomatis</h3>
                <p className="text-gray-400 text-xs mt-1">Pindai QRIS di bawah ini untuk membeli paket <b>{checkoutPlan.name}</b> seharga <b>{checkoutPlan.price}</b></p>
              </div>
              <div className="bg-white p-3 rounded-xl inline-block mx-auto max-w-[240px] border-4 border-blue-500">
                <img src="https://img1.pixhost.to/images/5339/592942381_rizzhosting.jpg" alt="QRIS AlexCloud" className="w-full h-auto rounded" />
              </div>
              <div className="text-left bg-white/5 p-3 rounded-xl border border-white/5 space-y-1 text-xs">
                <div className="text-gray-400">Detail Invoice Pembelian:</div>
                <div>• Paket: <span className="text-blue-400 font-bold">{checkoutPlan.name}</span></div>
                <div>• Total Tagihan: <span className="text-emerald-400 font-bold">{checkoutPlan.price}</span></div>
                <div>• Email Akun Cloud: <span className="text-white font-medium">{user?.email}</span></div>
              </div>
              <div className="space-y-2 pt-2">
                <button onClick={sendToWhatsApp} className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-2.5 rounded-xl flex items-center justify-center gap-2 text-sm shadow-lg shadow-emerald-600/20 active:scale-95 transition-all">
                  <Smartphone className="h-4 w-4" /> Konfirmasi ke WA & Kirim Bukti Bayar
                </button>
                <button onClick={() => setCheckoutPlan(null)} className="w-full text-center text-xs text-gray-400 hover:text-white transition-colors py-1">Kembali</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

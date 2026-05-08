/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useMemo, useEffect } from 'react';
import { 
  Search, 
  Calendar, 
  Download, 
  Phone, 
  MessageCircle, 
  Stethoscope, 
  Instagram, 
  Youtube, 
  UserRound,
  AlertCircle,
  Clock,
  ExternalLink
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { DOCTORS_DATA, Doctor, Status } from './constants';

const StatusBadge = ({ status }: { status: Status }) => {
  const styles = {
    available: "bg-emerald-50 text-emerald-700 border-emerald-100",
    booking: "bg-amber-50 text-amber-700 border-amber-100",
    full: "bg-rose-50 text-rose-700 border-rose-100"
  };

  const labels = {
    available: "✅ Praktik",
    booking: "⏳ Daring",
    full: "❌ Tutup"
  };

  return (
    <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold border ${styles[status]}`}>
      {labels[status]}
    </span>
  );
};

export default function App() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState<'all' | Doctor['category']>('all');
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const filteredDoctors = useMemo(() => {
    return DOCTORS_DATA.filter(doc => {
      const matchesSearch = doc.name.toLowerCase().includes(search.toLowerCase()) || 
                           doc.specialty.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = category === 'all' || doc.category === category;
      return matchesSearch && matchesCategory;
    });
  }, [search, category]);

  const categories = [
    { id: 'all', label: 'Semua', icon: <Stethoscope size={18} /> },
    { id: 'umum', label: 'Umum/BPJS', icon: <UserRound size={18} /> },
    { id: 'syaraf', label: 'Syaraf', icon: <AlertCircle size={18} /> },
    { id: 'dalam', label: 'Penyakit Dalam', icon: <AlertCircle size={18} /> },
    { id: 'gigi', label: 'Gigi', icon: <AlertCircle size={18} /> },
    { id: 'tht', label: 'THT', icon: <AlertCircle size={18} /> },
    { id: 'kia', label: 'KIA/Bidan', icon: <UserRound size={18} /> },
    { id: 'ugd', label: 'UGD', icon: <Clock size={18} /> },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className={`glass-header transition-all duration-300 ${isScrolled ? 'py-3' : 'py-5'}`}>
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-brand-primary rounded-xl flex items-center justify-center text-white shadow-lg shadow-brand-primary/20">
              <Stethoscope size={28} />
            </div>
            <div>
              <h1 className="font-display text-xl font-bold tracking-tight text-slate-800 leading-tight">
                Klinik Sartika
              </h1>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest">
                Professional Care
              </p>
            </div>
          </div>

          <div className="relative w-full max-w-md group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-brand-primary transition-colors" size={20} />
            <input 
              type="text"
              placeholder="Cari dokter atau spesialis..."
              className="w-full pl-12 pr-4 py-3 bg-slate-100 border-none rounded-2xl text-slate-700 placeholder:text-slate-400 focus:ring-2 focus:ring-brand-primary/20 focus:bg-white transition-all ring-1 ring-slate-200/50"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <a 
            href="#" 
            className="hidden lg:flex items-center gap-2 px-5 py-2.5 bg-brand-primary text-white rounded-xl font-semibold text-sm hover:bg-brand-primary/90 transition-colors shadow-lg shadow-brand-primary/20"
          >
            <Download size={18} />
            Instal Aplikasi
          </a>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow max-w-7xl mx-auto px-4 py-8 w-full">
        <div className="mb-10">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center text-center mb-8"
          >
            <h2 className="font-display text-3xl md:text-4xl font-bold text-slate-800 mb-2">
              Jadwal Praktik Dokter
            </h2>
            <div className="h-1.5 w-20 bg-brand-primary rounded-full mb-4" />
            <p className="text-slate-500 max-w-lg">
              Informasi terupdate jadwal dokter kami. Selalu siap melayani kesehatan Anda dan keluarga dengan sepenuh hati.
            </p>
          </motion.div>

          {/* Filter Bank */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-10 pb-4">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setCategory(cat.id as any)}
                className={`flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 border ${
                  category === cat.id 
                  ? 'bg-brand-primary text-white border-brand-primary shadow-lg shadow-brand-primary/30' 
                  : 'bg-white text-slate-600 border-slate-200 hover:border-brand-primary hover:text-brand-primary'
                }`}
              >
                {cat.icon}
                {cat.label}
              </button>
            ))}
          </div>

          {/* Doctor Grid */}
          <motion.div 
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            <AnimatePresence mode="popLayout">
              {filteredDoctors.map((doc, index) => (
                <motion.div
                  key={doc.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="doctor-card flex flex-col"
                >
                  <div className="flex items-start justify-between mb-6">
                    <div className="w-16 h-16 bg-slate-50 border border-slate-100 rounded-2xl flex items-center justify-center text-3xl shadow-inner">
                      {doc.avatarEmoji}
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] font-bold text-brand-primary uppercase tracking-widest mb-1">
                        {doc.category}
                      </p>
                      <div className="p-1 bg-brand-primary/5 rounded-lg inline-block">
                        <Calendar size={14} className="text-brand-primary" />
                      </div>
                    </div>
                  </div>

                  <div className="mb-6 flex-grow">
                    <h3 className="font-display text-lg font-bold text-slate-800 mb-1 leading-snug">
                      {doc.name}
                    </h3>
                    <p className="text-sm text-slate-500 font-medium">{doc.specialty}</p>
                  </div>

                  <div className="space-y-3 bg-slate-50/50 p-4 rounded-xl border border-slate-100">
                    {doc.schedules.map((sched, idx) => (
                      <div key={idx} className="flex flex-col gap-1.5">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-slate-400 uppercase tracking-tighter">
                            {sched.dayRange}
                          </span>
                          <StatusBadge status={sched.status} />
                        </div>
                        <div className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                          <Clock size={14} className="text-slate-400" />
                          {sched.time}
                        </div>
                        {idx < doc.schedules.length - 1 && <div className="h-px bg-slate-200/50 my-1" />}
                      </div>
                    ))}
                  </div>

                  <button className="mt-6 w-full py-3 px-4 bg-slate-100 text-slate-400 rounded-xl text-xs font-bold uppercase tracking-widest cursor-not-allowed border border-slate-200">
                    Tutup pada hari libur
                  </button>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {filteredDoctors.length === 0 && (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center text-slate-400 mb-4">
                <Search size={40} />
              </div>
              <h3 className="font-display text-xl font-bold text-slate-700">Tidak ada jadwal ditemukan</h3>
              <p className="text-slate-500">Coba gunakan kata kunci pencarian atau kategori lain</p>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-white pt-16 pb-8 border-t-4 border-brand-primary">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12 text-center md:text-left">
            <div className="space-y-4">
              <div className="flex items-center gap-3 justify-center md:justify-start">
                <div className="w-10 h-10 bg-brand-primary rounded-lg flex items-center justify-center shadow-lg shadow-brand-primary/20">
                  <Stethoscope size={24} />
                </div>
                <h2 className="font-display text-2xl font-bold tracking-tight">Klinik Sartika</h2>
              </div>
              <p className="text-slate-400 leading-relaxed text-sm">
                Melayani Kesehatan Anda dengan Sepenuh Hati Sejak 2026.
                Jl. Sartika No. 1, Lamongan, Jawa Timur.
              </p>
              <div className="pt-2">
                <audio controls className="w-full max-w-[240px] mx-auto md:mx-0 opacity-60 hover:opacity-100 transition-opacity rounded-lg h-8">
                  <source src="/ngaji.mp3" type="audio/mpeg" />
                  Browser Anda tidak mendukung elemen audio.
                </audio>
              </div>
            </div>

            <div className="space-y-6">
              <h4 className="font-display font-bold text-lg border-b border-white/10 pb-2 inline-block">Hubungi Kami</h4>
              <div className="space-y-4 text-slate-400 text-sm">
                <div className="flex items-center gap-3 justify-center md:justify-start">
                  <Phone size={18} className="text-brand-primary" />
                  <span>(0322) 123-4567</span>
                </div>
                <div className="flex items-center gap-3 justify-center md:justify-start">
                  <MessageCircle size={18} className="text-brand-primary" />
                  <span>+62 857-3059-1047</span>
                </div>
                <div className="flex items-center gap-3 justify-center md:justify-start underline decoration-brand-primary underline-offset-4">
                  <ExternalLink size={18} className="text-brand-primary" />
                  <a href="https://wa.me/6285730591047" target="_blank" rel="noreferrer">Konsultasi WhatsApp</a>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <h4 className="font-display font-bold text-lg border-b border-white/10 pb-2 inline-block">Ikuti Kami</h4>
              <div className="flex items-center gap-4 justify-center md:justify-start">
                {[
                  { icon: <Instagram size={20} />, href: "https://www.instagram.com/kliniksartikalamongan" },
                  { icon: <Youtube size={20} />, href: "https://www.youtube.com/@TanyaDoksartika" },
                  { icon: <MessageCircle size={20} />, href: "https://wa.me/6285730591047" },
                ].map((social, i) => (
                  <a 
                    key={i}
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center hover:bg-brand-primary transition-all duration-300 transform hover:-translate-y-1"
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
              <p className="text-slate-500 text-xs font-semibold uppercase tracking-widest pt-4">
                &copy; 2026 KLINIK SARTIKA | Ngoding_asik
              </p>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating Action Buttons */}
      <div className="fixed bottom-6 right-6 flex flex-col gap-3 z-50">
        <motion.a
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          href="https://sicika.vercel.app"
          target="_blank"
          className="w-14 h-14 bg-indigo-600 text-white rounded-full flex items-center justify-center shadow-xl hover:shadow-indigo-500/40 transition-all border-4 border-white"
        >
          <UserRound size={28} />
        </motion.a>
        
        <motion.a
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          initial={{ y: 0 }}
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          href="https://wa.me/6285730591047"
          target="_blank"
          className="w-14 h-14 bg-emerald-500 text-white rounded-full flex items-center justify-center shadow-xl hover:shadow-emerald-500/40 transition-all border-4 border-white"
        >
          <MessageCircle size={28} />
        </motion.a>
      </div>
    </div>
  );
}


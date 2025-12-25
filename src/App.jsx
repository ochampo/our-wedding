import React, { useState, useEffect } from 'react';
import { Heart, Calendar, GlassWater, ChevronDown, Music, Utensils, MapPin } from 'lucide-react';

const WeddingSite = () => {
  const [guests, setGuests] = useState(["Loading guest list..."]);
  const [status, setStatus] = useState("IDLE");
  
  // PASTE YOUR URL HERE
  const GOOGLE_URL = "https://script.google.com/macros/s/AKfycbwuZswizk1UnCT9_osHPsl8tK_lar3moXAmzY2TN37G466UAXCNX1TRECdE5Fiuw0V0/exec"; 

  useEffect(() => {
    fetch(GOOGLE_URL)
      .then(res => res.json())
      .then(data => setGuests(["Select your name...", ...data]))
      .catch(err => console.error("Error fetching guests:", err));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("SENDING");
    
    const formData = new FormData(e.target);
    const data = {
      name: formData.get('name'),
      attendance: formData.get('attendance'),
      dietary: formData.get('dietary'),
      music: formData.get('music'),
      date: new Date().toLocaleString()
    };

    try {
      await fetch(GOOGLE_URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      setStatus("SUCCESS");
    } catch (error) {
      console.error("Error:", error);
      setStatus("ERROR");
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFCFE] text-slate-800 font-serif">
      {/* Decorative Top Border */}
      <div className="h-3 bg-purple-200 opacity-40" />

      {/* Hero Section (RESTORED) */}
      <header className="h-[80vh] flex flex-col items-center justify-center text-center px-4">
        <p className="text-purple-400 tracking-[0.3em] uppercase text-xs mb-6 font-sans">Celebrating the Union of</p>
        <h1 className="text-6xl md:text-8xl text-purple-900 mb-4 font-light italic">Dan & Lorraine</h1>
        <div className="h-px w-24 bg-purple-200 mx-auto mb-6" />
        <p className="text-lg text-slate-500 tracking-widest uppercase italic font-sans">Mexican Heart • Goan Soul</p>
        <p className="mt-8 font-sans tracking-widest text-sm text-slate-400">OCTOBER 24, 2026 • FREMONT, CA</p>
      </header>

      {/* Info Section (RESTORED CARDS) */}
      <section className="py-20 bg-purple-50/50 px-6 border-y border-purple-100/50">
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
          <div className="bg-white p-10 rounded-2xl shadow-sm text-center border border-purple-100">
            <Calendar className="mx-auto mb-4 text-purple-300" />
            <h3 className="text-2xl mb-2 text-purple-900">The Nuptials</h3>
            <p className="text-slate-600 font-sans text-sm">2:30 PM • Catholic Mass</p>
            <p className="font-bold mt-2 text-purple-800">Mission San José</p>
            <p className="text-xs text-slate-400 mt-1 italic">Fremont, California</p>
          </div>
          <div className="bg-white p-10 rounded-2xl shadow-sm text-center border border-purple-100">
            <GlassWater className="mx-auto mb-4 text-purple-300" />
            <h3 className="text-2xl mb-2 text-purple-900">The Reception</h3>
            <p className="text-slate-600 font-sans text-sm">5:30 PM • Dinner & Dancing</p>
            <p className="font-bold mt-2 text-purple-800">Hacienda de las Flores</p>
            <p className="text-xs text-slate-400 mt-1 italic">Moraga, California</p>
          </div>
        </div>
      </section>

      {/* RSVP Section */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-md mx-auto">
          <h2 className="text-4xl text-center text-purple-900 mb-10 font-light italic">RSVP</h2>
          
          {status === "SUCCESS" ? (
            <div className="text-center p-10 bg-purple-50 rounded-3xl border border-purple-100 animate-in fade-in zoom-in duration-500">
              <Heart className="mx-auto text-purple-400 mb-4 animate-pulse" />
              <p className="text-xl text-purple-900 italic font-serif">Thank you! We've saved your spot.</p>
              <p className="text-sm text-slate-400 mt-2 font-sans uppercase tracking-widest">See you in October!</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* DROPDOWN NAME SELECTION */}
              <div className="border-b border-purple-100 pb-2">
                <label className="text-[10px] uppercase tracking-widest text-purple-400 font-sans mb-1 block">Your Name</label>
                <div className="relative">
                  <select name="name" required className="w-full py-2 bg-transparent outline-none appearance-none cursor-pointer font-sans text-lg">
                    {guests.map((name, i) => (
                      <option key={i} value={i === 0 ? "" : name}>{name}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-0 top-2 text-purple-200 pointer-events-none" size={18} />
                </div>
              </div>

              {/* ATTENDANCE */}
              <div className="border-b border-purple-100 pb-2">
                <label className="text-[10px] uppercase tracking-widest text-purple-400 font-sans mb-1 block">Will you attend?</label>
                <select name="attendance" className="w-full py-2 bg-transparent outline-none font-sans text-lg">
                  <option value="yes">Joyfully Accepts</option>
                  <option value="no">Regretfully Declines</option>
                </select>
              </div>

              {/* DIETARY */}
              <div className="border-b border-purple-100 pb-2">
                <label className="text-[10px] uppercase tracking-widest text-purple-400 font-sans mb-1 block flex items-center gap-2">
                  <Utensils size={12} /> Dietary Restrictions
                </label>
                <input name="dietary" className="w-full py-2 bg-transparent outline-none font-sans text-lg" placeholder="Allergies or preferences" />
              </div>

              {/* MUSIC */}
              <div className="border-b border-purple-100 pb-2">
                <label className="text-[10px] uppercase tracking-widest text-purple-400 font-sans mb-1 block flex items-center gap-2">
                  <Music size={12} /> Song Request
                </label>
                <input name="music" className="w-full py-2 bg-transparent outline-none font-sans text-lg" placeholder="What song gets you dancing?" />
              </div>

              <button type="submit" className="w-full py-4 bg-purple-900 text-white rounded-full font-bold tracking-[0.2em] text-[10px] hover:bg-purple-800 transition-all shadow-xl shadow-purple-100">
                {status === "SENDING" ? "SENDING..." : "CONFIRM RSVP"}
              </button>
            </form>
          )}
        </div>
      </section>

      <footer className="py-20 text-center text-slate-300 text-[10px] tracking-[0.5em] uppercase font-sans">
        #TheDanLorraineUnion
      </footer>
    </div>
  );
};

export default WeddingSite;
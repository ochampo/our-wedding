import React, { useState } from 'react';
import { Heart, MapPin, Calendar, Sparkles, GlassWater } from 'lucide-react';

const WeddingSite = () => {
  const [status, setStatus] = useState("IDLE");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("SENDING");
    
    const formData = new FormData(e.target);
    
    // REPLACE THIS WITH YOUR GOOGLE /EXEC URL
    const GOOGLE_URL = "https://script.google.com/macros/s/AKfycbwuZswizk1UnCT9_osHPsl8tK_lar3moXAmzY2TN37G466UAXCNX1TRECdE5Fiuw0V0/exec";

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
      e.target.reset();
    } catch (error) {
      console.error("Error:", error);
      setStatus("ERROR");
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFCFE] text-slate-800 font-serif">
      <div className="h-3 bg-purple-200 opacity-40" />

      {/* Hero Section */}
      <header className="h-[80vh] flex flex-col items-center justify-center text-center px-4">
        <p className="text-purple-400 tracking-[0.3em] uppercase text-xs mb-6 font-sans">Celebrating the Union of</p>
        <h1 className="text-6xl md:text-8xl text-purple-900 mb-4 font-light">Alex & Jordan</h1>
        <div className="h-px w-24 bg-purple-200 mx-auto mb-6" />
        <p className="text-lg text-slate-500 tracking-widest uppercase italic">Mexican Heart • Goan Soul</p>
        <p className="mt-8 font-sans tracking-widest text-sm">OCTOBER 24, 2026 • FREMONT, CA</p>
      </header>

      {/* Details Section */}
      <section className="py-20 bg-purple-50/50 px-6">
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8 text-center">
          <div className="bg-white p-10 rounded-2xl shadow-sm border border-purple-100">
            <Calendar className="mx-auto mb-4 text-purple-300" />
            <h3 className="text-2xl mb-2 text-purple-900">The Nuptials</h3>
            <p>2:30 PM • Catholic Mass</p>
            <p className="font-bold mt-2">Mission San José</p>
          </div>
          <div className="bg-white p-10 rounded-2xl shadow-sm border border-purple-100">
            <GlassWater className="mx-auto mb-4 text-purple-300" />
            <h3 className="text-2xl mb-2 text-purple-900">The Reception</h3>
            <p>5:30 PM • Dinner & Dancing</p>
            <p className="font-bold mt-2">Hacienda de las Flores</p>
          </div>
        </div>
      </section>

      {/* RSVP Section */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-md mx-auto">
          <h2 className="text-4xl text-center text-purple-900 mb-10 font-light">RSVP</h2>
          
          {status === "SUCCESS" ? (
            <div className="text-center p-8 bg-purple-50 rounded-3xl border border-purple-100 animate-in fade-in zoom-in duration-500">
              <Heart className="mx-auto text-purple-400 mb-4 animate-pulse" />
              <p className="text-xl text-purple-900 italic">Thank you! See you there.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="text-[10px] uppercase tracking-widest text-purple-400 font-sans">Names</label>
                <input name="name" required className="w-full p-4 bg-purple-50/50 rounded-lg outline-none border-b-2 border-transparent focus:border-purple-300 transition-all" placeholder="Guest Names" />
              </div>
              <div>
                <label className="text-[10px] uppercase tracking-widest text-purple-400 font-sans">Attending?</label>
                <select name="attendance" className="w-full p-4 bg-purple-50/50 rounded-lg outline-none">
                  <option value="yes">Joyfully Accepts</option>
                  <option value="no">Regretfully Declines</option>
                </select>
              </div>
              <div>
                <label className="text-[10px] uppercase tracking-widest text-purple-400 font-sans">Dietary & Song Requests</label>
                <textarea name="dietary" rows="3" className="w-full p-4 bg-purple-50/50 rounded-lg outline-none" placeholder="Allergies or song requests" />
              </div>
              <button type="submit" className="w-full py-4 bg-purple-900 text-white rounded-full font-bold tracking-[0.2em] text-xs hover:bg-purple-800 transition-all shadow-lg shadow-purple-200">
                {status === "SENDING" ? "SUBMITTING..." : "CONFIRM RSVP"}
              </button>
            </form>
          )}
        </div>
      </section>

      <footer className="py-10 text-center text-slate-300 text-xs tracking-[0.4em] uppercase">
        #TheAlexJordanUnion
      </footer>
    </div>
  );
};

export default WeddingSite;
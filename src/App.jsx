import React, { useState, useEffect } from 'react';
import { Heart, ChevronDown, Music, Utensils } from 'lucide-react';

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
      music: formData.get('music'), // RESTORED
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
    <div className="min-h-screen bg-[#FDFCFE] text-slate-800 font-serif py-12 px-4">
      <div className="max-w-md mx-auto bg-white rounded-3xl shadow-2xl border border-purple-50 overflow-hidden">
        
        {/* Header Decor */}
        <div className="h-2 bg-purple-200 w-full" />
        
        <div className="p-8">
          <h1 className="text-4xl text-center text-purple-900 mb-2 font-light italic">Dan & Lorraine </h1>
          <p className="text-center text-[10px] tracking-[0.3em] uppercase text-purple-400 mb-8 font-sans">October 24, 2026</p>

          {status === "SUCCESS" ? (
            <div className="text-center py-10 animate-in fade-in zoom-in">
              <Heart className="mx-auto text-purple-400 mb-4 animate-pulse" />
              <p className="text-xl text-purple-900 italic font-serif">We've saved your spot!</p>
              <p className="text-sm text-slate-400 mt-2 font-sans">See you in Fremont.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* 1. NAME DROPDOWN */}
              <div>
                <label className="text-[10px] uppercase tracking-widest text-purple-400 font-sans block mb-2">Your Name</label>
                <div className="relative">
                  <select name="name" required className="w-full p-4 bg-purple-50/50 rounded-xl outline-none appearance-none cursor-pointer border-b-2 border-transparent focus:border-purple-300 transition-all font-sans text-sm">
                    {guests.map((name, i) => (
                      <option key={i} value={i === 0 ? "" : name}>{name}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-4 top-4 text-purple-300 pointer-events-none" size={18} />
                </div>
              </div>

              {/* 2. ATTENDANCE */}
              <div>
                <label className="text-[10px] uppercase tracking-widest text-purple-400 font-sans block mb-2">Will you be there?</label>
                <select name="attendance" className="w-full p-4 bg-purple-50/50 rounded-xl outline-none font-sans text-sm">
                  <option value="yes">Joyfully Accepts</option>
                  <option value="no">Regretfully Declines</option>
                </select>
              </div>

              {/* 3. DIETARY RESTRICTIONS (RESTORED) */}
              <div>
                <label className="text-[10px] uppercase tracking-widest text-purple-400 font-sans block mb-2 flex items-center gap-2">
                  <Utensils size={12} /> Dietary Notes
                </label>
                <input name="dietary" className="w-full p-4 bg-purple-50/50 rounded-xl outline-none font-sans text-sm" placeholder="Allergies? (e.g. No Shellfish)" />
              </div>

              {/* 4. MUSIC REQUESTS (RESTORED) */}
              <div>
                <label className="text-[10px] uppercase tracking-widest text-purple-400 font-sans block mb-2 flex items-center gap-2">
                  <Music size={12} /> Song Request
                </label>
                <input name="music" className="w-full p-4 bg-purple-50/50 rounded-xl outline-none font-sans text-sm" placeholder="What song gets you dancing?" />
              </div>

              <button type="submit" className="w-full py-4 bg-purple-900 text-white rounded-full font-bold tracking-[0.2em] text-[10px] hover:bg-purple-800 transition-all shadow-lg shadow-purple-100">
                {status === "SENDING" ? "SUBMITTING..." : "CONFIRM RSVP"}
              </button>
            </form>
          )}
        </div>
      </div>
      
      <footer className="mt-12 text-center text-slate-300 text-[10px] tracking-[0.5em] uppercase font-sans">
        #TheAlexJordanUnion
      </footer>
    </div>
  );
};

export default WeddingSite;
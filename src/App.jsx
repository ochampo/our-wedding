import React, { useState, useEffect } from 'react';
import { Heart, Calendar, GlassWater, Search, Music, Utensils, Check } from 'lucide-react';

const WeddingSite = () => {
  const [allGuests, setAllGuests] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedName, setSelectedName] = useState("");
  const [status, setStatus] = useState("IDLE");
  
  // PASTE YOUR URL HERE
  const GOOGLE_URL = "https://script.google.com/macros/s/AKfycbwuZswizk1UnCT9_osHPsl8tK_lar3moXAmzY2TN37G466UAXCNX1TRECdE5Fiuw0V0/exec"; 

  useEffect(() => {
    fetch(GOOGLE_URL)
      .then(res => res.json())
      .then(data => setAllGuests(data))
      .catch(err => console.error("Error fetching guests:", err));
  }, []);

  // Filter the list based on what the user types
// This logic is much more flexible with spelling and casing
  const filteredGuests = searchTerm.length > 2 
    ? allGuests.filter(name => {
        const guestName = name.toLowerCase().replace(/\s+/g, ''); // remove all spaces
        const search = searchTerm.toLowerCase().replace(/\s+/g, ''); // remove all spaces
        return guestName.includes(search);
      })
    : [];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("SENDING");
    
    const formData = new FormData(e.target);
    const data = {
      name: selectedName,
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
      setStatus("ERROR");
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFCFE] text-slate-800 font-serif">
      <div className="h-3 bg-purple-200 opacity-40" />

      {/* Hero Section */}
      <header className="h-[70vh] flex flex-col items-center justify-center text-center px-4">
        <p className="text-purple-400 tracking-[0.3em] uppercase text-xs mb-6 font-sans">Celebrating the Union of</p>
        <h1 className="text-6xl md:text-8xl text-purple-900 mb-4 font-light italic">Dan & Lorraine</h1>
        <div className="h-px w-24 bg-purple-200 mx-auto mb-6" />
        <p className="text-lg text-slate-500 tracking-widest uppercase italic font-sans">Mexican Heart • Goan Soul</p>
        <p className="mt-8 font-sans tracking-widest text-sm text-slate-400">OCTOBER 24, 2026 • FREMONT, CA</p>
      </header>

      {/* Info Section */}
      <section className="py-20 bg-purple-50/50 px-6 border-y border-purple-100/50">
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
          <div className="bg-white p-10 rounded-2xl shadow-sm text-center border border-purple-100">
            <Calendar className="mx-auto mb-4 text-purple-300" />
            <h3 className="text-2xl mb-2 text-purple-900 font-light">The Nuptials</h3>
            <p className="text-slate-600 font-sans text-sm">2:30 PM • Catholic Mass</p>
            <p className="font-bold mt-2 text-purple-800">Mission San José</p>
          </div>
          <div className="bg-white p-10 rounded-2xl shadow-sm text-center border border-purple-100">
            <GlassWater className="mx-auto mb-4 text-purple-300" />
            <h3 className="text-2xl mb-2 text-purple-900 font-light">The Reception</h3>
            <p className="text-slate-600 font-sans text-sm">5:30 PM • Dinner & Dancing</p>
            <p className="font-bold mt-2 text-purple-800">Hacienda de las Flores</p>
          </div>
        </div>
      </section>

      {/* RSVP Section */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-md mx-auto">
          <h2 className="text-4xl text-center text-purple-900 mb-10 font-light italic text-6xl">RSVP</h2>
          
          {status === "SUCCESS" ? (
            <div className="text-center p-10 bg-purple-50 rounded-3xl border border-purple-100">
              <Heart className="mx-auto text-purple-400 mb-4 animate-pulse" />
              <p className="text-xl text-purple-900 italic font-serif text-3xl">Thank you, {selectedName.split(' ')[0]}!</p>
              <p className="text-sm text-slate-400 mt-2 font-sans uppercase tracking-widest">Your RSVP is confirmed.</p>
            </div>
          ) : (
            <div className="space-y-8">
              {/* SEARCH BOX */}
              {!selectedName ? (
                <div className="space-y-4">
                  <label className="text-[10px] uppercase tracking-widest text-purple-400 font-sans mb-1 block">Search your name to begin</label>
                  <div className="relative">
                    <input 
                      type="text" 
                      placeholder="Type your full name..."
                      className="w-full py-4 px-12 bg-purple-50 rounded-2xl outline-none font-sans text-lg border border-purple-100 focus:border-purple-300 transition-all"
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <Search className="absolute left-4 top-5 text-purple-300" size={18} />
                  </div>
                  
                  {/* SEARCH RESULTS */}
                  <div className="space-y-2">
                    {filteredGuests.map((name, i) => (
                      <button 
                        key={i}
                        onClick={() => setSelectedName(name)}
                        className="w-full p-4 text-left bg-white border border-purple-100 rounded-xl hover:bg-purple-50 hover:border-purple-300 transition-all font-sans flex items-center justify-between"
                      >
                        {name}
                        <Check size={16} className="text-purple-300" />
                      </button>
                    ))}
                    {searchTerm.length > 2 && filteredGuests.length === 0 && (
                      <p className="text-xs text-slate-400 italic text-center">No matching name found. Please check spelling.</p>
                    )}
                  </div>
                </div>
              ) : (
                /* ACTUAL RSVP FORM (Appears only after name is selected) */
                <form onSubmit={handleSubmit} className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <div className="p-4 bg-purple-50 rounded-2xl border border-purple-100 flex justify-between items-center">
                    <span className="font-bold text-purple-900">{selectedName}</span>
                    <button onClick={() => {setSelectedName(""); setSearchTerm("");}} className="text-[10px] uppercase tracking-widest text-purple-400 underline">Change</button>
                  </div>

                  <div className="border-b border-purple-100 pb-2">
                    <label className="text-[10px] uppercase tracking-widest text-purple-400 font-sans mb-1 block text-2xl">Will you attend?</label>
                    <select name="attendance" className="w-full py-2 bg-transparent outline-none font-sans text-lg">
                      <option value="yes">Joyfully Accepts</option>
                      <option value="no">Regretfully Declines</option>
                    </select>
                  </div>

                  <div className="border-b border-purple-100 pb-2">
                    <label className="text-[10px] uppercase tracking-widest text-purple-400 font-sans mb-1 block flex items-center gap-2 text-2xl">
                      <Utensils size={12} /> Dietary Restrictions
                    </label>
                    <input name="dietary" className="w-full py-2 bg-transparent outline-none font-sans text-lg" placeholder="Allergies or preferences" />
                  </div>

                  <div className="border-b border-purple-100 pb-2">
                    <label className="text-[10px] uppercase tracking-widest text-purple-400 font-sans mb-1 block flex items-center gap-2 text-2xl">
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
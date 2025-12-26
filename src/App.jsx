import React, { useState, useEffect } from 'react';
import { Heart, Calendar, GlassWater, Search, Music, Utensils, Check, AlertCircle, X } from 'lucide-react';

const WeddingSite = () => {
  const [allGuests, setAllGuests] = useState([]);
  const [alreadyRSVPed, setAlreadyRSVPed] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedName, setSelectedName] = useState("");
  const [isDuplicate, setIsDuplicate] = useState(false);
  const [status, setStatus] = useState("IDLE");

  // IMPORTANT: Paste your /exec URL here
  const GOOGLE_URL = "https://script.google.com/macros/s/AKfycbwuZswizk1UnCT9_osHPsl8tK_lar3moXAmzY2TN37G466UAXCNX1TRECdE5Fiuw0V0/exec"; 

  useEffect(() => {
    fetch(GOOGLE_URL)
      .then(res => res.json())
      .then(data => {
        setAllGuests(data.invited || []);
        setAlreadyRSVPed(data.alreadyRSVPed || []);
      })
      .catch(err => console.error("Error fetching data:", err));
  }, []);

  const handleSelectName = (name) => {
    setSelectedName(name);
    // Check if they already RSVPed (Case-insensitive)
    const exists = alreadyRSVPed.some(r => r.toLowerCase().trim() === name.toLowerCase().trim());
    setIsDuplicate(exists);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("SENDING");
    
    const formData = new FormData(e.target);
    const data = {
      name: selectedName,
      attendance: formData.get('attendance'),
      dietary: formData.get('dietary') || "None",
      music: formData.get('music') || "None",
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

  // Filter names for the search box
  const filteredResults = searchTerm.length > 2 
    ? allGuests.filter(name => name.toLowerCase().includes(searchTerm.toLowerCase().trim()))
    : [];

  return (
    <div className="min-h-screen bg-[#FDFCFE] text-slate-800 font-serif">
      <div className="h-3 bg-purple-200 opacity-40" />

      {/* Hero Section */}
      <header className="h-[70vh] flex flex-col items-center justify-center text-center px-4">
        <p className="text-purple-400 tracking-[0.3em] uppercase text-[10px] mb-6 font-sans">Celebrating the Union of</p>
        <h1 className="text-6xl md:text-8xl text-purple-900 mb-4 font-light italic">Dan & Lorraine</h1>
        <div className="h-px w-24 bg-purple-200 mx-auto mb-6" />
        <p className="text-lg text-slate-500 tracking-widest uppercase italic font-sans">Mexican Heart • Goan Soul</p>
        <p className="mt-8 font-sans tracking-widest text-[10px] text-slate-400">OCTOBER 24, 2026 • FREMONT, CA</p>
      </header>

      {/* Details Section */}
      <section className="py-20 bg-purple-50/50 px-6 border-y border-purple-100/50">
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
          <div className="bg-white p-10 rounded-2xl shadow-sm text-center border border-purple-100">
            <Calendar className="mx-auto mb-4 text-purple-300" />
            <h3 className="text-2xl mb-2 text-purple-900 font-light italic">The Nuptials</h3>
            <p className="text-slate-600 font-sans text-sm">2:30 PM • Catholic Mass</p>
            <p className="font-bold mt-2 text-purple-800">Mission San José</p>
          </div>
          <div className="bg-white p-10 rounded-2xl shadow-sm text-center border border-purple-100">
            <GlassWater className="mx-auto mb-4 text-purple-300" />
            <h3 className="text-2xl mb-2 text-purple-900 font-light italic">The Reception</h3>
            <p className="text-slate-600 font-sans text-sm">5:30 PM • Dinner & Dancing</p>
            <p className="font-bold mt-2 text-purple-800">Hacienda de las Flores</p>
          </div>
        </div>
      </section>

      {/* RSVP Section */}
      <section className="py-24 px-6 bg-white overflow-hidden">
        <div className="max-w-md mx-auto">
          <h2 className="text-5xl text-center text-purple-900 mb-12 font-light italic">RSVP</h2>
          
          {status === "SUCCESS" ? (
            <div className="text-center p-12 bg-purple-50 rounded-3xl border border-purple-100 animate-in zoom-in duration-500">
              <Heart className="mx-auto text-purple-400 mb-4 animate-pulse" />
              <p className="text-2xl text-purple-900 italic">See you there, {selectedName.split(' ')[0]}!</p>
              <p className="text-[10px] text-slate-400 mt-4 uppercase tracking-[0.3em]">Confirmation Sent</p>
            </div>
          ) : (
            <div className="min-h-[300px]">
              {/* STEP 1: Search for Name */}
              {!selectedName ? (
                <div className="space-y-6 animate-in fade-in duration-500">
                  <div className="text-center mb-8">
                    <p className="text-slate-500 italic">Please search for your name as it appears on your invitation.</p>
                  </div>
                  <div className="relative">
                    <input 
                      type="text" 
                      placeholder="Type your name..."
                      className="w-full py-4 px-12 bg-purple-50 rounded-2xl outline-none font-sans text-lg border border-purple-100 focus:border-purple-300 transition-all shadow-inner"
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <Search className="absolute left-4 top-5 text-purple-300" size={18} />
                  </div>
                  
                  <div className="space-y-2 max-height-[200px] overflow-y-auto">
                    {filteredResults.map((name, i) => (
                      <button 
                        key={i}
                        onClick={() => handleSelectName(name)}
                        className="w-full p-4 text-left bg-white border border-purple-50 rounded-xl hover:bg-purple-50 hover:border-purple-200 transition-all font-sans flex items-center justify-between group"
                      >
                        <span className="text-slate-700 group-hover:text-purple-900">{name}</span>
                        <Check size={16} className="text-purple-200 group-hover:text-purple-400" />
                      </button>
                    ))}
                    {searchTerm.length > 2 && filteredResults.length === 0 && (
                      <p className="text-xs text-slate-400 italic text-center py-4">We couldn't find that name. Try checking the spelling.</p>
                    )}
                  </div>
                </div>
              ) : isDuplicate ? (
                /* STEP 2A: Already RSVP'ed Message */
                <div className="p-10 bg-amber-50 rounded-3xl border border-amber-100 text-center animate-in zoom-in duration-500">
                  <AlertCircle className="mx-auto text-amber-500 mb-4" size={32} />
                  <h3 className="text-xl font-bold text-amber-900 mb-2 italic">Already RSVP'ed</h3>
                  <p className="text-sm text-amber-800 leading-relaxed">
                    Hi {selectedName.split(' ')[0]}, our records show you've already submitted your response. 
                  </p>
                  <p className="mt-4 text-xs text-amber-600 italic">
                    If you need to make changes, please contact Dan or Lorraine directly.
                  </p>
                  <button 
                    onClick={() => {setSelectedName(""); setSearchTerm("");}} 
                    className="mt-8 flex items-center gap-2 mx-auto text-[10px] uppercase tracking-widest text-amber-700 font-bold hover:opacity-70"
                  >
                    <X size={12} /> Search another name
                  </button>
                </div>
              ) : (
                /* STEP 2B: The RSVP Form */
                <form onSubmit={handleSubmit} className="space-y-8 animate-in slide-in-from-bottom-8 duration-700">
                  <div className="p-4 bg-purple-50 rounded-2xl border border-purple-100 flex justify-between items-center shadow-sm">
                    <div>
                      <p className="text-[10px] uppercase text-purple-400 font-sans tracking-widest">RSVPing for</p>
                      <span className="font-bold text-purple-900 text-lg">{selectedName}</span>
                    </div>
                    <button type="button" onClick={() => setSelectedName("")} className="text-purple-300 hover:text-purple-600"><X size={20}/></button>
                  </div>

                  <div className="border-b border-purple-100 pb-2">
                    <label className="text-[10px] uppercase tracking-widest text-purple-400 font-sans mb-1 block">Attendance</label>
                    <select name="attendance" className="w-full py-2 bg-transparent outline-none font-sans text-lg cursor-pointer">
                      <option value="yes">Joyfully Accepts</option>
                      <option value="no">Regretfully Declines</option>
                    </select>
                  </div>

                  <div className="border-b border-purple-100 pb-2">
                    <label className="text-[10px] uppercase tracking-widest text-purple-400 font-sans mb-1 block flex items-center gap-2">
                      <Utensils size={12} /> Dietary Restrictions
                    </label>
                    <input name="dietary" className="w-full py-2 bg-transparent outline-none font-sans text-lg focus:placeholder-transparent" placeholder="Allergies or preferences" />
                  </div>

                  <div className="border-b border-purple-100 pb-2">
                    <label className="text-[10px] uppercase tracking-widest text-purple-400 font-sans mb-1 block flex items-center gap-2">
                      <Music size={12} /> Song Request
                    </label>
                    <input name="music" className="w-full py-2 bg-transparent outline-none font-sans text-lg focus:placeholder-transparent" placeholder="What song gets you dancing?" />
                  </div>

                  <button type="submit" className="w-full py-5 bg-purple-900 text-white rounded-full font-bold tracking-[0.3em] text-[10px] hover:bg-purple-800 transition-all shadow-xl shadow-purple-200 uppercase">
                    {status === "SENDING" ? "Submitting..." : "Confirm RSVP"}
                  </button>
                </form>
              )}
            </div>
          )}
        </div>
      </section>

      <footer className="py-20 text-center text-slate-300 text-[10px] tracking-[0.6em] uppercase font-sans border-t border-purple-50">
        #TheDanLorraineUnion
      </footer>
    </div>
  );
};

export default WeddingSite;
import React, { useState, useEffect } from 'react';
import { Heart, Calendar, GlassWater, Search, Music, Utensils, Check, AlertCircle, X, BookOpen, MapPin } from 'lucide-react';

const WeddingSite = () => {
  // Navigation State: 'HOME' or 'STORY'
  const [currentPage, setCurrentPage] = useState('HOME');
  
  const [allGuests, setAllGuests] = useState([]);
  const [rsvpMap, setRsvpMap] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedName, setSelectedName] = useState("");
  const [isDuplicate, setIsDuplicate] = useState(false);
  const [status, setStatus] = useState("IDLE");

  const GOOGLE_URL = "https://script.google.com/macros/s/AKfycbwuZswizk1UnCT9_osHPsl8tK_lar3moXAmzY2TN37G466UAXCNX1TRECdE5Fiuw0V0/exec"; 

  useEffect(() => {
    fetch(GOOGLE_URL)
      .then(res => res.json())
      .then(data => {
        setAllGuests(data.invited || []);
        setRsvpMap(data.rsvpMap || {});
      })
      .catch(err => console.error("Fetch error:", err));
  }, []);

  const handleSelectName = (name) => {
    setSelectedName(name);
    const key = name.toLowerCase().trim();
    setIsDuplicate(!!rsvpMap[key]); 
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
        body: JSON.stringify(data),
      });
      setStatus("SUCCESS");
    } catch (error) { setStatus("ERROR"); }
  };

  const filteredResults = searchTerm.length > 2 
    ? allGuests.filter(name => name.toLowerCase().includes(searchTerm.toLowerCase().trim()))
    : [];

  return (
    <div className="min-h-screen bg-[#FDFCFE] text-slate-800 font-serif">
      <div className="h-3 bg-purple-200 opacity-40" />

      {/* NAVIGATION BAR */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-purple-50 px-6 py-4">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <span className="text-purple-900 italic text-xl">D & L</span>
          <div className="flex gap-8 text-[10px] uppercase tracking-[0.2em] font-sans font-bold text-slate-400">
            <button 
              onClick={() => setCurrentPage('HOME')}
              className={currentPage === 'HOME' ? "text-purple-600 border-b border-purple-600 pb-1" : "hover:text-purple-400"}
            >
              The Wedding
            </button>
            <button 
              onClick={() => setCurrentPage('STORY')}
              className={currentPage === 'STORY' ? "text-purple-600 border-b border-purple-600 pb-1" : "hover:text-purple-400"}
            >
              Our Story
            </button>
          </div>
        </div>
      </nav>

      {currentPage === 'HOME' ? (
        /* --- MAIN WEDDING PAGE --- */
        <main className="animate-in fade-in duration-700">
          {/* Hero Section */}
          <header className="h-[60vh] flex flex-col items-center justify-center text-center px-4">
            <p className="text-purple-400 tracking-[0.3em] uppercase text-[10px] mb-6 font-sans font-bold">The Union of</p>
            <h1 className="text-6xl md:text-8xl text-purple-900 mb-4 font-light italic">Dan & Lorraine</h1>
            <div className="h-px w-24 bg-purple-200 mx-auto mb-6" />
            <p className="text-lg text-slate-500 tracking-widest uppercase italic font-sans">Mexican Heart • Goan Soul</p>
            <p className="mt-8 font-sans tracking-widest text-[10px] text-slate-400">OCTOBER 24, 2026 • FREMONT, CA</p>
          </header>

          {/* Details Grid */}
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

          {/* RSVP Section (Hash Map Logic Included) */}
          <section className="py-24 px-6 bg-white">
            <div className="max-w-md mx-auto">
              <h2 className="text-5xl text-center text-purple-900 mb-12 font-light italic">RSVP</h2>
              {status === "SUCCESS" ? (
                <div className="text-center p-12 bg-purple-50 rounded-3xl border border-purple-100">
                  <Heart className="mx-auto text-purple-400 mb-4 animate-pulse" />
                  <p className="text-2xl text-purple-900 italic">See you there, {selectedName.split(' ')[0]}!</p>
                </div>
              ) : (
                <div className="min-h-[300px]">
                  {!selectedName ? (
                    <div className="space-y-6">
                      <div className="relative">
                        <input 
                          type="text" 
                          placeholder="Search your name..."
                          className="w-full py-4 px-12 bg-purple-50 rounded-2xl outline-none font-sans text-lg border border-purple-100 focus:border-purple-300 transition-all"
                          onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <Search className="absolute left-4 top-5 text-purple-300" size={18} />
                      </div>
                      <div className="space-y-2">
                        {filteredResults.map((name, i) => (
                          <button key={i} onClick={() => handleSelectName(name)} className="w-full p-4 text-left bg-white border border-purple-50 rounded-xl hover:bg-purple-50 flex items-center justify-between">
                            <span className="text-slate-700">{name}</span>
                            <Check size={16} className="text-purple-200" />
                          </button>
                        ))}
                      </div>
                    </div>
                  ) : isDuplicate ? (
                    <div className="p-10 bg-amber-50 rounded-3xl border border-amber-100 text-center animate-in zoom-in">
                      <AlertCircle className="mx-auto text-amber-500 mb-4" size={32} />
                      <h3 className="text-xl font-bold text-amber-900 mb-2 italic">Already RSVP'ed</h3>
                      <button onClick={() => setSelectedName("")} className="mt-8 text-[10px] uppercase tracking-widest text-amber-700 font-bold underline">Try another name</button>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-8 animate-in slide-in-from-bottom-8">
                      <div className="p-4 bg-purple-50 rounded-2xl border border-purple-100 flex justify-between items-center">
                        <span className="font-bold text-purple-900 text-lg">{selectedName}</span>
                        <button type="button" onClick={() => setSelectedName("")} className="text-purple-300"><X size={20}/></button>
                      </div>
                      <select name="attendance" className="w-full py-2 bg-transparent border-b border-purple-100 outline-none font-sans text-lg">
                        <option value="yes">Joyfully Accepts</option>
                        <option value="no">Regretfully Declines</option>
                      </select>
                      <input name="dietary" className="w-full py-2 bg-transparent border-b border-purple-100 outline-none font-sans text-lg" placeholder="Dietary Restrictions" />
                      <input name="music" className="w-full py-2 bg-transparent border-b border-purple-100 outline-none font-sans text-lg" placeholder="Song Request" />
                      <button type="submit" className="w-full py-5 bg-purple-900 text-white rounded-full font-bold tracking-[0.3em] text-[10px] hover:bg-purple-800 transition-all shadow-xl shadow-purple-100 uppercase">
                        {status === "SENDING" ? "Submitting..." : "Confirm RSVP"}
                      </button>
                    </form>
                  )}
                </div>
              )}
            </div>
          </section>
        </main>
      ) : (
        /* --- OUR STORY PAGE --- */
        <main className="max-w-2xl mx-auto px-6 py-24 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <BookOpen className="mx-auto text-purple-200 mb-6" size={40} />
          <h2 className="text-5xl text-center text-purple-900 mb-12 font-light italic">Our Story</h2>
          
          <div className="space-y-12 text-slate-600 leading-relaxed text-lg">
            <div className="relative pl-8 border-l-2 border-purple-100">
              <span className="absolute -left-2.5 top-0 w-5 h-5 bg-purple-100 rounded-full border-4 border-white" />
              <h3 className="text-purple-900 font-bold mb-2">The First Hello</h3>
              <p>
                It all began in 2018 at [Your Location]. What started as a simple conversation about [Interest] 
                quickly turned into an evening that neither of us wanted to end.
              </p>
            </div>

            <div className="relative pl-8 border-l-2 border-purple-100">
              <span className="absolute -left-2.5 top-0 w-5 h-5 bg-purple-100 rounded-full border-4 border-white" />
              <h3 className="text-purple-900 font-bold mb-2">Two Worlds, One Heart</h3>
              <p>
                Merging Dan’s Mexican heritage with Lorraine’s Goan roots meant a lot of incredible food, 
                rich traditions, and a shared love for family. We discovered that while our cultures 
                are different, our values are exactly the same.
              </p>
            </div>

            <div className="relative pl-8 border-l-2 border-purple-100">
              <span className="absolute -left-2.5 top-0 w-5 h-5 bg-purple-100 rounded-full border-4 border-white" />
              <h3 className="text-purple-900 font-bold mb-2">The Proposal</h3>
              <p>
                Under the California stars, Dan asked the most important question of his life. 
                Through tears of joy, Lorraine said yes, beginning our greatest adventure yet.
              </p>
            </div>
          </div>
          
          <div className="mt-20 text-center">
            <Heart className="mx-auto text-purple-300 mb-4" />
            <p className="italic text-purple-900 text-xl">We can’t wait to write the next chapter with you.</p>
          </div>
        </main>
      )}

      <footer className="py-20 text-center text-slate-300 text-[10px] tracking-[0.6em] uppercase font-sans">
        #TheDanLorraineUnion
      </footer>
    </div>
  );
};

export default WeddingSite;
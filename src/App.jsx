import React, { useState, useEffect } from 'react';
import { Heart, Calendar, GlassWater, Search, Music, Check, AlertCircle, X, BookOpen, MapPin, Car } from 'lucide-react';

const WeddingSite = () => {
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
      await fetch(GOOGLE_URL, { method: "POST", mode: "no-cors", body: JSON.stringify(data) });
      setStatus("SUCCESS");
    } catch (error) { setStatus("ERROR"); }
  };

  const filteredResults = searchTerm.length > 2 
    ? allGuests.filter(name => name.toLowerCase().includes(searchTerm.toLowerCase().trim()))
    : [];

  // --- PAGES ---
  const renderHome = () => (
    <div className="animate-in fade-in duration-700">
      <header className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
        <p className="text-purple-400 tracking-[0.3em] uppercase text-[10px] mb-6 font-sans font-bold">The Union of</p>
        <h1 className="text-6xl md:text-8xl text-purple-900 mb-4 font-light italic">Lorraine & Daniel</h1>
        <div className="h-px w-24 bg-purple-200 mx-auto mb-6" />
        <p className="text-lg text-slate-500 tracking-widest uppercase italic font-sans">Mexican Heart • Goan Soul</p>
        <p className="mt-8 font-sans tracking-widest text-[10px] text-slate-400">July 3rd, 2026 • FREMONT, CA</p>
      </header>

      <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-6 mb-20 px-6">
        <div className="bg-white p-10 rounded-2xl shadow-sm text-center border border-purple-100">
          <Calendar className="mx-auto mb-4 text-purple-300" />
          <h3 className="text-2xl mb-2 text-purple-900 font-light italic">Holy Spirit Church</h3>
          <p className="text-slate-600 font-sans text-sm">2:00 PM • Catholic Mass</p>
        </div>
        <div className="bg-white p-10 rounded-2xl shadow-sm text-center border border-purple-100">
          <GlassWater className="mx-auto mb-4 text-purple-300" />
          <h3 className="text-2xl mb-2 text-purple-900 font-light italic">The Reception</h3>
          <p className="text-slate-600 font-sans text-sm">5:30 PM • Hacienda de las Flores</p>
        </div>
      </div>

      <section className="py-24 px-6 bg-purple-50/30">
        <div className="max-w-md mx-auto">
          <h2 className="text-5xl text-center text-purple-900 mb-12 font-light italic">RSVP</h2>
          {status === "SUCCESS" ? (
            <div className="text-center p-12 bg-white rounded-3xl border border-purple-100 shadow-sm">
              <Heart className="mx-auto text-purple-400 mb-4 animate-pulse" />
              <p className="text-2xl text-purple-900 italic">See you there!</p>
            </div>
          ) : (
            <div className="min-h-[300px]">
              {!selectedName ? (
                <div className="relative">
                  <input 
                    type="text" 
                    placeholder="Search your name..."
                    className="w-full py-4 px-12 bg-white rounded-2xl outline-none border border-purple-100 focus:border-purple-300 transition-all shadow-sm"
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <Search className="absolute left-4 top-5 text-purple-300" size={18} />
                  <div className="mt-4 space-y-2">
                    {filteredResults.map((name, i) => (
                      <button key={i} onClick={() => handleSelectName(name)} className="w-full p-4 text-left bg-white border border-purple-50 rounded-xl hover:bg-purple-50 flex items-center justify-between shadow-sm">
                        <span className="text-slate-700">{name}</span>
                        <Check size={16} className="text-purple-200" />
                      </button>
                    ))}
                  </div>
                </div>
              ) : isDuplicate ? (
                <div className="p-10 bg-amber-50 rounded-3xl border border-amber-100 text-center">
                  <AlertCircle className="mx-auto text-amber-500 mb-4" />
                  <h3 className="text-xl font-bold text-amber-900 mb-2 italic">Already RSVP'ed</h3>
                  <button onClick={() => setSelectedName("")} className="mt-8 text-[10px] uppercase font-bold underline">Try another name</button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="p-4 bg-white rounded-2xl border border-purple-100 flex justify-between items-center shadow-sm">
                    <span className="font-bold text-purple-900">{selectedName}</span>
                    <button type="button" onClick={() => setSelectedName("")} className="text-purple-300"><X size={20}/></button>
                  </div>
                  <select name="attendance" className="w-full py-2 bg-transparent border-b border-purple-200 outline-none">
                    <option value="yes">Joyfully Accepts</option>
                    <option value="no">Regretfully Declines</option>
                  </select>
                  <input name="dietary" className="w-full py-2 bg-transparent border-b border-purple-200 outline-none" placeholder="Dietary Restrictions" />
                  <button type="submit" className="w-full py-5 bg-purple-900 text-white rounded-full font-bold tracking-[0.3em] text-[10px] uppercase shadow-xl">
                    {status === "SENDING" ? "Submitting..." : "Confirm RSVP"}
                  </button>
                </form>
              )}
            </div>
          )}
        </div>
      </section>
    </div>
  );

  const renderStory = () => (
    <div className="max-w-2xl mx-auto px-6 py-24 animate-in fade-in duration-700">
      <BookOpen className="mx-auto text-purple-200 mb-6" size={40} />
      <h2 className="text-5xl text-center text-purple-900 mb-12 font-light italic">Our Story</h2>
      <p className="text-slate-600 leading-relaxed text-lg text-center">
        Merging Dan’s Mexican heritage with Lorraine’s Goan roots...
      </p>
    </div>
  );

  const renderTravel = () => (
    <div className="max-w-4xl mx-auto px-6 py-24 animate-in fade-in duration-700">
      <MapPin className="mx-auto text-purple-200 mb-6" size={40} />
      <h2 className="text-5xl text-center text-purple-900 mb-12 font-light italic">Travel</h2>
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-3xl border border-purple-100 shadow-sm">
          <Car className="mb-4 text-purple-400" />
          <h3 className="font-bold">Hacienda de las Flores</h3>
          <p className="text-slate-500 text-sm">3300 Moraga Rd, Moraga, CA</p>
        </div>
      </div>
    </div>
  );

  const renderGift = () => (
    <div className="max-w-2xl mx-auto px-6 py-24 text-center animate-in fade-in duration-700">
      <Heart className="mx-auto text-purple-200 mb-6" size={40} />
      <h2 className="text-5xl text-purple-900 mb-12 font-light italic">Gifting</h2>
      <div className="bg-white p-10 rounded-3xl border border-purple-100 shadow-sm inline-block">
        <p className="text-blue-600 font-bold text-xl mb-4">Venmo</p>
        <p className="text-slate-700 mb-6">@Your-Handle</p>
        <div className="w-32 h-32 bg-slate-100 mx-auto rounded-xl flex items-center justify-center mb-6">QR</div>
        <button className="bg-[#008CFF] text-white px-8 py-3 rounded-full text-[10px] font-bold tracking-widest uppercase">Open Venmo</button>
      </div>
    </div>
  );

  const renderContent = () => {
    switch(currentPage) {
      case 'HOME': return renderHome();
      case 'STORY': return renderStory();
      case 'TRAVEL': return renderTravel();
      case 'GIFT': return renderGift();
      default: return renderHome();
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFCFE] flex flex-col md:flex-row font-serif overflow-x-hidden">
      {/* SIDEBAR NAVIGATION */}
      <aside className="w-full md:w-64 bg-white border-b md:border-b-0 md:border-r border-purple-50 md:h-screen sticky top-0 z-50 flex flex-col p-8">
        <div className="mb-12">
          <span className="text-purple-900 italic text-2xl font-light">D & L</span>
          <p className="text-[8px] tracking-[0.3em] uppercase text-slate-400 mt-2">July 03, 2026</p>
        </div>
        
        <nav className="flex md:flex-col gap-6 overflow-x-auto md:overflow-x-visible pb-4 md:pb-0">
          {['HOME', 'STORY', 'TRAVEL', 'GIFT'].map((tab) => (
            <button 
              key={tab}
              onClick={() => setCurrentPage(tab)}
              className={`text-[10px] uppercase tracking-[0.2em] font-sans font-bold text-left whitespace-nowrap transition-all duration-300 ${
                currentPage === tab ? "text-purple-600 translate-x-2" : "text-slate-400 hover:text-purple-300"
              }`}
            >
              {tab === 'HOME' ? 'The Wedding' : tab.charAt(0) + tab.slice(1).toLowerCase()}
            </button>
          ))}
        </nav>

        <div className="mt-auto hidden md:block">
          <p className="text-[10px] text-slate-300 tracking-widest uppercase">#TheDanLorraineUnion</p>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 overflow-y-auto">
        {renderContent()}
        <footer className="md:hidden py-10 text-center text-slate-300 text-[10px] tracking-[0.6em] uppercase">
          #TheDanLorraineUnion
        </footer>
      </main>
    </div>
  );
};

export default WeddingSite;
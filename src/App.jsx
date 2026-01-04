import React, { useState, useEffect } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { Heart, Calendar, GlassWater, Search, Music, Check, AlertCircle, X, BookOpen, MapPin, Car, Gift, HelpCircle, Users, Image as ImageIcon, Menu } from 'lucide-react';

const WeddingSite = () => {
  const [currentPage, setCurrentPage] = useState('HOME');
  const [allGuests, setAllGuests] = useState([]); 
  const [rsvpMap, setRsvpMap] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedParty, setSelectedParty] = useState([]); 
  const [isDuplicate, setIsDuplicate] = useState(false);
  const [status, setStatus] = useState("IDLE");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  const GOOGLE_URL = "https://script.google.com/macros/s/AKfycbwuZswizk1UnCT9_osHPsl8tK_lar3moXAmzY2TN37G466UAXCNX1TRECdE5Fiuw0V0/exec"; 
  // VENMO MODAL STATE
  const [isModalOpen, setIsModalOpen] = useState(false); 
  const venmoUrl = "https://venmo.com/u/ochampo";

  useEffect(() => {
    const targetDate = new Date("July 3, 2026 14:00:00").getTime();
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;
      if (distance < 0) {
        clearInterval(interval);
      } else {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000)
        });
      }
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    fetch(GOOGLE_URL)
      .then(res => res.json())
      .then(data => {
        setAllGuests(data.invited || []);
        setRsvpMap(data.rsvpMap || {});
      })
      .catch(err => console.error("Fetch error:", err));
  }, []);

  const handleSelectName = (guest) => {
    const party = allGuests.filter(g => g.partyId === guest.partyId);
    setSelectedParty(party);
    const key = guest.name.toLowerCase().trim();
    setIsDuplicate(!!rsvpMap[key]); 
    setSearchTerm(""); 
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("SENDING");
    const formData = new FormData(e.target);
    const responses = selectedParty.map((guest, index) => ({
      name: guest.name,
      attendance: formData.get(`attendance-${index}`),
      dietary: formData.get(`dietary-${index}`) || "None",
      music: formData.get('music') || "None",
      date: new Date().toLocaleString()
    }));

    try {
      await fetch(GOOGLE_URL, { 
        method: "POST", 
        mode: "no-cors", 
        body: JSON.stringify({ partyResponse: responses }) 
      });
      setStatus("SUCCESS");
    } catch (error) { setStatus("ERROR"); }
  };

  const filteredResults = searchTerm.length > 2 
    ? allGuests.filter(g => g.name.toLowerCase().includes(searchTerm.toLowerCase().trim())).slice(0, 6) 
    : [];

  const navigateTo = (page) => {
    setCurrentPage(page);
    setIsMenuOpen(false);
    window.scrollTo(0, 0);
  };

  // --- PAGE SECTIONS ---

  const renderHome = () => (
    <main className="animate-in fade-in duration-700">
      <header className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
        <p className="text-purple-400 tracking-[0.3em] uppercase text-[10px] mb-6 font-sans font-bold">The Union of</p>
        <h1 className="text-6xl md:text-8xl text-purple-900 mb-4 font-light italic">Lorraine & Daniel</h1>
        <div className="h-px w-24 bg-purple-200 mx-auto mb-6" />
        <p className="text-lg text-slate-500 tracking-widest uppercase italic font-sans mb-12">Mexican Heart • Goan Soul</p>
        
        <div className="flex gap-4 md:gap-8 mb-12">
          {[{l:'Days',v:timeLeft.days},{l:'Hours',v:timeLeft.hours},{l:'Mins',v:timeLeft.minutes},{l:'Secs',v:timeLeft.seconds}].map((t,i)=>(
            <div key={i} className="text-center w-16 md:w-20">
              <span className="block text-2xl md:text-3xl text-purple-900 font-light italic">{t.v}</span>
              <span className="text-[8px] md:text-[10px] uppercase tracking-widest text-slate-400 font-sans font-bold">{t.l}</span>
            </div>
          ))}
        </div>
        <p className="font-sans tracking-widest text-[10px] text-slate-400 uppercase">July 3rd, 2026 • FREMONT, CA</p>
      </header>
      
      <section className="py-20 bg-purple-50/50 px-6 border-y border-purple-100/50">
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
          <div className="bg-white p-10 rounded-2xl shadow-sm text-center border border-purple-100">
            <Calendar className="mx-auto mb-4 text-purple-300" />
            <h3 className="text-2xl mb-2 text-purple-900 font-light italic">The Ceremony</h3>
            <p className="text-slate-600 font-sans text-sm">2:00 PM • Catholic Mass</p>
            <p className="font-bold mt-2 text-purple-800">Holy Spirit Church</p>
            <p className="text-slate-500 text-sm mt-1">41139 Fremont Blvd, Fremont, CA 94538</p>
          </div>
          <div className="bg-white p-10 rounded-2xl shadow-sm text-center border border-purple-100">
            <GlassWater className="mx-auto mb-4 text-purple-300" />
            <h3 className="text-2xl mb-2 text-purple-900 font-light italic">The Reception</h3>
            <p className="text-slate-600 font-sans text-sm">5:30 PM • Dinner & Dancing</p>
            <p className="font-bold mt-2 text-purple-800">Pavilion Room at The Bridges Golf Club</p>
            <p className="text-slate-500 text-sm mt-1">9000 S Gale Ridge Rd, San Ramon</p>
          </div>
        </div>
      </section>
    </main>
  );

  const renderRSVP = () => (
    <main className="py-24 px-6 animate-in fade-in duration-700">
      <Heart className="mx-auto text-purple-200 mb-6" size={40} />
      <h2 className="text-5xl text-center text-purple-900 mb-12 font-light italic">RSVP</h2>
      <div className="max-w-xl mx-auto">
        {status === "SUCCESS" ? (
          <div className="text-center p-12 bg-purple-50 rounded-3xl border border-purple-100 text-2xl text-purple-900 italic font-light">Thank you! We can't wait to see you there!</div>
        ) : (
          <div className="min-h-[300px]">
            {selectedParty.length === 0 ? (
              <div className="space-y-6">
                <div className="relative">
                  <input type="text" placeholder="Search your name..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full py-4 px-12 bg-purple-50 rounded-2xl outline-none border border-purple-100 focus:border-purple-300 transition-all text-lg font-sans" />
                  <Search className="absolute left-4 top-5 text-purple-300" size={18} />
                </div>
                <div className="space-y-2">
                  {filteredResults.map((guest, i) => (
                    <button key={i} onClick={() => handleSelectName(guest)} className="w-full p-4 text-left bg-white border border-purple-50 rounded-xl hover:bg-purple-50 flex items-center justify-between"><span className="text-slate-700 font-medium">{guest.name}</span><Check size={16} className="text-purple-200" /></button>
                  ))}
                </div>
              </div>
            ) : isDuplicate ? (
              <div className="p-10 bg-amber-50 rounded-3xl text-center border border-amber-100">
                <AlertCircle className="mx-auto text-amber-500 mb-4" size={32} />
                <h3 className="text-xl font-bold text-amber-900 italic">Already RSVP'ed</h3>
                <button onClick={() => setSelectedParty([])} className="mt-8 text-[10px] uppercase tracking-widest underline font-bold text-amber-700">Try another name</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="flex justify-between items-center border-b border-purple-100 pb-4">
                    <div className="flex items-center gap-2"><Users className="text-purple-400" size={20} /><span className="text-slate-500 text-[10px] uppercase tracking-[0.2em] font-sans font-bold">Party RSVP</span></div>
                    <button type="button" onClick={() => setSelectedParty([])} className="text-purple-300"><X size={20}/></button>
                </div>
                {selectedParty.map((member, idx) => (
                  <div key={idx} className="p-6 bg-purple-50 rounded-2xl border border-purple-100 space-y-4">
                    <p className="font-bold text-purple-900 font-serif italic text-lg">{member.name}</p>
                    <select name={`attendance-${idx}`} className="w-full py-2 bg-transparent border-b border-purple-200 outline-none font-sans"><option value="yes">Joyfully Accepts</option><option value="no">Regretfully Declines</option></select>
                    <input name={`dietary-${idx}`} className="w-full py-2 bg-transparent border-b border-purple-200 outline-none font-sans text-sm" placeholder="Dietary Restrictions" />
                  </div>
                ))}
                <input name="music" className="w-full py-3 bg-white px-4 rounded-xl border border-purple-100 outline-none font-sans" placeholder="Song Request for the Dance Floor" />
                <button type="submit" className="w-full py-5 bg-purple-900 text-white rounded-full font-bold tracking-[0.3em] text-[10px] uppercase shadow-xl hover:bg-purple-800 transition-all">{status === "SENDING" ? "Submitting..." : "Confirm Party RSVP"}</button>
              </form>
            )}
          </div>
        )}
      </div>
    </main>
  );

  const renderStory = () => (
    <main className="max-w-2xl mx-auto px-6 py-24 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <BookOpen className="mx-auto text-purple-200 mb-6" size={40} />
      <h2 className="text-5xl text-center text-purple-900 mb-12 font-light italic">Our Story</h2>
      <div className="space-y-12 text-slate-600 leading-relaxed text-lg">
        <div className="relative pl-8 border-l-2 border-purple-100">
          <span className="absolute -left-2.5 top-0 w-5 h-5 bg-purple-100 rounded-full border-4 border-white" />
          <h3 className="text-purple-900 font-bold mb-2 uppercase text-xs tracking-widest font-sans">The First Hello</h3>
          <p>It all began in 2018. What started as a simple conversation quickly turned into an evening that neither of us wanted to end.</p>
        </div>
        <div className="relative pl-8 border-l-2 border-purple-100">
          <span className="absolute -left-2.5 top-0 w-5 h-5 bg-purple-100 rounded-full border-4 border-white" />
          <h3 className="text-purple-900 font-bold mb-2 uppercase text-xs tracking-widest font-sans">Two Worlds, One Heart</h3>
          <p>Merging Dan’s Mexican heritage with Lorraine’s Goan roots meant a lot of incredible food, rich traditions, and a shared love for family. We discovered that our values are exactly the same.</p>
        </div>
        <div className="relative pl-8 border-l-2 border-purple-100">
          <span className="absolute -left-2.5 top-0 w-5 h-5 bg-purple-100 rounded-full border-4 border-white" />
          <h3 className="text-purple-900 font-bold mb-2 uppercase text-xs tracking-widest font-sans">The Proposal</h3>
          <p>Under the California stars, Dan asked the most important question of his life. Through tears of joy, Lorraine said yes, beginning our greatest adventure yet.</p>
        </div>
      </div>
    </main>
  );

  const renderTravel = () => (
    <main className="max-w-4xl mx-auto px-6 py-24 animate-in fade-in duration-700">
      <MapPin className="mx-auto text-purple-200 mb-6" size={40} />
      <h2 className="text-5xl text-center text-purple-900 mb-12 font-light italic">Travel & Stay</h2>
      <div className="grid md:grid-cols-2 gap-8 text-center">
        <div className="bg-purple-50 p-10 rounded-2xl border border-purple-100">
          <Car className="mx-auto mb-4 text-purple-300" />
          <h3 className="text-2xl mb-2 text-purple-900 italic">The Venue</h3>
          <p className="text-slate-600">Hacienda de las Flores<br/>3300 Moraga Rd, Moraga, CA</p>
        </div>
        <div className="bg-purple-50 p-10 rounded-2xl border border-purple-100">
          <Calendar className="mx-auto mb-4 text-purple-300" />
          <h3 className="text-2xl mb-2 text-purple-900 italic">Stay</h3>
          <p className="text-slate-600">Hyatt Regency Fremont<br/>Mention "D&L Wedding" for group rates.</p>
        </div>
      </div>
    </main>
  );

  const renderGallery = () => (
    <main className="max-w-5xl mx-auto px-6 py-24 animate-in fade-in duration-700">
      <ImageIcon className="mx-auto text-purple-200 mb-6" size={40} />
      <h2 className="text-5xl text-center text-purple-900 mb-12 font-light italic">Gallery</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {[1,2,3,4,5,6].map(i => <div key={i} className="aspect-[4/5] bg-purple-50 rounded-xl flex items-center justify-center text-purple-200 italic text-xs border border-purple-100 shadow-sm transition-transform hover:scale-[1.02]">Engagement Photo {i}</div>)}
      </div>
    </main>
  );
  const renderGift = () => (
  <main className="max-w-4xl mx-auto px-6 py-24 animate-in fade-in duration-700">
    <Gift className="mx-auto text-purple-200 mb-6" size={40} />
    <h2 className="text-5xl text-center text-blue-300 mb-12 font-light italic">Venmo</h2>   
    <p className="text-center text-slate-600 text-lg mb-12 max-w-2xl mx-auto leading-relaxed">
      Your presence is the greatest gift. If you wish to honor us with a gift, 
      we have set up honeymoon funds for both of us.
    </p>
    
    {/* GRID CONTAINER: 1 column on mobile, 2 columns on medium screens+ */}
    <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
      
      {/* ACCOUNT 1: Lorraine */}
      <div className="bg-white p-8 rounded-3xl border border-purple-100 shadow-sm text-center flex flex-col items-center">        
        <span className="text-purple-400 text-[10px] uppercase tracking-widest font-bold mb-2">Daniel's Fund</span>
        <p className="text-slate-500 text-sm mb-6 font-medium italic">@ochampo</p>
        
        <div className="p-4 bg-slate-50 rounded-2xl mb-6 border border-slate-100 shadow-inner">
          <QRCodeSVG 
            value="https://venmo.com/u/ochampo"
            size={140}
            fgColor="#008CFF"
            level="H"
          />
        </div>

        <a 
          href="https://venmo.com/u/ochampo" 
          target="_blank" 
          rel="noreferrer" 
          className="w-full"
        >
          <button className="w-full py-4 bg-[#008CFF] text-white rounded-full font-bold tracking-widest text-[10px] uppercase hover:bg-[#0074d6] transition-all shadow-md active:scale-95">
            Venmo Daniel
          </button>
        </a>
      </div>

      {/* ACCOUNT 2: Lorraine */}
      <div className="bg-white p-8 rounded-3xl border border-purple-100 shadow-sm text-center flex flex-col items-center">        
        <span className="text-purple-400 text-[10px] uppercase tracking-widest font-bold mb-2">Lorraine's Fund</span>
        <p className="text-slate-500 text-sm mb-6 font-medium italic">@lorrainegoveas</p>
        
        <div className="p-4 bg-slate-50 rounded-2xl mb-6 border border-slate-100 shadow-inner">
          <QRCodeSVG 
            value="https://venmo.com/u/lorrainegoveas" // REPLACE WITH ACTUAL HANDLE
            size={140}
            fgColor="#008CFF"
            level="H"
          />
        </div>

        <a 
          href="https://venmo.com/u/lorrainegoveas" // REPLACE WITH ACTUAL HANDLE
          target="_blank" 
          rel="noreferrer" 
          className="w-full"
        >
          <button className="w-full py-4 bg-[#008CFF] text-white rounded-full font-bold tracking-widest text-[10px] uppercase hover:bg-[#0074d6] transition-all shadow-md active:scale-95">
            Venmo Lorraine
          </button>
        </a>
      </div>

    </div>

    <p className="mt-12 text-center text-slate-400 text-[10px] uppercase tracking-[0.2em]">
      Thank you for your generosity
    </p>
  </main>
);
 
  const renderQA = () => (
    <main className="max-w-3xl mx-auto px-6 py-24 animate-in fade-in duration-700">
      <HelpCircle className="mx-auto text-purple-200 mb-6" size={40} />
      <h2 className="text-5xl text-center text-purple-900 mb-12 font-light italic">Q & A</h2>
      <div className="space-y-6">
        {[
          { q: "What is the dress code?", a: "We'd love to see our family and friends get dressed up for our big day. The dress code is Semi-Formal or Cocktail attire." },
          { q: "Are kids invited?", a: "While we love your little ones, our wedding will be an adults-only event so that everyone can relax and enjoy the evening." },
          { q: "Is there parking available?", a: "Yes, both the church and the reception venue have ample free parking available for all guests." },
          { q: "What time should I arrive?", a: "The ceremony begins promptly at 2:00 PM. We recommend arriving 15-20 minutes early to find your seat." }
        ].map((item, i) => (
          <div key={i} className="bg-white p-8 rounded-2xl border border-purple-50 shadow-sm"><h4 className="text-purple-900 font-bold mb-3 uppercase text-[10px] tracking-widest font-sans">{item.q}</h4><p className="text-slate-600 leading-relaxed">{item.a}</p></div>
        ))}
      </div>
    </main>
  );

  const renderContent = () => {
    switch(currentPage) {
      case 'HOME': return renderHome();
      case 'RSVP': return renderRSVP();
      case 'STORY': return renderStory();
      case 'TRAVEL': return renderTravel();
      case 'GALLERY': return renderGallery();
      case 'GIFT': return renderGift();
      case 'QA': return renderQA();
      default: return renderHome();
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFCFE] text-slate-800 font-serif overflow-x-hidden">
      <div className="h-3 bg-purple-200 opacity-40" />
      
      {isMenuOpen && (
        <div className="fixed inset-0 z-[100] bg-white animate-in slide-in-from-top-full duration-300 flex flex-col items-center justify-center space-y-8">
          <button onClick={() => setIsMenuOpen(false)} className="absolute top-8 right-8 text-purple-300"><X size={32}/></button>
          {['HOME', 'RSVP', 'STORY', 'TRAVEL', 'GALLERY', 'GIFT', 'QA'].map((tab) => (
            <button key={tab} onClick={() => navigateTo(tab)} className="text-3xl text-purple-900 italic hover:text-purple-400">{tab === 'HOME' ? 'The Wedding' : tab === 'QA' ? 'Q&A' : tab.charAt(0) + tab.slice(1).toLowerCase()}</button>
          ))}
        </div>
      )}

      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-purple-50 px-6 py-4">
        <div className="max-w-5xl mx-auto flex justify-between items-center">
          <button onClick={() => setIsMenuOpen(true)} className="md:hidden text-purple-400"><Menu size={24}/></button>
          <div className="hidden md:flex gap-8 text-[10px] uppercase tracking-[0.2em] font-sans font-bold text-slate-400">
            {['HOME', 'RSVP', 'STORY', 'TRAVEL', 'GALLERY', 'GIFT', 'QA'].map((tab) => (
              <button key={tab} onClick={() => navigateTo(tab)} className={currentPage === tab ? "text-purple-600 border-b border-purple-600 pb-1" : "hover:text-purple-400"}>
                {tab === 'HOME' ? 'Wedding' : tab === 'QA' ? 'Q&A' : tab.charAt(0) + tab.slice(1).toLowerCase()}
              </button>
            ))}
          </div>
          <span className="text-purple-900 italic text-xl">D & L</span>
        </div>
      </nav>

      {renderContent()}

      <footer className="py-20 text-center text-slate-300 text-[10px] tracking-[0.6em] uppercase font-sans">#TheDanLorraineUnion</footer>
    </div>
  );
};

export default WeddingSite;
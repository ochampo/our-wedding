import React, { useState, useEffect } from 'react';
import { 
  Heart, Calendar, GlassWater, Search, Music, Check, 
  AlertCircle, X, BookOpen, MapPin, Car, Gift, 
  HelpCircle, Users, Image as ImageIcon, Menu 
} from 'lucide-react';
import SHA256 from 'crypto-js/sha256';
import WeddingCrossword from './WeddingCrossword';
import QA from './QA.jsx';
import RenderGift from './RenderGift.jsx';
import RenderGallery from './RenderGallery.jsx';
import { Loader } from 'lucide-react';
const LoginScreen = ({ onLogin, isLoading}) => {
  const [input, setInput] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (isLoading) return; // Prevent multiple submissions
    // 1. Calculate the hash using the library
    // toString() is needed to convert the math object to a text string
    const inputHash = SHA256(input.toLowerCase().trim()).toString();
    
    // 2. Compare it to the hash of "july3"
    // (I calculated this hash for you below)
    const SECRET_HASH = "dfa3569a46b1a13c24c9f385da140f4763a3fbb70f8eebe0f29ba535145d32ca";

    if (inputHash === SECRET_HASH) { 
      onLogin();
    } else {
      setError(true);
      setInput("");
    }
  };

  return (
    <div className="h-screen w-full bg-purple-900 flex flex-col items-center justify-center px-6">
      <div className="bg-white p-10 rounded-3xl shadow-2xl w-full max-w-sm text-center">
        <p className="text-purple-900 italic font-serif text-2xl mb-2">Lorraine & Daniel</p>
        <p className="text-slate-500 text-xs uppercase tracking-widest mb-6">Guest Access</p>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <input 
            type="password" 
            value={input}
            onChange={(e) => { setInput(e.target.value); setError(false); }}
            placeholder="Password"
            className="w-full p-3 bg-purple-50 border border-purple-100 rounded-xl outline-none text-center text-purple-900"
          />
          {error && <p className="text-red-400 text-xs">Incorrect password</p>}
          <button 
            type="submit" 
            disabled={isLoading}
            className={`w-full py-3 bg-purple-900 text-white rounded-xl font-bold uppercase tracking-widest text-[10px] flex items-center justify-center gap-2 transition-all ${isLoading ? "opacity-70 cursor-not-allowed" : "hover:bg-purple-800"}`}
          >
            {isLoading ? (
              <>
                <Loader className="animate-spin" size={16} /> 
                Unlocking...
              </>
            ) : (
              "Enter Site"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};
const WeddingSite = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  // --- STATE MANAGEMENT ---
  const [currentPage, setCurrentPage] = useState('HOME');
  const [allGuests, setAllGuests] = useState([]); 
  const [rsvpMap, setRsvpMap] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedParty, setSelectedParty] = useState([]); 
  const [isDuplicate, setIsDuplicate] = useState(false);
  const [status, setStatus] = useState("IDLE");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [isLoadingData, setIsLoadingData] = useState(false);



  // OLD (Causes white screen in Vite)
// const GOOGLE_URL = process.env.REACT_APP_GOOGLE_SCRIPT_URL;

// NEW (Works in Vite)
  const GOOGLE_URL = import.meta.env.VITE_GOOGLE_SCRIPT_URL;
  // --- REUSABLE DATA ---
  const LOCATIONS = [
    {
      id: 'ceremony',
      type: 'ceremony',
      title: "The Ceremony",
      time: "2:00 PM",
      name: "Holy Spirit Church",
      address: "41139 Fremont Blvd, Fremont, CA",
      mapLink: "https://www.google.com/maps/search/?api=1&query=Holy+Spirit+Church+41139+Fremont+Blvd+Fremont+CA",
      icon: Calendar
    },
    {
      id: 'reception',
      type: 'reception',
      title: "The Reception",
      time: "5:30 PM",
      name: "The Bridges Golf Club",
      address: "9000 S Gale Ridge Rd, San Ramon",
      mapLink: "https://www.google.com/maps/search/?api=1&query=The+Bridges+Golf+Club+9000+S+Gale+Ridge+Rd+San+Ramon",
      icon: GlassWater
    }
  ];

  // --- REUSABLE COMPONENT ---
  const LocationCard = ({ data, extraClass = "" }) => {
    const Icon = data.icon;
    return (
      <a 
        href={data.mapLink}
        target="_blank" 
        rel="noopener noreferrer"
        className={`group block p-8 rounded-3xl hover:bg-purple-50 transition-all duration-300 border border-transparent hover:border-purple-100 cursor-pointer bg-white shadow-sm text-center ${extraClass}`}
      >
        <Icon className="mx-auto mb-4 text-purple-200 group-hover:text-purple-400 transition-colors" size={32} />
        <h3 className="text-2xl md:text-3xl text-purple-900 font-light italic mb-2 group-hover:text-purple-600 transition-colors">
          {data.title}
        </h3>
        {data.time && (
          <p className="text-slate-400 font-sans text-[10px] tracking-widest uppercase font-bold mb-4">
            {data.time}
          </p>
        )}
        <p className="text-lg text-slate-700 font-serif">{data.name}</p>
        <div className="flex items-center justify-center gap-1 mt-2 text-slate-500 text-sm group-hover:text-purple-500">
          <MapPin size={14} />
          <span className="underline decoration-purple-200 underline-offset-4 group-hover:decoration-purple-400">
            {data.address}
          </span>
        </div>
      </a>
    );
  };

  // --- EFFECTS ---

  // Countdown Timer
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

  // Fetch Guest List
// New function: Only runs when called manually
  const loadWeddingData = () => {
    console.log("Password accepted. Fetching guest list..."); // Optional debug log
    return fetch(GOOGLE_URL)
      .then(res => res.json())
      .then(data => {
        setAllGuests(data.invited || []);
        setRsvpMap(data.rsvpMap || {});
      })
      .catch(err => console.error("Fetch error:", err));
  };

  const handleLogin = () => {
    setIsLoadingData(true); // 1. Start Spinner
    
    loadWeddingData().then(() => {
      // 2. Wait for Google to finish
      setIsLoadingData(false); // Stop Spinner
      setIsAuthenticated(true); // Show Home Page
    });
  };

  // --- HANDLERS ---

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
    } catch (error) { 
      setStatus("ERROR"); 
    }
  };

  const filteredResults = searchTerm.length > 2 
    ? allGuests.filter(g => g.name.toLowerCase().includes(searchTerm.toLowerCase().trim())).slice(0, 6) 
    : [];

  const navigateTo = (page) => {
    setCurrentPage(page);
    setIsMenuOpen(false);
    window.scrollTo(0, 0);
  };

  // --- RENDER FUNCTIONS ---

const renderHome = () => (
    <main className="animate-in fade-in duration-1000">
      
      {/* --- HERO SECTION --- */}
      <header className="h-screen w-full relative flex flex-col items-center justify-center text-center px-4 overflow-hidden">
        
        {/* 1. BACKGROUND LAYER */}
        <div className="absolute inset-0 z-0">
           {/* Replace with your image */}
           <img 
             src="./temp.jpeg" 
             alt="Lorraine and Daniel" 
             className="w-full h-full object-cover"
           />
           {/* Gradient Overlay: Essential for white text readability */}
           <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/70"></div>
           <div className="absolute inset-0 bg-black/20"></div>
        </div>

        {/* 2. TEXT CONTENT */}
        <div className="relative z-10 text-white space-y-8 mt-10">
          
          <div className="animate-in slide-in-from-bottom-4 duration-1000 delay-300">
            <p className="tracking-[0.4em] uppercase text-[10px] md:text-xs font-sans font-medium text-white/80 mb-4">
              We're getting married
            </p>
            <h1 className="text-6xl md:text-9xl font-light italic leading-none drop-shadow-lg">
              Lorraine <span className="font-sans font-thin text-4xl md:text-6xl align-middle mx-2 opacity-70">&</span> Daniel
            </h1>
          </div>

          <div className="h-px w-16 bg-white/40 mx-auto" />
          
          <p className="text-xl md:text-2xl font-light italic tracking-wide text-white/90 drop-shadow-md animate-in slide-in-from-bottom-4 duration-1000 delay-500">
            July 3, 2026 • Fremont, California
          </p>

          {/* Countdown */}
          <div className="grid grid-cols-4 gap-6 md:gap-12 max-w-lg mx-auto pt-8 animate-in slide-in-from-bottom-8 duration-1000 delay-700">
            {[{l:'Days',v:timeLeft.days},{l:'Hrs',v:timeLeft.hours},{l:'Mins',v:timeLeft.minutes},{l:'Secs',v:timeLeft.seconds}].map((t,i)=>(
              <div key={i} className="text-center">
                <span className="block text-2xl md:text-4xl font-serif italic font-light drop-shadow-md">{t.v}</span>
                <span className="block text-[9px] uppercase tracking-widest text-white/70 mt-1">{t.l}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-0 right-0 text-center animate-bounce text-white/50">
          <p className="text-[10px] uppercase tracking-widest">Scroll for Details</p>
        </div>
      </header>
      {/* DETAILS SECTION - Now using the Reusable Component! */}
      <section className="py-24 bg-white px-6">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8 md:gap-12 text-center">
          {LOCATIONS.map(loc => (
            <LocationCard key={loc.id} data={loc} />
          ))}
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
          <div className="text-center p-12 bg-purple-50 rounded-3xl border border-purple-100 text-2xl text-purple-900 italic font-light">
            Thank you! We can't wait to see you there!
          </div>
        ) : (
          <div className="min-h-[300px]">
            {selectedParty.length === 0 ? (
              <div className="space-y-6">
                <div className="relative">
                  <input 
                    type="text" 
                    placeholder="Search your name..." 
                    value={searchTerm} 
                    onChange={(e) => setSearchTerm(e.target.value)} 
                    className="w-full py-4 px-12 bg-purple-50 rounded-2xl outline-none border border-purple-100 focus:border-purple-300 transition-all text-lg font-sans" 
                  />
                  <Search className="absolute left-4 top-5 text-purple-300" size={18} />
                </div>
                <div className="space-y-2">
                  {filteredResults.map((guest, i) => (
                    <button key={i} onClick={() => handleSelectName(guest)} className="w-full p-4 text-left bg-white border border-purple-50 rounded-xl hover:bg-purple-50 flex items-center justify-between">
                      <span className="text-slate-700 font-medium">{guest.name}</span>
                      <Check size={16} className="text-purple-200" />
                    </button>
                  ))}
                </div>
              </div>
            ) : isDuplicate ? (
              <div className="p-10 bg-amber-50 rounded-3xl text-center border border-amber-100">
                <AlertCircle className="mx-auto text-amber-500 mb-4" size={32} />
                <h3 className="text-xl font-bold text-amber-900 italic">Already RSVP'ed</h3>
                <button onClick={() => setSelectedParty([])} className="mt-8 text-[10px] uppercase tracking-widest underline font-bold text-amber-700">
                  Try another name
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="flex justify-between items-center border-b border-purple-100 pb-4">
                  <div className="flex items-center gap-2">
                    <Users className="text-purple-400" size={20} />
                    <span className="text-slate-500 text-[10px] uppercase tracking-[0.2em] font-sans font-bold">Party RSVP</span>
                  </div>
                  <button type="button" onClick={() => setSelectedParty([])} className="text-purple-300"><X size={20}/></button>
                </div>
                {selectedParty.map((member, idx) => (
                  <div key={idx} className="p-6 bg-purple-50 rounded-2xl border border-purple-100 space-y-4">
                    <p className="font-bold text-purple-900 font-serif italic text-lg">{member.name}</p>
                    <select name={`attendance-${idx}`} className="w-full py-2 bg-transparent border-b border-purple-200 outline-none font-sans">
                      <option value="yes">Joyfully Accepts</option>
                      <option value="no">Regretfully Declines</option>
                    </select>
                    <input name={`dietary-${idx}`} className="w-full py-2 bg-transparent border-b border-purple-200 outline-none font-sans text-sm" placeholder="Dietary Restrictions" />
                  </div>
                ))}
                <input name="music" className="w-full py-3 bg-white px-4 rounded-xl border border-purple-100 outline-none font-sans" placeholder="Song Request for the Dance Floor" />
                <button type="submit" className="w-full py-5 bg-purple-900 text-white rounded-full font-bold tracking-[0.3em] text-[10px] uppercase shadow-xl hover:bg-purple-800 transition-all">
                  {status === "SENDING" ? "Submitting..." : "Confirm Party RSVP"}
                </button>
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
          <h3 className="text-purple-900 font-bold mb-2 uppercase text-xs tracking-widest font-sans">From Bumble to Lake Elizabeth</h3>
          <p>We first connected on Bumble, eager to see if the spark was real. We met for dinner at <b>SalaThai</b>, and almost immediately, the chemistry was undeniable. Not ready to say goodbye after dinner, we decided to take a walk around Lake Elizabeth.</p>
          <p>As we walked and talked, a simple introduction turned into the realization that we had found something rare. It was an evening we didn't want to end, and looking back, it was the moment we both realized we were the perfect match.</p>
        </div>
        <div className="relative pl-8 border-l-2 border-purple-100">
          <span className="absolute -left-2.5 top-0 w-5 h-5 bg-purple-100 rounded-full border-4 border-white" />
          <h3 className="text-purple-900 font-bold mb-2 uppercase text-xs tracking-widest font-sans">Two Worlds, One Heart, Family</h3>
          <p>Merging Dan’s Mexican heritage with Lorraine’s Goan roots meant a lot of incredible food, rich traditions, and a shared love for family. We discovered that our values are exactly the same.</p>
          <p>Lorraine introduction to the family, and the family embraced her with open arms, making her feel like part of the extended family from day one.</p>
          <p>Dan's introduction to the family, and the family embraced him with open arms, making him feel like part of the extended family from day one.</p>
        </div>
        <div className="relative pl-8 border-l-2 border-purple-100">
          <span className="absolute -left-2.5 top-0 w-5 h-5 bg-purple-100 rounded-full border-4 border-white" />
          <h3 className="text-purple-900 font-bold mb-2 uppercase text-xs tracking-widest font-sans">Travels </h3>
          <p>From the beaches of Mexico to the historic streets of buddapest, our travels have been filled with adventure,discovery and pasteries. Each trip has strengthened our bond and created memories that we will cherish forever.</p>
          <p>These experiences have not only enriched our lives but have also deepened our love for each other, as we navigate the world hand in hand.</p>
          <p>We knew we were meant together after our first trip to Hawii, that's where dan figured out that lorraine had huge sweet thooth for <b>DONUTS</b>.</p>
        </div>
        <div className="relative pl-8 border-l-2 border-purple-100">
          <span className="absolute -left-2.5 top-0 w-5 h-5 bg-purple-100 rounded-full border-4 border-white" />
          <h3 className="text-purple-900 font-bold mb-2 uppercase text-xs tracking-widest font-sans">The Proposal</h3>
          <p>On a beautiful day in <b>FREMONT</b>, Dan planned a special day right in Lorraine's parents <b>BACKYARD</b>. As we waited for her lorraine to arrive, Dan nervously got down on one knee and asked Lorraine to marry him.</p>
          <p>Overwhelmed with joy, she said yes! It was a moment filled with love, laughter, and the promise of a lifetime together. We celebrated with a romantic picnic, savoring the beginning of our new chapter as fiancés.</p>
        </div>
      </div>
    </main>
  );

  const renderTravel = () => (
    <main className="max-w-5xl mx-auto px-6 py-24 animate-in fade-in duration-700 flex flex-col justify-center">
      <MapPin className="mx-auto text-purple-200 mb-6" size={40} />
      <h2 className="text-5xl text-center text-purple-900 mb-12 font-light italic">Travel & Stay</h2>
      {/* 1. Reuse the Venue Cards */}
      <div className="grid md:grid-cols-2 gap-8 mb-12">
        {LOCATIONS.map(loc => (
          <LocationCard key={loc.id} data={loc} extraClass="bg-purple-50/50 border-purple-100" />
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
      case 'GALLERY': return <RenderGallery />;
      case 'GIFT': return <RenderGift />;
      case 'QA': return <QA />;
      case 'GAMES': return <WeddingCrossword />;
      default: return renderHome();
    }
  };

  // --- MAIN RENDER ---
  // NEW CODE
if (!isAuthenticated) {
    return (
      <LoginScreen 
        onLogin={handleLogin} 
        isLoading={isLoadingData} 
      />
    );
  }
  return (
    <div className="min-h-screen bg-[#FDFCFE] text-slate-800 font-serif overflow-x-hidden">
      <div className="h-3 bg-purple-200 opacity-40" />
      
      {/* Mobile Full Screen Menu Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-[100] bg-white animate-in slide-in-from-top-full duration-300 flex flex-col items-center justify-center space-y-8">
          <button onClick={() => setIsMenuOpen(false)} className="absolute top-8 right-8 text-purple-300">
            <X size={32}/>
          </button>
          {['HOME', 'RSVP', 'STORY', 'TRAVEL', 'GALLERY', 'GIFT', 'QA', 'GAMES'].map((tab) => (
            <button key={tab} onClick={() => navigateTo(tab)} className="text-3xl text-purple-900 italic hover:text-purple-400">
              {tab === 'HOME' ? 'The Wedding' : tab === 'QA' ? 'Q&A' : tab === 'GAMES' ? 'Games' : tab.charAt(0) + tab.slice(1).toLowerCase()}
            </button>
          ))}
        </div>
      )}

      {/* Persistent Navigation Bar */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-purple-50 px-6 py-4">
        <div className="max-w-5xl mx-auto flex justify-between items-center">
          
          {/* Left Side: Hamburger + Persistent Mobile RSVP */}
          <div className="flex items-center gap-4">
            {/* Hamburger Icon */}
            <button onClick={() => setIsMenuOpen(true)} className="md:hidden text-purple-400">
              <Menu size={24}/>
            </button>

            {/* Mobile-only persistent RSVP Button */}
            <button 
              onClick={() => navigateTo('RSVP')}
              className="md:hidden bg-purple-900 text-white px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest shadow-md active:scale-95 transition-transform"
            >
              RSVP
            </button>
          </div>

          {/* Center: Desktop Menu (Hidden on mobile) */}
          <div className="hidden md:flex gap-8 text-[10px] uppercase tracking-[0.2em] font-sans font-bold text-slate-400">
            {['HOME', 'RSVP', 'STORY', 'TRAVEL', 'GALLERY', 'GIFT', 'QA', 'GAMES'].map((tab) => (
              <button 
                key={tab} 
                onClick={() => navigateTo(tab)} 
                className={currentPage === tab ? "text-purple-600 border-b border-purple-600 pb-1" : "hover:text-purple-400"}
              >
                {tab === 'HOME' ? 'Wedding' : tab === 'QA' ? 'Q&A' : tab === 'GAMES' ? 'Games' : tab.charAt(0) + tab.slice(1).toLowerCase()}
              </button>
            ))}
          </div>

          {/* Right Side: Logo initials */}
          <span className="text-purple-900 italic text-xl">L & D</span>
        </div>
      </nav>

      {renderContent()}

      <footer className="py-20 text-center text-slate-300 text-[10px] tracking-[0.6em] uppercase font-sans">
        #TheDanLorraineUnion
      </footer>
    </div>
  );
};

export default WeddingSite;
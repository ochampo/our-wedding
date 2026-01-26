import React, { useState, useEffect } from 'react';
import { 
  Heart, Calendar, GlassWater, Search, Music, Check, 
  AlertCircle, X, BookOpen, MapPin, Car, Gift, 
  HelpCircle, Users, Image as ImageIcon, Menu, Loader 
} from 'lucide-react';
import SHA256 from 'crypto-js/sha256';
import WeddingCrossword from './WeddingCrossword';
import QA from './QA.jsx';
import RenderGift from './RenderGift.jsx';
import RenderGallery from './RenderGallery.jsx';
import RenderTravel from './RenderTravel.jsx';
import RenderRSVP from './RenderRSVP.jsx';
import { LOCATIONS } from './data/WeddingData';
import LocationCard from './components/LocationCard';
import RenderStory from './RenderStory.jsx';
import RenderParty from './RenderParty.jsx';

// --- NEW COMPONENT: CURTAIN REVEAL LOGIN ---
const CurtainLogin = ({ onLogin, isLoading, isOpen }) => {
  const [input, setInput] = useState("");
  const [error, setError] = useState(false);
  const [isFadingOut, setIsFadingOut] = useState(false);

  // Trigger internal fade-out of the form before curtains open
  useEffect(() => {
    if (isOpen) {
      setIsFadingOut(true);
    }
  }, [isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLoading) return;

    const inputHash = SHA256(input.toLowerCase().trim()).toString();
   
    const SECRET_HASH = "dfa3569a46b1a13c24c9f385da140f4763a3fbb70f8eebe0f29ba535145d32ca";

    if (inputHash === SECRET_HASH) {
      onLogin();
    } else {
      setError(true);
      setInput("");
    }
  };

  // CSS for the fabric fold effect
  const velvetGradient = "repeating-linear-gradient(90deg, transparent, transparent 40px, rgba(0,0,0,0.3) 60px, transparent 100px)";

  return (
    <div className={`fixed inset-0 z-[100] overflow-hidden flex items-center justify-center transition-all duration-1000 ${isOpen ? 'pointer-events-none' : 'pointer-events-auto'}`}>
      
      {/* --- LEFT CURTAIN --- */}
      <div 
        className={`absolute top-0 bottom-0 left-0 bg-purple-900 transition-transform duration-[2500ms] ease-[cubic-bezier(0.25,1,0.5,1)] z-10 ${isOpen ? '-translate-x-full' : 'translate-x-0'}`}
        style={{ width: '51%', backgroundImage: velvetGradient }} // 51% to ensure overlap in middle
      >
        <div className="absolute right-0 top-0 bottom-0 w-2 bg-yellow-600/40 shadow-2xl"></div>
      </div>

      {/* --- RIGHT CURTAIN --- */}
      <div 
        className={`absolute top-0 bottom-0 right-0 bg-purple-900 transition-transform duration-[2500ms] ease-[cubic-bezier(0.25,1,0.5,1)] z-10 ${isOpen ? 'translate-x-full' : 'translate-x-0'}`}
        style={{ width: '51%', backgroundImage: velvetGradient }}
      >
        <div className="absolute left-0 top-0 bottom-0 w-2 bg-yellow-600/40 shadow-2xl"></div>
      </div>

      {/* --- LOGIN FORM EMBLEM (Sits on top of curtains) --- */}
      <div className={`relative z-20 transition-all duration-700 transform ${isFadingOut ? 'opacity-0 scale-90 blur-sm' : 'opacity-100 scale-100'}`}>
        <div className="bg-white/10 backdrop-blur-md p-10 rounded-full shadow-2xl border border-white/20 w-[340px] h-[340px] flex flex-col items-center justify-center text-center">
          
          <div className="mb-6 text-white">
            <Heart className="mx-auto mb-2 text-yellow-200" size={32} />
            <h1 className="font-serif italic text-3xl text-white drop-shadow-md">Lorraine & Daniel</h1>
            <p className="text-yellow-100/80 text-[10px] uppercase tracking-[0.3em] mt-2">Welcome Guest</p>
          </div>
          
          <form onSubmit={handleSubmit} className="w-full space-y-4 px-4">
            <input 
              type="password" 
              value={input}
              onChange={(e) => { setInput(e.target.value); setError(false); }}
              placeholder="Enter Password"
              className="w-full p-3 bg-white/90 border-0 rounded-lg text-center text-purple-900 placeholder:text-purple-300 focus:ring-2 focus:ring-yellow-400 outline-none shadow-inner font-serif"
            />
            
            {error && <p className="text-red-200 font-bold text-xs bg-red-900/50 py-1 rounded">Incorrect password</p>}
            
            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full py-3 bg-gradient-to-r from-yellow-600 to-yellow-500 text-white rounded-lg font-bold uppercase tracking-widest text-[10px] hover:scale-105 transition-transform shadow-lg border border-yellow-300/50 flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <Loader className="animate-spin" size={14} /> Unlocking...
                </>
              ) : (
                "Open Invitation"
              )}
            </button>
          </form>
        </div>
      </div>

    </div>
  );
};

// --- MAIN SITE COMPONENT ---
const WeddingSite = () => {
  // --- AUTH & REVEAL STATE ---
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showLogin, setShowLogin] = useState(true); // Is the login component mounted?
  const [curtainsOpen, setCurtainsOpen] = useState(false); // Are curtains animating open?
  const [isLoadingData, setIsLoadingData] = useState(false);

  // --- MISSING DATA STATE ---
  const [allGuests, setAllGuests] = useState([]); 
  const [rsvpMap, setRsvpMap] = useState({});

  // --- MISSING URL DEFINITION ---
  const GOOGLE_URL = import.meta.env.VITE_GOOGLE_SCRIPT_URL;

  // --- MISSING NAVIGATION FUNCTION ---
  const navigateTo = (page) => {
    setCurrentPage(page);
    setIsMenuOpen(false);
    window.scrollTo(0, 0);
  };

  // --- CONTENT STATE ---
  const [currentPage, setCurrentPage] = useState('HOME');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  

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
  const loadWeddingData = () => {
    console.log("Password accepted. Loading wedding data..."); 
    return fetch(GOOGLE_URL)
      .then(res => res.json())
      .then(data => {
        setAllGuests(data.invited || []);
        setRsvpMap(data.rsvpMap || {});
      })
      .catch(err => console.error("Fetch error:", err));
  };

  // --- MODIFIED LOGIN HANDLER ---
  const handleLogin = () => {
    setIsLoadingData(true); // 1. Start Spinner
    
    loadWeddingData().then(() => {
      // 2. Data Loaded
      setIsLoadingData(false); 
      
      // 3. Render the site (it will appear behind the curtains)
      setIsAuthenticated(true); 
      
      // 4. Trigger Curtain Animation
      setCurtainsOpen(true);

      // 5. Remove Login Component after animation finishes
      setTimeout(() => {
        setShowLogin(false);
      }, 2500);
    });
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
           {/* Gradient Overlay */}
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
      
      {/* DETAILS SECTION */}
      <section className="py-24 bg-white px-6">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8 md:gap-12 text-center">
          {LOCATIONS.map(loc => (
            <LocationCard key={loc.id} data={loc} />
          ))}
        </div>
      </section>
    </main>
  );
  const renderContent = () => {
    switch(currentPage) {
      case 'HOME': return renderHome();
      case 'RSVP': 
      return (
        <RenderRSVP 
          allGuests={allGuests}        // Pass the guest list
          rsvpMap={rsvpMap}            // Pass the list of who already replied
          googleScriptUrl={GOOGLE_URL} // Pass the URL to send replies to
        />
      );
      case 'STORY': return <RenderStory />;
      case 'TRAVEL': return <RenderTravel />;
      case 'GALLERY': return <RenderGallery />;
      case 'GIFT': return <RenderGift />;
      case 'QA': return <QA />;
      case 'GAMES': return <WeddingCrossword />;
      case 'PARTY': return <RenderParty />;
      default: return renderHome();
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFCFE] text-slate-800 font-serif overflow-x-hidden relative">
      
      {/* 1. LOGIN OVERLAY (The Grand Curtains) */}
      {showLogin && (
        <CurtainLogin 
          onLogin={handleLogin} 
          isLoading={isLoadingData} 
          isOpen={curtainsOpen}
        />
      )}

      {/* 2. MAIN SITE (Renders underneath only if authenticated) */}
      {isAuthenticated && (
        <div className="animate-in fade-in duration-1000">
          <div className="h-3 bg-purple-200 opacity-40" />
          
          {/* Mobile Full Screen Menu Overlay */}
          {isMenuOpen && (
            <div className="fixed inset-0 z-[100] bg-white animate-in slide-in-from-top-full duration-300 flex flex-col items-center justify-center space-y-8">
              <button onClick={() => setIsMenuOpen(false)} className="absolute top-8 right-8 text-purple-300">
                <X size={32}/>
              </button>
              {['HOME', 'RSVP', 'STORY', 'TRAVEL', 'GALLERY', 'GIFT', 'QA', 'GAMES', 'PARTY'].map((tab) => (
                <button key={tab} onClick={() => navigateTo(tab)} className="text-3xl text-purple-900 italic hover:text-purple-400">
                  {tab === 'HOME' ? 'THE WEDDING' : tab === 'QA' ? 'Q&A' : tab === 'GAMES' ? 'GAMES' : tab.charAt(0) + tab.slice(1).toUpperCase()}
                </button>
              ))}
            </div>
          )}

          {/* Persistent Navigation Bar */}
          <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-purple-50 px-6 py-4">
            <div className="max-w-5xl mx-auto flex justify-between items-center">
              
              {/* Left Side: Hamburger + Persistent Mobile RSVP */}
              <div className="flex items-center gap-4">
                <button onClick={() => setIsMenuOpen(true)} className="md:hidden text-purple-400">
                  <Menu size={24}/>
                </button>
                <button 
                  onClick={() => navigateTo('RSVP')}
                  className="md:hidden bg-purple-900 text-white px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest shadow-md active:scale-95 transition-transform"
                >
                  RSVP
                </button>
              </div>

              {/* Center: Desktop Menu */}
              <div className="hidden md:flex gap-8 text-[10px] uppercase tracking-[0.2em] font-sans font-bold text-slate-400">
                {['HOME', 'RSVP', 'STORY', 'TRAVEL', 'GALLERY', 'GIFT', 'QA', 'GAMES', 'PARTY'].map((tab) => (
                  <button 
                    key={tab} 
                    onClick={() => navigateTo(tab)} 
                    className={currentPage === tab ? "text-purple-600 border-b border-purple-600 pb-1" : "hover:text-purple-400"}
                  >
                    {tab === 'HOME' ? 'THE WEDDING' : tab === 'QA' ? 'Q&A' : tab === 'GAMES' ? 'GAMES' : tab.charAt(0) + tab.slice(1).toUpperCase()}
                  </button>
                ))}
              </div>

              {/* Right Side: Logo */}
              <span className="text-purple-900 italic text-xl">L & D</span>
            </div>
          </nav>

          {renderContent()}

          <footer className="py-20 text-center text-slate-300 text-[10px] tracking-[0.6em] uppercase font-sans">
            #TheDanLorraineUnion
          </footer>
        </div>
      )}
    </div>
  );
};

export default WeddingSite;
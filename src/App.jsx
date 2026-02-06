import { useState, useEffect } from 'react';
import { X, Menu } from 'lucide-react';

// --- CUSTOM COMPONENTS ---
import WeddingCrossword from './WeddingCrossword';
import QA from './QA.jsx';
import RenderGift from './RenderGift.jsx';
import RenderTravel from './RenderTravel.jsx';
import RenderRSVP from './RenderRSVP.jsx';
import { LOCATIONS } from './data/WeddingData';
import LocationCard from './components/LocationCard';
import RenderStory from './RenderStory.jsx';
import CurtainLogin from './CurtainLogin.jsx';
import FallingHearts from './FallingHearts.jsx';

// --- MAIN SITE COMPONENT ---
const WeddingSite = () => {
  // --- AUTH & REVEAL STATE ---
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showLogin, setShowLogin] = useState(true);
  const [curtainsOpen, setCurtainsOpen] = useState(false);
  const [isLoadingData, setIsLoadingData] = useState(false);

  // --- CONTENT STATE ---
  const [allGuests, setAllGuests] = useState([]);
  const [rsvpMap, setRsvpMap] = useState({});
  const [currentPage, setCurrentPage] = useState('HOME');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  const GOOGLE_URL = import.meta.env.VITE_GOOGLE_SCRIPT_URL;

  const navigateTo = (page) => {
    setCurrentPage(page);
    setIsMenuOpen(false);
    window.scrollTo(0, 0);
  };

  // Countdown Timer Logic
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

  const loadWeddingData = () => {
    return fetch(GOOGLE_URL)
      .then(res => res.json())
      .then(data => {
        setAllGuests(data.invited || []);
        setRsvpMap(data.rsvpMap || {});
      })
      .catch(err => console.error("Fetch error:", err));
  };

  const handleLogin = () => {
    setIsLoadingData(true);
    loadWeddingData().then(() => {
      setIsLoadingData(false);
      setIsAuthenticated(true); // Render site behind curtains
      setCurtainsOpen(true);    // Start animation
      setTimeout(() => {
        setShowLogin(false);    // Remove overlay once off-screen
      }, 3500);
    });
  };

  // --- RENDER FUNCTIONS ---
  const renderHome = () => (
    <main className="animate-in fade-in duration-1000">
      
      {/* 1. HERO SECTION */}
      <header className="h-screen w-full relative flex flex-col items-center justify-between py-16 text-center px-4 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src="./CoverPhoto.jpg" alt="Lorraine and Daniel" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60"></div>
        </div>
        
        {/* Top Label */}
        <div className="relative z-10 animate-in fade-in slide-in-from-top-4 duration-1000 delay-300">
          <p className="tracking-[0.5em] uppercase text-[10px] md:text-base font-sans font-semibold text-white/90">
            We're getting married
          </p>
        </div>

        {/* Center Content: Names & BIG DATE */}
        <div className="relative z-10 text-white space-y-8 mb-12">
          <div className="animate-in slide-in-from-bottom-4 duration-1000 delay-500">
            <h1 className="text-6xl md:text-9xl font-light italic leading-none drop-shadow-lg">
              Lorraine <span className="font-sans font-thin text-4xl md:text-6xl align-middle mx-2 opacity-70">&</span> Daniel
            </h1>
            
            
            {/* UPDATED: Bigger Date & Clearer Time */}
            <div className="flex flex-col items-center gap-3">
              <p className="text-4xl md:text-6xl font-serif italic tracking-wide text-white drop-shadow-md">
                July 3, 2026
              </p>
            </div>
          </div>
          
          {/* Countdown */}
          <div className="grid grid-cols-4 gap-6 md:gap-12 max-w-lg mx-auto pt-8 animate-in slide-in-from-bottom-8 duration-1000 delay-700">
            {[{l:'Days',v:timeLeft.days},{l:'Hrs',v:timeLeft.hours},{l:'Mins',v:timeLeft.minutes},{l:'Secs',v:timeLeft.seconds}].map((t,i)=>(
              <div key={i} className="text-center">
                <span className="block text-2xl md:text-4xl font-serif italic font-light">{t.v}</span>
                <span className="block text-[9px] uppercase tracking-widest text-white/70 mt-1">{t.l}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="absolute bottom-6 left-0 right-0 text-center animate-bounce text-white/50">
          <p className="text-[10px] uppercase tracking-widest">Scroll for Details</p>
        </div>
      </header>

      {/* 2. LOCATIONS & TIMELINE SECTION */}
      <section className="py-24 bg-white px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-light italic text-purple-900 mb-4">
              The Wedding Itinerary
            </h2>
            <p className="text-slate-500 text-sm tracking-wide">
              Please join us for the ceremony followed by the reception.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 md:gap-12 text-center">
            {LOCATIONS.map(loc => (
              <LocationCard key={loc.id} data={loc} />
            ))}
          </div>
        </div>
      </section>

      {/* 3. OUR STORY SECTION */}
      <section className="py-18 bg-slate-50 border-y border-purple-50 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <RenderStory />
        </div>
      </section>

      {/* 4. GAMES SECTION */}
      <section className="py-24 bg-white px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-serif italic text-purple-900 mb-4">
            How Well Do You Know Us?
          </h2>
          <p className="text-[10px] uppercase tracking-[0.3em] text-slate-400 mb-12">
            Take the Wedding Crossword Challenge
          </p>
          <WeddingCrossword /> 
        </div>
      </section>

    </main>
  );

  const renderContent = () => {
    switch(currentPage) {
      case 'HOME': return renderHome();
      case 'RSVP': return <RenderRSVP allGuests={allGuests} rsvpMap={rsvpMap} googleScriptUrl={GOOGLE_URL} />;
      case 'TRAVEL': return <RenderTravel />;
      case 'GIFT': return <RenderGift />;
      case 'QA': return <QA />;
      default: return renderHome();
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFCFE] text-slate-800 font-serif overflow-x-hidden relative">
      <FallingHearts />
      <style>{`
        .curtain-texture {
          background-color: #5b3a6e;
          background-image:
            linear-gradient(90deg, rgba(0,0,0,0.3) 0%, transparent 20%, transparent 80%, rgba(0,0,0,0.3) 100%),
            repeating-linear-gradient(90deg, rgba(255,255,255,0.03) 0px, rgba(255,255,255,0.03) 1px, transparent 1px, transparent 40px);
          box-shadow: inset -50px 0 100px -20px rgba(0,0,0,0.4), inset 50px 0 100px -20px rgba(0,0,0,0.4);
        }
      `}</style>

      {showLogin && (
        <CurtainLogin onLogin={handleLogin} isLoading={isLoadingData} isOpen={curtainsOpen} />
      )}

      {isAuthenticated && (
        <div className="animate-in fade-in duration-1000">
          <div className="h-3 bg-purple-200 opacity-40" />

          {/* MOBILE OVERLAY MENU */}
          {isMenuOpen && (
            <div className="fixed inset-0 z-[100] bg-white animate-in slide-in-from-top-full duration-300 flex flex-col items-center justify-center space-y-8">
              <button onClick={() => setIsMenuOpen(false)} className="absolute top-8 right-8 text-purple-300">
                <X size={32}/>
              </button>
              {['HOME', 'TRAVEL', 'GIFT', 'QA'].map((tab) => (
                <button key={tab} onClick={() => navigateTo(tab)} className="text-3xl text-purple-900 italic hover:text-purple-400">
                  {tab === 'HOME' ? 'THE WEDDING' : tab === 'QA' ? 'Q&A' : tab}
                </button>
              ))}
            </div>
          )}

          {/* MAIN NAVIGATION BAR */}
          <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-purple-50 px-6 py-4">
            <div className="max-w-6xl mx-auto flex justify-between items-center relative">
              
              {/* 1. LEFT SIDE */}
              <div className="flex items-center">
                {/* Mobile: Hamburger Menu (Left) */}
                <button onClick={() => setIsMenuOpen(true)} className="md:hidden text-purple-400 p-1">
                  <Menu size={24}/>
                </button>

                {/* Desktop: Logo (Left) */}
                <button 
                  onClick={() => navigateTo('HOME')} 
                  className="hidden md:block text-purple-900 italic text-2xl hover:opacity-70 transition-opacity"
                >
                  L & D
                </button>
              </div>

              {/* 2. CENTER (Absolute Positioned) */}
              
              {/* Mobile: Logo (Centered) */}
              <button 
                onClick={() => navigateTo('HOME')} 
                className="md:hidden absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-purple-900 italic text-xl"
              >
                L & D
              </button>

              {/* Desktop: Navigation Links (Centered) */}
              <div className="hidden md:flex gap-8 text-[10px] uppercase tracking-[0.2em] font-sans font-bold text-slate-400 absolute left-1/2 -translate-x-1/2">
                {['HOME', 'TRAVEL', 'QA', 'GIFT'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => navigateTo(tab)}
                    className={currentPage === tab ? "text-purple-600 border-b border-purple-600 pb-1" : "hover:text-purple-400"}
                  >
                    {tab === 'HOME' ? 'THE WEDDING' : tab === 'QA' ? 'Q&A' : tab}
                  </button>
                ))}
              </div>

              {/* 3. RIGHT SIDE: RSVP Button */}
              <div>
                <button 
                  onClick={() => navigateTo('RSVP')} 
                  className="bg-purple-900 text-white px-5 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest shadow-md hover:bg-purple-800 hover:scale-105 transition-all transform active:scale-95"
                >
                  RSVP
                </button>
              </div>

            </div>
          </nav>

          {renderContent()}

          <footer className="py-20 text-center text-slate-300 text-[10px] tracking-[0.6em] uppercase font-sans">
            <p>© 2026 Lorraine Goveas & Daniel Ocampo</p>
          </footer>
        </div>
      )}
    </div>
  );
};

export default WeddingSite;
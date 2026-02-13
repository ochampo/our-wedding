import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
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
import AddToCalendar from './AddToCalendar.jsx';
import HeartLogo from './components/HeartLogo.jsx';
import { parseTimeData } from './utils/dateHelpers';
import watercolor_floral from './components/images/watercolor_floral.jpg';
import RenderSchedule from './RenderSchedule.jsx';

const WeddingSite = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // --- AUTH & REVEAL STATE ---
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showLogin, setShowLogin] = useState(true);
  const [curtainsOpen, setCurtainsOpen] = useState(false);
  const [isLoadingData, setIsLoadingData] = useState(false);

  // --- CONTENT STATE ---
  const [allGuests, setAllGuests] = useState([]);
  const [rsvpMap, setRsvpMap] = useState({});
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  const GOOGLE_URL = import.meta.env.VITE_GOOGLE_SCRIPT_URL;

  // Map routes to page names for nav highlighting
  const getPageFromPath = (path) => {
    switch (path) {
      case '/': return 'HOME';
      case '/rsvp': return 'RSVP';
      case '/hotel': return 'HOTEL';
      case '/gift': return 'GIFT';
      case '/qa': return 'QA';
      default: return 'HOME';
    }
  };

  const currentPage = getPageFromPath(location.pathname);

  // --- NAVIGATION LOGIC ---
  const navigateTo = (page) => {
    const routes = {
      'HOME': '/',
      'RSVP': '/rsvp',
      'HOTEL': '/hotel',
      'GIFT': '/gift',
      'QA': '/qa'
    };
    navigate(routes[page] || '/');
    setIsMenuOpen(false);
    window.scrollTo(0, 0);
  };

  // --- COUNTDOWN TIMER ---
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

  // --- DATA FETCHING ---
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
      setIsAuthenticated(true);
      setCurtainsOpen(true);
      setTimeout(() => {
        setShowLogin(false);
      }, 3500);
    });
  };

  // --- SUB-RENDER COMPONENTS ---
const renderHome = () => (
  <main className="relative animate-in fade-in duration-1000 bg-slate-50">
    
    {/* =========================================
        1. GLOBAL BACKGROUNDS
       ========================================= */}
    
    {/* DESKTOP: One big fixed image */}
    <div className="hidden md:block fixed inset-0 z-0 pointer-events-none">
      <img 
        src={watercolor_floral} 
        alt="Wedding Background" 
        className="w-full h-full object-cover opacity-60" 
      />
    </div>

    {/* MOBILE: Tiled Wallpaper (50% Scaling) */}
    <div 
      className="block md:hidden fixed inset-0 z-0 pointer-events-none opacity-60"
      style={{
        backgroundImage: `url(${watercolor_floral})`,
        backgroundRepeat: 'repeat',
        backgroundSize: '320%' 
      }}
    >
       <div className="absolute inset-0 bg-white/30" />
    </div>


    {/* =========================================
        2. HERO SECTION
       ========================================= */}
    <header className="h-screen w-full relative z-20 flex flex-col justify-end items-center pb-12 text-center px-4 overflow-hidden">
      
      {/* Background Photo */}
      <div className="absolute inset-0 z-0">
        <img
          src="./CoverPhoto.jpg"
          alt="Lorraine and Daniel"
          className="w-full h-full object-cover"
        />
        {/* Gradient to make text pop */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
      </div>

      {/* --- MAIN TEXT CONTENT --- 
          mb-16: This pushes the text block UP away from the scroll indicator.
          If you want it higher, change to mb-24. If lower, mb-8.
      */}
      <div className="relative z-10 w-full max-w-4xl mx-auto text-white space-y-6 mb-16 md:mb-24">
        
        {/* Top Label */}
        <div className="animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300">
          <p className="tracking-[0.5em] uppercase text-[10px] md:text-sm font-sans font-semibold text-white/90 mb-2">
            We're getting married
          </p>
        </div>

        {/* Names & Date */}
        <div className="animate-in slide-in-from-bottom-4 duration-1000 delay-500">
          <h1 className="text-5xl md:text-9xl font-light italic leading-none drop-shadow-xl">
            Lorraine
            <span className="block sm:inline font-sans font-thin text-3xl md:text-6xl align-middle mx-2 opacity-80">&</span>
            Daniel
          </h1>
          <p className="text-3xl md:text-6xl font-serif italic tracking-wide mt-4 drop-shadow-md">
            July 3, 2026
          </p>
        </div>

        {/* Countdown */}
        <div className="grid grid-cols-4 gap-4 md:gap-12 max-w-lg mx-auto pt-6 animate-in slide-in-from-bottom-8 duration-1000 delay-700 border-t border-white/20 mt-6">
          {[
            { label: 'Days', value: timeLeft.days },
            { label: 'Hrs', value: timeLeft.hours },
            { label: 'Mins', value: timeLeft.minutes },
            { label: 'Secs', value: timeLeft.seconds }
          ].map((t, i) => (
            <div key={i} className="text-center">
              <span className="block text-xl md:text-4xl font-serif italic font-light">{t.value}</span>
              <span className="block text-[8px] md:text-[9px] uppercase tracking-widest text-white/70 mt-1">{t.label}</span>
            </div>
          ))}
        </div>

      </div>

      {/* --- SCROLL INDICATOR (Restored!) --- 
          This sits at the very bottom (pb-12) independent of the text above.
      */}
      <div className="relative z-10 animate-bounce flex flex-col items-center">
        <p className="text-[8px] md:text-xs uppercase tracking-widest bg-black/30 px-3 py-1.5 rounded-full backdrop-blur-sm text-white mb-2">
          Scroll for Details
        </p>
        {/* Simple Chevron Arrow */}
        <div className="w-5 h-5 border-b-2 border-r-2 border-white transform rotate-45" />
      </div>

    </header>


    {/* =========================================
        3. ITINERARY SECTION
       ========================================= */}
    <section className="relative py-12 md:py-24 px-4 md:px-6 z-10 flex justify-center">
      <div className="w-full max-w-5xl text-center">
        
        {/* Title Box */}
        <div className="inline-block p-8 bg-white/80 backdrop-blur-md rounded-3xl shadow-sm border border-white/60 mb-12">
          <h2 className="text-4xl md:text-5xl font-light italic text-purple-900 mb-4">The Wedding Itinerary</h2>
          <p className="text-slate-700 text-lg tracking-wide font-medium mb-6">
            Please join us for the ceremony followed by the reception.
          </p>
          <button
            onClick={() => navigateTo('RSVP')}
            className="bg-purple-900 text-white px-8 py-4 rounded-full mt-4 text-base font-bold uppercase tracking-widest shadow-lg hover:bg-purple-800 hover:scale-105 transition-all transform active:scale-95"
          >
            RSVP
          </button>
        </div>

        <RenderSchedule />
      </div>
    </section>


    {/* =========================================
        4. OUR STORY SECTION
       ========================================= */}
    <section className="relative py-12 md:py-24 px-4 md:px-6 z-10 flex justify-center">
      <div className="w-full max-w-3xl">
        <RenderStory />
      </div>
    </section>


    {/* =========================================
        5. GAMES SECTION
       ========================================= */}
    <section id="crossword-section" className="relative py-12 md:py-24 px-4 md:px-6 z-10 flex justify-center">
      <div className="w-full max-w-4xl text-center">
        <h2 className="text-3xl font-light italic text-purple-900 mb-8">Crossword Puzzle</h2>
        <WeddingCrossword />
      </div>
    </section>

  </main>
);
  const renderContent = () => {
    switch (currentPage) {
      case 'HOME': return renderHome();
      case 'RSVP': return <RenderRSVP allGuests={allGuests} rsvpMap={rsvpMap} googleScriptUrl={GOOGLE_URL} />;
      case 'HOTEL': return <RenderTravel />;
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
          

          {/* MOBILE OVERLAY MENU */}
          {isMenuOpen && (
            <div className="fixed inset-0 z-[100] bg-white animate-in slide-in-from-top-full duration-300 flex flex-col items-center justify-center space-y-8">
              <button onClick={() => setIsMenuOpen(false)} className="absolute top-8 right-8 text-purple-300">
                <X size={32} />
              </button>
              {['HOME', 'HOTEL', 'GIFT', 'QA', 'RSVP'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => navigateTo(tab)}
                  className="text-3xl md:text-4xl text-center text-purple-900 mb-8 font-medium tracking-tight"
                >
                  {tab === 'HOME' ? 'THE WEDDING' : tab === 'QA' ? 'Q&A' : tab}
                </button>
              ))}
            </div>
          )}

          {/* MAIN NAVIGATION BAR */}
          <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-purple-50 px-6 py-4">
            <div className="max-w-6xl mx-auto flex justify-between items-center relative">

              {/* LEFT SIDE: Mobile Menu / Desktop Logo */}
              <div className="flex items-center">
                <button onClick={() => setIsMenuOpen(true)} className="md:hidden text-purple-400 p-1">
                  <Menu size={24} />
                </button>
                <div className="hidden md:block">
                  <HeartLogo size="desktop" onClick={() => navigateTo('HOME')} />
                </div>
              </div>

              {/* CENTER: Mobile Logo / Desktop Links */}
              <div className="md:hidden absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                <HeartLogo size="mobile" onClick={() => navigateTo('HOME')} />
              </div>

              <div className="hidden md:flex gap-8 text-[10px] uppercase tracking-[0.2em] font-sans font-bold text-slate-400 absolute left-1/2 -translate-x-1/2">
                {['HOME', 'HOTEL', 'QA', 'GIFT'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => navigateTo(tab)}
                    className={currentPage === tab ? "text-purple-600 border-b border-purple-600 pb-1" : "hover:text-purple-400"}
                  >
                    {tab === 'HOME' ? 'THE WEDDING' : tab === 'QA' ? 'Q&A' : tab}
                  </button>
                ))}
              </div>

              {/* RIGHT SIDE: RSVP Button */}
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

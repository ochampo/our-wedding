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
    <main className="animate-in fade-in duration-1000">
      {/* 1. HERO SECTION */}
      <header className="h-screen w-full relative flex flex-col items-center justify-between py-12 md:py-16 text-center px-4 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="./CoverPhoto.jpg"
            alt="Lorraine and Daniel"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60" />
        </div>

        <div className="relative z-10 animate-in fade-in slide-in-from-top-4 duration-1000 delay-300">
          <p className="tracking-[0.5em] uppercase text-[10px] md:text-base font-sans font-semibold text-white/90">
            We're getting married
          </p>
        </div>

        <div className="relative z-10 text-white space-y-4 md:space-y-8 mt-16 md:mt-24">
          <div className="animate-in slide-in-from-bottom-4 duration-1000 delay-500">
            <h1 className="px-4 text-5xl md:text-9xl font-light italic leading-none drop-shadow-lg">
              Lorraine
              <span className="block sm:inline font-sans font-thin text-3xl md:text-6xl align-middle mx-2 opacity-70">&</span>
              Daniel
            </h1>
            <div className="flex flex-col items-center gap-2 md:gap-3 mt-3 md:mt-4">
              <p className="text-3xl md:text-6xl font-serif italic tracking-wide text-white drop-shadow-md">
                July 3, 2026
              </p>
            </div>
          </div>

          {/* Countdown Display */}
          <div className="grid grid-cols-4 gap-4 md:gap-12 max-w-lg mx-auto pt-4 md:pt-8 animate-in slide-in-from-bottom-8 duration-1000 delay-700">
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

        <div className="relative z-10 pb-4 md:pb-8">
          <div className="animate-bounce text-white flex flex-col items-center">
            <p className="text-[8px] md:text-xs uppercase tracking-widest bg-black/30 px-3 py-1.5 md:px-4 md:py-2 rounded-full backdrop-blur-sm">
              Scroll for Details
            </p>

            {/* Mobile: Simple chevron arrows */}
            <div className="md:hidden mt-2 flex flex-col items-center">
              <svg className="w-5 h-5 text-white/80 -mb-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
              <svg className="w-5 h-5 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>

            {/* Desktop: Mouse scroll indicator */}
            <div className="hidden md:flex mt-3 w-10 h-14 border-2 border-white/50 rounded-full justify-center pt-2">
              <div className="w-2 h-4 bg-white/70 rounded-full animate-pulse" />
            </div>
          </div>
        </div>
      </header>

{/* 2. LOCATIONS & TIMELINE SECTION */}
      <section className="relative py-24 px-6 overflow-hidden min-h-screen">
        
        {/* --- BACKGROUND WALLPAPER --- */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          {/* A. MOBILE STACK (3 Images to prevent stretching) */}
          <div className="block md:hidden w-full h-full flex flex-col">
             <div className="flex-1 relative w-full overflow-hidden">
                 <img src={watercolor_floral} alt="bg" className="w-full h-full object-cover opacity-50 object-top" />
             </div>
             <div className="flex-1 relative w-full overflow-hidden -mt-10">
                 <img src={watercolor_floral} alt="bg" className="w-full h-full object-cover opacity-30 scale-x-[-1]" />
             </div>
             <div className="h-auto relative w-full overflow-hidden -mt-10">
                 <img src={watercolor_floral} alt="bg" className="w-full h-auto object-cover opacity-60 rotate-180" />
             </div>
          </div>

          {/* B. DESKTOP SINGLE IMAGE */}
          <div className="hidden md:block w-full h-full">
             <img src={watercolor_floral} alt="bg" className="w-full h-full object-cover opacity-40" />
          </div>
        </div>

        {/* --- CONTENT --- */}
        <div className="relative z-10 max-w-5xl mx-auto">
          
          {/* HEADER (Wrapped in Glass Card for readability) */}
          <div className="text-center mb-16">
            <div className="inline-block p-8 bg-white/80 backdrop-blur-md rounded-3xl shadow-sm border border-white/60 mb-8">
                <h2 className="text-3xl font-light italic text-purple-900 mb-4">The Wedding Itinerary</h2>
                <p className="text-slate-600 text-base tracking-wide font-medium">
                  Please join us for the ceremony followed by the reception.
                </p>
                <button
                  onClick={() => navigateTo('RSVP')}
                  className="bg-purple-900 text-white px-8 py-4 rounded-full mt-8 text-base font-bold uppercase tracking-widest shadow-lg hover:bg-purple-800 hover:scale-105 transition-all transform active:scale-95"
                >
                  RSVP
                </button>
            </div>
                            <RenderSchedule/>

          </div>
       
        </div>
      </section>

{/* 3. OUR STORY SECTION */}
<section className="relative py-24 px-6 overflow-hidden min-h-screen flex items-center justify-center">

  {/* --- BACKGROUND WALLPAPER --- */}
  <div className="absolute inset-0 z-0 pointer-events-none">
    
    {/* A. MOBILE STACK (Keep this as is, it's already optimized for scrolling) */}
    <div className="block md:hidden w-full h-full flex flex-col">
       <div className="flex-1 relative w-full overflow-hidden">
           <img src={watercolor_floral} alt="bg" className="w-full h-full object-cover opacity-50 object-top" />
       </div>
       <div className="flex-1 relative w-full overflow-hidden -mt-10">
           <img src={watercolor_floral} alt="bg" className="w-full h-full object-cover opacity-30 scale-x-[-1]" />
       </div>
       <div className="h-auto relative w-full overflow-hidden -mt-10">
           <img src={watercolor_floral} alt="bg" className="w-full h-auto object-cover opacity-60 rotate-180" />
       </div>
    </div>

    {/* B. DESKTOP SINGLE IMAGE (MIRRORED) */}
    <div className="hidden md:block w-full h-full">
       {/* ADDED: scale-x-[-1] 
           This flips the image horizontally. 
           Now the flowers will be on the opposite side of the section above it!
       */}
       <img 
         src={watercolor_floral} 
         alt="bg" 
         className="w-full h-full object-cover opacity-40 rotate-180 scale-x-[-1]" 
       />
    </div>

  </div>

  {/* --- CONTENT WRAPPER --- */}
  <div className="relative z-10 w-full max-w-3xl mx-auto text-center">
    <RenderStory />
  </div>

</section>


      {/* 4. GAMES SECTION */}
<section id="crossword-section" className="relative py-24 px-6 overflow-hidden min-h-screen">
  
  {/* --- BACKGROUND CONTAINER --- */}
  <div className="absolute inset-0 z-0 pointer-events-none">
    
    {/* A. MOBILE BACKGROUND (The "Stack" Fix) 
        - flex-col: Stacks images vertically
        - h-full: Fills the entire section height
    */}
    <div className="block md:hidden w-full h-full flex flex-col justify-between">
       {/* 1. Top Flower */}
       <div className="w-full flex-1 relative">
          <img 
            src={watercolor_floral} 
            alt="Top" 
            className="w-full h-full object-cover opacity-50 object-top" 
          />
       </div>

       {/* 2. Middle Flower (Flipped & Pulled up slightly to blend) */}
       <div className="w-full flex-1 relative -my-10">
          <img 
            src={watercolor_floral} 
            alt="Mid" 
            className="w-full h-full object-cover opacity-30 rotate-360" 
          />
       </div>

       {/* 3. Bottom Flower (Footer) */}
       <div className="w-full h-auto relative">
          <img 
            src={watercolor_floral} 
            alt="Bot" 
            className="w-full h-auto object-cover opacity-60 rotate-180" 
          />
       </div>
    </div>

    {/* B. DESKTOP BACKGROUND (Single Image) */}
    <img 
      src={watercolor_floral} 
      alt="Floral Background" 
      className="hidden md:block w-full h-full object-cover opacity-50 rotate-180 scale-x-[-1] scale-y-[-1]" 
    />
  </div>

  {/* --- CONTENT (Relative z-10 makes it sit ON TOP of the image) --- */}
  <div className="relative z-10 max-w-4xl mx-auto text-center">
    
    {/* The Crossword Component (Transparent) */}
    
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

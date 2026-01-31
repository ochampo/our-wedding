import { useState, useEffect } from 'react';
import { Heart, Loader } from 'lucide-react';
import SHA256 from 'crypto-js/sha256';

const CurtainLogin = ({ onLogin, isLoading, isOpen }) => {
  const [input, setInput] = useState("");
  const [error, setError] = useState(false);
  const [isFadingOut, setIsFadingOut] = useState(false);

  // Your local floral image path
  const FLORAL_PATH = "/src/components/images/Floral/Moraea_polystachya_flowers.png";

  useEffect(() => {
    if (isOpen) setIsFadingOut(true);
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

  return (
    <div className={`fixed inset-0 z-[100] overflow-hidden flex items-center justify-center bg-transparent transition-all duration-1000 ${isOpen ? 'pointer-events-none' : ''}`}>

      {/* Background Glow behind emblem */}
      {!isOpen && <div className="absolute inset-0 bg-[radial-gradient(circle,_rgba(88,28,135,0.4)_0%,_transparent_70%)] animate-pulse z-0" />}

      {/* --- LEFT CURTAIN --- */}
      <div
        className={`absolute top-0 bottom-0 left-0 z-20 transition-transform duration-[3000ms] ease-[cubic-bezier(0.4,0,0.2,1)] curtain-texture overflow-hidden ${isOpen ? '-translate-x-full' : 'translate-x-0'}`}
        style={{ width: '50.5%' }}
      >
        {/* DESKTOP VERSION - Circular spread pattern (hidden on mobile) */}
        <div className="hidden md:block">
          {/* TOP ARC */}
          <img src={FLORAL_PATH} className="absolute top-[-15%] left-[-25%] w-[90%] opacity-90 rotate-[-20deg] pointer-events-none z-24" alt="" />
          <img src={FLORAL_PATH} className="absolute top-[-18%] left-[15%] w-[85%] opacity-88 rotate-[-5deg] pointer-events-none z-23" alt="" />
          <img src={FLORAL_PATH} className="absolute top-[-12%] left-[50%] w-[90%] opacity-90 rotate-[15deg] pointer-events-none z-24" alt="" />

          {/* MIDDLE SIDES */}
          <img src={FLORAL_PATH} className="absolute top-[20%] left-[-30%] w-[85%] opacity-85 rotate-[-35deg] pointer-events-none z-22" alt="" />
          <img src={FLORAL_PATH} className="absolute top-[25%] left-[55%] w-[85%] opacity-85 rotate-[35deg] pointer-events-none z-22" alt="" />

          {/* CENTER SIDES */}
          <img src={FLORAL_PATH} className="absolute top-[45%] left-[-35%] w-[90%] opacity-82 rotate-[-45deg] pointer-events-none z-21" alt="" />
          <img src={FLORAL_PATH} className="absolute top-[50%] left-[50%] w-[90%] opacity-82 rotate-[45deg] pointer-events-none z-21" alt="" />

          {/* LOWER SIDES */}
          <img src={FLORAL_PATH} className="absolute top-[70%] left-[-30%] w-[85%] opacity-85 rotate-[-35deg] pointer-events-none z-22" alt="" />
          <img src={FLORAL_PATH} className="absolute top-[68%] left-[55%] w-[85%] opacity-85 rotate-[35deg] pointer-events-none z-22" alt="" />

          {/* BOTTOM ARC */}
          <img src={FLORAL_PATH} className="absolute top-[88%] left-[-25%] w-[90%] opacity-90 rotate-[-15deg] pointer-events-none z-24" alt="" />
          <img src={FLORAL_PATH} className="absolute top-[92%] left-[15%] w-[85%] opacity-88 rotate-[5deg] pointer-events-none z-23" alt="" />
          <img src={FLORAL_PATH} className="absolute top-[85%] left-[50%] w-[90%] opacity-90 rotate-[20deg] pointer-events-none z-24" alt="" />
        </div>

        {/* MOBILE VERSION - Circular arrangement (hidden on desktop) */}
        <div className="block md:hidden">
          {/* TOP ARC */}
          <img src={FLORAL_PATH} className="absolute top-[-12%] left-[-35%] w-[120%] opacity-90 rotate-[-25deg] pointer-events-none z-24" alt="" />
          <img src={FLORAL_PATH} className="absolute top-[-15%] left-[5%] w-[115%] opacity-88 rotate-[-8deg] pointer-events-none z-23" alt="" />
          <img src={FLORAL_PATH} className="absolute top-[-10%] left-[40%] w-[120%] opacity-90 rotate-[20deg] pointer-events-none z-24" alt="" />

          {/* UPPER SIDES */}
          <img src={FLORAL_PATH} className="absolute top-[8%] left-[-40%] w-[115%] opacity-86 rotate-[-35deg] pointer-events-none z-22" alt="" />
          <img src={FLORAL_PATH} className="absolute top-[12%] left-[35%] w-[115%] opacity-86 rotate-[35deg] pointer-events-none z-22" alt="" />

          {/* MIDDLE SIDES */}
          <img src={FLORAL_PATH} className="absolute top-[28%] left-[-45%] w-[120%] opacity-84 rotate-[-45deg] pointer-events-none z-21" alt="" />
          <img src={FLORAL_PATH} className="absolute top-[32%] left-[30%] w-[120%] opacity-84 rotate-[45deg] pointer-events-none z-21" alt="" />

          {/* CENTER SIDES */}
          <img src={FLORAL_PATH} className="absolute top-[48%] left-[-40%] w-[115%] opacity-82 rotate-[-40deg] pointer-events-none z-20" alt="" />
          <img src={FLORAL_PATH} className="absolute top-[52%] left-[35%] w-[115%] opacity-82 rotate-[40deg] pointer-events-none z-20" alt="" />

          {/* LOWER SIDES */}
          <img src={FLORAL_PATH} className="absolute top-[68%] left-[-45%] w-[120%] opacity-84 rotate-[-35deg] pointer-events-none z-21" alt="" />
          <img src={FLORAL_PATH} className="absolute top-[72%] left-[30%] w-[120%] opacity-84 rotate-[35deg] pointer-events-none z-21" alt="" />

          {/* BOTTOM ARC */}
          <img src={FLORAL_PATH} className="absolute top-[88%] left-[-35%] w-[120%] opacity-90 rotate-[-20deg] pointer-events-none z-24" alt="" />
          <img src={FLORAL_PATH} className="absolute top-[92%] left-[5%] w-[115%] opacity-88 rotate-[8deg] pointer-events-none z-23" alt="" />
          <img src={FLORAL_PATH} className="absolute top-[85%] left-[40%] w-[120%] opacity-90 rotate-[25deg] pointer-events-none z-24" alt="" />
        </div>

        <div className="absolute right-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-yellow-700 via-yellow-300 to-yellow-800 shadow-[0_0_20px_rgba(234,179,8,0.5)] z-40" />
      </div>

      {/* --- RIGHT CURTAIN --- */}
      <div
        className={`absolute top-0 bottom-0 right-0 z-20 transition-transform duration-[3000ms] ease-[cubic-bezier(0.4,0,0.2,1)] curtain-texture overflow-hidden ${isOpen ? 'translate-x-full' : 'translate-x-0'}`}
        style={{ width: '50.5%' }}
      >
        {/* DESKTOP VERSION - Circular spread pattern (hidden on mobile) */}
        <div className="hidden md:block">
          {/* TOP ARC */}
          <img src={FLORAL_PATH} className="absolute top-[-15%] right-[-25%] w-[90%] opacity-90 rotate-[20deg] scale-x-[-1] pointer-events-none z-24" alt="" />
          <img src={FLORAL_PATH} className="absolute top-[-18%] right-[15%] w-[85%] opacity-88 rotate-[5deg] scale-x-[-1] pointer-events-none z-23" alt="" />
          <img src={FLORAL_PATH} className="absolute top-[-12%] right-[50%] w-[90%] opacity-90 rotate-[-15deg] scale-x-[-1] pointer-events-none z-24" alt="" />

          {/* MIDDLE SIDES */}
          <img src={FLORAL_PATH} className="absolute top-[20%] right-[-30%] w-[85%] opacity-85 rotate-[35deg] scale-x-[-1] pointer-events-none z-22" alt="" />
          <img src={FLORAL_PATH} className="absolute top-[25%] right-[55%] w-[85%] opacity-85 rotate-[-35deg] scale-x-[-1] pointer-events-none z-22" alt="" />

          {/* CENTER SIDES */}
          <img src={FLORAL_PATH} className="absolute top-[45%] right-[-35%] w-[90%] opacity-82 rotate-[45deg] scale-x-[-1] pointer-events-none z-21" alt="" />
          <img src={FLORAL_PATH} className="absolute top-[50%] right-[50%] w-[90%] opacity-82 rotate-[-45deg] scale-x-[-1] pointer-events-none z-21" alt="" />

          {/* LOWER SIDES */}
          <img src={FLORAL_PATH} className="absolute top-[70%] right-[-30%] w-[85%] opacity-85 rotate-[35deg] scale-x-[-1] pointer-events-none z-22" alt="" />
          <img src={FLORAL_PATH} className="absolute top-[68%] right-[55%] w-[85%] opacity-85 rotate-[-35deg] scale-x-[-1] pointer-events-none z-22" alt="" />

          {/* BOTTOM ARC */}
          <img src={FLORAL_PATH} className="absolute top-[88%] right-[-25%] w-[90%] opacity-90 rotate-[15deg] scale-x-[-1] pointer-events-none z-24" alt="" />
          <img src={FLORAL_PATH} className="absolute top-[92%] right-[15%] w-[85%] opacity-88 rotate-[-5deg] scale-x-[-1] pointer-events-none z-23" alt="" />
          <img src={FLORAL_PATH} className="absolute top-[85%] right-[50%] w-[90%] opacity-90 rotate-[-20deg] scale-x-[-1] pointer-events-none z-24" alt="" />
        </div>

        {/* MOBILE VERSION - Circular arrangement (hidden on desktop) */}
        <div className="block md:hidden">
          {/* TOP ARC */}
          <img src={FLORAL_PATH} className="absolute top-[-12%] right-[-35%] w-[120%] opacity-90 rotate-[25deg] scale-x-[-1] pointer-events-none z-24" alt="" />
          <img src={FLORAL_PATH} className="absolute top-[-15%] right-[5%] w-[115%] opacity-88 rotate-[8deg] scale-x-[-1] pointer-events-none z-23" alt="" />
          <img src={FLORAL_PATH} className="absolute top-[-10%] right-[40%] w-[120%] opacity-90 rotate-[-20deg] scale-x-[-1] pointer-events-none z-24" alt="" />

          {/* UPPER SIDES */}
          <img src={FLORAL_PATH} className="absolute top-[8%] right-[-40%] w-[115%] opacity-86 rotate-[35deg] scale-x-[-1] pointer-events-none z-22" alt="" />
          <img src={FLORAL_PATH} className="absolute top-[12%] right-[35%] w-[115%] opacity-86 rotate-[-35deg] scale-x-[-1] pointer-events-none z-22" alt="" />

          {/* MIDDLE SIDES */}
          <img src={FLORAL_PATH} className="absolute top-[28%] right-[-45%] w-[120%] opacity-84 rotate-[45deg] scale-x-[-1] pointer-events-none z-21" alt="" />
          <img src={FLORAL_PATH} className="absolute top-[32%] right-[30%] w-[120%] opacity-84 rotate-[-45deg] scale-x-[-1] pointer-events-none z-21" alt="" />

          {/* CENTER SIDES */}
          <img src={FLORAL_PATH} className="absolute top-[48%] right-[-40%] w-[115%] opacity-82 rotate-[40deg] scale-x-[-1] pointer-events-none z-20" alt="" />
          <img src={FLORAL_PATH} className="absolute top-[52%] right-[35%] w-[115%] opacity-82 rotate-[-40deg] scale-x-[-1] pointer-events-none z-20" alt="" />

          {/* LOWER SIDES */}
          <img src={FLORAL_PATH} className="absolute top-[68%] right-[-45%] w-[120%] opacity-84 rotate-[35deg] scale-x-[-1] pointer-events-none z-21" alt="" />
          <img src={FLORAL_PATH} className="absolute top-[72%] right-[30%] w-[120%] opacity-84 rotate-[-35deg] scale-x-[-1] pointer-events-none z-21" alt="" />

          {/* BOTTOM ARC */}
          <img src={FLORAL_PATH} className="absolute top-[88%] right-[-35%] w-[120%] opacity-90 rotate-[20deg] scale-x-[-1] pointer-events-none z-24" alt="" />
          <img src={FLORAL_PATH} className="absolute top-[92%] right-[5%] w-[115%] opacity-88 rotate-[-8deg] scale-x-[-1] pointer-events-none z-23" alt="" />
          <img src={FLORAL_PATH} className="absolute top-[85%] right-[40%] w-[120%] opacity-90 rotate-[-25deg] scale-x-[-1] pointer-events-none z-24" alt="" />
        </div>

        <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-yellow-700 via-yellow-300 to-yellow-800 shadow-[0_0_20px_rgba(234,179,8,0.5)] z-40" />
      </div>

      {/* --- CENTER LOGIN EMBLEM --- */}
      <div className={`relative z-30 transition-all duration-1000 transform ${isFadingOut ? 'opacity-0 scale-125 blur-3xl' : 'opacity-100 scale-100'}`}>
        <div className="bg-black/40 backdrop-blur-3xl p-12 rounded-full border border-white/10 w-[380px] h-[380px] flex flex-col items-center justify-center text-center shadow-[0_0_100px_rgba(0,0,0,0.8)]">
          <Heart className="mx-auto text-yellow-500 fill-yellow-500/20 mb-4" size={32} />
          <h1 className="font-serif italic text-4xl text-white mb-2">Lorraine & Daniel</h1>
          <div className="h-[1px] w-20 bg-gradient-to-r from-transparent via-yellow-500 to-transparent mx-auto mb-6" />

          <form onSubmit={handleSubmit} className="w-full space-y-4 px-6">
            <input
              type="password"
              value={input}
              onChange={(e) => { setInput(e.target.value); setError(false); }}
              placeholder="ENTER PASSCODE"
              className="w-full p-3 bg-white/5 border border-white/10 rounded-lg text-center text-white placeholder:text-white/20 focus:ring-1 focus:ring-yellow-500 outline-none text-xs tracking-widest font-sans"
            />
            {error && <p className="text-red-400 text-[10px] uppercase font-bold tracking-widest">Incorrect Access Code</p>}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-4 bg-yellow-600 hover:bg-yellow-500 text-white rounded-sm font-bold uppercase tracking-[0.3em] text-[10px] transition-all shadow-xl active:scale-95"
            >
              {isLoading ? <Loader className="animate-spin mx-auto" size={14} /> : "Unlock Invitation"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CurtainLogin;

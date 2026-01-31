import React, { useState, useEffect } from 'react';
import { Loader, Heart } from 'lucide-react';
import SHA256 from 'crypto-js/sha256';

// REPLACE THIS WITH YOUR UPLOADED FILE PATH
import WeddingArchBg from './components/images/floral/currtain.jpg'; 

const CurtainLogin = ({ onLogin, isLoading, isOpen }) => {
  const [input, setInput] = useState("");
  const [error, setError] = useState(false);
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    if (isOpen) setIsFadingOut(true);
  }, [isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLoading) return;

    // Default hash for "love"
    const inputHash = SHA256(input.toLowerCase().trim()).toString();
    const SECRET_HASH = "dfa3569a46b1a13c24c9f385da140f4763a3fbb70f8eebe0f29ba535145d32ca";

    if (inputHash === SECRET_HASH) {
      onLogin();
    } else {
      setError(true);
      setInput("");
    }
  };

  const curtainTransition = "transition-transform duration-[3000ms] ease-[cubic-bezier(0.6,0,0.2,1)]";

  return (
    // CHANGE 1: 'bg-white' is changed to 'bg-transparent'
    // This ensures that when curtains open, you see your actual website content behind them.
    <div className={`fixed inset-0 z-[100] overflow-hidden flex items-center justify-center bg-transparent transition-all duration-1000 ${isOpen ? 'pointer-events-none' : ''}`}>
      
      {/* === LEFT CURTAIN PANEL === */}
      <div className={`absolute top-0 bottom-0 left-0 w-1/2 overflow-hidden z-20 ${curtainTransition} ${isOpen ? '-translate-x-full' : 'translate-x-0'}`}>
        <img 
          src={WeddingArchBg} 
          alt="Left Curtain"
          className="absolute top-0 left-0 h-full w-[200%] max-w-none object-cover object-top" 
          draggable="false"
        />
        {/* Shadow for depth */}
        <div className="absolute top-0 bottom-0 right-0 w-24 bg-gradient-to-l from-black/10 to-transparent pointer-events-none" />
      </div>

      {/* === RIGHT CURTAIN PANEL === */}
      <div className={`absolute top-0 bottom-0 right-0 w-1/2 overflow-hidden z-20 ${curtainTransition} ${isOpen ? 'translate-x-full' : 'translate-x-0'}`}>
        <img 
          src={WeddingArchBg} 
          alt="Right Curtain"
          className="absolute top-0 left-[-100%] h-full w-[200%] max-w-none object-cover object-top" 
          draggable="false"
        />
        {/* Shadow for depth */}
        <div className="absolute top-0 bottom-0 left-0 w-24 bg-gradient-to-r from-black/10 to-transparent pointer-events-none" />
      </div>

      {/* === CENTER FORM === */}
      <div className={`relative z-30 transition-all duration-[1500ms] transform ${isFadingOut ? 'opacity-0 scale-110 blur-xl' : 'opacity-100 scale-100'}`}>
        
        {/* Frosted Glass Container */}
        <div className="bg-white/30 backdrop-blur-md border border-white/40 p-10 rounded-full w-[380px] h-[380px] flex flex-col items-center justify-center text-center shadow-[0_10px_40px_rgba(0,0,0,0.1)]">
          
          <Heart className="text-pink-900/60 mb-4 animate-pulse" size={24} />

          <h1 className="font-serif italic text-3xl text-gray-900 tracking-widest mb-2 drop-shadow-sm">
            Lorraine & Daniel
          </h1>
          <p className="text-[10px] text-gray-700 uppercase tracking-[0.4em] mb-8 font-sans font-semibold">
            Please enter passcode
          </p>

          <form onSubmit={handleSubmit} className="w-full space-y-4 px-6">
            <div className="relative">
              <input
                type="password"
                value={input}
                onChange={(e) => { setInput(e.target.value); setError(false); }}
                placeholder="PASSCODE"
                className="w-full bg-white/70 border border-white/50 rounded-sm p-3 text-center text-gray-800 placeholder:text-gray-500 focus:bg-white focus:border-pink-300 outline-none text-xs tracking-[0.3em] font-sans transition-all shadow-inner"
              />
              {error && (
                <p className="absolute -bottom-6 left-0 right-0 text-red-600 text-[9px] uppercase font-bold tracking-[0.2em] animate-pulse">
                  Incorrect
                </p>
              )}
            </div>
           
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 bg-gray-900/90 hover:bg-gray-800 text-white rounded-sm font-bold uppercase tracking-[0.3em] text-[9px] transition-all duration-500 shadow-lg active:scale-95 mt-2"
            >
              {isLoading ? <Loader className="animate-spin mx-auto" size={14} /> : "Unlock"}
            </button>
          </form>

        </div>
      </div>

    </div>
  );
};

export default CurtainLogin;
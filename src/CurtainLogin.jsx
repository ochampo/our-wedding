import React, { useState, useEffect } from 'react';
import { Loader, Heart, Eye, EyeOff } from 'lucide-react';
import SHA256 from 'crypto-js/sha256';

// Your specific image path
import WeddingArchBg from './components/images/Floral/curtain.jpg'; 

const CurtainLogin = ({ onLogin, isLoading, isOpen }) => {
  const [input, setInput] = useState("");
  const [error, setError] = useState(false);
  const [isFadingOut, setIsFadingOut] = useState(false);
  
  // New state to toggle password visibility
  const [showPassword, setShowPassword] = useState(false);

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
      setTimeout(() => setError(false), 820); 
    }
  };

  const curtainTransition = "transition-transform duration-[3000ms] ease-[cubic-bezier(0.6,0,0.2,1)]";

  return (
    <>
      <style>{`
        @keyframes shake {
          10%, 90% { transform: translate3d(-1px, 0, 0); }
          20%, 80% { transform: translate3d(2px, 0, 0); }
          30%, 50%, 70% { transform: translate3d(-4px, 0, 0); }
          40%, 60% { transform: translate3d(4px, 0, 0); }
        }
        .shake-animation {
          animation: shake 0.82s cubic-bezier(.36,.07,.19,.97) both;
        }
      `}</style>

      <div className={`fixed inset-0 z-[100] overflow-hidden flex items-center justify-center bg-transparent transition-all duration-1000 ${isOpen ? 'pointer-events-none' : ''}`}>
        
        {/* === LEFT CURTAIN PANEL === */}
        <div className={`absolute top-0 bottom-0 left-0 w-1/2 overflow-hidden z-20 ${curtainTransition} ${isOpen ? '-translate-x-full' : 'translate-x-0'}`}>
          <img 
            src={WeddingArchBg} 
            alt="Left Curtain"
            className="absolute top-0 left-0 h-full w-[200%] max-w-none object-cover object-top" 
            draggable="false"
          />
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
          <div className="absolute top-0 bottom-0 left-0 w-24 bg-gradient-to-r from-black/10 to-transparent pointer-events-none" />
        </div>

        {/* === CENTER FORM === */}
        <div className={`relative z-30 transition-all duration-[1500ms] transform ${isFadingOut ? 'opacity-0 scale-110 blur-xl' : 'opacity-100 scale-100'}`}>
          
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
                  // TOGGLE TYPE HERE: If showPassword is true -> "text", else -> "password"
                  type={showPassword ? "text" : "password"}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder={error ? "TRY AGAIN" : "PASSCODE"}
                  className={`
                    w-full rounded-sm p-3 pr-10 text-center text-gray-800 outline-none text-xs tracking-[0.3em] font-sans transition-all shadow-inner uppercase
                    ${error 
                      ? 'bg-red-50 border-2 border-red-500 placeholder:text-red-400 shake-animation' 
                      : 'bg-white/70 border border-white/50 placeholder:text-gray-500 focus:bg-white focus:border-pink-300'
                    }
                  `}
                />

                {/* EYE ICON TOGGLE SWITCH */}
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none transition-colors"
                >
                  {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                </button>
                
                {error && (
                  <div className="absolute -bottom-8 left-0 right-0 flex justify-center">
                    <span className="bg-red-500 text-white px-3 py-1 text-[10px] font-bold tracking-[0.2em] rounded-full shadow-md animate-pulse">
                      INCORRECT PASSCODE
                    </span>
                  </div>
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
    </>
  );
};

export default CurtainLogin;
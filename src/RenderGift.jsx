import { QRCodeSVG } from 'qrcode.react';
import { Gift } from 'lucide-react';
import watercolor_floral from './components/images/watercolor_floral.jpg';

const RenderGift = () => {
  const textGlow = {
    textShadow: '0 0 10px rgba(255, 255, 255, 0.9), 0 0 4px rgba(255, 255, 255, 1)'
  };

  return (
    <main className="relative min-h-screen w-full">

      {/* --- MOBILE BACKGROUNDS --- */}

      {/* 1. Top */}
      <img
        src={watercolor_floral}
        alt="Background Top"
        className="block md:hidden fixed top-0 left-0 w-full h-auto object-contain opacity-60 z-0"
      />

      {/* 2. Middle (The Fix) */}
      <img
        src={watercolor_floral}
        alt="Background Middle"
        className="block md:hidden fixed top-1/2 left-0 w-full h-auto object-contain opacity-50 z-0 -translate-y-1/2 scale-x-[-1]"
      />

      {/* 3. Bottom */}
      <img
        src={watercolor_floral}
        alt="Background Bottom"
        className="block md:hidden fixed bottom-0 left-0 w-full h-auto object-contain opacity-60 z-0 rotate-180"
      />

      {/* --- DESKTOP BACKGROUND --- */}
      <img
        src={watercolor_floral}
        alt="Background"
        className="hidden md:block fixed inset-0 w-full h-full object-cover z-0 opacity-50"
      />

      {/* --- MOBILE CONTENT --- */}
      <div className="block md:hidden relative z-10 py-12 px-4 mt-32 mb-24">
        <div className="bg-white/40 backdrop-blur-md rounded-3xl shadow-xl p-6 border border-white/60">

          <div className="flex justify-center mb-4">
            <div className="p-3 bg-purple-100/80 rounded-full shadow-sm">
               <Gift className="text-purple-900" size={24} />
            </div>
          </div>

          <h2 className="text-4xl text-center text-purple-900 mb-4 font-serif italic" style={textGlow}>Gift</h2>
          <p className="text-center text-slate-900 font-bold mb-8 text-sm" style={textGlow}>
            Your presence is the greatest gift! We kindly prefer a monetary contribution to start our next chapter.
          </p>

          <div className="space-y-6">
            {/* Daniel Mobile */}
            <div className="bg-white/40 p-6 rounded-2xl text-center border border-white/50 shadow-sm">
              <p className="text-purple-900 font-bold text-lg mb-2" style={textGlow}>Daniel</p>
              <div className="bg-white p-2 rounded-lg inline-block mb-3 shadow-sm border border-slate-100">
                <QRCodeSVG value="https://venmo.com/u/ochampo" size={120} fgColor="#4C1D95" />
              </div>
              <a href="https://venmo.com/u/ochampo" className="block w-full bg-purple-900/90 backdrop-blur-sm text-white py-3 rounded-xl font-bold text-sm mt-2 shadow-md">
                Honeymoon Fund
              </a>
            </div>

            {/* Lorraine Mobile */}
            <div className="bg-white/40 p-6 rounded-2xl text-center border border-white/50 shadow-sm">
              <p className="text-purple-900 font-bold text-lg mb-2" style={textGlow}>Lorraine</p>
              <div className="bg-white p-2 rounded-lg inline-block mb-3 shadow-sm border border-slate-100">
                <QRCodeSVG value="https://venmo.com/u/lorrainegoveas" size={120} fgColor="#4C1D95" />
              </div>
              <a href="https://venmo.com/u/lorrainegoveas" className="block w-full bg-purple-900/90 backdrop-blur-sm text-white py-3 rounded-xl font-bold text-sm mt-2 shadow-md">
                Home Fund
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* --- DESKTOP CONTENT --- */}
      <div className="hidden md:flex relative z-10 min-h-screen flex-col justify-center items-center py-12">
        <div className="w-full max-w-4xl bg-white/20 backdrop-blur-sm rounded-3xl shadow-2xl p-12 border border-white/30">
          <h2 className="text-6xl text-center text-purple-900 mb-6 font-light italic" style={textGlow}>Gift</h2>
          <p className="text-center text-slate-900 text-xl mb-12 max-w-2xl mx-auto font-bold" style={textGlow}>
            Your presence is the greatest gift! We kindly prefer a monetary contribution to help us start our next chapter.
          </p>
          <div className="grid grid-cols-2 gap-8 max-w-3xl mx-auto">
            <div className="bg-white/40 backdrop-blur-md p-8 rounded-3xl border border-white/40 shadow-lg text-center hover:-translate-y-1 transition-transform">
              <p className="text-purple-900 text-2xl mb-4 font-bold" style={textGlow}>Daniel</p>
              <div className="bg-white p-4 rounded-xl mb-6 shadow-sm inline-block"><QRCodeSVG value="https://venmo.com/u/ochampo" size={140} fgColor="#4C1D95" /></div>
              <a href="https://venmo.com/u/ochampo" target="_blank" rel="noopener noreferrer" className="block w-full"><button className="w-full py-3 bg-purple-900 text-white rounded-xl font-bold shadow-md hover:bg-purple-800">HONEYMOON FUND</button></a>
            </div>
            <div className="bg-white/40 backdrop-blur-md p-8 rounded-3xl border border-white/40 shadow-lg text-center hover:-translate-y-1 transition-transform">
              <p className="text-purple-900 text-2xl mb-4 font-bold" style={textGlow}>Lorraine</p>
              <div className="bg-white p-4 rounded-xl mb-6 shadow-sm inline-block"><QRCodeSVG value="https://venmo.com/u/lorrainegoveas" size={140} fgColor="#4C1D95" /></div>
              <a href="https://venmo.com/u/lorrainegoveas" target="_blank" rel="noopener noreferrer" className="block w-full"><button className="w-full py-3 bg-purple-900 text-white rounded-xl font-bold shadow-md hover:bg-purple-800">HOME FUND</button></a>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default RenderGift;

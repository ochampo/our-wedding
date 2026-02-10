import { MapPin } from 'lucide-react';
import marriottsanramon from './components/images/marriottsanramon.jpeg';
import watercolor_floral from './components/images/watercolor_floral.jpg';

const RenderTravel = () => {
  const textGlow = {
    textShadow: '0 0 10px rgba(255, 255, 255, 0.9), 0 0 4px rgba(255, 255, 255, 1)'
  };

  return (
    <main className="relative min-h-screen w-full">

      {/* --- MOBILE BACKGROUNDS (3 Layers) --- */}

      {/* 1. TOP FLOWER */}
      <img
        src={watercolor_floral}
        alt="Background Top"
        className="block md:hidden fixed top-0 left-0 w-full h-auto object-contain opacity-60 z-0"
      />

      {/* 2. MIDDLE FLOWER (The Fix)
          - top-1/2: Moves it to the middle of the screen.
          - -translate-y-1/2: Centers it perfectly vertical.
          - scale-x-[-1]: Flips it horizontally so it doesn't look identical to the top one.
      */}
      <img
        src={watercolor_floral}
        alt="Background Middle"
        className="block md:hidden fixed top-1/2 left-0 w-full h-auto object-contain opacity-50 z-0 -translate-y-1/2 scale-x-[-1]"
      />

      {/* 3. BOTTOM FLOWER */}
      <img
        src={watercolor_floral}
        alt="Background Bottom"
        className="block md:hidden fixed bottom-0 left-0 w-full h-auto object-contain opacity-60 z-0 rotate-180"
      />

      {/* --- DESKTOP BACKGROUND --- */}
      <img
        src={watercolor_floral}
        alt="Background"
        className="hidden md:block fixed inset-0 w-full h-full object-cover z-0 opacity-60"
      />

      {/* --- MOBILE CONTENT --- */}
      <div className="block md:hidden relative z-10 py-12 px-6 overflow-y-auto mt-20 mb-24">
        <div className="bg-white/40 backdrop-blur-md rounded-3xl shadow-xl p-6 border border-white/60">

          <h2 className="text-4xl text-center text-purple-900 mb-6 font-serif italic" style={textGlow}>
            Hotel
          </h2>

          <div className="rounded-lg overflow-hidden shadow-sm mb-6 border border-white/50">
            <img
              src={marriottsanramon}
              alt="Marriott San Ramon"
              className="w-full h-48 object-cover opacity-100"
            />
          </div>

          <h3 className="text-2xl text-center font-bold text-slate-900 mb-2" style={textGlow}>
            Marriott San Ramon
          </h3>

          <a
            href="https://www.google.com/maps/place/San+Ramon+Marriott/@37.7628816,-121.9678093,17z/data=!4m11!3m10!1s0x808ff299470b65af:0x9779a5c295fb341a!5m4!1s2026-04-17!2i4!4m1!1i2!8m2!3d37.7628774!4d-121.9652344!16s%2Fm%2F0myjcjn?entry=ttu&g_ep=EgoyMDI2MDIwNC4wIKXMDSoASAFQAw%3D%3D"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 text-lg text-slate-900 font-bold mb-6"
            style={textGlow}
          >

            2600 Bishop Dr, San Ramon
          </a>

          <div className="space-y-4 mb-8 text-center">
            <p className="text-lg text-slate-900 font-bold" style={textGlow}>
              Room block available: <br/><span className="text-purple-900">July 3rd</span>.
            </p>
            <p className="text-lg text-slate-900 font-bold" style={textGlow}>
              Book by <span className="text-purple-900">June 1st</span> for the group rate.
            </p>
          </div>

          <a
            href="https://example.com"
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full bg-purple-900/90 backdrop-blur-sm text-white text-center py-4 rounded-xl font-bold text-lg shadow-lg active:scale-95 transition-transform"
          >
            BOOK ROOM
          </a>
        </div>
      </div>

      {/* --- DESKTOP CONTENT --- */}
      <div className="hidden md:flex relative z-10 min-h-screen flex-col justify-center items-center py-12">
        <div className="w-full max-w-xl bg-white/20 backdrop-blur-sm rounded-3xl shadow-2xl p-12 border border-white/40">
          <h2 className="text-6xl text-center text-purple-900 mb-8 font-light italic" style={textGlow}>Hotel</h2>
          <div className="rounded-xl overflow-hidden shadow-lg mb-8 border-2 border-white/60">
            <img src={marriottsanramon} alt="Marriott San Ramon" className="w-full h-64 object-cover" />
          </div>
          <h2 className="text-4xl text-center font-bold mb-2 text-slate-900" style={textGlow}>Marriott San Ramon</h2>
          <p className="text-xl text-center text-slate-900 font-bold mb-8" style={textGlow}>2600 Bishop Dr, San Ramon, CA 94583</p>
          <div className="text-center space-y-4 mb-10">
            <p className="text-xl text-slate-900 font-bold" style={textGlow}>A room block is available for the night of July 3rd.</p>
            <p className="text-xl text-slate-900 font-bold" style={textGlow}>Be sure to book by <span className="text-purple-900">June 1st</span> to get the group rate.</p>
          </div>
          <div className="text-center">
            <a href="https://example.com" target="_blank" rel="noopener noreferrer" className="inline-block bg-purple-900/90 text-white px-10 py-4 rounded-full text-xl font-bold hover:bg-purple-800 transition-all shadow-lg">BOOK YOUR ROOM</a>
          </div>
        </div>
      </div>
    </main>
  );
};

export default RenderTravel;

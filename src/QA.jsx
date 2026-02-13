import { HelpCircle } from 'lucide-react';
import watercolor_floral from './components/images/watercolor_floral.jpg';

const RenderQA = () => {
  // Glow for readability on transparent backgrounds
  const textGlow = {
    textShadow: '0 0 10px rgba(255, 255, 255, 0.9), 0 0 4px rgba(255, 255, 255, 1)'
  };

  const qaData = [
    { q: "What is the dress code?", a: "We'd love to see our family and friends get dressed up for our big day. The dress code is formal attire. Please avoid wearing purple, white and ivory." },
    { q: "Can I bring a plus one?", a: "As much as we’d love to celebrate with everyone, we’re only able to accommodate those listed on your invitation. Thank you for understanding and for being part of our special day!" },
    { q: "Are kids welcome?", a: "We love your little ones and have chosen to include the children of close family and friends. However, due to limited capacity, we kindly ask that only those listed on the invitation attend." },
    { q: "Is there parking available?", a: "Yes, both the church and the reception venue have ample free parking available for all guests." },
    { q: "What time should I arrive to the church?", a: "The ceremony begins promptly at 2:00 PM. We recommend arriving 15-20 minutes early to find your seat." },
    { q: "What is the distance between the venues?", a: "The distance from the ceremony to the reception is around 25 miles and will take 30 to 45 minutes to get there so please plan accordingly." },
    { q: "Are the events indoors or outddors?", a: "Both the ceremony and reception will be indoors." },
    { q: "Is there a cocktail hour?", a: "Yes! Cocktail hour begins at 5:30pm followed by dinner and dancing at 6:30 pm." }
  ];

  return (
    <main className="relative min-h-screen w-full bg-slate-50">

      {/* --- MOBILE WALLPAPER (Flex Stack - No Overlap) --- */}
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

      {/* --- DESKTOP BACKGROUND --- */}
      <img 
        src={watercolor_floral} 
        alt="Background" 
        className="hidden md:block fixed inset-0 w-full h-full object-cover z-0 opacity-60" 
      />

      {/* --- CONTENT CONTAINER --- */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 py-24 pb-40 animate-in fade-in duration-700">
        
        {/* Header */}
        <div className="text-center mb-12">
            <div className="inline-block p-4 bg-white/40 backdrop-blur-md rounded-full mb-6 shadow-sm border border-white/50">
                <HelpCircle className="text-purple-900" size={40} />
            </div>
            <h2 className="text-5xl md:text-6xl text-center text-purple-900 mb-8 font-sans italic" style={textGlow}>
                Q & A
            </h2>
        </div>

        {/* Cards Grid */}
        <div className="grid gap-6 md:grid-cols-2">
          {qaData.map((item, i) => (
            <div 
                key={i} 
                className="bg-white/60 backdrop-blur-md p-8 rounded-3xl border border-white/60 shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <h4 className="text-purple-900 font-bold mb-3 uppercase text-[12px] tracking-widest font-sans opacity-90">
                {item.q}
              </h4>
              <p className="text-slate-800 leading-relaxed font-medium">
                {item.a}
              </p>
            </div>
          ))}
        </div>

      </div>
    </main>
  );
};

export default RenderQA;
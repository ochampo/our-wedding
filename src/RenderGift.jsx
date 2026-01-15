import { QRCodeSVG } from 'qrcode.react';
import { 
  Gift 
} from 'lucide-react';

const renderGift = () => (
    <main className="max-w-4xl mx-auto px-6 py-24 animate-in fade-in duration-700">
      <Gift className="mx-auto text-purple-200 mb-6" size={40} />
      <h2 className="text-5xl text-center text-blue-300 mb-12 font-light italic">Venmo</h2>   
      <p className="text-center text-slate-600 text-lg mb-12 max-w-2xl mx-auto leading-relaxed">
        Your presence is the greatest gift. If you wish to honor us with a gift, 
        we have set up honeymoon funds for both of us.
      </p>
      
      <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
        {/* ACCOUNT 1: Daniel */}
        <div className="bg-white p-8 rounded-3xl border border-purple-100 shadow-sm text-center flex flex-col items-center">        
          <p className="text-slate-500 text-sm mb-6 font-medium italic">@ochampo</p>
          <div className="p-4 bg-slate-50 rounded-2xl mb-6 border border-slate-100 shadow-inner">
            <QRCodeSVG value="https://venmo.com/u/ochampo" size={140} fgColor="#008CFF" level="H" />
          </div>
          <a href="https://venmo.com/u/ochampo" target="_blank" rel="noopener noreferrer" className="w-full">
            <button className="w-full py-4 bg-[#008CFF] text-white rounded-full font-bold tracking-widest text-[10px] uppercase hover:bg-[#0074d6] transition-all shadow-md active:scale-95">
              Venmo Daniel
            </button>
          </a>
        </div>

        {/* ACCOUNT 2: Lorraine */}
        <div className="bg-white p-8 rounded-3xl border border-purple-100 shadow-sm text-center flex flex-col items-center">        
          <p className="text-slate-500 text-sm mb-6 font-medium italic">@lorrainegoveas</p>
          <div className="p-4 bg-slate-50 rounded-2xl mb-6 border border-slate-100 shadow-inner">
            <QRCodeSVG value="https://venmo.com/u/lorrainegoveas" size={140} fgColor="#008CFF" level="H" />
          </div>
          <a href="https://venmo.com/u/lorrainegoveas" target="_blank" rel="noopener noreferrer" className="w-full">
            <button className="w-full py-4 bg-[#008CFF] text-white rounded-full font-bold tracking-widest text-[10px] uppercase hover:bg-[#0074d6] transition-all shadow-md active:scale-95">
              Venmo Lorraine
            </button>
          </a>
        </div>
      </div>
      <p className="mt-12 text-center text-slate-400 text-[10px] uppercase tracking-[0.2em]">
        Thank you for your generosity
      </p>
    </main>
  );

export default renderGift;
import { QRCodeSVG } from 'qrcode.react';
import { 
  Gift 
} from 'lucide-react';

const renderGift = () => (
    <main className="max-w-4xl mx-auto px-6 py-24 animate-in fade-in duration-700">
      <Gift className="mx-auto text-purple-200 mb-6" size={40} />
      <h2 className="text-5xl text-center text-purple-900 mb-12 font-light italic">Gift</h2>   
      <p className="text-center text-slate-600 text-lg mb-12 max-w-2xl mx-auto leading-relaxed">
        Your presence at our wedding is the greatest gift of all! If you would like to give something more, we kindly prefer a monetary gift to help us start our next chapter together. Thank you so much for your generosity and love.
      </p>
      
      <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
        {/* ACCOUNT 1: Daniel */}
        <div className="bg-white p-8 rounded-3xl border border-purple-100 shadow-sm text-center flex flex-col items-center">        
          <p className="text-slate-700 text-base mb-6 font-medium italic">@ochampo</p>
          <div className="p-4 bg-slate-50 rounded-2xl mb-6 border border-slate-100 shadow-inner">
            <QRCodeSVG value="https://venmo.com/u/ochampo" size={140} fgColor="#4C1D95" level="H" />
          </div>
          <a href="https://venmo.com/u/ochampo" target="_blank" rel="noopener noreferrer" className="w-full">
            <button className="w-full py-4 bg-[#4C1D95] text-white rounded-full font-bold tracking-widest text-[10px] uppercase hover:bg-[#0074d6] transition-all shadow-md active:scale-95">
              Contribute to Honeymoon Fund
            </button>
          </a>
        </div>

        {/* ACCOUNT 2: Lorraine */}
        <div className="bg-white p-8 rounded-3xl border border-purple-100 shadow-sm text-center flex flex-col items-center">        
          <p className="text-slate-700 text-base mb-6 font-medium italic">@lorrainegoveas</p>
          <div className="p-4 bg-slate-50 rounded-2xl mb-6 border border-slate-100 shadow-inner">
            <QRCodeSVG value="https://venmo.com/u/lorrainegoveas" size={140} fgColor="#4C1D95" level="H" />
          </div>
          <a href="https://venmo.com/u/lorrainegoveas" target="_blank" rel="noopener noreferrer" className="w-full">
            <button className="w-full py-4 bg-[#4C1D95] text-white rounded-full font-bold tracking-widest text-[10px] uppercase hover:bg-[#0074d6] transition-all shadow-md active:scale-95">
              Contribute to Home Fund
            </button>
          </a>
        </div>
      </div>
    </main>
  );

export default renderGift;
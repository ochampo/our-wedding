import { 
  HelpCircle 
} from 'lucide-react';
const renderQA = () => (
    <main className="max-w-3xl mx-auto px-6 py-24 animate-in fade-in duration-700">
      <HelpCircle className="mx-auto text-purple-200 mb-6" size={40} />
      <h2 className="text-5xl text-center text-purple-900 mb-12 font-light italic">Q & A</h2>
      <div className="space-y-6">
        {[
          { q: "What is the dress code?", a: "We'd love to see our family and friends get dressed up for our big day. The dress code is Semi-Formal or Cocktail attire." },
          { q: "Are kids invited?", a: "While we love your little ones, our wedding will be an adults-only event so that everyone can relax and enjoy the evening." },
          { q: "Is there parking available?", a: "Yes, both the church and the reception venue have ample free parking available for all guests." },
          { q: "What time should I arrive?", a: "The ceremony begins promptly at 2:00 PM. We recommend arriving 15-20 minutes early to find your seat." }
        ].map((item, i) => (
          <div key={i} className="bg-white p-8 rounded-2xl border border-purple-50 shadow-sm">
            <h4 className="text-purple-900 font-bold mb-3 uppercase text-[10px] tracking-widest font-sans">{item.q}</h4>
            <p className="text-slate-600 leading-relaxed">{item.a}</p>
          </div>
        ))}
      </div>
    </main>
  );

  export default renderQA;
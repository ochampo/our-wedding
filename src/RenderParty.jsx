import {PARTY_DATA} from './data/BridalPartyData.js';
import PartyCard from './components/PartyCard';



const RenderParty = () => {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 py-12 px-6 max-w-6xl mx-auto space-y-16">
      
      {/* Header */}
      <div className="text-center space-y-4">
        <h2 className="text-4xl md:text-5xl font-serif italic text-purple-900">The Wedding Party</h2>
        <p className="text-slate-500 uppercase tracking-widest text-xs">The "I Do" Crew</p>
        <div className="h-px w-20 bg-yellow-400 mx-auto opacity-50"></div>
      </div>
      {/* Bride Section */}
      <div>
        <h3 className="text-center text-2xl font-serif text-slate-700 mb-8 italic">The Bride and Groom</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-3">
          {PARTY_DATA.bride_and_groom.map((p, i) => <PartyCard key={i} person={p} />)}
        </div>
      </div>

      {/* Bridesmaids Section */}
      <div>
        <h3 className="text-center text-2xl font-serif text-slate-700 mb-8 italic">The Ladies</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PARTY_DATA.bridesmaids.map((p, i) => <PartyCard key={i} person={p} />)}
        </div>
      </div>

      {/* Groomsmen Section */}
      <div>
        <h3 className="text-center text-2xl font-serif text-slate-700 mb-8 italic">The Gents</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PARTY_DATA.groomsmen.map((p, i) => <PartyCard key={i} person={p} />)}
        </div>
      </div>
    </div>
  );
};

export default RenderParty;
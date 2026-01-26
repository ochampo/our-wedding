import { Star } from 'lucide-react';

const PartyCard = ({ person }) => (
  <div className="flex flex-col items-center text-center p-6 bg-white rounded-lg border border-purple-50 shadow-sm hover:shadow-md transition-shadow">
    <div className="w-32 h-32 mb-4 relative">
      <img 
        src={person.img} 
        alt={person.name} 
        className="w-full h-full rounded-full object-cover border-4 border-purple-100"
      />
      <div className="absolute bottom-0 right-0 bg-yellow-500 text-white p-1.5 rounded-full shadow-sm">
        <Star size={12} fill="currentColor" />
      </div>
    </div>
    <h3 className="font-serif italic text-xl text-purple-900">{person.name}</h3>
    <p className="text-[10px] uppercase tracking-widest text-yellow-600 font-bold mb-3">{person.role}</p>
    <p className="text-sm text-slate-500 leading-relaxed font-light">{person.bio}</p>
  </div>
);

export default PartyCard;
// LocationCard.js
import React from 'react';
import { MapPin } from 'lucide-react'; // Don't forget this import!

const LocationCard = ({ data, extraClass = "" }) => {
  const Icon = data.icon; // Extract the icon component from data

  return (
    <a 
      href={data.mapLink}
      target="_blank" 
      rel="noopener noreferrer"
      // Your existing tailwind classes...
      className={`group block p-8 rounded-3xl hover:bg-purple-50 transition-all duration-300 border border-transparent hover:border-purple-100 cursor-pointer bg-white shadow-sm text-center ${extraClass}`}
    >
      <Icon className="mx-auto mb-4 text-purple-200 group-hover:text-purple-400 transition-colors" size={32} />
      
      <h3 className="text-2xl md:text-3xl text-purple-900 font-light italic mb-2 group-hover:text-purple-600 transition-colors">
        {data.title}
      </h3>
      
      {data.time && (
        <p className="text-slate-400 font-sans text-[10px] tracking-widest uppercase font-bold mb-4">
          {data.time}
        </p>
      )}
      
      <p className="text-lg text-slate-700 font-serif">{data.name}</p>
      
      <div className="flex items-center justify-center gap-1 mt-2 text-slate-500 text-sm group-hover:text-purple-500">
        <MapPin size={14} />
        <span className="underline decoration-purple-200 underline-offset-4 group-hover:decoration-purple-400">
          {data.address}
        </span>
      </div>
    </a>
  );
};

export default LocationCard;
// LocationCard.js
import React from 'react';
import { MapPin } from 'lucide-react';

const LocationCard = ({ data, extraClass = "" }) => {
  const Icon = data.icon;

  return (
    <a 
      href={data.mapLink}
      target="_blank" 
      rel="noopener noreferrer"
      className={`group block rounded-3xl transition-all duration-300 border border-transparent hover:border-purple-100 cursor-pointer overflow-hidden relative ${extraClass}`}
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src={data.image} 
          alt="" 
          className="object-cover w-full h-full opacity-80 transition-opacity group-hover:opacity-100"
        />
        {/* Gradient Overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent"></div>
      </div>

      {/* Card Content */}
      <div className="relative z-10 p-8 text-center">
        <Icon className="mx-auto mb-4 text-purple-200 group-hover:text-purple-300 transition-colors" size={32} />
        
        <h3 className="text-2xl md:text-3xl text-white font-light italic mb-2 group-hover:text-purple-200 transition-colors">
          {data.title}
        </h3>
        
        {data.time && (
          <p className="text-slate-200 font-sans text-[10px] tracking-widest uppercase font-bold mb-4">
            {data.time}
          </p>
        )}
        
        <p className="text-lg text-white font-serif">{data.name}</p>
        
        <div className="flex items-center justify-center gap-1 mt-4 text-slate-200 text-sm group-hover:text-purple-300">
          <MapPin size={14} />
          <span className="underline decoration-purple-200 underline-offset-4 group-hover:decoration-purple-400">
            {data.address}
          </span>
        </div>
      </div>
    </a>
  );
};

export default LocationCard;
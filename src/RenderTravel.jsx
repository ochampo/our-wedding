import { MapPin } from 'lucide-react';
import { Calendar, GlassWater } from 'lucide-react';
import { LOCATIONS } from './data/WeddingData';
import  LocationCard  from './components/LocationCard';
const RenderTravel = () => {
return (
    <main className="max-w-5xl mx-auto px-6 py-24 animate-in fade-in duration-700 flex flex-col justify-center">
      <MapPin className="mx-auto text-purple-200 mb-6" size={40} />
      <h2 className="text-5xl text-center text-purple-900 mb-12 font-light italic">Travel & Stay</h2>
      {/* 1. Reuse the Venue Cards */}
      <div className="grid md:grid-cols-2 gap-8 mb-12">
        {LOCATIONS.map(loc => (
          <LocationCard key={loc.id} data={loc} extraClass="bg-purple-50/50 border-purple-100" />
        ))}
      </div>  
    </main>
  );
};

  export default RenderTravel;
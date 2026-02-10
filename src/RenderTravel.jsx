import { MapPin } from 'lucide-react';
import { Calendar, GlassWater } from 'lucide-react';
import { LOCATIONS } from './data/WeddingData';
import  LocationCard  from './components/LocationCard';
import marriottsanramon from './components/images/marriottsanramon.jpeg'
const RenderTravel = () => {
return (
    <main className="max-w-5xl mx-auto px-6 py-24 animate-in fade-in duration-700 flex flex-col justify-center">
  <h2 className="text-5xl text-center text-purple-900 mb-6 font-light italic">
    Hotel
  </h2>

  

  {/* Image */}
  <img
    src={marriottsanramon}
    alt="Marriott San Ramon"
    className="w-full max-w-xl mx-auto rounded-lg mb-6"
  />
<h2 className="text-3xl text-center font-light mb-2">
    Marriott San Ramon
  </h2>
  {/* Address */}
  <a
    href="https://www.google.com/maps/place/San+Ramon+Marriott/@37.7628816,-121.9678093,17z/data=!4m11!3m10!1s0x808ff299470b65af:0x9779a5c295fb341a!5m4!1s2026-04-17!2i4!4m1!1i2!8m2!3d37.7628774!4d-121.9652344!16s%2Fm%2F0myjcjn?entry=ttu&g_ep=EgoyMDI2MDIwNC4wIKXMDSoASAFQAw%3D%3D"
    target="_blank"
    rel="noopener noreferrer"
    className="block text-xl text-center font-light hover:underline mb-4"
  >
    2600 Bishop Dr, San Ramon, CA 94583
  </a>

  {/* Details */}
  <p className="text-xl font-light text-center">
    A room block is available at the Marriott San Ramon for the night of July 3rd.
  </p>

  <p className="text-xl font-light mb-6 text-center">
    Be sure to book by June 1st to get the group rate.
  </p>

  {/* CTA */}
  <a
    href="https://example.com"
    target="_blank"
    rel="noopener noreferrer"
    className="inline-block text-xl font-bold text-purple-900 hover:underline text-center"
  >
    BOOK YOUR ROOM HERE
  </a>
    </main>
  );
};

  export default RenderTravel;
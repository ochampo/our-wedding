import { MapPin } from 'lucide-react';
import marriottsanramon from './components/images/marriottsanramon.jpeg';
import watercolor_floral from './components/images/watercolor_floral.jpg';
import holyspirit from './components/images/holyspirit.jpeg';
import theBridges from './components/images/theBridges.jpg';
import AddToCalendar from './AddToCalendar';
import { parseTimeData } from './utils/dateHelpers';

const RenderSchedule = () => {
  const textGlow = {
    textShadow: '0 0 10px rgba(255, 255, 255, 0.9), 0 0 4px rgba(255, 255, 255, 1)'
  };
    const { startDate: ceremonyStartTime, endDate: ceremonyEndTime } = parseTimeData("2:00 PM - 3:00 PM");
    const { startDate: receptionStartTime, endDate: receptionEndTime } = parseTimeData("5:30 PM - 10:30 PM");
       
        



  return (
    <main className="relative min-h-screen w-full">
    

      {/* --- MOBILE WALLPAPER (Flex Stack - No Overlap) --- */}


      {/* --- DESKTOP CONTENT --- */}
      <div className="flex flex-col md:flex-row gap-10 justify-center items-stretch">

        <div className="w-full max-w-xl bg-white/20 backdrop-blur-sm rounded-3xl shadow-2xl p-12 border border-white/40">
          <h2 className="text-3xl text-center text-purple-900 mb-2 italic" style={textGlow}>Ceremony</h2>
          <div className="rounded-xl overflow-hidden shadow-lg mb-8 border-2 border-white/60">
            <img src={holyspirit} alt="Holy Spirit" className="w-full h-full object-cover aspect-[4/4]" />
          </div>
          <h2 className="text-2xl text-center mb-2 text-slate-900 font-bold">Holy Spirit Catholic Church</h2>
     <a
    href="https://www.google.com/maps/place/Holy+Spirit+Catholic+Church/@37.5571049,-122.0060974,17z/data=!3m1!4b1!4m11!3m10!1s0x808fbf82d3e7bf11:0xe4c71b1f1a219477!5m4!1s2026-04-17!2i4!4m1!1i2!8m2!3d37.5571007!4d-122.0035225!16s%2Fg%2F1tdvpzxz?entry=ttu&g_ep=EgoyMDI2MDIwOS4wIKXMDSoASAFQAw%3D%3D"
    target="_blank"
    rel="noopener noreferrer"
    className="block text-xl text-center font-light hover:underline mb-2"
  >
    37588 Fremont Blvd, Fremont, CA 94536
  </a>     
                   <h2 className="text-xl text-center mb-6 text-slate-900">2pm - 3pm</h2>

        
                      <AddToCalendar
                        title={` Lorraine & Daniel's Wedding Ceremony`}
                        description={"Join us for our nuptial mass."}
                        location={"37588 Fremont Blvd, Fremont, CA 94536"}
                        startDate={ceremonyStartTime}
                        endDate={ceremonyEndTime}
                        
                      />
        </div>

        <div className="w-full max-w-xl bg-white/20 backdrop-blur-sm rounded-3xl shadow-2xl p-12 border border-white/40">
          <h2 className="text-3xl text-center text-purple-900 mb-2  italic" style={textGlow}>Reception</h2>
          <div className="rounded-xl overflow-hidden shadow-lg mb-8 border-2 border-white/60">
            <img src={theBridges} alt="Bridges" className="w-full h-full object-cover aspect-[4/4]" />
          </div>
          <h2 className="text-2xl text-center mb-2 text-slate-900 font-bold">The Bridges Golf Club</h2>
                    <h2 className="text-xl text-center mb-2 text-slate-900">Garden Pavilion Room</h2>
   <a
    href="https://www.google.com/maps/place/The+Bridges+Golf+Club/@37.7710045,-121.9366182,16z/data=!3m1!4b1!4m11!3m10!1s0x808ff276c348ecf1:0x9e6b39a1d8967a0c!5m4!1s2026-04-17!2i4!4m1!1i2!8m2!3d37.7710003!4d-121.9340433!16s%2Fg%2F1tdmkqrs?entry=ttu&g_ep=EgoyMDI2MDIwOS4wIKXMDSoASAFQAw%3D%3D"
    target="_blank"
    rel="noopener noreferrer"
    className="block text-xl text-center font-light hover:underline mb-2"
  >
   9000 S Gale Ridge Rd, San Ramon, CA 94582
  </a>                       <h2 className="text-xl text-center mb-2 text-slate-900">5:30 pm - 10:30pm</h2>

        
          
                      <AddToCalendar
                        title={` Lorraine & Daniel's Wedding Reception`}
                        description={"Dinner, drinks and dancing."}
                        location={"9000 S Gale Ridge Rd, San Ramon, CA 94582"}
                        startDate={receptionStartTime}
                        endDate={receptionEndTime}
                      />
        </div>
        </div>
    </main>
  );
};

export default RenderSchedule;
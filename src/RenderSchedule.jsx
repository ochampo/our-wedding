import { MapPin } from 'lucide-react';
import marriottsanramon from './components/images/marriottsanramon.jpeg';
import watercolor_floral from './components/images/watercolor_floral.jpg';
import holyspirit from './components/images/holyspirit.jpeg';
import theBridges from './components/images/theBridges.jpg';
import AddToCalendar from './AddToCalendar';
import { parseTimeData } from './utils/dateHelpers';
import config from './config/weddingConfig';

const RenderSchedule = () => {
  const textGlow = {
    textShadow: '0 0 10px rgba(255, 255, 255, 0.9), 0 0 4px rgba(255, 255, 255, 1)'
  };
    const { startDate: ceremonyStartTime, endDate: ceremonyEndTime } = parseTimeData(config.ceremony.timeRange);
    const { startDate: receptionStartTime, endDate: receptionEndTime } = parseTimeData(config.reception.timeRange);





  return (
    <div className="w-full animate-in fade-in duration-700">


      {/* --- MOBILE WALLPAPER (Flex Stack - No Overlap) --- */}


      {/* --- DESKTOP CONTENT --- */}
      <div className="flex flex-col md:flex-row gap-10 justify-center items-stretch">

        <div className="w-full max-w-xl bg-white/20 backdrop-blur-sm rounded-3xl shadow-2xl p-12 border border-white/40">
          <h2 className="text-3xl text-center text-purple-900 mb-2 italic" style={textGlow}>Ceremony</h2>
          <div className="rounded-xl overflow-hidden shadow-lg mb-8 border-2 border-white/60">
            <img src={holyspirit} alt="Holy Spirit" className="w-full h-full object-cover aspect-[4/4]" />
          </div>
          <h2 className="text-2xl text-center mb-2 text-slate-900 font-bold">{config.ceremony.name}</h2>
     <a
    href={config.ceremony.mapUrl}
    target="_blank"
    rel="noopener noreferrer"
    className="block text-xl text-center font-light hover:underline mb-2"
  >
    {config.ceremony.address}
  </a>
                   <h2 className="text-xl text-center mb-6 text-slate-900">{config.ceremony.timeDisplay}</h2>


                      <AddToCalendar
                        title={` ${config.couple.displayName}'s Wedding Ceremony`}
                        description={config.ceremony.description}
                        location={config.ceremony.address}
                        startDate={ceremonyStartTime}
                        endDate={ceremonyEndTime}

                      />
        </div>

        <div className="w-full max-w-xl bg-white/20 backdrop-blur-sm rounded-3xl shadow-2xl p-12 border border-white/40">
          <h2 className="text-3xl text-center text-purple-900 mb-2  italic" style={textGlow}>Reception</h2>
          <div className="rounded-xl overflow-hidden shadow-lg mb-8 border-2 border-white/60">
            <img src={theBridges} alt="Bridges" className="w-full h-full object-cover aspect-[4/4]" />
          </div>
          <h2 className="text-2xl text-center mb-2 text-slate-900 font-bold">{config.reception.name}</h2>
                    <h2 className="text-xl text-center mb-2 text-slate-900">{config.reception.subVenue}</h2>
   <a
    href={config.reception.mapUrl}
    target="_blank"
    rel="noopener noreferrer"
    className="block text-xl text-center font-light hover:underline mb-2"
  >
   {config.reception.address}
  </a>                       <h2 className="text-xl text-center mb-2 text-slate-900">{config.reception.timeDisplay}</h2>



                      <AddToCalendar
                        title={` ${config.couple.displayName}'s Wedding Reception`}
                        description={config.reception.description}
                        location={config.reception.address}
                        startDate={receptionStartTime}
                        endDate={receptionEndTime}
                      />
        </div>
        </div>
    </div>
  );
};

export default RenderSchedule;

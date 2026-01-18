import React, { useState } from 'react';
import { Heart, Search, Check, Users, X, CalendarCheck, Music, Utensils } from 'lucide-react';

const RenderRSVP = ({ allGuests, rsvpMap, googleScriptUrl }) => {
  // --- LOCAL STATE ---
  const [searchTerm, setSearchTerm] = useState("");
  const [status, setStatus] = useState("IDLE");
  
  // This state holds the data for the UI.
  // We initialize it with the guest list, and update it with their choices upon submit.
  const [selectedPartyData, setSelectedPartyData] = useState([]);
  
  // Tracks if they came from the database (true) or just submitted the form (false)
  const [hasExistingRegistration, setHasExistingRegistration] = useState(false);
  
  // Tracks Yes/No for form validation
  const [attendanceStates, setAttendanceStates] = useState({});

  // --- HANDLERS ---
  const handleSelectName = (guest) => {
    // 1. Find everyone in the party
    const partyMembers = allGuests.filter(g => g.partyId === guest.partyId);
    
    // 2. Check for existing data in Google Sheet
    const mergedData = partyMembers.map(member => {
        const key = member.name.toLowerCase().trim();
        const foundData = rsvpMap[key]; 
        return { 
            ...member, 
            existingRSVP: foundData || null 
        };
    });

    // 3. Check if they already registered
    const alreadyRegistered = mergedData.some(m => m.existingRSVP !== null);

    // 4. Initialize form state
    const initialStates = {};
    mergedData.forEach((_, index) => {
      initialStates[index] = 'yes'; 
    });
    setAttendanceStates(initialStates);

    setSelectedPartyData(mergedData);
    setHasExistingRegistration(alreadyRegistered);
    setSearchTerm(""); 
  };

  const handleReset = () => {
    setSelectedPartyData([]);
    setHasExistingRegistration(false);
    setSearchTerm("");
    setStatus("IDLE");
  };

  const handleAttendanceChange = (index, value) => {
    setAttendanceStates(prev => ({ ...prev, [index]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("SENDING");
    const formData = new FormData(e.target);
    
    // 1. Capture the data they just typed
    const responses = selectedPartyData.map((guest, index) => ({
      name: guest.name,
      attendance: formData.get(`attendance-${index}`),
      food: formData.get(`attendance-${index}`) === 'no' ? 'N/A' : formData.get(`food-${index}`),
      dietary: formData.get(`dietary-${index}`) || "None",
      music: formData.get('music') || "None",
      date: new Date().toLocaleString()
    }));

    try {
      // 2. Send to Google
      await fetch(googleScriptUrl, { 
        method: "POST", 
        mode: "no-cors", 
        body: JSON.stringify({ partyResponse: responses }) 
      });

      // 3. UPDATE STATE TO SHOW SUMMARY IMMEDIATELY
      // We overwrite selectedPartyData with the new responses so the UI displays them
      const updatedDataForDisplay = selectedPartyData.map((member, i) => ({
        ...member,
        existingRSVP: responses[i] // attach the new response as if it came from the DB
      }));
      
      setSelectedPartyData(updatedDataForDisplay);
      setHasExistingRegistration(true); // Switch view to "Summary" mode
      setStatus("SUCCESS");

    } catch (error) { 
      setStatus("ERROR"); 
    }
  };

  const filteredResults = searchTerm.length > 2 
    ? allGuests.filter(g => g.name.toLowerCase().includes(searchTerm.toLowerCase().trim())).slice(0, 6) 
    : [];

  const getAttendanceLabel = (val) => val === 'yes' ? 'Joyfully Accepts' : 'Regretfully Declines';

  return (
    <main className="py-24 px-6 animate-in fade-in duration-700">
      <Heart className="mx-auto text-purple-200 mb-6" size={40} />
      <h2 className="text-5xl text-center text-purple-900 mb-12 font-light italic">RSVP</h2>
      
      <div className="max-w-xl mx-auto">
        
        {/* VIEW 1: SEARCH (Only show if no party selected) */}
        {selectedPartyData.length === 0 && (
          <div className="space-y-6">
            <div className="relative">
              <input 
                type="text" 
                placeholder="Search your name..." 
                value={searchTerm} 
                onChange={(e) => setSearchTerm(e.target.value)} 
                className="w-full py-4 px-12 bg-purple-50 rounded-2xl outline-none border border-purple-100 focus:border-purple-300 transition-all text-lg font-sans" 
              />
              <Search className="absolute left-4 top-5 text-purple-300" size={18} />
            </div>
            <div className="space-y-2">
              {filteredResults.map((guest, i) => (
                <button key={i} onClick={() => handleSelectName(guest)} className="w-full p-4 text-left bg-white border border-purple-50 rounded-xl hover:bg-purple-50 flex items-center justify-between">
                  <span className="text-slate-700 font-medium">{guest.name}</span>
                  <Check size={16} className="text-purple-200" />
                </button>
              ))}
            </div>
          </div>
        )}

        {/* VIEW 2: SUMMARY (Used for both "Already Registered" AND "Just Submitted") */}
        {selectedPartyData.length > 0 && hasExistingRegistration && (
          <div className="space-y-6 animate-in zoom-in-95 duration-500">
            {/* Success Message Banner (Only shows if they just submitted) */}
            {status === "SUCCESS" && (
                <div className="p-4 bg-green-100 text-green-800 rounded-xl text-center mb-4 border border-green-200">
                    <p className="font-bold">RSVP Sent Successfully!</p>
                </div>
            )}

            <div className="p-8 bg-purple-50 rounded-3xl border border-purple-100 relative overflow-hidden">
              <div className="flex items-center gap-3 mb-6 border-b border-purple-200 pb-4">
                <CalendarCheck className="text-purple-600" size={24} />
                <h3 className="text-xl font-bold text-purple-900 font-serif italic">
                    {status === "SUCCESS" ? "Here is what we recorded:" : "We have your RSVP!"}
                </h3>
              </div>

              <div className="space-y-8">
                {selectedPartyData.map((member, idx) => {
                  const data = member.existingRSVP;
                  if (!data) return null; 

                  return (
                    <div key={idx} className="flex flex-col gap-2 border-b border-purple-100 last:border-0 pb-4 last:pb-0">
                        <div className="flex justify-between items-center">
                          <p className="font-bold text-slate-800 text-lg">{data.name}</p>
                          <span className={`px-4 py-1 rounded-full text-xs font-bold tracking-wider uppercase ${
                            data.attendance === 'yes' ? 'bg-green-100 text-green-700' : 'bg-slate-200 text-slate-500'
                          }`}>
                            {getAttendanceLabel(data.attendance)}
                          </span>
                        </div>
                        
                        {/* Food & Diet Display */}
                        {data.attendance === 'yes' && (
                          <div className="flex items-start gap-2 text-sm text-slate-600 mt-1">
                            <Utensils size={14} className="mt-1 text-purple-300"/>
                            <div>
                              <p><span className="font-semibold text-purple-900">Entrée:</span> {data.food || "Not Selected"}</p>
                              {data.dietary && data.dietary !== "None" && (
                                  <p className="italic text-slate-500 text-xs mt-1">Dietary: {data.dietary}</p>
                              )}
                            </div>
                          </div>
                        )}
                    </div>
                  );
                })}
              </div>

              {/* Music Display */}
              {selectedPartyData.find(m => m.existingRSVP?.music && m.existingRSVP.music !== "None") && (
                <div className="mt-6 pt-4 border-t border-purple-200">
                    <div className="flex items-center gap-2 text-purple-400 mb-2">
                        <Music size={16} />
                        <span className="text-[10px] uppercase tracking-widest font-bold">Song Request</span>
                    </div>
                    <p className="text-purple-900 italic">
                      "{selectedPartyData.find(m => m.existingRSVP?.music !== "None")?.existingRSVP.music}"
                    </p>
                </div>
              )}
            </div>

            {/* Back Button (Logic changes based on status) */}
            <div className="text-center">
                {status === "SUCCESS" ? (
                   <button onClick={() => window.location.reload()} className="text-slate-400 text-xs hover:text-purple-600 underline decoration-purple-200 underline-offset-4 transition-colors">
                      Back to Home
                   </button>
                ) : (
                   <button onClick={handleReset} className="text-slate-400 text-xs hover:text-purple-600 underline decoration-purple-200 underline-offset-4 transition-colors">
                      Not you? Search again
                   </button>
                )}
            </div>
          </div>
        )}

        {/* VIEW 3: FORM (Only if not already registered and not submitted) */}
        {selectedPartyData.length > 0 && !hasExistingRegistration && (
          <form onSubmit={handleSubmit} className="space-y-8 animate-in slide-in-from-bottom-4 duration-500">
            <div className="flex justify-between items-center border-b border-purple-100 pb-4">
              <div className="flex items-center gap-2">
                <Users className="text-purple-400" size={20} />
                <span className="text-slate-500 text-[10px] uppercase tracking-[0.2em] font-sans font-bold">Party RSVP</span>
              </div>
              <button type="button" onClick={handleReset} className="text-purple-300 hover:text-purple-600 transition-colors"><X size={20}/></button>
            </div>
            
            {selectedPartyData.map((member, idx) => {
              const isAttending = attendanceStates[idx] === 'yes';

              return (
                <div key={idx} className="p-6 bg-purple-50 rounded-2xl border border-purple-100 space-y-4">
                  <p className="font-bold text-purple-900 font-serif italic text-lg">{member.name}</p>
                  
                  <select 
                    name={`attendance-${idx}`} 
                    className="w-full py-2 bg-transparent border-b border-purple-200 outline-none font-sans text-slate-700"
                    onChange={(e) => handleAttendanceChange(idx, e.target.value)}
                    defaultValue="yes"
                  >
                    <option value="yes">Joyfully Accepts</option>
                    <option value="no">Regretfully Declines</option>
                  </select>

                  <div className={`relative transition-opacity duration-300 ${!isAttending ? 'opacity-50' : 'opacity-100'}`}>
                      <Utensils className="absolute left-0 top-2 text-purple-200" size={16} />
                      <select 
                        name={`food-${idx}`} 
                        className="w-full py-2 pl-6 bg-transparent border-b border-purple-200 outline-none font-sans text-slate-700 text-sm invalid:text-slate-400"
                        required={isAttending}
                        disabled={!isAttending}
                        defaultValue=""
                      >
                        <option value="" disabled>Select Entrée{isAttending ? ' (Required)' : ''}...</option>
                        <option value="Braised Short Ribs">Braised Short Ribs</option>
                        <option value="Miso Glazed Salmon">Miso Glazed Salmon</option>
                        <option value="Wild Mushroom Risotto (V)">Wild Mushroom Risotto (V)</option>
                        <option value="Chicken Tenders (Kids)">Chicken Tenders (Kids)</option>
                      </select>
                  </div>

                  <input name={`dietary-${idx}`} className="w-full py-2 bg-transparent border-b border-purple-200 outline-none font-sans text-sm" placeholder="Any Dietary Restrictions?" />
                </div>
              );
            })}
            
            <input name="music" className="w-full py-3 bg-white px-4 rounded-xl border border-purple-100 outline-none font-sans" placeholder="Song Request for the Dance Floor" />
            
            <button type="submit" disabled={status === "SENDING"}  className="w-full py-5 bg-purple-900 text-white rounded-full font-bold tracking-[0.3em] text-[10px] uppercase shadow-xl hover:bg-purple-800 transition-all">
              {status === "SENDING" ? "Submitting..." : "Confirm Party RSVP"}
            </button>
          </form>
        )}
      </div>
    </main>
  );
};

export default RenderRSVP;
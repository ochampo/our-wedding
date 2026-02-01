import { useState } from 'react';
import { Heart, Search, Check, Users, X, CalendarCheck, Utensils, Square, CheckSquare, Clock } from 'lucide-react';

const RenderRSVP = ({ allGuests, rsvpMap, googleScriptUrl }) => {
  // --- STATE ---
  const [searchTerm, setSearchTerm] = useState("");
  const [status, setStatus] = useState("IDLE");
  const [selectedPartyData, setSelectedPartyData] = useState([]);

  // Local memory to track submissions during this session
  const [recentlySubmitted, setRecentlySubmitted] = useState({});

  // Form State
  const [attendanceStates, setAttendanceStates] = useState({});
  const [selectedGuests, setSelectedGuests] = useState({});

  // --- HANDLERS ---
  const handleSelectName = (guest) => {
    let partyMembers = allGuests.filter(g => g.partyId === guest.partyId);

    // 1. MERGE DATA
    let mergedData = partyMembers.map(member => {
        const key = member.name.toLowerCase().trim();
        const foundData = rsvpMap[key] || recentlySubmitted[key];
        return { ...member, existingRSVP: foundData || null };
    });

    // 2. FORM SORTING (Pending & Match at Top)
    mergedData.sort((a, b) => {
        if (a.name === guest.name) return -1;
        if (b.name === guest.name) return 1;

        const aIsDone = !!a.existingRSVP;
        const bIsDone = !!b.existingRSVP;

        if (aIsDone === bIsDone) return 0;
        if (!aIsDone && bIsDone) return -1;
        return 1;
    });

    // 3. INITIALIZE FORM
    const initialStates = {};
    const initialSelection = {};

    mergedData.forEach((member, index) => {
      initialStates[index] = 'yes';
      if (member.existingRSVP) {
          initialSelection[index] = false;
      } else {
          if (member.name === guest.name) {
              initialSelection[index] = true;
          } else {
              initialSelection[index] = false;
          }
      }
    });

    setAttendanceStates(initialStates);
    setSelectedGuests(initialSelection);
    setSelectedPartyData(mergedData);
    setSearchTerm("");
  };

  const handleReset = () => {
    setSelectedPartyData([]);
    setSearchTerm("");
    setStatus("IDLE");
    setSelectedGuests({});
  };

  const handleAttendanceChange = (index, value) => {
    setAttendanceStates(prev => ({ ...prev, [index]: value }));
  };

  const toggleGuestSelection = (index) => {
    setSelectedGuests(prev => ({ ...prev, [index]: !prev[index] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("SENDING");
    const formData = new FormData(e.target);

    const responses = selectedPartyData
      .map((guest, index) => {
        if (!selectedGuests[index]) return null;

        return {
          name: guest.name,
          attendance: formData.get(`attendance-${index}`),
          food: formData.get(`attendance-${index}`) === 'no' ? 'N/A' : formData.get(`food-${index}`),
          dietary: formData.get(`dietary-${index}`) || "None",
          music: formData.get('music') || "None",
          date: new Date().toLocaleString()
        };
      })
      .filter(Boolean);

    if (responses.length === 0) {
        alert("Please select at least one guest to RSVP.");
        setStatus("IDLE");
        return;
    }

    try {
      await fetch(googleScriptUrl, {
        method: "POST",
        mode: "no-cors",
        body: JSON.stringify({ partyResponse: responses })
      });

      const newRecentSubmissions = { ...recentlySubmitted };
      responses.forEach(r => {
          newRecentSubmissions[r.name.toLowerCase().trim()] = r;
      });
      setRecentlySubmitted(newRecentSubmissions);

      const updatedDataForDisplay = selectedPartyData.map((member) => {
         const newResponse = responses.find(r => r.name === member.name);
         return {
            ...member,
            existingRSVP: newResponse || member.existingRSVP
         };
      });

      setSelectedPartyData(updatedDataForDisplay);

      const newSelections = {};
      updatedDataForDisplay.forEach((_, i) => newSelections[i] = false);
      setSelectedGuests(newSelections);

      setStatus("SUCCESS");

    } catch (error) {
      setStatus("ERROR");
    }
  };

  const filteredResults = searchTerm.length > 2
    ? allGuests.filter(g => g.name.toLowerCase().includes(searchTerm.toLowerCase().trim())).slice(0, 6)
    : [];

  const isPartyComplete = selectedPartyData.length > 0
    && selectedPartyData.every(m => m.existingRSVP);

  const showSummaryView = isPartyComplete || status === "SUCCESS";

  const getAttendanceLabel = (val) => val === 'yes' ? 'Joyfully Accepts' : 'Regretfully Declines';

  const summaryViewData = [...selectedPartyData].sort((a, b) => {
      const aDone = !!a.existingRSVP;
      const bDone = !!b.existingRSVP;
      if (aDone && !bDone) return -1;
      if (!aDone && bDone) return 1;
      return 0;
  });

  return (
    <main className="min-h-screen py-24 px-6">


      {/* Main Content (Z-Index ensures it sits above hearts) */}
      <div className="relative z-10 max-w-xl mx-auto">

        <div className="text-center mb-12">
            <Heart className="mx-auto text-purple-300 mb-6" size={40} />
            <h2 className="text-6xl text-purple-900 font-serif italic">RSVP</h2>
        </div>

        {/* --- VIEW 1: SEARCH --- */}
        {selectedPartyData.length === 0 && (
          <div className="space-y-6">
            <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg">
              <input
                type="text"
                placeholder="Search your name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full py-4 px-12 bg-transparent outline-none text-lg font-sans text-purple-900 placeholder:text-purple-300"
              />
              <Search className="absolute left-4 top-4 text-purple-300" size={20} />
            </div>
            <div className="space-y-2">
              {filteredResults.map((guest, i) => (
                <button key={i} onClick={() => handleSelectName(guest)} className="w-full p-4 text-left bg-white/90 hover:bg-white border border-purple-50 rounded-xl shadow-sm hover:shadow-md transition-all flex items-center justify-between">
                  <span className="text-slate-700 font-medium font-serif italic text-lg">{guest.name}</span>
                  <Check size={16} className="text-purple-200" />
                </button>
              ))}
            </div>
          </div>
        )}

        {/* --- VIEW 2: SUMMARY --- */}
        {selectedPartyData.length > 0 && showSummaryView && (
          <div className="space-y-6">
             {status === "SUCCESS" && (
                <div className="p-4 bg-green-50 text-green-800 rounded-xl text-center mb-4 border border-green-200">
                    <p className="font-bold font-serif italic">Thank you! Your RSVP has been sent.</p>
                </div>
            )}
            <div className="p-8 bg-white/90 backdrop-blur-sm rounded-3xl border border-purple-100 shadow-xl">
              <div className="flex items-center gap-3 mb-6 border-b border-purple-100 pb-4">
                <CalendarCheck className="text-purple-600" size={24} />
                <h3 className="text-xl font-bold text-purple-900 font-serif italic">Party Status</h3>
              </div>
              <div className="space-y-6">
                 {summaryViewData.map((member, idx) => {
                    if (member.existingRSVP) {
                        return (
                            <div key={idx} className="border-b border-purple-50 pb-4 last:border-0 last:pb-0">
                                 <div className="flex justify-between items-center mb-1">
                                    <span className="font-bold text-purple-900 text-lg font-serif italic">{member.name}</span>
                                    <span className={`text-xs font-bold uppercase tracking-wider ${member.existingRSVP.attendance === 'yes' ? 'text-green-600' : 'text-slate-400'}`}>
                                        {getAttendanceLabel(member.existingRSVP.attendance)}
                                    </span>
                                 </div>
                                 {member.existingRSVP.attendance === 'yes' && (
                                     <div className="text-sm text-slate-600 pl-2 border-l-2 border-purple-200 mt-2">
                                          <p>Plate: {member.existingRSVP.food}</p>
                                          {member.existingRSVP.dietary && member.existingRSVP.dietary !== "None" && <p className="italic text-xs">Dietary: {member.existingRSVP.dietary}</p>}
                                     </div>
                                 )}
                            </div>
                        );
                    }
                    return (
                        <div key={idx} className="border-b border-purple-50 pb-4 last:border-0 last:pb-0 flex justify-between items-center opacity-40">
                            <span className="font-bold text-slate-500 text-lg font-serif italic">{member.name}</span>
                            <div className="flex items-center gap-1 text-slate-400">
                                <Clock size={14} />
                                <span className="text-xs uppercase tracking-wider font-bold">Pending</span>
                            </div>
                        </div>
                    );
                 })}
              </div>
            </div>
            <div className="text-center">
                 <button onClick={handleReset} className="text-slate-400 text-xs hover:text-purple-600 underline uppercase tracking-widest">Back to Search</button>
            </div>
          </div>
        )}

        {/* --- VIEW 3: FORM --- */}
        {selectedPartyData.length > 0 && !showSummaryView && (
          <form onSubmit={handleSubmit} className="space-y-8 bg-white/50 p-6 rounded-3xl backdrop-blur-sm">

            <div className="flex justify-between items-center border-b border-purple-100 pb-4">
              <div className="flex items-center gap-2">
                <Users className="text-purple-400" size={20} />
                <span className="text-slate-500 text-[10px] uppercase tracking-[0.2em] font-sans font-bold">Party RSVP</span>
              </div>
              <button type="button" onClick={handleReset} className="text-purple-300 hover:text-purple-600 transition-colors"><X size={20}/></button>
            </div>

            {selectedPartyData.map((member, idx) => {
              const alreadyRegistered = !!member.existingRSVP;

              if (alreadyRegistered) {
                  return (
                    <div key={idx} className="p-6 bg-purple-50/80 border border-purple-100 rounded-2xl relative">
                        <div className="absolute top-4 right-4 text-green-600"><Check size={20} /></div>
                        <p className="font-bold text-purple-900 font-serif italic text-xl opacity-80 mb-2">{member.name}</p>
                        <span className={`text-xs font-bold px-2 py-1 rounded-full uppercase tracking-wider ${member.existingRSVP.attendance === 'yes' ? 'bg-green-100 text-green-700' : 'bg-slate-200 text-slate-500'}`}>
                            {getAttendanceLabel(member.existingRSVP.attendance)}
                        </span>
                    </div>
                  )
              }

              const isSelected = selectedGuests[idx];
              const isAttending = attendanceStates[idx] === 'yes';

              return (
                <div key={idx} className={`p-6 rounded-2xl border transition-all duration-300 shadow-sm ${isSelected ? 'bg-white border-purple-200' : 'bg-slate-50/50 border-slate-100 opacity-70'}`}>

                  <div className="flex items-center gap-3 mb-4 cursor-pointer" onClick={() => toggleGuestSelection(idx)}>
                    <div className={`text-purple-600 transition-transform duration-200 ${isSelected ? 'scale-110' : 'scale-100 text-slate-300'}`}>
                        {isSelected ? <CheckSquare size={24} /> : <Square size={24} />}
                    </div>
                    <p className={`font-bold font-serif italic text-xl ${isSelected ? 'text-purple-900' : 'text-slate-500'}`}>
                        {member.name}
                    </p>
                  </div>

                  <div className={`space-y-4 transition-all duration-300 ${isSelected ? 'block' : 'hidden'}`}>
                      <select
                        name={`attendance-${idx}`}
                        className="w-full py-2 bg-transparent border-b border-purple-200 outline-none font-sans text-slate-700"
                        onChange={(e) => handleAttendanceChange(idx, e.target.value)}
                        defaultValue="yes"
                      >
                        <option value="yes">Joyfully Accepts</option>
                        <option value="no">Regretfully Declines</option>
                      </select>

                      {isAttending && (
                          <div className="relative animate-in fade-in">
                              <Utensils className="absolute left-0 top-2 text-purple-200" size={16} />
                              <select
                                name={`food-${idx}`}
                                className="w-full py-2 pl-6 bg-transparent border-b border-purple-200 outline-none font-sans text-slate-700 text-sm"
                                required={isSelected && isAttending}
                                defaultValue=""
                              >
                                <option value="" disabled>Select Entrée...</option>
                                {member.smallMeal ? (
                                  <>
                                    <option value="Chicken Tenders (Kids)">Chicken Tenders (Kids)</option>
                                    <option value="No Meal">No Meal</option>
                                  </>
                                ) : (
                                  <>
                                    <option value="Filet Mignon">Filet Mignon</option>
                                    <option value="Forest Mushroom Chicken">Forest Mushroom Chicken</option>
                                    <option value="Spinach and Cheese Ravioli (V)">Spinach and Cheese Ravioli (V)</option>
                                    <option value="Chicken Tenders (Kids)">Chicken Tenders (Kids)</option>
                                  </>
                                )}
                              </select>

                              <input
                                name={`dietary-${idx}`}
                                className="w-full py-2 mt-2 bg-transparent border-b border-purple-200 outline-none font-sans text-sm"
                                placeholder="Dietary Restrictions?"
                              />
                          </div>
                      )}
                  </div>
                </div>
              );
            })}

            <button type="submit" disabled={status === "SENDING"}  className="w-full py-5 bg-purple-900 text-white rounded-full font-bold tracking-[0.3em] text-[10px] uppercase shadow-xl hover:bg-purple-800 transition-all">
              {status === "SENDING" ? "Submitting..." : "Confirm RSVP"}
            </button>
          </form>
        )}
      </div>
    </main>
  );
};

export default RenderRSVP;

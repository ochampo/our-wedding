import { useState } from 'react';
import { Heart, Search, Check, Users, X, CalendarCheck, Utensils, Square, CheckSquare, Clock, Music } from 'lucide-react';
import watercolor_floral from './components/images/watercolor_floral.jpg';
import config from './config/weddingConfig';

const RenderRSVP = ({ allGuests, rsvpMap, googleScriptUrl }) => {
  // --- STATE (UNCHANGED) ---
  const [searchTerm, setSearchTerm] = useState("");
  const [status, setStatus] = useState("IDLE");
  const [selectedPartyData, setSelectedPartyData] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);

  // Local memory to track submissions during this session
  const [recentlySubmitted, setRecentlySubmitted] = useState({});

  // Form State
  const [attendanceStates, setAttendanceStates] = useState({});
  const [selectedGuests, setSelectedGuests] = useState({});

  // --- SEARCH HANDLERS (UNCHANGED) ---
  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
    if (hasSearched) {
      setHasSearched(false);
      setSearchResults([]);
    }
  };

  const handleManualSearch = () => {
    const term = searchTerm.trim().toLowerCase();

    if (term.length < 3) {
      alert("Please enter at least 3 characters to search.");
      return;
    }

    const results = allGuests.filter(g =>
      g.name.toLowerCase().includes(term)
    ).slice(0, 5);

    setSearchResults(results);
    setHasSearched(true);
  };

  // --- SELECTION HANDLERS (UNCHANGED) ---
  const handleSelectName = (guest) => {
    let partyMembers = allGuests.filter(g => g.partyId === guest.partyId);

    let mergedData = partyMembers.map(member => {
        const key = member.name.toLowerCase().trim();
        const foundData = rsvpMap[key] || recentlySubmitted[key];
        return { ...member, existingRSVP: foundData || null };
    });

    mergedData.sort((a, b) => {
        if (a.name === guest.name) return -1;
        if (b.name === guest.name) return 1;
        const aIsDone = !!a.existingRSVP;
        const bIsDone = !!b.existingRSVP;
        if (aIsDone === bIsDone) return 0;
        return !aIsDone && bIsDone ? -1 : 1;
    });

    const initialStates = {};
    const initialSelection = {};

    mergedData.forEach((member, index) => {
      initialStates[index] = 'yes';
      if (member.existingRSVP) {
          initialSelection[index] = false;
      } else {
          initialSelection[index] = (member.name === guest.name);
      }
    });

    setAttendanceStates(initialStates);
    setSelectedGuests(initialSelection);
    setSelectedPartyData(mergedData);
    setSearchTerm("");
    setHasSearched(false);
    setSearchResults([]);
  };

  const handleReset = () => {
    setSelectedPartyData([]);
    setSearchTerm("");
    setStatus("IDLE");
    setSelectedGuests({});
    setHasSearched(false);
    setSearchResults([]);
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
          music: formData.get(`music-${index}`) || "None",
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
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 15000);

      const response = await fetch(googleScriptUrl, {
        method: "POST",
        headers: {
          "Content-Type": "text/plain",
        },
        body: JSON.stringify({ partyResponse: responses }),
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      const responseText = await response.text();
      if (!responseText.includes("Success")) {
        throw new Error(responseText || "Unknown server error");
      }

      const newRecentSubmissions = { ...recentlySubmitted };
      responses.forEach(r => {
          newRecentSubmissions[r.name.toLowerCase().trim()] = r;
      });
      setRecentlySubmitted(newRecentSubmissions);

      const updatedDataForDisplay = selectedPartyData.map((member) => {
         const newResponse = responses.find(r => r.name === member.name);
         return { ...member, existingRSVP: newResponse || member.existingRSVP };
      });

      setSelectedPartyData(updatedDataForDisplay);
      const newSelections = {};
      updatedDataForDisplay.forEach((_, i) => newSelections[i] = false);
      setSelectedGuests(newSelections);
      setStatus("SUCCESS");
    } catch (error) {
      console.error("RSVP submission error:", error);
      setStatus("ERROR");
    }
  };

  const isPartyComplete = selectedPartyData.length > 0 && selectedPartyData.every(m => m.existingRSVP);
  const showSummaryView = isPartyComplete || status === "SUCCESS";
  const getAttendanceLabel = (val) => val === 'yes' ? 'Joyfully Accepts' : 'Regretfully Declines';

  // --- STYLES ---
  const textGlow = {
    textShadow: '0 0 10px rgba(255, 255, 255, 0.9), 0 0 4px rgba(255, 255, 255, 1)'
  };

  return (
    <main className="relative min-h-screen w-full bg-slate-50">

      {/* --- MOBILE WALLPAPER (Fixed & Flex Stacked) --- */}
      <div
      className="block md:hidden fixed inset-0 z-0 pointer-events-none opacity-60"
      style={{
        backgroundImage: `url(${watercolor_floral})`,
        backgroundRepeat: 'repeat',
        backgroundSize: '320%'
      }}
    >
       <div className="absolute inset-0 bg-white/30" />
    </div>
      {/* --- DESKTOP BACKGROUND --- */}
      <img src={watercolor_floral} alt="Background" className="hidden md:block fixed inset-0 w-full h-full object-cover z-0 opacity-60" />

      {/* --- CONTENT CONTAINER ---
          - Added 'pb-40' to allow scrolling past the bottom on mobile
      */}
      <div className="relative z-10 max-w-xl mx-auto py-24 px-6 pb-40">

        {/* HEADER */}
        <div className="text-center mb-12">
            <div className="inline-block p-4 bg-white/40 backdrop-blur-md rounded-full mb-6 shadow-sm border border-white/50">
                <Heart className="text-purple-900" size={32} />
            </div>
            <h2 className="text-6xl text-purple-900 font-serif italic mb-4" style={textGlow}>RSVP</h2>
            <p className="text-purple-900  text-lg" style={textGlow}>Kindly RSVP by {config.dates.rsvpDeadline} for our reception</p>
        </div>

        {/* --- VIEW 1: SEARCH --- */}
        {selectedPartyData.length === 0 && (
          <div className="space-y-6">
            <div className="flex gap-2">
                <div className="relative flex-1 bg-white/60 backdrop-blur-md rounded-2xl shadow-xl border border-white/60">
                <input
                    type="text"
                    placeholder="Enter name..."
                    value={searchTerm}
                    onChange={handleInputChange}
                    onKeyDown={(e) => e.key === 'Enter' && handleManualSearch()}
                    className="w-full py-4 px-12 bg-transparent outline-none text-lg font-sans text-purple-900 placeholder:text-slate-500 font-medium"
                />
                <Search className="absolute left-4 top-4 text-purple-900" size={20} />
                </div>
                <button
                    onClick={handleManualSearch}
                    className="px-6 bg-purple-900 text-white rounded-2xl font-bold text-[10px] uppercase tracking-widest hover:bg-purple-800 transition-all shadow-lg backdrop-blur-sm"
                >
                    Search
                </button>
            </div>

            <div className="space-y-2">
              {hasSearched && searchResults.length > 0 && searchResults.map((guest, i) => (
                <button key={i} onClick={() => handleSelectName(guest)} className="w-full p-4 text-left bg-white/80 backdrop-blur-md hover:bg-white border border-white/60 rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-between group animate-in slide-in-from-top-2 duration-300">
                  <span className="text-purple-900 font-bold font-serif italic text-lg">{guest.name}</span>
                  <Check size={16} className="text-purple-300 group-hover:text-purple-600 transition-colors" />
                </button>
              ))}

              {hasSearched && searchResults.length === 0 && (
                <div className="p-8 text-center bg-white/40 backdrop-blur-md rounded-2xl border-2 border-dashed border-white/60 shadow-lg">
                    <p className="text-purple-900 font-bold text-sm italic">We couldn't find "{searchTerm}" on the list.</p>
                    <p className="text-purple-800 text-xs mt-2 uppercase tracking-tight font-bold">Check spelling or try searching your first name.</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* --- VIEW 2: SUMMARY --- */}
        {selectedPartyData.length > 0 && showSummaryView && (
          <div className="space-y-6 animate-in fade-in zoom-in-95 duration-500">
             {status === "SUCCESS" && (
                <div className="p-4 bg-green-100/90 text-green-900 rounded-xl text-center mb-4 border border-green-200 shadow-lg backdrop-blur-md">
                    <p className="font-bold font-serif italic text-lg">Thank you! Your RSVP has been sent.</p>
                    <p className="text-xs mt-2 font-bold">If you need to make changes, please contact us directly.</p>
                </div>
            )}
            <div className="p-8 bg-white/60 backdrop-blur-xl rounded-3xl border border-white/60 shadow-2xl">
              <div className="flex items-center gap-3 mb-6 border-b border-purple-100/50 pb-4">
                <CalendarCheck className="text-purple-900" size={24} />
                <h3 className="text-xl font-bold text-purple-900 font-serif italic">Party Status</h3>
              </div>
              <div className="space-y-6">
                 {selectedPartyData.map((member, idx) => (
                    <div key={idx} className="border-b border-purple-100/50 pb-4 last:border-0 last:pb-0">
                        <div className="flex justify-between items-center mb-1">
                            <span className="font-bold text-purple-900 text-lg font-serif italic">{member.name}</span>
                            {member.existingRSVP ? (
                                <span className={`text-xs font-bold uppercase tracking-wider px-2 py-1 rounded-md ${member.existingRSVP.attendance === 'yes' ? 'bg-green-100 text-green-800' : 'bg-slate-200 text-slate-500'}`}>
                                    {getAttendanceLabel(member.existingRSVP.attendance)}
                                </span>
                            ) : (
                                <div className="flex items-center gap-1 text-slate-500 opacity-60">
                                    <Clock size={14} /><span className="text-xs uppercase font-bold">Pending</span>
                                </div>
                            )}
                        </div>
                        {member.existingRSVP?.attendance === 'yes' && (
                            <div className="text-sm text-slate-800 pl-3 border-l-2 border-purple-300 mt-2 font-medium">
                                <p>Plate: {member.existingRSVP.food}</p>
                                {member.existingRSVP.dietary !== "None" && <p className="italic text-xs mt-1">Dietary: {member.existingRSVP.dietary}</p>}
                                {member.existingRSVP.music !== "None" && <p className="italic text-xs mt-1">🎵 {member.existingRSVP.music}</p>}
                            </div>
                        )}
                    </div>
                 ))}
              </div>
            </div>
            <div className="text-center">
                 <button onClick={handleReset} className="text-purple-900 font-bold text-xs hover:text-purple-600 underline uppercase tracking-widest" style={textGlow}>Back to Search</button>
            </div>
          </div>
        )}

        {/* --- VIEW 3: FORM --- */}
        {selectedPartyData.length > 0 && !showSummaryView && (
          <form onSubmit={handleSubmit} className="space-y-6 bg-white/60 p-6 md:p-8 rounded-3xl backdrop-blur-xl shadow-2xl border border-white/60 animate-in fade-in zoom-in-95 duration-500">
            {status === "ERROR" && (
              <div className="p-4 bg-red-100 text-red-900 rounded-xl text-center border border-red-200">
                  <p className="font-bold font-serif italic">Oops! Something went wrong.</p>
                  <p className="text-xs mt-2 font-bold">Please check your connection and try again.</p>
              </div>
            )}

            <div className="flex justify-between items-center border-b border-purple-100/50 pb-4">
              <div className="flex items-center gap-2">
                <Users className="text-purple-900" size={20} />
                <span className="text-purple-900 text-[10px] uppercase tracking-[0.2em] font-sans font-bold">Party RSVP</span>
              </div>
              <button type="button" onClick={handleReset} className="text-purple-400 hover:text-purple-900 transition-colors bg-white/50 rounded-full p-1"><X size={20}/></button>
            </div>

            {selectedPartyData.map((member, idx) => {
              const alreadyRegistered = !!member.existingRSVP;
              const isSelected = selectedGuests[idx];
              const isAttending = attendanceStates[idx] === 'yes';

              if (alreadyRegistered) {
                  return (
                    <div key={idx} className="p-6 bg-purple-50/80 border border-purple-100 rounded-2xl relative shadow-sm">
                        <div className="absolute top-4 right-4 text-green-600"><Check size={20} /></div>
                        <p className="font-bold text-purple-900 font-serif italic text-xl opacity-80 mb-2">{member.name}</p>
                        <span className={`text-xs font-bold px-2 py-1 rounded-md uppercase tracking-wider ${member.existingRSVP.attendance === 'yes' ? 'bg-green-100 text-green-800' : 'bg-slate-200 text-slate-500'}`}>
                            {getAttendanceLabel(member.existingRSVP.attendance)}

                        </span>
                        <div className="text-sm text-slate-800 pl-3 border-l-2 border-purple-300 mt-2 font-medium">
                                <p>Plate: {member.existingRSVP.food}</p>
                                {member.existingRSVP.dietary !== "None" && <p className="italic text-xs mt-1">Dietary: {member.existingRSVP.dietary}</p>}
                                {member.existingRSVP.music !== "None" && <p className="italic text-xs mt-1">🎵 {member.existingRSVP.music}</p>}
                        </div>
                    </div>
                  )
              }

              return (
                <div key={idx} className={`p-6 rounded-2xl border-2 transition-all duration-300 shadow-sm ${isSelected ? 'bg-white border-purple-300 shadow-md transform scale-[1.02]' : 'bg-white/40 border-white/40 opacity-70 hover:opacity-100'}`}>
                  <div className="flex items-center gap-3 mb-4 cursor-pointer" onClick={() => toggleGuestSelection(idx)}>
                    <div className={`text-purple-600 transition-transform duration-200 ${isSelected ? 'scale-110' : 'scale-100 text-slate-400'}`}>
                        {isSelected ? <CheckSquare size={24} /> : <Square size={24} />}
                    </div>
                    <p className={`font-bold font-serif italic text-xl ${isSelected ? 'text-purple-900' : 'text-slate-600'}`}>
                        {member.name}
                    </p>
                  </div>

                  <div className={`space-y-4 transition-all duration-300 ${isSelected ? 'block' : 'hidden'}`}>
                      <select name={`attendance-${idx}`} className="w-full py-2 bg-transparent border-b-2 border-purple-100 outline-none font-sans text-slate-800 font-bold focus:border-purple-500 transition-colors cursor-pointer" onChange={(e) => handleAttendanceChange(idx, e.target.value)} defaultValue="yes">
                        <option value="yes">Joyfully Accepts</option>
                        <option value="no">Regretfully Declines</option>
                      </select>

                      {isAttending && (
                          <div className="relative animate-in fade-in slide-in-from-top-2">
                              <Utensils className="absolute left-0 top-2 text-purple-300" size={16} />
                              <select name={`food-${idx}`} className="w-full py-2 pl-8 bg-transparent border-b border-purple-200 outline-none font-sans text-slate-800 text-sm font-medium cursor-pointer" required={isSelected && isAttending} defaultValue="">
                                <option value="" disabled>Select Entrée...</option>
                                {member.smallMeal ? (
                                  config.menu.kidsOptions.map((opt) => (
                                    <option key={opt.label} value={opt.label}>{opt.label}</option>
                                  ))
                                ) : (
                                  config.menu.adultOptions.map((opt) => (
                                    <option key={opt.label} value={opt.label}>{opt.displayLabel || opt.label}</option>
                                  ))
                                )}
                              </select>

                              <input name={`dietary-${idx}`} className="w-full py-2 mt-4 bg-transparent border-b border-purple-200 outline-none font-sans text-sm text-slate-800 placeholder:text-slate-400" placeholder="Dietary Restrictions (Optional)" />

                              <div className="relative mt-4">
                                <Music className="absolute left-0 top-2 text-purple-300" size={16} />
                                <input name={`music-${idx}`} className="w-full py-2 pl-8 bg-transparent border-b border-purple-200 outline-none font-sans text-sm text-slate-800 placeholder:text-slate-400" placeholder="Song Request (Optional)" />
                              </div>
                          </div>
                      )}
                  </div>
                </div>
              );
            })}

            <button type="submit" disabled={status === "SENDING"} className="w-full py-5 bg-purple-900 text-white rounded-full font-bold tracking-[0.3em] text-[12px] uppercase shadow-xl hover:bg-purple-800 transition-all disabled:opacity-50 hover:-translate-y-0.5 active:scale-95">
              {status === "SENDING" ? "Submitting..." : "Confirm RSVP"}
            </button>
          </form>
        )}
      </div>
    </main>
  );
};

export default RenderRSVP;

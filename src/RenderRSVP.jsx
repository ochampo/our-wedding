import { useState } from 'react';
import { Heart, Search, Check, Users, X, CalendarCheck, Utensils, Square, CheckSquare, Clock, Music } from 'lucide-react';

const RenderRSVP = ({ allGuests, rsvpMap, googleScriptUrl }) => {
  // --- STATE ---
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

  // --- SEARCH HANDLERS ---
  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
    // Hide results immediately when they start re-typing for privacy
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

    // Filter logic only runs when button is clicked
    const results = allGuests.filter(g =>
      g.name.toLowerCase().includes(term)
    ).slice(0, 5); // Limit results to keep it clean

    setSearchResults(results);
    setHasSearched(true);
  };

  // --- SELECTION HANDLERS ---
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
          "Content-Type": "text/plain", // Required for Google Apps Script
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

  return (
    <main className="min-h-screen py-24 px-6">
      <div className="relative z-10 max-w-xl mx-auto">
        <div className="text-center mb-12">
            <Heart className="mx-auto text-purple-300 mb-6" size={40} />
            <h2 className="text-6xl text-purple-900 font-serif italic">RSVP</h2>
            <p className="mt-6 text-purple-500">Kindly RSVP by April 10th for our reception</p>
        </div>

        {/* --- VIEW 1: SEARCH --- */}
        {selectedPartyData.length === 0 && (
          <div className="space-y-6">
            <div className="flex gap-2">
                <div className="relative flex-1 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-purple-100">
                <input
                    type="text"
                    placeholder="Enter your full name..."
                    value={searchTerm}
                    onChange={handleInputChange}
                    onKeyDown={(e) => e.key === 'Enter' && handleManualSearch()}
                    className="w-full py-4 px-12 bg-transparent outline-none text-lg font-sans text-purple-900 placeholder:text-purple-300"
                />
                <Search className="absolute left-4 top-4 text-purple-300" size={20} />
                </div>
                <button
                    onClick={handleManualSearch}
                    className="px-6 bg-purple-900 text-white rounded-2xl font-bold text-[10px] uppercase tracking-widest hover:bg-purple-800 transition-all shadow-md"
                >
                    Search
                </button>
            </div>

            <div className="space-y-2">
              {/* Only show these if the user has explicitly clicked Search */}
              {hasSearched && searchResults.length > 0 && searchResults.map((guest, i) => (
                <button key={i} onClick={() => handleSelectName(guest)} className="w-full p-4 text-left bg-white/90 hover:bg-white border border-purple-50 rounded-xl shadow-sm hover:shadow-md transition-all flex items-center justify-between group animate-in slide-in-from-top-2 duration-300">
                  <span className="text-slate-700 font-medium font-serif italic text-lg">{guest.name}</span>
                  <Check size={16} className="text-purple-200 group-hover:text-purple-500 transition-colors" />
                </button>
              ))}

              {/* No Results Feedback */}
              {hasSearched && searchResults.length === 0 && (
                <div className="p-8 text-center bg-white/50 backdrop-blur-sm rounded-2xl border border-dashed border-purple-200">
                    <p className="text-slate-500 text-sm italic">We couldn't find "{searchTerm}" on the list.</p>
                    <p className="text-slate-400 text-xs mt-2 uppercase tracking-tight">Check spelling or try searching your first name.</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* --- VIEW 2: SUMMARY --- */}
        {selectedPartyData.length > 0 && showSummaryView && (
          <div className="space-y-6">
             {status === "SUCCESS" && (
                <div className="p-4 bg-green-50 text-green-800 rounded-xl text-center mb-4 border border-green-200">
                    <p className="font-bold font-serif italic">Thank you! Your RSVP has been sent.</p>
                    <p className="text-xs mt-2 text-green-600">If you need to make changes, please contact us directly.</p>
                </div>
            )}
            <div className="p-8 bg-white/90 backdrop-blur-sm rounded-3xl border border-purple-100 shadow-xl">
              <div className="flex items-center gap-3 mb-6 border-b border-purple-100 pb-4">
                <CalendarCheck className="text-purple-600" size={24} />
                <h3 className="text-xl font-bold text-purple-900 font-serif italic">Party Status</h3>
              </div>
              <div className="space-y-6">
                 {selectedPartyData.map((member, idx) => (
                    <div key={idx} className="border-b border-purple-50 pb-4 last:border-0 last:pb-0">
                        <div className="flex justify-between items-center mb-1">
                            <span className="font-bold text-purple-900 text-lg font-serif italic">{member.name}</span>
                            {member.existingRSVP ? (
                                <span className={`text-xs font-bold uppercase tracking-wider ${member.existingRSVP.attendance === 'yes' ? 'text-green-600' : 'text-slate-400'}`}>
                                    {getAttendanceLabel(member.existingRSVP.attendance)}
                                </span>
                            ) : (
                                <div className="flex items-center gap-1 text-slate-400 opacity-40">
                                    <Clock size={14} /><span className="text-xs uppercase font-bold">Pending</span>
                                </div>
                            )}
                        </div>
                        {member.existingRSVP?.attendance === 'yes' && (
                            <div className="text-sm text-slate-600 pl-2 border-l-2 border-purple-200 mt-2">
                                <p>Plate: {member.existingRSVP.food}</p>
                                {member.existingRSVP.dietary !== "None" && <p className="italic text-xs">Dietary: {member.existingRSVP.dietary}</p>}
                                {member.existingRSVP.music !== "None" && <p className="italic text-xs mt-1">🎵 {member.existingRSVP.music}</p>}
                            </div>
                        )}
                    </div>
                 ))}
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
            {status === "ERROR" && (
              <div className="p-4 bg-red-50 text-red-800 rounded-xl text-center border border-red-200">
                  <p className="font-bold font-serif italic">Oops! Something went wrong.</p>
                  <p className="text-xs mt-2">Please check your connection and try again. If the problem persists, contact us directly.</p>
              </div>
            )}
            <div className="flex justify-between items-center border-b border-purple-100 pb-4">
              <div className="flex items-center gap-2">
                <Users className="text-purple-400" size={20} />
                <span className="text-slate-500 text-[10px] uppercase tracking-[0.2em] font-sans font-bold">Party RSVP</span>
              </div>
              <button type="button" onClick={handleReset} className="text-purple-300 hover:text-purple-600 transition-colors"><X size={20}/></button>
            </div>

            {selectedPartyData.map((member, idx) => {
              const alreadyRegistered = !!member.existingRSVP;
              const isSelected = selectedGuests[idx];
              const isAttending = attendanceStates[idx] === 'yes';

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
                      <select name={`attendance-${idx}`} className="w-full py-2 bg-transparent border-b border-purple-200 outline-none font-sans text-slate-700" onChange={(e) => handleAttendanceChange(idx, e.target.value)} defaultValue="yes">
                        <option value="yes">Joyfully Accepts</option>
                        <option value="no">Regretfully Declines</option>
                      </select>

                      {isAttending && (
                          <div className="relative animate-in fade-in">
                              <Utensils className="absolute left-0 top-2 text-purple-200" size={16} />
                              <select name={`food-${idx}`} className="w-full py-2 pl-6 bg-transparent border-b border-purple-200 outline-none font-sans text-slate-700 text-sm" required={isSelected && isAttending} defaultValue="">
                                <option value="" disabled>Select Entrée...</option>
                                {member.smallMeal ? (
                                  <>
                                    <option value="Chicken Tenders (Kids)">Chicken Tenders (Kids)</option>
                                    <option value="No Meal">No Meal</option>
                                  </>
                                ) : (
                                  <>
                                    <option value="Filet Mignon">Filet Mignon</option>
                                    <option value="Pan Seared Filet of Salmon">Salmon</option>
                                    <option value="Spinach and Cheese Ravioli (V)">Spinach and Cheese Ravioli (V)</option>
                                    <option value="Chicken Tenders (Kids)">Chicken Tenders (Kids)</option>
                                  </>
                                )}
                              </select>
                              <input name={`dietary-${idx}`} className="w-full py-2 mt-2 bg-transparent border-b border-purple-200 outline-none font-sans text-sm" placeholder="Dietary Restrictions?" />
                              <div className="relative mt-2">
                                <Music className="absolute left-0 top-2 text-purple-200" size={16} />
                                <input name={`music-${idx}`} className="w-full py-2 pl-6 bg-transparent border-b border-purple-200 outline-none font-sans text-sm placeholder:text-slate-400" placeholder="Song Request?" />
                              </div>
                          </div>
                      )}
                  </div>
                </div>
              );
            })}
            <button type="submit" disabled={status === "SENDING"} className="w-full py-5 bg-purple-900 text-white rounded-full font-bold tracking-[0.3em] text-[10px] uppercase shadow-xl hover:bg-purple-800 transition-all disabled:opacity-50">
              {status === "SENDING" ? "Submitting..." : "Confirm RSVP"}
            </button>
          </form>
        )}
      </div>
    </main>
  );
};

export default RenderRSVP;

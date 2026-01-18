import React, { useState } from 'react';
import { Heart, Search, Check, AlertCircle, Users, X } from 'lucide-react';

const RenderRSVP = ({ allGuests, rsvpMap, googleScriptUrl }) => {
  // --- LOCAL STATE (Moved from Main File) ---
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedParty, setSelectedParty] = useState([]);
  const [isDuplicate, setIsDuplicate] = useState(false);
  const [status, setStatus] = useState("IDLE");

  // --- HANDLERS (Moved from Main File) ---
  const handleSelectName = (guest) => {
    // Logic: Find everyone with the same partyId
    const party = allGuests.filter(g => g.partyId === guest.partyId);
    setSelectedParty(party);
    
    // Logic: Check if they already RSVP'd
    const key = guest.name.toLowerCase().trim();
    setIsDuplicate(!!rsvpMap[key]); 
    setSearchTerm(""); 
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("SENDING");
    const formData = new FormData(e.target);
    
    // Build the response object
    const responses = selectedParty.map((guest, index) => ({
      name: guest.name,
      attendance: formData.get(`attendance-${index}`),
      dietary: formData.get(`dietary-${index}`) || "None",
      music: formData.get('music') || "None",
      date: new Date().toLocaleString()
    }));

    try {
      await fetch(googleScriptUrl, { 
        method: "POST", 
        mode: "no-cors", 
        body: JSON.stringify({ partyResponse: responses }) 
      });
      setStatus("SUCCESS");
    } catch (error) { 
      setStatus("ERROR"); 
    }
  };

  // Logic: Filter guests based on search input
  const filteredResults = searchTerm.length > 2 
    ? allGuests.filter(g => g.name.toLowerCase().includes(searchTerm.toLowerCase().trim())).slice(0, 6) 
    : [];

  return (
    <main className="py-24 px-6 animate-in fade-in duration-700">
      <Heart className="mx-auto text-purple-200 mb-6" size={40} />
      <h2 className="text-5xl text-center text-purple-900 mb-12 font-light italic">RSVP</h2>
      <div className="max-w-xl mx-auto">
        {status === "SUCCESS" ? (
          <div className="text-center p-12 bg-purple-50 rounded-3xl border border-purple-100 text-2xl text-purple-900 italic font-light">
            Thank you! We can't wait to see you there!
          </div>
        ) : (
          <div className="min-h-[300px]">
            {selectedParty.length === 0 ? (
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
            ) : isDuplicate ? (
              <div className="p-10 bg-amber-50 rounded-3xl text-center border border-amber-100">
                <AlertCircle className="mx-auto text-amber-500 mb-4" size={32} />
                <h3 className="text-xl font-bold text-amber-900 italic">Already RSVP'ed</h3>
                <button onClick={() => setSelectedParty([])} className="mt-8 text-[10px] uppercase tracking-widest underline font-bold text-amber-700">
                  Try another name
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="flex justify-between items-center border-b border-purple-100 pb-4">
                  <div className="flex items-center gap-2">
                    <Users className="text-purple-400" size={20} />
                    <span className="text-slate-500 text-[10px] uppercase tracking-[0.2em] font-sans font-bold">Party RSVP</span>
                  </div>
                  <button type="button" onClick={() => setSelectedParty([])} className="text-purple-300"><X size={20}/></button>
                </div>
                {selectedParty.map((member, idx) => (
                  <div key={idx} className="p-6 bg-purple-50 rounded-2xl border border-purple-100 space-y-4">
                    <p className="font-bold text-purple-900 font-serif italic text-lg">{member.name}</p>
                    <select name={`attendance-${idx}`} className="w-full py-2 bg-transparent border-b border-purple-200 outline-none font-sans">
                      <option value="yes">Joyfully Accepts</option>
                      <option value="no">Regretfully Declines</option>
                    </select>
                    <input name={`dietary-${idx}`} className="w-full py-2 bg-transparent border-b border-purple-200 outline-none font-sans text-sm" placeholder="Dietary Restrictions" />
                  </div>
                ))}
                <input name="music" className="w-full py-3 bg-white px-4 rounded-xl border border-purple-100 outline-none font-sans" placeholder="Song Request for the Dance Floor" />
                <button type="submit" disabled={status === "SENDING" || status === "SUCCESS"}  className="w-full py-5 bg-purple-900 text-white rounded-full font-bold tracking-[0.3em] text-[10px] uppercase shadow-xl hover:bg-purple-800 transition-all">
                  {status === "SENDING" ? "Submitting..." : "Confirm Party RSVP"}
                </button>
              </form>
            )}
          </div>
        )}
      </div>
    </main>
  );
};

export default RenderRSVP;
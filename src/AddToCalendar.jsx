import { useState } from 'react';
import { Calendar, ChevronDown, Download, Mail } from 'lucide-react';

const AddToCalendar = ({ 
  title, 
  description, 
  location, 
  startDate, // Expects a JS Date object
  endDate 
}) => {
  const [isOpen, setIsOpen] = useState(false);

  /**
   * Formats date for Calendar Services.
   * To force "Pacific Time" logic, we strip the UTC 'Z' suffix.
   * This ensures the calendar treats the time as "Local" to the user's settings.
   */
  const formatTime = (date) => {
    if (!date) return '';
    // Adjusts the UTC object to reflect the local "wall clock" time
    const offset = date.getTimezoneOffset() * 60000;
    const localISOTime = new Date(date - offset).toISOString();
    // Returns YYYYMMDDTHHmmSS (removes separators and UTC 'Z' indicator)
    return localISOTime.replace(/-|:|\.\d+/g, '').slice(0, 15);
  };

  const start = formatTime(startDate);
  const end = formatTime(endDate);
  const timezone = "America/Los_Angeles";

  // 1. Google Calendar Link (Explicitly set to Pacific Time)
  const googleUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(title)}&dates=${start}/${end}&details=${encodeURIComponent(description)}&location=${encodeURIComponent(location)}&ctz=${timezone}`;

  // 2. Outlook Link
  const outlookUrl = `https://outlook.live.com/calendar/0/deeplink/compose?path=/calendar/action/compose&rru=addevent&startdt=${start}&enddt=${end}&subject=${encodeURIComponent(title)}&body=${encodeURIComponent(description)}&location=${encodeURIComponent(location)}`;

  // 3. Apple / iCal (.ics file)
  const handleDownloadICS = () => {
    const icsContent = `
BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Our App//NONSGML Event Calendar//EN
BEGIN:VEVENT
DTSTART;TZID=${timezone}:${start}
DTEND;TZID=${timezone}:${end}
SUMMARY:${title}
DESCRIPTION:${description}
LOCATION:${location}
BEGIN:VALARM
TRIGGER:-PT15M
ACTION:DISPLAY
DESCRIPTION:Reminder
END:VALARM
END:VEVENT
END:VCALENDAR`.trim();

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', 'event-pacific-time.ics');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-flex shadow-sm rounded-full" role="group">
      
      {/* --- LEFT SIDE: DEFAULT ACTION (GOOGLE) --- */}
      <a
        href={googleUrl}
        target="_blank"
        rel="noreferrer"
        className="flex items-center gap-2 px-5 py-3 bg-purple-100 hover:bg-purple-200 text-purple-900 rounded-l-full border-r border-purple-200 font-bold uppercase tracking-widest text-xs transition-colors"
      >
        <Calendar size={16} />
        Google Calendar
      </a>

      {/* --- RIGHT SIDE: THE CARROT (TOGGLE) --- */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="px-3 py-3 bg-purple-100 hover:bg-purple-200 text-purple-900 rounded-r-full transition-colors"
      >
        <ChevronDown size={16} className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* --- DROPDOWN MENU --- */}
      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl shadow-xl border border-purple-100 z-50 overflow-hidden">
          <div className="py-1">
            <span className="block px-4 py-2 text-[10px] text-slate-400 font-bold uppercase tracking-wider border-b border-slate-50">
                Other Calendars
            </span>
            
            <a
              href={outlookUrl}
              target="_blank"
              rel="noreferrer"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 px-4 py-3 text-sm text-slate-700 hover:bg-blue-50 hover:text-blue-900 transition-colors"
            >
              <Mail size={14} />
              Outlook
            </a>
            
            <button
              onClick={handleDownloadICS}
              className="w-full flex items-center gap-3 px-4 py-3 text-sm text-slate-700 hover:bg-slate-100 hover:text-slate-900 transition-colors text-left"
            >
              <Download size={14} />
              Apple / iCal
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddToCalendar;
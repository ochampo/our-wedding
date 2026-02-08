import { Calendar, Download, ExternalLink } from 'lucide-react';

const AddToCalendar = ({ 
  title, 
  description, 
  location, 
  startDate, // Pass a standard JS Date object here
  endDate    // Pass a standard JS Date object here
}) => {

  // Helper: Formats a Date object into "YYYYMMDDTHHmmSSZ" (UTC)
  const formatTime = (date) => {
    return date.toISOString().replace(/-|:|\.\d+/g, '');
  };

  const start = formatTime(startDate);
  const end = formatTime(endDate);

  // 1. Google Calendar Link
  const googleUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(title)}&dates=${start}/${end}&details=${encodeURIComponent(description)}&location=${encodeURIComponent(location)}`;

  // 2. Outlook / Office 365 Link
  const outlookUrl = `https://outlook.live.com/calendar/0/deeplink/compose?path=/calendar/action/compose&rru=addevent&startdt=${start}&enddt=${end}&subject=${encodeURIComponent(title)}&body=${encodeURIComponent(description)}&location=${encodeURIComponent(location)}`;

  // 3. Apple / iCal / Universal File (.ics)
  const handleDownloadICS = () => {
    const icsContent = `
BEGIN:VCALENDAR
VERSION:2.0
BEGIN:VEVENT
URL:${document.location.href}
DTSTART:${start}
DTEND:${end}
SUMMARY:${title}
DESCRIPTION:${description}
LOCATION:${location}
END:VEVENT
END:VCALENDAR`.trim();

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', 'event-save-the-date.ics');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="flex flex-col items-center gap-3 mt-6">
      <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Save the Date</p>
      <div className="flex gap-2">
        {/* Google Button */}
        <a 
          href={googleUrl} 
          target="_blank" 
          rel="noreferrer" 
          className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 hover:border-purple-300 text-slate-600 hover:text-purple-700 rounded-lg text-xs font-bold uppercase tracking-wider transition-all shadow-sm"
        >
          <ExternalLink size={14} />
          Google
        </a>

        {/* Outlook Button */}
        <a 
          href={outlookUrl} 
          target="_blank" 
          rel="noreferrer" 
          className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 hover:border-blue-300 text-slate-600 hover:text-blue-700 rounded-lg text-xs font-bold uppercase tracking-wider transition-all shadow-sm"
        >
          <Calendar size={14} />
          Outlook
        </a>

        {/* Apple/iCal Button */}
        <button 
          onClick={handleDownloadICS} 
          className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 hover:border-slate-400 text-slate-600 hover:text-slate-900 rounded-lg text-xs font-bold uppercase tracking-wider transition-all shadow-sm"
        >
          <Download size={14} />
          iCal
        </button>
      </div>
    </div>
  );
};

export default AddToCalendar;
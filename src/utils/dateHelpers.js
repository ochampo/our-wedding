// src/utils/dateHelpers.js

import config from '../config/weddingConfig';

const WEDDING_DATE = config.dates.weddingDate;

/**
 * Converts a time string like "2:00 PM" or "5:30 PM - 10:30 PM"
 * into real JavaScript Date objects for the calendar.
 */
export const parseTimeData = (timeString) => {
  if (!timeString) return { startDate: null, endDate: null };

  // 1. Split the string (e.g. "5:30 PM - 10:30 PM" -> ["5:30 PM", "10:30 PM"])
  const times = timeString.split(" - ");
  const startTimeStr = times[0];
  const endTimeStr = times[1];

  // 2. Create the Start Date
  // Combining "July 3, 2026" + "2:00 PM" creates a valid date automatically
  const startDate = new Date(`${WEDDING_DATE} ${startTimeStr}`);

  let endDate;

  if (endTimeStr) {
    // Case A: We have a specific end time (Reception)
    endDate = new Date(`${WEDDING_DATE} ${endTimeStr}`);
  } else {
    // Case B: No end time (Ceremony)
    // Default to 1.5 hours (90 minutes) after start
    endDate = new Date(startDate.getTime() + 90 * 60000);
  }

  return { startDate, endDate };
};

// src/weddingData.js
import { Calendar, Component, GlassWater } from 'lucide-react'; // Import your icons here!
import HolySpiritChurch from "../components/images/holyspirit.jpeg"; // Import the image
import Bridges from "../components/images/theBridges.jpg"; // Import the image
export const LOCATIONS = [
  {
    id: 'ceremony',
    type: 'ceremony',
    title: "The Ceremony",
    time: "2:00 PM",
    name: "Holy Spirit Church",
    address: "41139 Fremont Blvd, Fremont, CA",
    mapLink: "https://www.google.com/maps/search/?api=1&query=Holy+Spirit+Church+41139+Fremont+Blvd+Fremont+CA",
    icon: Calendar, // This reference works because we imported Calendar above
    image: HolySpiritChurch
  },
  {
    id: 'reception',
    type: 'reception',
    title: "The Reception",
    time: "5:30 PM",
    name: "The Bridges Golf Club",
    address: "9000 S Gale Ridge Rd, San Ramon",
    mapLink: "https://www.google.com/maps/search/?api=1&query=The+Bridges+Golf+Club+9000+S+Gale+Ridge+Rd+San+Ramon",
    icon: GlassWater, 
    image: Bridges
  }
];
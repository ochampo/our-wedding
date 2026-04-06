import { Gem, PartyPopper } from 'lucide-react';
import HolySpiritChurch from "../components/images/holyspirit.jpeg";
import Bridges from "../components/images/theBridges.jpg";
import config from '../config/weddingConfig';

export const LOCATIONS = [
  {
    id: 'ceremony',
    type: 'ceremony',
    title: "The Ceremony",
    time: config.ceremony.timeRange,
    name: config.ceremony.name,
    address: config.ceremony.address,
    mapLink: config.ceremony.mapUrl,
    icon: Gem,
    image: HolySpiritChurch
  },
  {
    id: 'reception',
    type: 'reception',
    title: "The Reception",
    time: config.reception.timeRange,
    name: config.reception.name,
    subName: config.reception.subVenue,
    address: config.reception.address,
    mapLink: config.reception.mapUrl,
    icon: PartyPopper,
    image: Bridges
  }
];

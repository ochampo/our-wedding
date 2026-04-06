const weddingConfig = {
  couple: {
    bride: {
      first: "Lorraine",
      last: "Goveas",
      initial: "L",
    },
    groom: {
      first: "Daniel",
      last: "Ocampo",
      initial: "D",
    },
    displayName: "Lorraine & Daniel",
    fullNames: "Lorraine Goveas & Daniel Ocampo",
  },

  dates: {
    weddingDate: "July 3, 2026",
    weddingDateTime: "July 3, 2026 14:00:00",
    rsvpDeadline: "April 10th",
    hotelBookingDeadline: "June 5th",
    hotelNightDate: "July 3rd",
    copyrightYear: "2026",
  },

  timezone: "America/Los_Angeles",

  ceremony: {
    name: "Holy Spirit Catholic Church",
    address: "37588 Fremont Blvd, Fremont, CA 94536",
    mapUrl:
      "https://www.google.com/maps/place/Holy+Spirit+Catholic+Church/@37.5571049,-122.0060974,17z/data=!3m1!4b1!4m11!3m10!1s0x808fbf82d3e7bf11:0xe4c71b1f1a219477!5m4!1s2026-04-17!2i4!4m1!1i2!8m2!3d37.5571007!4d-122.0035225!16s%2Fg%2F1tdvpzxz?entry=ttu&g_ep=EgoyMDI2MDIwOS4wIKXMDSoASAFQAw%3D%3D",
    timeDisplay: "2pm - 3pm",
    timeRange: "2:00 PM - 3:00 PM",
    startISO: "2:00 PM",
    endISO: "3:00 PM",
    description: "Join us for our nuptial mass.",
  },

  reception: {
    name: "The Bridges Golf Club",
    subVenue: "Garden Pavilion Room",
    address: "9000 S Gale Ridge Rd, San Ramon, CA 94582",
    mapUrl:
      "https://www.google.com/maps/place/The+Bridges+Golf+Club/@37.7710045,-121.9366182,16z/data=!3m1!4b1!4m11!3m10!1s0x808ff276c348ecf1:0x9e6b39a1d8967a0c!5m4!1s2026-04-17!2i4!4m1!1i2!8m2!3d37.7710003!4d-121.9340433!16s%2Fg%2F1tdmkqrs?entry=ttu&g_ep=EgoyMDI2MDIwOS4wIKXMDSoASAFQAw%3D%3D",
    timeDisplay: "5:30 pm - 10:30pm",
    timeRange: "5:30 PM - 10:30 PM",
    startISO: "5:30 PM",
    endISO: "10:30 PM",
    description: "Dinner, drinks and dancing.",
  },

  hotel: {
    name: "Marriott San Ramon",
    address: "2600 Bishop Dr, San Ramon, CA 94583",
    addressShort: "2600 Bishop Dr, San Ramon",
    mapUrl:
      "https://www.google.com/maps/place/San+Ramon+Marriott/@37.7628816,-121.9678093,17z/data=!4m11!3m10!1s0x808ff299470b65af:0x9779a5c295fb341a!5m4!1s2026-04-17!2i4!4m1!1i2!8m2!3d37.7628774!4d-121.9652344!16s%2Fm%2F0myjcjn?entry=ttu&g_ep=EgoyMDI2MDIwNC4wIKXMDSoASAFQAw%3D%3D",
    bookingUrl:
      "https://www.marriott.com/event-reservations/reservation-link.mi?id=1770859259138&key=GRP&app=resvlink&_branch_match_id=1536236514237964114&_branch_referrer=H4sIAAAAAAAAA8soKSkottLXTywo0MtNLCrKzC8p0UvOz9UvSi3OyczLtgdK2ALZZSCOWmaKraG5uYGFqaWRqaWhsYVadmqlrXtQgFpdUWpaKlB3Xnp8UlF%2BeXFqka1zRlF%2BbioASgIVZ2AAAAA%3D",
  },

  menu: {
    adultOptions: [
      { label: "Filet Mignon", emoji: "🥩" },
      { label: "Pan Seared Filet of Salmon", displayLabel: "Salmon", emoji: "🐟" },
      { label: "Spinach and Cheese Ravioli (V)", emoji: "🧀" },
      { label: "Chicken Tenders (Kids)", emoji: "🍗" },
    ],
    kidsOptions: [
      { label: "Chicken Tenders (Kids)", emoji: "🍗" },
      { label: "No Meal", emoji: "🚫" },
    ],
  },

  payment: [
    {
      name: "Daniel",
      handle: "@ochampo",
      url: "https://venmo.com/u/ochampo",
      fundLabel: "Honeymoon Fund",
    },
    {
      name: "Lorraine",
      handle: "@lorrainegoveas",
      url: "https://venmo.com/u/lorrainegoveas",
      fundLabel: "Home Fund",
    },
  ],

  auth: {
    secretHash:
      "dfa3569a46b1a13c24c9f385da140f4763a3fbb70f8eebe0f29ba535145d32ca",
  },

  dressCode:
    "We'd love to see our family and friends get dressed up for our big day. The dress code is formal attire. Please avoid wearing purple, white and ivory.",

  qa: {
    ceremonyStartTime: "2:00 PM",
    cocktailHourTime: "5:30pm",
    dinnerTime: "6:30 pm",
    venueDistance: "around 25 miles",
    venueTravelTime: "30 to 45 minutes",
  },
};

export default weddingConfig;

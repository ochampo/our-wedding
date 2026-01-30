const images = import.meta.glob('../components/images/BridalPary/*.jpeg', { eager: true });

const getImage = (name) => images[`../components/images/BridalPary/${name}.jpeg`]?.default;

export const PARTY_DATA = {
  bride_and_groom: [
    { 
    name: "Lorraine", role: "Bride", bio: "The bride's sister and partner in crime.", img: getImage('lorraine')
    },
    { 
    name: "Daniel", role: "Groom", bio: "College roommate and coffee addict.", img: getImage('daniel')
    },
  ],
  bridesmaids: [
    { name: "Sahar", role: "Maid of Honor", bio: "The Life of the party", img: getImage('sahar')},
    { name: "Priya", role: "Bridesmaid", bio: "", img: getImage('priya') },
    { name: "Nerida", role: "Bridesmaid", bio: "", img: getImage('nerida') },
    { name: "Shrimathi", role: "Bridesmaid", bio: "Work bestie and karaoke queen.", img: getImage('shrimathi') },
    {name: "Devanshi", role: "Bridesmaid", bio: "Childhood friend and travel buddy.", img: getImage('devanshi') },
    { name: "Divya", role: "Bridesmaid", bio: "The bride's fashionista.", img: getImage('divya') },
    {name:"Nancy", role: "Bridesmaid", bio: "The bride's fashionista.", img: getImage('nancy')}
  ],
  groomsmen: [
    { name: "Unknown", role: "Best Man", bio: "No best man needed", img: "https://placehold.co/400x400/1e293b/white?text=???" },
    { name: "Peter", role: "Groomsman", bio: "Most likely to twerk", img: getImage('peter') },
    { name: "Laura", role: "Groomswoman", bio: "Best sister everrrr", img: getImage('laura') },
    { name: "Frankie", role: "Groomman", bio: "Mr. Fittness, new era of gym gainzz", img: getImage('frankie') },
    { name: "Isael", role: "Groomsman", bio: "Most helpful guy ever", img: getImage('isael') },
    { name: "Joe", role: "Groomsman", bio: "The guy you call, when you are to embarrsed to do something", img: getImage('joe') },
  ]
};
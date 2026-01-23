import { ImageIcon } from 'lucide-react';

// 1. LOAD IMAGES: This tells Vite to bundle every .jpeg in that folder immediately.
// "eager: true" loads them now (not lazily).
// "import: 'default'" gets the URL string directly.
const imagesGlob = import.meta.glob('./components/images/*.jpeg', { 
  eager: true, 
  import: 'default' 
});

// 2. CONVERT TO ARRAY: Convert the object returned by glob into a clean array of URL strings.

const imageList = Object.values(imagesGlob);

const RenderGallery = () => (
    <main className="max-w-5xl mx-auto px-6 py-24 animate-in fade-in duration-700">
      <ImageIcon className="mx-auto text-purple-200 mb-6" size={40} />
      <h2 className="text-5xl text-center text-purple-900 mb-12 font-light italic">Gallery</h2>
      
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {/* 3. MAP THE ARRAY: Instead of mapping [1..6], map the actual loaded images */}
        {imageList.map((imgSrc, index) => (
          <div key={index} className="aspect-[4/5] bg-purple-50 rounded-xl flex items-center justify-center text-purple-200 italic text-xs border border-purple-100 shadow-sm transition-transform hover:scale-[1.02]">
            <img 
              // Use the imported URL directly
              src={imgSrc}
              alt={`Gallery Image ${index + 1}: Wedding Moment`}
              className="w-full h-full object-cover rounded-xl" // Added object-cover so images fit the box
            />
          </div>
        ))}
      </div>
    </main>
);

export default RenderGallery;
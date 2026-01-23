import { ImageIcon } from 'lucide-react';
const RenderGallery = () => (
    <main className="max-w-5xl mx-auto px-6 py-24 animate-in fade-in duration-700">
      <ImageIcon className="mx-auto text-purple-200 mb-6" size={40} />
      <h2 className="text-5xl text-center text-purple-900 mb-12 font-light italic">Gallery</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {[1,2,3,4,5,6].map(i => (
          <div key={i} className="aspect-[4/5] bg-purple-50 rounded-xl flex items-center justify-center text-purple-200 italic text-xs border border-purple-100 shadow-sm transition-transform hover:scale-[1.02]">
            <img 
             src={`./src/components/images/temp${i}.jpeg`}
             alt={`Gallery Image ${i}: Wedding Moment`}
            />
          </div>
        ))}
      </div>
    </main>
  );

  export default RenderGallery;
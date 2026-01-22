import { BookOpen } from "lucide-react";

const RenderStory = () => (
  <main className="max-w-2xl mx-auto px-6 py-24 animate-in fade-in slide-in-from-bottom-4 duration-700">
    <BookOpen className="mx-auto text-purple-200 mb-6" size={40} />
    <h2 className="text-5xl text-center text-purple-900 mb-12 font-light italic">Our Story</h2>
    <div className="space-y-12 text-slate-600 leading-relaxed text-lg">
      
      {/* Chapter 1 */}
      <div className="relative pl-8 border-l-2 border-purple-100">
        <span className="absolute -left-2.5 top-0 w-5 h-5 bg-purple-100 rounded-full border-4 border-white" />
        <h3 className="text-purple-900 font-bold mb-2 uppercase text-xs tracking-widest font-sans">From Bumble to Lake Elizabeth</h3>
        <p className="mb-4">
          We first connected on Bumble, eager to see if the spark was real. We met for dinner at <b>SALATHAI</b>, and almost immediately, the chemistry was undeniable. Not ready to say goodbye after the meal, we decided to take a walk around Lake Elizabeth.
        </p>
        <p>
          As we walked and talked, a simple introduction turned into the realization that we had found something rare. It was an evening we didn't want to end, and looking back, it was the moment we both realized we were the perfect match.
        </p>
      </div>

      {/* Chapter 2 */}
      <div className="relative pl-8 border-l-2 border-purple-100">
        <span className="absolute -left-2.5 top-0 w-5 h-5 bg-purple-100 rounded-full border-4 border-white" />
        <h3 className="text-purple-900 font-bold mb-2 uppercase text-xs tracking-widest font-sans">Two Worlds, One Heart</h3>
        <p className="mb-4">
          Merging Dan’s Mexican heritage with Lorraine’s Goan roots meant a lot of incredible food, rich traditions, and a shared love for family. Whether we are sharing spicy <b>TACOS</b> or savory curries, we discovered that our values are exactly the same.
        </p>
        <p>
          With Dan being a determined <b>ARIES</b> and Lorraine bringing the balance, we fit together perfectly. Both families embraced the other with open arms from day one, making us feel like part of the extended family instantly.
        </p>
      </div>

      {/* Chapter 3 */}
      <div className="relative pl-8 border-l-2 border-purple-100">
        <span className="absolute -left-2.5 top-0 w-5 h-5 bg-purple-100 rounded-full border-4 border-white" />
        <h3 className="text-purple-900 font-bold mb-2 uppercase text-xs tracking-widest font-sans">Travels & Treats</h3>
        <p className="mb-4">
          From the beaches of Mexico to the historic <b>BRIDGES</b> of Budapest, our travels have been filled with adventure, discovery, and pastries. We have hunted for the best <b>COOKIES</b> across the globe, and each trip has strengthened our bond.
        </p>
        <p>
          We knew we were meant to be together after our first trip to Hawaii; that is where Dan figured out that Lorraine had a huge sweet tooth for <b>DONUTS</b>. These experiences have not only enriched our lives but have also deepened our love for each other.
        </p>
      </div>

      {/* Chapter 4 */}
      <div className="relative pl-8 border-l-2 border-purple-100">
        <span className="absolute -left-2.5 top-0 w-5 h-5 bg-purple-100 rounded-full border-4 border-white" />
        <h3 className="text-purple-900 font-bold mb-2 uppercase text-xs tracking-widest font-sans">The Proposal</h3>
        <p className="mb-4">
          On a beautiful day in <b>JULY</b>, Dan planned a special surprise in <b>FREMONT</b>. He set the stage right in Lorraine's parents' <b>BACKYARD</b>. As we waited for Lorraine to arrive, Dan nervously got down on one knee.
        </p>
        <p>
          Overwhelmed with joy, she said yes! It was a moment filled with love, laughter, and the promise of a lifetime together. We celebrated with a romantic picnic, savoring the beginning of our new chapter as fiancés.
        </p>
      </div>

    </div>
  </main>
);

export default RenderStory;
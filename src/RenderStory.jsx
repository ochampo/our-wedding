import { BookOpen } from "lucide-react";

const RenderStory = () => (
    <main className="max-w-2xl mx-auto px-6 py-24 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <BookOpen className="mx-auto text-purple-200 mb-6" size={40} />
      <h2 className="text-5xl text-center text-purple-900 mb-12 font-light italic">Our Story</h2>
      <div className="space-y-12 text-slate-600 leading-relaxed text-lg">
        <div className="relative pl-8 border-l-2 border-purple-100">
          <span className="absolute -left-2.5 top-0 w-5 h-5 bg-purple-100 rounded-full border-4 border-white" />
          <h3 className="text-purple-900 font-bold mb-2 uppercase text-xs tracking-widest font-sans">From Bumble to Lake Elizabeth</h3>
          <p>We first connected on Bumble, eager to see if the spark was real. We met for dinner at <b>SalaThai</b>, and almost immediately, the chemistry was undeniable. Not ready to say goodbye after dinner, we decided to take a walk around Lake Elizabeth.</p>
          <p>As we walked and talked, a simple introduction turned into the realization that we had found something rare. It was an evening we didn't want to end, and looking back, it was the moment we both realized we were the perfect match.</p>
        </div>
        <div className="relative pl-8 border-l-2 border-purple-100">
          <span className="absolute -left-2.5 top-0 w-5 h-5 bg-purple-100 rounded-full border-4 border-white" />
          <h3 className="text-purple-900 font-bold mb-2 uppercase text-xs tracking-widest font-sans">Two Worlds, One Heart, Family</h3>
          <p>Merging Dan’s Mexican heritage with Lorraine’s Goan roots meant a lot of incredible food, rich traditions, and a shared love for family. We discovered that our values are exactly the same.</p>
          <p>Lorraine introduction to the family, and the family embraced her with open arms, making her feel like part of the extended family from day one.</p>
          <p>Dan's introduction to the family, and the family embraced him with open arms, making him feel like part of the extended family from day one.</p>
        </div>
        <div className="relative pl-8 border-l-2 border-purple-100">
          <span className="absolute -left-2.5 top-0 w-5 h-5 bg-purple-100 rounded-full border-4 border-white" />
          <h3 className="text-purple-900 font-bold mb-2 uppercase text-xs tracking-widest font-sans">Travels </h3>
          <p>From the beaches of Mexico to the historic streets of buddapest, our travels have been filled with adventure,discovery and pasteries. Each trip has strengthened our bond and created memories that we will cherish forever.</p>
          <p>These experiences have not only enriched our lives but have also deepened our love for each other, as we navigate the world hand in hand.</p>
          <p>We knew we were meant together after our first trip to Hawii, that's where dan figured out that lorraine had huge sweet thooth for <b>DONUTS</b>.</p>
        </div>
        <div className="relative pl-8 border-l-2 border-purple-100">
          <span className="absolute -left-2.5 top-0 w-5 h-5 bg-purple-100 rounded-full border-4 border-white" />
          <h3 className="text-purple-900 font-bold mb-2 uppercase text-xs tracking-widest font-sans">The Proposal</h3>
          <p>On a beautiful day in <b>FREMONT</b>, Dan planned a special day right in Lorraine's parents <b>BACKYARD</b>. As we waited for her lorraine to arrive, Dan nervously got down on one knee and asked Lorraine to marry him.</p>
          <p>Overwhelmed with joy, she said yes! It was a moment filled with love, laughter, and the promise of a lifetime together. We celebrated with a romantic picnic, savoring the beginning of our new chapter as fiancés.</p>
        </div>
      </div>
    </main>
  );

  export default RenderStory;
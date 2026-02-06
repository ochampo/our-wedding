import { BookOpen } from "lucide-react";

const RenderStory = () => (
  <main className="max-w-2xl mx-auto px-6 py-24 animate-in fade-in slide-in-from-bottom-4 duration-700">
    <BookOpen className="mx-auto text-purple-200 mb-6" size={40} />
    <h2 className="text-5xl text-center text-purple-900 mb-12 font-light italic">Our Story</h2>
    <div className="space-y-12 text-slate-600 leading-relaxed text-lg">
      
      {/* Chapter 1 */}
      <div className="relative pl-8 border-l-2 border-purple-100">
        <span className="absolute -left-2.5 top-0 w-5 h-5 bg-purple-100 rounded-full border-4 border-white" />
        <h3 className="text-purple-900 font-bold mb-2 uppercase text-xs tracking-widest font-sans">From Bumble to Budapest</h3>
        <p className="mb-4">
            Our story started the way a lot of modern love stories do: with a swipe on Bumble. What we didn’t know then was that one match would turn into forever.        </p>
        <p>
          Our first date was at Sala Thai, and it didn’t take long to realize there was something special there. One date quickly turned into many—Latin dancing, hiking, axe throwing, trying new restaurants, and finding excuses to spend more time together. 
          As time went on, we started collecting memories far beyond our city. We traveled together to Hawaii and Carmel, crossed continents to explore Prague, Vienna, and Budapest, and made many trips to Southern California to spend time with Dan's family. A few months into their relationship Dan ended up moving from San Jose to Fremont to be closer to Lorraine.</p>
      </div>

    

      {/* Chapter 4 */}
      <div className="relative pl-8 border-l-2 border-purple-100">
        <span className="absolute -left-2.5 top-0 w-5 h-5 bg-purple-100 rounded-full border-4 border-white" />
        <h3 className="text-purple-900 font-bold mb-2 uppercase text-xs tracking-widest font-sans">The Proposal</h3>
        <p className="mb-4">
          While Lorraine was away celebrating her friend Crystal's bachelorette weekend, Dan was busy planning a surprise. He built a rose-covered arch in Lorraine's parents backyard and put together every detail while she was gone. The next day, while working from home, Lorraine decided to eat lunch in the backyard, only to be stopped by everyone before she could look around the corner.
         After one of Lorraine's work meetings ended, she stepped out of her room and saw a trail of roses and lights leading into the backyard. At the end of the path, Dan was standing under the rose arch. He dropped down on one knee and popped the question and of course, she said yes.
        </p>
      </div>

    </div>
  </main>
);

export default RenderStory;
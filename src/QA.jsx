import { 
  HelpCircle 
} from 'lucide-react';
const renderQA = () => (
    <main className="max-w-3xl mx-auto px-6 py-24 animate-in fade-in duration-700">
      <HelpCircle className="mx-auto text-purple-200 mb-6" size={40} />
      <h2 className="text-3xl md:text-4xl text-center text-purple-900 mb-8 font-medium tracking-tight">Q & A</h2>
      <div className="space-y-6">
        {[
          { q: "What is the dress code?", a: "We'd love to see our family and friends get dressed up for our big day. The dress code is Semi-Formal or Cocktail attire. Please avoid wearing white, ivory and purple" },
          { q: "Can I bring a plus one?", a: "As much as we’d love to celebrate with everyone, we’re only able to accommodate those listed on your invitation. Thank you for understanding and for being part of our special day!" },
          {q: "Are kids welcome?", a: "We love your little ones and have chosen to include the children of close family and friends. However, due to limited capacity, we kindly ask that only those listed on the invitation attend. We appreciate your understanding and can’t wait to celebrate together!"},
          { q: "Is there parking available?", a: "Yes, both the church and the reception venue have ample free parking available for all guests." },
          { q: "What time should I arrive to the ceremony?", a: "The ceremony begins promptly at 2:00 PM. We recommend arriving 15-20 minutes early to find your seat." },
          {q: "How far is the ceremony from the reception?", a: "The distance from the ceremony to the reception is around 25 miles and will take 30 to 45 minutes so please plan accordingly."},
          {q: "Will the ceremony and reception be indoors or outdoors?", a:"Both the ceremony and reception will be indoors."},
          {q: "Is there a cocktail hour?", a: "Yes! cocktail hour begins at 5:30pm followed by dinner and dancing at 6:30 pm"}
        ].map((item, i) => (
          <div key={i} className="bg-white p-8 rounded-2xl border border-purple-50 shadow-sm">
            <h4 className="text-purple-900 font-bold mb-3 uppercase text-[10px] tracking-widest font-sans">{item.q}</h4>
            <p className="text-slate-600 leading-relaxed">{item.a}</p>
          </div>
        ))}
      </div>
    </main>
  );

  export default renderQA;
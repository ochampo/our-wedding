import { useMemo } from 'react';
import { BarChart3, Users, UtensilsCrossed, CheckCircle2, XCircle } from 'lucide-react';

const RsvpDashboard = ({ rsvpMap = {} }) => {
  const textGlow = {
    textShadow: '0 0 10px rgba(255, 255, 255, 0.9), 0 0 4px rgba(255, 255, 255, 1)'
  };

  const stats = useMemo(() => {
    const entries = Object.values(rsvpMap);
    const total = entries.length;
    const accepted = entries.filter(r => r.attendance === 'yes').length;
    const declined = entries.filter(r => r.attendance === 'no').length;

    const mealCounts = {};
    entries.forEach(r => {
      if (r.attendance === 'yes' && r.food && r.food !== 'N/A') {
        const meal = r.food;
        mealCounts[meal] = (mealCounts[meal] || 0) + 1;
      }
    });

    const mealLabels = {
      'Filet Mignon': { emoji: '🥩', color: 'bg-red-400' },
      'Pan Seared Filet of Salmon': { emoji: '🐟', color: 'bg-orange-400' },
      'Spinach and Cheese Ravioli (V)': { emoji: '🍝', color: 'bg-green-400' },
      'Chicken Tenders (Kids)': { emoji: '🍗', color: 'bg-yellow-400' },
      'No Meal': { emoji: '❌', color: 'bg-slate-400' },
    };

    const meals = Object.entries(mealCounts)
      .map(([name, count]) => ({
        name,
        count,
        emoji: mealLabels[name]?.emoji || '🍽️',
        color: mealLabels[name]?.color || 'bg-purple-400',
      }))
      .sort((a, b) => b.count - a.count);

    const maxMealCount = meals.length > 0 ? Math.max(...meals.map(m => m.count)) : 1;

    return { total, accepted, declined, meals, maxMealCount };
  }, [rsvpMap]);

  const hasData = stats.total > 0;

  if (!hasData) {
    return null; // Don't render if no data
  }

  return (
    <div className="mt-16 space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">

      {/* Dashboard Title */}
      <div className="flex items-center justify-center gap-3 mb-2">
        <BarChart3 className="text-purple-900" size={24} />
        <h3 className="text-2xl text-purple-900 font-sans italic" style={textGlow}>
          RSVP Dashboard
        </h3>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white/60 backdrop-blur-md p-6 rounded-3xl border border-white/60 shadow-lg text-center">
          <Users className="mx-auto text-purple-900 mb-2" size={24} />
          <p className="text-3xl font-bold text-purple-900">{stats.total}</p>
          <p className="text-[10px] uppercase tracking-widest text-slate-600 font-bold mt-1">Responses</p>
        </div>

        <div className="bg-white/60 backdrop-blur-md p-6 rounded-3xl border border-white/60 shadow-lg text-center">
          <CheckCircle2 className="mx-auto text-green-600 mb-2" size={24} />
          <p className="text-3xl font-bold text-green-700">{stats.accepted}</p>
          <p className="text-[10px] uppercase tracking-widest text-slate-600 font-bold mt-1">Accepted</p>
        </div>

        <div className="bg-white/60 backdrop-blur-md p-6 rounded-3xl border border-white/60 shadow-lg text-center">
          <XCircle className="mx-auto text-slate-400 mb-2" size={24} />
          <p className="text-3xl font-bold text-slate-500">{stats.declined}</p>
          <p className="text-[10px] uppercase tracking-widest text-slate-600 font-bold mt-1">Declined</p>
        </div>
      </div>

      {/* Meal Breakdown */}
      {stats.meals.length > 0 && (
        <div className="bg-white/60 backdrop-blur-md p-8 rounded-3xl border border-white/60 shadow-lg">
          <div className="flex items-center gap-2 mb-6">
            <UtensilsCrossed className="text-purple-900" size={20} />
            <h4 className="text-purple-900 font-bold uppercase text-[12px] tracking-widest font-sans">
              Meal Breakdown
            </h4>
          </div>
          <div className="space-y-4">
            {stats.meals.map((meal) => (
              <div key={meal.name}>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium text-slate-800">
                    {meal.emoji} {meal.name}
                  </span>
                  <span className="text-sm font-bold text-purple-900">
                    {meal.count}
                  </span>
                </div>
                <div className="w-full bg-purple-100/60 rounded-full h-3 overflow-hidden">
                  <div
                    className={`h-full rounded-full ${meal.color} transition-all duration-700 ease-out`}
                    style={{ width: `${(meal.count / stats.maxMealCount) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
          <p className="text-[10px] text-slate-500 mt-4 text-center uppercase tracking-wider font-bold">
            {stats.accepted} guests attending • {stats.meals.reduce((sum, m) => sum + m.count, 0)} meals selected
          </p>
        </div>
      )}
    </div>
  );
};

export default RsvpDashboard;
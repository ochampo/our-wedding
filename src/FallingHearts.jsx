import { Heart } from 'lucide-react';

const FallingHearts = () => {
  return (
    <>
      <style>{`
        .heart-bg {
            position: absolute;
            top: -50px;
            color: #c084fc; /* Purple-400 for better visibility */
            opacity: 0;
            pointer-events: none;
            animation: floatDown linear infinite;
        }

        /* Slowed down speeds: 15s to 25s */
        .h1 { left: 10%; animation-duration: 20s; animation-delay: 0s; font-size: 20px; }
        .h2 { left: 25%; animation-duration: 25s; animation-delay: 5s; font-size: 30px; }
        .h3 { left: 50%; animation-duration: 18s; animation-delay: 2s; font-size: 24px; }
        .h4 { left: 70%; animation-duration: 22s; animation-delay: 8s; font-size: 18px; }
        .h5 { left: 85%; animation-duration: 16s; animation-delay: 1s; font-size: 28px; }

        @keyframes floatDown {
          0% { transform: translateY(0) rotate(0deg); opacity: 0; }
          10% { opacity: 0.6; }
          90% { opacity: 0.6; }
          100% { transform: translateY(110vh) rotate(360deg); opacity: 0; }
        }
      `}</style>

      {/* Background Hearts Layer - Fixed to cover the entire screen */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden h-full w-full">
         <Heart className="heart-bg h1" fill="#c084fc" />
         <Heart className="heart-bg h2" fill="#c084fc" />
         <Heart className="heart-bg h3" fill="#c084fc" />
         <Heart className="heart-bg h4" fill="#c084fc" />
         <Heart className="heart-bg h5" fill="#c084fc" />
      </div>
    </>
  );
};

export default FallingHearts;

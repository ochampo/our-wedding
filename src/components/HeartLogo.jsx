import { useState, useEffect } from 'react';
import config from '../config/weddingConfig';

const HeartLogo = ({ size = 'desktop', onClick }) => {
  const [animate, setAnimate] = useState(false);

  // Trigger animation after component mounts (small delay so user can see it)
  useEffect(() => {
    const timer = setTimeout(() => setAnimate(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Size configurations
  const sizes = {
    desktop: { width: 60, height: 54 },
    mobile: { width: 48, height: 43 }
  };

  const { width, height } = sizes[size] || sizes.desktop;

  return (
    <>
      <style>{`
        @keyframes leftHeartJoin {
          0% { transform: translateX(-120px); }
          100% { transform: translateX(0px); }
        }

        @keyframes rightHeartJoin {
          0% { transform: translateX(120px); }
          100% { transform: translateX(0px); }
        }

        @keyframes letterLMove {
          0% { transform: translateX(-15px); opacity: 0.3; }
          100% { transform: translateX(0px); opacity: 1; }
        }

        @keyframes letterDMove {
          0% { transform: translateX(15px); opacity: 0.3; }
          100% { transform: translateX(0px); opacity: 1; }
        }

        @keyframes ampersandAppear {
          0% { opacity: 0; transform: scale(0); }
          90% { opacity: 0; transform: scale(0); }
          100% { opacity: 1; transform: scale(1); }
        }

        @keyframes heartGlowOnce {
          0% { filter: drop-shadow(0 0 0px rgba(147, 51, 234, 0)); }
          100% { filter: drop-shadow(0 0 12px rgba(147, 51, 234, 0.7)); }
        }

        @keyframes crackDisappear {
          0% { opacity: 0; }
          70% { opacity: 0; }
          85% { opacity: 1; }
          100% { opacity: 0; }
        }

        @keyframes subtlePulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.03); }
        }

        .heart-logo-container {
          overflow: visible;
        }

        .heart-logo-container.animating {
          animation: heartGlowOnce 3s ease-out forwards;
        }

        .heart-logo-container:hover {
          animation: subtlePulse 1s ease-in-out infinite;
          filter: drop-shadow(0 0 12px rgba(147, 51, 234, 0.7));
        }

        .left-heart-half {
          transform: translateX(-120px);
        }

        .left-heart-half.animating {
          animation: leftHeartJoin 3s ease-out forwards;
        }

        .right-heart-half {
          transform: translateX(120px);
        }

        .right-heart-half.animating {
          animation: rightHeartJoin 3s ease-out forwards;
        }

        .letter-l {
          transform: translateX(-15px);
          opacity: 0.3;
        }

        .letter-l.animating {
          animation: letterLMove 3s ease-out forwards;
        }

        .letter-d {
          transform: translateX(15px);
          opacity: 0.3;
        }

        .letter-d.animating {
          animation: letterDMove 3s ease-out forwards;
        }

        .ampersand {
          opacity: 0;
          transform: scale(0);
        }

        .ampersand.animating {
          animation: ampersandAppear 3s ease-out forwards;
        }

        .heart-crack {
          opacity: 0;
        }

        .heart-crack.animating {
          animation: crackDisappear 3s ease-out forwards;
        }
      `}</style>

      <button
        onClick={onClick}
        className={`heart-logo-container hover:opacity-90 transition-opacity focus:outline-none ${animate ? 'animating' : ''}`}
        aria-label="Go to home"
      >
        <svg width={width} height={height} viewBox="0 0 120 108">
          {/* Left half of heart */}
          <g className={`left-heart-half ${animate ? 'animating' : ''}`}>
            <path
              d="M60 100 C30 72, 5 50, 5 30 C5 12, 18 2, 35 2 C47 2, 56 10, 60 20 L60 100Z"
              fill="#7c3aed"
            />
            {/* Left letter L */}
            <text
              className={`letter-l ${animate ? 'animating' : ''}`}
              x="32"
              y="58"
              fontSize="30"
              fontFamily="Georgia, serif"
              fontStyle="italic"
              fill="white"
              fontWeight="400"
            >
              {config.couple.bride.initial}
            </text>
          </g>

          {/* Right half of heart */}
          <g className={`right-heart-half ${animate ? 'animating' : ''}`}>
            <path
              d="M60 100 C90 72, 115 50, 115 30 C115 12, 102 2, 85 2 C73 2, 64 10, 60 20 L60 100Z"
              fill="#7c3aed"
            />
            {/* Right letter D */}
            <text
              className={`letter-d ${animate ? 'animating' : ''}`}
              x="68"
              y="58"
              fontSize="30"
              fontFamily="Georgia, serif"
              fontStyle="italic"
              fill="white"
              fontWeight="400"
            >
              {config.couple.groom.initial}
            </text>
          </g>

          {/* Crack line down the middle (fades away as heart joins) */}
          <line
            className={`heart-crack ${animate ? 'animating' : ''}`}
            x1="60"
            y1="15"
            x2="60"
            y2="85"
            stroke="white"
            strokeWidth="2"
            strokeDasharray="4,3"
          />

          {/* Ampersand in center (appears when heart is whole) */}
          <text
            className={`ampersand ${animate ? 'animating' : ''}`}
            x="60"
            y="62"
            fontSize="18"
            fontFamily="Arial, sans-serif"
            fill="white"
            textAnchor="middle"
            fontWeight="300"
          >
            &amp;
          </text>
        </svg>
      </button>
    </>
  );
};

export default HeartLogo;

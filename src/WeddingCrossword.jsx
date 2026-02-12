import React, { useState, useRef } from 'react';
import { PenTool, Check } from 'lucide-react';

const WeddingCrossword = () => {
  // --- CONFIGURATION ---

  // 1. THE VISUAL GRID (14x14)
  const solutionGrid = [
    ['F', 'R', 'E', 'M', 'O', 'N', 'T', '#', '#', '#', '#', '#', '#', '#'], // 0: FREMONT
    ['#', '#', '#', '#', '#', '#', 'A', '#', '#', '#', '#', '#', '#', '#'], // 1: A (TACOS)
    ['#', '#', 'A', '#', '#', '#', 'C', 'O', 'O', 'K', 'I', 'E', 'S', '#'], // 2: A (ARIES), C (TACOS), COOKIES
    ['#', '#', 'R', '#', '#', '#', 'O', '#', '#', '#', '#', '#', '#', '#'], // 3: R (ARIES), O (TACOS)
    ['B', 'R', 'I', 'D', 'G', 'E', 'S', '#', '#', '#', '#', '#', '#', '#'], // 4: BRIDGES, I(ARIES), S(TACOS)
    ['#', '#', 'E', '#', '#', '#', '#', '#', 'B', '#', '#', '#', '#', '#'], // 5: E(ARIES), B(BACKYARD)
    ['#', '#', 'S', 'A', 'L', 'A', 'T', 'H', 'A', 'I', '#', '#', '#', '#'], // 6: S(ARIES), SALATHAI, A(BACKYARD)
    ['#', '#', '#', '#', '#', '#', '#', '#', 'C', '#', '#', '#', '#', '#'], // 7: C(BACKYARD)
    ['#', '#', '#', '#', '#', '#', '#', '#', 'K', '#', '#', '#', '#', '#'], // 8: K(BACKYARD)
    ['#', '#', '#', '#', '#', 'J', 'U', 'L', 'Y', '#', '#', '#', '#', '#'], // 9: JULY, Y(BACKYARD)
    ['#', '#', '#', '#', '#', '#', '#', '#', 'A', '#', '#', '#', '#', '#'], // 10: A(BACKYARD)
    ['#', '#', '#', '#', '#', '#', '#', '#', 'R', '#', '#', '#', '#', '#'], // 11: R(BACKYARD)
    ['#', '#', '#', '#', '#', '#', '#', '#', 'D', 'O', 'N', 'U', 'T', 'S'], // 12: DONUTS, D(BACKYARD)
    ['#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#'],
  ];

  // 2. ANSWER KEY
  const wordLocations = [
    { dir: 'across', r: 0, c: 0, word: 'FREMONT' },
    { dir: 'across', r: 2, c: 6, word: 'COOKIES' },
    { dir: 'across', r: 4, c: 0, word: 'BRIDGES' },
    { dir: 'across', r: 6, c: 2, word: 'SALATHAI' },
    { dir: 'across', r: 9, c: 5, word: 'JULY' },
    { dir: 'across', r: 12, c: 8, word: 'DONUTS' },

    { dir: 'down',   r: 0, c: 6, word: 'TACOS' },
    { dir: 'down',   r: 2, c: 2, word: 'ARIES' },
    { dir: 'down',   r: 5, c: 8, word: 'BACKYARD' },
  ];

  // 3. NUMBER MARKERS
  const cellNumbers = {
    '0-0': 7,  // FREMONT
    '0-6': 9,  // TACOS
    '2-6': 1,  // COOKIES
    '2-2': 2,  // ARIES
    '4-0': 6,  // BRIDGES
    '6-2': 8,  // SALATHAI
    '5-8': 5,  // BACKYARD
    '9-5': 3,  // JULY
    '12-8': 4, // DONUTS
  };

  const clues = {
    across: [
      { num: 1, text: "Dan's favorite dessert" },
      { num: 3, text: "The month we say 'I do'" },
      { num: 4, text: "Lorraine's favorite dessert" },
      { num: 6, text: "The reception venue" },
      { num: 7, text: "City where we met" },
      { num: 8, text: "Where was our first date?" },
    ],
    down: [
      { num: 2, text: "We share this zodiac sign" },
      { num: 5, text: "Where did the proposal take place?" },
      { num: 9, text: "What is our favorite Food?" },
    ]
  };

  // --- STATE ---
  const [grid, setGrid] = useState(
    solutionGrid.map(row => row.map(cell => cell === '#' ? '#' : ''))
  );
  const [direction, setDirection] = useState('across');
  const [activeCell, setActiveCell] = useState({ r: null, c: null });
  const [status, setStatus] = useState('PLAYING');
  const inputRefs = useRef({});

  // --- LOGIC ---
  const getCorrectCells = () => {
    const correctSet = new Set();
    wordLocations.forEach(({ dir, r, c, word }) => {
      let isWordComplete = true;
      const currentCoords = [];
      for (let i = 0; i < word.length; i++) {
        const checkR = dir === 'across' ? r : r + i;
        const checkC = dir === 'across' ? c + i : c;
        if(checkR > 13 || checkC > 13) { isWordComplete = false; break; }
        const userVal = grid[checkR][checkC];
        if (userVal !== word[i]) { isWordComplete = false; }
        currentCoords.push(`${checkR}-${checkC}`);
      }
      if (isWordComplete) {
        currentCoords.forEach(coord => correctSet.add(coord));
      }
    });
    return correctSet;
  };

  const correctCells = getCorrectCells();

  const handleCellClick = (r, c) => {
    if (solutionGrid[r][c] === '#') return;
    if (activeCell.r === r && activeCell.c === c) {
      setDirection(prev => prev === 'across' ? 'down' : 'across');
      return;
    }
    setActiveCell({ r, c });
    const hasHorizontal = (c > 0 && solutionGrid[r][c-1] !== '#') || (c < 13 && solutionGrid[r][c+1] !== '#');
    const hasVertical = (r > 0 && solutionGrid[r-1][c] !== '#') || (r < 13 && solutionGrid[r+1][c] !== '#');
    if (hasVertical && !hasHorizontal) setDirection('down');
    else if (hasHorizontal && !hasVertical) setDirection('across');
  };

  const handleChange = (r, c, value) => {
    const val = value.slice(-1).toUpperCase();
    const newGrid = [...grid];
    newGrid[r][c] = val;
    setGrid(newGrid);
    if (val) moveFocus(r, c, 1);
  };

  const handleKeyDown = (e, r, c) => {
    if (e.key === 'Backspace') {
      e.preventDefault();
      const newGrid = [...grid];
      if (grid[r][c] !== '') {
        newGrid[r][c] = '';
        setGrid(newGrid);
      } else {
        moveFocus(r, c, -1, true);
      }
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      setDirection('across');
      moveFocus(r, c, 1, false, 'across');
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      setDirection('across');
      moveFocus(r, c, -1, false, 'across');
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      setDirection('down');
      moveFocus(r, c, 1, false, 'down');
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setDirection('down');
      moveFocus(r, c, -1, false, 'down');
    }
  };

  const moveFocus = (r, c, offset, deleteOnArrive = false, overrideDir = null) => {
    const currentDir = overrideDir || direction;
    let nextR = r;
    let nextC = c;
    if (currentDir === 'across') nextC += offset;
    else nextR += offset;
    if (nextR < 0 || nextR > 13 || nextC < 0 || nextC > 13) return;
    if (solutionGrid[nextR][nextC] === '#') {
      moveFocus(nextR, nextC, offset, deleteOnArrive, currentDir);
      return;
    }
    setActiveCell({ r: nextR, c: nextC });
    const nextInput = inputRefs.current[`${nextR}-${nextC}`];
    if (nextInput) {
      nextInput.focus();
      if (deleteOnArrive) {
        setGrid(prev => {
          const g = [...prev];
          g[nextR][nextC] = '';
          return g;
        });
      }
    }
  };

  const checkAnswers = () => {
    let isCorrect = true;
    for (let r = 0; r < 14; r++) {
      for (let c = 0; c < 14; c++) {
        if (solutionGrid[r][c] !== '#') {
          if (grid[r][c] !== solutionGrid[r][c]) isCorrect = false;
        }
      }
    }
    setStatus(isCorrect ? 'SUCCESS' : 'ERROR');
  };

  return (
    <div className="w-full animate-in fade-in duration-700">
      
      {/* GLASS CARD CONTAINER - bg-white/30 makes it very transparent */}
      <div className="bg-white/30 backdrop-blur-xl p-2 md:p-8 rounded-3xl border border-white/40 shadow-2xl max-w-4xl mx-auto">

        {/* HEADER ICON */}
        <div className="text-center mb-6">
            <div className="inline-block p-3 bg-purple-100/80 rounded-full mb-2 shadow-inner">
               <PenTool className="text-purple-900" size={20} />
            </div>
          <h2 className="text-3xl font-serif italic text-purple-900 mb-4">How Well Do You Know Us?</h2>
          <p className="text-[10px] uppercase tracking-[0.3em] text-purple-900 font-bold mb-8">✨ Test Your Knowledge — Can You Crack the Crossword? ✨</p>

        </div>

        {/* GRID */}
        <div className="w-full max-w-lg mx-auto mb-10">
          <div
            className="grid bg-purple-100/30 border-2 border-purple-900/30 shadow-inner w-full aspect-square"
            style={{
              gridTemplateColumns: `repeat(14, 1fr)`,
              gridTemplateRows: `repeat(14, 1fr)`,
              gap: '1px'
            }}
          >
            {solutionGrid.map((row, r) => (
              row.map((cell, c) => {
                const isBlack = cell === '#';
                const cellNum = cellNumbers[`${r}-${c}`];
                const isActive = activeCell.r === r && activeCell.c === c;
                const isCorrect = correctCells.has(`${r}-${c}`);
                let isWordHighlight = false;
                if (!isBlack && activeCell.r !== null) {
                    if (direction === 'across' && r === activeCell.r) isWordHighlight = true;
                    if (direction === 'down' && c === activeCell.c) isWordHighlight = true;
                }

                // Black squares are now semi-transparent purple
                if (isBlack) {
                  return <div key={`${r}-${c}`} className="bg-purple-900/60 w-full h-full" />;
                }

                // Make white cells slightly transparent
                let bgClass = "bg-white/70"; 
                if (isActive) bgClass = "bg-purple-100 ring-2 ring-inset ring-purple-300 z-20";
                else if (isCorrect) bgClass = "bg-emerald-100/90";
                else if (isWordHighlight) bgClass = "bg-purple-50/80";

                return (
                  <div key={`${r}-${c}`} className={`relative w-full h-full transition-colors duration-300 ${bgClass}`}>
                    {cellNum && (
                      <span className={`absolute top-[1px] left-[1px] text-[6px] md:text-[9px] leading-none font-bold pointer-events-none z-10 ${isCorrect ? 'text-emerald-800' : 'text-purple-900'}`}>
                        {cellNum}
                      </span>
                    )}
                    <input
                      ref={el => inputRefs.current[`${r}-${c}`] = el}
                      type="text"
                      autoComplete="off"
                      value={grid[r][c]}
                      onClick={() => handleCellClick(r, c)}
                      onChange={(e) => handleChange(r, c, e.target.value)}
                      onKeyDown={(e) => handleKeyDown(e, r, c)}
                      className={`
                        w-full h-full text-center font-sans font-bold text-[9px] md:text-sm uppercase outline-none
                        caret-transparent cursor-pointer p-0 rounded-none bg-transparent
                        ${isCorrect && !isActive ? 'text-emerald-900' : 'text-slate-900'}
                      `}
                    />
                  </div>
                );
              })
            ))}
          </div>
        </div>

        {/* CLUES */}
        <div className="grid md:grid-cols-2 gap-8 mb-10 pt-8 border-t border-purple-900/10">
          <div>
            <h3 className="font-bold text-purple-900 text-xs uppercase tracking-widest mb-4 border-b border-purple-900/10 pb-2">Across</h3>
            <ul className="space-y-3 text-xs md:text-sm text-slate-900 font-serif text-left font-medium">
              {clues.across.map(c => (
                <li key={c.num} className="flex gap-3">
                  <span className="font-bold text-purple-900 shrink-0">{c.num}.</span>
                  <span className="italic">{c.text}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-purple-900 text-xs uppercase tracking-widest mb-4 border-b border-purple-900/10 pb-2">Down</h3>
            <ul className="space-y-3 text-xs md:text-sm text-slate-900 font-serif text-left font-medium">
              {clues.down.map(c => (
                <li key={c.num} className="flex gap-3">
                  <span className="font-bold text-purple-900 shrink-0">{c.num}.</span>
                  <span className="italic">{c.text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ACTIONS */}
        <div className="text-center">
          {status === 'SUCCESS' && (
             <div className="bg-emerald-100/90 text-emerald-900 p-4 rounded-xl text-sm font-bold mb-6 animate-pulse tracking-widest uppercase flex flex-col items-center justify-center gap-2 shadow-sm">
               <div className="flex items-center gap-2">
                 <Check size={18} />
                 <span>All Correct!</span>
               </div>
             </div>
          )}
          {status === 'ERROR' && (
            <div className="bg-white/80 text-red-500 text-xs font-bold mb-4 uppercase tracking-widest inline-block px-4 py-2 rounded-full shadow-sm">
              Check your spelling
            </div>
          )}

          <button
            onClick={checkAnswers}
            className="px-12 py-4 bg-purple-900 text-white rounded-full font-bold tracking-[0.2em] text-[10px] uppercase shadow-xl hover:bg-purple-800 transition-all active:scale-95 hover:-translate-y-0.5"
          >
            Check Answers
          </button>
        </div>

      </div>
    </div>
  );
};

export default WeddingCrossword;
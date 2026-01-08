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

  // --- CALCULATE CORRECT WORDS ---
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
        if (userVal !== word[i]) {
          isWordComplete = false;
        }
        currentCoords.push(`${checkR}-${checkC}`);
      }

      if (isWordComplete) {
        currentCoords.forEach(coord => correctSet.add(coord));
      }
    });

    return correctSet;
  };

  const correctCells = getCorrectCells();

  // --- LOGIC ---
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
    <main className="max-w-3xl mx-auto px-4 py-24 animate-in fade-in duration-700">
      <PenTool className="mx-auto text-purple-200 mb-6" size={40} />
      <h2 className="text-5xl text-center text-purple-900 mb-8 font-light italic">Crossword</h2>
      
      <div className="bg-white p-4 md:p-8 rounded-3xl border border-purple-100 shadow-xl">
        <div className="text-center mb-8">
          <p className="text-[10px] uppercase tracking-widest text-slate-400">
            Tap twice to switch direction
          </p>
        </div>

        {/* GRID - 14x14 Layout */}
        <div className="flex justify-center mb-10 overflow-x-auto">
          <div 
            className="grid bg-purple-100 border-2 border-purple-900 shadow-md shrink-0"
            style={{ 
              gridTemplateColumns: `repeat(14, minmax(20px, 30px))`, // Adjusted for 14 cols
              gridTemplateRows: `repeat(14, minmax(20px, 30px))`,
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

                if (isBlack) {
                  return <div key={`${r}-${c}`} className="bg-purple-900 w-full h-full" />;
                }

                let bgClass = "bg-white";
                if (isActive) bgClass = "bg-purple-100 ring-2 ring-inset ring-purple-300 z-20";
                else if (isCorrect) bgClass = "bg-emerald-100"; 
                else if (isWordHighlight) bgClass = "bg-purple-50";

                return (
                  <div key={`${r}-${c}`} className={`relative w-full h-full transition-colors duration-300 ${bgClass}`}>
                    {cellNum && (
                      <span className={`absolute top-0.5 left-0.5 text-[6px] md:text-[8px] leading-none font-bold pointer-events-none z-10 ${isCorrect ? 'text-emerald-700' : 'text-purple-900'}`}>
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
                        w-full h-full text-center font-sans font-bold text-[10px] md:text-sm uppercase outline-none
                        caret-purple-500 cursor-pointer p-0 rounded-none bg-transparent
                        ${isCorrect && !isActive ? 'text-emerald-800' : 'text-slate-800'}
                      `}
                    />
                  </div>
                );
              })
            ))}
          </div>
        </div>

        {/* CLUES */}
        <div className="grid md:grid-cols-2 gap-8 mb-10 pt-8 border-t border-purple-50">
          <div>
            <h3 className="font-bold text-purple-900 text-xs uppercase tracking-widest mb-4 border-b border-purple-100 pb-2">Across</h3>
            <ul className="space-y-3 text-xs md:text-sm text-slate-600 font-serif">
              {clues.across.map(c => (
                <li key={c.num} className="flex gap-3">
                  <span className="font-bold text-purple-900 shrink-0">{c.num}.</span> 
                  <span className="italic">{c.text}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-purple-900 text-xs uppercase tracking-widest mb-4 border-b border-purple-100 pb-2">Down</h3>
            <ul className="space-y-3 text-xs md:text-sm text-slate-600 font-serif">
              {clues.down.map(c => (
                <li key={c.num} className="flex gap-3">
                  <span className="font-bold text-purple-900 shrink-0">{c.num}.</span> 
                  <span className="italic">{c.text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="text-center">
          {status === 'SUCCESS' && (
             <div className="bg-emerald-100 text-emerald-800 p-4 rounded-xl text-sm font-bold mb-6 animate-pulse tracking-widest uppercase flex flex-col items-center justify-center gap-2">
               <div className="flex items-center gap-2">
                 <Check size={18} /> 
                 <span>All Correct!</span>
               </div>
               <span className="text-xs opacity-75">You know us so well!</span>
             </div>
          )}
          {status === 'ERROR' && (
            <div className="text-red-400 text-xs font-bold mb-4 uppercase tracking-widest">
              Check your spelling
            </div>
          )}
          
          <button 
            onClick={checkAnswers}
            className="px-12 py-4 bg-purple-900 text-white rounded-full font-bold tracking-[0.2em] text-[10px] uppercase shadow-xl hover:bg-purple-800 transition-all active:scale-95"
          >
            Check Answers
          </button>
        </div>

      </div>
    </main>
  );
};

export default WeddingCrossword;
"use client";

import React, { useState } from 'react';
import Link from 'next/link';

export default function SignInPage() {
  const [panicLevel, setPanicLevel] = useState(0);

  const handleTyping = () => {
    // Every keystroke brings the zombies closer!
    setPanicLevel(prev => Math.min(prev + 5, 100));
  };

  return (
    <div className="min-h-screen bg-black text-red-600 font-mono p-4 flex flex-col items-center select-none">
      
      {/* Old school warning ticker */}
      <div className="w-full border-y-4 border-red-800 bg-red-950/30 overflow-hidden relative h-10 flex items-center">
        <div className="whitespace-nowrap animate-marquee absolute text-xl font-bold tracking-widest">
          <span className="text-yellow-500">⚠ WARNING ⚠</span> ZOMBIE BREACH IN SECTOR 4 <span className="text-yellow-500">⚠ WARNING ⚠</span> THEY ARE IN THE VENTS <span className="text-yellow-500">⚠ WARNING ⚠</span> EVACUATE IMMEDIATELY <span className="text-yellow-500">⚠ WARNING ⚠</span>
        </div>
      </div>

      <h1 className="text-4xl md:text-5xl font-bold underline mt-10 mb-4 tracking-widest text-center decoration-double">
        SURVIVOR LOGIN V1.0
      </h1>
      
      <p className="mb-8 text-center bg-red-950 p-2 border-2 border-dashed border-red-800 font-bold animate-pulse">
        ENTER CREDENTIALS QUICKLY. THEY HEARD YOU.
      </p>

      {/* The "Eating" Animation Container */}
      <div className="">
        <div 
          className="absolute top-4 text-4xl transition-all duration-200 transform -scale-x-100"
          style={{ right: `calc(-20% + ${panicLevel * 0.65}%)` }}
        >
          🧟‍♀️
        </div>
        <div 
          className="absolute top-14 text-5xl transition-all duration-200 transform -scale-x-100"
          style={{ right: `calc(-15% + ${panicLevel * 0.55}%)` }}
        >
          🧟
        </div>
        
        {/* Text showing when totally eaten */}
        {panicLevel >= 100 && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/90 font-black text-4xl text-red-600 z-10 animate-ping">
            <span>💀</span>
            <span className="text-xl">YOU DIED.</span>
          </div>
        )}
      </div>

      {/* Old Web Layout Form inside a Table */}
      <form 
        onSubmit={(e) => { 
          e.preventDefault(); 
          if(panicLevel >= 100) {
            alert("ERROR: USER IS CURRENTLY BEING DIGESTED.");
          } else {
            alert("ACCESS DENIED! THE DOOR IS JAMMED! THEY BROKE THROUGH!"); 
            setPanicLevel(100);
          }
        }}
      >
        <table className="border-4 border-red-800 bg-black" cellPadding={12}>
          <tbody>
            <tr>
              <td colSpan={2} className="bg-red-900 font-bold text-black text-center text-xl sm:text-2xl border-b-4 border-red-800">
                BUNKER ACCESS TERMINAL
              </td>
            </tr>
            <tr>
              <td className="text-right border-b border-r border-red-800 font-bold sm:text-lg">
                USERNAME:
              </td>
              <td className="border-b border-red-800">
                <input 
                  type="text" 
                  onChange={handleTyping}
                  disabled={panicLevel >= 100}
                  className="bg-black text-red-500 border-2 border-red-600 p-2 w-full outline-none focus:bg-red-950 font-mono disabled:opacity-30 transition-colors" 
                  placeholder="survivor_99"
                  required
                />
              </td>
            </tr>
            <tr>
              <td className="text-right border-b border-r border-red-800 font-bold sm:text-lg">
                PASSWORD:
              </td>
              <td className="border-b border-red-800">
                <input 
                  type="password" 
                  onChange={handleTyping}
                  disabled={panicLevel >= 100}
                  className="bg-black text-red-500 border-2 border-red-600 p-2 w-full outline-none focus:bg-red-950 font-mono disabled:opacity-30 transition-colors" 
                  placeholder="*********"
                  required
                />
              </td>
            </tr>
            <tr>
              <td colSpan={2} className="text-center p-6">
                <button 
                  type="submit"
                  disabled={panicLevel >= 100}
                  className="bg-red-800 text-black font-black text-2xl px-6 py-3 border-4 border-outset border-red-500 hover:bg-red-600 hover:text-white cursor-pointer active:translate-y-1 disabled:opacity-20 disabled:cursor-not-allowed w-full transition-all"
                >
                  [ INITIATE LOGIN ]
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </form>

      <div className="mt-16 text-sm text-red-900 text-center font-bold flex flex-col items-center space-y-2">
        <p>Best viewed in Netscape Navigator 3.0</p>
        <p>Copyright © 1999 Doomsday Preppers Unltd.</p>
        <Link href="/" className="inline-block mt-4 text-red-500 hover:text-red-400 border border-red-900 px-3 py-1 hover:bg-red-900 hover:text-black transition-colors">
          {'<'} ABORT MISSION. RUN AWAY. {'>'}
        </Link>
      </div>

      {/* Global CSS for the Marquee to work properly with tailwind without altering global css files */}
      <style>{`
        @keyframes marquee {
          0% { left: 100%; transform: translateX(0); }
          100% { left: 0%; transform: translateX(-100%); }
        }
        .animate-marquee {
          animation: marquee 10s linear infinite;
        }
      `}</style>
    </div>
  );
}

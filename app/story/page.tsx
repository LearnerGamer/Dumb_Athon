"use client";
import React, { useEffect, useState, useRef } from 'react';
import assets from '../../public/assets';

export default function StoryPage() {
    const linesPhase0 = [
        "> ACCESSING SURVIVOR ARCHIVE...",
        "> CROSS CHECKING HUMAN ACTIVITY...",
        "> ANALYZING BEHAVIOR PATTERNS...",
        "> Pages read: 23",
        "> Survival guides opened: 11",
        "> Time spent searching for hope: 47 minutes",
        "",
        "> INTELLIGENCE LEVEL: ABOVE FAILED TRIALS",
        "> STATUS: VIABLE HUMAN SPECIMEN"
    ];

    const linesPhase1 = [
        "For months… maybe years… you searched for answers here.",
        "",
        "Food guides. Shelter plans. Signals from other survivors.",
        "",
        "You thought this place was a refuge.",
        "A final archive made by humans trying to stay alive.",
        "",
        "You were wrong.",
        "",
        "Every click.",
        "Every page you opened.",
        "Every desperate search for hope…",
        "",
        "We watched it all.",
        "",
        "This site was never meant to save you.",
        "",
        "It was built to find you.",
        "",
        "Your species called them zombies.",
        "A convenient name for something you couldn't understand.",
        "",
        "They were simply… failed trials.",
        "",
        "Attempts to reshape your kind.",
        "Unstable. Mindless. Imperfect.",
        "",
        "But you… the ones who kept thinking… surviving… adapting…",
        "",
        "You are the real discovery.",
        "",
        "And this place?",
        "",
        "It was the perfect lure.",
        "A beacon for the last intelligent humans hiding in the ruins.",
        "",
        "And you came exactly as expected.",
        "",
        "Curious. Desperate. Hopeful.",
        "",
        "It was… entertaining.",
        "",
        "Watching you prepare.",
        "Watching you believe.",
        "Watching you think this was your last safe place.",
        "",
        "Thank you for participating in our little observation experiment.",
        "",
        "Your location has been recorded.",
        "",
        "And now that we know you are still alive…",
        "",
        "We are coming to collect.",
        "",
        "Soon."
    ];

    const linesPhase2 = [
        "> ACTION ANALYZED",
        "> OUTCOME: FUTILE"
    ];

    const [phase, setPhase] = useState(0); 
    const [visibleLines, setVisibleLines] = useState<string[]>([]);
    const [currentLineIndex, setCurrentLineIndex] = useState(0);
    const [currentCharIndex, setCurrentCharIndex] = useState(0);

    const activeLines = phase === 0 ? linesPhase0 : phase === 1 ? linesPhase1 : linesPhase2;

    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const bgMusic = new Audio(assets.music);
        bgMusic.loop = true;
        bgMusic.volume = 0.6;

        const playMusic = () => {
            bgMusic.play().catch(e => console.log("Autoplay blocked, waiting for interaction", e));
        };

        playMusic();

        // Fallback for strict browser autoplay policies
        const handleInteraction = () => {
            playMusic();
            document.removeEventListener('click', handleInteraction);
        };
        
        document.addEventListener('click', handleInteraction);

        return () => {
            bgMusic.pause();
            bgMusic.src = "";
            document.removeEventListener('click', handleInteraction);
        };
    }, []);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [visibleLines, currentLineIndex, currentCharIndex]);

    useEffect(() => {
        if (currentLineIndex >= activeLines.length) return;

        const currentLine = activeLines[currentLineIndex];

        if (currentCharIndex < currentLine.length) {
            const timeout = setTimeout(() => {
                setVisibleLines(prev => {
                    const newLines = [...prev];
                    if (newLines[currentLineIndex] === undefined) {
                        newLines[currentLineIndex] = '';
                    }
                    newLines[currentLineIndex] += currentLine[currentCharIndex];
                    return newLines;
                });
                setCurrentCharIndex(prev => prev + 1);
            }, Math.random() * 30 + 10); // slightly faster typing for the long story

            return () => clearTimeout(timeout);
        } else {
            const lineDelay = currentLine === "" ? 200 : 600;
            const timeout = setTimeout(() => {
                setCurrentLineIndex(prev => prev + 1);
                setCurrentCharIndex(0);
            }, lineDelay);

            return () => clearTimeout(timeout);
        }
    }, [currentLineIndex, currentCharIndex, activeLines]);

    const handleEnterTrueBunkr = () => {
        setPhase(1);
        setVisibleLines([]);
        setCurrentLineIndex(0);
        setCurrentCharIndex(0);
    };

    const handleActionClick = () => {
        const audio = new Audio(assets.among_us_imposter);
        audio.play().catch(e => console.error("Audio play failed:", e));

        setPhase(2);
        setVisibleLines([]);
        setCurrentLineIndex(0);
        setCurrentCharIndex(0);
    };

    return (
        <main className="min-h-screen bg-black flex flex-col items-center justify-center p-4">
            <div 
                className="w-full max-w-4xl h-[80vh] border-4 border-green-500 bg-black p-8 font-mono text-green-500 shadow-[0_0_20px_rgba(34,197,94,0.3)] relative overflow-hidden flex flex-col" 
                style={{ fontFamily: "'Courier New', Courier, monospace" }}
            >
                {/* CRT Screen Scanline Overlay */}
                <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%] z-10" />
                
                <h1 className="text-3xl font-bold mb-6 tracking-widest text-center border-b-2 border-green-500 pb-4 shadow-green-500/50 drop-shadow-md shrink-0">
                    {phase === 0 ? "TERMINAL UPLINK ESTABLISHED" : "INCOMING TRANSMISSION..."}
                </h1>

                <div className="space-y-4 text-base sm:text-lg md:text-xl flex-grow overflow-y-auto pb-20 scrollbar-hide" ref={scrollRef}>
                    {visibleLines.map((line, index) => (
                        <div key={index} className="min-h-[1.5em] tracking-wide">
                            {line}
                            {index === currentLineIndex && (
                                <span className="inline-block w-3 h-5 ml-1 bg-green-500 animate-pulse" />
                            )}
                        </div>
                    ))}
                    
                    {phase === 0 && currentLineIndex >= activeLines.length && (
                        <div className="mt-8 animate-pulse text-center space-y-4">
                            <span className="inline-block px-4 py-2 border-2 border-green-500 cursor-pointer hover:bg-green-500 hover:text-black transition-colors" onClick={handleEnterTrueBunkr}>
                                ENTER TRUE BUNKR
                            </span>
                        </div>
                    )}

                    {phase === 1 && currentLineIndex >= activeLines.length && (
                        <div className="mt-12 text-center pb-8">
                            <h2 className="text-2xl mb-6 text-red-500 animate-pulse">CHOOSE YOUR SURVIVAL PLAN:</h2>
                            <div className="flex flex-col sm:flex-row justify-center gap-6">
                                <button className="px-6 py-3 border-2 border-green-500 cursor-pointer hover:bg-green-500 hover:text-black transition-colors text-xl font-bold" onClick={handleActionClick}>
                                    HIDE
                                </button>
                                <button className="px-6 py-3 border-2 border-green-500 cursor-pointer hover:bg-green-500 hover:text-black transition-colors text-xl font-bold" onClick={handleActionClick}>
                                    RUN
                                </button>
                                <button className="px-6 py-3 border-2 border-green-500 cursor-pointer hover:bg-green-500 hover:text-black transition-colors text-xl font-bold" onClick={handleActionClick}>
                                    FIGHT
                                </button>
                            </div>
                        </div>
                    )}

                    {phase === 2 && currentLineIndex >= activeLines.length && (
                        <div className="mt-16 text-center pb-12 relative z-50">
                            <div className="horror-text font-bold text-2xl md:text-4xl uppercase tracking-widest text-red-600">
                                <span className="glitch-line" data-text="Don’t bother closing this page.">Don’t bother closing this page.</span>
                                <br/><br/>
                                <span className="glitch-line" data-text="We already know where you are.">We already know where you are.</span>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            
            <style jsx global>{`
                .scrollbar-hide::-webkit-scrollbar {
                    display: none;
                }
                .scrollbar-hide {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }

                .horror-text {
                    text-shadow: 0 0 10px rgba(255,0,0,0.8), 0 0 20px rgba(255,0,0,0.5);
                    animation: horror-shake 0.3s infinite;
                }

                .glitch-line {
                    position: relative;
                    display: inline-block;
                }

                .glitch-line::before, .glitch-line::after {
                    content: attr(data-text);
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: transparent;
                    color: #fff;
                }

                .glitch-line::before {
                    left: 3px;
                    text-shadow: -2px 0 red, 0 0 10px red;
                    animation: horror-glitch-1 0.4s infinite linear alternate-reverse;
                }

                .glitch-line::after {
                    left: -3px;
                    text-shadow: -2px 0 blue;
                    animation: horror-glitch-2 0.3s infinite linear alternate-reverse;
                }
                
                @keyframes horror-shake {
                    0% { transform: translate(1px, 1px) rotate(0deg); }
                    25% { transform: translate(-2px, -1px) rotate(-1deg); }
                    50% { transform: translate(1px, -2px) rotate(1deg); }
                    75% { transform: translate(-1px, 2px) rotate(-1deg); }
                    100% { transform: translate(2px, 1px) rotate(0deg); }
                }

                @keyframes horror-glitch-1 {
                    0% { clip: rect(10px, 9999px, 80px, 0); transform: skew(1deg); }
                    25% { clip: rect(50px, 9999px, 20px, 0); filter: invert(20%); }
                    50% { clip: rect(30px, 9999px, 60px, 0); filter: invert(0%); }
                    75% { clip: rect(70px, 9999px, 40px, 0); transform: skew(-1deg); }
                    100% { clip: rect(20px, 9999px, 90px, 0); filter: invert(10%); transform: skew(0deg); }
                }

                @keyframes horror-glitch-2 {
                    0% { clip: rect(30px, 9999px, 50px, 0); }
                    25% { clip: rect(80px, 9999px, 10px, 0); }
                    50% { clip: rect(10px, 9999px, 70px, 0); }
                    75% { clip: rect(60px, 9999px, 30px, 0); }
                    100% { clip: rect(40px, 9999px, 80px, 0); }
                }
            `}</style>
        </main>
    );
}

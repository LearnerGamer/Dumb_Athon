"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import assets from "../../../public/assets";

export default function SignUpPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState<'fake_form' | 'human_confirmed' | 'real_form'>('human_confirmed');
  const [clicks, setClicks] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isLightMode, setIsLightMode] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [glitching, setGlitching] = useState(false);

  // For real form
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // Audio context ref
  const audioCtxRef = useRef<AudioContext | null>(null);

  // Initialize mouse position smoothly
  useEffect(() => {
    setMousePos({ x: window.innerWidth / 2, y: window.innerHeight / 2 });

    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    if (currentStep === 'real_form') {
      window.addEventListener('mousemove', handleMouseMove);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [currentStep]);

  // Ambient horror background noise
  useEffect(() => {
    let droneOsc: OscillatorNode | null = null;
    let lfo: OscillatorNode | null = null;
    let droneGain: GainNode | null = null;

    if (currentStep === 'real_form' && audioCtxRef.current) {
      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      droneOsc = ctx.createOscillator();
      droneGain = ctx.createGain();

      droneOsc.type = 'triangle';
      droneOsc.frequency.setValueAtTime(45, ctx.currentTime);

      // LFO for creepy wobble
      lfo = ctx.createOscillator();
      lfo.type = 'sine';
      lfo.frequency.setValueAtTime(0.2, ctx.currentTime);
      const lfoGain = ctx.createGain();
      lfoGain.gain.setValueAtTime(4, ctx.currentTime);
      lfo.connect(lfoGain);
      lfoGain.connect(droneOsc.frequency);
      lfo.start();

      droneGain.gain.setValueAtTime(0, ctx.currentTime);
      droneGain.gain.linearRampToValueAtTime(0.08, ctx.currentTime + 3); // fade in slowly

      droneOsc.connect(droneGain);
      droneGain.connect(ctx.destination);

      droneOsc.start();
    }

    return () => {
      if (droneGain && audioCtxRef.current) {
        droneGain.gain.linearRampToValueAtTime(0, audioCtxRef.current.currentTime + 1);
        setTimeout(() => {
          if (droneOsc) droneOsc.stop();
          if (lfo) lfo.stop();
        }, 1000);
      }
    };
  }, [currentStep]);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      audioRef.current = new window.Audio(assets.faaaaaaa);
    }
  }, []);

  const playScarySound = () => {
    try {
      if (audioRef.current) {
        audioRef.current.currentTime = 0;
        const playPromise = audioRef.current.play();
        if (playPromise !== undefined) {
          playPromise.catch(console.error);
        }
      } else {
        new Audio(assets.faaaaaaa).play().catch(console.error);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleFakeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentStep('human_confirmed');
  };

  const handleRegisterClick = () => {
    playScarySound();
    setGlitching(true);

    setTimeout(() => {
      setGlitching(false);
    }, 150);

    setClicks(c => {
      const newClicks = c + 1;
      if (newClicks >= 3) {
        setTimeout(() => {
          setCurrentStep('real_form');
        }, 400);
      }
      return newClicks;
    });
  };

  const handleRealSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Welcome to the darkness, ${username}.`);
    router.push('/bunkr');
  };

  return (
    <div className={`min-h-screen ${isLightMode ? 'bg-white' : 'bg-black'} text-red-700 font-sans flex items-center justify-center p-4 overflow-hidden relative ${glitching ? 'animate-pulse' : ''} transition-colors duration-1000`}>

      {/* Theme Toggle Button */}
      <button
        onClick={() => setIsLightMode(!isLightMode)}
        className="absolute top-4 right-4 z-50 p-3 rounded-full border border-red-900 bg-transparent text-red-600 hover:bg-red-950/20 hover:text-red-500 transition-all shadow-[0_0_10px_rgba(200,0,0,0.2)]"
        aria-label="Toggle Theme"
      >
        {isLightMode ? (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>
        ) : (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
        )}
      </button>

      {currentStep === 'human_confirmed' && (
        <div className="w-full max-w-lg text-center space-y-8 select-none relative z-10 transition-opacity duration-500">
          <div className="space-y-3 text-red-700 font-mono text-sm sm:text-base leading-relaxed tracking-widest opacity-80">
            <p className="animate-pulse">Proof you are not a zombie detected.</p>
            <p>Human confirmed.</p>
            <p>You are not registered yet.</p>
            <p className="pt-6 text-red-600 font-bold uppercase tracking-[0.2em] transform scale-105">Proceed to real registration.</p>
          </div>

          <button
            onClick={handleRegisterClick}
            className={`mt-10 px-8 py-4 ${isLightMode ? 'bg-white' : 'bg-black'} border border-red-900 text-red-600 uppercase tracking-[0.3em] text-sm hover:bg-red-950/40 hover:text-red-500 transition-all focus:outline-none shadow-[0_0_10px_rgba(100,0,0,0.3)] hover:shadow-[0_0_20px_rgba(200,0,0,0.5)] group relative overflow-hidden`}
          >
            <span className="relative z-10 transition-transform group-active:scale-95 block">
              Register Now {clicks > 0 && clicks < 3 ? `(${3 - clicks})` : ''}
            </span>
            <div className="absolute inset-0 bg-red-900/10 scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
          </button>
        </div>
      )}

      {currentStep === 'real_form' && (
        <>
          {/* Torchlight Overlay layer that leaves a hole in the center and masks out everything else, guiding to the form naturally */}
          <div
            className={`fixed inset-0 z-50 pointer-events-none transition-opacity duration-1000 ${isLightMode ? 'opacity-0' : 'opacity-100 bg-black'}`}
            style={{
              background: `radial-gradient(circle 25px at ${mousePos.x}px ${mousePos.y}px, rgba(0,0,0,0) 0%, rgba(0,0,0,0.99) 40px, #000 50px)`
            }}
          />

          <div className="relative z-10 w-full max-w-sm bg-transparent p-8 flex flex-col items-center">
            <h1 className="text-3xl font-black tracking-[0.4em] text-red-600 mb-12 uppercase text-center text-shadow-glow opacity-90">
              <span className="block text-[0.35em] tracking-[0.5em] text-red-900 mb-4 opacity-70">The Real</span>
              SignUp
            </h1>
            <form onSubmit={handleRealSubmit} className="space-y-8 w-full relative z-20">
              <div className="group relative">
                <label className="block text-xs uppercase tracking-[0.2em] text-red-900/50 mb-2 group-hover:text-red-700 transition-colors duration-500">Username</label>
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full bg-transparent border-b border-red-900/30 px-2 py-3 text-red-500 focus:outline-none focus:border-red-600 focus:shadow-[0_4px_10px_-4px_rgba(220,38,38,0.5)] transition-all hover:border-red-800"
                  autoComplete="off"
                />
              </div>
              <div className="group relative">
                <label className="block text-xs uppercase tracking-[0.2em] text-red-900/50 mb-2 group-hover:text-red-700 transition-colors duration-500">Password</label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-transparent border-b border-red-900/30 px-2 py-3 text-red-500 focus:outline-none focus:border-red-600 focus:shadow-[0_4px_10px_-4px_rgba(220,38,38,0.5)] transition-all hover:border-red-800"
                />
              </div>
              <button
                type="submit"
                className="w-full mt-6 bg-transparent border border-red-950 text-red-800 py-4 uppercase tracking-[0.4em] text-xs hover:bg-red-950/20 transition-all hover:shadow-[0_0_15px_rgba(220,0,0,0.3)] hover:text-red-500 hover:border-red-800 focus:outline-none opacity-80 hover:opacity-100"
              >
                Enter
              </button>
            </form>
          </div>

          <style dangerouslySetInnerHTML={{
            __html: `
            .text-shadow-glow {
              text-shadow: 0 0 12px rgba(220,38,38,0.4);
            }
          `}} />
        </>
      )}

    </div>
  );
}

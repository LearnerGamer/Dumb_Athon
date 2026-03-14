"use client";

import React, { useState } from "react";
import Link from "next/link";

export default function SignUpPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  // Game state - determines if the submit button is active
  const [isGamePassed, setIsGamePassed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isGamePassed) {
      alert("You must pass the password challenge first.");
      return;
    }
    alert(`Account created successfully for ${username}!`);
  };

  return (
    <div className="min-h-screen bg-black text-red-500 font-sans flex items-center justify-center p-4">
      <div className="w-full max-w-lg bg-neutral-950 border border-red-900 rounded-xl p-8 shadow-[0_0_30px_rgba(220,38,38,0.15)] relative overflow-hidden">
        
        {/* Decorative Background Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f00001a_1px,transparent_1px),linear-gradient(to_bottom,#4f00001a_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

        <div className="relative z-10">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold tracking-tight text-white mb-2">New Registration</h1>
            <p className="text-red-500/80 text-sm">Create a new clearance profile to proceed.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Standard Fields */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-red-500/90 mb-1.5" htmlFor="username">
                  Username
                </label>
                <input
                  id="username"
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full bg-black/50 border border-red-900 rounded-lg px-4 py-3 text-white placeholder-red-900/50 focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent transition-all"
                  placeholder="agent_007"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-red-500/90 mb-1.5" htmlFor="email">
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-black/50 border border-red-900 rounded-lg px-4 py-3 text-white placeholder-red-900/50 focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent transition-all"
                  placeholder="user@system.local"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-red-500/90 mb-1.5" htmlFor="password">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-black/50 border border-red-900 rounded-lg px-4 py-3 text-white placeholder-red-900/50 focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent transition-all"
                  placeholder="••••••••"
                />
              </div>
            </div>

            {/* PASSWORD GAME PLACEHOLDER SECTION */}
            <div className="mt-8 border border-red-800/50 bg-red-950/20 rounded-lg p-6 relative">
              <div className="absolute top-0 left-0 bg-red-900 text-black text-xs font-bold px-2 py-1 rounded-br-lg uppercase tracking-wider">
                Security Challenge
              </div>
              
              <div className="flex flex-col items-center justify-center space-y-4 text-center mt-4">
                <span className="text-3xl">🎮</span>
                <p className="text-red-400 font-medium">
                  {/* Prompt for follow up */}
                  [ Insert Password Validation Game Here ]
                </p>
                <p className="text-xs text-red-500/60 max-w-sm">
                  The submit button will remain locked until your password passes all the validation rules from the game logic.
                </p>
                
                {/* Temporary toggle button to test the form submission state */}
                <button
                  type="button"
                  onClick={() => setIsGamePassed(!isGamePassed)}
                  className={`mt-4 px-4 py-2 text-sm font-bold border-2 rounded-md transition-all ${
                    isGamePassed 
                      ? 'bg-green-600/20 border-green-600 text-green-500 hover:bg-green-600/30' 
                      : 'bg-red-800/40 border-red-800 text-red-500 hover:bg-red-800/60'
                  }`}
                >
                  {isGamePassed ? '✓ Challenge Passed (Test Toggle)' : 'Mock Pass Challenge (Test Toggle)'}
                </button>
              </div>
            </div>

            {/* Registration Button */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={!isGamePassed}
                className={`w-full font-bold py-4 px-4 rounded-lg transition-all border-2 border-transparent uppercase tracking-wider
                  ${isGamePassed 
                    ? 'bg-red-600 hover:bg-red-500 text-white shadow-[0_0_15px_rgba(220,38,38,0.5)] hover:shadow-[0_0_25px_rgba(255,50,50,0.8)] cursor-pointer active:scale-[0.98]' 
                    : 'bg-neutral-900 text-red-900 border-red-900/30 cursor-not-allowed opacity-80'
                  }
                `}
              >
                {isGamePassed ? "Complete Registration" : "Clearance Denied"}
              </button>
            </div>
            
          </form>

          {/* Footer Link */}
          <div className="mt-8 text-center text-sm text-red-500/60">
            <Link href="/sign-in" className="hover:text-red-400 transition-colors">
              Return to Login Portal
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}

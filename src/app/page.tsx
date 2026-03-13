"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Round1_Entry from "@/components/rounds/Round1_Entry";
import Round2_Warning from "@/components/rounds/Round2_Warning";
import Round3_Counter from "@/components/rounds/Round3_Counter";
import Round4_Result from "@/components/rounds/Round4_Result";

export type BattleState = {
  round: 1 | 2 | 3 | 4;
  userPost: string;
  enemyPost: string;
  userCounter: string;
  result?: {
    result: "WIN" | "LOSE" | "DRAW";
    score_logic: number;
    score_aori: number;
    score_margin: number;
    judge_comment: string;
  };
};

export default function Home() {
  const [state, setState] = useState<BattleState>({
    round: 1,
    userPost: "",
    enemyPost: "",
    userCounter: "",
  });

  const nextRound = (updates: Partial<BattleState>) => {
    const nextR = (state.round + 1) as BattleState["round"];
    setState((prev) => ({ ...prev, ...updates, round: nextR }));
  };

  const reset = () => {
    setState({
      round: 1,
      userPost: "",
      enemyPost: "",
      userCounter: "",
    });
  };

  return (
    <main className="min-h-screen bg-black text-white relative flex flex-col items-center">
      {/* Premium Visual Layers */}
      <div className="bg-mesh" />
      <div className="cyber-grid" />
      <div className="scanlines" />

      {/* Header HUD - Industry Standard */}
      <header className="w-full h-16 border-b border-white/5 backdrop-blur-md z-50 flex items-center justify-between px-8 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-battle-blue/50 to-transparent" />
        
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 border border-battle-blue bg-battle-blue/10 flex items-center justify-center font-black italic font-bangers text-xl text-battle-blue shadow-[0_0_15px_rgba(0,242,255,0.3)]">
            4D
          </div>
          <div>
            <div className="font-orbitron text-[10px] font-black tracking-widest text-battle-blue/60 leading-none mb-1 uppercase">System Protocol</div>
            <div className="font-bangers italic text-xl tracking-wider leading-none">DEATH STRUGGLE</div>
          </div>
        </div>

        <div className="flex items-center gap-8">
          <div className="hidden md:block">
            <div className="hud-label text-right">Active Instance</div>
            <div className="font-orbitron text-xs font-bold text-white/80">#BATTLE_V1.4.0</div>
          </div>
          <div className="w-12 h-1.5 bg-zinc-900 overflow-hidden rounded-full">
            <motion.div 
              animate={{ x: [-48, 48] }}
              transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
              className="w-12 h-full bg-battle-red shadow-[0_0_10px_var(--battle-red)]" 
            />
          </div>
        </div>
      </header>

      {/* Main Gameplay HUD Layout */}
      <div className="pt-20 pb-12 w-full max-w-[1600px] px-8 z-10 flex-1 flex items-center">
        <div className="hud-layout w-full">
          
          {/* Left HUD Panel: Battle Status */}
          <aside className="hud-side-panel">
            <div className="space-y-6">
              <div>
                <div className="hud-label border-b border-white/10 pb-2 mb-4">Tactical Status</div>
                <div className="flex justify-between text-xs font-bold mb-2">
                  <span className="text-white/40 italic">Integrity:</span>
                  <span className="text-battle-blue">STABLE</span>
                </div>
                <div className="flex justify-between text-xs font-bold">
                  <span className="text-white/40 italic">AI Sync:</span>
                  <span className="text-battle-yellow animate-pulse">98.4%</span>
                </div>
              </div>

              <div>
                <div className="hud-label border-b border-white/10 pb-2 mb-4">Battle Log</div>
                <div className="space-y-3 font-mono text-[10px] leading-relaxed text-blue-300/60 uppercase">
                  {state.round >= 1 && <div className="text-battle-blue">[{">"}] System Initiated</div>}
                  {state.userPost && <div className="text-zinc-500">[{">"}] Capture: user_intent_entry</div>}
                  {state.round >= 2 && <div className="text-battle-red">[{">"}] Warning: Intrusion detected</div>}
                  {state.enemyPost && <div className="text-zinc-500">[{">"}] Trace: kuso_reply_origin</div>}
                  {state.round >= 3 && <div className="text-battle-yellow">[{">"}] Counter: Protocol armed</div>}
                </div>
              </div>
            </div>

            <div className="mt-auto pt-6 border-t border-white/5 select-none">
              <div className="hud-label mb-2">Network Grid</div>
              <div className="grid grid-cols-4 gap-1 h-12">
                {[...Array(16)].map((_, i) => (
                  <motion.div 
                    key={i}
                    animate={{ opacity: [0.2, 0.8, 0.2] }}
                    transition={{ repeat: Infinity, duration: Math.random() * 2 + 1, delay: Math.random() }}
                    className="bg-battle-blue/20"
                  />
                ))}
              </div>
            </div>
          </aside>

          {/* Center Main Stage */}
          <section className="flex flex-col items-center justify-center relative min-h-[500px]">
            <AnimatePresence mode="wait">
              {state.round === 1 && (
                <Round1_Entry key="r1" onNext={(post) => nextRound({ userPost: post })} />
              )}
              {state.round === 2 && (
                <Round2_Warning 
                  key="r2" 
                  userPost={state.userPost} 
                  onNext={(enemyPost) => nextRound({ enemyPost })} 
                />
              )}
              {state.round === 3 && (
                <Round3_Counter 
                  key="r3" 
                  userPost={state.userPost}
                  enemyPost={state.enemyPost} 
                  onNext={(counter) => nextRound({ userCounter: counter })} 
                />
              )}
              {state.round === 4 && (
                <Round4_Result 
                  key="r4" 
                  state={state} 
                  onReset={reset}
                  onResultLoad={(result) => setState(prev => ({ ...prev, result }))}
                />
              )}
            </AnimatePresence>
          </section>

          {/* Right HUD Panel: Logic Analysis */}
          <aside className="hud-side-panel">
            <div className="space-y-8">
              <div>
                <div className="hud-label border-b border-white/10 pb-2 mb-4">Neural Damage Map</div>
                <div className="relative aspect-square bg-black/40 border border-white/5 rounded-lg overflow-hidden flex items-center justify-center">
                  <div className="absolute inset-0 cyber-grid opacity-20" />
                  <motion.div 
                    animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
                    transition={{ repeat: Infinity, duration: 4 }}
                    className="w-24 h-24 rounded-full bg-battle-red/20 blur-2xl" 
                  />
                  <div className="z-10 text-[10px] font-black text-center text-white/40">
                    SCANNING<br/>CONTEXT...
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="hud-label border-b border-white/10 pb-2">Environmental Triggers</div>
                {[
                  { name: "Sarcasm", val: state.round >= 2 ? 88 : 0 },
                  { name: "Logic Flaw", val: state.round >= 3 ? 42 : 0 },
                  { name: "Viral Potential", val: state.round >= 4 ? 95 : 0 },
                ].map((item) => (
                  <div key={item.name} className="space-y-1">
                    <div className="flex justify-between text-[10px] font-bold">
                      <span className="text-white/40">{item.name}</span>
                      <span className="text-battle-blue">{item.val}%</span>
                    </div>
                    <div className="h-0.5 w-full bg-white/5">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${item.val}%` }}
                        className="h-full bg-battle-blue"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-auto h-24 relative overflow-hidden flex items-center justify-center">
              <div className="font-bangers italic text-4xl opacity-5 select-none rotate-[-10deg]">
                4D RESBA
              </div>
            </div>
          </aside>
        </div>
      </div>

      {/* Footer Meta HUD */}
      <footer className="w-full h-12 border-t border-white/5 backdrop-blur-md z-50 flex items-center justify-between px-8 text-[9px] font-black tracking-widest text-white/30 font-orbitron">
        <div>COORDINATES: {state.round}.0.0 // SECTOR_RESBA</div>
        <div className="flex gap-4">
          <span className="text-battle-blue">BATTLE_READY</span>
          <span className="animate-pulse">LATENCY: 12ms</span>
        </div>
      </footer>
    </main>
  );
}

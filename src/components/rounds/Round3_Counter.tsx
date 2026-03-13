"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function Round3_Counter({ 
  userPost,
  enemyPost, 
  onNext 
}: { 
  userPost: string, 
  enemyPost: string, 
  onNext: (counter: string) => void 
}) {
  const [counter, setCounter] = useState("");

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full flex flex-col gap-10 max-w-[850px]"
    >
      {/* Tactical HUD Header */}
      <div className="grid grid-cols-2 gap-10">
        <div>
          <div className="flex justify-between mb-3 px-1">
            <span className="hud-label !text-battle-blue !opacity-100">YOU (ARMED)</span>
            <span className="font-orbitron text-xs font-black text-white/40 tracking-widest">100%</span>
          </div>
          <div className="h-4 bg-zinc-950 border border-white/10 rounded-sm overflow-hidden relative shadow-inner">
             <motion.div 
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              className="h-full bg-gradient-to-r from-battle-blue to-blue-900 shadow-[0_0_25px_rgba(0,242,255,0.3)]"
            />
            <div className="absolute inset-0 bg-[url('/scanline.png')] opacity-20" />
          </div>
        </div>
        <div>
          <div className="flex justify-between mb-3 px-1">
            <span className="font-orbitron text-xs font-black text-white/40 tracking-widest">92%</span>
            <span className="hud-label !text-battle-red !opacity-100">ENEMY (TARGET)</span>
          </div>
          <div className="h-4 bg-zinc-950 border border-white/10 rounded-sm overflow-hidden relative shadow-inner">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: "92%" }}
              className="h-full ml-auto bg-gradient-to-l from-battle-red to-red-900 shadow-[0_0_25px_rgba(255,0,60,0.3)]"
            />
             <div className="absolute inset-0 bg-[url('/scanline.png')] opacity-20" />
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-8">
        {/* Enemy Bubble - Enhanced Sizing & Style */}
        <motion.div 
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="bg-zinc-900/60 backdrop-blur-md border-2 border-white/5 p-8 rounded-3xl rounded-tr-none relative shadow-[0_20px_60px_rgba(0,0,0,0.4)]"
        >
          <div className="flex items-center gap-2 mb-4">
            <div className="w-1.5 h-1.5 bg-battle-red rounded-full" />
            <div className="hud-label !text-battle-red">Target Logic Node:</div>
          </div>
          <p className="text-2xl text-zinc-100 font-medium italic leading-[1.3] drop-shadow-sm select-none">
            「{enemyPost}」
          </p>
          {/* Decorative Arrow */}
          <div className="absolute top-0 -right-3 w-6 h-6 bg-zinc-900/60 border-t-2 border-r-2 border-white/5 rotate-[45deg]" />
        </motion.div>

        {/* Counter Interface - Tactical Overhaul */}
        <div className="glass-card border-b-8 border-battle-blue p-10 md:p-14 relative overflow-hidden group">
          <div className="absolute -bottom-10 -left-10 opacity-[0.02] select-none pointer-events-none group-hover:opacity-[0.05] transition-opacity">
            <span className="text-[20rem] font-black italic font-bangers">FIRE</span>
          </div>

          <div className="flex items-center gap-4 mb-10">
            <div className="w-2.5 h-10 bg-battle-blue shadow-[0_0_20px_var(--battle-blue)]" />
            <div>
              <div className="hud-label">Countermeasure Protocol</div>
              <h2 className="text-3xl md:text-4xl font-black italic font-bangers tracking-widest text-white uppercase">
                EXECUTE <span className="text-battle-blue">RONPA</span>
              </h2>
            </div>
          </div>

          <div className="relative mb-10">
            <textarea
              className="w-full h-56 bg-black/50 border border-white/10 rounded-2xl p-10 text-white text-2xl placeholder-white/5 focus:outline-none focus:ring-1 focus:ring-battle-blue/40 transition-all resize-none italic font-medium leading-relaxed shadow-inner"
              placeholder="ここに、敵の論理を瓦解させる一撃を叩き込め..."
              value={counter}
              onChange={(e) => setCounter(e.target.value)}
            />
            <div className="absolute bottom-6 right-8 text-[9px] font-black text-battle-blue/40 uppercase tracking-[0.4em] font-orbitron">
              Neural Link Ready
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => counter.trim() && onNext(counter)}
            disabled={!counter.trim()}
            className="w-full py-7 btn-tactical-blue text-4xl font-bangers disabled:opacity-10 active:scale-95 transition-all"
          >
            CONFIRM NEURAL STRIKE
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}

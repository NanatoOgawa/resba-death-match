"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { BattleState } from "@/app/page";
import confetti from "canvas-confetti";

export default function Round4_Result({ 
  state, 
  onReset,
  onResultLoad
}: { 
  state: BattleState, 
  onReset: () => void,
  onResultLoad: (result: BattleState["result"]) => void
}) {
  const [loading, setLoading] = useState(!state.result);
  const [showComment, setShowComment] = useState(false);

  useEffect(() => {
    if (state.result) {
      setLoading(false);
      setTimeout(() => setShowComment(true), 1400);
      return;
    }

    const judge = async () => {
      try {
        const res = await fetch("/api/battle", {
          method: "POST",
          body: JSON.stringify({ 
            action: "judge", 
            enemyPost: state.enemyPost, 
            userCounter: state.userCounter 
          }),
        });
        const data = await res.json();
        onResultLoad(data);
        setLoading(false);
        setTimeout(() => setShowComment(true), 1400);
        
        if (data.result === "WIN") {
          confetti({
            particleCount: 200,
            spread: 90,
            origin: { y: 0.6 },
            colors: ['#00f2ff', '#ffffff', '#ff003c', '#f3ff00'],
            ticks: 300
          });
        }
      } catch (e) {
        setLoading(false);
      }
    };
    judge();
  }, [state, onResultLoad]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-32 glass-card w-full max-w-[600px] gap-10">
        <div className="relative w-28 h-28 flex items-center justify-center">
          <div className="absolute inset-0 border-4 border-battle-blue/10 rounded-full" />
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
            className="absolute inset-0 border-4 border-battle-blue border-t-transparent rounded-full shadow-[0_0_20px_var(--battle-blue)]" 
          />
          <div className="font-black text-xl text-battle-blue font-orbitron animate-pulse">AI</div>
        </div>
        <div className="space-y-4 text-center">
           <div className="hud-label !text-battle-blue">Neural Pattern Matching</div>
           <div className="text-4xl font-black italic font-bangers tracking-[0.3em] text-white animate-flicker">
             CALCULATING DAMAGE...
           </div>
        </div>
      </div>
    );
  }

  const result = state.result;
  if (!result) return null;

  const isWin = result.result === "WIN";
  const isLose = result.result === "LOSE";
  const statusColor = isWin ? "text-battle-blue" : isLose ? "text-battle-red" : "text-battle-yellow";
  const statusGlow = isWin ? "drop-shadow-[0_0_40px_rgba(0,242,255,0.6)]" : isLose ? "drop-shadow-[0_0_40px_rgba(255,0,60,0.6)]" : "drop-shadow-[0_0_40px_rgba(243,255,0,0.6)]";

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="w-full flex flex-col items-center py-4 max-w-[850px]"
    >
      <div className="relative mb-16 flex flex-col items-center">
        <motion.div
          initial={{ scale: 5, opacity: 0, rotate: -10 }}
          animate={{ scale: 1, opacity: 1, rotate: 0 }}
          transition={{ type: "spring", damping: 10, stiffness: 100 }}
          className={`text-8xl md:text-11xl font-black italic ${statusColor} font-bangers tracking-tight z-10 ${statusGlow}`}
        >
          {result.result === "WIN" && "K.O.!!"}
          {result.result === "LOSE" && "DEFEATED"}
          {result.result === "DRAW" && "DRAW"}
        </motion.div>
        
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className={`text-2xl md:text-3xl font-black italic font-orbitron ${statusColor} -mt-4 tracking-[0.5em] uppercase opacity-70`}
        >
          {result.result === "WIN" ? "Total Dominance" : result.result === "LOSE" ? "System Failure" : "Logic Loop"}
        </motion.div>
      </div>

      <div className="w-full glass-card p-10 md:p-16 space-y-16 relative overflow-hidden group">
        <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        
        {/* Tactical Performance Specs */}
        <div className="grid grid-cols-3 gap-6 md:gap-14">
          <ScoreGauge label="LOGIC" score={result.score_logic} delay={0.8} color="var(--battle-blue)" />
          <ScoreGauge label="ROAST" score={result.score_aori} delay={1.0} color="var(--battle-red)" />
          <ScoreGauge label="MARGIN" score={result.score_margin} delay={1.2} color="var(--battle-yellow)" />
        </div>

        {/* AI Commentary - Reveal with Glitch */}
        <AnimatePresence>
          {showComment && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white/5 backdrop-blur-3xl p-10 rounded-2xl border border-white/5 relative group/comment"
            >
              <div className="absolute top-0 right-0 p-4 opacity-[0.05] pointer-events-none group-hover/comment:opacity-10 transition-opacity">
                 <span className="text-6xl font-black italic font-bangers">JUDGE</span>
              </div>
              
              <div className="flex items-center gap-3 mb-6">
                <div className="w-1.5 h-4 bg-battle-yellow shadow-[0_0_10px_var(--battle-yellow)]" />
                <div className="hud-label !text-zinc-300">Analysis Summary Trace:</div>
              </div>
              
              <p className="text-2xl md:text-3xl text-zinc-100 leading-tight italic font-medium font-inter tracking-tight">
                「{result.judge_comment}」
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onReset}
          className="w-full py-7 btn-tactical-red text-4xl font-bangers shadow-[0_20px_60px_rgba(255,0,60,0.15)]"
        >
          REINITIATE MATCH?
        </motion.button>
      </div>
    </motion.div>
  );
}

function ScoreGauge({ label, score, delay, color }: { label: string, score: number, delay: number, color: string }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="flex flex-col items-center gap-6"
    >
      <div className="hud-label !opacity-40">{label}</div>
      <motion.div 
        initial={{ scale: 0, rotate: -45 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ delay: delay + 0.3, type: "spring", damping: 12 }}
        className="relative"
      >
        <div className="text-5xl md:text-7xl font-black italic text-white font-bangers leading-none z-10 relative">
          {score}
        </div>
        <div className="absolute -inset-4 opacity-20 blur-xl rounded-full" style={{ backgroundColor: color }} />
      </motion.div>
      <div className="w-full h-2 bg-zinc-950 border border-white/5 rounded-full overflow-hidden p-[1px]">
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: `${score}%` }}
          transition={{ delay: delay + 0.6, duration: 1.2, ease: "circOut" }}
          className="h-full rounded-full shadow-[0_0_15px_var(--color)]"
          style={{ backgroundColor: color, "--color": color } as any}
        />
      </div>
    </motion.div>
  );
}

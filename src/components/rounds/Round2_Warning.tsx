"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Round2_Warning({ 
  userPost, 
  onNext 
}: { 
  userPost: string, 
  onNext: (enemyPost: string) => void 
}) {
  const [phase, setPhase] = useState<"warning" | "enemy">("warning");
  const [enemyPost, setEnemyPost] = useState("");

  useEffect(() => {
    const fetchEnemy = async () => {
      try {
        const res = await fetch("/api/battle", {
          method: "POST",
          body: JSON.stringify({ action: "generate_kuso", userPost }),
        });
        const data = await res.json();
        setEnemyPost(data.enemyPost);
      } catch (e) {
        setEnemyPost("スタバにMac持ち込んでドヤ顔ですか？😅 コーヒーの味も分からないのにｗ");
      }
    };
    fetchEnemy();

    const timer = setTimeout(() => {
      setPhase("enemy");
    }, 2800);

    return () => clearTimeout(timer);
  }, [userPost]);

  return (
    <div className="w-full flex flex-col items-center justify-center min-h-[500px]">
      <AnimatePresence mode="wait">
        {phase === "warning" ? (
          <motion.div
            key="warning"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 3, filter: "brightness(2) blur(20px)" }}
            className="flex flex-col items-center gap-10"
          >
            <div className="glitch-warning text-white font-black italic text-6xl md:text-8xl px-20 py-10 skew-x-[-15deg] shadow-[0_0_100px_rgba(255,0,60,0.6)] font-bangers tracking-[0.2em] relative overflow-hidden">
               <div className="absolute inset-0 bg-white/10 animate-flicker pointer-events-none" />
               WARNING!!
            </div>
            <motion.div 
              animate={{ opacity: [1, 0.4, 1] }}
              transition={{ repeat: Infinity, duration: 0.15 }}
              className="text-battle-red font-black tracking-[0.8em] text-2xl font-orbitron uppercase"
            >
              Intruder Detected
            </motion.div>
          </motion.div>
        ) : (
          <motion.div
            key="enemy"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full space-y-12 max-w-[800px]"
          >
            {/* Professional VS Interface */}
            <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-8 px-4">
              <HPUnit label="YOU" color="var(--battle-blue)" align="left" />
              <div className="font-bangers text-7xl md:text-8xl italic text-white drop-shadow-[0_0_30px_rgba(255,255,255,0.4)] animate-pulse">VS</div>
              <HPUnit label="ENEMY" color="var(--battle-red)" align="right" />
            </div>

            <div className="glass-card border-l-8 border-battle-red p-10 md:p-16 relative overflow-hidden group">
              {/* Background HUD Decor */}
              <div className="absolute -top-10 -right-10 opacity-[0.02] select-none pointer-events-none group-hover:opacity-[0.05] transition-opacity">
                <span className="text-[25rem] font-black italic font-bangers">NPC</span>
              </div>
              
              <div className="flex items-center gap-3 mb-8">
                <div className="w-2.5 h-2.5 bg-battle-red animate-ping rounded-full" />
                <div className="hud-label !text-battle-red">Critical Trace Found:</div>
              </div>
              
              <p className="text-2xl md:text-3xl font-black text-white italic leading-[1.2] tracking-tight drop-shadow-md">
                「{enemyPost || "DECRYPTING TARGET..."}」
              </p>
              
              {enemyPost && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                >
                   <button
                    onClick={() => onNext(enemyPost)}
                    className="mt-14 w-full py-7 bg-white text-black font-black italic text-4xl font-bangers tracking-widest rounded-xl hover:bg-zinc-100 transition-all shadow-[0_10px_50px_rgba(255,255,255,0.2)] active:scale-95 flex items-center justify-center gap-4"
                  >
                    DEPLOY COUNTER!!
                  </button>
                  <div className="mt-4 text-center">
                    <span className="hud-label opacity-40">System ready for retaliation</span>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function HPUnit({ label, color, align }: { label: string, color: string, align: "left" | "right" }) {
  return (
    <div className={`flex flex-col gap-3 ${align === "right" ? "items-end" : "items-start"}`}>
      <div className="hud-label !text-[12px]" style={{ color }}>{label}</div>
      <div className="h-6 w-32 md:w-64 bg-black border-2 border-white/5 rounded-sm relative overflow-hidden group">
        <div className="absolute inset-0 bg-white/5 opacity-50 z-0" />
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ duration: 1.5, ease: "circOut" }}
          className="h-full relative z-10"
          style={{ 
            background: `linear-gradient(${align === "left" ? "90deg" : "-90deg"}, ${color}, rgba(0,0,0,0.6))`,
            boxShadow: `0 0 20px ${color}44`
          }}
        />
        {/* Shine Animation */}
        <motion.div 
          animate={{ x: align === "left" ? ["-100%", "200%"] : ["200%", "-100%"] }}
          transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
          className="absolute inset-0 z-20 w-1/3 bg-white/20 blur-md pointer-events-none"
        />
      </div>
    </div>
  );
}

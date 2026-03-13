"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function Round1_Entry({ onNext }: { onNext: (post: string) => void }) {
  const [post, setPost] = useState("");

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 30 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 1.05, filter: "blur(24px)" }}
      className="glass-card w-full max-w-[700px] p-8 md:p-14 relative overflow-hidden"
    >
      {/* Background Decor */}
      <div className="absolute top-0 right-0 p-8 opacity-[0.03] select-none pointer-events-none">
        <span className="text-[20rem] font-black italic font-bangers -mt-20 block uppercase tracking-tighter">BATTLE</span>
      </div>

      <div className="relative z-10 space-y-10">
        <section>
          <motion.div 
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex items-center gap-4 mb-4"
          >
            <div className="w-2 h-10 bg-battle-blue shadow-[0_0_20px_var(--battle-blue)]" />
            <div>
              <div className="hud-label">Entry Protocol 01</div>
              <h2 className="text-4xl md:text-5xl font-black italic font-bangers text-white uppercase tracking-wider leading-none">
                PEACEFUL <span className="text-battle-blue">DAYS</span>
              </h2>
            </div>
          </motion.div>
          <p className="text-white/50 font-medium italic text-lg leading-relaxed max-w-md">
            日常の何気ない投稿から、すべては始まる。
            <br />あなたの「当たり前」を世界に発信せよ。
          </p>
        </section>

        <div className="space-y-8">
          <div className="relative">
            {/* Input Deco */}
            <div className="absolute -top-3 -left-3 text-[10px] font-black font-orbitron text-battle-blue/40 px-2 py-0.5 border border-battle-blue/20 bg-black/40 backdrop-blur-sm z-20 uppercase tracking-[0.2em]">
              Data Stream
            </div>
            
            <textarea
              className="w-full h-48 bg-black/40 border border-white/10 rounded-2xl p-8 text-white text-xl placeholder-white/10 focus:outline-none focus:ring-1 focus:ring-battle-blue/40 transition-all resize-none font-medium italic leading-relaxed"
              placeholder="例：今日スタバで新作飲んだ〜！美味しかった！"
              value={post}
              onChange={(e) => setPost(e.target.value)}
            />
            
            <div className="absolute bottom-4 right-6 flex items-center gap-2 opacity-30">
              <div className="w-1.5 h-1.5 rounded-full bg-battle-blue animate-pulse" />
              <span className="hud-label !text-[8px]">Awaiting input...</span>
            </div>
          </div>
          
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => post.trim() && onNext(post)}
            disabled={!post.trim()}
            className="w-full py-6 btn-tactical-blue text-3xl font-bangers disabled:opacity-20 disabled:grayscale"
          >
            START TRANSACTION!!
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}

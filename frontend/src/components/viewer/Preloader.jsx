import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export const Preloader = ({ onDone }) => {
  const [pct, setPct] = useState(0);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    const start = Date.now();
    const total = 1800;
    const tick = () => {
      const p = Math.min(1, (Date.now() - start) / total);
      setPct(Math.round(p * 100));
      if (p < 1) requestAnimationFrame(tick);
      else {
        setTimeout(() => {
          setGone(true);
          onDone?.();
        }, 350);
      }
    };
    const raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [onDone]);

  return (
    <AnimatePresence>
      {!gone && (
        <motion.div
          data-testid="preloader"
          className="fixed inset-0 z-[200] flex flex-col justify-between"
          style={{ background: "var(--ink)", color: "var(--bone)" }}
          initial={{ opacity: 1 }}
          exit={{ y: "-100%" }}
          transition={{ duration: 0.85, ease: [0.83, 0, 0.17, 1] }}
        >
          <div className="flex items-start justify-between px-[5vw] pt-8 font-mono2 text-[11px] uppercase tracking-[0.2em]">
            <div>PROJECT MAYHEM // VIEWER v1.0</div>
            <div data-testid="preloader-pct">{pct.toString().padStart(3, "0")}</div>
          </div>

          <div className="px-[5vw]">
            <div className="font-typer text-[clamp(14px,1.4vw,18px)] mb-6 opacity-70">
              the first rule…
            </div>
            <div className="font-stencil text-[clamp(48px,11vw,180px)] uppercase">
              you don&apos;t talk
              <br />
              about the gym.
            </div>
          </div>

          <div className="px-[5vw] pb-10">
            <div
              className="boot-bar"
              style={{ transform: `scaleX(${pct / 100})` }}
            />
            <div className="mt-4 flex justify-between font-mono2 text-[10px] uppercase tracking-[0.25em] opacity-60">
              <span>booting bone-deep</span>
              <span>{pct < 100 ? "loading" : "ready"}</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

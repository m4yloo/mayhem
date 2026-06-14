import { motion } from "framer-motion";
import { PROJECT, DAYS } from "@/data/workout";

const reveal = {
  hidden: { y: "110%" },
  show: (i = 0) => ({
    y: 0,
    transition: { delay: 0.2 + i * 0.08, duration: 0.9, ease: [0.16, 1, 0.3, 1] },
  }),
};

export const Hero = ({ onScroll }) => {
  const trainingDays = DAYS.filter((d) => !d.rest).length;
  return (
    <section
      data-testid="hero"
      className="section flex flex-col justify-between"
      style={{ minHeight: "100vh" }}
    >
      {/* top frame */}
      <div className="flex items-start justify-between font-mono2 text-[11px] uppercase tracking-[0.25em]" style={{ color: "var(--bone-3)" }}>
        <div className="flex items-center gap-3">
          <span
            className="inline-block w-2 h-2 rounded-full"
            style={{ background: "var(--soap)" }}
          />
          <span>{PROJECT.codename}</span>
        </div>
        <div className="hidden md:block">A VIEWER — NO TRACKER — READ ONLY</div>
        <div className="text-right">
          07 ENTRIES
          <br />
          <span style={{ color: "var(--bone)" }}>{trainingDays} TRAINING</span>
        </div>
      </div>

      {/* title */}
      <div className="py-12">
        <div className="font-typer text-[clamp(13px,1.3vw,17px)] uppercase mb-6" style={{ color: "var(--bone-2)" }}>
          / the protocol /
        </div>

        <h1
          data-testid="hero-title"
          className="font-stencil uppercase select-none"
          style={{ fontSize: "clamp(64px, 16vw, 280px)", lineHeight: "0.82" }}
        >
          <span className="mask">
            <motion.span
              custom={0}
              variants={reveal}
              initial="hidden"
              animate="show"
              className="inline-block"
            >
              TYLER
            </motion.span>
          </span>
          <br />
          <span className="mask">
            <motion.span
              custom={1}
              variants={reveal}
              initial="hidden"
              animate="show"
              className="inline-block"
              style={{ color: "var(--soap)" }}
            >
              DURDEN
            </motion.span>
          </span>
          <br />
          <span className="mask">
            <motion.span
              custom={2}
              variants={reveal}
              initial="hidden"
              animate="show"
              className="inline-block"
            >
              5·DAY·SPLIT
            </motion.span>
          </span>
        </h1>
      </div>

      {/* bottom frame */}
      <div className="grid md:grid-cols-3 gap-8 items-end">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.8 }}
          className="font-typer text-[clamp(14px,1.2vw,17px)] leading-relaxed max-w-md"
          style={{ color: "var(--bone-2)" }}
        >
          {PROJECT.brief}
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1, duration: 0.8 }}
          className="font-mono2 text-[11px] uppercase tracking-[0.25em] leading-relaxed"
          style={{ color: "var(--bone-3)" }}
        >
          <div>BODY · WEIGHT</div>
          <div>DUMBBELLS · BAR</div>
          <div>NO MACHINES</div>
          <div className="mt-4" style={{ color: "var(--bone)" }}>
            {PROJECT.subtitle}
          </div>
        </motion.div>

        <motion.button
          data-testid="hero-scroll-cta"
          onClick={onScroll}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="group flex items-center justify-end gap-4 ulink font-stencil uppercase justify-self-end"
          style={{ fontSize: "clamp(22px, 2.4vw, 36px)", color: "var(--bone)" }}
        >
          <span>begin the week</span>
          <span
            className="inline-flex items-center justify-center w-12 h-12 border"
            style={{ borderColor: "var(--bone)" }}
          >
            ↓
          </span>
        </motion.button>
      </div>
    </section>
  );
};

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export const DaySection = ({ day, index, refCb }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { margin: "-40% 0px -40% 0px" });

  // notify parent of active section
  if (inView) refCb?.(index);

  const isRest = day.rest;
  const flip = index % 2 === 1;

  return (
    <section
      ref={ref}
      data-testid={`day-${day.label.toLowerCase()}`}
      className="section"
      style={{
        borderTop: "1px solid var(--line)",
        background: isRest ? "var(--ink-2)" : "var(--ink)",
      }}
    >
      {/* metadata strip */}
      <div className="flex items-center justify-between font-mono2 text-[11px] uppercase tracking-[0.25em] mb-12" style={{ color: "var(--bone-3)" }}>
        <div className="flex items-center gap-6">
          <span style={{ color: "var(--bone)" }}>DAY · {day.n}</span>
          <span>{day.label}</span>
          {isRest ? (
            <span style={{ color: "var(--soap)" }}>// recovery protocol</span>
          ) : (
            <span>{day.exercises.length} movements</span>
          )}
        </div>
        <div className="hidden md:block">{day.tag}</div>
      </div>

      {/* big title */}
      <div
        className={`flex ${flip ? "md:justify-end" : "md:justify-start"} items-start`}
      >
        <motion.h2
          initial={{ y: 80, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, margin: "-15% 0px" }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="font-stencil uppercase select-none"
          style={{
            fontSize: "clamp(86px, 22vw, 360px)",
            lineHeight: "0.82",
            color: isRest ? "var(--bone-3)" : "var(--bone)",
            textAlign: flip ? "right" : "left",
          }}
          data-testid={`day-title-${day.label.toLowerCase()}`}
        >
          {day.name}
          {day.sub ? (
            <span style={{ color: "var(--soap)" }}> {day.sub}</span>
          ) : null}
        </motion.h2>
      </div>

      {/* body */}
      <div className="mt-16 grid md:grid-cols-12 gap-8">
        <div className={`md:col-span-3 ${flip ? "md:order-2" : ""}`}>
          <div className="font-mono2 text-[11px] uppercase tracking-[0.25em]" style={{ color: "var(--bone-3)" }}>
            focus
          </div>
          <div className="font-typer text-[clamp(16px,1.4vw,20px)] mt-3" style={{ color: "var(--bone-2)" }}>
            {day.tag}
          </div>

          <div className="mt-10 font-mono2 text-[11px] uppercase tracking-[0.25em]" style={{ color: "var(--bone-3)" }}>
            doctrine
          </div>
          <p className="font-typer text-[clamp(15px,1.25vw,18px)] mt-3 leading-relaxed max-w-xs" style={{ color: "var(--bone)" }}>
            {day.note}
          </p>
        </div>

        <div className={`md:col-span-9 ${flip ? "md:order-1" : ""}`}>
          {isRest ? (
            <RestPanel note={day.note} />
          ) : (
            <ul data-testid={`exercise-list-${day.label.toLowerCase()}`}>
              {day.exercises.map((e, i) => (
                <motion.li
                  key={i}
                  initial={{ y: 30, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true, margin: "-10% 0px" }}
                  transition={{ duration: 0.7, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
                  className="exrow"
                  data-cursor="hover"
                  data-testid={`exercise-${day.label.toLowerCase()}-${i}`}
                >
                  <span className="ex-idx font-mono2 text-[11px] tracking-[0.2em]" style={{ color: "var(--bone-3)" }}>
                    /{(i + 1).toString().padStart(2, "0")}
                  </span>
                  <span
                    className="ex-name font-stencil uppercase"
                    style={{
                      fontSize: "clamp(28px, 3.6vw, 56px)",
                      color: "var(--bone)",
                      lineHeight: 1,
                    }}
                  >
                    {e.name}
                  </span>
                  <span
                    className="ex-sets font-mono2 uppercase tabular-nums"
                    style={{
                      fontSize: "clamp(13px, 1.1vw, 16px)",
                      color: "var(--bone-2)",
                      letterSpacing: "0.05em",
                    }}
                  >
                    {e.sets}
                  </span>
                </motion.li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
};

const RestPanel = ({ note }) => (
  <div
    data-testid="rest-panel"
    className="border h-full min-h-[340px] flex flex-col justify-between p-8"
    style={{ borderColor: "var(--line-strong)" }}
  >
    <div className="font-stencil uppercase" style={{ fontSize: "clamp(40px,5vw,80px)", color: "var(--bone)", lineHeight: 0.85 }}>
      do<br />
      nothing<br />
      <span style={{ color: "var(--soap)" }}>on purpose.</span>
    </div>
    <div className="grid md:grid-cols-3 gap-6 mt-12">
      {["WALK 30 MIN", "EAT REAL FOOD", "SLEEP 8H+"].map((t, i) => (
        <div key={i}>
          <div className="font-mono2 text-[11px] uppercase tracking-[0.25em]" style={{ color: "var(--bone-3)" }}>
            /{(i + 1).toString().padStart(2, "0")}
          </div>
          <div className="font-stencil mt-2" style={{ fontSize: "clamp(22px,2.2vw,32px)", color: "var(--bone)" }}>
            {t}
          </div>
        </div>
      ))}
    </div>
  </div>
);

import { useRef, useState, useCallback, useEffect } from "react";
import { DAYS } from "@/data/workout";
import { Cursor } from "./Cursor";
import { Preloader } from "./Preloader";
import { Hero } from "./Hero";
import { DaySection } from "./DaySection";
import { SideNav } from "./SideNav";
import { Footer } from "./Footer";

export const Viewer = () => {
  const [active, setActive] = useState(-1); // -1 means hero
  const [booted, setBooted] = useState(false);
  const sectionRefs = useRef([]);

  const setRef = (i) => (el) => {
    sectionRefs.current[i] = el;
  };

  const jumpTo = useCallback((i) => {
    const el = sectionRefs.current[i];
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  const scrollToFirst = useCallback(() => jumpTo(0), [jumpTo]);

  // bind in-view tracking via IntersectionObserver (cheap, no per-section state churn)
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && e.intersectionRatio > 0.4) {
            const idx = Number(e.target.dataset.idx);
            if (!Number.isNaN(idx)) setActive(idx);
          }
        });
      },
      { threshold: [0.4, 0.6] }
    );
    sectionRefs.current.forEach((el) => el && obs.observe(el));
    return () => obs.disconnect();
  }, [booted]);

  return (
    <div data-testid="viewer-root" className="relative">
      <div className="grain" aria-hidden />
      <div className="vignette" aria-hidden />
      <Cursor />

      <Preloader onDone={() => setBooted(true)} />

      <SideNav active={active} onJump={jumpTo} />

      <Hero onScroll={scrollToFirst} />

      {DAYS.map((d, i) => (
        <div
          key={d.n}
          ref={setRef(i)}
          data-idx={i}
          data-testid={`day-wrap-${d.label.toLowerCase()}`}
        >
          <DaySection day={d} index={i} />
        </div>
      ))}

      <Footer />
    </div>
  );
};

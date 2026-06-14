import { DAYS } from "@/data/workout";

export const SideNav = ({ active, onJump }) => {
  return (
    <nav
      data-testid="side-nav"
      className="fixed top-1/2 right-[2.2vw] -translate-y-1/2 z-40 hidden md:flex flex-col gap-3"
    >
      {DAYS.map((d, i) => {
        const isActive = active === i;
        return (
          <button
            key={d.n}
            data-testid={`side-nav-${d.label.toLowerCase()}`}
            onClick={() => onJump(i)}
            className="group flex items-center gap-3 font-mono2 text-[10px] uppercase tracking-[0.2em]"
            style={{
              color: isActive ? "var(--bone)" : "var(--bone-3)",
            }}
          >
            <span className="w-10 text-right">{d.n}</span>
            <span
              className="block transition-all duration-500"
              style={{
                width: isActive ? "44px" : "16px",
                height: "1px",
                background: isActive ? "var(--soap)" : "var(--bone-3)",
              }}
            />
            <span
              className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{ color: "var(--bone)" }}
            >
              {d.label} · {d.name}
            </span>
          </button>
        );
      })}
    </nav>
  );
};

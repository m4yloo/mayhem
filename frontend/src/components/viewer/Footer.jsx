import { useState } from "react";
import { PROJECT } from "@/data/workout";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

export const Footer = () => {
  const [state, setState] = useState("idle"); // idle | working | done | error

  const handleDownload = async () => {
    if (state === "working") return;
    setState("working");
    try {
      const res = await fetch(`${API}/download`);
      if (!res.ok) throw new Error("bad response");
      const blob = await res.blob();
      const disp = res.headers.get("content-disposition") || "";
      const match = disp.match(/filename="?([^"]+)"?/i);
      const filename = match ? match[1] : "app.zip";
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
      setState("done");
      setTimeout(() => setState("idle"), 3500);
    } catch (e) {
      setState("error");
      setTimeout(() => setState("idle"), 4000);
    }
  };

  const buttonLabel = {
    idle: "download /app",
    working: "zipping…",
    done: "delivered.",
    error: "failed — retry",
  }[state];

  return (
    <footer
      data-testid="footer"
      className="section"
      style={{
        borderTop: "1px solid var(--line)",
        background: "var(--bone)",
        color: "var(--ink)",
        minHeight: "85vh",
      }}
    >
      <div className="flex items-start justify-between font-mono2 text-[11px] uppercase tracking-[0.25em]" style={{ color: "var(--ink-2)" }}>
        <div>END OF FILE</div>
        <div className="text-right">
          {PROJECT.codename}
          <br />
          <span style={{ opacity: 0.6 }}>VIEWER · NO TRACKER · READ ONLY</span>
        </div>
      </div>

      <div className="mt-16">
        <div className="font-stencil uppercase" style={{ fontSize: "clamp(64px,14vw,240px)", lineHeight: 0.82 }}>
          you met<br />
          me at a<br />
          <span style={{ color: "var(--soap-2)" }}>very strange</span><br />
          time of life.
        </div>
      </div>

      <div className="mt-16 grid md:grid-cols-2 gap-10">
        <div>
          <div className="font-mono2 text-[11px] uppercase tracking-[0.25em] mb-4" style={{ color: "var(--ink-2)" }}>
            HOUSE RULES
          </div>
          <ul className="space-y-2 font-typer text-[clamp(14px,1.2vw,17px)]">
            {PROJECT.rules.map((r, i) => (
              <li key={i} data-testid={`rule-${i}`} className="flex gap-3">
                <span style={{ color: "var(--soap-2)" }} className="tabular-nums">
                  {(i + 1).toString().padStart(2, "0")}
                </span>
                <span>{r}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:text-right md:self-end">
          <div className="font-mono2 text-[11px] uppercase tracking-[0.25em] mb-4" style={{ color: "var(--ink-2)" }}>
            CREDITS
          </div>
          <p className="font-typer text-[clamp(14px,1.2vw,17px)] leading-relaxed max-w-md md:ml-auto">
            A viewer built for one reader. No analytics, no streak,
            no notification. Just the page, the rules, and you.
          </p>
        </div>
      </div>

      {/* DOWNLOAD ACTION */}
      <div
        className="mt-24 pt-12"
        style={{ borderTop: "1px solid rgba(10,10,10,0.18)" }}
      >
        <div className="grid md:grid-cols-12 gap-8 items-end">
          <div className="md:col-span-7">
            <div className="font-mono2 text-[11px] uppercase tracking-[0.25em] mb-3" style={{ color: "var(--ink-2)" }}>
              SOURCE · TAKE IT WITH YOU
            </div>
            <p className="font-typer text-[clamp(14px,1.2vw,17px)] leading-relaxed max-w-xl">
              The whole thing — the viewer, the data, the backend, everything
              under <span className="font-mono2">/app</span> — zipped on demand.
              No <span className="font-mono2">node_modules</span>, no
              <span className="font-mono2"> .git</span>, no log dust. Yours to keep.
            </p>
          </div>

          <div className="md:col-span-5 md:justify-self-end w-full">
            <button
              data-testid="download-btn"
              onClick={handleDownload}
              disabled={state === "working"}
              className="group w-full md:w-auto inline-flex items-center justify-between gap-6 px-8 py-6 font-stencil uppercase transition-all duration-300"
              style={{
                background: "var(--ink)",
                color: "var(--bone)",
                border: "1px solid var(--ink)",
                fontSize: "clamp(28px, 3.2vw, 48px)",
                lineHeight: 1,
                minWidth: "min(420px, 100%)",
                cursor: state === "working" ? "wait" : "none",
                opacity: state === "working" ? 0.85 : 1,
              }}
              data-cursor="hover"
            >
              <span data-testid="download-btn-label">{buttonLabel}</span>
              <span
                className="inline-flex items-center justify-center w-12 h-12 border transition-transform duration-500 group-hover:translate-y-1"
                style={{
                  borderColor: "var(--bone)",
                  color: state === "done" ? "var(--soap)" : "var(--bone)",
                }}
              >
                {state === "done" ? "✓" : "↓"}
              </span>
            </button>
            <div
              data-testid="download-status"
              className="font-mono2 text-[10px] uppercase tracking-[0.25em] mt-4 md:text-right"
              style={{
                color:
                  state === "error"
                    ? "var(--soap-2)"
                    : state === "done"
                      ? "var(--ink)"
                      : "rgba(10,10,10,0.55)",
                minHeight: "1em",
              }}
            >
              {state === "idle" && "ready · ~/app → .zip"}
              {state === "working" && "compiling archive…"}
              {state === "done" && "archive delivered to your downloads."}
              {state === "error" && "something snapped — try again."}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

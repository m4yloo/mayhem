export const Marquee = ({ items, reverse = false, soap = false, testId }) => {
  const repeated = [...items, ...items, ...items, ...items];
  return (
    <div
      className="ticker scan"
      data-testid={testId || "marquee"}
      style={{
        background: soap ? "var(--soap)" : "var(--ink)",
        color: soap ? "var(--ink)" : "var(--bone)",
        borderColor: soap ? "var(--soap-2)" : undefined,
      }}
    >
      <div className={`ticker-track ${reverse ? "reverse" : ""} font-stencil`}>
        {repeated.map((t, i) => (
          <span
            key={i}
            className="text-[clamp(28px,4vw,56px)] uppercase tracking-tight"
            style={{ opacity: 0.96 }}
          >
            {t}
            <span style={{ margin: "0 1.2rem", opacity: 0.5 }}>✕</span>
          </span>
        ))}
      </div>
    </div>
  );
};

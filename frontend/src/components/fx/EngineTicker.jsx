import { useEffect, useState } from "react";

const LINES = [
  "▸ EV-02 · AI OUTPUT · routing → IN engine",
  "▸ s.2(d)(vi) retrieved · Copyright Act, 1957 · CURRENT_LAW",
  "▸ EV-04 · HUMAN MODIFICATION · routing → US engine",
  "▸ USCO Copyrightability Report (2025) · authority attached",
  "▸ claim position: POTENTIALLY_CLAIMABLE · confidence HIGH",
  "▸ evidence gap: layer history unavailable · preservation advised",
];

// Rolling typewriter terminal that previews the analysis engine.
export default function EngineTicker() {
  const [lines, setLines] = useState([]);
  const [current, setCurrent] = useState("");

  useEffect(() => {
    let li = 0;
    let ci = 0;
    let timer;
    const tick = () => {
      const line = LINES[li];
      ci += 2;
      setCurrent(line.slice(0, ci));
      if (ci >= line.length) {
        setLines((prev) => [...prev.slice(-2), line]);
        setCurrent("");
        li = (li + 1) % LINES.length;
        ci = 0;
        timer = setTimeout(tick, 1000);
      } else {
        timer = setTimeout(tick, 22);
      }
    };
    timer = setTimeout(tick, 1800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="uc-card px-4 py-3 font-mono text-[0.7rem] leading-relaxed max-w-2xl" data-testid="engine-log-ticker">
      <div className="uc-label mb-1.5">Live engine preview</div>
      {lines.map((l, i) => (
        <div key={`${i}-${l.slice(0, 12)}`} className="truncate text-emerald-400/60">
          {l}
        </div>
      ))}
      <div className="truncate text-amber-400/90">
        {current}
        <span className="uc-caret text-amber-500">▌</span>
      </div>
    </div>
  );
}

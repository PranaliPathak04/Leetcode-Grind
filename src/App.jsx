import { useState, useEffect } from "react";
import { roadmap, totalProblems } from "./data";
import "./index.css";

const STORAGE_KEY = "lc_grind_v1";
const difficultyOrder = { Easy: 0, Medium: 1, Hard: 2 };

function useProgress() {
  const [completed, setCompleted] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
    } catch {
      return {};
    }
  });
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(completed));
  }, [completed]);
  const toggle = (id) => setCompleted((p) => ({ ...p, [id]: !p[id] }));
  const reset = () => {
    if (window.confirm("Reset all progress?")) setCompleted({});
  };
  return { completed, toggle, reset };
}

function ProgressRing({
  value,
  max,
  size = 64,
  stroke = 5,
  color = "#f1459e",
}) {
  const r = (size - stroke * 2) / 2;
  const circ = 2 * Math.PI * r;
  const pct = max ? value / max : 0;
  return (
    <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke="#2a2a3a"
        strokeWidth={stroke}
      />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke={color}
        strokeWidth={stroke}
        strokeLinecap="round"
        strokeDasharray={circ}
        strokeDashoffset={circ * (1 - pct)}
        style={{ transition: "stroke-dashoffset 0.6s ease" }}
      />
    </svg>
  );
}

function HeroStats({ completed, total }) {
  const pct = total ? Math.round((completed / total) * 100) : 0;
  const easy = roadmap
    .flatMap((s) => s.problems)
    .filter((p) => p.difficulty === "Easy").length;
  const medium = roadmap
    .flatMap((s) => s.problems)
    .filter((p) => p.difficulty === "Medium").length;
  const hard = roadmap
    .flatMap((s) => s.problems)
    .filter((p) => p.difficulty === "Hard").length;

  return (
    <div
      style={{
        padding: "48px 0 36px",
        textAlign: "center",
        position: "relative",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          // background:
          //   "radial-gradient(ellipse 70% 60% at 50% 0%, rgba(244,114,182,0.08) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />
      <div style={{ position: "relative" }}>
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            background: "rgba(244,114,182,0.12)",
            border: "1px solid rgba(244,114,182,0.25)",
            borderRadius: 100,
            padding: "4px 14px",
            marginBottom: 20,
            fontSize: 12,
            fontFamily: "'JetBrains Mono', monospace",
            color: "#fffafd",
            letterSpacing: 2,
          }}
        >
          ◆ NEETCODE 150
        </div>
        <h1
          style={{
            fontSize: "clamp(2rem, 5vw, 3.5rem)",
            fontWeight: 800,
            // background: "linear-gradient(135deg, #e8e8f0 30%, #eb2c8f 100%)",
            background: "#e8e8f0",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            letterSpacing: "-1px",
            lineHeight: 1.1,
            marginBottom: 8,
          }}
        >
          LeetCode Grind June 2026
        </h1>
        <p style={{ color: "var(--text2)", fontSize: 15, marginBottom: 36 }}>
          10-week roadmap · {total} problems · ship it
        </p>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: 48,
            flexWrap: "wrap",
          }}
        >
          <div
            style={{
              position: "relative",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <ProgressRing value={completed} max={total} size={96} stroke={6} />
            <div style={{ position: "absolute", textAlign: "center" }}>
              <div style={{ fontSize: 22, fontWeight: 800, color: "#f93f9f" }}>
                {pct}%
              </div>
            </div>
          </div>
          <div style={{ display: "flex", gap: 32 }}>
            {[
              { label: "Done", val: completed, color: "#f63f9d" },
              { label: "Left", val: total - completed, color: "var(--text2)" },
              { label: "Total", val: total, color: "var(--text)" },
            ].map((s) => (
              <div key={s.label} style={{ textAlign: "center" }}>
                <div style={{ fontSize: 28, fontWeight: 800, color: s.color }}>
                  {s.val}
                </div>
                <div
                  style={{
                    fontSize: 12,
                    color: "var(--text3)",
                    fontFamily: "'JetBrains Mono', monospace",
                    letterSpacing: 1,
                  }}
                >
                  {s.label}
                </div>
              </div>
            ))}
          </div>
          <div style={{ display: "flex", gap: 20 }}>
            {[
              { label: "Easy", val: easy, color: "#22c55e" },
              { label: "Med", val: medium, color: "#f59e0b" },
              { label: "Hard", val: hard, color: "#ef4444" },
            ].map((s) => (
              <div
                key={s.label}
                style={{
                  background: "var(--bg3)",
                  border: "1px solid var(--border)",
                  borderRadius: 10,
                  padding: "10px 16px",
                  textAlign: "center",
                }}
              >
                <div style={{ fontSize: 18, fontWeight: 700, color: s.color }}>
                  {s.val}
                </div>
                <div
                  style={{
                    fontSize: 11,
                    color: "var(--text3)",
                    fontFamily: "'JetBrains Mono', monospace",
                    letterSpacing: 1,
                  }}
                >
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function FilterBar({ filter, setFilter, sortBy, setSortBy }) {
  return (
    <div
      style={{
        display: "flex",
        gap: 8,
        flexWrap: "wrap",
        alignItems: "center",
        padding: "16px 0",
        borderBottom: "1px solid var(--border)",
        marginBottom: 24,
      }}
    >
      <div style={{ display: "flex", gap: 4, flexWrap: "wrap", flex: 1 }}>
        {["All", "Easy", "Medium", "Hard", "Done", "Remaining"].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            style={{
              padding: "5px 14px",
              borderRadius: 100,
              fontSize: 13,
              fontWeight: 600,
              background: filter === f ? "var(--accent)" : "var(--bg3)",
              color: filter === f ? "#fff" : "var(--text2)",
              border: `1px solid ${filter === f ? "var(--accent)" : "var(--border)"}`,
              transition: "all 0.15s",
            }}
          >
            {f}
          </button>
        ))}
      </div>
      <select
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value)}
        style={{
          background: "var(--bg3)",
          color: "var(--text2)",
          border: "1px solid var(--border)",
          borderRadius: 8,
          padding: "5px 10px",
          fontSize: 13,
          fontFamily: "inherit",
        }}
      >
        <option value="roadmap">Roadmap order</option>
        <option value="difficulty">By difficulty</option>
      </select>
    </div>
  );
}

function ProblemRow({ problem, done, onToggle }) {
  const diffColor = { Easy: "#22c55e", Medium: "#f59e0b", Hard: "#ef4444" }[
    problem.difficulty
  ];
  return (
    <div
      onClick={onToggle}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 12,
        padding: "10px 14px",
        borderRadius: 10,
        background: done ? "rgba(244,114,182,0.06)" : "transparent",
        border: `1px solid ${done ? "rgba(244,114,182,0.2)" : "transparent"}`,
        cursor: "pointer",
        transition: "all 0.15s",
        opacity: done ? 0.7 : 1,
      }}
      onMouseEnter={(e) => {
        if (!done) e.currentTarget.style.background = "var(--bg3)";
      }}
      onMouseLeave={(e) => {
        if (!done) e.currentTarget.style.background = "transparent";
      }}
    >
      <div
        style={{
          width: 20,
          height: 20,
          borderRadius: 6,
          flexShrink: 0,
          background: done ? "var(--accent)" : "transparent",
          border: `2px solid ${done ? "var(--accent)" : "var(--border2)"}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "all 0.15s",
        }}
      >
        {done && (
          <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
            <path
              d="M1 4L3.5 6.5L9 1"
              stroke="white"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </div>
      <span
        style={{
          flex: 1,
          fontSize: 14,
          fontWeight: 500,
          color: done ? "var(--text3)" : "var(--text)",
          textDecoration: done ? "line-through" : "none",
        }}
      >
        {problem.name}
      </span>
      <span
        style={{
          fontSize: 11,
          fontWeight: 700,
          padding: "2px 8px",
          borderRadius: 100,
          fontFamily: "'JetBrains Mono', monospace",
          letterSpacing: 0.5,
          background: `${diffColor}18`,
          color: diffColor,
          border: `1px solid ${diffColor}30`,
        }}
      >
        {problem.difficulty}
      </span>
      <a
        href={problem.leetcodeUrl}
        target="_blank"
        rel="noopener noreferrer"
        onClick={(e) => e.stopPropagation()}
        style={{
          width: 28,
          height: 28,
          borderRadius: 7,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "var(--bg4)",
          border: "1px solid var(--border)",
          color: "var(--text3)",
          fontSize: 12,
          flexShrink: 0,
          transition: "all 0.15s",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.color = "#f59e0b";
          e.currentTarget.style.borderColor = "#f59e0b50";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.color = "var(--text3)";
          e.currentTarget.style.borderColor = "var(--border)";
        }}
      >
        ↗
      </a>
    </div>
  );
}

function SectionCard({ section, completed, toggle, filter, sortBy }) {
  const [open, setOpen] = useState(true);
  const doneCount = section.problems.filter((p) => completed[p.id]).length;
  const pct = Math.round((doneCount / section.problems.length) * 100);

  let probs = [...section.problems];
  if (filter === "Easy") probs = probs.filter((p) => p.difficulty === "Easy");
  else if (filter === "Medium")
    probs = probs.filter((p) => p.difficulty === "Medium");
  else if (filter === "Hard")
    probs = probs.filter((p) => p.difficulty === "Hard");
  else if (filter === "Done") probs = probs.filter((p) => completed[p.id]);
  else if (filter === "Remaining")
    probs = probs.filter((p) => !completed[p.id]);
  if (sortBy === "difficulty")
    probs = [...probs].sort(
      (a, b) => difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty],
    );
  if (probs.length === 0) return null;

  return (
    <div
      style={{
        background: "var(--bg2)",
        border: "1px solid var(--border)",
        borderRadius: 16,
        overflow: "hidden",
        transition: "border-color 0.2s",
      }}
      onMouseEnter={(e) =>
        (e.currentTarget.style.borderColor = "var(--border2)")
      }
      onMouseLeave={(e) =>
        (e.currentTarget.style.borderColor = "var(--border)")
      }
    >
      <div
        onClick={() => setOpen((o) => !o)}
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          padding: "18px 20px",
          cursor: "pointer",
          borderBottom: open ? "1px solid var(--border)" : "none",
        }}
      >
        <div
          style={{
            width: 10,
            height: 10,
            borderRadius: "50%",
            background: section.tagColor,
            flexShrink: 0,
          }}
        />
        <div style={{ flex: 1 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              flexWrap: "wrap",
            }}
          >
            <span style={{ fontWeight: 700, fontSize: 16 }}>
              {section.title}
            </span>
            <span
              style={{
                fontSize: 10,
                fontWeight: 700,
                padding: "2px 8px",
                borderRadius: 100,
                background: `${section.tagColor}18`,
                color: section.tagColor,
                border: `1px solid ${section.tagColor}30`,
                fontFamily: "'JetBrains Mono', monospace",
                letterSpacing: 0.5,
              }}
            >
              {section.tag}
            </span>
            <span
              style={{
                fontSize: 11,
                color: "var(--text3)",
                fontFamily: "'JetBrains Mono', monospace",
              }}
            >
              Week {section.week} · {section.days}
            </span>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            flexShrink: 0,
          }}
        >
          <div style={{ textAlign: "right" }}>
            <div
              style={{
                fontSize: 13,
                fontWeight: 700,
                color:
                  doneCount === section.problems.length
                    ? "#22c55e"
                    : "var(--text)",
              }}
            >
              {doneCount}/{section.problems.length}
            </div>
            <div
              style={{
                fontSize: 10,
                color: "var(--text3)",
                fontFamily: "'JetBrains Mono', monospace",
              }}
            >
              {pct}%
            </div>
          </div>
          <ProgressRing
            value={doneCount}
            max={section.problems.length}
            size={36}
            stroke={3}
            color={section.tagColor}
          />
          <div
            style={{
              width: 24,
              height: 24,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "var(--text3)",
              fontSize: 16,
              transition: "transform 0.2s",
              transform: open ? "rotate(180deg)" : "rotate(0deg)",
            }}
          >
            ⌄
          </div>
        </div>
      </div>
      <div style={{ height: 2, background: "var(--border)" }}>
        <div
          style={{
            height: "100%",
            background: section.tagColor,
            width: `${pct}%`,
            transition: "width 0.5s ease",
            borderRadius: 1,
          }}
        />
      </div>
      {open && (
        <div style={{ padding: "8px 12px 12px" }}>
          <div
            style={{
              margin: "8px 0 12px",
              padding: "10px 14px",
              borderRadius: 10,
              background: "rgba(244,114,182,0.05)",
              border: "1px solid rgba(244,114,182,0.1)",
              fontSize: 13,
              color: "var(--text2)",
              lineHeight: 1.5,
              display: "flex",
              gap: 8,
              alignItems: "flex-start",
            }}
          >
            <span style={{ color: "var(--accent)", flexShrink: 0 }}>💡</span>
            <span>{section.context}</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {probs.map((p) => (
              <ProblemRow
                key={p.id}
                problem={p}
                done={!!completed[p.id]}
                onToggle={() => toggle(p.id)}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default function App() {
  const { completed, toggle, reset } = useProgress();
  const [filter, setFilter] = useState("All");
  const [sortBy, setSortBy] = useState("roadmap");
  const totalDone = Object.values(completed).filter(Boolean).length;

  return (
    <div style={{ maxWidth: 860, margin: "0 auto", padding: "0 16px 80px" }}>
      <HeroStats completed={totalDone} total={totalProblems} />
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 4,
        }}
      >
        <span
          style={{
            fontSize: 13,
            color: "var(--text3)",
            fontFamily: "'JetBrains Mono', monospace",
          }}
        >
          {roadmap.length} sections
        </span>
        <button
          onClick={reset}
          style={{
            padding: "5px 14px",
            borderRadius: 8,
            fontSize: 12,
            background: "transparent",
            color: "var(--text3)",
            border: "1px solid var(--border)",
            fontFamily: "'JetBrains Mono', monospace",
            transition: "all 0.15s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = "#ef4444";
            e.currentTarget.style.borderColor = "#ef444440";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = "var(--text3)";
            e.currentTarget.style.borderColor = "var(--border)";
          }}
        >
          reset progress
        </button>
      </div>
      <FilterBar
        filter={filter}
        setFilter={setFilter}
        sortBy={sortBy}
        setSortBy={setSortBy}
      />
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {roadmap.map((section) => (
          <SectionCard
            key={section.id}
            section={section}
            completed={completed}
            toggle={toggle}
            filter={filter}
            sortBy={sortBy}
          />
        ))}
      </div>
      <div
        style={{
          textAlign: "center",
          marginTop: 48,
          color: "var(--text3)",
          fontSize: 13,
          fontFamily: "'JetBrains Mono', monospace",
        }}
      >
        progress saved locally · built for the grind 🔥
      </div>
    </div>
  );
}

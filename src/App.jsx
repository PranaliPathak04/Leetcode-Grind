import { useState, useEffect, useRef } from "react";
import { roadmap, totalProblems } from "./data";
import "./index.css";

const STORAGE_KEY = "lc_grind_v1";
const NOTES_KEY = "lc_notes_v1";
const CODE_KEY = "lc_code_v1";
const DATES_KEY = "lc_dates_v1";
const difficultyOrder = { Easy: 0, Medium: 1, Hard: 2 };

function useProgress() {
  const [completed, setCompleted] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
    } catch {
      return {};
    }
  });
  const [dates, setDates] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(DATES_KEY)) || {};
    } catch {
      return {};
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(completed));
  }, [completed]);
  useEffect(() => {
    localStorage.setItem(DATES_KEY, JSON.stringify(dates));
  }, [dates]);

  const toggle = (id) => {
    setCompleted((p) => {
      const nowDone = !p[id];
      setDates((d) => {
        const next = { ...d };
        if (nowDone) next[id] = new Date().toISOString();
        else delete next[id];
        return next;
      });
      return { ...p, [id]: nowDone };
    });
  };
  const reset = () => {
    if (window.confirm("Reset all progress?")) {
      setCompleted({});
      setDates({});
      localStorage.removeItem(DATES_KEY);
    }
  };
  return { completed, dates, toggle, reset };
}

function useNotesAndCode() {
  const [notes, setNotes] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(NOTES_KEY)) || {};
    } catch {
      return {};
    }
  });
  const [code, setCode] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(CODE_KEY)) || {};
    } catch {
      return {};
    }
  });

  const saveNote = (id, text) => {
    setNotes((prev) => {
      const next = { ...prev, [id]: text };
      localStorage.setItem(NOTES_KEY, JSON.stringify(next));
      return next;
    });
  };
  const saveCode = (id, text) => {
    setCode((prev) => {
      const next = { ...prev, [id]: text };
      localStorage.setItem(CODE_KEY, JSON.stringify(next));
      return next;
    });
  };

  return { notes, code, saveNote, saveCode };
}

/* ── Modal ── */
function Modal({ problem, mode, onClose, initialValue, onSave }) {
  const [value, setValue] = useState(initialValue || "");
  const textareaRef = useRef(null);

  useEffect(() => {
    textareaRef.current?.focus();
  }, []);

  useEffect(() => {
    const handler = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  const isCode = mode === "code";
  const title = isCode ? "Code" : "Notes";
  const placeholder = isCode
    ? "# Paste or type your solution here...\ndef twoSum(nums, target):\n    seen = {}\n    for i, n in enumerate(nums):\n        if target - n in seen:\n            return [seen[target - n], i]\n        seen[n] = i"
    : "Write your approach, observations, or key insights here...\n\nExample:\n• Brute force: O(n²) — nested loops\n• Optimized: use a hash map for O(n)\n• Edge cases: empty array, duplicates";

  return (
    <div
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.65)",
        zIndex: 1000,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px 16px",
      }}
    >
      <div
        style={{
          background: "#16161e",
          border: "1px solid rgba(255,255,255,0.1)",
          borderRadius: 16,
          width: "100%",
          maxWidth: 680,
          display: "flex",
          flexDirection: "column",
          maxHeight: "85vh",
          overflow: "hidden",
          boxShadow: "0 24px 64px rgba(0,0,0,0.6)",
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: "16px 20px",
            borderBottom: "1px solid rgba(255,255,255,0.08)",
            display: "flex",
            alignItems: "center",
            gap: 12,
            flexShrink: 0,
          }}
        >
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: 8,
              background: isCode
                ? "rgba(59,130,246,0.15)"
                : "rgba(244,114,182,0.15)",
              border: `1px solid ${isCode ? "rgba(59,130,246,0.3)" : "rgba(244,114,182,0.3)"}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 15,
              flexShrink: 0,
            }}
          >
            {isCode ? "⌨" : "📝"}
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div
              style={{
                fontSize: 13,
                color: "rgba(255,255,255,0.4)",
                fontFamily: "'JetBrains Mono', monospace",
                marginBottom: 2,
              }}
            >
              {title}
            </div>
            <div
              style={{
                fontSize: 15,
                fontWeight: 700,
                color: "#e8e8f0",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {problem.name}
            </div>
          </div>
          <button
            onClick={onClose}
            style={{
              width: 30,
              height: 30,
              borderRadius: 8,
              background: "transparent",
              border: "1px solid rgba(255,255,255,0.1)",
              color: "rgba(255,255,255,0.4)",
              fontSize: 18,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
              lineHeight: 1,
            }}
          >
            ×
          </button>
        </div>

        {/* Textarea */}
        <div
          style={{
            flex: 1,
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <textarea
            ref={textareaRef}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder={placeholder}
            style={{
              flex: 1,
              width: "100%",
              background: "transparent",
              border: "none",
              outline: "none",
              resize: "none",
              padding: "16px 20px",
              fontSize: isCode ? 13 : 14,
              fontFamily: isCode ? "'JetBrains Mono', monospace" : "inherit",
              color: "#e8e8f0",
              lineHeight: isCode ? 1.7 : 1.6,
              minHeight: 280,
              boxSizing: "border-box",
              tabSize: 2,
            }}
            onKeyDown={(e) => {
              if (isCode && e.key === "Tab") {
                e.preventDefault();
                const start = e.target.selectionStart;
                const end = e.target.selectionEnd;
                const newVal =
                  value.substring(0, start) + "  " + value.substring(end);
                setValue(newVal);
                setTimeout(() => {
                  e.target.selectionStart = e.target.selectionEnd = start + 2;
                }, 0);
              }
            }}
          />
        </div>

        {/* Footer */}
        <div
          style={{
            padding: "12px 20px",
            borderTop: "1px solid rgba(255,255,255,0.08)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexShrink: 0,
          }}
        >
          <span
            style={{
              fontSize: 12,
              color: "rgba(255,255,255,0.25)",
              fontFamily: "'JetBrains Mono', monospace",
            }}
          >
            {value.length} chars{isCode ? " · Tab = 2 spaces" : ""}
          </span>
          <div style={{ display: "flex", gap: 8 }}>
            <button
              onClick={onClose}
              style={{
                padding: "7px 16px",
                borderRadius: 8,
                fontSize: 13,
                fontWeight: 600,
                background: "transparent",
                color: "rgba(255,255,255,0.4)",
                border: "1px solid rgba(255,255,255,0.1)",
                cursor: "pointer",
              }}
            >
              Cancel
            </button>
            <button
              onClick={() => {
                onSave(value);
                onClose();
              }}
              style={{
                padding: "7px 20px",
                borderRadius: 8,
                fontSize: 13,
                fontWeight: 700,
                background: isCode ? "#2563eb" : "#f1459e",
                color: "#fff",
                border: "none",
                cursor: "pointer",
              }}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Small indicator dot shown when a problem has content saved ── */
function SavedDot({ color }) {
  return (
    <div
      style={{
        width: 6,
        height: 6,
        borderRadius: "50%",
        background: color,
        position: "absolute",
        top: 3,
        right: 3,
        pointerEvents: "none",
      }}
    />
  );
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

function ProblemRow({
  problem,
  done,
  completedAt,
  onToggle,
  hasNote,
  hasCode,
  onOpenNote,
  onOpenCode,
}) {
  const diffColor = { Easy: "#22c55e", Medium: "#f59e0b", Hard: "#ef4444" }[
    problem.difficulty
  ];

  const iconBtn = (label, color, hasSaved, onClick, children) => (
    <div style={{ position: "relative", flexShrink: 0 }}>
      <button
        title={label}
        onClick={(e) => {
          e.stopPropagation();
          onClick();
        }}
        style={{
          width: 28,
          height: 28,
          borderRadius: 7,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: hasSaved ? `${color}18` : "var(--bg4)",
          border: `1px solid ${hasSaved ? `${color}50` : "var(--border)"}`,
          color: hasSaved ? color : "var(--text3)",
          fontSize: 13,
          cursor: "pointer",
          transition: "all 0.15s",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = `${color}18`;
          e.currentTarget.style.borderColor = `${color}50`;
          e.currentTarget.style.color = color;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = hasSaved
            ? `${color}18`
            : "var(--bg4)";
          e.currentTarget.style.borderColor = hasSaved
            ? `${color}50`
            : "var(--border)";
          e.currentTarget.style.color = hasSaved ? color : "var(--text3)";
        }}
      >
        {children}
      </button>
      {hasSaved && <SavedDot color={color} />}
    </div>
  );

  return (
    <div
      onClick={onToggle}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 10,
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

      {done && completedAt && (
        <span
          title={new Date(completedAt).toLocaleString()}
          style={{
            fontSize: 12,
            color: "#67e8f9",
            fontFamily: "'JetBrains Mono', monospace",
            whiteSpace: "nowrap",
            flexShrink: 0,
          }}
        >
          ✓{" "}
          {new Date(completedAt).toLocaleDateString("en-GB", {
            day: "numeric",
            month: "short",
          })}
        </span>
      )}

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

      {/* Notes button */}
      {iconBtn(
        "Notes",
        "#f1459e",
        hasNote,
        onOpenNote,
        <svg
          width="13"
          height="13"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14,2 14,8 20,8" />
          <line x1="16" y1="13" x2="8" y2="13" />
          <line x1="16" y1="17" x2="8" y2="17" />
        </svg>,
      )}

      {/* Code button */}
      {iconBtn(
        "Code",
        "#3b82f6",
        hasCode,
        onOpenCode,
        <svg
          width="13"
          height="13"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="16,18 22,12 16,6" />
          <polyline points="8,6 2,12 8,18" />
        </svg>,
      )}

      {/* LeetCode link */}
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

function SectionCard({
  section,
  completed,
  dates,
  toggle,
  filter,
  sortBy,
  notes,
  code,
  onOpenNote,
  onOpenCode,
}) {
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
                completedAt={dates[p.id]}
                onToggle={() => toggle(p.id)}
                hasNote={!!notes[p.id]}
                hasCode={!!code[p.id]}
                onOpenNote={() => onOpenNote(p)}
                onOpenCode={() => onOpenCode(p)}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default function App() {
  const { completed, dates, toggle, reset } = useProgress();
  const { notes, code, saveNote, saveCode } = useNotesAndCode();
  const [filter, setFilter] = useState("All");
  const [sortBy, setSortBy] = useState("roadmap");
  const [modal, setModal] = useState(null); // { problem, mode: "note"|"code" }
  const totalDone = Object.values(completed).filter(Boolean).length;

  const openNote = (problem) => setModal({ problem, mode: "note" });
  const openCode = (problem) => setModal({ problem, mode: "code" });
  const closeModal = () => setModal(null);

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
            dates={dates}
            toggle={toggle}
            filter={filter}
            sortBy={sortBy}
            notes={notes}
            code={code}
            onOpenNote={openNote}
            onOpenCode={openCode}
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

      {modal && (
        <Modal
          problem={modal.problem}
          mode={modal.mode}
          onClose={closeModal}
          initialValue={
            modal.mode === "note"
              ? notes[modal.problem.id]
              : code[modal.problem.id]
          }
          onSave={(val) =>
            modal.mode === "note"
              ? saveNote(modal.problem.id, val)
              : saveCode(modal.problem.id, val)
          }
        />
      )}
    </div>
  );
}

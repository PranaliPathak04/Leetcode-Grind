import { useState, useEffect, useRef } from "react";
import { roadmap, totalProblems, companies } from "./data";
import { csSubjects, totalCsQuestions } from "./csData";
import { patternCategories, totalPatternProblems } from "./patternsData";
import "./index.css";

const STORAGE_KEY = "lc_grind_v1";
const NOTES_KEY = "lc_notes_v1";
const CODE_KEY = "lc_code_v1";
const DATES_KEY = "lc_dates_v1";
const COMPANY_KEY = "lc_company_v1";
const CS_KEY = "lc_cs_v1";
const PATTERN_KEY = "lc_pattern_v1";
const difficultyOrder = { Easy: 0, Medium: 1, Hard: 2 };

/* ── hooks ── */
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
  const toggle = (id) =>
    setCompleted((p) => {
      const nowDone = !p[id];
      setDates((d) => {
        const n = { ...d };
        if (nowDone) n[id] = new Date().toISOString();
        else delete n[id];
        return n;
      });
      return { ...p, [id]: nowDone };
    });
  const reset = () => {
    if (window.confirm("Reset all progress?")) {
      setCompleted({});
      setDates({});
    }
  };
  return { completed, dates, toggle, reset };
}

function useSimpleProgress(key) {
  const [completed, setCompleted] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(key)) || {};
    } catch {
      return {};
    }
  });
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(completed));
  }, [completed, key]);
  const toggle = (id) => setCompleted((p) => ({ ...p, [id]: !p[id] }));
  const reset = () => setCompleted({});
  return { completed, toggle, reset };
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
  const saveNote = (id, v) =>
    setNotes((p) => {
      const n = { ...p, [id]: v };
      localStorage.setItem(NOTES_KEY, JSON.stringify(n));
      return n;
    });
  const saveCode = (id, v) =>
    setCode((p) => {
      const n = { ...p, [id]: v };
      localStorage.setItem(CODE_KEY, JSON.stringify(n));
      return n;
    });
  return { notes, code, saveNote, saveCode };
}

/* ── helpers ── */
function daysUntil(dateStr) {
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  const target = new Date(dateStr);
  target.setHours(0, 0, 0, 0);
  return Math.ceil((target - now) / 86400000);
}

function ProgressRing({
  value,
  max,
  size = 64,
  stroke = 5,
  color = "#f472b6",
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

/* ── Modal ── */
function Modal({ problem, mode, onClose, initialValue, onSave }) {
  const [value, setValue] = useState(initialValue || "");
  const ref = useRef(null);
  useEffect(() => {
    ref.current?.focus();
  }, []);
  useEffect(() => {
    const h = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [onClose]);
  const isCode = mode === "code";
  return (
    <div
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.7)",
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
            }}
          >
            {isCode ? "⌨" : "📝"}
          </div>
          <div style={{ flex: 1 }}>
            <div
              style={{
                fontSize: 11,
                color: "rgba(255,255,255,0.35)",
                fontFamily: "'JetBrains Mono',monospace",
                marginBottom: 2,
              }}
            >
              {isCode ? "Code" : "Notes"}
            </div>
            <div style={{ fontSize: 15, fontWeight: 700, color: "#e8e8f0" }}>
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
            }}
          >
            ×
          </button>
        </div>
        <textarea
          ref={ref}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={
            isCode
              ? "# Write your solution here..."
              : "Write your approach, observations, key insights..."
          }
          style={{
            flex: 1,
            width: "100%",
            background: "transparent",
            border: "none",
            outline: "none",
            resize: "none",
            padding: "16px 20px",
            fontSize: isCode ? 13 : 14,
            fontFamily: isCode ? "'JetBrains Mono',monospace" : "inherit",
            color: "#e8e8f0",
            lineHeight: 1.7,
            minHeight: 280,
          }}
          onKeyDown={(e) => {
            if (isCode && e.key === "Tab") {
              e.preventDefault();
              const s = e.target.selectionStart,
                en = e.target.selectionEnd;
              setValue(value.substring(0, s) + "  " + value.substring(en));
              setTimeout(() => {
                e.target.selectionStart = e.target.selectionEnd = s + 2;
              }, 0);
            }
          }}
        />
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
              fontFamily: "'JetBrains Mono',monospace",
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

/* ── Icon button ── */
function IconBtn({ title, color, active, onClick, children }) {
  const [hov, setHov] = useState(false);
  return (
    <div style={{ position: "relative", flexShrink: 0 }}>
      <button
        title={title}
        onClick={(e) => {
          e.stopPropagation();
          onClick();
        }}
        onMouseEnter={() => setHov(true)}
        onMouseLeave={() => setHov(false)}
        style={{
          width: 28,
          height: 28,
          borderRadius: 7,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: active || hov ? `${color}18` : "var(--bg4)",
          border: `1px solid ${active || hov ? `${color}50` : "var(--border)"}`,
          color: active || hov ? color : "var(--text3)",
          fontSize: 13,
          cursor: "pointer",
          transition: "all 0.15s",
        }}
      >
        {children}
      </button>
      {active && (
        <div
          style={{
            width: 6,
            height: 6,
            borderRadius: "50%",
            background: color,
            position: "absolute",
            top: 2,
            right: 2,
            pointerEvents: "none",
          }}
        />
      )}
    </div>
  );
}

/* ── Problem row (leetcode-style, shared) ── */
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
        opacity: done ? 0.72 : 1,
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
          style={{
            fontSize: 11,
            color: "#67e8f9",
            fontFamily: "'JetBrains Mono',monospace",
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
          fontFamily: "'JetBrains Mono',monospace",
          letterSpacing: 0.5,
          background: `${diffColor}18`,
          color: diffColor,
          border: `1px solid ${diffColor}30`,
        }}
      >
        {problem.difficulty}
      </span>
      <IconBtn
        title="Notes"
        color="#f1459e"
        active={hasNote}
        onClick={onOpenNote}
      >
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
        </svg>
      </IconBtn>
      <IconBtn
        title="Code"
        color="#3b82f6"
        active={hasCode}
        onClick={onOpenCode}
      >
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
        </svg>
      </IconBtn>
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

/* ── Question row (CS fundamentals — simpler, no leetcode link) ── */
function QuestionRow({ question, done, onToggle }) {
  return (
    <div
      onClick={onToggle}
      style={{
        display: "flex",
        alignItems: "flex-start",
        gap: 10,
        padding: "10px 14px",
        borderRadius: 10,
        background: done ? "rgba(244,114,182,0.06)" : "transparent",
        border: `1px solid ${done ? "rgba(244,114,182,0.2)" : "transparent"}`,
        cursor: "pointer",
        transition: "all 0.15s",
        opacity: done ? 0.65 : 1,
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
          marginTop: 1,
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
          lineHeight: 1.5,
        }}
      >
        {question.text}
      </span>
    </div>
  );
}

/* ── Main roadmap section card ── */
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
                fontFamily: "'JetBrains Mono',monospace",
                letterSpacing: 0.5,
              }}
            >
              {section.tag}
            </span>
            <span
              style={{
                fontSize: 11,
                color: "var(--text3)",
                fontFamily: "'JetBrains Mono',monospace",
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
                fontFamily: "'JetBrains Mono',monospace",
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

/* ── Company day card ── */
function CompanyDayCard({
  day,
  company,
  completed,
  toggle,
  notes,
  code,
  onOpenNote,
  onOpenCode,
}) {
  const [open, setOpen] = useState(true);
  const doneCount = day.problems.filter((p) => completed[p.id]).length;
  const pct = Math.round((doneCount / day.problems.length) * 100);
  return (
    <div
      style={{
        background: "var(--bg2)",
        border: `1px solid ${company.color}25`,
        borderRadius: 16,
        overflow: "hidden",
        transition: "border-color 0.2s",
      }}
      onMouseEnter={(e) =>
        (e.currentTarget.style.borderColor = `${company.color}50`)
      }
      onMouseLeave={(e) =>
        (e.currentTarget.style.borderColor = `${company.color}25`)
      }
    >
      <div
        onClick={() => setOpen((o) => !o)}
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          padding: "16px 20px",
          cursor: "pointer",
          borderBottom: open ? "1px solid var(--border)" : "none",
        }}
      >
        <div
          style={{
            width: 32,
            height: 32,
            borderRadius: 8,
            background: `${company.color}15`,
            border: `1px solid ${company.color}30`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 14,
            fontWeight: 800,
            color: company.color,
            flexShrink: 0,
            fontFamily: "'JetBrains Mono',monospace",
          }}
        >
          {day.label.replace("Day ", "")}
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontWeight: 700, fontSize: 15 }}>{day.label}</div>
          <div
            style={{
              fontSize: 12,
              color: "var(--text3)",
              fontFamily: "'JetBrains Mono',monospace",
            }}
          >
            {day.theme}
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
                  doneCount === day.problems.length ? "#22c55e" : "var(--text)",
              }}
            >
              {doneCount}/{day.problems.length}
            </div>
            <div
              style={{
                fontSize: 10,
                color: "var(--text3)",
                fontFamily: "'JetBrains Mono',monospace",
              }}
            >
              {pct}%
            </div>
          </div>
          <ProgressRing
            value={doneCount}
            max={day.problems.length}
            size={36}
            stroke={3}
            color={company.color}
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
            background: company.color,
            width: `${pct}%`,
            transition: "width 0.5s ease",
          }}
        />
      </div>
      {open && (
        <div style={{ padding: "8px 12px 12px" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {day.problems.map((p) => (
              <ProblemRow
                key={p.id}
                problem={p}
                done={!!completed[p.id]}
                completedAt={null}
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

/* ── Company page ── */
function CompanyPage({
  company,
  completed,
  toggle,
  notes,
  code,
  onOpenNote,
  onOpenCode,
}) {
  const allProblems = company.days.flatMap((d) => d.problems);
  const totalDone = allProblems.filter((p) => completed[p.id]).length;
  const pct = Math.round((totalDone / allProblems.length) * 100);
  const daysLeft = daysUntil(company.examDate);
  const urgency =
    daysLeft <= 1 ? "#ef4444" : daysLeft <= 3 ? "#f59e0b" : company.color;

  return (
    <div>
      <div
        style={{
          background: `linear-gradient(135deg, ${company.color}12 0%, transparent 60%)`,
          border: `1px solid ${company.color}30`,
          borderRadius: 20,
          padding: "28px 28px 24px",
          marginBottom: 24,
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: -30,
            right: -20,
            fontSize: 120,
            opacity: 0.04,
            userSelect: "none",
          }}
        >
          {company.logo}
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            gap: 16,
            flexWrap: "wrap",
          }}
        >
          <div
            style={{
              width: 52,
              height: 52,
              borderRadius: 14,
              background: `${company.color}18`,
              border: `2px solid ${company.color}40`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 26,
              flexShrink: 0,
            }}
          >
            {company.logo}
          </div>
          <div style={{ flex: 1 }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                flexWrap: "wrap",
                marginBottom: 4,
              }}
            >
              <h2
                style={{ fontSize: 24, fontWeight: 800, color: "var(--text)" }}
              >
                {company.name} Assessment
              </h2>
              <span
                style={{
                  fontSize: 11,
                  padding: "3px 10px",
                  borderRadius: 100,
                  background: `${urgency}18`,
                  color: urgency,
                  border: `1px solid ${urgency}30`,
                  fontFamily: "'JetBrains Mono',monospace",
                  fontWeight: 700,
                }}
              >
                {daysLeft === 0
                  ? "TODAY 🔥"
                  : daysLeft === 1
                    ? "TOMORROW ⚡"
                    : daysLeft < 0
                      ? "PAST"
                      : `${daysLeft} days left`}
              </span>
            </div>
            <div
              style={{
                fontSize: 13,
                color: "var(--text3)",
                fontFamily: "'JetBrains Mono',monospace",
              }}
            >
              Exam:{" "}
              {new Date(company.examDate).toLocaleDateString("en-IN", {
                weekday: "short",
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </div>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              flexShrink: 0,
            }}
          >
            <div style={{ textAlign: "right" }}>
              <div
                style={{ fontSize: 26, fontWeight: 800, color: company.color }}
              >
                {pct}%
              </div>
              <div
                style={{
                  fontSize: 12,
                  color: "var(--text3)",
                  fontFamily: "'JetBrains Mono',monospace",
                }}
              >
                {totalDone}/{allProblems.length} done
              </div>
            </div>
            <ProgressRing
              value={totalDone}
              max={allProblems.length}
              size={56}
              stroke={5}
              color={company.color}
            />
          </div>
        </div>
        <div
          style={{
            marginTop: 20,
            height: 4,
            background: "var(--border)",
            borderRadius: 2,
          }}
        >
          <div
            style={{
              height: "100%",
              background: company.color,
              width: `${pct}%`,
              borderRadius: 2,
              transition: "width 0.5s ease",
            }}
          />
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {company.days.map((day) => (
          <CompanyDayCard
            key={day.id}
            day={day}
            company={company}
            completed={completed}
            toggle={toggle}
            notes={notes}
            code={code}
            onOpenNote={onOpenNote}
            onOpenCode={onOpenCode}
          />
        ))}
      </div>
    </div>
  );
}

/* ── CS Fundamentals: section card ── */
function CsSectionCard({ section, color, completed, toggle }) {
  const [open, setOpen] = useState(true);
  const doneCount = section.questions.filter((q) => completed[q.id]).length;
  const pct = Math.round((doneCount / section.questions.length) * 100);
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
          padding: "16px 20px",
          cursor: "pointer",
          borderBottom: open ? "1px solid var(--border)" : "none",
        }}
      >
        <div
          style={{
            width: 10,
            height: 10,
            borderRadius: "50%",
            background: color,
            flexShrink: 0,
          }}
        />
        <div style={{ flex: 1, fontWeight: 700, fontSize: 15 }}>
          {section.title}
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
                  doneCount === section.questions.length
                    ? "#22c55e"
                    : "var(--text)",
              }}
            >
              {doneCount}/{section.questions.length}
            </div>
            <div
              style={{
                fontSize: 10,
                color: "var(--text3)",
                fontFamily: "'JetBrains Mono',monospace",
              }}
            >
              {pct}%
            </div>
          </div>
          <ProgressRing
            value={doneCount}
            max={section.questions.length}
            size={32}
            stroke={3}
            color={color}
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
            background: color,
            width: `${pct}%`,
            transition: "width 0.5s ease",
          }}
        />
      </div>
      {open && (
        <div style={{ padding: "8px 12px 12px" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {section.questions.map((q) => (
              <QuestionRow
                key={q.id}
                question={q}
                done={!!completed[q.id]}
                onToggle={() => toggle(q.id)}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

/* ── CS Fundamentals page ── */
function CsPage({ subjects, completed, toggle }) {
  const [activeSubject, setActiveSubject] = useState(subjects[0].id);
  const subject = subjects.find((s) => s.id === activeSubject);
  const allQ = subject.sections.flatMap((s) => s.questions);
  const doneCount = allQ.filter((q) => completed[q.id]).length;
  const pct = Math.round((doneCount / allQ.length) * 100);

  return (
    <div>
      {/* Subject pills */}
      <div
        style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 20 }}
      >
        {subjects.map((s) => {
          const sQ = s.sections.flatMap((sec) => sec.questions);
          const sDone = sQ.filter((q) => completed[q.id]).length;
          const isActive = activeSubject === s.id;
          return (
            <button
              key={s.id}
              onClick={() => setActiveSubject(s.id)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                padding: "8px 16px",
                borderRadius: 100,
                background: isActive ? `${s.color}18` : "var(--bg3)",
                border: `1px solid ${isActive ? `${s.color}50` : "var(--border)"}`,
                color: isActive ? s.color : "var(--text2)",
                fontSize: 13,
                fontWeight: 600,
                transition: "all 0.15s",
              }}
            >
              <span>{s.icon}</span>
              <span>{s.name}</span>
              <span
                style={{
                  fontSize: 11,
                  opacity: 0.7,
                  fontFamily: "'JetBrains Mono',monospace",
                }}
              >
                {sDone}/{sQ.length}
              </span>
            </button>
          );
        })}
      </div>

      {/* Subject hero */}
      <div
        style={{
          background: `linear-gradient(135deg, ${subject.color}12 0%, transparent 60%)`,
          border: `1px solid ${subject.color}30`,
          borderRadius: 20,
          padding: "24px 28px",
          marginBottom: 24,
          display: "flex",
          alignItems: "center",
          gap: 16,
          flexWrap: "wrap",
        }}
      >
        <div
          style={{
            width: 48,
            height: 48,
            borderRadius: 12,
            background: `${subject.color}18`,
            border: `2px solid ${subject.color}40`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 22,
            flexShrink: 0,
          }}
        >
          {subject.icon}
        </div>
        <div style={{ flex: 1 }}>
          <h2 style={{ fontSize: 20, fontWeight: 800, color: "var(--text)" }}>
            {subject.name}
          </h2>
          <a
            href={subject.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontSize: 12,
              color: "var(--text3)",
              fontFamily: "'JetBrains Mono',monospace",
            }}
          >
            source: GeeksforGeeks ↗
          </a>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ textAlign: "right" }}>
            <div
              style={{ fontSize: 22, fontWeight: 800, color: subject.color }}
            >
              {pct}%
            </div>
            <div
              style={{
                fontSize: 11,
                color: "var(--text3)",
                fontFamily: "'JetBrains Mono',monospace",
              }}
            >
              {doneCount}/{allQ.length}
            </div>
          </div>
          <ProgressRing
            value={doneCount}
            max={allQ.length}
            size={48}
            stroke={4}
            color={subject.color}
          />
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {subject.sections.map((sec) => (
          <CsSectionCard
            key={sec.id}
            section={sec}
            color={subject.color}
            completed={completed}
            toggle={toggle}
          />
        ))}
      </div>
    </div>
  );
}

/* ── Pattern sheet: section card (reuses ProblemRow) ── */
function PatternSectionCard({
  section,
  color,
  completed,
  dates,
  toggle,
  notes,
  code,
  onOpenNote,
  onOpenCode,
}) {
  const [open, setOpen] = useState(true);
  const doneCount = section.problems.filter((p) => completed[p.id]).length;
  const pct = Math.round((doneCount / section.problems.length) * 100);
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
          padding: "16px 20px",
          cursor: "pointer",
          borderBottom: open ? "1px solid var(--border)" : "none",
        }}
      >
        <div
          style={{
            width: 10,
            height: 10,
            borderRadius: "50%",
            background: color,
            flexShrink: 0,
          }}
        />
        <div style={{ flex: 1, fontWeight: 700, fontSize: 15 }}>
          {section.title}
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
                fontFamily: "'JetBrains Mono',monospace",
              }}
            >
              {pct}%
            </div>
          </div>
          <ProgressRing
            value={doneCount}
            max={section.problems.length}
            size={32}
            stroke={3}
            color={color}
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
            background: color,
            width: `${pct}%`,
            transition: "width 0.5s ease",
          }}
        />
      </div>
      {open && (
        <div style={{ padding: "8px 12px 12px" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {section.problems.map((p) => (
              <ProblemRow
                key={p.id}
                problem={p}
                done={!!completed[p.id]}
                completedAt={dates?.[p.id]}
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

/* ── Pattern sheet page ── */
function PatternPage({
  categories,
  completed,
  toggle,
  notes,
  code,
  onOpenNote,
  onOpenCode,
}) {
  const [activeCat, setActiveCat] = useState(categories[0].id);
  const category = categories.find((c) => c.id === activeCat);
  const allP = category.sections.flatMap((s) => s.problems);
  const doneCount = allP.filter((p) => completed[p.id]).length;
  const pct = Math.round((doneCount / allP.length) * 100);

  return (
    <div>
      {/* Category pills */}
      <div
        style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 20 }}
      >
        {categories.map((c) => {
          const cP = c.sections.flatMap((sec) => sec.problems);
          const cDone = cP.filter((p) => completed[p.id]).length;
          const isActive = activeCat === c.id;
          return (
            <button
              key={c.id}
              onClick={() => setActiveCat(c.id)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                padding: "8px 16px",
                borderRadius: 100,
                background: isActive ? `${c.color}18` : "var(--bg3)",
                border: `1px solid ${isActive ? `${c.color}50` : "var(--border)"}`,
                color: isActive ? c.color : "var(--text2)",
                fontSize: 13,
                fontWeight: 600,
                transition: "all 0.15s",
              }}
            >
              <span>{c.icon}</span>
              <span>{c.name}</span>
              <span
                style={{
                  fontSize: 11,
                  opacity: 0.7,
                  fontFamily: "'JetBrains Mono',monospace",
                }}
              >
                {cDone}/{cP.length}
              </span>
            </button>
          );
        })}
      </div>

      {/* Category hero */}
      <div
        style={{
          background: `linear-gradient(135deg, ${category.color}12 0%, transparent 60%)`,
          border: `1px solid ${category.color}30`,
          borderRadius: 20,
          padding: "24px 28px",
          marginBottom: 24,
          display: "flex",
          alignItems: "center",
          gap: 16,
          flexWrap: "wrap",
        }}
      >
        <div
          style={{
            width: 48,
            height: 48,
            borderRadius: 12,
            background: `${category.color}18`,
            border: `2px solid ${category.color}40`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 22,
            flexShrink: 0,
          }}
        >
          {category.icon}
        </div>
        <div style={{ flex: 1 }}>
          <h2 style={{ fontSize: 20, fontWeight: 800, color: "var(--text)" }}>
            {category.name}
          </h2>
          <div
            style={{
              fontSize: 12,
              color: "var(--text3)",
              fontFamily: "'JetBrains Mono',monospace",
            }}
          >
            {category.sections.length} sections
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ textAlign: "right" }}>
            <div
              style={{ fontSize: 22, fontWeight: 800, color: category.color }}
            >
              {pct}%
            </div>
            <div
              style={{
                fontSize: 11,
                color: "var(--text3)",
                fontFamily: "'JetBrains Mono',monospace",
              }}
            >
              {doneCount}/{allP.length}
            </div>
          </div>
          <ProgressRing
            value={doneCount}
            max={allP.length}
            size={48}
            stroke={4}
            color={category.color}
          />
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {category.sections.map((sec) => (
          <PatternSectionCard
            key={sec.id}
            section={sec}
            color={category.color}
            completed={completed}
            toggle={toggle}
            notes={notes}
            code={code}
            onOpenNote={onOpenNote}
            onOpenCode={onOpenCode}
          />
        ))}
      </div>
    </div>
  );
}

/* ── Hero stats (roadmap tab) ── */
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

          pointerEvents: "none",
        }}
      />
      <div style={{ position: "relative" }}>
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,

            border: "1px solid rgba(244,114,182,0.25)",
            borderRadius: 100,
            padding: "4px 14px",
            marginBottom: 20,
            fontSize: 12,

            color: "#f9a8d4",
            letterSpacing: 2,
          }}
        >
          ◆ NEETCODE 150
        </div>
        <h1
          style={{
            fontSize: "clamp(2rem,5vw,3.5rem)",
            fontWeight: 800,
            background: " #e8e8f0 ",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            letterSpacing: "-1px",
            lineHeight: 1.1,
            marginBottom: 8,
          }}
        >
          LeetCode Grind
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
            <div style={{ position: "absolute" }}>
              <div style={{ fontSize: 22, fontWeight: 800, color: "#f472b6" }}>
                {pct}%
              </div>
            </div>
          </div>
          <div style={{ display: "flex", gap: 32 }}>
            {[
              { label: "Done", val: completed, color: "#f472b6" },
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
                    fontFamily: "'JetBrains Mono',monospace",
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
                    fontFamily: "'JetBrains Mono',monospace",
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

/* ── Tab bar ── */
function TabBar({ activeTab, setActiveTab }) {
  const tabs = [
    { id: "roadmap", label: "Roadmap", icon: "🗺️" },
    { id: "patterns", label: "Patterns", icon: "🧠" },
    { id: "cs", label: "CS Fundamentals", icon: "📚" },
    ...companies.map((c) => ({
      id: `company-${c.id}`,
      label: c.name,
      icon: c.logo,
      color: c.color,
      examDate: c.examDate,
    })),
  ];
  return (
    <div
      style={{
        display: "flex",
        gap: 4,
        marginBottom: 32,
        borderBottom: "1px solid var(--border)",
        flexWrap: "wrap",
      }}
    >
      {tabs.map((t) => {
        const isActive = activeTab === t.id;
        const daysLeft = t.examDate ? daysUntil(t.examDate) : null;
        const urgent = daysLeft !== null && daysLeft <= 3;
        return (
          <button
            key={t.id}
            onClick={() => setActiveTab(t.id)}
            style={{
              padding: "10px 18px",
              borderRadius: "10px 10px 0 0",
              fontSize: 14,
              fontWeight: isActive ? 700 : 500,
              background: isActive ? "var(--bg2)" : "transparent",
              color: isActive ? t.color || "var(--accent)" : "var(--text3)",
              border: isActive
                ? `1px solid var(--border)`
                : "1px solid transparent",
              borderBottom: isActive
                ? "1px solid var(--bg2)"
                : "1px solid transparent",
              marginBottom: isActive ? "-1px" : 0,
              display: "flex",
              alignItems: "center",
              gap: 7,
              transition: "all 0.15s",
              position: "relative",
            }}
          >
            <span>{t.icon}</span>
            <span>{t.label}</span>
            {urgent && daysLeft >= 0 && (
              <span
                style={{
                  fontSize: 10,
                  padding: "1px 6px",
                  borderRadius: 100,
                  background: "rgba(239,68,68,0.15)",
                  color: "#ef4444",
                  fontFamily: "'JetBrains Mono',monospace",
                  fontWeight: 700,
                }}
              >
                {daysLeft === 0 ? "TODAY" : `${daysLeft}d`}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}

/* ── Root ── */
export default function App() {
  const { completed, dates, toggle, reset } = useProgress();
  const { completed: compCompleted, toggle: compToggle } =
    useSimpleProgress(COMPANY_KEY);
  const { completed: csCompleted, toggle: csToggle } =
    useSimpleProgress(CS_KEY);
  const { completed: patternCompleted, toggle: patternToggle } =
    useSimpleProgress(PATTERN_KEY);
  const { notes, code, saveNote, saveCode } = useNotesAndCode();
  const [activeTab, setActiveTab] = useState("roadmap");
  const [filter, setFilter] = useState("All");
  const [sortBy, setSortBy] = useState("roadmap");
  const [modal, setModal] = useState(null);

  const totalDone = Object.values(completed).filter(Boolean).length;
  const openNote = (p) => setModal({ problem: p, mode: "note" });
  const openCode = (p) => setModal({ problem: p, mode: "code" });
  const closeModal = () => setModal(null);

  const isCompanyTab = activeTab.startsWith("company-");
  const isCsTab = activeTab === "cs";
  const isPatternTab = activeTab === "patterns";
  const activeCompany = isCompanyTab
    ? companies.find((c) => `company-${c.id}` === activeTab)
    : null;

  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: "0 16px 80px" }}>
      {activeTab === "roadmap" && (
        <HeroStats completed={totalDone} total={totalProblems} />
      )}

      {isCompanyTab && (
        <div style={{ padding: "32px 0 24px", textAlign: "center" }}>
          <h1
            style={{
              fontSize: "clamp(1.6rem,4vw,2.8rem)",
              fontWeight: 800,
              color: "var(--text)",
              letterSpacing: "-0.5px",
              marginBottom: 4,
            }}
          >
            Company Prep
          </h1>
          <p style={{ color: "var(--text2)", fontSize: 14 }}>
            Targeted problem sets for upcoming assessments
          </p>
        </div>
      )}

      {isCsTab && (
        <div style={{ padding: "32px 0 24px", textAlign: "center" }}>
          <h1
            style={{
              fontSize: "clamp(1.6rem,4vw,2.8rem)",
              fontWeight: 800,
              color: "var(--text)",
              letterSpacing: "-0.5px",
              marginBottom: 4,
            }}
          >
            CS Fundamentals
          </h1>
          <p style={{ color: "var(--text2)", fontSize: 14 }}>
            OOPs · OS · DBMS · CN — {totalCsQuestions} interview questions
          </p>
        </div>
      )}

      {isPatternTab && (
        <div style={{ padding: "32px 0 24px", textAlign: "center" }}>
          <h1
            style={{
              fontSize: "clamp(1.6rem,4vw,2.8rem)",
              fontWeight: 800,
              color: "var(--text)",
              letterSpacing: "-0.5px",
              marginBottom: 4,
            }}
          >
            Pattern Sheet
          </h1>
          <p style={{ color: "var(--text2)", fontSize: 14 }}>
            Organized by technique, not by week — {totalPatternProblems}{" "}
            problems
          </p>
        </div>
      )}

      <TabBar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Roadmap tab */}
      {activeTab === "roadmap" && (
        <>
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
                fontFamily: "'JetBrains Mono',monospace",
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
                fontFamily: "'JetBrains Mono',monospace",
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
              {["All", "Easy", "Medium", "Hard", "Done", "Remaining"].map(
                (f) => (
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
                ),
              )}
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
        </>
      )}

      {/* Company tab */}
      {isCompanyTab && activeCompany && (
        <CompanyPage
          company={activeCompany}
          completed={compCompleted}
          toggle={compToggle}
          notes={notes}
          code={code}
          onOpenNote={openNote}
          onOpenCode={openCode}
        />
      )}

      {/* CS Fundamentals tab */}
      {isCsTab && (
        <CsPage
          subjects={csSubjects}
          completed={csCompleted}
          toggle={csToggle}
        />
      )}

      {/* Patterns tab */}
      {isPatternTab && (
        <PatternPage
          categories={patternCategories}
          completed={patternCompleted}
          toggle={patternToggle}
          notes={notes}
          code={code}
          onOpenNote={openNote}
          onOpenCode={openCode}
        />
      )}

      <div
        style={{
          textAlign: "center",
          marginTop: 48,
          color: "var(--text3)",
          fontSize: 13,
          fontFamily: "'JetBrains Mono',monospace",
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

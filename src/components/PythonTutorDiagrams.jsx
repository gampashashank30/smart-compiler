import React from 'react';

/**
 * High-fidelity SVG diagrams for Python programming concepts.
 */
export function PythonTutorDiagram({ type }) {
  const resolvedType = type || 'py-default';

  switch (resolvedType) {
    case 'py-print-io':
    case 'py-hello-world':
      return (
        <svg viewBox="0 0 420 200" className="w-full max-w-md mx-auto rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 p-3 shadow-sm">
          <defs>
            <marker id="py-arrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M 0 0 L 10 5 L 0 10 z" fill="#3b82f6" />
            </marker>
          </defs>
          {/* Source Box */}
          <rect x="20" y="30" width="160" height="135" rx="8" fill="#1e293b" stroke="#334155" strokeWidth="2" />
          <rect x="20" y="30" width="160" height="24" rx="8" fill="#0f172a" />
          <circle cx="35" cy="42" r="4" fill="#ef4444" />
          <circle cx="47" cy="42" r="4" fill="#f59e0b" />
          <circle cx="59" cy="42" r="4" fill="#10b981" />
          <text x="170" y="46" fill="#94a3b8" textAnchor="end" fontSize="10" fontFamily="monospace">script.py</text>
          <text x="30" y="85" fill="#38bdf8" fontSize="11" fontFamily="monospace"># Direct execution</text>
          <text x="30" y="115" fill="#facc15" fontSize="11" fontFamily="monospace">print<tspan fill="#ffffff">(</tspan><tspan fill="#4ade80">"Hello World"</tspan><tspan fill="#ffffff">)</tspan></text>
          <text x="30" y="145" fill="#94a3b8" fontSize="9" fontFamily="monospace">No main / compilation</text>

          {/* Execution Pipeline */}
          <path d="M 190 95 L 230 95" fill="none" stroke="#3b82f6" strokeWidth="2" strokeDasharray="4" markerEnd="url(#py-arrow)" />
          <text x="210" y="85" fill="#3b82f6" fontSize="9" textAnchor="middle" fontWeight="bold">Python 3</text>

          {/* Terminal Box */}
          <rect x="240" y="30" width="160" height="135" rx="8" fill="#0f172a" stroke="#10b981" strokeWidth="1.5" />
          <rect x="240" y="30" width="160" height="24" rx="8" fill="#1e293b" />
          <text x="252" y="46" fill="#10b981" fontSize="10" fontWeight="bold" fontFamily="monospace">stdout</text>
          <text x="252" y="85" fill="#64748b" fontSize="10" fontFamily="monospace">$ python script.py</text>
          <text x="252" y="115" fill="#ffffff" fontSize="13" fontWeight="bold" fontFamily="monospace">Hello World</text>
          <text x="252" y="145" fill="#10b981" fontSize="9" fontFamily="monospace">&#10003; exit code 0</text>
        </svg>
      );

    case 'py-variables':
    case 'py-variables-types':
      return (
        <svg viewBox="0 0 420 200" className="w-full max-w-md mx-auto rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 p-3 shadow-sm">
          {/* Variable Reference Model */}
          <rect x="30" y="45" width="100" height="40" rx="6" fill="#4338ca" stroke="#6366f1" strokeWidth="1.5" />
          <text x="80" y="70" fill="#ffffff" fontSize="12" textAnchor="middle" fontWeight="bold" fontFamily="monospace">x (label)</text>

          <path d="M 135 65 L 220 65" fill="none" stroke="#6366f1" strokeWidth="2" markerEnd="url(#py-arrow)" />

          {/* PyObject Heap */}
          <rect x="230" y="30" width="150" height="70" rx="8" fill="#1e293b" stroke="#38bdf8" strokeWidth="1.5" />
          <text x="240" y="55" fill="#94a3b8" fontSize="10" fontFamily="monospace">PyObject &lt;int&gt;</text>
          <text x="240" y="80" fill="#38bdf8" fontSize="16" fontWeight="bold" fontFamily="monospace">value: 42</text>

          {/* Dynamic Rebinding text */}
          <rect x="30" y="115" width="350" height="45" rx="6" fill="#0f172a" stroke="#334155" strokeWidth="1" />
          <text x="45" y="142" fill="#facc15" fontSize="11" fontFamily="monospace">x = "Hello" # label rebinds to &lt;str&gt; object</text>
        </svg>
      );

    case 'py-conditionals':
      return (
        <svg viewBox="0 0 420 200" className="w-full max-w-md mx-auto rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 p-3 shadow-sm">
          {/* Decision diamond */}
          <polygon points="210,25 290,65 210,105 130,65" fill="#1e293b" stroke="#f59e0b" strokeWidth="2" />
          <text x="210" y="69" fill="#facc15" fontSize="11" textAnchor="middle" fontWeight="bold" fontFamily="monospace">score &gt;= 90 ?</text>

          {/* True branch */}
          <path d="M 290 65 L 340 65 L 340 120" fill="none" stroke="#10b981" strokeWidth="2" />
          <text x="320" y="58" fill="#10b981" fontSize="10" fontWeight="bold">True</text>
          <rect x="290" y="120" width="100" height="45" rx="6" fill="#065f46" stroke="#10b981" strokeWidth="1" />
          <text x="340" y="147" fill="#ffffff" fontSize="11" textAnchor="middle" fontFamily="monospace">Grade 'A'</text>

          {/* False branch */}
          <path d="M 130 65 L 80 65 L 80 120" fill="none" stroke="#ef4444" strokeWidth="2" />
          <text x="95" y="58" fill="#ef4444" fontSize="10" fontWeight="bold">False</text>
          <rect x="30" y="120" width="100" height="45" rx="6" fill="#7f1d1d" stroke="#ef4444" strokeWidth="1" />
          <text x="80" y="147" fill="#ffffff" fontSize="11" textAnchor="middle" fontFamily="monospace">Check elif</text>
        </svg>
      );

    case 'py-loops':
      return (
        <svg viewBox="0 0 420 200" className="w-full max-w-md mx-auto rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 p-3 shadow-sm">
          <rect x="25" y="30" width="370" height="40" rx="6" fill="#1e293b" stroke="#6366f1" strokeWidth="1.5" />
          <text x="40" y="55" fill="#f8fafc" fontSize="12" fontFamily="monospace">range(0, 5) &#8594; [0, 1, 2, 3, 4]</text>

          {/* Stepping sequence boxes */}
          {[0, 1, 2, 3, 4].map((val, idx) => (
            <g key={val}>
              <rect x={40 + idx * 70} y="90" width="55" height="55" rx="8" fill="#0f172a" stroke="#38bdf8" strokeWidth="1.5" />
              <text x={67 + idx * 70} y="115" fill="#94a3b8" fontSize="9" textAnchor="middle" fontFamily="monospace">i =</text>
              <text x={67 + idx * 70} y="135" fill="#38bdf8" fontSize="14" fontWeight="bold" textAnchor="middle" fontFamily="monospace">{val}</text>
            </g>
          ))}
          <text x="210" y="175" fill="#10b981" fontSize="10" textAnchor="middle" fontWeight="bold">Stops before 5 (5 iterations total)</text>
        </svg>
      );

    case 'py-collections':
    case 'py-lists-dictionaries':
      return (
        <svg viewBox="0 0 420 200" className="w-full max-w-md mx-auto rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 p-3 shadow-sm">
          {/* List vs Dict comparison */}
          <rect x="20" y="25" width="180" height="150" rx="8" fill="#1e293b" stroke="#3b82f6" strokeWidth="1.5" />
          <text x="35" y="50" fill="#38bdf8" fontSize="12" fontWeight="bold" fontFamily="monospace">List [0-indexed]</text>
          <text x="35" y="80" fill="#f8fafc" fontSize="11" fontFamily="monospace">[0] = "apple"</text>
          <text x="35" y="105" fill="#f8fafc" fontSize="11" fontFamily="monospace">[1] = "banana"</text>
          <text x="35" y="130" fill="#f8fafc" fontSize="11" fontFamily="monospace">[2] = "cherry"</text>
          <text x="35" y="155" fill="#94a3b8" fontSize="10" fontFamily="monospace">Ordered &amp; Mutable</text>

          <rect x="220" y="25" width="180" height="150" rx="8" fill="#1e293b" stroke="#f59e0b" strokeWidth="1.5" />
          <text x="235" y="50" fill="#facc15" fontSize="12" fontWeight="bold" fontFamily="monospace">Dictionary &#123;Key:Val&#125;</text>
          <text x="235" y="80" fill="#f8fafc" fontSize="11" fontFamily="monospace">"name" : "Alice"</text>
          <text x="235" y="105" fill="#f8fafc" fontSize="11" fontFamily="monospace">"role" : "Admin"</text>
          <text x="235" y="130" fill="#f8fafc" fontSize="11" fontFamily="monospace">"score": 95</text>
          <text x="235" y="155" fill="#10b981" fontSize="10" fontFamily="monospace">O(1) Hash Map Lookup</text>
        </svg>
      );

    case 'py-oop':
    case 'py-oop-classes':
      return (
        <svg viewBox="0 0 420 200" className="w-full max-w-md mx-auto rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 p-3 shadow-sm">
          {/* Class blueprint */}
          <rect x="20" y="25" width="170" height="150" rx="8" fill="#1e293b" stroke="#8b5cf6" strokeWidth="2" />
          <rect x="20" y="25" width="170" height="28" rx="8" fill="#4c1d95" />
          <text x="105" y="44" fill="#ffffff" fontSize="11" textAnchor="middle" fontWeight="bold" fontFamily="monospace">Class: Student</text>
          <text x="32" y="75" fill="#c4b5fd" fontSize="10" fontFamily="monospace">def __init__(self, name)</text>
          <text x="32" y="100" fill="#c4b5fd" fontSize="10" fontFamily="monospace">def study(self)</text>
          <text x="32" y="130" fill="#94a3b8" fontSize="9" fontFamily="monospace">Blueprint in memory</text>

          {/* Instantiation Arrow */}
          <path d="M 195 95 L 235 95" fill="none" stroke="#8b5cf6" strokeWidth="2" strokeDasharray="3" />
          <text x="215" y="85" fill="#8b5cf6" fontSize="9" textAnchor="middle" fontWeight="bold">new</text>

          {/* Object Instances */}
          <rect x="240" y="25" width="160" height="65" rx="6" fill="#0f172a" stroke="#10b981" strokeWidth="1.5" />
          <text x="250" y="48" fill="#10b981" fontSize="10" fontWeight="bold" fontFamily="monospace">Instance #1 (s1)</text>
          <text x="250" y="70" fill="#ffffff" fontSize="11" fontFamily="monospace">self.name = "Alice"</text>

          <rect x="240" y="105" width="160" height="65" rx="6" fill="#0f172a" stroke="#38bdf8" strokeWidth="1.5" />
          <text x="250" y="128" fill="#38bdf8" fontSize="10" fontWeight="bold" fontFamily="monospace">Instance #2 (s2)</text>
          <text x="250" y="150" fill="#ffffff" fontSize="11" fontFamily="monospace">self.name = "Bob"</text>
        </svg>
      );

    default:
      return (
        <svg viewBox="0 0 400 160" className="w-full max-w-md mx-auto rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 p-4 shadow-sm">
          <rect x="20" y="20" width="360" height="120" rx="8" fill="#1e293b" stroke="#38bdf8" strokeWidth="1.5" />
          <text x="200" y="70" fill="#38bdf8" fontSize="15" fontWeight="bold" textAnchor="middle" fontFamily="monospace">Python Architecture</text>
          <text x="200" y="100" fill="#94a3b8" fontSize="11" textAnchor="middle" fontFamily="monospace">Visualizing: {resolvedType}</text>
        </svg>
      );
  }
}

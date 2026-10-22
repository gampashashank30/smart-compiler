import React from 'react';

/**
 * High-fidelity SVG diagrams for Java programming concepts.
 */
export function JavaTutorDiagram({ type }) {
  const resolvedType = type || 'java-default';

  switch (resolvedType) {
    case 'java-hello-world':
      return (
        <svg viewBox="0 0 420 200" className="w-full max-w-md mx-auto rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 p-3 shadow-sm">
          {/* Java Source */}
          <rect x="15" y="30" width="115" height="130" rx="8" fill="#1e293b" stroke="#334155" strokeWidth="2" />
          <rect x="15" y="30" width="115" height="22" rx="8" fill="#0f172a" />
          <text x="72" y="45" fill="#f59e0b" fontSize="10" textAnchor="middle" fontWeight="bold" fontFamily="monospace">Main.java</text>
          <text x="25" y="80" fill="#38bdf8" fontSize="9" fontFamily="monospace">public class</text>
          <text x="25" y="100" fill="#f8fafc" fontSize="9" fontFamily="monospace">Main &#123;</text>
          <text x="25" y="125" fill="#10b981" fontSize="8" fontFamily="monospace">public static</text>
          <text x="25" y="140" fill="#10b981" fontSize="8" fontFamily="monospace">void main()</text>

          {/* javac arrow */}
          <path d="M 135 95 L 165 95" fill="none" stroke="#f59e0b" strokeWidth="2" strokeDasharray="3" />
          <text x="150" y="85" fill="#f59e0b" fontSize="8" textAnchor="middle" fontWeight="bold">javac</text>

          {/* Bytecode */}
          <rect x="170" y="45" width="105" height="100" rx="8" fill="#0f172a" stroke="#f59e0b" strokeWidth="1.5" />
          <text x="222" y="68" fill="#facc15" fontSize="10" textAnchor="middle" fontWeight="bold" fontFamily="monospace">Main.class</text>
          <text x="180" y="95" fill="#94a3b8" fontSize="9" fontFamily="monospace">CA FE BA BE</text>
          <text x="180" y="115" fill="#38bdf8" fontSize="9" fontFamily="monospace">JVM Bytecode</text>

          {/* JVM arrow */}
          <path d="M 280 95 L 305 95" fill="none" stroke="#10b981" strokeWidth="2" strokeDasharray="3" />
          <text x="292" y="85" fill="#10b981" fontSize="8" textAnchor="middle" fontWeight="bold">JVM</text>

          {/* Output */}
          <rect x="310" y="30" width="95" height="130" rx="8" fill="#0f172a" stroke="#10b981" strokeWidth="1.5" />
          <text x="357" y="55" fill="#10b981" fontSize="10" textAnchor="middle" fontWeight="bold" fontFamily="monospace">Console</text>
          <text x="320" y="95" fill="#ffffff" fontSize="11" fontWeight="bold" fontFamily="monospace">Hello,</text>
          <text x="320" y="115" fill="#ffffff" fontSize="11" fontWeight="bold" fontFamily="monospace">Java!</text>
          <text x="320" y="145" fill="#64748b" fontSize="8" fontFamily="monospace">exit 0</text>
        </svg>
      );

    case 'java-types':
    case 'java-variables-types':
      return (
        <svg viewBox="0 0 420 200" className="w-full max-w-md mx-auto rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 p-3 shadow-sm">
          {/* Stack Memory */}
          <rect x="25" y="25" width="170" height="150" rx="8" fill="#1e293b" stroke="#3b82f6" strokeWidth="1.5" />
          <rect x="25" y="25" width="170" height="28" rx="8" fill="#1e3a8a" />
          <text x="110" y="44" fill="#93c5fd" fontSize="11" textAnchor="middle" fontWeight="bold" fontFamily="monospace">Stack (Primitives)</text>
          <text x="35" y="75" fill="#f8fafc" fontSize="10" fontFamily="monospace">int age = 21 (32-bit)</text>
          <text x="35" y="100" fill="#f8fafc" fontSize="10" fontFamily="monospace">double pi = 3.1415</text>
          <text x="35" y="125" fill="#f8fafc" fontSize="10" fontFamily="monospace">boolean ok = true</text>
          <text x="35" y="150" fill="#facc15" fontSize="10" fontFamily="monospace">String ref = 0x4A &#8594;</text>

          {/* Pointer Arrow */}
          <path d="M 180 148 L 225 105" fill="none" stroke="#facc15" strokeWidth="2" strokeDasharray="3" />

          {/* Heap Memory */}
          <rect x="230" y="25" width="170" height="150" rx="8" fill="#1e293b" stroke="#10b981" strokeWidth="1.5" />
          <rect x="230" y="25" width="170" height="28" rx="8" fill="#064e3b" />
          <text x="315" y="44" fill="#a7f3d0" fontSize="11" textAnchor="middle" fontWeight="bold" fontFamily="monospace">Heap (Objects)</text>
          <rect x="245" y="70" width="140" height="50" rx="6" fill="#0f172a" stroke="#facc15" strokeWidth="1" />
          <text x="255" y="90" fill="#94a3b8" fontSize="9" fontFamily="monospace">String [0x4A]</text>
          <text x="255" y="110" fill="#38bdf8" fontSize="11" fontWeight="bold" fontFamily="monospace">"Hello Java"</text>
          <text x="245" y="150" fill="#64748b" fontSize="9" fontFamily="monospace">Garbage Collected</text>
        </svg>
      );

    case 'java-conditionals':
      return (
        <svg viewBox="0 0 420 200" className="w-full max-w-md mx-auto rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 p-3 shadow-sm">
          {/* Java Condition check */}
          <rect x="130" y="25" width="160" height="40" rx="8" fill="#1e293b" stroke="#f59e0b" strokeWidth="2" />
          <text x="210" y="50" fill="#facc15" fontSize="11" textAnchor="middle" fontWeight="bold" fontFamily="monospace">boolean (score &gt;= 90)</text>

          {/* True Branch */}
          <path d="M 290 45 L 340 45 L 340 95" fill="none" stroke="#10b981" strokeWidth="2" />
          <text x="315" y="38" fill="#10b981" fontSize="10" fontWeight="bold">true</text>
          <rect x="280" y="95" width="120" height="60" rx="6" fill="#064e3b" stroke="#10b981" strokeWidth="1" />
          <text x="340" y="120" fill="#ffffff" fontSize="11" textAnchor="middle" fontFamily="monospace">grade = 'A';</text>
          <text x="340" y="140" fill="#a7f3d0" fontSize="9" textAnchor="middle" fontFamily="monospace">executes block</text>

          {/* False Branch */}
          <path d="M 130 45 L 80 45 L 80 95" fill="none" stroke="#ef4444" strokeWidth="2" />
          <text x="100" y="38" fill="#ef4444" fontSize="10" fontWeight="bold">false</text>
          <rect x="20" y="95" width="120" height="60" rx="6" fill="#7f1d1d" stroke="#ef4444" strokeWidth="1" />
          <text x="80" y="120" fill="#ffffff" fontSize="11" textAnchor="middle" fontFamily="monospace">else if / else</text>
          <text x="80" y="140" fill="#fca5a5" fontSize="9" textAnchor="middle" fontFamily="monospace">next condition</text>
        </svg>
      );

    case 'java-loops':
      return (
        <svg viewBox="0 0 420 200" className="w-full max-w-md mx-auto rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 p-3 shadow-sm">
          <text x="210" y="35" fill="#f8fafc" fontSize="12" textAnchor="middle" fontFamily="monospace">int[] arr = &#123;10, 20, 30, 40&#125;; (length = 4)</text>

          {/* Array visual cells */}
          {[10, 20, 30, 40].map((val, idx) => (
            <g key={val}>
              <rect x={50 + idx * 80} y="55" width="70" height="60" rx="6" fill="#1e293b" stroke="#38bdf8" strokeWidth="1.5" />
              <text x={85 + idx * 80} y="80" fill="#94a3b8" fontSize="9" textAnchor="middle" fontFamily="monospace">index [{idx}]</text>
              <text x={85 + idx * 80} y="103" fill="#ffffff" fontSize="15" fontWeight="bold" textAnchor="middle" fontFamily="monospace">{val}</text>
            </g>
          ))}

          {/* Loop Pointer */}
          <rect x="50" y="130" width="310" height="40" rx="6" fill="#0f172a" stroke="#10b981" strokeWidth="1" />
          <text x="205" y="155" fill="#10b981" fontSize="11" textAnchor="middle" fontFamily="monospace">for (int n : arr) &#8594; visits [0] to [length - 1]</text>
        </svg>
      );

    case 'java-oop':
    case 'java-classes-objects':
      return (
        <svg viewBox="0 0 420 200" className="w-full max-w-md mx-auto rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 p-3 shadow-sm">
          {/* Class definition */}
          <rect x="20" y="25" width="165" height="150" rx="8" fill="#1e293b" stroke="#f59e0b" strokeWidth="2" />
          <rect x="20" y="25" width="165" height="28" rx="8" fill="#78350f" />
          <text x="102" y="44" fill="#fef3c7" fontSize="11" textAnchor="middle" fontWeight="bold" fontFamily="monospace">class Book</text>
          <text x="30" y="75" fill="#facc15" fontSize="10" fontFamily="monospace">private String title;</text>
          <text x="30" y="95" fill="#facc15" fontSize="10" fontFamily="monospace">private double price;</text>
          <text x="30" y="125" fill="#38bdf8" fontSize="9" fontFamily="monospace">public Book(...) &#123;&#125;</text>
          <text x="30" y="145" fill="#10b981" fontSize="9" fontFamily="monospace">public void print() &#123;&#125;</text>

          {/* new keyword arrow */}
          <path d="M 190 95 L 235 95" fill="none" stroke="#f59e0b" strokeWidth="2" strokeDasharray="3" />
          <text x="212" y="85" fill="#f59e0b" fontSize="9" textAnchor="middle" fontWeight="bold">new</text>

          {/* Instantiated Object on Heap */}
          <rect x="240" y="30" width="160" height="135" rx="8" fill="#0f172a" stroke="#10b981" strokeWidth="1.5" />
          <rect x="240" y="30" width="160" height="26" rx="8" fill="#064e3b" />
          <text x="320" y="48" fill="#a7f3d0" fontSize="10" textAnchor="middle" fontWeight="bold" fontFamily="monospace">Heap Instance #1</text>
          <text x="250" y="80" fill="#94a3b8" fontSize="10" fontFamily="monospace">title: "Clean Code"</text>
          <text x="250" y="105" fill="#94a3b8" fontSize="10" fontFamily="monospace">price: 34.99</text>
          <text x="250" y="140" fill="#10b981" fontSize="9" fontFamily="monospace">&#10003; Memory allocated</text>
        </svg>
      );

    case 'java-operators':
      return (
        <svg viewBox="0 0 420 200" className="w-full max-w-md mx-auto rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 p-3 shadow-sm">
          <rect x="25" y="25" width="170" height="65" rx="8" fill="#1e293b" stroke="#3b82f6" strokeWidth="1.5" />
          <text x="110" y="48" fill="#93c5fd" fontSize="10" textAnchor="middle" fontWeight="bold" fontFamily="monospace">Integer Division</text>
          <text x="110" y="70" fill="#f8fafc" fontSize="11" textAnchor="middle" fontFamily="monospace">7 / 2 = 3 (Truncated)</text>

          <rect x="225" y="25" width="170" height="65" rx="8" fill="#1e293b" stroke="#10b981" strokeWidth="1.5" />
          <text x="310" y="48" fill="#a7f3d0" fontSize="10" textAnchor="middle" fontWeight="bold" fontFamily="monospace">Floating Division</text>
          <text x="310" y="70" fill="#f8fafc" fontSize="11" textAnchor="middle" fontFamily="monospace">(double) 7 / 2 = 3.5</text>

          <rect x="25" y="105" width="370" height="65" rx="8" fill="#1e293b" stroke="#f59e0b" strokeWidth="1.5" />
          <text x="210" y="128" fill="#facc15" fontSize="10" textAnchor="middle" fontWeight="bold" fontFamily="monospace">Modulo Operator (%)</text>
          <text x="210" y="150" fill="#f8fafc" fontSize="11" textAnchor="middle" fontFamily="monospace">7 % 2 = 1 (Remainder) | 18 % 4 = 2</text>
        </svg>
      );

    case 'java-methods':
      return (
        <svg viewBox="0 0 420 200" className="w-full max-w-md mx-auto rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 p-3 shadow-sm">
          <rect x="30" y="30" width="100" height="140" rx="8" fill="#1e293b" stroke="#3b82f6" strokeWidth="1.5" />
          <rect x="30" y="30" width="100" height="24" rx="8" fill="#1e3a8a" />
          <text x="80" y="46" fill="#93c5fd" fontSize="9" textAnchor="middle" fontWeight="bold" fontFamily="monospace">Caller</text>
          <text x="80" y="80" fill="#f8fafc" fontSize="9" textAnchor="middle" fontFamily="monospace">int a = 12;</text>
          <text x="80" y="100" fill="#f8fafc" fontSize="9" textAnchor="middle" fontFamily="monospace">int b = 8;</text>
          <text x="80" y="130" fill="#facc15" fontSize="8" textAnchor="middle" fontFamily="monospace">gcd(a, b);</text>

          {/* Call arrow */}
          <path d="M 130 85 L 180 85" fill="none" stroke="#f59e0b" strokeWidth="2" markerEnd="url(#arrow)" />
          <text x="155" y="78" fill="#f59e0b" fontSize="8" textAnchor="middle">params</text>

          {/* Method Stack frame */}
          <rect x="180" y="30" width="120" height="140" rx="8" fill="#0f172a" stroke="#10b981" strokeWidth="1.5" />
          <rect x="180" y="30" width="120" height="24" rx="8" fill="#064e3b" />
          <text x="240" y="46" fill="#a7f3d0" fontSize="9" textAnchor="middle" fontWeight="bold" fontFamily="monospace">calculateGCD()</text>
          <text x="240" y="80" fill="#94a3b8" fontSize="8" textAnchor="middle" fontFamily="monospace">Stack Frame</text>
          <text x="240" y="105" fill="#38bdf8" fontSize="9" textAnchor="middle" fontFamily="monospace">while (b != 0)</text>
          <text x="240" y="145" fill="#10b981" fontSize="9" textAnchor="middle" fontFamily="monospace">return a = 4</text>

          {/* Return arrow */}
          <path d="M 180 135 L 130 135" fill="none" stroke="#10b981" strokeWidth="2" strokeDasharray="3" />
          <text x="155" y="148" fill="#10b981" fontSize="8" textAnchor="middle">return</text>

          {/* Result card */}
          <rect x="315" y="55" width="85" height="90" rx="6" fill="#1e293b" stroke="#facc15" strokeWidth="1" />
          <text x="357" y="85" fill="#facc15" fontSize="9" textAnchor="middle" fontFamily="monospace">Result</text>
          <text x="357" y="115" fill="#ffffff" fontSize="16" fontWeight="bold" textAnchor="middle" fontFamily="monospace">4</text>
        </svg>
      );

    default:
      return (
        <svg viewBox="0 0 400 160" className="w-full max-w-md mx-auto rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 p-4 shadow-sm">
          <rect x="20" y="20" width="360" height="120" rx="8" fill="#1e293b" stroke="#f59e0b" strokeWidth="1.5" />
          <text x="200" y="70" fill="#f59e0b" fontSize="15" fontWeight="bold" textAnchor="middle" fontFamily="monospace">Java Architecture</text>
          <text x="200" y="100" fill="#94a3b8" fontSize="11" textAnchor="middle" fontFamily="monospace">Visualizing: {resolvedType}</text>
        </svg>
      );
  }
}

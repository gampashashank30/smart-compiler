import React from 'react';

/**
 * Renders a high-fidelity SVG diagram with clean styling and micro-animations.
 * Supports various computer science and programming concept representations.
 */
export function TutorDiagram({ type }) {
  // Common style variables (CSS variables or Hex codes matching the dark mode / tailwind styles)
  const isDark = false; // The theme style handles colors, but SVG values are explicit for clarity

  // Fallback diagram type matching
  const resolvedType = type || 'fallback';

  // Return a beautiful SVG based on the diagram type
  switch (resolvedType) {
    case 'hello-world':
      return (
        <svg viewBox="0 0 400 200" className="w-full max-w-md mx-auto rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 p-4 shadow-sm">
          <defs>
            <linearGradient id="hello-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#4f46e5" />
              <stop offset="100%" stopColor="#6366f1" />
            </linearGradient>
            <marker id="hello-arrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M 0 0 L 10 5 L 0 10 z" fill="#6366f1" />
            </marker>
          </defs>

          {/* Left Side: C Source Code Container */}
          <rect x="20" y="30" width="150" height="130" rx="8" fill="#1e293b" stroke="#334155" strokeWidth="2" />
          <rect x="20" y="30" width="150" height="24" rx="8" fill="#0f172a" />
          <circle cx="35" cy="42" r="4" fill="#ef4444" />
          <circle cx="47" cy="42" r="4" fill="#f59e0b" />
          <circle cx="59" cy="42" r="4" fill="#10b981" />
          <text x="160" y="45" fill="#64748b" textAnchor="end" fontSize="10" fontFamily="JetBrains Mono, monospace">main.c</text>

          {/* Source lines */}
          <text x="30" y="75" fill="#f43f5e" fontSize="9" fontFamily="JetBrains Mono, monospace">#include &lt;stdio.h&gt;</text>
          <text x="30" y="95" fill="#38bdf8" fontSize="9" fontFamily="JetBrains Mono, monospace">int main() &#123;</text>
          <text x="40" y="115" fill="#f8fafc" fontSize="9" fontFamily="JetBrains Mono, monospace">
            printf(<text fill="#f59e0b">"Hello!"</text>);
          </text>
          <text x="40" y="135" fill="#10b981" fontSize="9" fontFamily="JetBrains Mono, monospace">return 0;</text>
          <text x="30" y="150" fill="#38bdf8" fontSize="9" fontFamily="JetBrains Mono, monospace">&#125;</text>

          {/* Transition Arrow */}
          <path d="M 185 95 L 220 95" fill="none" stroke="#6366f1" strokeWidth="2" strokeDasharray="4" markerEnd="url(#hello-arrow)" />
          <text x="202" y="85" fill="#6366f1" fontSize="9" textAnchor="middle" fontWeight="bold" fontFamily="Inter, sans-serif">Execution</text>

          {/* Right Side: Output Terminal */}
          <rect x="230" y="30" width="150" height="130" rx="8" fill="#0f172a" stroke="#10b981" strokeWidth="1.5" />
          <rect x="230" y="30" width="150" height="24" rx="8" fill="#1e293b" />
          <text x="242" y="45" fill="#10b981" fontSize="10" fontWeight="bold" fontFamily="JetBrains Mono, monospace">Console Output</text>
          
          <text x="245" y="85" fill="#38bdf8" fontSize="11" fontFamily="JetBrains Mono, monospace">&gt; ./main</text>
          <text x="245" y="115" fill="#ffffff" fontSize="14" fontWeight="bold" fontFamily="JetBrains Mono, monospace">Hello!</text>
          <text x="245" y="140" fill="#64748b" fontSize="9" fontFamily="JetBrains Mono, monospace">Process returned 0</text>
        </svg>
      );

    case 'variables-datatypes':
      return (
        <svg viewBox="0 0 400 200" className="w-full max-w-md mx-auto rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 p-4 shadow-sm">
          <text x="200" y="25" fill="#1e293b" className="dark:fill-slate-200" textAnchor="middle" fontSize="13" fontWeight="bold" fontFamily="Inter, sans-serif">Memory Size & Types</text>
          
          {/* Char Box */}
          <g transform="translate(20, 45)">
            <rect x="0" y="0" width="100" height="110" rx="6" fill="#1e293b" stroke="#e0e7ff" strokeWidth="1.5" />
            <rect x="0" y="0" width="100" height="26" rx="6" fill="#4f46e5" />
            <text x="50" y="17" fill="#ffffff" textAnchor="middle" fontSize="10.5" fontWeight="bold" fontFamily="Inter, sans-serif">char</text>
            <text x="50" y="52" fill="#818cf8" textAnchor="middle" fontSize="10" fontFamily="Inter, sans-serif">1 Byte (8 bits)</text>
            <text x="50" y="80" fill="#ffffff" textAnchor="middle" fontSize="18" fontWeight="bold" fontFamily="JetBrains Mono, monospace">'A'</text>
            <text x="50" y="98" fill="#94a3b8" textAnchor="middle" fontSize="9" fontFamily="Inter, sans-serif">Single character</text>
          </g>

          {/* Int Box */}
          <g transform="translate(140, 45)">
            <rect x="0" y="0" width="115" height="110" rx="6" fill="#1e293b" stroke="#dbeafe" strokeWidth="1.5" />
            <rect x="0" y="0" width="115" height="26" rx="6" fill="#0ea5e9" />
            <text x="57.5" y="17" fill="#ffffff" textAnchor="middle" fontSize="10.5" fontWeight="bold" fontFamily="Inter, sans-serif">int</text>
            <text x="57.5" y="52" fill="#38bdf8" textAnchor="middle" fontSize="10" fontFamily="Inter, sans-serif">4 Bytes (32 bits)</text>
            <text x="57.5" y="80" fill="#ffffff" textAnchor="middle" fontSize="16" fontWeight="bold" fontFamily="JetBrains Mono, monospace">14205</text>
            <text x="57.5" y="98" fill="#94a3b8" textAnchor="middle" fontSize="9" fontFamily="Inter, sans-serif">Whole integer</text>
          </g>

          {/* Double Box */}
          <g transform="translate(275, 45)">
            <rect x="0" y="0" width="105" height="110" rx="6" fill="#1e293b" stroke="#dcfce7" strokeWidth="1.5" />
            <rect x="0" y="0" width="105" height="26" rx="6" fill="#10b981" />
            <text x="52.5" y="17" fill="#ffffff" textAnchor="middle" fontSize="10.5" fontWeight="bold" fontFamily="Inter, sans-serif">double</text>
            <text x="52.5" y="52" fill="#34d399" textAnchor="middle" fontSize="10" fontFamily="Inter, sans-serif">8 Bytes (64 bits)</text>
            <text x="52.5" y="80" fill="#ffffff" textAnchor="middle" fontSize="15" fontWeight="bold" fontFamily="JetBrains Mono, monospace">3.14159</text>
            <text x="52.5" y="98" fill="#94a3b8" textAnchor="middle" fontSize="9" fontFamily="Inter, sans-serif">Double precision</text>
          </g>
        </svg>
      );

    case 'arithmetic-operators':
      return (
        <svg viewBox="0 0 400 200" className="w-full max-w-md mx-auto rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 p-4 shadow-sm">
          <text x="200" y="25" fill="#1e293b" className="dark:fill-slate-200" textAnchor="middle" fontSize="13" fontWeight="bold" fontFamily="Inter, sans-serif">Arithmetic Operators Precedence</text>
          
          <g transform="translate(30, 45)" fontFamily="JetBrains Mono, monospace">
            {/* Expression Box */}
            <rect x="0" y="0" width="340" height="35" rx="6" fill="#1e293b" stroke="#6366f1" strokeWidth="1.5" />
            <text x="170" y="22" fill="#ffffff" textAnchor="middle" fontSize="14" fontWeight="bold">Expression: 5 + 3 * 2</text>

            {/* Step 1 */}
            <g transform="translate(40, 50)">
              <rect x="0" y="0" width="100" height="24" rx="4" fill="#0ea5e9" />
              <text x="50" y="16" fill="#ffffff" textAnchor="middle" fontSize="10.5" fontWeight="bold">Step 1: 3 * 2</text>
              <text x="50" y="45" fill="#0ea5e9" textAnchor="middle" fontSize="11" fontWeight="bold">➜ 6</text>
            </g>

            {/* Step 2 */}
            <g transform="translate(200, 50)">
              <rect x="0" y="0" width="100" height="24" rx="4" fill="#10b981" />
              <text x="50" y="16" fill="#ffffff" textAnchor="middle" fontSize="10.5" fontWeight="bold">Step 2: 5 + 6</text>
              <text x="50" y="45" fill="#10b981" textAnchor="middle" fontSize="11" fontWeight="bold">➜ 11</text>
            </g>

            {/* Precedence Banner */}
            <rect x="30" y="102" width="280" height="22" fill="#e0e7ff" rx="4" />
            <text x="170" y="116" fill="#4f46e5" textAnchor="middle" fontSize="9" fontWeight="bold" fontFamily="Inter, sans-serif">Multiplication (*) has higher precedence than Addition (+)</text>
          </g>
        </svg>
      );

    case 'if-else':
      return (
        <svg viewBox="0 0 400 200" className="w-full max-w-md mx-auto rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 p-4 shadow-sm">
          <defs>
            <marker id="if-arrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
              <path d="M 0 0 L 10 5 L 0 10 z" fill="#6366f1" />
            </marker>
          </defs>
          <text x="200" y="25" fill="#1e293b" className="dark:fill-slate-200" textAnchor="middle" fontSize="13" fontWeight="bold" fontFamily="Inter, sans-serif">If-Else Conditional Flow</text>

          <g transform="translate(50, 40)" fontFamily="Inter, sans-serif">
            {/* Condition Diamond */}
            <polygon points="150,0 200,20 150,40 100,20" fill="#f59e0b" fillOpacity="0.1" stroke="#f59e0b" strokeWidth="1.5" />
            <text x="150" y="24" fill="#f59e0b" textAnchor="middle" fontSize="10" fontWeight="bold">is rain == 1?</text>

            {/* True Path */}
            <path d="M 100 20 L 50 20 L 50 50" fill="none" stroke="#10b981" strokeWidth="1.5" markerEnd="url(#if-arrow)" />
            <text x="70" y="14" fill="#10b981" fontSize="9.5" fontWeight="bold">TRUE</text>
            <rect x="10" y="50" width="80" height="28" rx="4" fill="#1e293b" stroke="#10b981" strokeWidth="1.5" />
            <text x="50" y="67" fill="#ffffff" textAnchor="middle" fontSize="9" fontFamily="JetBrains Mono, monospace">Take umbrella</text>

            {/* False Path */}
            <path d="M 200 20 L 250 20 L 250 50" fill="none" stroke="#ef4444" strokeWidth="1.5" markerEnd="url(#if-arrow)" />
            <text x="230" y="14" fill="#ef4444" fontSize="9.5" fontWeight="bold">FALSE</text>
            <rect x="210" y="50" width="80" height="28" rx="4" fill="#1e293b" stroke="#ef4444" strokeWidth="1.5" />
            <text x="250" y="67" fill="#ffffff" textAnchor="middle" fontSize="9" fontFamily="JetBrains Mono, monospace">Go empty hand</text>
          </g>
        </svg>
      );

    case 'positive-negative-zero':
      return (
        <svg viewBox="0 0 400 200" className="w-full max-w-md mx-auto rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 p-4 shadow-sm">
          <text x="200" y="25" fill="#1e293b" className="dark:fill-slate-200" textAnchor="middle" fontSize="13" fontWeight="bold" fontFamily="Inter, sans-serif">Positive, Negative &amp; Zero Check</text>

          {/* Number line representation */}
          <g transform="translate(30, 60)">
            <line x1="20" y1="50" x2="320" y2="50" stroke="#475569" strokeWidth="3" />
            
            {/* Division markers */}
            {/* Negative */}
            <rect x="20" y="10" width="85" height="30" rx="4" fill="#fee2e2" stroke="#ef4444" strokeWidth="1.5" />
            <text x="62.5" y="29" fill="#991b1b" textAnchor="middle" fontSize="10.5" fontWeight="bold" fontFamily="Inter, sans-serif">N &lt; 0 (Neg)</text>
            <circle cx="62.5" cy="50" r="5" fill="#ef4444" />

            {/* Zero */}
            <rect x="130" y="10" width="80" height="30" rx="4" fill="#ffedd5" stroke="#f59e0b" strokeWidth="1.5" />
            <text x="170" y="29" fill="#9a3412" textAnchor="middle" fontSize="10.5" fontWeight="bold" fontFamily="Inter, sans-serif">N == 0 (Zero)</text>
            <circle cx="170" cy="50" r="6" fill="#f59e0b" />

            {/* Positive */}
            <rect x="235" y="10" width="85" height="30" rx="4" fill="#dcfce7" stroke="#10b981" strokeWidth="1.5" />
            <text x="277.5" y="29" fill="#166534" textAnchor="middle" fontSize="10.5" fontWeight="bold" fontFamily="Inter, sans-serif">N &gt; 0 (Pos)</text>
            <circle cx="277.5" cy="50" r="5" fill="#10b981" />
          </g>
        </svg>
      );

    case 'leap-year':
      return (
        <svg viewBox="0 0 400 200" className="w-full max-w-md mx-auto rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 p-4 shadow-sm">
          <defs>
            <marker id="leap-arrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
              <path d="M 0 0 L 10 5 L 0 10 z" fill="#6366f1" />
            </marker>
          </defs>
          <text x="200" y="25" fill="#1e293b" className="dark:fill-slate-200" textAnchor="middle" fontSize="13" fontWeight="bold" fontFamily="Inter, sans-serif">Leap Year Checking Rules</text>

          <g transform="translate(30, 45)" fontFamily="Inter, sans-serif" fontSize="9.5">
            {/* Condition 1 */}
            <rect x="10" y="10" width="95" height="30" rx="4" fill="#1e293b" stroke="#6366f1" strokeWidth="1.5" />
            <text x="57.5" y="28" fill="#ffffff" textAnchor="middle" fontWeight="bold">Year % 400 == 0?</text>

            <line x1="105" y1="25" x2="135" y2="25" stroke="#10b981" strokeWidth="1.5" markerEnd="url(#leap-arrow)" />
            <text x="120" y="18" fill="#10b981" fontSize="8" fontWeight="bold" textAnchor="middle">YES</text>

            {/* Condition 2 */}
            <rect x="10" y="55" width="95" height="30" rx="4" fill="#1e293b" stroke="#6366f1" strokeWidth="1.5" />
            <text x="57.5" y="73" fill="#ffffff" textAnchor="middle" fontWeight="bold">Year % 100 == 0?</text>

            <line x1="105" y1="70" x2="135" y2="70" stroke="#ef4444" strokeWidth="1.5" markerEnd="url(#leap-arrow)" />
            <text x="120" y="63" fill="#ef4444" fontSize="8" fontWeight="bold" textAnchor="middle">YES</text>

            {/* Condition 3 */}
            <rect x="10" y="100" width="95" height="30" rx="4" fill="#1e293b" stroke="#6366f1" strokeWidth="1.5" />
            <text x="57.5" y="118" fill="#ffffff" textAnchor="middle" fontWeight="bold">Year % 4 == 0?</text>

            <line x1="105" y1="115" x2="135" y2="115" stroke="#10b981" strokeWidth="1.5" markerEnd="url(#leap-arrow)" />
            <text x="120" y="108" fill="#10b981" fontSize="8" fontWeight="bold" textAnchor="middle">YES</text>

            {/* Outcome cards */}
            <rect x="145" y="10" width="180" height="40" rx="6" fill="#dcfce7" stroke="#10b981" strokeWidth="2" />
            <text x="235" y="34" fill="#166534" textAnchor="middle" fontSize="13.5" fontWeight="bold">LEAP YEAR ✅</text>

            <rect x="145" y="80" width="180" height="40" rx="6" fill="#fee2e2" stroke="#ef4444" strokeWidth="1.5" />
            <text x="235" y="104" fill="#991b1b" textAnchor="middle" fontSize="13.5" fontWeight="bold">COMMON YEAR ❌</text>
          </g>
        </svg>
      );

    case 'even-odd':
      return (
        <svg viewBox="0 0 400 200" className="w-full max-w-md mx-auto rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 p-4 shadow-sm">
          <text x="200" y="25" fill="#1e293b" className="dark:fill-slate-200" textAnchor="middle" fontSize="13" fontWeight="bold" fontFamily="Inter, sans-serif">Even vs Odd Modulo Divison (N % 2)</text>

          {/* Even Section */}
          <g transform="translate(30, 45)">
            <rect x="0" y="0" width="150" height="120" rx="8" fill="#1e293b" stroke="#10b981" strokeWidth="2" />
            <rect x="0" y="0" width="150" height="28" rx="8" fill="#10b981" />
            <text x="75" y="19" fill="#ffffff" textAnchor="middle" fontSize="11" fontWeight="bold" fontFamily="Inter, sans-serif">EVEN NUMBER (e.g. 8)</text>
            
            <text x="75" y="60" fill="#f8fafc" textAnchor="middle" fontSize="14" fontFamily="JetBrains Mono, monospace">8 % 2 == 0</text>
            <circle cx="75" cy="95" r="14" fill="#d1fae5" />
            <text x="75" y="99" fill="#065f46" textAnchor="middle" fontSize="13" fontWeight="bold" fontFamily="Inter, sans-serif">✓</text>
            <text x="75" y="130" fill="#a7f3d0" textAnchor="middle" fontSize="9" fontFamily="Inter, sans-serif">Remainder is Zero</text>
          </g>

          {/* Odd Section */}
          <g transform="translate(220, 45)">
            <rect x="0" y="0" width="150" height="120" rx="8" fill="#1e293b" stroke="#f43f5e" strokeWidth="2" />
            <rect x="0" y="0" width="150" height="28" rx="8" fill="#f43f5e" />
            <text x="75" y="19" fill="#ffffff" textAnchor="middle" fontSize="11" fontWeight="bold" fontFamily="Inter, sans-serif">ODD NUMBER (e.g. 7)</text>
            
            <text x="75" y="60" fill="#f8fafc" textAnchor="middle" fontSize="14" fontFamily="JetBrains Mono, monospace">7 % 2 == 1</text>
            <circle cx="75" cy="95" r="14" fill="#fee2e2" />
            <text x="75" y="99" fill="#991b1b" textAnchor="middle" fontSize="12" fontWeight="bold" fontFamily="Inter, sans-serif">✗</text>
            <text x="75" y="130" fill="#fca5a5" textAnchor="middle" fontSize="9" fontFamily="Inter, sans-serif">Remainder is One</text>
          </g>
        </svg>
      );

    case 'swap-numbers':
      return (
        <svg viewBox="0 0 400 200" className="w-full max-w-md mx-auto rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 p-4 shadow-sm">
          <defs>
            <marker id="swap-arrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
              <path d="M 0 0 L 10 5 L 0 10 z" fill="#8b5cf6" />
            </marker>
          </defs>

          {/* Before State */}
          <g transform="translate(20, 40)">
            <text x="60" y="-10" fill="#475569" className="dark:fill-slate-400" textAnchor="middle" fontSize="11" fontWeight="bold" fontFamily="Inter, sans-serif">BEFORE</text>
            <rect x="0" y="0" width="50" height="50" rx="8" fill="#e2e8f0" className="dark:fill-slate-800" stroke="#94a3b8" strokeWidth="1.5" />
            <text x="25" y="30" fill="#1e293b" className="dark:fill-white" textAnchor="middle" fontSize="16" fontWeight="bold" fontFamily="JetBrains Mono, monospace">15</text>
            <text x="25" y="65" fill="#64748b" textAnchor="middle" fontSize="10" fontFamily="Inter, sans-serif">a</text>

            <rect x="70" y="0" width="50" height="50" rx="8" fill="#e2e8f0" className="dark:fill-slate-800" stroke="#94a3b8" strokeWidth="1.5" />
            <text x="95" y="30" fill="#1e293b" className="dark:fill-white" textAnchor="middle" fontSize="16" fontWeight="bold" fontFamily="JetBrains Mono, monospace">40</text>
            <text x="95" y="65" fill="#64748b" textAnchor="middle" fontSize="10" fontFamily="Inter, sans-serif">b</text>
          </g>

          {/* Swap Swap Arrows */}
          <g transform="translate(150, 65)">
            <path d="M 10 -15 C 35 -30, 65 -30, 90 -15" fill="none" stroke="#8b5cf6" strokeWidth="2" strokeDasharray="3" markerEnd="url(#swap-arrow)" />
            <path d="M 90 15 C 65 30, 35 30, 10 15" fill="none" stroke="#6366f1" strokeWidth="2" markerEnd="url(#swap-arrow)" />
            <text x="50" y="2" fill="#8b5cf6" textAnchor="middle" fontSize="10" fontWeight="bold" fontFamily="Inter, sans-serif">temp</text>
          </g>

          {/* After State */}
          <g transform="translate(260, 40)">
            <text x="60" y="-10" fill="#10b981" textAnchor="middle" fontSize="11" fontWeight="bold" fontFamily="Inter, sans-serif">AFTER SWAP</text>
            <rect x="0" y="0" width="50" height="50" rx="8" fill="#dcfce7" stroke="#10b981" strokeWidth="1.5" />
            <text x="25" y="30" fill="#065f46" textAnchor="middle" fontSize="16" fontWeight="bold" fontFamily="JetBrains Mono, monospace">40</text>
            <text x="25" y="65" fill="#10b981" textAnchor="middle" fontSize="10" fontFamily="Inter, sans-serif">a</text>

            <rect x="70" y="0" width="50" height="50" rx="8" fill="#dcfce7" stroke="#10b981" strokeWidth="1.5" />
            <text x="95" y="30" fill="#065f46" textAnchor="middle" fontSize="16" fontWeight="bold" fontFamily="JetBrains Mono, monospace">15</text>
            <text x="95" y="65" fill="#10b981" textAnchor="middle" fontSize="10" fontFamily="Inter, sans-serif">b</text>
          </g>
        </svg>
      );

    case 'calculator-switch':
      return (
        <svg viewBox="0 0 400 200" className="w-full max-w-md mx-auto rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 p-4 shadow-sm">
          {/* Keypad frame */}
          <rect x="110" y="20" width="180" height="160" rx="16" fill="#1e293b" stroke="#475569" strokeWidth="2" />
          <rect x="125" y="35" width="150" height="32" rx="6" fill="#0f172a" stroke="#6366f1" strokeWidth="1.5" />
          <text x="265" y="56" fill="#38bdf8" textAnchor="end" fontSize="15" fontWeight="bold" fontFamily="JetBrains Mono, monospace">5 * 8 = 40</text>

          {/* Calculator buttons */}
          <g transform="translate(125, 80)">
            {/* Row 1 */}
            <rect x="0" y="0" width="30" height="24" rx="4" fill="#334155" />
            <text x="15" y="16" fill="#f8fafc" textAnchor="middle" fontSize="10" fontWeight="bold" fontFamily="Inter, sans-serif">7</text>
            <rect x="40" y="0" width="30" height="24" rx="4" fill="#334155" />
            <text x="55" y="16" fill="#f8fafc" textAnchor="middle" fontSize="10" fontWeight="bold" fontFamily="Inter, sans-serif">8</text>
            <rect x="80" y="0" width="30" height="24" rx="4" fill="#334155" />
            <text x="95" y="16" fill="#f8fafc" textAnchor="middle" fontSize="10" fontWeight="bold" fontFamily="Inter, sans-serif">9</text>
            <rect x="120" y="0" width="30" height="24" rx="4" fill="#f59e0b" />
            <text x="135" y="17" fill="#ffffff" textAnchor="middle" fontSize="12" fontWeight="bold" fontFamily="Inter, sans-serif">/</text>

            {/* Row 2 */}
            <rect x="0" y="32" width="30" height="24" rx="4" fill="#334155" />
            <text x="15" y="48" fill="#f8fafc" textAnchor="middle" fontSize="10" fontWeight="bold" fontFamily="Inter, sans-serif">4</text>
            <rect x="40" y="32" width="30" height="24" rx="4" fill="#334155" />
            <text x="55" y="48" fill="#f8fafc" textAnchor="middle" fontSize="10" fontWeight="bold" fontFamily="Inter, sans-serif">5</text>
            <rect x="80" y="32" width="30" height="24" rx="4" fill="#334155" />
            <text x="95" y="48" fill="#f8fafc" textAnchor="middle" fontSize="10" fontWeight="bold" fontFamily="Inter, sans-serif">6</text>
            <rect x="120" y="32" width="30" height="24" rx="4" fill="#f59e0b" />
            <text x="135" y="49" fill="#ffffff" textAnchor="middle" fontSize="12" fontWeight="bold" fontFamily="Inter, sans-serif">*</text>

            {/* Row 3 */}
            <rect x="0" y="64" width="30" height="24" rx="4" fill="#334155" />
            <text x="15" y="80" fill="#f8fafc" textAnchor="middle" fontSize="10" fontWeight="bold" fontFamily="Inter, sans-serif">1</text>
            <rect x="40" y="64" width="30" height="24" rx="4" fill="#334155" />
            <text x="55" y="80" fill="#f8fafc" textAnchor="middle" fontSize="10" fontWeight="bold" fontFamily="Inter, sans-serif">2</text>
            <rect x="80" y="64" width="30" height="24" rx="4" fill="#334155" />
            <text x="95" y="80" fill="#f8fafc" textAnchor="middle" fontSize="10" fontWeight="bold" fontFamily="Inter, sans-serif">3</text>
            <rect x="120" y="64" width="30" height="24" rx="4" fill="#f59e0b" />
            <text x="135" y="81" fill="#ffffff" textAnchor="middle" fontSize="12" fontWeight="bold" fontFamily="Inter, sans-serif">-</text>
          </g>
        </svg>
      );

    case 'switch-statement':
      return (
        <svg viewBox="0 0 400 200" className="w-full max-w-md mx-auto rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 p-4 shadow-sm">
          <defs>
            <marker id="sw-arrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
              <path d="M 0 0 L 10 5 L 0 10 z" fill="#6366f1" />
            </marker>
          </defs>

          <rect x="20" y="85" width="80" height="30" rx="6" fill="#6366f1" />
          <text x="60" y="104" fill="#ffffff" textAnchor="middle" fontSize="10" fontWeight="bold" fontFamily="JetBrains Mono, monospace">choice = 2</text>

          {/* Switch distributor */}
          <path d="M 100 100 L 150 100" fill="none" stroke="#6366f1" strokeWidth="2" markerEnd="url(#sw-arrow)" />

          {/* Paths */}
          <path d="M 150 100 L 180 40 L 220 40" fill="none" stroke="#94a3b8" strokeWidth="1.5" markerEnd="url(#sw-arrow)" />
          <text x="175" y="55" fill="#64748b" fontSize="9" fontFamily="Inter, sans-serif">case 1</text>
          <rect x="225" y="25" width="130" height="28" rx="4" fill="#1e293b" stroke="#334155" strokeWidth="1" />
          <text x="290" y="42" fill="#94a3b8" textAnchor="middle" fontSize="10" fontFamily="JetBrains Mono, monospace">Print "One"</text>

          <path d="M 150 100 L 220 100" fill="none" stroke="#10b981" strokeWidth="2.5" markerEnd="url(#sw-arrow)" />
          <text x="175" y="92" fill="#10b981" fontSize="10" fontWeight="bold" fontFamily="Inter, sans-serif">case 2</text>
          <rect x="225" y="85" width="130" height="30" rx="4" fill="#1e293b" stroke="#10b981" strokeWidth="2" />
          <text x="290" y="104" fill="#ffffff" textAnchor="middle" fontSize="10.5" fontWeight="bold" fontFamily="JetBrains Mono, monospace">Print "Two" ✓</text>

          <path d="M 150 100 L 180 160 L 220 160" fill="none" stroke="#94a3b8" strokeWidth="1.5" markerEnd="url(#sw-arrow)" />
          <text x="175" y="148" fill="#64748b" fontSize="9" fontFamily="Inter, sans-serif">default</text>
          <rect x="225" y="145" width="130" height="28" rx="4" fill="#1e293b" stroke="#334155" strokeWidth="1" />
          <text x="290" y="162" fill="#94a3b8" textAnchor="middle" fontSize="10" fontFamily="JetBrains Mono, monospace">Print "Invalid"</text>
        </svg>
      );

    case 'for-loop':
      return (
        <svg viewBox="0 0 400 220" className="w-full max-w-md mx-auto rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 p-4 shadow-sm">
          <defs>
            <marker id="loop-arrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
              <path d="M 0 0 L 10 5 L 0 10 z" fill="#6366f1" />
            </marker>
          </defs>

          {/* Title */}
          <text x="200" y="22" fill="#4f46e5" textAnchor="middle" fontSize="12" fontWeight="bold" fontFamily="JetBrains Mono, monospace">for(int i=0; i&lt;3; i++)</text>

          {/* Loop Cycle */}
          <g transform="translate(45, 40)">
            {/* Box 1: Init */}
            <rect x="0" y="15" width="85" height="34" rx="6" fill="#1e293b" stroke="#6366f1" strokeWidth="1.5" />
            <text x="42.5" y="36" fill="#f8fafc" textAnchor="middle" fontSize="10" fontFamily="JetBrains Mono, monospace">1. Init: i = 0</text>
            
            <line x1="85" y1="32" x2="114" y2="32" stroke="#6366f1" strokeWidth="1.5" markerEnd="url(#loop-arrow)" />

            {/* Box 2: Condition */}
            <polygon points="150,10 190,32 150,54 110,32" fill="#f59e0b" fillOpacity="0.1" stroke="#f59e0b" strokeWidth="1.5" />
            <text x="150" y="36" fill="#f59e0b" textAnchor="middle" fontSize="9" fontWeight="bold" fontFamily="Inter, sans-serif">2. i &lt; 3?</text>

            <line x1="150" y1="54" x2="150" y2="94" stroke="#10b981" strokeWidth="1.5" markerEnd="url(#loop-arrow)" />
            <text x="158" y="76" fill="#10b981" fontSize="9.5" fontWeight="bold" fontFamily="Inter, sans-serif">TRUE</text>

            {/* Box 3: Body */}
            <rect x="95" y="95" width="110" height="34" rx="6" fill="#1e293b" stroke="#10b981" strokeWidth="1.5" />
            <text x="150" y="116" fill="#f8fafc" textAnchor="middle" fontSize="9.5" fontFamily="JetBrains Mono, monospace">3. Run Loop Body</text>

            <line x1="150" y1="129" x2="150" y2="154" stroke="#8b5cf6" strokeWidth="1.5" markerEnd="url(#loop-arrow)" />

            {/* Box 4: Increment */}
            <rect x="95" y="155" width="110" height="34" rx="6" fill="#1e293b" stroke="#8b5cf6" strokeWidth="1.5" />
            <text x="150" y="176" fill="#ffffff" textAnchor="middle" fontSize="9.5" fontFamily="JetBrains Mono, monospace">4. Update: i++</text>

            {/* Path loop back */}
            <path d="M 95 172 L 40 172 L 40 55 C 40 55, 60 55, 110 37" fill="none" stroke="#6366f1" strokeWidth="1.5" strokeDasharray="3" markerEnd="url(#loop-arrow)" />

            {/* Exit Arrow */}
            <line x1="190" y1="32" x2="244" y2="32" stroke="#ef4444" strokeWidth="1.5" markerEnd="url(#loop-arrow)" />
            <text x="210" y="24" fill="#ef4444" fontSize="9" fontWeight="bold" fontFamily="Inter, sans-serif">FALSE</text>

            <rect x="250" y="15" width="60" height="34" rx="6" fill="#ef4444" fillOpacity="0.1" stroke="#ef4444" strokeWidth="1.5" />
            <text x="280" y="36" fill="#ef4444" textAnchor="middle" fontSize="10" fontWeight="bold" fontFamily="Inter, sans-serif">Exit</text>
          </g>
        </svg>
      );

    case 'while-loop':
      return (
        <svg viewBox="0 0 400 200" className="w-full max-w-md mx-auto rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 p-4 shadow-sm">
          <defs>
            <marker id="w-loop-arrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
              <path d="M 0 0 L 10 5 L 0 10 z" fill="#6366f1" />
            </marker>
          </defs>

          {/* Title */}
          <text x="200" y="22" fill="#4f46e5" textAnchor="middle" fontSize="12" fontWeight="bold" fontFamily="JetBrains Mono, monospace">while (condition == true)</text>

          <g transform="translate(60, 40)">
            {/* Condition check */}
            <polygon points="120,10 170,32 120,54 70,32" fill="#f59e0b" fillOpacity="0.1" stroke="#f59e0b" strokeWidth="1.5" />
            <text x="120" y="36" fill="#f59e0b" textAnchor="middle" fontSize="9" fontWeight="bold" fontFamily="Inter, sans-serif">Condition?</text>

            {/* Loop Body */}
            <line x1="120" y1="54" x2="120" y2="84" stroke="#10b981" strokeWidth="1.5" markerEnd="url(#w-loop-arrow)" />
            <text x="128" y="70" fill="#10b981" fontSize="9" fontWeight="bold" fontFamily="Inter, sans-serif">TRUE</text>

            <rect x="70" y="85" width="100" height="30" rx="6" fill="#1e293b" stroke="#10b981" strokeWidth="1.5" />
            <text x="120" y="104" fill="#f8fafc" textAnchor="middle" fontSize="9.5" fontFamily="JetBrains Mono, monospace">Execute Body</text>

            {/* Loop Back */}
            <path d="M 70 100 L 30 100 L 30 32 L 64 32" fill="none" stroke="#6366f1" strokeWidth="1.5" strokeDasharray="3" markerEnd="url(#w-loop-arrow)" />

            {/* Exit */}
            <line x1="170" y1="32" x2="224" y2="32" stroke="#ef4444" strokeWidth="1.5" markerEnd="url(#w-loop-arrow)" />
            <text x="192" y="24" fill="#ef4444" fontSize="9" fontWeight="bold" fontFamily="Inter, sans-serif">FALSE</text>

            <rect x="230" y="16" width="50" height="30" rx="6" fill="#ef4444" fillOpacity="0.1" stroke="#ef4444" strokeWidth="1.5" />
            <text x="255" y="35" fill="#ef4444" textAnchor="middle" fontSize="10" fontWeight="bold" fontFamily="Inter, sans-serif">Exit</text>
          </g>
        </svg>
      );

    case 'do-while-loop':
      return (
        <svg viewBox="0 0 400 200" className="w-full max-w-md mx-auto rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 p-4 shadow-sm">
          <defs>
            <marker id="dw-loop-arrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
              <path d="M 0 0 L 10 5 L 0 10 z" fill="#6366f1" />
            </marker>
          </defs>

          {/* Title */}
          <text x="200" y="22" fill="#4f46e5" textAnchor="middle" fontSize="12" fontWeight="bold" fontFamily="JetBrains Mono, monospace">do &#123; body &#125; while(condition);</text>

          <g transform="translate(60, 35)">
            {/* Step 1: Body is executed directly */}
            <rect x="70" y="10" width="100" height="30" rx="6" fill="#1e293b" stroke="#6366f1" strokeWidth="1.5" />
            <text x="120" y="29" fill="#f8fafc" textAnchor="middle" fontSize="9.5" fontFamily="JetBrains Mono, monospace">1. Run Body First</text>

            <line x1="120" y1="40" x2="120" y2="69" stroke="#6366f1" strokeWidth="1.5" markerEnd="url(#dw-loop-arrow)" />

            {/* Step 2: Condition is checked after */}
            <polygon points="120,70 170,92 120,114 70,92" fill="#f59e0b" fillOpacity="0.1" stroke="#f59e0b" strokeWidth="1.5" />
            <text x="120" y="96" fill="#f59e0b" textAnchor="middle" fontSize="9.5" fontWeight="bold" fontFamily="Inter, sans-serif">2. Condition?</text>

            {/* Loop Back if true */}
            <path d="M 70 92 L 30 92 L 30 25 L 64 25" fill="none" stroke="#10b981" strokeWidth="2" markerEnd="url(#dw-loop-arrow)" />
            <text x="40" y="82" fill="#10b981" fontSize="9" fontWeight="bold" fontFamily="Inter, sans-serif">TRUE</text>

            {/* Exit if false */}
            <line x1="120" y1="114" x2="120" y2="140" stroke="#ef4444" strokeWidth="1.5" markerEnd="url(#dw-loop-arrow)" />
            <text x="128" y="130" fill="#ef4444" fontSize="9" fontWeight="bold" fontFamily="Inter, sans-serif">FALSE</text>

            <rect x="70" y="145" width="100" height="24" rx="4" fill="#ef4444" fillOpacity="0.1" stroke="#ef4444" strokeWidth="1" />
            <text x="120" y="160" fill="#ef4444" textAnchor="middle" fontSize="10" fontWeight="bold" fontFamily="Inter, sans-serif">Exit Loop</text>
          </g>
        </svg>
      );

    case 'multiplication-table':
      return (
        <svg viewBox="0 0 400 200" className="w-full max-w-md mx-auto rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 p-4 shadow-sm">
          <text x="200" y="22" fill="#1e293b" className="dark:fill-slate-200" textAnchor="middle" fontSize="13" fontWeight="bold" fontFamily="Inter, sans-serif">Multiplication Table Grid (N = 5)</text>

          <g transform="translate(50, 40)" fontFamily="JetBrains Mono, monospace">
            {/* Header */}
            <rect x="0" y="0" width="300" height="24" fill="#4f46e5" rx="4" />
            <text x="40" y="16" fill="#ffffff" fontSize="10" fontWeight="bold" textAnchor="middle">Equation</text>
            <text x="150" y="16" fill="#ffffff" fontSize="10" fontWeight="bold" textAnchor="middle">Calculation</text>
            <text x="260" y="16" fill="#ffffff" fontSize="10" fontWeight="bold" textAnchor="middle">Result</text>

            {/* Row 1 */}
            <rect x="0" y="28" width="300" height="24" fill="#1e293b" stroke="#334155" rx="4" />
            <text x="40" y="44" fill="#38bdf8" fontSize="11" textAnchor="middle">5 x 1</text>
            <text x="150" y="44" fill="#94a3b8" fontSize="10.5" textAnchor="middle">5</text>
            <text x="260" y="44" fill="#10b981" fontSize="11" fontWeight="bold" textAnchor="middle">5</text>

            {/* Row 2 */}
            <rect x="0" y="56" width="300" height="24" fill="#1e293b" stroke="#334155" rx="4" />
            <text x="40" y="72" fill="#38bdf8" fontSize="11" textAnchor="middle">5 x 2</text>
            <text x="150" y="72" fill="#94a3b8" fontSize="10.5" textAnchor="middle">5 + 5</text>
            <text x="260" y="72" fill="#10b981" fontSize="11" fontWeight="bold" textAnchor="middle">10</text>

            {/* Row 3 */}
            <rect x="0" y="88" width="300" height="24" fill="#1e293b" stroke="#334155" rx="4" />
            <text x="40" y="104" fill="#38bdf8" fontSize="11" textAnchor="middle">5 x 3</text>
            <text x="150" y="104" fill="#94a3b8" fontSize="10.5" textAnchor="middle">10 + 5</text>
            <text x="260" y="104" fill="#10b981" fontSize="11" fontWeight="bold" textAnchor="middle">15</text>

            {/* Row 4 */}
            <rect x="0" y="120" width="300" height="24" fill="#1e293b" stroke="#334155" rx="4" />
            <text x="40" y="136" fill="#38bdf8" fontSize="11" textAnchor="middle">5 x 4</text>
            <text x="150" y="136" fill="#94a3b8" fontSize="10.5" textAnchor="middle">15 + 5</text>
            <text x="260" y="136" fill="#10b981" fontSize="11" fontWeight="bold" textAnchor="middle">20</text>
          </g>
        </svg>
      );

    case 'reverse-number':
      return (
        <svg viewBox="0 0 400 200" className="w-full max-w-md mx-auto rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 p-4 shadow-sm">
          <defs>
            <marker id="rev-arrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
              <path d="M 0 0 L 10 5 L 0 10 z" fill="#8b5cf6" />
            </marker>
          </defs>

          {/* Original */}
          <g transform="translate(35, 60)">
            <rect x="0" y="0" width="100" height="50" rx="8" fill="#1e293b" stroke="#3b82f6" strokeWidth="2" />
            <text x="50" y="32" fill="#3b82f6" textAnchor="middle" fontSize="20" fontWeight="bold" fontFamily="JetBrains Mono, monospace">429</text>
            <text x="50" y="66" fill="#64748b" textAnchor="middle" fontSize="10.5" fontFamily="Inter, sans-serif">Original Number</text>
          </g>

          {/* Process flow */}
          <path d="M 150 85 L 235 85" fill="none" stroke="#8b5cf6" strokeWidth="2" strokeDasharray="3" markerEnd="url(#rev-arrow)" />
          <text x="192.5" y="75" fill="#8b5cf6" textAnchor="middle" fontSize="9" fontWeight="bold" fontFamily="Inter, sans-serif">Digit Extraction</text>

          {/* Reversed */}
          <g transform="translate(255, 60)">
            <rect x="0" y="0" width="100" height="50" rx="8" fill="#1e293b" stroke="#10b981" strokeWidth="2" />
            <text x="50" y="32" fill="#10b981" textAnchor="middle" fontSize="20" fontWeight="bold" fontFamily="JetBrains Mono, monospace">924</text>
            <text x="50" y="66" fill="#10b981" textAnchor="middle" fontSize="10.5" fontFamily="Inter, sans-serif">Reversed (9→2→4)</text>
          </g>
        </svg>
      );

    case 'palindrome-number':
      return (
        <svg viewBox="0 0 400 200" className="w-full max-w-md mx-auto rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 p-4 shadow-sm">
          <text x="200" y="25" fill="#1e293b" className="dark:fill-slate-200" textAnchor="middle" fontSize="13" fontWeight="bold" fontFamily="Inter, sans-serif">Palindrome Check (Reads same forwards/backwards)</text>

          {/* Palindrome match */}
          <g transform="translate(25, 45)">
            <rect x="0" y="0" width="160" height="120" rx="8" fill="#1e293b" stroke="#10b981" strokeWidth="2" />
            <rect x="0" y="0" width="160" height="26" rx="8" fill="#10b981" />
            <text x="80" y="17" fill="#ffffff" textAnchor="middle" fontSize="10.5" fontWeight="bold" fontFamily="Inter, sans-serif">PALINDROME</text>

            <text x="80" y="55" fill="#ffffff" textAnchor="middle" fontSize="14" fontFamily="JetBrains Mono, monospace">121</text>
            <text x="80" y="75" fill="#94a3b8" textAnchor="middle" fontSize="9" fontFamily="Inter, sans-serif">Reverse:</text>
            <text x="80" y="95" fill="#10b981" textAnchor="middle" fontSize="14" fontWeight="bold" fontFamily="JetBrains Mono, monospace">121</text>
            <text x="80" y="112" fill="#10b981" textAnchor="middle" fontSize="9" fontWeight="bold" fontFamily="Inter, sans-serif">MATCH ✅</text>
          </g>

          {/* Palindrome non-match */}
          <g transform="translate(215, 45)">
            <rect x="0" y="0" width="160" height="120" rx="8" fill="#1e293b" stroke="#ef4444" strokeWidth="1.5" />
            <rect x="0" y="0" width="160" height="26" rx="8" fill="#ef4444" />
            <text x="80" y="17" fill="#ffffff" textAnchor="middle" fontSize="10.5" fontWeight="bold" fontFamily="Inter, sans-serif">NOT A PALINDROME</text>

            <text x="80" y="55" fill="#ffffff" textAnchor="middle" fontSize="14" fontFamily="JetBrains Mono, monospace">123</text>
            <text x="80" y="75" fill="#94a3b8" textAnchor="middle" fontSize="9" fontFamily="Inter, sans-serif">Reverse:</text>
            <text x="80" y="95" fill="#ef4444" textAnchor="middle" fontSize="14" fontWeight="bold" fontFamily="JetBrains Mono, monospace">321</text>
            <text x="80" y="112" fill="#ef4444" textAnchor="middle" fontSize="9" fontWeight="bold" fontFamily="Inter, sans-serif">NO MATCH ❌</text>
          </g>
        </svg>
      );

    case 'armstrong-number':
      return (
        <svg viewBox="0 0 400 200" className="w-full max-w-md mx-auto rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 p-4 shadow-sm">
          <text x="200" y="25" fill="#1e293b" className="dark:fill-slate-200" textAnchor="middle" fontSize="13" fontWeight="bold" fontFamily="Inter, sans-serif">Armstrong Check (Sum of Cubes of Digits)</text>

          <g transform="translate(50, 45)" fontFamily="JetBrains Mono, monospace">
            {/* Number 153 */}
            <rect x="0" y="5" width="80" height="40" rx="6" fill="#1e293b" stroke="#6366f1" strokeWidth="1.5" />
            <text x="40" y="30" fill="#f8fafc" textAnchor="middle" fontSize="18" fontWeight="bold">153</text>
            <text x="40" y="58" fill="#64748b" textAnchor="middle" fontSize="9" fontFamily="Inter, sans-serif">3 Digits</text>

            {/* Math operator */}
            <text x="115" y="30" fill="#f59e0b" fontSize="24" textAnchor="middle" fontFamily="Inter, sans-serif">=</text>

            {/* Sum equation */}
            <rect x="140" y="5" width="160" height="40" rx="6" fill="#1e293b" stroke="#f59e0b" strokeWidth="1.5" />
            <text x="220" y="30" fill="#f59e0b" textAnchor="middle" fontSize="14" fontWeight="bold">1³ + 5³ + 3³</text>
            
            {/* Sum Breakdown */}
            <rect x="90" y="75" width="210" height="40" rx="6" fill="#10b981" fillOpacity="0.1" stroke="#10b981" strokeWidth="1.5" />
            <text x="195" y="100" fill="#10b981" textAnchor="middle" fontSize="13.5" fontWeight="bold">1 + 125 + 27 = 153 ✓</text>
            <text x="195" y="132" fill="#10b981" textAnchor="middle" fontSize="10" fontWeight="bold" fontFamily="Inter, sans-serif">Armstrong Number! (Sum == Original)</text>
          </g>
        </svg>
      );

    case 'prime-check':
      return (
        <svg viewBox="0 0 400 200" className="w-full max-w-md mx-auto rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 p-4 shadow-sm">
          <text x="200" y="25" fill="#1e293b" className="dark:fill-slate-200" textAnchor="middle" fontSize="13" fontWeight="bold" fontFamily="Inter, sans-serif">Prime Checking Divisibility (N = 11)</text>

          <g transform="translate(25, 45)" fontFamily="JetBrains Mono, monospace">
            {/* Test Case */}
            <rect x="0" y="15" width="90" height="80" rx="6" fill="#1e293b" stroke="#6366f1" strokeWidth="1.5" />
            <text x="45" y="45" fill="#ffffff" textAnchor="middle" fontSize="22" fontWeight="bold">11</text>
            <text x="45" y="75" fill="#94a3b8" textAnchor="middle" fontSize="9" fontFamily="Inter, sans-serif">Input Number</text>

            {/* Divisions list */}
            <g transform="translate(110, 0)" fontSize="10">
              <rect x="0" y="0" width="240" height="22" fill="#1e293b" rx="4" />
              <text x="10" y="14" fill="#e2e8f0">11 % 2 == 1</text>
              <text x="140" y="14" fill="#10b981">Not divisible ✓</text>

              <rect x="0" y="26" width="240" height="22" fill="#1e293b" rx="4" />
              <text x="10" y="40" fill="#e2e8f0">11 % 3 == 2</text>
              <text x="140" y="40" fill="#10b981">Not divisible ✓</text>

              <rect x="0" y="52" width="240" height="22" fill="#1e293b" rx="4" />
              <text x="10" y="66" fill="#e2e8f0">11 % 4 == 3</text>
              <text x="140" y="66" fill="#10b981">Not divisible ✓</text>

              {/* Status */}
              <rect x="0" y="80" width="240" height="30" fill="#10b981" rx="4" />
              <text x="120" y="99" fill="#ffffff" textAnchor="middle" fontSize="11" fontWeight="bold" fontFamily="Inter, sans-serif">No factors found up to √11 → PRIME!</text>
            </g>
          </g>
        </svg>
      );

    case 'gcd-lcm':
      return (
        <svg viewBox="0 0 400 200" className="w-full max-w-md mx-auto rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 p-4 shadow-sm">
          <text x="200" y="25" fill="#1e293b" className="dark:fill-slate-200" textAnchor="middle" fontSize="13" fontWeight="bold" fontFamily="Inter, sans-serif">GCD & LCM (A = 12, B = 18)</text>

          {/* GCD Section */}
          <g transform="translate(30, 45)">
            <rect x="0" y="0" width="150" height="120" rx="8" fill="#1e293b" stroke="#6366f1" strokeWidth="1.5" />
            <rect x="0" y="0" width="150" height="26" rx="8" fill="#6366f1" />
            <text x="75" y="17" fill="#ffffff" textAnchor="middle" fontSize="11" fontWeight="bold" fontFamily="Inter, sans-serif">GCD (Greatest Divisor)</text>

            <text x="75" y="55" fill="#94a3b8" textAnchor="middle" fontSize="9" fontFamily="Inter, sans-serif">Factors of 12: 1, 2, 3, 4, [6], 12</text>
            <text x="75" y="75" fill="#94a3b8" textAnchor="middle" fontSize="9" fontFamily="Inter, sans-serif">Factors of 18: 1, 2, 3, [6], 9, 18</text>
            
            <circle cx="75" cy="100" r="12" fill="#e0e7ff" />
            <text x="75" y="104" fill="#4f46e5" textAnchor="middle" fontSize="13" fontWeight="bold" fontFamily="JetBrains Mono, monospace">6</text>
          </g>

          {/* LCM Section */}
          <g transform="translate(220, 45)">
            <rect x="0" y="0" width="150" height="120" rx="8" fill="#1e293b" stroke="#10b981" strokeWidth="1.5" />
            <rect x="0" y="0" width="150" height="26" rx="8" fill="#10b981" />
            <text x="75" y="17" fill="#ffffff" textAnchor="middle" fontSize="11" fontWeight="bold" fontFamily="Inter, sans-serif">LCM (Least Multiple)</text>

            <text x="75" y="55" fill="#94a3b8" textAnchor="middle" fontSize="9" fontFamily="Inter, sans-serif">Multiples of 12: 12, 24, [36], 48...</text>
            <text x="75" y="75" fill="#94a3b8" textAnchor="middle" fontSize="9" fontFamily="Inter, sans-serif">Multiples of 18: 18, [36], 54, 72...</text>
            
            <circle cx="75" cy="100" r="12" fill="#d1fae5" />
            <text x="75" y="104" fill="#065f46" textAnchor="middle" fontSize="13" fontWeight="bold" fontFamily="JetBrains Mono, monospace">36</text>
          </g>
        </svg>
      );

    case 'fibonacci-series':
      return (
        <svg viewBox="0 0 400 200" className="w-full max-w-md mx-auto rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 p-4 shadow-sm">
          <text x="200" y="25" fill="#1e293b" className="dark:fill-slate-200" textAnchor="middle" fontSize="13" fontWeight="bold" fontFamily="Inter, sans-serif">Fibonacci Addition Sequence</text>

          <g transform="translate(30, 50)" fontFamily="JetBrains Mono, monospace" fontSize="14">
            {/* Box 0 */}
            <rect x="0" y="10" width="45" height="45" rx="6" fill="#1e293b" stroke="#334155" />
            <text x="22.5" y="38" fill="#f8fafc" textAnchor="middle">0</text>
            <text x="22.5" y="68" fill="#64748b" fontSize="8" fontFamily="Inter, sans-serif" textAnchor="middle">f(0)</text>

            <text x="57" y="38" fill="#f59e0b" fontFamily="Inter, sans-serif">+</text>

            {/* Box 1 */}
            <rect x="70" y="10" width="45" height="45" rx="6" fill="#1e293b" stroke="#334155" />
            <text x="92.5" y="38" fill="#f8fafc" textAnchor="middle">1</text>
            <text x="92.5" y="68" fill="#64748b" fontSize="8" fontFamily="Inter, sans-serif" textAnchor="middle">f(1)</text>

            <text x="127" y="38" fill="#f59e0b" fontFamily="Inter, sans-serif">=</text>

            {/* Box 2 */}
            <rect x="140" y="10" width="45" height="45" rx="6" fill="#1e293b" stroke="#10b981" strokeWidth="2" />
            <text x="162.5" y="38" fill="#10b981" textAnchor="middle" fontWeight="bold">1</text>
            <text x="162.5" y="68" fill="#10b981" fontSize="8" fontFamily="Inter, sans-serif" textAnchor="middle">f(2)</text>

            <text x="197" y="38" fill="#f59e0b" fontFamily="Inter, sans-serif">+</text>

            {/* Box 3 */}
            <rect x="210" y="10" width="45" height="45" rx="6" fill="#1e293b" stroke="#334155" />
            <text x="232.5" y="38" fill="#f8fafc" textAnchor="middle">1</text>
            <text x="232.5" y="68" fill="#64748b" fontSize="8" fontFamily="Inter, sans-serif" textAnchor="middle">f(3)</text>

            <text x="267" y="38" fill="#f59e0b" fontFamily="Inter, sans-serif">=</text>

            {/* Box 4 */}
            <rect x="280" y="10" width="45" height="45" rx="6" fill="#1e293b" stroke="#8b5cf6" strokeWidth="2" />
            <text x="302.5" y="38" fill="#8b5cf6" textAnchor="middle" fontWeight="bold">2</text>
            <text x="302.5" y="68" fill="#8b5cf6" fontSize="8" fontFamily="Inter, sans-serif" textAnchor="middle">f(4)</text>

            {/* Process description */}
            <rect x="0" y="95" width="340" height="30" fill="#e0e7ff" rx="6" />
            <text x="170" y="114" fill="#4f46e5" fontSize="10.5" fontWeight="bold" fontFamily="Inter, sans-serif" textAnchor="middle">Next Number = Sum of the previous two numbers</text>
          </g>
        </svg>
      );

    case 'functions-basics':
      return (
        <svg viewBox="0 0 400 200" className="w-full max-w-md mx-auto rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 p-4 shadow-sm">
          <defs>
            <marker id="func-arrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
              <path d="M 0 0 L 10 5 L 0 10 z" fill="#6366f1" />
            </marker>
          </defs>

          {/* Caller main() */}
          <rect x="25" y="40" width="130" height="120" rx="8" fill="#1e293b" stroke="#6366f1" strokeWidth="1.5" />
          <rect x="25" y="40" width="130" height="24" rx="8" fill="#6366f1" />
          <text x="90" y="56" fill="#ffffff" textAnchor="middle" fontSize="11" fontWeight="bold" fontFamily="Inter, sans-serif">Caller: main()</text>
          <text x="35" y="90" fill="#94a3b8" fontSize="10" fontFamily="JetBrains Mono, monospace">int x = add(5, 8);</text>

          {/* Callee add() */}
          <rect x="245" y="40" width="130" height="120" rx="8" fill="#1e293b" stroke="#10b981" strokeWidth="1.5" />
          <rect x="245" y="40" width="130" height="24" rx="8" fill="#10b981" />
          <text x="310" y="56" fill="#ffffff" textAnchor="middle" fontSize="11" fontWeight="bold" fontFamily="Inter, sans-serif">Callee: add(a, b)</text>
          <text x="255" y="90" fill="#94a3b8" fontSize="10" fontFamily="JetBrains Mono, monospace">a = 5, b = 8</text>
          <text x="255" y="120" fill="#10b981" fontSize="10.5" fontFamily="JetBrains Mono, monospace">return a + b; (13)</text>

          {/* Arrows */}
          <path d="M 155 85 L 234 85" fill="none" stroke="#6366f1" strokeWidth="2" markerEnd="url(#func-arrow)" />
          <text x="195" y="76" fill="#6366f1" textAnchor="middle" fontSize="9" fontWeight="bold" fontFamily="Inter, sans-serif">Call parameters</text>

          <path d="M 245 125 L 166 125" fill="none" stroke="#10b981" strokeWidth="2" strokeDasharray="3" markerEnd="url(#func-arrow)" />
          <text x="195" y="142" fill="#10b981" textAnchor="middle" fontSize="9" fontWeight="bold" fontFamily="Inter, sans-serif">Return value (13)</text>
        </svg>
      );

    case 'arrays-basics':
      return (
        <svg viewBox="0 0 400 200" className="w-full max-w-md mx-auto rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 p-4 shadow-sm">
          <text x="200" y="25" fill="#1e293b" className="dark:fill-slate-200" textAnchor="middle" fontSize="13" fontWeight="bold" fontFamily="Inter, sans-serif">1D Array Structure (int arr[5])</text>

          <g transform="translate(30, 50)" fontFamily="JetBrains Mono, monospace">
            {/* Box elements */}
            {[10, 24, 75, 42, 99].map((val, idx) => {
              const xPos = idx * 65;
              return (
                <g key={idx} transform={`translate(${xPos}, 15)`}>
                  <rect x="0" y="0" width="55" height="50" rx="6" fill="#1e293b" stroke="#6366f1" strokeWidth="1.5" />
                  <text x="27.5" y="32" fill="#ffffff" textAnchor="middle" fontSize="15" fontWeight="bold">{val}</text>
                  <text x="27.5" y="-6" fill="#64748b" textAnchor="middle" fontSize="9.5" fontFamily="Inter, sans-serif">arr[{idx}]</text>
                  <text x="27.5" y="65" fill="#94a3b8" textAnchor="middle" fontSize="9">100{idx * 4}</text>
                </g>
              );
            })}
            
            <text x="-5" y="-12" fill="#64748b" fontSize="8.5" fontFamily="Inter, sans-serif">Indices:</text>
            <text x="-5" y="80" fill="#94a3b8" fontSize="8.5" fontFamily="Inter, sans-serif">Addresses:</text>
          </g>
        </svg>
      );

    case 'arrays-2d-matrix':
      return (
        <svg viewBox="0 0 400 200" className="w-full max-w-md mx-auto rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 p-4 shadow-sm">
          <text x="200" y="22" fill="#1e293b" className="dark:fill-slate-200" textAnchor="middle" fontSize="13" fontWeight="bold" fontFamily="Inter, sans-serif">2D Array Matrix Grid (3 x 3)</text>

          <g transform="translate(110, 40)" fontFamily="JetBrains Mono, monospace">
            {/* Grid rows */}
            {[[1, 2, 3], [4, 5, 6], [7, 8, 9]].map((row, rIdx) => {
              const yPos = rIdx * 45;
              return (
                <g key={rIdx} transform={`translate(0, ${yPos})`}>
                  {row.map((val, cIdx) => {
                    const xPos = cIdx * 55;
                    return (
                      <g key={cIdx} transform={`translate(${xPos}, 0)`}>
                        <rect x="0" y="0" width="45" height="35" rx="4" fill="#1e293b" stroke="#3b82f6" strokeWidth="1.5" />
                        <text x="22.5" y="22" fill="#ffffff" textAnchor="middle" fontSize="13">{val}</text>
                        <text x="22.5" y="32" fill="#94a3b8" textAnchor="middle" fontSize="7" fontFamily="Inter, sans-serif">[{rIdx}][{cIdx}]</text>
                      </g>
                    );
                  })}
                </g>
              );
            })}
          </g>
        </svg>
      );

    case 'strings-operations':
    case 'strings-vowel-count':
      return (
        <svg viewBox="0 0 400 200" className="w-full max-w-md mx-auto rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 p-4 shadow-sm">
          <text x="200" y="25" fill="#1e293b" className="dark:fill-slate-200" textAnchor="middle" fontSize="13" fontWeight="bold" fontFamily="Inter, sans-serif">String Null-Terminated Character Array</text>

          <g transform="translate(25, 50)" fontFamily="JetBrains Mono, monospace">
            {/* Char boxes */}
            {['H', 'e', 'l', 'l', 'o', '\\0'].map((char, idx) => {
              const xPos = idx * 58;
              const isNull = char === '\\0';
              return (
                <g key={idx} transform={`translate(${xPos}, 15)`}>
                  <rect x="0" y="0" width="48" height="48" rx="6" fill="#1e293b" stroke={isNull ? '#ef4444' : '#8b5cf6'} strokeWidth="1.5" />
                  <text x="24" y="30" fill={isNull ? '#ef4444' : '#ffffff'} textAnchor="middle" fontSize={isNull ? 14 : 18} fontWeight="bold">{char}</text>
                  <text x="24" y="58" fill="#64748b" textAnchor="middle" fontSize="9" fontFamily="Inter, sans-serif">str[{idx}]</text>
                </g>
              );
            })}
            <text x="174" y="112" fill="#ef4444" textAnchor="middle" fontSize="9.5" fontWeight="bold" fontFamily="Inter, sans-serif">Null Terminator (Ends C Strings)</text>
          </g>
        </svg>
      );

    case 'pointers-basics':
      return (
        <svg viewBox="0 0 400 200" className="w-full max-w-md mx-auto rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 p-4 shadow-sm">
          <defs>
            <marker id="ptr-arrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M 0 0 L 10 5 L 0 10 z" fill="#10b981" />
            </marker>
          </defs>

          {/* Pointer Variable */}
          <g transform="translate(30, 50)">
            <rect x="0" y="0" width="110" height="70" rx="8" fill="#1e293b" stroke="#6366f1" strokeWidth="2" />
            <rect x="0" y="0" width="110" height="24" rx="8" fill="#6366f1" />
            <text x="55" y="16" fill="#ffffff" textAnchor="middle" fontSize="10.5" fontWeight="bold" fontFamily="Inter, sans-serif">Pointer: int *p</text>
            
            <text x="55" y="46" fill="#38bdf8" textAnchor="middle" fontSize="12" fontWeight="bold" fontFamily="JetBrains Mono, monospace">0x7ffe04</text>
            <text x="55" y="62" fill="#94a3b8" textAnchor="middle" fontSize="8.5" fontFamily="Inter, sans-serif">(Stores address of x)</text>
          </g>

          {/* Arrow pointing */}
          <path d="M 140 85 L 224 85" fill="none" stroke="#10b981" strokeWidth="2.5" markerEnd="url(#ptr-arrow)" />
          <text x="182.5" y="74" fill="#10b981" textAnchor="middle" fontSize="9" fontWeight="bold" fontFamily="Inter, sans-serif">points to</text>

          {/* Target Variable */}
          <g transform="translate(250, 50)">
            <rect x="0" y="0" width="110" height="70" rx="8" fill="#1e293b" stroke="#10b981" strokeWidth="2" />
            <rect x="0" y="0" width="110" height="24" rx="8" fill="#10b981" />
            <text x="55" y="16" fill="#ffffff" textAnchor="middle" fontSize="10.5" fontWeight="bold" fontFamily="Inter, sans-serif">Variable: int x</text>

            <text x="55" y="48" fill="#10b981" textAnchor="middle" fontSize="16" fontWeight="bold" fontFamily="JetBrains Mono, monospace">42</text>
            <text x="55" y="64" fill="#94a3b8" textAnchor="middle" fontSize="8" fontFamily="JetBrains Mono, monospace">Addr: 0x7ffe04</text>
          </g>
        </svg>
      );

    case 'towers-of-hanoi':
      return (
        <svg viewBox="0 0 400 200" className="w-full max-w-md mx-auto rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 p-4 shadow-sm">
          {/* Base */}
          <rect x="20" y="160" width="360" height="15" rx="4" fill="#475569" />

          {/* Peg A */}
          <rect x="90" y="50" width="10" height="110" rx="4" fill="#64748b" />
          <text x="95" y="185" fill="#475569" className="dark:fill-slate-400" textAnchor="middle" fontSize="10" fontWeight="bold" fontFamily="Inter, sans-serif">Peg A (Source)</text>
          
          {/* Disks on Peg A */}
          <rect x="50" y="140" width="90" height="16" rx="4" fill="#f43f5e" />
          <rect x="60" y="122" width="70" height="16" rx="4" fill="#f59e0b" />
          <rect x="70" y="104" width="50" height="16" rx="4" fill="#38bdf8" />

          {/* Peg B */}
          <rect x="200" y="50" width="10" height="110" rx="4" fill="#64748b" />
          <text x="205" y="185" fill="#475569" className="dark:fill-slate-400" textAnchor="middle" fontSize="10" fontWeight="bold" fontFamily="Inter, sans-serif">Peg B (Aux)</text>

          {/* Peg C */}
          <rect x="310" y="50" width="10" height="110" rx="4" fill="#64748b" />
          <text x="315" y="185" fill="#475569" className="dark:fill-slate-400" textAnchor="middle" fontSize="10" fontWeight="bold" fontFamily="Inter, sans-serif">Peg C (Dest)</text>
        </svg>
      );

    case 'search-linear':
      return (
        <svg viewBox="0 0 400 200" className="w-full max-w-md mx-auto rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 p-4 shadow-sm">
          <text x="200" y="25" fill="#1e293b" className="dark:fill-slate-200" textAnchor="middle" fontSize="13" fontWeight="bold" fontFamily="Inter, sans-serif">Linear Search Scanner (Target = 42)</text>

          <g transform="translate(25, 60)" fontFamily="JetBrains Mono, monospace">
            {/* Array Boxes */}
            {[12, 7, 19, 42, 8].map((val, idx) => {
              const xPos = idx * 70;
              const isMatch = val === 42;
              return (
                <g key={idx} transform={`translate(${xPos}, 0)`}>
                  <rect x="0" y="0" width="60" height="45" rx="6" fill="#1e293b" stroke={isMatch ? '#10b981' : '#cbd5e1'} strokeWidth={isMatch ? 2.5 : 1} />
                  <text x="30" y="28" fill={isMatch ? '#10b981' : '#ffffff'} textAnchor="middle" fontSize="15" fontWeight="bold">{val}</text>
                  
                  {/* Step arrow scan indicator */}
                  {idx <= 3 && (
                    <g transform="translate(20, 52)" fill={isMatch ? '#10b981' : '#8b5cf6'}>
                      <path d="M 10 5 L 10 16" stroke={isMatch ? '#10b981' : '#8b5cf6'} strokeWidth="2" />
                      <polygon points="10,0 6,6 14,6" />
                      <text x="10" y="27" fontSize="8.5" textAnchor="middle" fontFamily="Inter, sans-serif">
                        {isMatch ? 'FOUND! ✓' : `step ${idx+1}`}
                      </text>
                    </g>
                  )}
                </g>
              );
            })}
          </g>
        </svg>
      );

    case 'search-binary':
      return (
        <svg viewBox="0 0 400 200" className="w-full max-w-md mx-auto rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 p-4 shadow-sm">
          <text x="200" y="25" fill="#1e293b" className="dark:fill-slate-200" textAnchor="middle" fontSize="13" fontWeight="bold" fontFamily="Inter, sans-serif">Binary Search (Sorted Array, Target = 35)</text>

          <g transform="translate(15, 60)" fontFamily="JetBrains Mono, monospace">
            {/* Sorted Array Boxes */}
            {[5, 12, 18, 24, 35, 47].map((val, idx) => {
              const xPos = idx * 62;
              const isMid = idx === 3; // Initial Mid
              const isTarget = val === 35;
              
              return (
                <g key={idx} transform={`translate(${xPos}, 0)`}>
                  <rect x="0" y="0" width="55" height="42" rx="6" fill="#1e293b" stroke={isTarget ? '#10b981' : (isMid ? '#f59e0b' : '#334155')} strokeWidth={isTarget || isMid ? 2 : 1} />
                  <text x="27.5" y="26" fill="#ffffff" textAnchor="middle" fontSize="14" fontWeight="bold">{val}</text>
                  
                  {idx === 0 && <text x="27.5" y="-6" fill="#6366f1" textAnchor="middle" fontSize="9" fontFamily="Inter, sans-serif">Low</text>}
                  {isMid && <text x="27.5" y="-6" fill="#f59e0b" textAnchor="middle" fontSize="9" fontFamily="Inter, sans-serif">Mid</text>}
                  {idx === 5 && <text x="27.5" y="-6" fill="#6366f1" textAnchor="middle" fontSize="9" fontFamily="Inter, sans-serif">High</text>}

                  {isTarget && (
                    <g transform="translate(27.5, 52)">
                      <path d="M 0 5 L 0 16" stroke="#10b981" strokeWidth="2" />
                      <polygon points="0,0 -4,6 4,6" fill="#10b981" />
                      <text x="0" y="27" fill="#10b981" fontSize="9" textAnchor="middle" fontWeight="bold" fontFamily="Inter, sans-serif">Match! ✓</text>
                    </g>
                  )}
                </g>
              );
            })}
          </g>
        </svg>
      );

    case 'sort-bubble':
      return (
        <svg viewBox="0 0 400 200" className="w-full max-w-md mx-auto rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 p-4 shadow-sm">
          <text x="200" y="25" fill="#1e293b" className="dark:fill-slate-200" textAnchor="middle" fontSize="13" fontWeight="bold" fontFamily="Inter, sans-serif">Bubble Sort Adjacent Swap</text>

          <g transform="translate(60, 50)" fontFamily="JetBrains Mono, monospace">
            {/* Compare elements */}
            <g transform="translate(0, 15)">
              <rect x="0" y="0" width="55" height="45" rx="6" fill="#1e293b" stroke="#f43f5e" strokeWidth="2" />
              <text x="27.5" y="28" fill="#f43f5e" textAnchor="middle" fontSize="16" fontWeight="bold">9</text>
            </g>

            <g transform="translate(70, 15)">
              <rect x="0" y="0" width="55" height="45" rx="6" fill="#1e293b" stroke="#f43f5e" strokeWidth="2" />
              <text x="27.5" y="28" fill="#f43f5e" textAnchor="middle" fontSize="16" fontWeight="bold">2</text>
            </g>

            <g transform="translate(160, 15)">
              <rect x="0" y="0" width="50" height="45" rx="6" fill="#1e293b" stroke="#334155" />
              <text x="25" y="28" fill="#94a3b8" textAnchor="middle" fontSize="14">5</text>
            </g>
            <g transform="translate(220, 15)">
              <rect x="0" y="0" width="50" height="45" rx="6" fill="#1e293b" stroke="#334155" />
              <text x="25" y="28" fill="#94a3b8" textAnchor="middle" fontSize="14">8</text>
            </g>

            {/* Swap indicator */}
            <path d="M 27 -2 C 45 -12, 80 -12, 98 -2" fill="none" stroke="#f43f5e" strokeWidth="1.8" />
            <text x="62.5" y="-12" fill="#f43f5e" textAnchor="middle" fontSize="9" fontWeight="bold" fontFamily="Inter, sans-serif">Compare &amp; Swap (9 &gt; 2)</text>
          </g>
        </svg>
      );

    case 'sort-selection':
      return (
        <svg viewBox="0 0 400 200" className="w-full max-w-md mx-auto rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 p-4 shadow-sm">
          <text x="200" y="25" fill="#1e293b" className="dark:fill-slate-200" textAnchor="middle" fontSize="13" fontWeight="bold" fontFamily="Inter, sans-serif">Selection Sort: Scan for Minimum &amp; Swap</text>

          <g transform="translate(50, 45)" fontFamily="JetBrains Mono, monospace">
            {/* Array state */}
            {[8, 5, 2, 9].map((val, idx) => {
              const xPos = idx * 70;
              const isMin = val === 2;
              const isCurr = idx === 0;

              return (
                <g key={idx} transform={`translate(${xPos}, 15)`}>
                  <rect x="0" y="0" width="60" height="45" rx="6" fill="#1e293b" stroke={isMin ? '#10b981' : (isCurr ? '#3b82f6' : '#334155')} strokeWidth={isMin || isCurr ? 2 : 1} />
                  <text x="30" y="28" fill={isMin ? '#10b981' : (isCurr ? '#3b82f6' : '#ffffff')} textAnchor="middle" fontSize="16" fontWeight="bold">{val}</text>
                  
                  {isCurr && <text x="30" y="73" fill="#3b82f6" textAnchor="middle" fontSize="9.5" fontFamily="Inter, sans-serif">Index i</text>}
                  {isMin && <text x="30" y="73" fill="#10b981" textAnchor="middle" fontSize="9.5" fontFamily="Inter, sans-serif">Min found</text>}
                </g>
              );
            })}

            {/* Swap Curved Arrow */}
            <path d="M 30 5 C 60 -18, 140 -18, 170 5" fill="none" stroke="#f59e0b" strokeWidth="2" strokeDasharray="3" />
            <text x="100" y="-12" fill="#f59e0b" textAnchor="middle" fontSize="9" fontWeight="bold" fontFamily="Inter, sans-serif">Swap i with Min</text>
          </g>
        </svg>
      );

    case 'sort-insertion':
      return (
        <svg viewBox="0 0 400 200" className="w-full max-w-md mx-auto rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 p-4 shadow-sm">
          <text x="200" y="25" fill="#1e293b" className="dark:fill-slate-200" textAnchor="middle" fontSize="13" fontWeight="bold" fontFamily="Inter, sans-serif">Insertion Sort: Insert into Sorted Sublist</text>

          <g transform="translate(45, 45)" fontFamily="JetBrains Mono, monospace">
            {/* Sorted / Unsorted separator */}
            <line x1="130" y1="-10" x2="130" y2="80" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="4" />
            <text x="65" y="-14" fill="#10b981" textAnchor="middle" fontSize="9.5" fontWeight="bold" fontFamily="Inter, sans-serif">Sorted Part</text>
            <text x="200" y="-14" fill="#f43f5e" textAnchor="middle" fontSize="9.5" fontWeight="bold" fontFamily="Inter, sans-serif">Unsorted Part</text>

            {/* Cells */}
            {[3, 8, 5, 2].map((val, idx) => {
              const xPos = idx * 65;
              const isInserting = val === 5;

              return (
                <g key={idx} transform={`translate(${xPos}, 10)`}>
                  <rect x="0" y="0" width="55" height="45" rx="6" fill="#1e293b" stroke={isInserting ? '#f59e0b' : '#334155'} strokeWidth={isInserting ? 2.5 : 1} />
                  <text x="27.5" y="28" fill={isInserting ? '#f59e0b' : '#ffffff'} textAnchor="middle" fontSize="15" fontWeight="bold">{val}</text>
                </g>
              );
            })}

            {/* Insert arrow */}
            <path d="M 157 5 L 120 -15 C 100 -20, 60 -15, 60 5" fill="none" stroke="#f59e0b" strokeWidth="1.5" />
            <text x="110" y="-22" fill="#f59e0b" fontSize="8" fontWeight="bold" fontFamily="Inter, sans-serif">Insert 5 between 3 &amp; 8</text>
          </g>
        </svg>
      );

    case 'sort-merge':
      return (
        <svg viewBox="0 0 400 200" className="w-full max-w-md mx-auto rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 p-4 shadow-sm">
          <text x="200" y="25" fill="#1e293b" className="dark:fill-slate-200" textAnchor="middle" fontSize="13" fontWeight="bold" fontFamily="Inter, sans-serif">Merge Sort: Divide &amp; Conquer</text>
          
          <g transform="translate(30, 40)" fontFamily="JetBrains Mono, monospace" fontSize="11" textAnchor="middle">
            {/* Top Level */}
            <rect x="110" y="0" width="120" height="26" rx="4" fill="#1e293b" stroke="#334155" />
            <text x="170" y="17" fill="#ffffff">[38, 27, 43, 3]</text>

            {/* Split arrows */}
            <line x1="150" y1="26" x2="90" y2="52" stroke="#6366f1" strokeWidth="1" />
            <line x1="190" y1="26" x2="250" y2="52" stroke="#6366f1" strokeWidth="1" />

            {/* Level 2: Split */}
            <rect x="40" y="52" width="75" height="24" rx="4" fill="#1e293b" stroke="#6366f1" strokeWidth="1" />
            <text x="77.5" y="68" fill="#cbd5e1">[38, 27]</text>

            <rect x="225" y="52" width="75" height="24" rx="4" fill="#1e293b" stroke="#6366f1" strokeWidth="1" />
            <text x="262.5" y="68" fill="#cbd5e1">[43, 3]</text>

            {/* Split arrows to leaves */}
            <line x1="77.5" y1="76" x2="77.5" y2="104" stroke="#6366f1" strokeWidth="1" />
            <line x1="262.5" y1="76" x2="262.5" y2="104" stroke="#6366f1" strokeWidth="1" />

            {/* Level 3: Sort & Merge */}
            <rect x="40" y="104" width="75" height="24" rx="4" fill="#1e293b" stroke="#10b981" strokeWidth="1.5" />
            <text x="77.5" y="120" fill="#10b981" fontWeight="bold">[27, 38]</text>

            <rect x="225" y="104" width="75" height="24" rx="4" fill="#1e293b" stroke="#10b981" strokeWidth="1.5" />
            <text x="262.5" y="120" fill="#10b981" fontWeight="bold">[3, 43]</text>

            {/* Merge arrows back */}
            <line x1="90" y1="128" x2="150" y2="152" stroke="#10b981" strokeWidth="1.5" />
            <line x1="250" y1="128" x2="190" y2="152" stroke="#10b981" strokeWidth="1.5" />

            {/* Level 4: Merged final */}
            <rect x="110" y="152" width="120" height="26" rx="4" fill="#1e293b" stroke="#10b981" strokeWidth="2" />
            <text x="170" y="169" fill="#10b981" fontWeight="bold">[3, 27, 38, 43]</text>
          </g>
        </svg>
      );

    case 'sort-quick':
      return (
        <svg viewBox="0 0 400 200" className="w-full max-w-md mx-auto rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 p-4 shadow-sm">
          <text x="200" y="25" fill="#1e293b" className="dark:fill-slate-200" textAnchor="middle" fontSize="13" fontWeight="bold" fontFamily="Inter, sans-serif">Quick Sort Pivot Partitioning</text>

          <g transform="translate(30, 45)" fontFamily="JetBrains Mono, monospace">
            {/* Array showing Partition around Pivot */}
            {[10, 5, 12, 35, 42].map((val, idx) => {
              const xPos = idx * 68;
              const isPivot = val === 12;
              const isLess = val < 12;
              const isGreater = val > 12;
              let color = '#334155';
              let textColor = '#ffffff';
              if (isPivot) { color = '#f59e0b'; textColor = '#ffffff'; }
              else if (isLess) { color = '#10b981'; textColor = '#10b981'; }
              else if (isGreater) { color = '#6366f1'; textColor = '#6366f1'; }

              return (
                <g key={idx} transform={`translate(${xPos}, 20)`}>
                  <rect x="0" y="0" width="60" height="42" rx="6" fill="#1e293b" stroke={color} strokeWidth={isPivot ? 2.5 : 1.5} />
                  <text x="30" y="26" fill={isPivot ? '#ffffff' : textColor} textAnchor="middle" fontSize="15" fontWeight="bold">{val}</text>
                  
                  {isPivot && <text x="30" y="-8" fill="#f59e0b" textAnchor="middle" fontSize="9" fontWeight="bold" fontFamily="Inter, sans-serif">PIVOT</text>}
                  {isLess && <text x="30" y="58" fill="#10b981" textAnchor="middle" fontSize="8" fontFamily="Inter, sans-serif">Lesser</text>}
                  {isGreater && <text x="30" y="58" fill="#6366f1" textAnchor="middle" fontSize="8" fontFamily="Inter, sans-serif">Greater</text>}
                </g>
              );
            })}
          </g>
        </svg>
      );

    case 'sort-shell':
      return (
        <svg viewBox="0 0 400 200" className="w-full max-w-md mx-auto rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 p-4 shadow-sm">
          <text x="200" y="25" fill="#1e293b" className="dark:fill-slate-200" textAnchor="middle" fontSize="13" fontWeight="bold" fontFamily="Inter, sans-serif">Shell Sort: Comparison at Gap (h = 3)</text>

          <g transform="translate(15, 60)" fontFamily="JetBrains Mono, monospace">
            {[35, 12, 19, 8, 5, 20].map((val, idx) => {
              const xPos = idx * 62;
              const isCompared = idx === 0 || idx === 3;

              return (
                <g key={idx} transform={`translate(${xPos}, 15)`}>
                  <rect x="0" y="0" width="55" height="42" rx="6" fill="#1e293b" stroke={isCompared ? '#ef4444' : '#334155'} strokeWidth={isCompared ? 2 : 1} />
                  <text x="27.5" y="26" fill="#ffffff" textAnchor="middle" fontSize="14" fontWeight="bold">{val}</text>
                  <text x="27.5" y="54" fill="#64748b" textAnchor="middle" fontSize="8" fontFamily="Inter, sans-serif">idx {idx}</text>
                </g>
              );
            })}

            {/* Gap Arrow */}
            <path d="M 27 5 C 65 -25, 150 -25, 213 5" fill="none" stroke="#ef4444" strokeWidth="1.8" strokeDasharray="3" />
            <text x="120" y="-22" fill="#ef4444" textAnchor="middle" fontSize="9" fontWeight="bold" fontFamily="Inter, sans-serif">Compare (gap = 3)</text>
          </g>
        </svg>
      );

    case 'stack-array':
      return (
        <svg viewBox="0 0 400 200" className="w-full max-w-md mx-auto rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 p-4 shadow-sm">
          <text x="200" y="25" fill="#1e293b" className="dark:fill-slate-200" textAnchor="middle" fontSize="13" fontWeight="bold" fontFamily="Inter, sans-serif">Stack: Array Representation (Max Size = 5)</text>
          
          <g transform="translate(30, 45)" fontFamily="JetBrains Mono, monospace">
            <text x="10" y="55" fill="#64748b" fontSize="9.5" fontFamily="Inter, sans-serif">Stack indices &amp; cells:</text>
            
            <g transform="translate(140, 0)">
              {/* index 4 */}
              <rect x="0" y="0" width="100" height="25" fill="none" stroke="#475569" strokeDasharray="3" rx="2" />
              <text x="50" y="16" fill="#64748b" textAnchor="middle" fontSize="10">Empty</text>
              <text x="-20" y="16" fill="#64748b" fontSize="9">idx 4</text>

              {/* index 3 */}
              <rect x="0" y="28" width="100" height="25" fill="none" stroke="#475569" strokeDasharray="3" rx="2" />
              <text x="50" y="44" fill="#64748b" textAnchor="middle" fontSize="10">Empty</text>
              <text x="-20" y="44" fill="#64748b" fontSize="9">idx 3</text>

              {/* index 2 (Top) */}
              <rect x="0" y="56" width="100" height="25" rx="3" fill="#1e293b" stroke="#10b981" strokeWidth="2" />
              <text x="50" y="72" fill="#10b981" textAnchor="middle" fontSize="12" fontWeight="bold">99</text>
              <text x="-20" y="72" fill="#64748b" fontSize="9">idx 2</text>
              <text x="110" y="72" fill="#10b981" fontSize="9.5" fontWeight="bold" fontFamily="Inter, sans-serif">◀ TOP = 2</text>

              {/* index 1 */}
              <rect x="0" y="84" width="100" height="25" rx="3" fill="#1e293b" stroke="#334155" />
              <text x="50" y="100" fill="#ffffff" textAnchor="middle" fontSize="12">44</text>
              <text x="-20" y="100" fill="#64748b" fontSize="9">idx 1</text>

              {/* index 0 */}
              <rect x="0" y="112" width="100" height="25" rx="3" fill="#1e293b" stroke="#334155" />
              <text x="50" y="128" fill="#ffffff" textAnchor="middle" fontSize="12">10</text>
              <text x="-20" y="128" fill="#64748b" fontSize="9">idx 0</text>
            </g>
          </g>
        </svg>
      );

    case 'stack-linked-list':
      return (
        <svg viewBox="0 0 400 220" className="w-full max-w-md mx-auto rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 p-4 shadow-sm">
          <defs>
            <marker id="stack-list-arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
              <path d="M 0 0 L 10 5 L 0 10 z" fill="#38bdf8" />
            </marker>
          </defs>
          <text x="200" y="25" fill="#1e293b" className="dark:fill-slate-200" textAnchor="middle" fontSize="13" fontWeight="bold" fontFamily="Inter, sans-serif">Stack: Linked List Representation (TOP at Head)</text>

          <g transform="translate(150, 40)">
            <text x="-40" y="20" fill="#38bdf8" fontSize="10.5" fontWeight="bold" fontFamily="Inter, sans-serif">TOP ➜</text>

            <g transform="translate(10, 0)">
              <rect x="0" y="0" width="80" height="30" rx="4" fill="#1e293b" stroke="#38bdf8" strokeWidth="2" />
              <line x1="50" y1="0" x2="50" y2="30" stroke="#475569" />
              <text x="25" y="19" fill="#ffffff" fontSize="12" fontWeight="bold" fontFamily="JetBrains Mono, monospace">99</text>
              <circle cx="65" cy="15" r="3" fill="#38bdf8" />
            </g>

            <path d="M 75 30 L 75 52" fill="none" stroke="#38bdf8" strokeWidth="1.5" markerEnd="url(#stack-list-arrow)" />

            <g transform="translate(10, 55)">
              <rect x="0" y="0" width="80" height="30" rx="4" fill="#1e293b" stroke="#334155" />
              <line x1="50" y1="0" x2="50" y2="30" stroke="#475569" />
              <text x="25" y="19" fill="#cbd5e1" fontSize="12" fontFamily="JetBrains Mono, monospace">44</text>
              <circle cx="65" cy="15" r="3" fill="#38bdf8" />
            </g>

            <path d="M 75 85 L 75 107" fill="none" stroke="#38bdf8" strokeWidth="1.5" markerEnd="url(#stack-list-arrow)" />

            <g transform="translate(10, 110)">
              <rect x="0" y="0" width="80" height="30" rx="4" fill="#1e293b" stroke="#334155" />
              <line x1="50" y1="0" x2="50" y2="30" stroke="#475569" />
              <text x="25" y="19" fill="#cbd5e1" fontSize="12" fontFamily="JetBrains Mono, monospace">10</text>
              <circle cx="65" cy="15" r="3" fill="#38bdf8" />
            </g>

            <path d="M 75 140 L 75 162" fill="none" stroke="#94a3b8" strokeWidth="1.5" markerEnd="url(#stack-list-arrow)" />

            <rect x="50" y="165" width="50" height="20" rx="3" fill="#1e293b" stroke="#ef4444" />
            <text x="75" y="178" fill="#ef4444" textAnchor="middle" fontSize="9" fontWeight="bold" fontFamily="JetBrains Mono, monospace">NULL</text>
          </g>
        </svg>
      );

    case 'stack-push-pop':
      return (
        <svg viewBox="0 0 400 200" className="w-full max-w-md mx-auto rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 p-4 shadow-sm">
          <defs>
            <marker id="push-arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
              <path d="M 0 0 L 10 5 L 0 10 z" fill="#10b981" />
            </marker>
            <marker id="pop-arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
              <path d="M 0 0 L 10 5 L 0 10 z" fill="#ef4444" />
            </marker>
          </defs>
          <text x="200" y="25" fill="#1e293b" className="dark:fill-slate-200" textAnchor="middle" fontSize="13" fontWeight="bold" fontFamily="Inter, sans-serif">Stack Push (Insert) &amp; Pop (Remove) operations</text>

          <line x1="150" y1="50" x2="150" y2="170" stroke="#475569" strokeWidth="3" />
          <line x1="250" y1="50" x2="250" y2="170" stroke="#475569" strokeWidth="3" />
          <line x1="148" y1="170" x2="252" y2="170" stroke="#475569" strokeWidth="3" />

          <rect x="155" y="135" width="90" height="30" rx="4" fill="#1e293b" stroke="#334155" />
          <text x="200" y="154" fill="#cbd5e1" textAnchor="middle" fontSize="11" fontFamily="JetBrains Mono, monospace">A</text>

          <rect x="155" y="100" width="90" height="30" rx="4" fill="#1e293b" stroke="#334155" />
          <text x="200" y="119" fill="#cbd5e1" textAnchor="middle" fontSize="11" fontFamily="JetBrains Mono, monospace">B</text>

          <path d="M 80 50 C 100 20, 150 20, 180 50" fill="none" stroke="#10b981" strokeWidth="2" markerEnd="url(#push-arrow)" />
          <text x="130" y="25" fill="#10b981" textAnchor="middle" fontSize="10" fontWeight="bold" fontFamily="Inter, sans-serif">PUSH [C]</text>
          
          <rect x="40" y="55" width="40" height="25" rx="3" fill="#1e293b" stroke="#10b981" />
          <text x="60" y="71" fill="#10b981" textAnchor="middle" fontSize="10" fontWeight="bold" fontFamily="JetBrains Mono, monospace">C</text>

          <path d="M 220 50 C 250 20, 300 20, 320 50" fill="none" stroke="#ef4444" strokeWidth="2" markerEnd="url(#pop-arrow)" />
          <text x="270" y="25" fill="#ef4444" textAnchor="middle" fontSize="10" fontWeight="bold" fontFamily="Inter, sans-serif">POP</text>

          <rect x="320" y="55" width="40" height="25" rx="3" fill="#1e293b" stroke="#ef4444" />
          <text x="340" y="71" fill="#ef4444" textAnchor="middle" fontSize="10" fontWeight="bold" fontFamily="JetBrains Mono, monospace">B</text>
        </svg>
      );

    case 'stack-balanced-parentheses':
      return (
        <svg viewBox="0 0 400 200" className="w-full max-w-md mx-auto rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 p-4 shadow-sm">
          <text x="200" y="25" fill="#1e293b" className="dark:fill-slate-200" textAnchor="middle" fontSize="13" fontWeight="bold" fontFamily="Inter, sans-serif">Balanced Parentheses Parsing: ( [ ] )</text>
          
          <g transform="translate(20, 50)" fontFamily="JetBrains Mono, monospace">
            <text x="10" y="20" fill="#64748b" fontSize="10" fontFamily="Inter, sans-serif">Input String:</text>
            <g transform="translate(10, 30)">
              {['(', '[', ']', ')'].map((char, idx) => {
                const isCurrent = idx === 2;
                return (
                  <g key={idx} transform={`translate(${idx * 30}, 0)`}>
                    <rect x="0" y="0" width="25" height="25" rx="3" fill="#1e293b" stroke={isCurrent ? '#f59e0b' : '#334155'} strokeWidth={isCurrent ? 2 : 1} />
                    <text x="12.5" y="17" fill={isCurrent ? '#f59e0b' : '#ffffff'} textAnchor="middle" fontSize="14" fontWeight="bold">{char}</text>
                    {isCurrent && <text x="12.5" y="-6" fill="#f59e0b" textAnchor="middle" fontSize="8" fontFamily="Inter, sans-serif">Scan</text>}
                  </g>
                );
              })}
            </g>

            <g transform="translate(180, 10)">
              <text x="40" y="-10" fill="#64748b" textAnchor="middle" fontSize="10" fontFamily="Inter, sans-serif">Stack State</text>
              <rect x="15" y="0" width="50" height="90" fill="none" stroke="#475569" strokeWidth="2" strokeDasharray="90 0 0 90" />
              
              <rect x="20" y="60" width="40" height="25" rx="2" fill="#1e293b" stroke="#334155" />
              <text x="40" y="77" fill="#ffffff" textAnchor="middle" fontSize="12" fontWeight="bold">(</text>

              <text x="75" y="45" fill="#10b981" fontSize="9" fontWeight="bold" fontFamily="Inter, sans-serif">Matched! POP '['</text>
              <path d="M 68 42 L 85 42" stroke="#10b981" strokeWidth="1.5" strokeDasharray="2" />
            </g>
            
            <rect x="10" y="110" width="340" height="24" rx="4" fill="#10b981" fillOpacity="0.1" stroke="#10b981" strokeWidth="1" />
            <text x="180" y="125" fill="#10b981" textAnchor="middle" fontSize="9.5" fontWeight="bold" fontFamily="Inter, sans-serif">Balanced: Stack is empty at the end of input!</text>
          </g>
        </svg>
      );

    case 'queue-array':
      return (
        <svg viewBox="0 0 400 200" className="w-full max-w-md mx-auto rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 p-4 shadow-sm">
          <text x="200" y="25" fill="#1e293b" className="dark:fill-slate-200" textAnchor="middle" fontSize="13" fontWeight="bold" fontFamily="Inter, sans-serif">Queue: Array Representation</text>

          <g transform="translate(30, 60)" fontFamily="JetBrains Mono, monospace">
            {[10, 20, 30, 40, 50].map((val, idx) => {
              const xPos = idx * 65;
              const isFront = idx === 0;
              const isRear = idx === 3;
              const isEmpty = idx === 4;

              return (
                <g key={idx} transform={`translate(${xPos}, 0)`}>
                  <rect x="0" y="0" width="58" height="40" rx="4" fill={isEmpty ? 'none' : '#1e293b'} stroke={isEmpty ? '#475569' : '#334155'} strokeWidth={1} strokeDasharray={isEmpty ? '3' : '0'} />
                  {!isEmpty && <text x="29" y="25" fill="#ffffff" textAnchor="middle" fontSize="14" fontWeight="bold">{val}</text>}
                  <text x="29" y="52" fill="#64748b" textAnchor="middle" fontSize="8">idx {idx}</text>

                  {isFront && (
                    <g transform="translate(29, -10)">
                      <text x="0" y="-12" fill="#10b981" textAnchor="middle" fontSize="9" fontWeight="bold" fontFamily="Inter, sans-serif">FRONT</text>
                      <path d="M 0 -8 L 0 0" stroke="#10b981" strokeWidth="1.5" />
                    </g>
                  )}
                  {isRear && (
                    <g transform="translate(29, -10)">
                      <text x="0" y="-12" fill="#6366f1" textAnchor="middle" fontSize="9" fontWeight="bold" fontFamily="Inter, sans-serif">REAR</text>
                      <path d="M 0 -8 L 0 0" stroke="#6366f1" strokeWidth="1.5" />
                    </g>
                  )}
                </g>
              );
            })}
          </g>
        </svg>
      );

    case 'queue-linked-list':
      return (
        <svg viewBox="0 0 400 200" className="w-full max-w-md mx-auto rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 p-4 shadow-sm">
          <defs>
            <marker id="q-list-arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
              <path d="M 0 0 L 10 5 L 0 10 z" fill="#38bdf8" />
            </marker>
          </defs>
          <text x="200" y="25" fill="#1e293b" className="dark:fill-slate-200" textAnchor="middle" fontSize="13" fontWeight="bold" fontFamily="Inter, sans-serif">Queue: Linked List Implementation</text>

          <g transform="translate(40, 65)">
            <g transform="translate(0, 10)">
              <rect x="0" y="0" width="70" height="40" rx="4" fill="#1e293b" stroke="#10b981" strokeWidth="2" />
              <line x1="45" y1="0" x2="45" y2="40" stroke="#475569" />
              <text x="22.5" y="25" fill="#ffffff" fontSize="12" fontWeight="bold" fontFamily="JetBrains Mono, monospace">10</text>
              <circle cx="57.5" cy="20" r="3" fill="#38bdf8" />
              <text x="35" y="-12" fill="#10b981" textAnchor="middle" fontSize="9" fontWeight="bold" fontFamily="Inter, sans-serif">FRONT (Head)</text>
            </g>

            <line x1="70" y1="30" x2="114" y2="30" stroke="#38bdf8" strokeWidth="1.5" markerEnd="url(#q-list-arrow)" />

            <g transform="translate(120, 10)">
              <rect x="0" y="0" width="70" height="40" rx="4" fill="#1e293b" stroke="#334155" />
              <line x1="45" y1="0" x2="45" y2="40" stroke="#475569" />
              <text x="22.5" y="25" fill="#cbd5e1" fontSize="12" fontFamily="JetBrains Mono, monospace">20</text>
              <circle cx="57.5" cy="20" r="3" fill="#38bdf8" />
            </g>

            <line x1="190" y1="30" x2="234" y2="30" stroke="#38bdf8" strokeWidth="1.5" markerEnd="url(#q-list-arrow)" />

            <g transform="translate(240, 10)">
              <rect x="0" y="0" width="70" height="40" rx="4" fill="#1e293b" stroke="#6366f1" strokeWidth="2" />
              <line x1="45" y1="0" x2="45" y2="40" stroke="#475569" />
              <text x="22.5" y="25" fill="#ffffff" fontSize="12" fontWeight="bold" fontFamily="JetBrains Mono, monospace">30</text>
              <circle cx="57.5" cy="20" r="3" fill="#38bdf8" />
              <text x="35" y="-12" fill="#6366f1" textAnchor="middle" fontSize="9" fontWeight="bold" fontFamily="Inter, sans-serif">REAR (Tail)</text>
            </g>

            <line x1="310" y1="30" x2="335" y2="30" stroke="#94a3b8" strokeWidth="1.5" markerEnd="url(#q-list-arrow)" />
            <text x="345" y="34" fill="#ef4444" fontSize="10" fontWeight="bold" fontFamily="JetBrains Mono, monospace">NULL</text>
          </g>
        </svg>
      );

    case 'circular-queue':
      return (
        <svg viewBox="0 0 400 200" className="w-full max-w-md mx-auto rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 p-4 shadow-sm">
          <text x="200" y="25" fill="#1e293b" className="dark:fill-slate-200" textAnchor="middle" fontSize="13" fontWeight="bold" fontFamily="Inter, sans-serif">Circular Queue Ring Buffer</text>
          
          <g transform="translate(200, 110)">
            <circle cx="0" cy="0" r="50" fill="none" stroke="#475569" strokeWidth="25" />
            <circle cx="0" cy="0" r="62.5" fill="none" stroke="#334155" strokeWidth="1" />
            <circle cx="0" cy="0" r="37.5" fill="none" stroke="#334155" strokeWidth="1" />

            <line x1="0" y1="-37.5" x2="0" y2="-62.5" stroke="#334155" strokeWidth="1.5" />
            <text x="0" y="-46" fill="#ffffff" textAnchor="middle" fontSize="9" fontWeight="bold" fontFamily="JetBrains Mono, monospace">10</text>
            <text x="0" y="-68" fill="#64748b" textAnchor="middle" fontSize="8" fontFamily="Inter, sans-serif">idx 0</text>
            <text x="-35" y="-55" fill="#10b981" fontSize="8.5" fontWeight="bold" fontFamily="Inter, sans-serif">FRONT ◀</text>

            <line x1="37.5" y1="0" x2="62.5" y2="0" stroke="#334155" strokeWidth="1.5" />
            <text x="48" y="3" fill="#ffffff" textAnchor="middle" fontSize="9" fontWeight="bold" fontFamily="JetBrains Mono, monospace">20</text>
            <text x="76" y="3" fill="#64748b" textAnchor="middle" fontSize="8" fontFamily="Inter, sans-serif">idx 1</text>

            <line x1="0" y1="37.5" x2="0" y2="62.5" stroke="#334155" strokeWidth="1.5" />
            <text x="0" y="52" fill="#ffffff" textAnchor="middle" fontSize="9" fontWeight="bold" fontFamily="JetBrains Mono, monospace">30</text>
            <text x="0" y="74" fill="#64748b" textAnchor="middle" fontSize="8" fontFamily="Inter, sans-serif">idx 2</text>
            <text x="35" y="55" fill="#6366f1" fontSize="8.5" fontWeight="bold" fontFamily="Inter, sans-serif">◀ REAR</text>

            <line x1="-37.5" y1="0" x2="-62.5" y2="0" stroke="#334155" strokeWidth="1.5" />
            <text x="-50" y="3" fill="#64748b" textAnchor="middle" fontSize="8" fontFamily="JetBrains Mono, monospace">empty</text>
            <text x="-76" y="3" fill="#64748b" textAnchor="middle" fontSize="8" fontFamily="Inter, sans-serif">idx 3</text>
          </g>
        </svg>
      );

    case 'dequeue':
      return (
        <svg viewBox="0 0 400 200" className="w-full max-w-md mx-auto rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 p-4 shadow-sm">
          <defs>
            <marker id="deq-arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
              <path d="M 0 0 L 10 5 L 0 10 z" fill="#6366f1" />
            </marker>
          </defs>
          <text x="200" y="25" fill="#1e293b" className="dark:fill-slate-200" textAnchor="middle" fontSize="13" fontWeight="bold" fontFamily="Inter, sans-serif">Double-Ended Queue (Deque)</text>

          <g transform="translate(100, 75)" fontFamily="JetBrains Mono, monospace">
            <rect x="0" y="0" width="60" height="40" rx="4" fill="#1e293b" stroke="#334155" strokeWidth="1" />
            <text x="30" y="25" fill="#ffffff" textAnchor="middle" fontSize="13" fontWeight="bold">9</text>
            <text x="30" y="-14" fill="#64748b" textAnchor="middle" fontSize="8.5" fontFamily="Inter, sans-serif">FRONT</text>

            <rect x="70" y="0" width="60" height="40" rx="4" fill="#1e293b" stroke="#334155" />
            <text x="100" y="25" fill="#cbd5e1" textAnchor="middle" fontSize="13">14</text>

            <rect x="140" y="0" width="60" height="40" rx="4" fill="#1e293b" stroke="#334155" strokeWidth="1" />
            <text x="170" y="25" fill="#ffffff" textAnchor="middle" fontSize="13" fontWeight="bold">55</text>
            <text x="170" y="-14" fill="#64748b" textAnchor="middle" fontSize="8.5" fontFamily="Inter, sans-serif">REAR</text>
          </g>

          <path d="M 40 85 L 90 85" fill="none" stroke="#10b981" strokeWidth="1.5" markerEnd="url(#deq-arrow)" />
          <path d="M 90 105 L 40 105" fill="none" stroke="#ef4444" strokeWidth="1.5" markerEnd="url(#deq-arrow)" />
          <text x="50" y="76" fill="#10b981" fontSize="8" fontWeight="bold" fontFamily="Inter, sans-serif">Insert</text>
          <text x="50" y="122" fill="#ef4444" fontSize="8" fontWeight="bold" fontFamily="Inter, sans-serif">Delete</text>

          <path d="M 310 85 L 360 85" fill="none" stroke="#ef4444" strokeWidth="1.5" markerEnd="url(#deq-arrow)" />
          <path d="M 360 105 L 310 105" fill="none" stroke="#10b981" strokeWidth="1.5" markerEnd="url(#deq-arrow)" />
          <text x="350" y="76" fill="#ef4444" fontSize="8" fontWeight="bold" fontFamily="Inter, sans-serif">Delete</text>
          <text x="350" y="122" fill="#10b981" fontSize="8" fontWeight="bold" fontFamily="Inter, sans-serif">Insert</text>
        </svg>
      );

    case 'linked-list':
    case 'singly-linked-list':
      return (
        <svg viewBox="0 0 400 200" className="w-full max-w-md mx-auto rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 p-4 shadow-sm">
          <defs>
            <marker id="arrow-indigo" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M 0 0 L 10 5 L 0 10 z" fill="#6366f1" />
            </marker>
          </defs>

          {/* Head Pointer */}
          <rect x="10" y="80" width="50" height="30" rx="4" fill="#e2e8f0" stroke="#94a3b8" strokeWidth="1.5" className="dark:fill-slate-800 dark:stroke-slate-700" />
          <text x="35" y="99" fill="#475569" className="dark:fill-slate-400" textAnchor="middle" fontSize="11" fontWeight="bold" fontFamily="Inter, sans-serif">HEAD</text>
          <line x1="60" y1="95" x2="94" y2="95" stroke="#6366f1" strokeWidth="2" markerEnd="url(#arrow-indigo)" />

          {/* Node 1 */}
          <g transform="translate(100, 65)">
            <rect x="0" y="0" width="70" height="60" rx="6" fill="#1e293b" stroke="#6366f1" strokeWidth="2" />
            <line x1="45" y1="0" x2="45" y2="60" stroke="#475569" strokeWidth="1.5" />
            <text x="22" y="35" fill="#f8fafc" textAnchor="middle" fontSize="13" fontWeight="bold" fontFamily="JetBrains Mono, monospace">12</text>
            <circle cx="57" cy="30" r="4" fill="#6366f1" />
            <text x="22" y="52" fill="#94a3b8" textAnchor="middle" fontSize="9" fontFamily="Inter, sans-serif">data</text>
            <text x="57" y="52" fill="#94a3b8" textAnchor="middle" fontSize="9" fontFamily="Inter, sans-serif">next</text>
          </g>
          
          {/* Arrow to Node 2 */}
          <line x1="170" y1="95" x2="214" y2="95" stroke="#6366f1" strokeWidth="2" markerEnd="url(#arrow-indigo)" />

          {/* Node 2 */}
          <g transform="translate(220, 65)">
            <rect x="0" y="0" width="70" height="60" rx="6" fill="#1e293b" stroke="#6366f1" strokeWidth="2" />
            <line x1="45" y1="0" x2="45" y2="60" stroke="#475569" strokeWidth="1.5" />
            <text x="22" y="35" fill="#f8fafc" textAnchor="middle" fontSize="13" fontWeight="bold" fontFamily="JetBrains Mono, monospace">99</text>
            <circle cx="57" cy="30" r="4" fill="#6366f1" />
            <text x="22" y="52" fill="#94a3b8" textAnchor="middle" fontSize="9" fontFamily="Inter, sans-serif">data</text>
            <text x="57" y="52" fill="#94a3b8" textAnchor="middle" fontSize="9" fontFamily="Inter, sans-serif">next</text>
          </g>

          {/* Arrow to NULL */}
          <line x1="290" y1="95" x2="334" y2="95" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#arrow-indigo)" />

          {/* NULL Node */}
          <rect x="340" y="80" width="50" height="30" rx="4" fill="#1e293b" stroke="#ef4444" strokeWidth="1.5" />
          <text x="365" y="99" fill="#ef4444" textAnchor="middle" fontSize="11" fontWeight="bold" fontFamily="JetBrains Mono, monospace">NULL</text>
        </svg>
      );

    case 'reverse-linked-list':
      return (
        <svg viewBox="0 0 400 200" className="w-full max-w-md mx-auto rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 p-4 shadow-sm">
          <defs>
            <marker id="rev-arrow-list" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M 0 0 L 10 5 L 0 10 z" fill="#10b981" />
            </marker>
          </defs>
          <text x="200" y="25" fill="#1e293b" className="dark:fill-slate-200" textAnchor="middle" fontSize="13" fontWeight="bold" fontFamily="Inter, sans-serif">Reversing Pointers Direction</text>

          {/* Node 1 */}
          <g transform="translate(60, 65)">
            <rect x="0" y="0" width="70" height="50" rx="6" fill="#1e293b" stroke="#3b82f6" strokeWidth="1.5" />
            <line x1="45" y1="0" x2="45" y2="50" stroke="#475569" strokeWidth="1.5" />
            <text x="22" y="30" fill="#f8fafc" textAnchor="middle" fontSize="13" fontWeight="bold" fontFamily="JetBrains Mono, monospace">12</text>
            <text x="57" y="30" fill="#94a3b8" textAnchor="middle" fontSize="9">prev</text>
          </g>

          {/* Reversed Arrow (B points back to A) */}
          <path d="M 200 90 L 140 90" fill="none" stroke="#10b981" strokeWidth="2.5" markerEnd="url(#rev-arrow-list)" />
          <text x="170" y="82" fill="#10b981" textAnchor="middle" fontSize="9" fontWeight="bold" fontFamily="Inter, sans-serif">reversed</text>

          {/* Node 2 */}
          <g transform="translate(210, 65)">
            <rect x="0" y="0" width="70" height="50" rx="6" fill="#1e293b" stroke="#10b981" strokeWidth="2" />
            <line x1="45" y1="0" x2="45" y2="50" stroke="#475569" strokeWidth="1.5" />
            <text x="22" y="30" fill="#f8fafc" textAnchor="middle" fontSize="13" fontWeight="bold" fontFamily="JetBrains Mono, monospace">99</text>
            <text x="57" y="30" fill="#10b981" textAnchor="middle" fontSize="9" fontWeight="bold">next</text>
          </g>
        </svg>
      );

    case 'linked-list-length':
      return (
        <svg viewBox="0 0 400 200" className="w-full max-w-md mx-auto rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 p-4 shadow-sm">
          <defs>
            <marker id="len-arrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
              <path d="M 0 0 L 10 5 L 0 10 z" fill="#6366f1" />
            </marker>
          </defs>
          <text x="200" y="25" fill="#1e293b" className="dark:fill-slate-200" textAnchor="middle" fontSize="13" fontWeight="bold" fontFamily="Inter, sans-serif">Traversing to Calculate Length (Count)</text>

          {/* Node 1 */}
          <g transform="translate(40, 65)">
            <rect x="0" y="0" width="65" height="50" rx="6" fill="#1e293b" stroke="#6366f1" strokeWidth="1.5" />
            <text x="32.5" y="30" fill="#f8fafc" textAnchor="middle" fontSize="12" fontFamily="JetBrains Mono, monospace">12</text>
            <text x="32.5" y="68" fill="#10b981" textAnchor="middle" fontSize="10" fontWeight="bold" fontFamily="Inter, sans-serif">len = 1</text>
          </g>

          <line x1="105" y1="90" x2="140" y2="90" stroke="#6366f1" strokeWidth="1.5" markerEnd="url(#len-arrow)" />

          {/* Node 2 */}
          <g transform="translate(145, 65)">
            <rect x="0" y="0" width="65" height="50" rx="6" fill="#1e293b" stroke="#6366f1" strokeWidth="1.5" />
            <text x="32.5" y="30" fill="#f8fafc" textAnchor="middle" fontSize="12" fontFamily="JetBrains Mono, monospace">55</text>
            <text x="32.5" y="68" fill="#10b981" textAnchor="middle" fontSize="10" fontWeight="bold" fontFamily="Inter, sans-serif">len = 2</text>
          </g>

          <line x1="210" y1="90" x2="245" y2="90" stroke="#6366f1" strokeWidth="1.5" markerEnd="url(#len-arrow)" />

          {/* Node 3 */}
          <g transform="translate(250, 65)">
            <rect x="0" y="0" width="65" height="50" rx="6" fill="#1e293b" stroke="#6366f1" strokeWidth="1.5" />
            <text x="32.5" y="30" fill="#f8fafc" textAnchor="middle" fontSize="12" fontFamily="JetBrains Mono, monospace">99</text>
            <text x="32.5" y="68" fill="#10b981" textAnchor="middle" fontSize="10" fontWeight="bold" fontFamily="Inter, sans-serif">len = 3</text>
          </g>
        </svg>
      );

    case 'doubly-linked-list':
      return (
        <svg viewBox="0 0 400 200" className="w-full max-w-md mx-auto rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 p-4 shadow-sm">
          <defs>
            <marker id="db-arrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
              <path d="M 0 0 L 10 5 L 0 10 z" fill="#6366f1" />
            </marker>
          </defs>

          {/* Node 1 */}
          <g transform="translate(60, 65)">
            <rect x="0" y="0" width="90" height="60" rx="6" fill="#1e293b" stroke="#6366f1" strokeWidth="2" />
            <line x1="25" y1="0" x2="25" y2="60" stroke="#475569" strokeWidth="1.5" />
            <line x1="65" y1="0" x2="65" y2="60" stroke="#475569" strokeWidth="1.5" />
            
            <text x="12" y="35" fill="#cbd5e1" textAnchor="middle" fontSize="8" fontFamily="Inter, sans-serif">prev</text>
            <text x="45" y="36" fill="#f8fafc" textAnchor="middle" fontSize="12" fontWeight="bold" fontFamily="JetBrains Mono, monospace">25</text>
            <text x="78" y="35" fill="#cbd5e1" textAnchor="middle" fontSize="8" fontFamily="Inter, sans-serif">next</text>
          </g>

          {/* Bidirectional Pointers */}
          <path d="M 150 85 L 205 85" fill="none" stroke="#6366f1" strokeWidth="1.5" markerEnd="url(#db-arrow)" />
          <path d="M 210 105 L 155 105" fill="none" stroke="#38bdf8" strokeWidth="1.5" markerEnd="url(#db-arrow)" />

          {/* Node 2 */}
          <g transform="translate(210, 65)">
            <rect x="0" y="0" width="90" height="60" rx="6" fill="#1e293b" stroke="#38bdf8" strokeWidth="2" />
            <line x1="25" y1="0" x2="25" y2="60" stroke="#475569" strokeWidth="1.5" />
            <line x1="65" y1="0" x2="65" y2="60" stroke="#475569" strokeWidth="1.5" />
            
            <text x="12" y="35" fill="#cbd5e1" textAnchor="middle" fontSize="8" fontFamily="Inter, sans-serif">prev</text>
            <text x="45" y="36" fill="#f8fafc" textAnchor="middle" fontSize="12" fontWeight="bold" fontFamily="JetBrains Mono, monospace">60</text>
            <text x="78" y="35" fill="#cbd5e1" textAnchor="middle" fontSize="8" fontFamily="Inter, sans-serif">next</text>
          </g>
        </svg>
      );

    case 'circular-linked-list':
      return (
        <svg viewBox="0 0 400 200" className="w-full max-w-md mx-auto rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 p-4 shadow-sm">
          <defs>
            <marker id="circ-arrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
              <path d="M 0 0 L 10 5 L 0 10 z" fill="#10b981" />
            </marker>
          </defs>

          {/* Node 1 */}
          <g transform="translate(80, 60)">
            <rect x="0" y="0" width="70" height="50" rx="6" fill="#1e293b" stroke="#10b981" strokeWidth="2" />
            <line x1="45" y1="0" x2="45" y2="50" stroke="#475569" strokeWidth="1.5" />
            <text x="22" y="32" fill="#ffffff" textAnchor="middle" fontSize="13" fontWeight="bold" fontFamily="JetBrains Mono, monospace">A</text>
            <circle cx="57" cy="25" r="3" fill="#10b981" />
          </g>

          {/* Pointer */}
          <line x1="150" y1="85" x2="194" y2="85" stroke="#10b981" strokeWidth="2" markerEnd="url(#circ-arrow)" />

          {/* Node 2 */}
          <g transform="translate(200, 60)">
            <rect x="0" y="0" width="70" height="50" rx="6" fill="#1e293b" stroke="#10b981" strokeWidth="2" />
            <line x1="45" y1="0" x2="45" y2="50" stroke="#475569" strokeWidth="1.5" />
            <text x="22" y="32" fill="#ffffff" textAnchor="middle" fontSize="13" fontWeight="bold" fontFamily="JetBrains Mono, monospace">B</text>
            <circle cx="57" cy="25" r="3" fill="#10b981" />
          </g>

          {/* Loop back curved path (from B next to A) */}
          <path d="M 270 85 C 290 85, 300 130, 220 140 C 140 150, 90 130, 105 112" fill="none" stroke="#10b981" strokeWidth="1.8" strokeDasharray="3" markerEnd="url(#circ-arrow)" />
          <text x="180" y="152" fill="#10b981" textAnchor="middle" fontSize="9" fontWeight="bold" fontFamily="Inter, sans-serif">Loops back to HEAD node</text>
        </svg>
      );

    case 'binary-tree':
      return (
        <svg viewBox="0 0 400 200" className="w-full max-w-md mx-auto rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 p-4 shadow-sm">
          <text x="200" y="25" fill="#1e293b" className="dark:fill-slate-200" textAnchor="middle" fontSize="13" fontWeight="bold" fontFamily="Inter, sans-serif">Standard Binary Tree</text>
          
          <g transform="translate(0, 10)">
            <circle cx="200" cy="40" r="16" fill="#6366f1" stroke="#f8fafc" strokeWidth="1" />
            <text x="200" y="44" fill="#ffffff" textAnchor="middle" fontSize="11" fontWeight="bold" fontFamily="JetBrains Mono, monospace">A</text>
            <text x="200" y="18" fill="#6366f1" textAnchor="middle" fontSize="9.5" fontWeight="bold" fontFamily="Inter, sans-serif">Root</text>

            <line x1="188" y1="50" x2="132" y2="90" stroke="#94a3b8" strokeWidth="1.5" />
            <line x1="212" y1="50" x2="268" y2="90" stroke="#94a3b8" strokeWidth="1.5" />

            <circle cx="120" cy="100" r="16" fill="#3b82f6" stroke="#f8fafc" strokeWidth="1" />
            <text x="120" y="104" fill="#ffffff" textAnchor="middle" fontSize="11" fontWeight="bold" fontFamily="JetBrains Mono, monospace">B</text>

            <circle cx="280" cy="100" r="16" fill="#3b82f6" stroke="#f8fafc" strokeWidth="1" />
            <text x="280" y="104" fill="#ffffff" textAnchor="middle" fontSize="11" fontWeight="bold" fontFamily="JetBrains Mono, monospace">C</text>

            <line x1="110" y1="112" x2="80" y2="148" stroke="#cbd5e1" strokeWidth="1" />
            <circle cx="70" cy="155" r="12" fill="#0ea5e9" />
            <text x="70" y="159" fill="#ffffff" textAnchor="middle" fontSize="9" fontFamily="JetBrains Mono, monospace">D</text>

            <line x1="290" y1="112" x2="320" y2="148" stroke="#cbd5e1" strokeWidth="1" />
            <circle cx="330" cy="155" r="12" fill="#0ea5e9" />
            <text x="330" y="159" fill="#ffffff" textAnchor="middle" fontSize="9" fontFamily="JetBrains Mono, monospace">E</text>
          </g>
        </svg>
      );

    case 'bst-operations':
      return (
        <svg viewBox="0 0 400 200" className="w-full max-w-md mx-auto rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 p-4 shadow-sm">
          <defs>
            <marker id="bst-arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="4" markerHeight="4" orient="auto-start-reverse">
              <path d="M 0 0 L 10 5 L 0 10 z" fill="#f59e0b" />
            </marker>
          </defs>
          <text x="200" y="25" fill="#1e293b" className="dark:fill-slate-200" textAnchor="middle" fontSize="13" fontWeight="bold" fontFamily="Inter, sans-serif">BST Insertion: Insert 35</text>

          <g transform="translate(0, 10)">
            <circle cx="200" cy="40" r="16" fill="#6366f1" stroke="#f8fafc" strokeWidth="1" />
            <text x="200" y="44" fill="#ffffff" textAnchor="middle" fontSize="11" fontWeight="bold" fontFamily="JetBrains Mono, monospace">50</text>
            
            <path d="M 185 45 C 160 50, 140 65, 130 80" fill="none" stroke="#f59e0b" strokeWidth="1.5" markerEnd="url(#bst-arrow)" strokeDasharray="3" />
            <text x="145" y="55" fill="#f59e0b" fontSize="8" fontWeight="bold" fontFamily="Inter, sans-serif">35 &lt; 50 (go left)</text>

            <circle cx="120" cy="100" r="16" fill="#3b82f6" stroke="#f8fafc" strokeWidth="1" />
            <text x="120" y="104" fill="#ffffff" textAnchor="middle" fontSize="11" fontWeight="bold" fontFamily="JetBrains Mono, monospace">30</text>

            <path d="M 130 108 C 145 115, 155 125, 160 138" fill="none" stroke="#f59e0b" strokeWidth="1.5" markerEnd="url(#bst-arrow)" strokeDasharray="3" />
            <text x="175" y="123" fill="#f59e0b" fontSize="8" fontWeight="bold" fontFamily="Inter, sans-serif">35 &gt; 30 (go right)</text>

            <circle cx="280" cy="100" r="16" fill="#3b82f6" stroke="#f8fafc" strokeWidth="1" />
            <text x="280" y="104" fill="#ffffff" textAnchor="middle" fontSize="11" fontWeight="bold" fontFamily="JetBrains Mono, monospace">70</text>

            <circle cx="170" cy="155" r="14" fill="#10b981" stroke="#f8fafc" strokeWidth="1" />
            <text x="170" y="159" fill="#ffffff" textAnchor="middle" fontSize="9.5" fontWeight="bold" fontFamily="JetBrains Mono, monospace">35</text>
            <text x="170" y="178" fill="#10b981" textAnchor="middle" fontSize="8.5" fontWeight="bold" fontFamily="Inter, sans-serif">Inserted here</text>
          </g>
        </svg>
      );

    case 'tree-traversals':
      return (
        <svg viewBox="0 0 400 200" className="w-full max-w-md mx-auto rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 p-4 shadow-sm">
          <text x="200" y="25" fill="#1e293b" className="dark:fill-slate-200" textAnchor="middle" fontSize="13" fontWeight="bold" fontFamily="Inter, sans-serif">Binary Tree Traversals</text>

          <g transform="translate(10, 30)">
            <g transform="translate(70, 0)">
              <circle cx="50" cy="30" r="14" fill="#6366f1" />
              <text x="50" y="34" fill="#ffffff" textAnchor="middle" fontSize="11" fontWeight="bold" fontFamily="JetBrains Mono, monospace">A</text>

              <line x1="40" y1="40" x2="25" y2="70" stroke="#94a3b8" strokeWidth="1" />
              <line x1="60" y1="40" x2="75" y2="70" stroke="#94a3b8" strokeWidth="1" />

              <circle cx="15" cy="80" r="12" fill="#3b82f6" />
              <text x="15" y="84" fill="#ffffff" textAnchor="middle" fontSize="10" fontFamily="JetBrains Mono, monospace">B</text>

              <circle cx="85" cy="80" r="12" fill="#3b82f6" />
              <text x="85" y="84" fill="#ffffff" textAnchor="middle" fontSize="10" fontFamily="JetBrains Mono, monospace">C</text>
            </g>

            <g transform="translate(180, 20)" fontFamily="JetBrains Mono, monospace" fontSize="9.5">
              <rect x="0" y="0" width="180" height="24" rx="4" fill="#1e293b" stroke="#334155" />
              <text x="10" y="15" fill="#ffffff"><tspan fill="#6366f1" fontWeight="bold">Pre-order: </tspan> A ➜ B ➜ C</text>

              <rect x="0" y="32" width="180" height="24" rx="4" fill="#1e293b" stroke="#334155" />
              <text x="10" y="47" fill="#ffffff"><tspan fill="#3b82f6" fontWeight="bold">In-order:  </tspan> B ➜ A ➜ C</text>

              <rect x="0" y="64" width="180" height="24" rx="4" fill="#1e293b" stroke="#334155" />
              <text x="10" y="79" fill="#ffffff"><tspan fill="#10b981" fontWeight="bold">Post-order:</tspan> B ➜ C ➜ A</text>
            </g>
          </g>
        </svg>
      );

    case 'tree-height':
      return (
        <svg viewBox="0 0 400 200" className="w-full max-w-md mx-auto rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 p-4 shadow-sm">
          <text x="200" y="25" fill="#1e293b" className="dark:fill-slate-200" textAnchor="middle" fontSize="13" fontWeight="bold" fontFamily="Inter, sans-serif">Tree Height &amp; Depth Levels (Height = 2)</text>

          <g transform="translate(0, 15)">
            <line x1="40" y1="40" x2="360" y2="40" stroke="#94a3b8" strokeWidth="0.8" strokeDasharray="3" />
            <text x="45" y="35" fill="#64748b" fontSize="8" fontFamily="Inter, sans-serif">Level 0 (Root)</text>

            <line x1="40" y1="95" x2="360" y2="95" stroke="#94a3b8" strokeWidth="0.8" strokeDasharray="3" />
            <text x="45" y="90" fill="#64748b" fontSize="8" fontFamily="Inter, sans-serif">Level 1</text>

            <line x1="40" y1="150" x2="360" y2="150" stroke="#94a3b8" strokeWidth="0.8" strokeDasharray="3" />
            <text x="45" y="145" fill="#64748b" fontSize="8" fontFamily="Inter, sans-serif">Level 2</text>

            <circle cx="200" cy="40" r="14" fill="#6366f1" />
            <text x="200" y="44" fill="#ffffff" textAnchor="middle" fontSize="10" fontWeight="bold" fontFamily="JetBrains Mono, monospace">A</text>

            <line x1="190" y1="50" x2="135" y2="85" stroke="#475569" strokeWidth="1.5" />
            <line x1="210" y1="50" x2="265" y2="85" stroke="#475569" strokeWidth="1.5" />

            <circle cx="120" cy="95" r="14" fill="#3b82f6" />
            <text x="120" y="99" fill="#ffffff" textAnchor="middle" fontSize="10" fontWeight="bold" fontFamily="JetBrains Mono, monospace">B</text>

            <circle cx="280" cy="95" r="14" fill="#3b82f6" />
            <text x="280" y="99" fill="#ffffff" textAnchor="middle" fontSize="10" fontWeight="bold" fontFamily="JetBrains Mono, monospace">C</text>

            <line x1="110" y1="105" x2="85" y2="140" stroke="#475569" strokeWidth="1" />
            <circle cx="75" cy="150" r="12" fill="#0ea5e9" />
            <text x="75" y="154" fill="#ffffff" textAnchor="middle" fontSize="9" fontFamily="JetBrains Mono, monospace">D</text>

            <path d="M 360 40 L 370 40 L 370 95 L 370 150 L 360 150" fill="none" stroke="#10b981" strokeWidth="2" />
            <text x="385" y="100" fill="#10b981" fontSize="10" fontWeight="bold" fontFamily="Inter, sans-serif" transform="rotate(90 385 100)" textAnchor="middle">Height = 2</text>
          </g>
        </svg>
      );

    case 'nested-loops':
      return (
        <svg viewBox="0 0 400 200" className="w-full max-w-md mx-auto rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 p-4 shadow-sm">
          <text x="200" y="25" fill="#1e293b" className="dark:fill-slate-200" textAnchor="middle" fontSize="13" fontWeight="bold" fontFamily="Inter, sans-serif">Nested Loops Grid Iteration</text>
          
          <g transform="translate(60, 45)" fontFamily="JetBrains Mono, monospace" fontSize="11" textAnchor="middle">
            {/* Headers */}
            <text x="75" y="10" fill="#64748b" fontSize="9" fontFamily="Inter, sans-serif">Inner loop: j = 1, 2, 3</text>
            <text x="-35" y="65" fill="#64748b" fontSize="9" fontFamily="Inter, sans-serif" transform="rotate(-90 -35 65)">Outer loop: i = 1, 2</text>

            {/* Row 1 */}
            <g transform="translate(0, 20)">
              <rect x="0" y="0" width="60" height="30" rx="4" fill="#1e293b" stroke="#334155" />
              <text x="30" y="18" fill="#ffffff">i=1, j=1</text>
              <rect x="70" y="0" width="60" height="30" rx="4" fill="#1e293b" stroke="#334155" />
              <text x="100" y="18" fill="#ffffff">i=1, j=2</text>
              <rect x="140" y="0" width="60" height="30" rx="4" fill="#1e293b" stroke="#334155" />
              <text x="170" y="18" fill="#ffffff">i=1, j=3</text>
            </g>

            {/* Row 2 */}
            <g transform="translate(0, 60)">
              <rect x="0" y="0" width="60" height="30" rx="4" fill="#1e293b" stroke="#334155" />
              <text x="30" y="18" fill="#ffffff">i=2, j=1</text>
              <rect x="70" y="0" width="60" height="30" rx="4" fill="#1e293b" stroke="#334155" />
              <text x="100" y="18" fill="#ffffff">i=2, j=2</text>
              <rect x="140" y="0" width="60" height="30" rx="4" fill="#1e293b" stroke="#334155" />
              <text x="170" y="18" fill="#ffffff">i=2, j=3</text>
            </g>

            <rect x="-10" y="105" width="220" height="22" fill="#e0e7ff" rx="4" />
            <text x="100" y="119" fill="#4f46e5" fontSize="8.5" fontWeight="bold" fontFamily="Inter, sans-serif">Total Executions = Outer (2) × Inner (3) = 6</text>
          </g>
        </svg>
      );

    case 'pattern-right-triangle':
      return (
        <svg viewBox="0 0 400 200" className="w-full max-w-md mx-auto rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 p-4 shadow-sm">
          <text x="200" y="25" fill="#1e293b" className="dark:fill-slate-200" textAnchor="middle" fontSize="13" fontWeight="bold" fontFamily="Inter, sans-serif">Right Triangle Pattern</text>
          <g transform="translate(170, 50)" fontFamily="JetBrains Mono, monospace" fontSize="20" fill="#6366f1" fontWeight="bold">
            <text x="0" y="20">*</text>
            <text x="0" y="50">* *</text>
            <text x="0" y="80">* * *</text>
            <text x="0" y="110">* * * *</text>
          </g>
        </svg>
      );

    case 'pattern-inverted-triangle':
      return (
        <svg viewBox="0 0 400 200" className="w-full max-w-md mx-auto rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 p-4 shadow-sm">
          <text x="200" y="25" fill="#1e293b" className="dark:fill-slate-200" textAnchor="middle" fontSize="13" fontWeight="bold" fontFamily="Inter, sans-serif">Inverted Triangle Pattern</text>
          <g transform="translate(170, 50)" fontFamily="JetBrains Mono, monospace" fontSize="20" fill="#f43f5e" fontWeight="bold">
            <text x="0" y="20">* * * *</text>
            <text x="0" y="50">* * *</text>
            <text x="0" y="80">* *</text>
            <text x="0" y="110">*</text>
          </g>
        </svg>
      );

    case 'pattern-pyramid':
      return (
        <svg viewBox="0 0 400 200" className="w-full max-w-md mx-auto rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 p-4 shadow-sm">
          <text x="200" y="25" fill="#1e293b" className="dark:fill-slate-200" textAnchor="middle" fontSize="13" fontWeight="bold" fontFamily="Inter, sans-serif">Pyramid Pattern</text>
          <g transform="translate(200, 50)" fontFamily="JetBrains Mono, monospace" fontSize="20" fill="#10b981" fontWeight="bold" textAnchor="middle">
            <text x="0" y="20">*</text>
            <text x="0" y="50">* * *</text>
            <text x="0" y="80">* * * * *</text>
            <text x="0" y="110">* * * * * * *</text>
          </g>
        </svg>
      );

    case 'pattern-diamond':
      return (
        <svg viewBox="0 0 400 200" className="w-full max-w-md mx-auto rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 p-4 shadow-sm">
          <text x="200" y="25" fill="#1e293b" className="dark:fill-slate-200" textAnchor="middle" fontSize="13" fontWeight="bold" fontFamily="Inter, sans-serif">Diamond Pattern</text>
          <g transform="translate(200, 50)" fontFamily="JetBrains Mono, monospace" fontSize="20" fill="#f59e0b" fontWeight="bold" textAnchor="middle">
            <text x="0" y="20">*</text>
            <text x="0" y="45">* * *</text>
            <text x="0" y="70">* * * * *</text>
            <text x="0" y="95">* * *</text>
            <text x="0" y="120">*</text>
          </g>
        </svg>
      );

    case 'pattern-floyds-triangle':
      return (
        <svg viewBox="0 0 400 200" className="w-full max-w-md mx-auto rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 p-4 shadow-sm">
          <text x="200" y="25" fill="#1e293b" className="dark:fill-slate-200" textAnchor="middle" fontSize="13" fontWeight="bold" fontFamily="Inter, sans-serif">Floyd's Triangle (Sequential Numbers)</text>
          <g transform="translate(160, 50)" fontFamily="JetBrains Mono, monospace" fontSize="18" fill="#8b5cf6" fontWeight="bold">
            <text x="0" y="20">1</text>
            <text x="0" y="50">2 3</text>
            <text x="0" y="80">4 5 6</text>
            <text x="0" y="110">7 8 9 10</text>
          </g>
        </svg>
      );

    case 'pattern-pascals-triangle':
      return (
        <svg viewBox="0 0 400 200" className="w-full max-w-md mx-auto rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 p-4 shadow-sm">
          <text x="200" y="25" fill="#1e293b" className="dark:fill-slate-200" textAnchor="middle" fontSize="13" fontWeight="bold" fontFamily="Inter, sans-serif">Pascal's Triangle (Binomial Coefficients)</text>
          <g transform="translate(200, 50)" fontFamily="JetBrains Mono, monospace" fontSize="16" fill="#3b82f6" fontWeight="bold" textAnchor="middle">
            <text x="0" y="20">1</text>
            <text x="0" y="50">1   1</text>
            <text x="0" y="80">1   2   1</text>
            <text x="0" y="110">1   3   3   1</text>
          </g>
        </svg>
      );

    case 'sum-of-digits':
      return (
        <svg viewBox="0 0 400 200" className="w-full max-w-md mx-auto rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 p-4 shadow-sm">
          <text x="200" y="25" fill="#1e293b" className="dark:fill-slate-200" textAnchor="middle" fontSize="13" fontWeight="bold" fontFamily="Inter, sans-serif">Sum of Digits (Extraction process)</text>
          <g transform="translate(50, 55)" fontFamily="JetBrains Mono, monospace" fontSize="14">
            <rect x="0" y="10" width="80" height="40" rx="6" fill="#1e293b" stroke="#3b82f6" strokeWidth="1.5" />
            <text x="40" y="34" fill="#ffffff" textAnchor="middle" fontSize="16" fontWeight="bold">382</text>
            <text x="40" y="65" fill="#64748b" textAnchor="middle" fontSize="8" fontFamily="Inter, sans-serif">Input Number</text>

            <text x="115" y="32" fill="#f59e0b" fontSize="22" textAnchor="middle" fontFamily="Inter, sans-serif">→</text>

            <rect x="140" y="10" width="160" height="40" rx="6" fill="#1e293b" stroke="#f59e0b" strokeWidth="1.5" />
            <text x="220" y="34" fill="#f59e0b" textAnchor="middle" fontSize="16" fontWeight="bold">3 + 8 + 2</text>
            
            <rect x="90" y="80" width="210" height="35" fill="#10b981" fillOpacity="0.1" stroke="#10b981" strokeWidth="1.5" />
            <text x="195" y="102" fill="#10b981" textAnchor="middle" fontSize="15" fontWeight="bold">Total Sum = 13</text>
          </g>
        </svg>
      );

    case 'power-number':
      return (
        <svg viewBox="0 0 400 200" className="w-full max-w-md mx-auto rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 p-4 shadow-sm">
          <text x="200" y="25" fill="#1e293b" className="dark:fill-slate-200" textAnchor="middle" fontSize="13" fontWeight="bold" fontFamily="Inter, sans-serif">Power of a Number (Base ^ Exponent)</text>
          <g transform="translate(50, 50)" fontFamily="JetBrains Mono, monospace">
            {/* Base and Exponent illustration */}
            <rect x="20" y="20" width="55" height="55" rx="8" fill="#1e293b" stroke="#3b82f6" strokeWidth="2" />
            <text x="47.5" y="55" fill="#ffffff" textAnchor="middle" fontSize="28" fontWeight="bold">2</text>
            <text x="47.5" y="90" fill="#3b82f6" textAnchor="middle" fontSize="10" fontFamily="Inter, sans-serif">base</text>

            <rect x="80" y="5" width="30" height="30" rx="4" fill="#1e293b" stroke="#f59e0b" strokeWidth="2" />
            <text x="95" y="25" fill="#f59e0b" textAnchor="middle" fontSize="16" fontWeight="bold">3</text>
            <text x="95" y="47" fill="#f59e0b" textAnchor="middle" fontSize="8" fontFamily="Inter, sans-serif">exp</text>

            <text x="140" y="55" fill="#e2e8f0" fontSize="22" fontFamily="Inter, sans-serif">=</text>

            {/* Multiplication expansion */}
            <rect x="170" y="25" width="140" height="45" rx="6" fill="#1e293b" stroke="#10b981" strokeWidth="1.5" />
            <text x="240" y="52" fill="#10b981" textAnchor="middle" fontSize="16" fontWeight="bold">2 × 2 × 2</text>
            <text x="240" y="90" fill="#10b981" textAnchor="middle" fontSize="11" fontWeight="bold" fontFamily="Inter, sans-serif">Result = 8</text>
          </g>
        </svg>
      );

    case 'graph-adjacency-matrix':
      return (
        <svg viewBox="0 0 400 200" className="w-full max-w-md mx-auto rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 p-4 shadow-sm">
          <text x="200" y="25" fill="#1e293b" className="dark:fill-slate-200" textAnchor="middle" fontSize="13" fontWeight="bold" fontFamily="Inter, sans-serif">Graph &amp; Adjacency Matrix representation</text>
          <g transform="translate(10, 20)">
            <line x1="60" y1="50" x2="140" y2="50" stroke="#475569" strokeWidth="2" />
            <line x1="60" y1="50" x2="100" y2="120" stroke="#475569" strokeWidth="2" />
            <line x1="140" y1="50" x2="100" y2="120" stroke="#475569" strokeWidth="2" />

            <circle cx="60" cy="50" r="15" fill="#6366f1" />
            <text x="60" y="54" fill="#ffffff" textAnchor="middle" fontSize="12" fontWeight="bold">0</text>

            <circle cx="140" cy="50" r="15" fill="#6366f1" />
            <text x="140" y="54" fill="#ffffff" textAnchor="middle" fontSize="12" fontWeight="bold">1</text>

            <circle cx="100" cy="120" r="15" fill="#6366f1" />
            <text x="100" y="124" fill="#ffffff" textAnchor="middle" fontSize="12" fontWeight="bold">2</text>
          </g>

          <g transform="translate(210, 45)" fontFamily="JetBrains Mono, monospace">
            <text x="60" y="-12" fill="#64748b" textAnchor="middle" fontSize="10" fontFamily="Inter, sans-serif">Adjacency Matrix</text>
            <rect x="0" y="0" width="120" height="90" rx="4" fill="#1e293b" stroke="#334155" />
            
            <text x="15" y="-2" fill="#64748b" fontSize="8" textAnchor="middle">0</text>
            <text x="55" y="-2" fill="#64748b" fontSize="8" textAnchor="middle">1</text>
            <text x="95" y="-2" fill="#64748b" fontSize="8" textAnchor="middle">2</text>
            
            <text x="-10" y="20" fill="#64748b" fontSize="8">0</text>
            <text x="-10" y="50" fill="#64748b" fontSize="8">1</text>
            <text x="-10" y="80" fill="#64748b" fontSize="8">2</text>

            <text x="15" y="22" fill="#94a3b8" fontSize="11" textAnchor="middle">0</text>
            <text x="55" y="22" fill="#10b981" fontSize="11" fontWeight="bold" textAnchor="middle">1</text>
            <text x="95" y="22" fill="#10b981" fontSize="11" fontWeight="bold" textAnchor="middle">1</text>

            <text x="15" y="52" fill="#10b981" fontSize="11" fontWeight="bold" textAnchor="middle">1</text>
            <text x="55" y="52" fill="#94a3b8" fontSize="11" textAnchor="middle">0</text>
            <text x="95" y="52" fill="#10b981" fontSize="11" fontWeight="bold" textAnchor="middle">1</text>

            <text x="15" y="82" fill="#10b981" fontSize="11" fontWeight="bold" textAnchor="middle">1</text>
            <text x="55" y="82" fill="#10b981" fontSize="11" fontWeight="bold" textAnchor="middle">1</text>
            <text x="95" y="82" fill="#94a3b8" fontSize="11" textAnchor="middle">0</text>
          </g>
        </svg>
      );

    case 'graph-bfs':
      return (
        <svg viewBox="0 0 400 200" className="w-full max-w-md mx-auto rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 p-4 shadow-sm">
          <text x="200" y="25" fill="#1e293b" className="dark:fill-slate-200" textAnchor="middle" fontSize="13" fontWeight="bold" fontFamily="Inter, sans-serif">Breadth First Search Traversal (BFS Queue)</text>
          
          <g transform="translate(10, 40)">
            <line x1="40" y1="30" x2="100" y2="30" stroke="#475569" strokeWidth="1.5" />
            <line x1="40" y1="30" x2="70" y2="85" stroke="#475569" strokeWidth="1.5" />
            <line x1="100" y1="30" x2="130" y2="85" stroke="#475569" strokeWidth="1.5" />

            <circle cx="40" cy="30" r="13" fill="#10b981" />
            <text x="40" y="34" fill="#ffffff" textAnchor="middle" fontSize="10" fontWeight="bold">0</text>

            <circle cx="100" cy="30" fill="#3b82f6" r="13" />
            <text x="100" y="34" fill="#ffffff" textAnchor="middle" fontSize="10" fontWeight="bold">1</text>

            <circle cx="70" cy="85" fill="#3b82f6" r="13" />
            <text x="70" y="89" fill="#ffffff" textAnchor="middle" fontSize="10" fontWeight="bold">2</text>

            <circle cx="130" cy="85" fill="#e2e8f0" r="13" stroke="#94a3b8" />
            <text x="130" y="89" fill="#475569" textAnchor="middle" fontSize="10" fontWeight="bold">3</text>
          </g>

          <g transform="translate(180, 45)" fontFamily="JetBrains Mono, monospace" fontSize="9.5">
            <text x="0" y="10" fill="#64748b" fontFamily="Inter, sans-serif">BFS Queue (FIFO):</text>
            <rect x="0" y="18" width="180" height="25" rx="4" fill="#1e293b" stroke="#3b82f6" />
            <text x="10" y="34" fill="#ffffff">Front [ 1 | 2 ] Rear</text>

            <text x="0" y="65" fill="#64748b" fontFamily="Inter, sans-serif">Visited List:</text>
            <rect x="0" y="73" width="180" height="25" rx="4" fill="#1e293b" stroke="#10b981" />
            <text x="10" y="89" fill="#10b981" fontWeight="bold">[ 0, 1, 2 ]</text>
          </g>

          <rect x="20" y="145" width="360" height="22" fill="#e0e7ff" rx="4" />
          <text x="200" y="159" fill="#4f46e5" textAnchor="middle" fontSize="9" fontWeight="bold" fontFamily="Inter, sans-serif">BFS explores level-by-level using a FIFO Queue</text>
        </svg>
      );

    case 'graph-dfs':
      return (
        <svg viewBox="0 0 400 200" className="w-full max-w-md mx-auto rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 p-4 shadow-sm">
          <text x="200" y="25" fill="#1e293b" className="dark:fill-slate-200" textAnchor="middle" fontSize="13" fontWeight="bold" fontFamily="Inter, sans-serif">Depth First Search Traversal (DFS Stack)</text>
          
          <g transform="translate(10, 40)">
            <line x1="40" y1="30" x2="100" y2="30" stroke="#475569" strokeWidth="1.5" />
            <line x1="40" y1="30" x2="70" y2="85" stroke="#10b981" strokeWidth="2" />
            <line x1="70" y1="85" x2="130" y2="85" stroke="#10b981" strokeWidth="2" />

            <circle cx="40" cy="30" r="13" fill="#10b981" />
            <text x="40" y="34" fill="#ffffff" textAnchor="middle" fontSize="10" fontWeight="bold">0</text>

            <circle cx="100" cy="30" fill="#e2e8f0" r="13" stroke="#94a3b8" />
            <text x="100" y="34" fill="#475569" textAnchor="middle" fontSize="10" fontWeight="bold">1</text>

            <circle cx="70" cy="85" fill="#10b981" r="13" />
            <text x="70" y="89" fill="#ffffff" textAnchor="middle" fontSize="10" fontWeight="bold">2</text>

            <circle cx="130" cy="85" fill="#3b82f6" r="13" />
            <text x="130" y="89" fill="#ffffff" textAnchor="middle" fontSize="10" fontWeight="bold">3</text>
          </g>

          <g transform="translate(180, 45)" fontFamily="JetBrains Mono, monospace" fontSize="9.5">
            <text x="0" y="10" fill="#64748b" fontFamily="Inter, sans-serif">DFS Stack (LIFO):</text>
            <rect x="0" y="18" width="180" height="25" rx="4" fill="#1e293b" stroke="#3b82f6" />
            <text x="10" y="34" fill="#ffffff">Stack: [ 0 | 2 | 3 ] ◀ TOP</text>

            <text x="0" y="65" fill="#64748b" fontFamily="Inter, sans-serif">Visited List:</text>
            <rect x="0" y="73" width="180" height="25" rx="4" fill="#1e293b" stroke="#10b981" />
            <text x="10" y="89" fill="#10b981" fontWeight="bold">[ 0, 2, 3 ]</text>
          </g>

          <rect x="20" y="145" width="360" height="22" fill="#e0e7ff" rx="4" />
          <text x="200" y="159" fill="#4f46e5" textAnchor="middle" fontSize="9" fontWeight="bold" fontFamily="Inter, sans-serif">DFS explores deep along branches using recursion/LIFO stack</text>
        </svg>
      );

    case 'hash-table-chaining':
      return (
        <svg viewBox="0 0 400 200" className="w-full max-w-md mx-auto rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 p-4 shadow-sm">
          <text x="200" y="25" fill="#1e293b" className="dark:fill-slate-200" textAnchor="middle" fontSize="13" fontWeight="bold" fontFamily="Inter, sans-serif">Collision Resolution: Chaining (Linked Lists)</text>

          <g transform="translate(60, 45)" fontFamily="JetBrains Mono, monospace">
            {[0, 1, 2].map((idx) => {
              const yPos = idx * 38;
              return (
                <g key={idx} transform={`translate(0, ${yPos})`}>
                  <rect x="0" y="0" width="45" height="30" rx="4" fill="#1e293b" stroke="#334155" />
                  <text x="22.5" y="20" fill="#94a3b8" textAnchor="middle" fontSize="12">[{idx}]</text>
                  
                  {idx === 1 && (
                    <g transform="translate(50, 0)">
                      <line x1="0" y1="15" x2="30" y2="15" stroke="#6366f1" strokeWidth="1.5" />
                      <rect x="30" y="0" width="70" height="30" rx="4" fill="#1e293b" stroke="#6366f1" strokeWidth="1.5" />
                      <text x="65" y="19" fill="#ffffff" textAnchor="middle" fontSize="10">Key: 15</text>
                      
                      <line x1="100" y1="15" x2="130" y2="15" stroke="#6366f1" strokeWidth="1.5" />
                      <rect x="130" y="0" width="70" height="30" rx="4" fill="#1e293b" stroke="#6366f1" strokeWidth="1.5" />
                      <text x="165" y="19" fill="#ffffff" textAnchor="middle" fontSize="10">Key: 29</text>
                    </g>
                  )}

                  {idx === 2 && (
                    <g transform="translate(50, 0)">
                      <line x1="0" y1="15" x2="30" y2="15" stroke="#10b981" strokeWidth="1.5" />
                      <rect x="30" y="0" width="70" height="30" rx="4" fill="#1e293b" stroke="#10b981" strokeWidth="1.5" />
                      <text x="65" y="19" fill="#ffffff" textAnchor="middle" fontSize="10">Key: 44</text>
                    </g>
                  )}
                </g>
              );
            })}
          </g>
        </svg>
      );

    case 'hash-linear-probing':
      return (
        <svg viewBox="0 0 400 200" className="w-full max-w-md mx-auto rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 p-4 shadow-sm">
          <defs>
            <marker id="probe-arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="4" markerHeight="4" orient="auto-start-reverse">
              <path d="M 0 0 L 10 5 L 0 10 z" fill="#ef4444" />
            </marker>
          </defs>
          <text x="200" y="25" fill="#1e293b" className="dark:fill-slate-200" textAnchor="middle" fontSize="13" fontWeight="bold" fontFamily="Inter, sans-serif">Collision Resolution: Linear Probing</text>

          <g transform="translate(25, 60)" fontFamily="JetBrains Mono, monospace">
            {[24, 15, null, 36, null].map((val, idx) => {
              const xPos = idx * 70;
              
              return (
                <g key={idx} transform={`translate(${xPos}, 15)`}>
                  <rect x="0" y="0" width="60" height="42" rx="4" fill="#1e293b" stroke={idx === 2 ? '#10b981' : (idx === 1 ? '#ef4444' : '#334155')} strokeWidth={idx === 1 || idx === 2 ? 2 : 1} />
                  <text x="30" y="26" fill={val ? '#ffffff' : '#64748b'} textAnchor="middle" fontSize="13" fontWeight="bold">
                    {val !== null ? val : 'empty'}
                  </text>
                  <text x="30" y="-8" fill="#64748b" textAnchor="middle" fontSize="9" fontFamily="Inter, sans-serif">slot {idx}</text>
                </g>
              );
            })}

            <path d="M 100 -10 C 100 -20, 170 -20, 170 5" fill="none" stroke="#ef4444" strokeWidth="1.5" markerEnd="url(#probe-arrow)" strokeDasharray="3" />
            <text x="135" y="-24" fill="#ef4444" fontSize="8" fontWeight="bold" fontFamily="Inter, sans-serif" textAnchor="middle">Collision at 1! Probing slot 2</text>
            <text x="175" y="72" fill="#10b981" fontSize="9" fontWeight="bold" fontFamily="Inter, sans-serif" textAnchor="middle">29 placed here</text>
          </g>
        </svg>
      );

    case 'factorial-iterative':
      return (
        <svg viewBox="0 0 400 200" className="w-full max-w-md mx-auto rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 p-4 shadow-sm">
          <text x="200" y="25" fill="#1e293b" className="dark:fill-slate-200" textAnchor="middle" fontSize="13" fontWeight="bold" fontFamily="Inter, sans-serif">Iterative Factorial: 5! = 120</text>
          <g transform="translate(20, 50)" fontFamily="JetBrains Mono, monospace">
            <rect x="0" y="10" width="360" height="40" rx="6" fill="#1e293b" stroke="#334155" />
            <text x="180" y="34" fill="#ffffff" textAnchor="middle" fontSize="14">1 × 2 × 3 × 4 × 5 = 120</text>

            <g transform="translate(10, 70)" fontSize="10">
              <rect x="0" y="0" width="70" height="45" rx="4" fill="#1e293b" stroke="#6366f1" />
              <text x="35" y="16" fill="#6366f1" textAnchor="middle" fontWeight="bold">i = 1</text>
              <text x="35" y="34" fill="#ffffff" textAnchor="middle">Fact: 1</text>

              <rect x="80" y="0" width="70" height="45" rx="4" fill="#1e293b" stroke="#6366f1" />
              <text x="115" y="16" fill="#6366f1" textAnchor="middle" fontWeight="bold">i = 2</text>
              <text x="115" y="34" fill="#ffffff" textAnchor="middle">Fact: 2</text>

              <rect x="160" y="0" width="70" height="45" rx="4" fill="#1e293b" stroke="#6366f1" />
              <text x="195" y="16" fill="#6366f1" textAnchor="middle" fontWeight="bold">i = 3</text>
              <text x="195" y="34" fill="#ffffff" textAnchor="middle">Fact: 6</text>

              <rect x="240" y="0" width="70" height="45" rx="4" fill="#1e293b" stroke="#6366f1" />
              <text x="275" y="16" fill="#6366f1" textAnchor="middle" fontWeight="bold">i = 4</text>
              <text x="275" y="34" fill="#ffffff" textAnchor="middle">Fact: 24</text>

              <rect x="320" y="0" width="40" height="45" rx="4" fill="#10b981" />
              <text x="340" y="16" fill="#ffffff" textAnchor="middle" fontWeight="bold">i = 5</text>
              <text x="340" y="34" fill="#ffffff" textAnchor="middle">120 ✓</text>
            </g>
          </g>
        </svg>
      );

    case 'factorial-recursive':
      return (
        <svg viewBox="0 0 400 220" className="w-full max-w-md mx-auto rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 p-4 shadow-sm">
          <defs>
            <marker id="rec-arrow-down" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="4" markerHeight="4" orient="auto-start-reverse">
              <path d="M 0 0 L 10 5 L 0 10 z" fill="#6366f1" />
            </marker>
            <marker id="rec-arrow-up" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="4" markerHeight="4" orient="auto-start-reverse">
              <path d="M 0 0 L 10 5 L 0 10 z" fill="#10b981" />
            </marker>
          </defs>
          <text x="200" y="20" fill="#1e293b" className="dark:fill-slate-200" textAnchor="middle" fontSize="13" fontWeight="bold" fontFamily="Inter, sans-serif">Recursive Factorial Call Stack (5!)</text>
          
          <g transform="translate(80, 35)" fontFamily="JetBrains Mono, monospace" fontSize="10">
            <g transform="translate(0, 110)">
              <rect x="0" y="0" width="160" height="25" rx="4" fill="#1e293b" stroke="#10b981" strokeWidth="1.5" />
              <text x="80" y="16" fill="#10b981" textAnchor="middle" fontWeight="bold">fact(1) returns 1</text>
            </g>
            
            <g transform="translate(0, 80)">
              <rect x="0" y="0" width="160" height="25" rx="4" fill="#1e293b" stroke="#3b82f6" />
              <text x="80" y="16" fill="#ffffff" textAnchor="middle">fact(2) = 2 * fact(1)</text>
            </g>

            <g transform="translate(0, 50)">
              <rect x="0" y="0" width="160" height="25" rx="4" fill="#1e293b" stroke="#3b82f6" />
              <text x="80" y="16" fill="#ffffff" textAnchor="middle">fact(3) = 3 * fact(2)</text>
            </g>

            <g transform="translate(0, 20)">
              <rect x="0" y="0" width="160" height="25" rx="4" fill="#1e293b" stroke="#3b82f6" />
              <text x="80" y="16" fill="#ffffff" textAnchor="middle">fact(4) = 4 * fact(3)</text>
            </g>

            <g transform="translate(0, -10)">
              <rect x="0" y="0" width="160" height="25" rx="4" fill="#1e293b" stroke="#6366f1" strokeWidth="1.5" />
              <text x="80" y="16" fill="#f8fafc" textAnchor="middle" fontWeight="bold">fact(5) = 5 * fact(4)</text>
            </g>

            <path d="M -15 -5 L -15 115" fill="none" stroke="#6366f1" strokeWidth="1.5" markerEnd="url(#rec-arrow-down)" strokeDasharray="3" />
            <text x="-48" y="58" fill="#6366f1" fontSize="9" transform="rotate(-90 -48 58)" textAnchor="middle">Call descent</text>

            <path d="M 175 115 L 175 -5" fill="none" stroke="#10b981" strokeWidth="1.5" markerEnd="url(#rec-arrow-up)" />
            <text x="195" y="58" fill="#10b981" fontSize="9" transform="rotate(90 195 58)" textAnchor="middle">Return values</text>
          </g>
        </svg>
      );

    case 'recursion-fibonacci':
      return (
        <svg viewBox="0 0 400 220" className="w-full max-w-md mx-auto rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 p-4 shadow-sm">
          <text x="200" y="25" fill="#1e293b" className="dark:fill-slate-200" textAnchor="middle" fontSize="13" fontWeight="bold" fontFamily="Inter, sans-serif">Fibonacci Recursion Tree: fib(4)</text>
          
          <g fontFamily="JetBrains Mono, monospace" fontSize="10" textAnchor="middle">
            <g transform="translate(200, 45)">
              <rect x="-30" y="-12" width="60" height="24" rx="4" fill="#6366f1" />
              <text x="0" y="3" fill="#ffffff" fontWeight="bold">fib(4)</text>
            </g>

            <line x1="180" y1="50" x2="110" y2="85" stroke="#94a3b8" strokeWidth="1.5" />
            <line x1="220" y1="50" x2="290" y2="85" stroke="#94a3b8" strokeWidth="1.5" />

            <g transform="translate(100, 95)">
              <rect x="-30" y="-12" width="60" height="24" rx="4" fill="#3b82f6" />
              <text x="0" y="3" fill="#ffffff">fib(3)</text>
            </g>
            <g transform="translate(300, 95)">
              <rect x="-30" y="-12" width="60" height="24" rx="4" fill="#3b82f6" />
              <text x="0" y="3" fill="#ffffff">fib(2)</text>
            </g>

            <line x1="90" y1="100" x2="55" y2="135" stroke="#94a3b8" strokeWidth="1.2" />
            <line x1="110" y1="100" x2="145" y2="135" stroke="#94a3b8" strokeWidth="1.2" />
            
            <line x1="290" y1="100" x2="255" y2="135" stroke="#94a3b8" strokeWidth="1.2" />
            <line x1="310" y1="100" x2="345" y2="135" stroke="#94a3b8" strokeWidth="1.2" />

            <g transform="translate(50, 145)">
              <rect x="-25" y="-10" width="50" height="20" rx="3" fill="#0ea5e9" />
              <text x="0" y="3" fill="#ffffff" fontSize="9">fib(2)</text>
            </g>
            <g transform="translate(150, 145)">
              <rect x="-25" y="-10" width="50" height="20" rx="3" fill="#10b981" />
              <text x="0" y="3" fill="#ffffff" fontSize="9" fontWeight="bold">fib(1)➜1</text>
            </g>
            <g transform="translate(250, 145)">
              <rect x="-25" y="-10" width="50" height="20" rx="3" fill="#10b981" />
              <text x="0" y="3" fill="#ffffff" fontSize="9" fontWeight="bold">fib(1)➜1</text>
            </g>
            <g transform="translate(350, 145)">
              <rect x="-25" y="-10" width="50" height="20" rx="3" fill="#10b981" />
              <text x="0" y="3" fill="#ffffff" fontSize="9" fontWeight="bold">fib(0)➜0</text>
            </g>
          </g>
        </svg>
      );

    case 'infix-to-postfix':
      return (
        <svg viewBox="0 0 400 200" className="w-full max-w-md mx-auto rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 p-4 shadow-sm">
          <text x="200" y="25" fill="#1e293b" className="dark:fill-slate-200" textAnchor="middle" fontSize="13" fontWeight="bold" fontFamily="Inter, sans-serif">Infix to Postfix Operator Stack</text>

          <g transform="translate(35, 45)" fontFamily="JetBrains Mono, monospace">
            <text x="0" y="15" fill="#64748b" fontSize="9.5" fontFamily="Inter, sans-serif">Infix String: A + B * C</text>

            <g transform="translate(130, 20)">
              <text x="30" y="-8" fill="#64748b" textAnchor="middle" fontSize="9" fontFamily="Inter, sans-serif">Operator Stack</text>
              <rect x="5" y="0" width="50" height="70" fill="none" stroke="#475569" strokeWidth="2" strokeDasharray="70 0 0 70" />
              
              <rect x="10" y="40" width="40" height="22" rx="2" fill="#1e293b" stroke="#334155" />
              <text x="30" y="55" fill="#ffffff" textAnchor="middle" fontSize="12" fontWeight="bold">+</text>

              <rect x="10" y="12" width="40" height="22" rx="2" fill="#1e293b" stroke="#6366f1" strokeWidth="1.5" />
              <text x="30" y="27" fill="#6366f1" textAnchor="middle" fontSize="12" fontWeight="bold">*</text>
              <text x="58" y="27" fill="#6366f1" fontSize="8" fontFamily="Inter, sans-serif">TOP</text>
            </g>

            <g transform="translate(0, 105)">
              <rect x="0" y="0" width="330" height="30" rx="4" fill="#1e293b" stroke="#10b981" strokeWidth="1.5" />
              <text x="15" y="20" fill="#cbd5e1" fontSize="11">Postfix Output: <tspan fill="#10b981" fontWeight="bold" fontSize="13">A B C * +</tspan></text>
            </g>
          </g>
        </svg>
      );

    case 'arrays-max-min':
      return (
        <svg viewBox="0 0 400 200" className="w-full max-w-md mx-auto rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 p-4 shadow-sm">
          <text x="200" y="25" fill="#1e293b" className="dark:fill-slate-200" textAnchor="middle" fontSize="13" fontWeight="bold" fontFamily="Inter, sans-serif">Array Extremes (Max &amp; Min)</text>
          <g transform="translate(45, 50)" fontFamily="JetBrains Mono, monospace" fontSize="12">
            {[{val: 12, max: false, min: false, idx: 0},
              {val: 5, max: false, min: false, idx: 1},
              {val: 87, max: true, min: false, idx: 2},
              {val: 1, max: false, min: true, idx: 3},
              {val: 43, max: false, min: false, idx: 4}].map((el, i) => {
              const x = i * 60;
              let strokeColor = '#334155';
              let strokeW = 1.5;
              if (el.max) { strokeColor = '#10b981'; strokeW = 2; }
              if (el.min) { strokeColor = '#ef4444'; strokeW = 2; }
              return (
                <g key={i} transform={`translate(${x}, 20)`}>
                  <rect x="0" y="0" width="50" height="40" rx="4" fill="#1e293b" stroke={strokeColor} strokeWidth={strokeW} />
                  <text x="25" y="24" fill="#ffffff" textAnchor="middle" fontWeight="bold" fontSize="13">{el.val}</text>
                  <text x="25" y="55" fill="#64748b" textAnchor="middle" fontSize="9" fontFamily="Inter, sans-serif">[{el.idx}]</text>
                  {el.max && (
                    <g transform="translate(25, -10)">
                      <path d="M 0 -10 L 0 -2" fill="none" stroke="#10b981" strokeWidth="1.5" markerEnd="url(#hello-arrow)" />
                      <text x="0" y="-14" fill="#10b981" textAnchor="middle" fontSize="8.5" fontWeight="bold" fontFamily="Inter, sans-serif">MAX</text>
                    </g>
                  )}
                  {el.min && (
                    <g transform="translate(25, -10)">
                      <path d="M 0 -10 L 0 -2" fill="none" stroke="#ef4444" strokeWidth="1.5" markerEnd="url(#hello-arrow)" />
                      <text x="0" y="-14" fill="#ef4444" textAnchor="middle" fontSize="8.5" fontWeight="bold" fontFamily="Inter, sans-serif">MIN</text>
                    </g>
                  )}
                </g>
              );
            })}
          </g>
        </svg>
      );

    case 'arrays-sum':
      return (
        <svg viewBox="0 0 400 200" className="w-full max-w-md mx-auto rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 p-4 shadow-sm">
          <text x="200" y="25" fill="#1e293b" className="dark:fill-slate-200" textAnchor="middle" fontSize="13" fontWeight="bold" fontFamily="Inter, sans-serif">Array Aggregation (Total Sum)</text>
          <g transform="translate(30, 45)" fontFamily="JetBrains Mono, monospace" fontSize="11">
            <g transform="translate(0, 10)">
              {[5, 10, 15, 20, 25].map((val, i) => {
                const x = i * 46;
                return (
                  <g key={i} transform={`translate(${x}, 0)`}>
                    <rect x="0" y="0" width="38" height="30" rx="4" fill="#1e293b" stroke="#334155" />
                    <text x="19" y="19" fill="#ffffff" textAnchor="middle">{val}</text>
                  </g>
                );
              })}
            </g>
            <g transform="translate(245, 10)">
              <text x="12" y="18" fill="#cbd5e1" fontSize="15">+</text>
              <rect x="30" y="-5" width="80" height="40" rx="8" fill="#1e293b" stroke="#6366f1" strokeWidth="1.5" />
              <text x="70" y="19" fill="#6366f1" textAnchor="middle" fontWeight="bold" fontSize="13">sum</text>
            </g>
            <rect x="10" y="70" width="320" height="40" fill="#10b981" fillOpacity="0.08" rx="6" stroke="#10b981" strokeWidth="1" />
            <text x="170" y="94" fill="#10b981" textAnchor="middle" fontSize="12" fontWeight="bold">
              Formula: 5 + 10 + 15 + 20 + 25 = 75
            </text>
          </g>
        </svg>
      );

    case 'arrays-reverse':
      return (
        <svg viewBox="0 0 400 200" className="w-full max-w-md mx-auto rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 p-4 shadow-sm">
          <text x="200" y="25" fill="#1e293b" className="dark:fill-slate-200" textAnchor="middle" fontSize="13" fontWeight="bold" fontFamily="Inter, sans-serif">Array Reversal (In-Place Swapping)</text>
          <g transform="translate(45, 55)" fontFamily="JetBrains Mono, monospace" fontSize="12">
            {[5, 2, 3, 4, 1].map((val, i) => {
              const x = i * 60;
              let fillBg = '#1e293b';
              let strokeColor = '#334155';
              let isEdge = (i === 0 || i === 4);
              if (isEdge) { fillBg = '#1e1b4b'; strokeColor = '#6366f1'; }
              return (
                <g key={i} transform={`translate(${x}, 15)`}>
                  <rect x="0" y="0" width="50" height="35" rx="4" fill={fillBg} stroke={strokeColor} strokeWidth={isEdge ? 2 : 1} />
                  <text x="25" y="22" fill="#ffffff" textAnchor="middle" fontWeight="bold">{val}</text>
                  {i === 0 && (
                    <text x="25" y="-6" fill="#6366f1" textAnchor="middle" fontSize="8" fontWeight="bold" fontFamily="Inter, sans-serif">start ➜</text>
                  )}
                  {i === 4 && (
                    <text x="25" y="-6" fill="#6366f1" textAnchor="middle" fontSize="8" fontWeight="bold" fontFamily="Inter, sans-serif">⇠ end</text>
                  )}
                </g>
              );
            })}
            <path d="M 25 -2 C 85 -20, 205 -20, 265 -2" fill="none" stroke="#6366f1" strokeWidth="1.5" strokeDasharray="3" markerEnd="url(#hello-arrow)" />
            <text x="145" y="-18" fill="#6366f1" textAnchor="middle" fontSize="9" fontWeight="bold" fontFamily="Inter, sans-serif">Swap values</text>
          </g>
        </svg>
      );

    case 'arrays-insert':
      return (
        <svg viewBox="0 0 400 200" className="w-full max-w-md mx-auto rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 p-4 shadow-sm">
          <text x="200" y="25" fill="#1e293b" className="dark:fill-slate-200" textAnchor="middle" fontSize="13" fontWeight="bold" fontFamily="Inter, sans-serif">Array Insertion (Shifting Right)</text>
          <g transform="translate(35, 55)" fontFamily="JetBrains Mono, monospace" fontSize="11">
            {[10, 20, 99, 30, 40, 50].map((val, i) => {
              const x = i * 54;
              let border = '#334155';
              let fillCell = '#1e293b';
              let textFill = '#ffffff';
              if (i === 2) { border = '#10b981'; fillCell = '#064e3b'; textFill = '#34d399'; }
              if (i > 2) { border = '#f59e0b'; }
              return (
                <g key={i} transform={`translate(${x}, 15)`}>
                  <rect x="0" y="0" width="46" height="35" rx="4" fill={fillCell} stroke={border} strokeWidth={i === 2 ? 2 : 1} />
                  <text x="23" y="22" fill={textFill} textAnchor="middle" fontWeight="bold">{val}</text>
                  <text x="23" y="50" fill="#64748b" textAnchor="middle" fontSize="8" fontFamily="Inter, sans-serif">idx {i}</text>
                  {i === 2 && (
                    <g transform="translate(23, -15)">
                      <text x="0" y="-8" fill="#10b981" textAnchor="middle" fontSize="8" fontWeight="bold" fontFamily="Inter, sans-serif">Inserted</text>
                      <path d="M 0 -4 L 0 5" fill="none" stroke="#10b981" strokeWidth="1.5" markerEnd="url(#hello-arrow)" />
                    </g>
                  )}
                  {i > 2 && (
                    <path d="M -8 -8 C -4 -14, 4 -14, 8 -8" fill="none" stroke="#f59e0b" strokeWidth="1" markerEnd="url(#hello-arrow)" />
                  )}
                </g>
              );
            })}
            <text x="160" y="90" fill="#f59e0b" fontSize="8" fontFamily="Inter, sans-serif">Values shifted to higher indices</text>
          </g>
        </svg>
      );

    case 'arrays-delete':
      return (
        <svg viewBox="0 0 400 200" className="w-full max-w-md mx-auto rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 p-4 shadow-sm">
          <text x="200" y="25" fill="#1e293b" className="dark:fill-slate-200" textAnchor="middle" fontSize="13" fontWeight="bold" fontFamily="Inter, sans-serif">Array Deletion (Shifting Left)</text>
          <g transform="translate(35, 55)" fontFamily="JetBrains Mono, monospace" fontSize="11">
            {[10, 20, '✗', 40, 50].map((val, i) => {
              const x = i * 54;
              let border = '#334155';
              let fillCell = '#1e293b';
              let textFill = '#ffffff';
              if (i === 2) { border = '#ef4444'; fillCell = '#7f1d1d'; textFill = '#ef4444'; }
              if (i > 2) { border = '#3b82f6'; }
              return (
                <g key={i} transform={`translate(${x}, 15)`}>
                  <rect x="0" y="0" width="46" height="35" rx="4" fill={fillCell} stroke={border} strokeWidth={i === 2 ? 2 : 1} />
                  <text x="23" y="22" fill={textFill} textAnchor="middle" fontWeight="bold" fontSize={i === 2 ? 14 : 11}>{val}</text>
                  <text x="23" y="50" fill="#64748b" textAnchor="middle" fontSize="8" fontFamily="Inter, sans-serif">idx {i}</text>
                  {i > 2 && (
                    <path d="M 8 -8 C 4 -14, -4 -14, -8 -8" fill="none" stroke="#3b82f6" strokeWidth="1" markerEnd="url(#hello-arrow)" />
                  )}
                </g>
              );
            })}
            <text x="160" y="90" fill="#3b82f6" fontSize="8" fontFamily="Inter, sans-serif">Subsequent elements shift left to fill gap</text>
          </g>
        </svg>
      );

    case 'arrays-add-two':
      return (
        <svg viewBox="0 0 400 200" className="w-full max-w-md mx-auto rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 p-4 shadow-sm">
          <text x="200" y="25" fill="#1e293b" className="dark:fill-slate-200" textAnchor="middle" fontSize="13" fontWeight="bold" fontFamily="Inter, sans-serif">Element-wise Array Addition</text>
          <g transform="translate(45, 40)" fontFamily="JetBrains Mono, monospace" fontSize="11">
            <g transform="translate(0, 0)">
              <text x="-25" y="22" fill="#cbd5e1" fontSize="12" fontWeight="bold">A</text>
              {[1, 2, 3].map((val, i) => (
                <rect key={i} x={i * 45} y="5" width="40" height="26" rx="3" fill="#1e293b" stroke="#334155" />
              ))}
              {[1, 2, 3].map((val, i) => (
                <text key={i} x={i * 45 + 20} y="22" fill="#ffffff" textAnchor="middle">{val}</text>
              ))}
            </g>
            <text x="150" y="22" fill="#cbd5e1" fontSize="15" fontWeight="bold">+</text>
            <g transform="translate(180, 0)">
              <text x="-25" y="22" fill="#cbd5e1" fontSize="12" fontWeight="bold">B</text>
              {[10, 20, 30].map((val, i) => (
                <rect key={i} x={i * 45} y="5" width="40" height="26" rx="3" fill="#1e293b" stroke="#334155" />
              ))}
              {[10, 20, 30].map((val, i) => (
                <text key={i} x={i * 45 + 20} y="22" fill="#ffffff" textAnchor="middle">{val}</text>
              ))}
            </g>
            <path d="M 150 42 L 150 52" fill="none" stroke="#cbd5e1" strokeWidth="1.5" markerEnd="url(#hello-arrow)" />
            <g transform="translate(90, 65)">
              <text x="-25" y="22" fill="#10b981" fontSize="12" fontWeight="bold">C</text>
              {[11, 22, 33].map((val, i) => (
                <rect key={i} x={i * 45} y="5" width="40" height="26" rx="3" fill="#064e3b" stroke="#10b981" strokeWidth="1.5" />
              ))}
              {[11, 22, 33].map((val, i) => (
                <text key={i} x={i * 45 + 20} y="22" fill="#34d399" textAnchor="middle" fontWeight="bold">{val}</text>
              ))}
            </g>
          </g>
        </svg>
      );

    case 'arrays-subtract-two':
      return (
        <svg viewBox="0 0 400 200" className="w-full max-w-md mx-auto rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 p-4 shadow-sm">
          <text x="200" y="25" fill="#1e293b" className="dark:fill-slate-200" textAnchor="middle" fontSize="13" fontWeight="bold" fontFamily="Inter, sans-serif">Element-wise Array Subtraction</text>
          <g transform="translate(45, 40)" fontFamily="JetBrains Mono, monospace" fontSize="11">
            <g transform="translate(0, 0)">
              <text x="-25" y="22" fill="#cbd5e1" fontSize="12" fontWeight="bold">A</text>
              {[20, 25, 30].map((val, i) => (
                <rect key={i} x={i * 45} y="5" width="40" height="26" rx="3" fill="#1e293b" stroke="#334155" />
              ))}
              {[20, 25, 30].map((val, i) => (
                <text key={i} x={i * 45 + 20} y="22" fill="#ffffff" textAnchor="middle">{val}</text>
              ))}
            </g>
            <text x="150" y="20" fill="#cbd5e1" fontSize="18" fontWeight="bold">-</text>
            <g transform="translate(180, 0)">
              <text x="-25" y="22" fill="#cbd5e1" fontSize="12" fontWeight="bold">B</text>
              {[5, 10, 15].map((val, i) => (
                <rect key={i} x={i * 45} y="5" width="40" height="26" rx="3" fill="#1e293b" stroke="#334155" />
              ))}
              {[5, 10, 15].map((val, i) => (
                <text key={i} x={i * 45 + 20} y="22" fill="#ffffff" textAnchor="middle">{val}</text>
              ))}
            </g>
            <path d="M 150 42 L 150 52" fill="none" stroke="#cbd5e1" strokeWidth="1.5" markerEnd="url(#hello-arrow)" />
            <g transform="translate(90, 65)">
              <text x="-25" y="22" fill="#3b82f6" fontSize="12" fontWeight="bold">C</text>
              {[15, 15, 15].map((val, i) => (
                <rect key={i} x={i * 45} y="5" width="40" height="26" rx="3" fill="#172554" stroke="#3b82f6" strokeWidth="1.5" />
              ))}
              {[15, 15, 15].map((val, i) => (
                <text key={i} x={i * 45 + 20} y="22" fill="#60a5fa" textAnchor="middle" fontWeight="bold">{val}</text>
              ))}
            </g>
          </g>
        </svg>
      );

    case 'matrix-addition':
      return (
        <svg viewBox="0 0 400 200" className="w-full max-w-md mx-auto rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 p-4 shadow-sm">
          <text x="200" y="23" fill="#1e293b" className="dark:fill-slate-200" textAnchor="middle" fontSize="13" fontWeight="bold" fontFamily="Inter, sans-serif">2D Matrix Addition (Cell-by-Cell)</text>
          <g transform="translate(25, 45)" fontFamily="JetBrains Mono, monospace" fontSize="11">
            <g transform="translate(0, 10)">
              <text x="25" y="-8" fill="#cbd5e1" textAnchor="middle" fontSize="10" fontFamily="Inter, sans-serif">Matrix A</text>
              <rect x="0" y="0" width="50" height="50" rx="4" fill="#1e293b" stroke="#334155" />
              <line x1="25" y1="0" x2="25" y2="50" stroke="#334155" strokeWidth="0.5" />
              <line x1="0" y1="25" x2="50" y2="25" stroke="#334155" strokeWidth="0.5" />
              <text x="12" y="16" fill="#ffffff" textAnchor="middle">1</text>
              <text x="37" y="16" fill="#ffffff" textAnchor="middle">2</text>
              <text x="12" y="41" fill="#ffffff" textAnchor="middle">3</text>
              <text x="37" y="41" fill="#ffffff" textAnchor="middle">4</text>
            </g>
            <text x="75" y="40" fill="#cbd5e1" fontSize="18" fontWeight="bold">+</text>
            <g transform="translate(100, 10)">
              <text x="25" y="-8" fill="#cbd5e1" textAnchor="middle" fontSize="10" fontFamily="Inter, sans-serif">Matrix B</text>
              <rect x="0" y="0" width="50" height="50" rx="4" fill="#1e293b" stroke="#334155" />
              <line x1="25" y1="0" x2="25" y2="50" stroke="#334155" strokeWidth="0.5" />
              <line x1="0" y1="25" x2="50" y2="25" stroke="#334155" strokeWidth="0.5" />
              <text x="12" y="16" fill="#ffffff" textAnchor="middle">5</text>
              <text x="37" y="16" fill="#ffffff" textAnchor="middle">6</text>
              <text x="12" y="41" fill="#ffffff" textAnchor="middle">7</text>
              <text x="37" y="41" fill="#ffffff" textAnchor="middle">8</text>
            </g>
            <path d="M 175 35 L 195 35" fill="none" stroke="#cbd5e1" strokeWidth="1.5" markerEnd="url(#hello-arrow)" />
            <g transform="translate(225, 10)">
              <text x="40" y="-8" fill="#10b981" textAnchor="middle" fontSize="10" fontWeight="bold" fontFamily="Inter, sans-serif">Result Matrix C</text>
              <rect x="0" y="0" width="80" height="50" rx="4" fill="#064e3b" stroke="#10b981" strokeWidth="1.5" />
              <line x1="40" y1="0" x2="40" y2="50" stroke="#10b981" strokeWidth="0.8" />
              <line x1="0" y1="25" x2="80" y2="25" stroke="#10b981" strokeWidth="0.8" />
              <text x="20" y="16" fill="#34d399" textAnchor="middle" fontWeight="bold">1+5=6</text>
              <text x="60" y="16" fill="#34d399" textAnchor="middle" fontWeight="bold">2+6=8</text>
              <text x="20" y="41" fill="#34d399" textAnchor="middle" fontWeight="bold">3+7=10</text>
              <text x="60" y="41" fill="#34d399" textAnchor="middle" fontWeight="bold">4+8=12</text>
            </g>
          </g>
        </svg>
      );

    case 'matrix-subtraction':
      return (
        <svg viewBox="0 0 400 200" className="w-full max-w-md mx-auto rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 p-4 shadow-sm">
          <text x="200" y="23" fill="#1e293b" className="dark:fill-slate-200" textAnchor="middle" fontSize="13" fontWeight="bold" fontFamily="Inter, sans-serif">2D Matrix Subtraction (Cell-by-Cell)</text>
          <g transform="translate(25, 45)" fontFamily="JetBrains Mono, monospace" fontSize="11">
            <g transform="translate(0, 10)">
              <text x="25" y="-8" fill="#cbd5e1" textAnchor="middle" fontSize="10" fontFamily="Inter, sans-serif">Matrix A</text>
              <rect x="0" y="0" width="50" height="50" rx="4" fill="#1e293b" stroke="#334155" />
              <line x1="25" y1="0" x2="25" y2="50" stroke="#334155" strokeWidth="0.5" />
              <line x1="0" y1="25" x2="50" y2="25" stroke="#334155" strokeWidth="0.5" />
              <text x="12" y="16" fill="#ffffff" textAnchor="middle">5</text>
              <text x="37" y="16" fill="#ffffff" textAnchor="middle">6</text>
              <text x="12" y="41" fill="#ffffff" textAnchor="middle">7</text>
              <text x="37" y="41" fill="#ffffff" textAnchor="middle">8</text>
            </g>
            <text x="75" y="40" fill="#cbd5e1" fontSize="18" fontWeight="bold">-</text>
            <g transform="translate(100, 10)">
              <text x="25" y="-8" fill="#cbd5e1" textAnchor="middle" fontSize="10" fontFamily="Inter, sans-serif">Matrix B</text>
              <rect x="0" y="0" width="50" height="50" rx="4" fill="#1e293b" stroke="#334155" />
              <line x1="25" y1="0" x2="25" y2="50" stroke="#334155" strokeWidth="0.5" />
              <line x1="0" y1="25" x2="50" y2="25" stroke="#334155" strokeWidth="0.5" />
              <text x="12" y="16" fill="#ffffff" textAnchor="middle">1</text>
              <text x="37" y="16" fill="#ffffff" textAnchor="middle">2</text>
              <text x="12" y="41" fill="#ffffff" textAnchor="middle">3</text>
              <text x="37" y="41" fill="#ffffff" textAnchor="middle">4</text>
            </g>
            <path d="M 175 35 L 195 35" fill="none" stroke="#cbd5e1" strokeWidth="1.5" markerEnd="url(#hello-arrow)" />
            <g transform="translate(225, 10)">
              <text x="40" y="-8" fill="#3b82f6" textAnchor="middle" fontSize="10" fontWeight="bold" fontFamily="Inter, sans-serif">Result Matrix C</text>
              <rect x="0" y="0" width="80" height="50" rx="4" fill="#172554" stroke="#3b82f6" strokeWidth="1.5" />
              <line x1="40" y1="0" x2="40" y2="50" stroke="#3b82f6" strokeWidth="0.8" />
              <line x1="0" y1="25" x2="80" y2="25" stroke="#3b82f6" strokeWidth="0.8" />
              <text x="20" y="16" fill="#60a5fa" textAnchor="middle" fontWeight="bold">5-1=4</text>
              <text x="60" y="16" fill="#60a5fa" textAnchor="middle" fontWeight="bold">6-2=4</text>
              <text x="20" y="41" fill="#60a5fa" textAnchor="middle" fontWeight="bold">7-3=4</text>
              <text x="60" y="41" fill="#60a5fa" textAnchor="middle" fontWeight="bold">8-4=4</text>
            </g>
          </g>
        </svg>
      );

    case 'matrix-multiplication':
      return (
        <svg viewBox="0 0 400 200" className="w-full max-w-md mx-auto rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 p-4 shadow-sm">
          <text x="200" y="23" fill="#1e293b" className="dark:fill-slate-200" textAnchor="middle" fontSize="13" fontWeight="bold" fontFamily="Inter, sans-serif">Matrix Multiplication: A × B = C</text>
          <g transform="translate(15, 45)" fontFamily="JetBrains Mono, monospace" fontSize="10">
            <g transform="translate(0, 10)">
              <rect x="0" y="0" width="46" height="46" rx="4" fill="#1e293b" stroke="#334155" />
              <rect x="2" y="2" width="42" height="20" fill="#6366f1" fillOpacity="0.15" stroke="#6366f1" strokeWidth="1" strokeDasharray="none" />
              <text x="11" y="15" fill="#f8fafc" textAnchor="middle">1</text>
              <text x="33" y="15" fill="#f8fafc" textAnchor="middle">2</text>
              <text x="11" y="36" fill="#94a3b8" textAnchor="middle">3</text>
              <text x="33" y="36" fill="#94a3b8" textAnchor="middle">4</text>
              <text x="23" y="60" fill="#6366f1" textAnchor="middle" fontSize="8" fontFamily="Inter, sans-serif">Row 0 (1, 2)</text>
            </g>
            <text x="65" y="38" fill="#cbd5e1" fontSize="15" fontWeight="bold">×</text>
            <g transform="translate(90, 10)">
              <rect x="0" y="0" width="46" height="46" rx="4" fill="#1e293b" stroke="#334155" />
              <rect x="2" y="2" width="20" height="42" fill="#f59e0b" fillOpacity="0.15" stroke="#f59e0b" strokeWidth="1" strokeDasharray="none" />
              <text x="12" y="15" fill="#ffffff" textAnchor="middle">5</text>
              <text x="34" y="15" fill="#94a3b8" textAnchor="middle">6</text>
              <text x="12" y="36" fill="#ffffff" textAnchor="middle">7</text>
              <text x="34" y="36" fill="#94a3b8" textAnchor="middle">8</text>
              <text x="23" y="60" fill="#f59e0b" textAnchor="middle" fontSize="8" fontFamily="Inter, sans-serif">Col 0 (5, 7)</text>
            </g>
            <path d="M 155 33 L 175 33" fill="none" stroke="#cbd5e1" strokeWidth="1.5" markerEnd="url(#hello-arrow)" />
            <g transform="translate(195, 5)">
              <rect x="0" y="5" width="165" height="46" rx="4" fill="#0f172a" stroke="#10b981" strokeWidth="1.5" />
              <text x="12" y="31" fill="#10b981" fontWeight="bold" fontSize="12">C[0][0] = </text>
              <text x="75" y="31" fill="#ffffff" fontWeight="bold" fontSize="11">1×5 + 2×7 = 19</text>
              <rect x="0" y="60" width="165" height="24" rx="4" fill="#1e293b" stroke="#334155" />
              <text x="10" y="75" fill="#94a3b8" fontSize="9">Matrix C = {"{{19, 22}, {43, 50}}"}</text>
            </g>
          </g>
        </svg>
      );

    case 'matrix-transpose':
      return (
        <svg viewBox="0 0 400 200" className="w-full max-w-md mx-auto rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 p-4 shadow-sm">
          <text x="200" y="23" fill="#1e293b" className="dark:fill-slate-200" textAnchor="middle" fontSize="13" fontWeight="bold" fontFamily="Inter, sans-serif">Matrix Transpose: rows ➜ columns</text>
          <g transform="translate(45, 45)" fontFamily="JetBrains Mono, monospace" fontSize="11">
            <g transform="translate(0, 10)">
              <text x="35" y="-8" fill="#cbd5e1" textAnchor="middle" fontSize="9.5" fontFamily="Inter, sans-serif">Original (2x3)</text>
              <rect x="0" y="0" width="70" height="46" rx="4" fill="#1e293b" stroke="#334155" />
              <line x1="0" y1="23" x2="70" y2="23" stroke="#334155" strokeWidth="0.5" />
              <line x1="23" y1="0" x2="23" y2="46" stroke="#334155" strokeWidth="0.5" />
              <line x1="46" y1="0" x2="46" y2="46" stroke="#334155" strokeWidth="0.5" />
              <text x="11" y="15" fill="#f8fafc" textAnchor="middle">1</text>
              <text x="34" y="15" fill="#ffffff" textAnchor="middle">2</text>
              <text x="58" y="15" fill="#ffffff" textAnchor="middle">3</text>
              <text x="11" y="38" fill="#ffffff" textAnchor="middle">4</text>
              <text x="34" y="38" fill="#ffffff" textAnchor="middle">5</text>
              <text x="58" y="38" fill="#ffffff" textAnchor="middle">6</text>
            </g>
            <g transform="translate(105, 33)">
              <path d="M 0 0 L 30 0" fill="none" stroke="#cbd5e1" strokeWidth="1.5" markerEnd="url(#hello-arrow)" />
              <text x="15" y="-6" fill="#cbd5e1" fontSize="8" textAnchor="middle" fontFamily="Inter, sans-serif">Transpose</text>
            </g>
            <g transform="translate(180, 0)">
              <text x="23" y="2" fill="#10b981" textAnchor="middle" fontSize="9.5" fontWeight="bold" fontFamily="Inter, sans-serif">Transpose (3x2)</text>
              <rect x="0" y="10" width="46" height="70" rx="4" fill="#064e3b" stroke="#10b981" strokeWidth="1.5" />
              <line x1="0" y1="33" x2="46" y2="33" stroke="#10b981" strokeWidth="0.5" />
              <line x1="0" y1="56" x2="46" y2="56" stroke="#10b981" strokeWidth="0.5" />
              <line x1="23" y1="10" x2="23" y2="80" stroke="#10b981" strokeWidth="0.5" />
              <text x="11" y="26" fill="#34d399" textAnchor="middle" fontWeight="bold">1</text>
              <text x="34" y="26" fill="#34d399" textAnchor="middle" fontWeight="bold">4</text>
              <text x="11" y="49" fill="#34d399" textAnchor="middle" fontWeight="bold">2</text>
              <text x="34" y="49" fill="#34d399" textAnchor="middle" fontWeight="bold">5</text>
              <text x="11" y="72" fill="#34d399" textAnchor="middle" fontWeight="bold">3</text>
              <text x="34" y="72" fill="#34d399" textAnchor="middle" fontWeight="bold">6</text>
            </g>
          </g>
        </svg>
      );

    default:
      // Fallback diagram (General Concept Card representation)
      return (
        <svg viewBox="0 0 400 200" className="w-full max-w-md mx-auto rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 p-4 shadow-sm">
          <defs>
            <linearGradient id="back-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#4f46e5" />
              <stop offset="100%" stopColor="#8b5cf6" />
            </linearGradient>
          </defs>
          <rect x="40" y="30" width="320" height="130" rx="10" fill="url(#back-grad)" fillOpacity="0.05" stroke="#6366f1" strokeWidth="1" strokeDasharray="4" />
          <circle cx="200" cy="85" r="28" fill="#e0e7ff" />
          <text x="200" y="93" fill="#4f46e5" textAnchor="middle" fontSize="22">📚</text>
          
          <text x="200" y="138" fill="#4f46e5" textAnchor="middle" fontSize="11" fontWeight="bold" fontFamily="Inter, sans-serif">Concept Diagram Flow</text>
          <text x="200" y="152" fill="#64748b" textAnchor="middle" fontSize="9" fontFamily="Inter, sans-serif">Refer to the step descriptions for details on how this code operates.</text>
        </svg>
      );
  }
}

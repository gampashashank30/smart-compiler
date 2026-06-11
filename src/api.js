// API utility — uses Groq's OpenAI-compatible endpoint
// Key is scoped to this project (smart-compiler)

const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';
const GROQ_MODEL   = 'llama-3.3-70b-versatile';

// Hardcoded project API key — no user input required
const API_KEY = import.meta.env.VITE_GROQ_API_KEY || '';

/**
 * Call the Groq API (OpenAI-compatible)
 * @param {string} systemPrompt - The system instruction
 * @param {string} userMessage  - The user message
 * @returns {Promise<string>}   - Raw text content from the response
 */
export async function callClaude(systemPrompt, userMessage) {
  const response = await fetch(GROQ_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${API_KEY}`,
    },
    body: JSON.stringify({
      model: GROQ_MODEL,
      max_tokens: 4096,
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user',   content: userMessage  },
      ],
    }),
  });

  if (!response.ok) {
    const errBody = await response.text();
    throw new Error(`API error ${response.status}: ${errBody}`);
  }

  const data = await response.json();
  return data.choices?.[0]?.message?.content ?? '';
}

/**
 * Parse JSON safely from AI response.
 * Strips markdown code fences if the model wraps the JSON.
 */
export function parseJSON(raw) {
  let text = raw.trim();
  // Strip ```json ... ``` or ``` ... ``` wrapping
  text = text.replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/i, '');
  return JSON.parse(text);
}

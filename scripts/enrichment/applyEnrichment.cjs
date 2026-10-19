const fs = require('fs');
const path = require('path');

const g1 = require('./group1_lvl1_2.cjs');
const g2 = require('./group2_lvl3.cjs');
const g3 = require('./group3_lvl4.cjs');
const g4 = require('./group4_lvl5.cjs');

const enrichments = { ...g1, ...g2, ...g3, ...g4 };
console.log('Total enrichment definitions loaded:', Object.keys(enrichments).length);

// Load existing tutorData
const tutorDataPath = path.resolve(__dirname, '../../src/tutorData.js');
const rawCode = fs.readFileSync(tutorDataPath, 'utf8');

// Load curriculum object
const { TUTOR_CURRICULUM, TUTOR_LEVELS, TUTOR_CATEGORIES } = require(tutorDataPath);

let updatedCount = 0;

Object.entries(enrichments).forEach(([id, enrichment]) => {
  const topic = TUTOR_CURRICULUM[id];
  if (!topic) {
    console.warn(`Warning: topic ${id} not found in TUTOR_CURRICULUM`);
    return;
  }

  topic.concept = topic.concept || {};

  // Enrich whatIsIt if provided
  if (enrichment.whatIsIt) {
    topic.concept.whatIsIt = enrichment.whatIsIt;
  }

  // Enrich howItWorks if provided
  if (enrichment.howItWorks && enrichment.howItWorks.length > 0) {
    topic.concept.howItWorks = enrichment.howItWorks;
  }

  // Enrich keyTerms if provided
  if (enrichment.keyTerms && enrichment.keyTerms.length > 0) {
    topic.concept.keyTerms = enrichment.keyTerms;
  }

  // Enrich commonMistakes if provided
  if (enrichment.commonMistakes && enrichment.commonMistakes.length > 0) {
    topic.concept.commonMistakes = enrichment.commonMistakes;
  }

  // Enrich realWorldExample if provided
  if (enrichment.realWorldExample) {
    topic.concept.realWorldExample = enrichment.realWorldExample;
  }

  // Enrich logicHints keySteps if provided
  if (enrichment.logicKeySteps && enrichment.logicKeySteps.length > 0) {
    topic.logicHints = topic.logicHints || {};
    topic.logicHints.keySteps = enrichment.logicKeySteps;
  }

  updatedCount++;
});

console.log(`Successfully merged enrichments for ${updatedCount} topics.`);

// Reconstruct the file content
const newFileContent = `// ─── AI Tutor Curriculum Data ─────────────────────────────────────────────────
// Pre-written educational content for all C programming topics.
// NO AI generation here — every word is hardcoded for reliability.
// Based on Anna University / VTU / JNTU / Mumbai University B.Tech CS syllabi.

export const TUTOR_CURRICULUM = ${JSON.stringify(TUTOR_CURRICULUM, null, 4)};

export const TUTOR_LEVELS = ${JSON.stringify(TUTOR_LEVELS, null, 4)};

export const TUTOR_CATEGORIES = ${JSON.stringify(TUTOR_CATEGORIES, null, 4)};
`;

fs.writeFileSync(tutorDataPath, newFileContent, 'utf8');
console.log(`Successfully wrote updated tutorData.js (${(newFileContent.length / 1024).toFixed(1)} KB)`);

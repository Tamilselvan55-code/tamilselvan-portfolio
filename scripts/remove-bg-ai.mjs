/**
 * AI-powered background removal using @imgly/background-removal-node
 * Uses a U2Net neural network model for accurate subject segmentation.
 * Run: node scripts/remove-bg-ai.mjs
 */

import { removeBackground } from '@imgly/background-removal-node';
import { writeFileSync, readFileSync } from 'fs';
import { resolve } from 'path';

const INPUT  = resolve('./public/images/portrait.jpg');
const OUTPUT = resolve('./public/images/tamilselvan-cutout.png');

console.log('🤖 Starting AI background removal...');
console.log('   Input:', INPUT);
console.log('   Model will be downloaded on first run (~50MB)...');

const imageData = readFileSync(INPUT);
const blob = new Blob([imageData], { type: 'image/jpeg' });

const resultBlob = await removeBackground(blob, {
  model: 'medium',          // balanced quality/speed
  output: {
    format: 'image/png',
    quality: 0.95,
  },
  debug: false,
  progress: (key, current, total) => {
    if (total > 0) {
      const pct = Math.round((current / total) * 100);
      process.stdout.write(`\r   ${key}: ${pct}%   `);
    }
  },
});

console.log('\n✅ Background removed! Writing PNG...');
const buffer = Buffer.from(await resultBlob.arrayBuffer());
writeFileSync(OUTPUT, buffer);

const sizeKB = Math.round(buffer.length / 1024);
console.log(`✅ Saved: ${OUTPUT} (${sizeKB} KB)`);

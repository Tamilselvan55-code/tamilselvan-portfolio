const sharp = require('sharp');
const fs = require('fs');

async function clean() {
  const imgPath = 'public/images/tamilselvan-cutout.png';
  const { data, info } = await sharp(imgPath).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  
  const w = info.width;
  const h = info.height;
  
  let removed = 0;
  
  for (let y = 0; y < h * 0.4; y++) {
    for (let x = 0; x < w * 0.5; x++) {
      const idx = (y * w + x) * 4;
      const r = data[idx];
      const g = data[idx + 1];
      const b = data[idx + 2];
      const a = data[idx + 3];
      
      if (a > 0) {
        // Look for dark/greenish pixels near the left ear
        // The artifact is a dark clump of leaves.
        // It's likely dark and slightly green, or just very dark brown/black but NOT skin tone.
        // Let's just remove anything in a small bounding box if we can guess the box.
        // Actually, let's just make it slightly transparent if it's very dark and green.
        if (g > r && g > b) {
          data[idx + 3] = 0;
          removed++;
        }
      }
    }
  }
  
  console.log(`Removed ${removed} green-ish pixels from the top-left quadrant.`);
  
  await sharp(data, { raw: { width: w, height: h, channels: 4 } })
    .png()
    .toFile('public/images/tamilselvan-cutout.png');
    
  console.log('Cleaned image saved successfully!');
}

clean().catch(console.error);

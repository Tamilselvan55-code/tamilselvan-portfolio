import sharp from 'sharp';

async function fixHair() {
  const imgPath = 'public/images/tamilselvan-cutout.png';
  const { data, info } = await sharp(imgPath).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  
  const w = info.width;
  const h = info.height;
  
  let fixed = 0;
  
  // Top-left area where the artifact is: 
  // Let's say top 40% of height, left 50% of width
  for (let y = 0; y < h * 0.4; y++) {
    for (let x = 0; x < w * 0.5; x++) {
      const idx = (y * w + x) * 4;
      const r = data[idx];
      const g = data[idx + 1];
      const b = data[idx + 2];
      const a = data[idx + 3];
      
      // If it's a "white" pixel in the hair region, it's a speckle. Paint it black.
      // Hair is naturally dark, so bright pixels here are artifacts.
      if (a > 50 && (r > 120 || g > 120 || b > 120)) {
        // Paint it black/dark gray to match hair
        data[idx] = 15;
        data[idx + 1] = 15;
        data[idx + 2] = 15;
        data[idx + 3] = 255; // Make it solid
        fixed++;
      }
      
      // If it's a semi-transparent black pixel inside the hair blob, it's a hole.
      // We can make it solid black.
      if (a > 0 && a < 250 && r < 50 && g < 50 && b < 50) {
        // Make it solid so there are no transparent holes
        data[idx + 3] = 255;
        fixed++;
      }
    }
  }
  
  console.log(`Fixed ${fixed} pixels in the hair region.`);
  
  await sharp(data, { raw: { width: w, height: h, channels: 4 } })
    .png()
    .toFile('public/images/tamilselvan-cutout-fixed.png');
    
  console.log('Fixed image saved successfully!');
}

fixHair().catch(console.error);

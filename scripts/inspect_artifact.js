import sharp from 'sharp';

async function mapImage() {
  const { data, info } = await sharp('public/images/tamilselvan-cutout.png').ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  
  const w = info.width;
  const h = info.height;
  
  // We want to map the top-left quadrant (e.g. 0 to 40% height, 0 to 40% width)
  // Let's create a 60x40 ascii grid.
  const gridW = 80;
  const gridH = 40;
  
  const sx = Math.floor(w * 0.5); // only left half
  const sy = Math.floor(h * 0.5); // only top half
  
  let ascii = '';
  
  for (let gy = 0; gy < gridH; gy++) {
    for (let gx = 0; gx < gridW; gx++) {
      let active = false;
      let isArtifact = false;
      
      const px = Math.floor((gx / gridW) * sx);
      const py = Math.floor((gy / gridH) * sy);
      
      const blockW = Math.floor(sx / gridW);
      const blockH = Math.floor(sy / gridH);
      
      for(let y = py; y < py + blockH; y++) {
        for(let x = px; x < px + blockW; x++) {
          const idx = (y * w + x) * 4;
          if (data[idx + 3] > 50) {
            active = true;
            // Let's check if it's white or black
            const r = data[idx], g = data[idx+1], b = data[idx+2];
            if (r > 200 && g > 200 && b > 200) isArtifact = true;
            if (r < 50 && g < 50 && b < 50) isArtifact = true;
          }
        }
      }
      if (active && isArtifact) ascii += 'X';
      else if (active) ascii += '#';
      else ascii += '.';
    }
    ascii += '\n';
  }
  
  console.log(ascii);
  console.log('Image dimensions:', w, 'x', h);
}

mapImage().catch(console.error);

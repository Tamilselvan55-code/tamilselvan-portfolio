import sharp from 'sharp';
import fs from 'fs';

async function clean() {
  const imgPath = 'public/images/tamilselvan-cutout.png';
  const { data, info } = await sharp(imgPath).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  
  const w = info.width;
  const h = info.height;
  
  const isSolid = (i) => data[i * 4 + 3] > 10;
  
  const visited = new Uint8Array(w * h);
  const components = [];
  
  for (let i = 0; i < w * h; i++) {
    if (isSolid(i) && !visited[i]) {
      const comp = [];
      const q = [i];
      visited[i] = 1;
      
      let head = 0;
      while (head < q.length) {
        const curr = q[head++];
        comp.push(curr);
        
        const cx = curr % w;
        const cy = Math.floor(curr / w);
        
        if (cx > 0 && isSolid(curr - 1) && !visited[curr - 1]) { visited[curr - 1] = 1; q.push(curr - 1); }
        if (cx < w - 1 && isSolid(curr + 1) && !visited[curr + 1]) { visited[curr + 1] = 1; q.push(curr + 1); }
        if (cy > 0 && isSolid(curr - w) && !visited[curr - w]) { visited[curr - w] = 1; q.push(curr - w); }
        if (cy < h - 1 && isSolid(curr + w) && !visited[curr + w]) { visited[curr + w] = 1; q.push(curr + w); }
      }
      components.push(comp);
    }
  }
  
  components.sort((a, b) => b.length - a.length);
  console.log(`Found ${components.length} components. Keeping largest (${components[0].length} pixels). Removing others.`);
  
  for (let i = 1; i < components.length; i++) {
    for (const idx of components[i]) {
      data[idx * 4 + 3] = 0; // Alpha 0
    }
  }
  
  await sharp(data, { raw: { width: w, height: h, channels: 4 } })
    .png()
    .toFile('public/images/tamilselvan-cutout.png'); // Overwrite with cleaned version
    
  console.log('Cleaned image saved successfully!');
}

clean().catch(console.error);

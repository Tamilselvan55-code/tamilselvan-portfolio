import { removeBackground } from '@imgly/background-removal-node';
import fs from 'fs';

async function run() {
  const inputPath = 'public/images/cartoon-portrait.png';
  console.log('Removing background from', inputPath);
  
  try {
    const blob = await removeBackground(inputPath);
    const buffer = Buffer.from(await blob.arrayBuffer());
    fs.writeFileSync('public/images/cartoon-portrait-transparent.png', buffer);
    console.log('Successfully saved to public/images/cartoon-portrait-transparent.png');
  } catch (error) {
    console.error('Error:', error);
  }
}

run();

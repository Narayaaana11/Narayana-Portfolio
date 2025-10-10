import { createCanvas } from 'canvas';
import { writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Create a 32x32 canvas (standard favicon size)
const canvas = createCanvas(32, 32);
const ctx = canvas.getContext('2d');

// Set background
ctx.fillStyle = '#000000';
ctx.fillRect(0, 0, 32, 32);

// Set text properties
ctx.fillStyle = '#ffffff';
ctx.font = 'bold 24px Arial';
ctx.textAlign = 'center';
ctx.textBaseline = 'middle';

// Draw the 'N'
ctx.fillText('N', 16, 16);

// Convert to buffer and save
const buffer = canvas.toBuffer('image/png');
writeFileSync('public/favicon.ico', buffer);

console.log('New favicon generated!');

const canvas = document.getElementById('canvas');
const ctx =canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let isDrawing = false;
ctx.strokeStyle = '#000';
ctx.lineWidth = 20;
ctx.lineJoin = 'round';
ctx.lineCap = 'round';

let x = 0;
let y = 0;

function oekaki(e) {
  if (!isDrawing) return;
  ctx.beginPath();
  ctx.arc(x, y, 20, 0, 2 * Math.PI);
  ctx.moveTo(e.offsetX, e.offsetY);
  ctx.lineTo(x, y);
  ctx.fill();
  ctx.stroke();
  ctx.closePath();
}

canvas.addEventListener('mousedown', function(e) {
  isDrawing = true;
  oekaki(e);
}, false);

canvas.addEventListener('mousemove', function(e) {
  x = e.offsetX;
  y = e.offsetY;
  oekaki(e);
}, false);

canvas.addEventListener('mouseup', function() {
  isDrawing = false;
}, false);

canvas.addEventListener('mouseout', function() {
  isDrawing = false;
}, false);
import { Grid } from './grid.js';

let g1 = new Grid(1);
let g2 = new Grid(2);

// Reference image, must disappear in a bit
g1.newGrid(5, 5);
// User paint image
g2.newGrid(5, 5);

const grid_element1 = document.getElementById('grid1');
const grid_element2 = document.getElementById('grid2');

const color_circle1 = document.getElementById('color1');
const color_circle2 = document.getElementById('color2');
const color_circle3 = document.getElementById('color3');
const color_circle4 = document.getElementById('color4');
const eraser = document.getElementById('eraser');

let color_circle_list = Array.from(document.getElementsByClassName('color-circle'));

g1.render(grid_element1);
g2.render(grid_element2);

// setTimeout(() => { grid_element1.style.display = 'none'; }, 10000);

let color_list = ['#689942', '#6D5995', '#00527A', '#E75480']

for (let i in color_circle_list) {
  color_circle_list[i].style.backgroundColor = color_list[i];
}

let color = '#ffffff';

function set_paintbrush(hex){
  color = hex;
  color = color.replace('#', '');
}

color_circle_list.forEach(circ => {
  circ.addEventListener('click', set_paintbrush(circ.style.backgroundColor));
  console.log(circ.style.backgroundColor)
});

eraser.addEventListener("click", () => {
  set_paintbrush("#FFFFFF");
});

function paint_pixel(pixel) {
  g2.colorPixel(pixel, color);
}

function activate_pixels() {
  const pixels = Array.from(document.getElementsByClassName('2'));
  const pixel_event_funcs = [];
  pixels.forEach(pixel => {
    const paint_curr_pixel = () => paint_pixel(pixel);
    pixel_event_funcs.push(paint_curr_pixel);
    pixel.addEventListener('mousedown', paint_curr_pixel);
  });

  grid_element2.addEventListener("mousedown", () => {
    pixels.forEach((pixel, idx) => {
      pixel.addEventListener("mouseover", pixel_event_funcs[idx]);
    });
  });

  grid_element2.addEventListener("mouseup", () => {
    pixels.forEach((pixel, idx) => {
      pixel.removeEventListener("mouseover", pixel_event_funcs[idx])
    });
  });

  grid_element2.addEventListener("mouseleave", () => {
    pixels.forEach((pixel, idx) => {
      pixel.removeEventListener("mouseover", pixel_event_funcs[idx])
    });
  });
}

activate_pixels();

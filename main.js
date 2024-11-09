import { Grid } from './src/grid.js';

let g1 = new Grid(1);
let g2 = new Grid(2);

g1.newGrid(5, 5);
g2.newGrid(5, 5);

const grid_element1 = document.getElementById('grid1');
const grid_element2 = document.getElementById('grid2');

g1.render(grid_element1);
g2.render(grid_element2);

function activate_pixels(){
    let pixels = document.getElementsByClassName('2');
    for (let i = 0; i < pixels.length; i++) {
      pixels[i].addEventListener('click', () => {
        let color = document.getElementById('paintbrush').value;
        color = color.replace('#', '');
        g2.colorPixel(pixels[i], color);
      });
    }
  }

activate_pixels()
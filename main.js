import { Grid } from './src/grid.js';

let g1 = new Grid();
let g2 = new Grid();

g1.newGrid(5, 5);
g2.newGrid(5, 5);

const grid_element1 = document.getElementById('grid1');
const grid_element2 = document.getElementById('grid2');

g1.render(grid_element1);
g2.render(grid_element2);
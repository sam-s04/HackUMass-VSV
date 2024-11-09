import { Grid } from './src/grid.js';

let g = new Grid()
g.newGrid(5, 5)

const grid_element = document.getElementById('grid1')

g.render(grid_element);
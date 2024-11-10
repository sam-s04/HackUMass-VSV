import { Grid } from './grid.js';
const colors = [
  "#3357FF", // Royal Blue
  "#E75480", // Pink
  "#581845", // Dark Purple
  "#900C3F", // Burgundy
  "#C70039", // Crimson
  "#DAF7A6", // Light Green
  "#85C1E9", // Sky Blue
  "#A3E4D7", // Turquoise
  "#F4D03F", // Golden
  "#48C9B0", // Teal
  "#F1948A", // Light Salmon
  "#689942", // Green
  "#EB984E", // Burnt Orange
  "#A569BD", // Medium Purple
  "#5499C7", // Light Royal Blue
  "#48C9B0", // Light Teal
  "#FF5733", // Light Coral
  "#00527A", // Dark Blue
];

const get_random_number = (count) => {
  const shuffled_arr = colors.sort(() => 0.5 - Math.random());
  return shuffled_arr.slice(0, count);
}

let color_list = get_random_number(4);
console.log(color_list);

let g1 = new Grid(1);
let g2 = new Grid(2);

const grid_element1 = document.getElementById('grid1');
const grid_element2 = document.getElementById('grid2');

// Reference image, must disappear in a bit
g1.newGrid(5, 5);
// User paint image
g2.newGrid(5, 5);

g1.setup(grid_element1);
g2.setup(grid_element2);

const eraser = document.getElementById('eraser');

let color_circle_list = Array.from(document.getElementsByClassName('color-circle'));
console.log(color_circle_list);

let color = "ffffff";

const button = document.getElementById('button-wrapper');

function set_paintbrush(element, rgb) {
  color_circle_list.forEach(circ => {
    circ.style.borderColor = "white";
  });

  eraser.style.borderColor = "white";

  var a = rgb.split("(")[1].split(")")[0];

  a = a.split(",");

  var b = a.map(x => {             //For each array element
    x = parseInt(x).toString(16);      //Convert to a base16 string
    return (x.length == 1) ? "0" + x : x;  //Add zero if we get only one character
  });

  color = b.join("");
  element.style.borderColor = "black";
}

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

button.addEventListener('click', () => {
  console.log('button clicked lolol');
  run_game();

})

function run_game() {
  // 5 times, do:
  // render both grids, first one being the reference
  // Assign colors used to gen the reference in the palette
  // Set the timer for 10 seconds ref goes away
  // You have 15 to color out the palette
  // Check score

  color_list = get_random_number(4);
  button.style.visibility = 'hidden';
  // Reference image, must disappear in a bit
  g1.newGrid(5, 5);
  // User paint image
  g2.newGrid(5, 5);

  g1.randomizeGrid(color_list, 2);
  g1.updateGrid();
  g1.setup(grid_element1);
  g2.setup(grid_element2);

  for (let i in color_circle_list) {
    console.log(color_list[i])
    color_circle_list[i].style.backgroundColor = color_list[i];
  }

  color_circle_list.forEach(circ => {
    circ.addEventListener("click", () => set_paintbrush(circ, circ.style.backgroundColor));
  });

  eraser.addEventListener("click", () => {
    color = "ffffff";
    color_circle_list.forEach(circ => {
      circ.style.borderColor = "white";
    });
    eraser.style.borderColor = "black";
  });

  setTimeout(() => { grid_element1.clearGrid(); }, 10000);

  activate_pixels();
}

button.addEventListener('click', () => {
  run_game();
  setTimeout(() => { run_game(); }, 15000);
})
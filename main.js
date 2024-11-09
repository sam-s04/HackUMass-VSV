import { Grid } from './grid.js';
const colors = [
  "#FF5733", // Orange Red
  "#33FF57", // Lime Green
  "#3357FF", // Royal Blue
  "#FF33A5", // Hot Pink
  "#33FFF3", // Aqua
  "#FFC300", // Bright Yellow
  "#581845", // Dark Purple
  "#900C3F", // Burgundy
  "#C70039", // Crimson
  "#DAF7A6", // Light Green
  "#FF5733", // Coral
  "#33FFCE", // Mint Green
  "#FF5733", // Fiery Orange
  "#85C1E9", // Sky Blue
  "#A3E4D7", // Turquoise
  "#F4D03F", // Golden
  "#5DADE2", // Light Blue
  "#AF7AC5", // Lavender
  "#48C9B0", // Teal
  "#F1948A", // Light Salmon
  "#F5B041", // Light Orange
  "#52BE80", // Green
  "#EB984E", // Burnt Orange
  "#A569BD", // Medium Purple
  "#5499C7", // Light Royal Blue
  "#48C9B0", // Light Teal
  "#F4D03F", // Light Goldenrod
  "#85C1E9", // Light Blue Sky
  "#FF5733", // Light Coral
  "#33FFF3"  // Light Aqua
];
const get_colors = () => {
  const shuffled_arr = colors.sort(() => 0.5 - Math.random());
  return shuffled_arr.slice(0, 4);
}

let g1 = new Grid(1);
let g2 = new Grid(2);

// Reference image, must disappear in a bit
g1.newGrid(5, 5);
// User paint image
g2.newGrid(5, 5);

const grid_element1 = document.getElementById('grid1');
const grid_element2 = document.getElementById('grid2');

const eraser = document.getElementById('eraser');

let color_circle_list = Array.from(document.getElementsByClassName('color-circle'));

const button = document.getElementById('button-wrapper');

let color = "ffffff";

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

eraser.addEventListener("click", () => {
  color = "ffffff";
  color_circle_list.forEach(circ => {
    circ.style.borderColor = "white";
  });
  eraser.style.borderColor = "black";
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

button.addEventListener('click', () => {
  console.log('button clicked lolol');
  g1.randomizeGrid(color_list, 3);
  const pixels = Array.from(document.getElementsByClassName('1'));
  pixels.forEach(pixel => {
    const coord = JSON.parse(pixel.classList[1]);
    g1.colorPixel(pixel, g1.getGrid()[coord[0]][coord[1]]);
  });
})

function run_game() {
  for (let i = 0; i < 5; i++) {
    // Getting random colors from the our set colors
    rand_colors = get_colors();
    console.log("Random colors: ", rand_colors);

    // Render both grids
    g1.render(grid_element1);
    // Beginning the timer for the reference grid to disappear
    setTimeout(() => { grid_element1.style.display = 'none'; }, 10000);

    g2.render(grid_element2);

    // Setting the colors of the palette from random colors
    for (let i in color_circle_list)
      color_circle_list[i].style.backgroundColor = rand_colors[i];

    // Adding event listeners 
    color_circle_list.forEach(circ => {
      circ.addEventListener("click", () => set_paintbrush(circ, circ.style.backgroundColor));
    });
    activate_pixels();
  }
}



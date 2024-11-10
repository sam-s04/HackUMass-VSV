import { Grid } from './grid.js';
// import { saveScore, loadScore, editScore, deleteScore } from './db.js'

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

const color_circle_list = Array.from(document.getElementsByClassName('color-circle'));
const palette_circle_list = Array.from(document.getElementsByClassName('palette-circle'));

let color = "ffffff";

const button = document.getElementById('start_button');
const input = document.getElementById('name');

function set_paintbrush(element, rgb) {
  palette_circle_list.forEach(circ => {
    circ.classList.remove("active");
  });

  var a = rgb.split("(")[1].split(")")[0];

  a = a.split(",");

  var b = a.map(x => {             //For each array element
    x = parseInt(x).toString(16);      //Convert to a base16 string
    return (x.length == 1) ? "0" + x : x;  //Add zero if we get only one character
  });

  color = b.join("");
  element.classList.add("active");
}

function paint_pixel(pixel) {
  g2.colorPixel(pixel, color);
}

function activate_pixels() {
  const pixels = Array.from(document.getElementsByClassName('g2'));
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

function generatePermutation(arr) {
  // let temp = 0;
  // const arr = Array(n).fill(1).map(x => (temp += x) - 1);
  // fisher yates
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

async function random_clear_grid(grid) {
  const pixels = Array.from(document.getElementsByClassName('g1'));
  const pixels_to_clear = generatePermutation(pixels);
  for (const pixel of pixels_to_clear) {
    console.log(pixel);
    grid.colorPixel(pixel, "FFFFFF");
    await new Promise(r => setTimeout(r, 400));
  }
  // pixels_to_clear.forEach(async (pixel) => {
  //   grid.colorPixel(pixel, "FFFFFF");
  //   await new Promise(r => setTimeout(r, 300));
  // });
}

async function run_game() {
  // 5 times, do:
  // render both grids, first one being the reference
  // Assign colors used to gen the reference in the palette
  // Set the timer for 10 seconds ref goes away
  // You have 15 to color out the palette
  // Check score

  // button.style.display = 'none';
  // input.style.display = 'none';
  button.style.visibility = 'hidden';
  input.style.visibility = 'hidden';
  button.disabled = true;
  input.disabled = true;

  document.getElementById('score').innerHTML = "<h2>Score: 0 </h2>";
  // Reference image, must disappear in a bit
  g1.newGrid(5, 5);
  // User paint image
  g2.newGrid(5, 5);

  g1.randomizeGrid(color_list, 2);
  g1.updateGrid();
  g1.setup(grid_element1);
  g2.setup(grid_element2);

  let total_score = 0
  for (let i = 0; i < 5; i++) {
    color_list = get_random_number(4);
    // Reference image, must disappear in a bit
    g1.newGrid(5, 5);
    const copyGrid = g1.getGrid().map(row => row.map(x => x));
    // User paint image
    g2.newGrid(5, 5);

    g1.randomizeGrid(color_list, 2);
    g1.updateGrid();
    g2.updateGrid();
    g1.setup(grid_element1);
    g2.setup(grid_element2);

    for (let i in color_circle_list) {
      color_circle_list[i].style.backgroundColor = color_list[i];
    }

    activate_pixels();

    let viewable = new Promise(resolve => setTimeout(resolve, 10000)); // time the painting is visible
    await viewable;
    await random_clear_grid(g1);

    let unviewable = new Promise(resolve => setTimeout(resolve, 5000)); // time the user can draw with no painting visible
    await unviewable;
    total_score += g1.calcScore(copyGrid);
    document.getElementById('score').innerHTML = `<h2>Score: ${total_score}</h2>`;
  }
}

function setup_palette() {
  for (let i in color_circle_list) {
    console.log(color_list[i])
    color_circle_list[i].style.visibility = "visible";
    color_circle_list[i].style.backgroundColor = color_list[i];
  }
  eraser.style.visibility = "visible";

  color_circle_list.forEach((circ, idx) => {
    const activate_color = () => set_paintbrush(circ, circ.style.backgroundColor);
    circ.addEventListener("click", activate_color);
    document.addEventListener("keydown", e => {
      if (e.key === (idx + 1).toString()) {
        activate_color();
      }
    });
  });

  const activate_eraser = () => {
    color = "ffffff";
    color_circle_list.forEach(circ => {
      circ.classList.remove("active");
      // circ.style.borderColor = "white";
    });
    eraser.classList.add("active");
    // eraser.style.borderColor = "black";
  }

  eraser.addEventListener("click", activate_eraser);

  document.addEventListener("keydown", e => {
    if (e.key === " ") {
      activate_eraser();
    }
  });
}

button.addEventListener('click', () => {
  setup_palette()
  run_game();
})
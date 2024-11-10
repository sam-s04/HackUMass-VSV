import { Grid } from './grid.js';
import { leaderboard } from './leaderboard.js'


let players = await leaderboard.getAllScores();
const l = document.getElementById('leaderboard');
for (let item of players) {
  let new_div = document.createElement('div')
  new_div.innerHTML = `${item.name}: ${item.score}`;
  new_div.style.fontFamily = 'Raleway';
  new_div.style.fontSize = '25px';
  new_div.style.fontWeight = 'bold';
  l.appendChild(new_div);
}


const colors = [
  "#3357ff", // Royal Blue
  "#e75480", // Pink
  "#581845", // Dark Purple
  "#900c3f", // Burgundy
  "#c70039", // Crimson
  "#daf7a6", // Light Green
  "#85c1e9", // Sky Blue
  "#a3e4d7", // Turquoise
  "#f4D03f", // Golden
  "#f1948a", // Light Salmon
  "#689942", // Green
  "#eb984e", // Burnt Orange
  "#a569bd", // Medium Purple
  "#5499c7", // Light Royal Blue
  "#48c9b0", // Light Teal
  "#ff5733", // Light Coral
  "#00527a", // Dark Blue
];

const get_random_number = (count) => {
  const shuffled_arr = colors.sort(() => 0.5 - Math.random());
  return shuffled_arr.slice(0, count);
}

let color_list = get_random_number(4);

let g1 = new Grid(1);
let g2 = new Grid(2);

const grid_element1 = document.getElementById('grid1');
const grid_element2 = document.getElementById('grid2');
const game_info = document.getElementById('game-info');
const score = document.getElementById('score');
const timer = document.getElementById('timer');

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
const title_button = document.getElementById("title-button")

function start_game() {
  document.getElementById("title-screen").style.display = "none";
}

title_button.addEventListener("click", start_game);

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
  // fisher yates
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function start_timer() {
  let time_left = 20;
  timer.innerHTML = `<h2>Time left: ${time_left} </h2>`;
  const interval = setInterval(() => timer.innerHTML = `<h2>Time left: ${--time_left} </h2>`, 1000);
  return interval;
}

async function random_clear_grid(grid) {
  const pixels = Array.from(document.getElementsByClassName('g1'));
  const pixels_to_clear = generatePermutation(pixels);
  for (const pixel of pixels_to_clear) {
    grid.colorPixel(pixel, "ffffff");
    await new Promise(r => setTimeout(r, 300));
  }
}

async function run_game() {
  // 5 times, do:
  // render both grids, first one being the reference
  // Assign colors used to gen the reference in the palette
  // Set the timer for 10 seconds ref goes away
  // You have 15 to color out the palette
  // Check score

  button.style.visibility = 'hidden';
  const name = input.value;
  input.style.visibility = 'hidden';
  button.disabled = true;
  input.disabled = true;
  game_info.style.visibility = 'visible';

  score.innerHTML = "<h2>Score: 0 </h2>";
  // Reference image, must disappear in a bit
  g1.newGrid(5, 5);
  // User paint image
  g2.newGrid(5, 5);

  g1.setup(grid_element1);
  g2.setup(grid_element2);

  activate_pixels();

  const g1_cells = Array.from(document.getElementsByClassName("g1"));
  const g2_cells = Array.from(document.getElementsByClassName("g2"));

  const difficulties = [5, 2, 1, 0]
  let timer_interval = null;

  let total_score = 0
  for (let i = 0; i < 4; i++) {
    color_list = get_random_number(4);
    g1.clearGrid();
    g2_cells.forEach(cell => cell.classList.add("fast-transition"));
    g2.clearGrid();
    
    if (timer_interval !== null) {
      await new Promise(resolve => setTimeout(resolve, 1000));
      clearInterval(timer_interval);
    }
    
    g1.randomizeGrid(color_list, difficulties[i]);
    const copyGrid = g1.getGrid().map(row => row.map(x => x));
    g1.updateGrid();
    g2.updateGrid();
    g2_cells.forEach(cell => cell.classList.remove("fast-transition"));

    for (let i in color_circle_list) {
      color_circle_list[i].style.backgroundColor = color_list[i];
    }

    color = "ffffff";
    palette_circle_list.forEach(circ => circ.classList.remove("active"));

    const start_time = Date.now();
    timer_interval = start_timer();
    let viewable = new Promise(resolve => setTimeout(resolve, 10000)); // time the painting is visible
    await viewable;
    g1_cells.forEach(cell => cell.classList.remove("fast-transition"));
    await random_clear_grid(g1);
    g1_cells.forEach(cell => cell.classList.add("fast-transition"));
    const remaining_wait_time = 20000 - (Date.now() - start_time);
    let unviewable = new Promise(resolve => setTimeout(resolve, remaining_wait_time)); // time the user can draw with no painting visible
    await unviewable;
    total_score += g2.calcScore(copyGrid);
    score.innerHTML = `<h2>Score: ${total_score}</h2>`;
  }
  clearInterval(timer_interval);
  leaderboard.saveScore(name, total_score);
}

function setup_palette() {
  for (let i in color_circle_list) {
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
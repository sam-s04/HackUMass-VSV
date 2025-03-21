export class Grid {
  constructor(id) {
    this.grid = [];
    this.id = id;
    this.height = 0;
    this.width = 0;
  }

  getGrid() {
    return this.grid;
  }

  setGrid(grid) {
    this.grid = grid;
  }

  clearGrid() {
    this.grid = this.grid.map(row => row.map(_ => 'ffffff'))
  }

  newGrid(height, width) {
    this.grid = [];

    for (let i = 0; i < height; i++) {
      let row = [];
      for (let j = 0; j < width; j++) {
        row.push('ffffff');
      }
      this.grid.push(row);
    }
    this.height = height;
    this.width = width;
  }

  setup(element) {
    element.innerHTML = '';
    let scale = 50;
    element.style.height = `${this.height * scale}px`;
    element.style.width = `${this.width * scale}px`;
    element.style.gridTemplateColumns = `repeat(${this.width}, auto)`;
    for (let i = 0; i < this.height; i++) {
      for (let j = 0; j < this.width; j++) {
        let new_pixel = document.createElement('div');
        new_pixel.style.borderRadius = '3px';
        new_pixel.classList.add('pixel');
        new_pixel.classList.add(`[${i},${j}]`);
        new_pixel.classList.add(`g${this.id}`)
        let color = this.grid[i][j];
        this.colorPixel(new_pixel, color);
        element.appendChild(new_pixel);
      }
    }
  }

  updateGrid() {
    const pixels = Array.from(document.getElementsByClassName(`g${this.id}`));
    pixels.forEach(pixel => {
      const pos = JSON.parse(pixel.classList[1]);
      this.colorPixel(pixel, this.grid[pos[0]][pos[1]]);
    });
  }

  colorPixel(element, color) {
    let pos = JSON.parse(element.classList[1]); // example class list: pixel [1,1] 2
    this.grid[pos[0]][pos[1]] = color;
    element.style.backgroundColor = `#${color}`;
  }

  calcScore(reference_grid) {
    let correct_grid = reference_grid;
    let total_score = 0;
    const compare_colors = (c1, c2) => c1 === c2 ? 1 : 0;
    for (let row in this.grid) {
      for (let col in this.grid[row]) {
        total_score += (this.grid[row][col].toLowerCase() === correct_grid[row][col].toLowerCase() ? 1 : 0);
        console.log(total_score, this.grid[row][col].toLowerCase(), correct_grid[row][col].toLowerCase());
      }
    }
    return total_score;
  }

  /**
   * Assigns colors to the grid randomly, with grouping_factor controlling how likely adjacent cells will have same color
   * @param {number} colors colors to assign to the grid
   * @param {number} grouping_factor value between 0 and Infinity both exclusive); higher values increase chance of adjacent cells being same number. 1 results in completely random.
   */
  randomizeGrid(colors, grouping_factor) {
    const get_random_number = (min, max) => Math.random() * (max - min) + min;
    function weighted_rng(items, weights) {
      const cumulative_weights = weights.reduce((acc, w) => {
        acc.push(acc[acc.length - 1] + w);
        return acc;
      }, [0]).slice(1);
      let idx = -1;
      const random_num = get_random_number(0, cumulative_weights[items.length - 1]);
      while (++idx < items.length && cumulative_weights[idx] < random_num) { };
      return items[idx];
    }

    const in_grid_range = (i, j) => {
      return i >= 0 && i < this.height && j >= 0 && j < this.width;
    }

    const get_neighbors = (i, j) => {
      const out = [1, -1].reduce((values, offset) => {
        if (in_grid_range(i + offset, j) && this.grid[i + offset][j] !== null) {
          values.push(this.grid[i + offset][j]);
        }
        if (in_grid_range(i, j + offset) && this.grid[i][j + offset] !== null) {
          values.push(this.grid[i][j + offset]);
        }
        // [i, j].forEach(coord => {
        //   if (in_grid_range(i + offset_height, j + offset_width) && this.grid[i + offset_height][j + offset_width] !== null) {
        //     values.push(this.grid[i + offset_height][j + offset_width]);
        //   }
        // });
        return values;
      }, []);
      return out;
    }

    this.clearGrid();

    for (let i = 0; i < this.height; i++) {
      for (let j = 0; j < this.width; j++) {
        const neighbors = get_neighbors(i, j);
        const weights = {};
        colors.forEach(c => weights[c] = 1);
        neighbors.forEach(n => weights[`#${n}`] *= grouping_factor);
        const weights_arr = Object.values(weights).map(w => Number.isNaN(w) ? 0 : w);
        const random_color = weighted_rng(colors, weights_arr);
        this.grid[i][j] = random_color.replace(/\W/g, '');
      }
    }
  }
}
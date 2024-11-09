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

  newGrid(height, width) {
    this.grid = [];

    for (let i = 0; i < height; i++) {
      let row = []
      for (let j = 0; j < width; j++) {
        row.push(null);
      }
      this.grid.push(row);
    }
    this.height = height;
    this.width = width;
  }

  render(element) {
    element.innerHTML = '';
    let scale = 40;
    element.innerHTML = `<style id="style">
        .grid-class {
          display: grid;
          margin: auto;
          grid-template-columns: repeat(${this.width}, auto);
          height: ${this.height * scale}px;
          width: ${this.width * scale}px;
          margin-bottom: 3em;
        }
        </style>`;
  
      for(let i = 0; i < this.height; i++){
        for(let j = 0; j < this.width; j++){
          let new_pixel = document.createElement('div');
          new_pixel.classList.add('pixel');
          new_pixel.classList.add(`[${i},${j}]`);
          new_pixel.classList.add(`${this.id}`)
          let color = this.grid[i][j];
          this.colorPixel(new_pixel, color);
          element.appendChild(new_pixel);
        }
      }
    }
  
    colorPixel(element, color){
      let pos = JSON.parse(element.classList[1]); // example class list: pixel [1,1] 2
      this.grid[pos[0]][pos[1]] = color;
      element.style.backgroundColor = `#${color}`;
    }

    calcScore(reference_grid) {
      correct_grid = reference_grid.getGrid();
      total_score = 0;
      const pts_per_correct = 1
      const compare_colors = (c1, c2) => c1 === c2 ? pts_per_correct : 0;
      total_score = this.grid.reduce((score, row, i) => {
        return row.reduce(
          (row_score, curr_color, j) => row_score + compare_colors(curr_color, correct_grid[i][j]), score
        );
      }, 0)
      // for (i = 0; i < user_ans.length; i++) {
      //   // Get element by ID and compare colors
      //   elem1 = html.getElementById();
      //   elem2 = html.getElementById();
      //   // if elem1.getComputedStyle().fill == elem2.getComputedStyle().fill
      //   // Score += 1
      // }
      return total_score / (this.height * this.width);
    }

    /**
     * Assigns colors to the grid randomly, with grouping_factor controlling how likely adjacent cells will have same color
     * @param {number} colors colors to assign to the grid
     * @param {number} grouping_factor value between 0 and 1; higher values increase chance of adjacent cells being same number
     */
    createRandomMapping(colors, grouping_factor) {
      const get_random_number = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
      function weighted_rng(items, weights) {
        const cumulative_weights = weights.reduce((acc, w) => {
          acc.push(acc[acc.length-1] + w);
          return acc;
        }, [0]).slice(1);
        let idx = -1;
        const random_num = get_random_number(0, cumulative_weights[items.length-1]);
        while (++idx < items.length && cumulative_weights[idx] < random_num) { };
        return items[idx-1];
      }

      function in_grid_range(i, j) {
        return i >= 0 && i <= this.grid.height && j >= 0 && j <= this.grid.width;
      }

      function get_neighbors(i, j) {
        return [1, -1].reduce((values, offset_height) => 
          [1, -1].forEach(offset_width => {
            if (in_grid_range(i + offset_height, j + offset_width)) {
              values.push(this.grid[i + offset_height][j + offset_width]);
            }
          }), []
        );
      }

      function clear_grid() {
        for (const i = 0; i < this.grid.height; i++) {
          for (const j = 0; j < this.grid.width; j++) {
            this.grid[i][j] = null;
          }
        }
      }

      for (const i = 0; i < this.grid.height; i++) {
        for (const j = 0; j < this.grid.width; j++) {
          const neighbors = get_neighbors(i, j);
          // UNFINISHED
          this.grid[i][j];
        }
      }
      
      getRandomNumber()
    }
  }
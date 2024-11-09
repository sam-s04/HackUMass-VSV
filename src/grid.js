export class Grid {
  constructor(id) {
    this.grid = [];
    this.id = id;
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
  }

  render(element) {
    element.innerHTML = '';
    let height = this.grid.length;
    let width = this.grid[0].length;
    let scale = 40;
    element.innerHTML = `<style id="style">
        .grid-class {
          display: grid;
          margin: auto;
          grid-template-columns: repeat(${width}, auto);
          height: ${height * scale}px;
          width: ${width * scale}px;
          margin-bottom: 3em;
        }
        </style>`;
  
      for(let i = 0; i < height; i++){
        for(let j = 0; j < width; j++){
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
  }
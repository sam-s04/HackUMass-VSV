export class Grid {
    constructor(){
      this.grid = []
    }
  
    getGrid(){
      return this.grid;
    }
  
    setGrid(grid){
      this.grid = grid;
    }
  
    newGrid(height, width){
      this.grid = [];
  
      for(let i = 0; i < height; i++){
        let row = []
        for(let j = 0; j < width; j++){
          row.push(null);
        }
        this.grid.push(row);
      }
    }
  
    render(element){
      element.innerHTML = '';
      let height = this.grid.length;
      let width = this.grid[0].length;
      let scale = 40;
      element.innerHTML = `<style id="style">
        .grid-class {
          display: grid;
          margin: auto;
          grid-template-columns: repeat(${width}, auto);
          height: ${height*scale}px;
          width: ${width*scale}px;
          margin-bottom: 3em;
        }
        </style>`;
  
      for(let i = 0; i < height; i++){
        for(let j = 0; j < width; j++){
          let new_pixel = document.createElement('div');
          new_pixel.classList.add('pixel');
          new_pixel.classList.add('standard');
          new_pixel.classList.add(`[${i},${j}]`);
          let color = this.grid[i][j];
          this.colorPixel(new_pixel, color);
          element.appendChild(new_pixel);
        }
      }
    }
  
    colorPixel(element, color){
      let pos = JSON.parse(element.classList[2]); // example class list: pixel standard [1,1]
      this.grid[pos[0]][pos[1]] = color;
      element.innerHTML = `<style>
        .\\[${pos[0]}\\,${pos[1]}\\] {
          background-color: #${color};
        }
        </style>`;
    }
  }
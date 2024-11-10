class Leaderboard {
    constructor(){
      this.board = [];
    }
  
    getLeaderboard(){
      return this.board;
    }

    async saveScore(name, score){
      this.board.push((name, score));
      try{
        await fetch(`/save?name=${name}&score=${score}`, {method: 'POST'});
      }
      catch(err){
        console.log(err);
      }
    }
  
    async getAllScores(){
      try{
        let response = await fetch(`/load`, {method: 'GET'});
        res = response.json;
        this.board.push(Object.values(res));
      }
      catch(err){
        console.log(err);
      }
    }
  
    async editScore(name, score){
      try{
        await fetch(`/edit?name=${name}&score=${score}`, {method: 'PUT'});
      }
      catch(err){
        console.log(err);
      }
    }
  
    async deleteScore(name){
      const index = this.board.indexOf(name);
      this.board.splice(index, 1);
      try{
        await fetch(`/delete?name=${name}`, {method: 'DELETE'});
      }
      catch(err){
        console.log(err);
      }
    }
  
    render(element){
      for(let pair of this.board){
        let row = document.createElement('tr');
        row.innerHTML = `<td>${pair[0]}: ${pair[1]}</td>`
        element.appendChild(row);
      }
    }
  }
  
  export const leaderboard = new Leaderboard();
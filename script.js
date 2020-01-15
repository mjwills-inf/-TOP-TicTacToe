const gameBoard = (function() {
  
  const gridContainer = document.getElementById('grid-container');
  console.log(gridContainer);

  
  const boardTiles = [
    [1, 2, 2],
    [1, 2, 1],
    [2, 1, 0],
  ];
  
  console.log(boardTiles)


  const render = () => {
    for (i=0; i<boardTiles.length; i++) {
      for (j=0; j<boardTiles[i].length; j++) {
        let newDiv = document.createElement('div');
        newDiv.classList = 'tile';
        newDiv.setAttribute('array-ref', "[" + i + "]" + "[" + j + "]");
        newDiv.setAttribute('content', boardTiles[i][j])
        gridContainer.appendChild(newDiv);
        
      }
    }
  }

  return {
    render,
    boardTiles,
  }
  

})();

gameBoard.render();
console.log(gameBoard.boardTiles[0][0])






const players = () => {
};



const game = (function() {
})();

// variable for game StaticRange, running, turn
// event listeners 

// 2 players, gameboard, game classes
// in game have reference to players and game
// have reference to state (running, results, over)
// current player variable
// function swtich player
// event listeners
// on click grab current player from game object 
// assign to grid
// check if complete
// switch player if so

// render function in game that calls gameboard.render 
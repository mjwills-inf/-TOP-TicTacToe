/////////////////////////////////////////////////////////////////////
const gameBoard = (function() {
  
  const gridContainer = document.getElementById('grid-container');
  console.log(gridContainer);

  
  let boardTiles = [
    [1, 2, 2],
    [1, 2, 1],
    [2, 1, 0],
  ];

  const renderBoard = () => {
    for (i=0; i<boardTiles.length; i++) {
      for (j=0; j<boardTiles[i].length; j++) {
        let newDiv = document.createElement('div');
        newDiv.classList = 'tile';
        newDiv.setAttribute('array-ref', i + "" + j);
        newDiv.addEventListener('click', game.tileSelection);       
        gridContainer.appendChild(newDiv);        
      }
    }
  }

  const renderMark = (whichTile, whichMark) => {
    // split array ref into 2 variables and use those variables in bracket note for array
    // boardTiles[var1][var2]
    
    //.setAttribute('content', boardTiles[i][j])
    
    console.log(whichTile);
    console.log(typeof(whichTile));
  }   

  return {
    renderBoard,
    renderMark,
  }
  
})();


//////////////////////////////////////////////////////////////////////
const players = () => {
};


//////////////////////////////////////////////////////////////////////
const game = (function() {  

  const tileSelection = (event) => {
    let tile = event.target.getAttribute('array-ref');
    
    gameBoard.renderMark(tile, ) //some variable for 1 or 2)    
  }

  return {
    tileSelection
  }

})();

/////////////////////////////////////////////////////////////////////

gameBoard.renderBoard()



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

// render function in game that calls gameboard.renderMark
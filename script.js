
// Player Factory
const players = (name, pNum) => {
  const getName = () => name;
  const mark = () => pNum;
  return {getName, mark}  
};


const p1 = players('Human', 1);
const p2 = players('Computer', -1);

// Gameboard Module
const gameBoard = (function() {  
  let boardTiles = [
    [, , ,],    
    [, , ,],
    [, , ,],
  ];
  const gridContainer = document.getElementById('grid-container');  
  const getBoard = () => boardTiles
  const renderBoard = () => {
    for (i=0; i<boardTiles.length; i++) {
      for (j=0; j<boardTiles[i].length; j++) {
        let newDiv = document.createElement('div');
        newDiv.classList = 'tile';
        newDiv.setAttribute('id', i + "" + j);
        newDiv.addEventListener('click', game.tileSelection);       
        gridContainer.appendChild(newDiv);        
      }
    }
  }  
  const renderMark = (whichTile, whichMark) => {
    let arrayRefOne = whichTile.charAt(0);
    let arrayRefTwo = whichTile.charAt(1);
    let targetDiv = document.getElementById(whichTile);
    targetDiv.setAttribute('content', whichMark);
    boardTiles[arrayRefOne][arrayRefTwo] = whichMark;  
  }
  return {
    renderBoard,
    renderMark,
    getBoard,
  }  
})();

// Game Module
const game = (function() {    
  let currentPlayer = p1;
  let turnCount = 0;
  let won = false;  
  const tileSelection = (event) => {
    let tile = event.target.getAttribute('id');    
    if (event.target.getAttribute('content') == null) {    
      gameBoard.renderMark(tile, currentPlayer.mark());
      turnChange();
      checkWin();
    }
  };  
  const turnChange = () => {
    (currentPlayer == p1) ? currentPlayer = p2 : currentPlayer = p1;
  };    
  const checkWin = () => {
    turnCount++;
    let arrCopy = gameBoard.getBoard();
    for (i = 0; i < arrCopy.length; i++) {
      let checkTotal = arrCopy[i][0] + arrCopy[i][1] + arrCopy[i][2];
      if (checkTotal == 3 || checkTotal == -3) {
        winnerIs(arrCopy[i][0]);
      }
    }
    for (i = 0; i < arrCopy.length; i++) {
      let checkTotal = arrCopy[0][i] + arrCopy[1][i] + arrCopy[2][i];
      if (checkTotal == 3 || checkTotal == -3) {
        winnerIs(arrCopy[0][i]);
      }
    }
    let checkTotalDiag1 = arrCopy[0][0] + arrCopy[1][1] + arrCopy[2][2];
    if (checkTotalDiag1 == 3 || checkTotalDiag1 == -3) {
      winnerIs(arrCopy[0][0]);
    }
    let checkTotalDiag2 = arrCopy[0][2] + arrCopy[1][1] + arrCopy[2][0];
    if (checkTotalDiag2 == 3 || checkTotalDiag2 == -3) {
      winnerIs(arrCopy[0][2]);
    }
    if (turnCount == 9) {
      drawCheck()
    }
  };
  const drawCheck = () => {
    if (won == false) {
      console.log("draw")
    }        
  }
  const winnerIs = (pNum) => {
    won = true;
    console.log(`winner is ${pNum}`)
  }
  return {
    tileSelection,    
  }

  //reset function has to clear all attribute 'content' from divs
  //reduce turn count to 0
  //won to false
})();


// Page display/DOM module
const displayController = (function() {
  const modal = document.getElementById('input-modal');  
  const toggleModal = () => {
    (modal.style.display == 'none' || modal.style.display == 'z') ?
        modal.style.display = 'block' : modal.style.display = 'none'; 
  }

  return {
    toggleModal
  }
})();

gameBoard.renderBoard()


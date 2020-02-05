
// Player Factory ///////////////////////////////////////////////////////////////////////
const players = (name, pNum) => {
  const getName = () => name;
  const mark = () => pNum;
  return {getName, mark}  
};

// Gameboard Module /////////////////////////////////////////////////////////////////////
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
  let divTiles = document.getElementsByClassName("tile");
  const clearBoard = () => {    
    boardTiles = [
      [, , ,],    
      [, , ,],
      [, , ,],
    ];
    
    for (i=0; i<divTiles.length; i++) {
      divTiles[i].removeAttribute('content');
      divTiles[i].addEventListener('click', game.tileSelection);
    }
  }
  const clearListeners = () => {
    for (i=0; i<divTiles.length; i++) {
      divTiles[i].removeEventListener('click', game.tileSelection)
    }
  }
    
  return {
    renderBoard,
    renderMark,
    getBoard,
    clearBoard,
    clearListeners,
  }  
})();

// Game Module //////////////////////////////////////////////////////////////////////////
const game = (function() {

  let p1;
  let p2;
  let currentPlayer = p1;
  let turnCount = 0;
  let won = false;  
  
  updatePlayers = () => {    // This is here because of bad 1/-1 p1/p2 plan
    let playerChoice = document.querySelector('input[name="turn"]:checked').value;
    if (playerChoice == 1) {
      p1 = players(document.querySelector('#name1').value, 1);
      p2 = players(document.querySelector('#name2').value, -1);
    } else {
      p1 = players(document.querySelector('#name2').value, 1);
      p2 = players(document.querySelector('#name1').value, -1);
    }
    currentPlayer = p1;
  }  
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
  const checkWin = () => {   // Should have just checked for winning array arrangments
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
      displayController.announce("Nobody here");     
    }        
  }  
  const winnerIs = (pNum) => {
    won = true;    
    if (p1.mark() == pNum) {
      displayController.announce(p1.getName())
    } else {
      displayController.announce(p2.getName())
    }
    gameBoard.clearListeners();
  }  
  const reset = () => {  
    currentPlayer = p1;
    turnCount = 0;
    won = false;
    gameBoard.clearBoard();
  }
  return {
    tileSelection,
    updatePlayers,
    reset    
  }  
})();

// Page display/DOM module //////////////////////////////////////////////////////////////
const displayController = (function() {

  const startButton = document.getElementById('start');
  const modal = document.getElementById('input-modal');
  const resetButton = document.getElementById('reset');
  const optionsButton = document.getElementById('options');
  const resultDiv = document.getElementById('result');
  
  closeModal = () => {
    modal.style.display = 'none';
  }
  updateDisplay = () => {
    document.querySelector('#name1-display').textContent = 
        document.querySelector('#name1').value;
    document.querySelector('#name2-display').textContent = 
        document.querySelector('#name2').value;
    if (document.querySelector('input[name="turn"]:checked').value == 1) {
      document.querySelector('#name1-mark').textContent = "(X)";
      document.querySelector('#name2-mark').textContent = "(O)";
    } else {
      document.querySelector('#name1-mark').textContent = "(O)";
      document.querySelector('#name2-mark').textContent = "(X)";
    }
  }
  announce = (name) => {    
    resultDiv.innerText = name + " is Victorious"
  }

  startButton.addEventListener('click', () => {
    game.updatePlayers();
    updateDisplay();
    closeModal();
  });
  resetButton.addEventListener('click', () => {
    game.reset();
    resultDiv.innerText = "";
  });
  optionsButton.addEventListener('click', () => {
    game.reset();
    modal.style.display = 'flex';
    resultDiv.innerText = '';
  });  
  return {
    announce
  }
})();

gameBoard.renderBoard();




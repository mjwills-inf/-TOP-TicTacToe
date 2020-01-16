const gameBoard = (function() {   
  let boardTiles = [
    [0, 0, 0],    
    [0, 0, 0],
    [0, 0, 0],
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


const players = (name, pNum) => {
  const getName = () => name;
  const mark = () => pNum;
  return {getName, mark}  
};

//////////////////////////////////
const p1 = players('Human', 1);
const p2 = players('Computer', 2);
//////////////////////////////////
// player picks p1(x) or p2(o)
//
//////////////////////////////////

const game = (function() {
  let currentPlayer = p1;
  const tileSelection = (event) => {
    let tile = event.target.getAttribute('id');    
    if (event.target.getAttribute('content') < 1) {    
      gameBoard.renderMark(tile, currentPlayer.mark());
      turnChange();
      checkWin();
    }
  };
  const turnChange = () => {
    (currentPlayer == p1) ? currentPlayer = p2 : currentPlayer = p1;
  };
  
  
  
  
  
  const checkWin = () => {    
    let arrCopy = gameBoard.getBoard();
    console.log(arrCopy)
    
    for (i = 0; i < 3; i++) {
     
      let checkTotal = arrCopy[0][i] + arrCopy[1][i] + arrCopy[2][i];
      let checkLine = false
      // console.log(checkTotal)
      // console.log(i)
      // console.log(arrCopy[0][i])
      // console.log(arrCopy[1][i])
      // console.log(arrCopy[2][i])

      if ((arrCopy[0][i] == arrCopy[1][i]) && (arrCopy[0][i] == arrCopy[2][i])) {
        checkLine = true;
        console.log (checkLine);
        console.log (checkTotal)
    }

    // for (i = 0; i < 3; i++) {
    //   if (arrCopy[i][0] == arrCopy[i][1] == arrCopy[i][2]) {
    //     console.log("winner row");
    //   }
    // }
    // for (i = 0; i < 3; i++) {
    //   if (arrCopy[0][0] == arrCopy[1][1] == arrCopy[2][2]) {
    //     console.log("winner diagonal1");
    //   }
    // }
    // for (i = 0; i < 3; i++) {
    //   if (arrCopy[0][2] == arrCopy[1][1] == arrCopy[2][0]) {
    //     console.log("winner diagonal");
    //   }
    }

  //   let arrCopy = [
  //     [1, 0, 0],    
  //     [0, 0, 0],
  //     [0, 0, 0],
  //   ];
  
  // undefined
  // for (i = 0; i < arrCopy.length; i++) {
  //     let checkLine = false;
  //     if ((arrCopy[0][i] == arrCopy[1][i]) && (arrCopy[0][i] == arrCopy[2][i])) {
  //         checkLine = true;
  //     }
  //     console.log(checkLine)
  // }
       
  // VM1659:6 false
  // 2VM1659:6 true
    





  };


  //reset function has to clear all attribute 'content' from divs

  return {
    tileSelection,    
  }

})();

gameBoard.renderBoard()


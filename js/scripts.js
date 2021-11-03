function Player(name, mark) {
  this.name = name;
  this.mark = mark;
}

function Space(xCoord, yCoord) {
  this.x = xCoord;
  this.y = yCoord;
  this.mark = '';
  this.id = xCoord + yCoord;
}

Space.prototype.markSpace = function(player) {
  this.mark = player.mark;
};

function Board() {
  this.spaces = {};
}

Board.prototype.newBoard = function() {
  let xAxis = ['a', 'b', 'c'];

  for (let j=0; j<3; j++) {
    for (let i=1; i<=3; i++) {
      let newSpace = new Space(xAxis[j], i.toString());
      this.addSpace(newSpace);
    }
  }
}

Board.prototype.addSpace = function(space) {
  this.spaces[space.id] = space;
};

// board.spaces["a1"] to get space(a, 1)

function Game(name1, name2, mark1, mark2) {
  this.player1 = new Player(name1, mark1);
  this.player2 = new Player(name2, mark2);
  this.board = new Board();
  this.board.newBoard();
}

$(document).ready(function() {
  $("form#form1").submit(function(event) {
    event.preventDefault();
    $("#start-form").hide();
    $("#game-space").fadeIn();

    const name1 = $("input#player-1").val();
    const name2 = $("input#player-2").val();
    const mark1 = $("input#p1-mark").val().toUpperCase();
    const mark2 = $("input#p2-mark").val().toUpperCase();
    let newGame = new Game(name1, name2, mark1, mark2);
  });
});
/*
  a b c
1|_|_|_|
2|_|_|_|
3|_|_|_|
*/

/*
function gameOver(gameBoard) {
  let winner = '';
  gameBoard.forEach(function(zone) {
    if (!gameBoard[0].includes("") && !gameBoard[1].includes("") &&!gameBoard[2].includes("")) {
      winner = 'Draw!';
    }
    if (zone[0] != '' && zone[0] === zone[1] && zone[1] === zone[2]){
      winner = zone[0];
    }
  });
  return winner;
}

$(document).ready(function() {
  let gameSpaces = ['', '', '', '', '', '', '', '', '',];
  let player1 = 'X';
  $(".btn").on("click", function() {
    this.innerHTML = player1;
    this.disabled = true;
    let spaceId = parseInt(this.id);
    gameSpaces[spaceId] = player1;
    
    let topRow = [gameSpaces[0], gameSpaces[1], gameSpaces[2]];
    let midRow = [gameSpaces[3], gameSpaces[4], gameSpaces[5]];
    let bottomRow = [gameSpaces[6], gameSpaces[7], gameSpaces[8]];
    let leftColumn = [gameSpaces[0], gameSpaces[3], gameSpaces[6]];
    let middleColumn = [gameSpaces[1], gameSpaces[4], gameSpaces[7]];
    let rightColumn = [gameSpaces[2], gameSpaces[5], gameSpaces[8]];
    let leftDiagonal = [gameSpaces[0], gameSpaces[4], gameSpaces[8]];
    let rightDiagonal = [gameSpaces[6], gameSpaces[4], gameSpaces[2]];

    let gameBoard = [topRow, midRow, bottomRow, leftColumn, middleColumn, rightColumn, leftDiagonal, rightDiagonal];

    if (player1 === 'X') {
      player1 = 'O';
    } else {
      player1 = 'X';
    }

    let finished = gameOver(gameBoard);
    if (finished !== '') {
      $("#outcome").html("The winner is... " + finished + "!");
      $(".btn").prop('disabled', true);
      $("#player-indicator").hide();
    } else {
      $("#player").text(player1);
    }
  });
});
*/
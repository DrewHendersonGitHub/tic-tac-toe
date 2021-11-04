function Player(name, mark) {
  this.name = name;
  this.mark = mark;
  this.active = false;
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

Board.prototype.gameOver = function() {
  if (this.spaces['a1'].mark !== '' && this.spaces['a1'].mark === this.spaces['b1'].mark && this.spaces['b1'].mark === this.spaces['c1'].mark) {
    return 'winner'
  }
  if (this.spaces['a2'].mark !== '' && this.spaces['a2'].mark === this.spaces['b2'].mark && this.spaces['b2'].mark === this.spaces['c2'].mark) {
    return 'winner'
  }
  if (this.spaces['a3'].mark !== '' && this.spaces['a3'].mark === this.spaces['b3'].mark && this.spaces['b3'].mark === this.spaces['c3'].mark) {
    return 'winner'
  }
  if (this.spaces['a1'].mark !== '' && this.spaces['a1'].mark === this.spaces['a2'].mark && this.spaces['a2'].mark === this.spaces['a3'].mark) {
    return 'winner'
  }
  if (this.spaces['b1'].mark !== '' && this.spaces['b1'].mark === this.spaces['b2'].mark && this.spaces['b2'].mark === this.spaces['b3'].mark) {
    return 'winner'
  }
  if (this.spaces['c1'].mark !== '' && this.spaces['c1'].mark === this.spaces['c2'].mark && this.spaces['c2'].mark === this.spaces['c3'].mark) {
    return 'winner'
  }
  if (this.spaces['a1'].mark !== '' && this.spaces['a1'].mark === this.spaces['b2'].mark && this.spaces['b2'].mark === this.spaces['c3'].mark) {
    return 'winner'
  }
  if (this.spaces['a3'].mark !== '' && this.spaces['a3'].mark === this.spaces['b2'].mark && this.spaces['b2'].mark === this.spaces['c1'].mark) {
    return 'winner'
  }
  let checkDraw = [];
  let spaceArray = Object.keys(this.spaces);
  for (let i = 0; i < spaceArray.length; i++) {
    checkDraw.push(this.spaces[spaceArray[i]].mark);
  }
  if (!checkDraw.includes('')) {
    return 'Draw!';
  }
  return '';
}

function Game(name1, name2, mark1, mark2) {
  this.players = {};
  this.players[1] = new Player(name1, mark1);
  this.players[2] = new Player(name2, mark2);
  this.board = new Board();
  this.board.newBoard();
  this.players[1].active = true;
}

function activePlayer(ourCurrentGame) {
  let activeId = 0;
  let inactiveId = 0;
  Object.keys(ourCurrentGame.players).forEach(function(key) {
    if (ourCurrentGame.players[key].active) {
      activeId = key;
    } else {
      inactiveId = key;
    }
  });
  ourCurrentGame.players[activeId].active = false;
  ourCurrentGame.players[inactiveId].active = true;
  return [activeId, inactiveId];
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
    let winner = '';

    $("#p1-name").html(name1);
    $("#p2-name").html(name2);
    $("#p1-mark").html(mark1);
    $("#p2-mark").html(mark2);

    let newGame = new Game(name1, name2, mark1, mark2);
    $("#player").text(newGame.players[1].name);
    $(".game").on("click", function() {
      let myTurn = activePlayer(newGame);
      newGame.board.spaces[this.id].markSpace(newGame.players[myTurn[0]]);
      this.innerHTML = newGame.players[myTurn[0]].mark;
      this.disabled = true;
      $("#player").text(newGame.players[myTurn[1]].name);
      winner = newGame.board.gameOver();
      if (winner !== '') {
        $("#player-indicator").hide();
        if (winner === 'winner') {
          $("#outcome").html("The winner is... " + newGame.players[myTurn[0]].name + "!");
          $(".game").prop('disabled', true);
        } else {
          $("#outcome").html("This game is a draw! Better luck next time losers!!");
        }
        
      }
    });
  });
});
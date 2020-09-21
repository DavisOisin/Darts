function Player(n, s, t, id)
{
    this.name = n;
    this.score = s;
    this.turn = t;
    this.dart = 0;
    this.history = [];
    this.realhistory = []
    this.id = id
}


function startGame()
{
   var startingScore = document.getElementById("startScore").value;
   if (startingScore == ""){
      startingScore = 301
   }

   var name1 = document.getElementById("player1Name").value;
   if (name1 == ""){
      name1 = "player1"
   }

   var name2 = document.getElementById("player2Name").value;
   if (name2 == ""){
      name2 = "player2"
   }

   player1 = new Player(name1, startingScore, true, "p1");
   player2 = new Player(name2, startingScore, false, "p2");
   currentDart = 1;

   document.getElementById("gameSection").style.display = "inline";
   document.getElementById("inputSection").style.display = "none";
   document.getElementById("p1name").innerHTML = player1.name;
   document.getElementById("p2name").innerHTML = player2.name;
   document.getElementById("p1score").innerHTML = startingScore;
   document.getElementById("p2score").innerHTML = startingScore;
}



function throwdart(points){
   document.getElementById("notice").innerHTML = "";

   if (player1.turn)
   {
      updateScore(player1, points)
      checkwin(player1)
      document.getElementById("p1history").innerHTML = player1.history;
   }
   else
   {
      updateScore(player2, points)
      checkwin(player2)
      document.getElementById("p2history").innerHTML = player2.history;
   }

   document.getElementById("realhistory1").innerHTML = player1.realhistory;
   document.getElementById("realhistory2").innerHTML = player2.realhistory;

   displayHistory(player1)
   displayHistory(player2)

   document.getElementById("p1score").innerHTML = player1.score;
   document.getElementById("p2score").innerHTML = player2.score;

   if (currentDart == 3)
   {
      player1.turn = !player1.turn;
      player2.turn = !player2.turn;

      if (player1.turn)
      {
         document.getElementById("currentturn").innerHTML = player1.name + "'s turn";
      }
      else
      {
         document.getElementById("currentturn").innerHTML = player2.name + "'s turn";
      }
      currentDart = 0;
   }
   currentDart += 1;
   document.getElementById("dart").innerHTML = "Dart " + currentDart;
}

function updateScore(p, points)
{
   p.score -= points;
   p.realhistory.push(document.myform.stage.value + ":" + currentDart + ":" + p.score);
   p.history.push(points)
}

function checkwin(p)
{
   if (p.score == 0 && p.realhistory[p.realhistory.length - 1].includes("double"))
   {
      document.getElementById("victory").style.display = "inline";
      document.getElementById("winner").innerHTML = p.name + " wins!";
      p.realhistory.push("win");
      document.getElementById("theBoard").style.display = "none";
   }
   else if (p.score <= 1)
   {
      document.getElementById("notice").innerHTML = p.name + " is bust!";
      p.realhistory.push("bust:" + currentDart + ":" + p.score);

      var addback = 0;
      var last;
      for(var i = 0; i < currentDart; i++)
      {
         last = p.history.pop();
         addback += Number(last);
      }
      p.score += addback;
      currentDart = 3;
   }
}

function displayHistory(p)
{
   distory = ""
   for (x in p.history)
   {
      if (currentDart == 1)
      {
         distory += ("[" + x);
      }
      else if (currentDart == 3)
      {
         distory += (x + "]")
      }
      else
      {
         distory += (x)
      }
   }
   document.getElementById(p.id + "history").innerHTML = distory;
}

function showHover(v)
{
   document.myform.stage.value = v;
}

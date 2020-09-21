function Player(n, s, t)
{
    this.name = n;
    this.score = s;
    this.turn = t;
    this.dart = 0;
    this.history = [];
    this.realhistory = []
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

   player1 = new Player(name1, startingScore, true);
   player2 = new Player(name2, startingScore, false);

   document.getElementById("gameSection").style.display = "inline";
   document.getElementById("inputSection").style.display = "none";
   document.getElementById("p1name").innerHTML = player1.name;
   document.getElementById("p2name").innerHTML = player2.name;
   document.getElementById("p1score").innerHTML = startingScore;
   document.getElementById("p2score").innerHTML = startingScore;
}



function throwdart(points){
   currentDart = Number(document.getElementById("dart").innerHTML.slice(4, 6));
   document.getElementById("notice").innerHTML = "";

   if (player1.turn)
   {
      player1.realhistory.push(document.myform.stage.value + ":" + currentDart)
      player1.score -= points;
      player1.history.push(document.myform.stage.value);
      checkwin(player1)
      document.getElementById("p1history").innerHTML = player1.history;
   }
   else
   {
      player2.realhistory.push(document.myform.stage.value + ":" + currentDart)
      player2.score -= points;
      player2.history.push(document.myform.stage.value);
      checkwin(player2)
      document.getElementById("p2history").innerHTML = player2.history;
   }

   window.alert(player1.realhistory)
   window.alert(player2.realhistory)

   document.getElementById("p1score").innerHTML = player1.score;
   document.getElementById("p2score").innerHTML = player2.score;

   document.getElementById("dart").innerHTML = "Dart " + (currentDart + 1);

   if (currentDart == 3){
      document.getElementById("dart").innerHTML = "Dart 1";
      player1.turn = !player1.turn;
      player2.turn = !player2.turn;

      if (player1.turn){
         document.getElementById("currentturn").innerHTML = player1.name + "'s turn";
         }
      else{
         document.getElementById("currentturn").innerHTML = player2.name + "'s turn";
         }
      currentDart = 0;
   }
}

function checkwin(p)
{
   if (p.score == 0 && p.history[p.history.length - 1].includes("double"))
   {
      document.getElementById("victory").style.display = "inline";
      document.getElementById("winner").innerHTML = p.name + " wins!";
   }
   else if (p.score <= 1)
   {
      document.getElementById("notice").innerHTML = p.name + " is bust!";

      var addback = 0;
      var last;
      for(var i = 0; i < currentDart; i++)
      {
         last = p.history.pop().split(" ");
         addback += Number(last[last.length - 1]);
      }
      p.score += addback;

      currentDart = 3;
      p.history.push("[bust]")
   }
}

function showHover(v)
{
   document.myform.stage.value = v;
}

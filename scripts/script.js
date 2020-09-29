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
   document.getElementById("currentturn").innerHTML = player1.name + "'s turn";
   document.getElementById("dart").innerHTML = "Dart " + currentDart;
}



function throwdart(points){
   document.getElementById("notice").innerHTML = "notice";

   if (player1.turn)
   {
      updateScore(player1, points)
      checkwin(player1)
   }
   else
   {
      updateScore(player2, points)
      checkwin(player2)
   }

   document.getElementById("realhistory1").innerHTML = player1.realhistory;
   document.getElementById("realhistory2").innerHTML = player2.realhistory;

   // displayHistory(player1)
   // displayHistory(player2)

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
   var prev = p.score;
   p.score -= points;
   p.realhistory.push(prev + ":" + document.myform.stage.value + ":" + currentDart + ":" + p.score);
   p.history.push(points)
}

function checkwin(p)
{
   if (p.score == 0 && p.realhistory[p.realhistory.length - 1].includes("double"))
   {
      document.getElementById("victory").style.display = "inline";
      document.getElementById("winner").innerHTML = p.name + " wins!";
      p.history.push("< WIN")
      document.getElementById("theBoard").style.display = "none";
   }
   else if (p.score <= 1)
   {
      document.getElementById("notice").innerHTML = p.name + " is bust!";
      //p.realhistory.push("bust:" + currentDart + ":" + p.score);

      var addback = 0;
      var last;
      for(var i = 0; i < currentDart; i++)
      {
         last = p.history.pop();
         addback += Number(last);
      }
      p.history.push("BUST")
      p.score += addback;
      currentDart = 3;
   }
}

function displayHistory(p)
{
    distory = ""
    var i = 1
    var x;
    for (x of p.history)
    {
        if (x == "BUST" || x == "< WIN")
        {
            distory += ("[" + x + "]")
        }
        else
        {
            if (i == 1)
            {
                distory += (" [" + x + " ");
            }
            else if (i == 3)
            {
                distory += (" " + x + "]")
                i = 0;
            }
            else
            {
                distory += (x)
            }
            i++;
        }
    }
    document.getElementById(p.id + "history").innerHTML = distory;
}

function undoLast()
{
   if (player1.realhistory.length != 0 || player2.realhistory.length != 0)
   {
      if (currentDart == 1)
      {
         player1.turn = !player1.turn;
         player2.turn = !player2.turn;
      }

      var x;
      if (player1.turn)
      {
         x = player1.realhistory.pop().split(":");
         player1.score = Number(x[0])
         currentDart = Number(x[2])
         document.getElementById("p1score").innerHTML = player1.score;
         document.getElementById("currentturn").innerHTML = player1.name + "'s turn";
         document.getElementById("realhistory1").innerHTML = player1.realhistory;

      }
      else
      {
         x = player2.realhistory.pop().split(":");
         player2.score = Number(x[0])
         currentDart = Number(x[2])
         document.getElementById("p2score").innerHTML = player2.score;
         document.getElementById("currentturn").innerHTML = player2.name + "'s turn";
         document.getElementById("realhistory2").innerHTML = player2.realhistory;
      }
      document.getElementById("dart").innerHTML = "Dart " + currentDart;
      document.getElementById("notice").innerHTML = "Dart Undone!";
   }
   else
   {
      document.getElementById("notice").innerHTML = "No darts to undo!";
   }
   document.getElementById("victory").style.display = "none";
   document.getElementById("theBoard").style.display = "inline";
}


function showHover(v)
{
   document.myform.stage.value = v;
}

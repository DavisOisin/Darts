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

function startHover(){
   var bsDiv = document.getElementById("hform");
   var x, y;
// On mousemove use event.clientX and event.clientY to set the location of the div to the location of the cursor:
   window.addEventListener('mousemove', function(event){
       x = event.clientX + 10;
       y = event.clientY+ 10;                    
       if ( typeof x !== 'undefined' ){
           bsDiv.style.left = x + "px";
           bsDiv.style.top = y + "px";
       }
   }, false);
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

   startHover()
   document.getElementById("hform").style.display = "none";
   document.getElementById("gameSection").style.display = "inline";
   document.getElementById("inputSection").style.display = "none";
   document.getElementById("p1name").innerHTML = player1.name;
   document.getElementById("p2name").innerHTML = player2.name;
   document.getElementById("p1score").innerHTML = startingScore;
   document.getElementById("p2score").innerHTML = startingScore;
   document.getElementById("currentturn").innerHTML = player1.name + "'s turn";
   document.getElementById("dart").innerHTML = "Dart " + currentDart;
}



function throwdart(z){
   boardsection = z;
   points = boardsection.split(" ")[2]

   document.getElementById("notice").innerHTML = "notice";

   if (player1.turn)
   {
      updateScore(player1, points)
      checkwin(player1)
      displayHistory(player1)
   }
   else
   {
      updateScore(player2, points)
      checkwin(player2)
      displayHistory(player2)
   }

   //document.getElementById("realhistory1").innerHTML = player1.realhistory;
   //document.getElementById("realhistory2").innerHTML = player2.realhistory;

   document.getElementById("p1score").innerHTML = player1.score;
   document.getElementById("p2score").innerHTML = player2.score;

   document.getElementById("notice").innerHTML = "notice";

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
   p.realhistory.push(prev + ":" + boardsection + ":" + currentDart + ":" + p.score);
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

      var last;
      last = p.realhistory[p.realhistory.length - currentDart];

      p.score = Number(last.split(":")[0]);
      currentDart = 3;
   }
}

function displayHistory(p)
{
      distory = ""
      for (x of p.realhistory)
      {
         x = x.split(":")
         if (x[2] == 1)
         {
            distory += (" [" + x[1].split(" ")[2] + " ");
         }
         else if (x[2] == 3)
         {
            distory += (" " + x[1].split(" ")[2] + "]")
         }
         else
         {
            distory += (x[1].split(" ")[2])
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
         //document.getElementById("realhistory1").innerHTML = player1.realhistory;
         displayHistory(player1)

      }
      else
      {
         x = player2.realhistory.pop().split(":");
         player2.score = Number(x[0])
         currentDart = Number(x[2])
         document.getElementById("p2score").innerHTML = player2.score;
         document.getElementById("currentturn").innerHTML = player2.name + "'s turn";
         //document.getElementById("realhistory2").innerHTML = player2.realhistory;
         displayHistory(player2)
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
   if (v != 'hide')
   {
      document.getElementById("hform").style.display = "inline";
      document.myform.stage.value = v;
   }
   else
   {
      document.getElementById("hform").style.display = "none";
   }
}

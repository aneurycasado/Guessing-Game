$(function(){
  var randomNumber = pickRandomNumber(1,100)
  console.log(randomNumber)
  var numberOfGuesses = 5
  var guessesSoFar = [[],[]]
  $("#submit").click(function(){
    numberOfGuesses-=1
    updateNumberOfGuesses(numberOfGuesses)
    var guess = parseInt($("#guess").val())
    if(gameOver(numberOfGuesses,randomNumber,guess)){
      numberOfGuesses = updateGuessesSoFar(guess,'Loser',guessesSoFar)
      loser()
    }else{
        if(isNaN(guess)){
          guessesSoFar = updateGuessesSoFar(guess,"IM",guessesSoFar)
          if(numberOfGuesses == 4){
            okayFirstTime()
          }else if(numberOfGuesses == 3){
            comeOnMan()
          }else if(numberOfGuesses == 2){
            betterGetYourActTogether()
          }else if(numberOfGuesses == 1){
            yourGoingToLose()
          }
        }else if(guessesSoFar[0].indexOf(guess) > -1){
          console.log("Here")
          guessesSoFar = updateGuessesSoFar(guess,'R',guessesSoFar)
          dontRepeatYourself()
        }else{
          var difference = randomNumber - guess
          var direction = ""
          if(difference > 0){
            direction = "Higher"
          }else{
            direction = "Lower"
          }
          difference = Math.abs(difference)
          if(difference > 40){
            guessesSoFar = updateGuessesSoFar(guess,'SC',guessesSoFar)
            superCold(direction)
          }else if(difference > 20 && difference <= 40){
            guessesSoFar = updateGuessesSoFar(guess,'C',guessesSoFar)
            cold(direction)
          }else if(difference <= 20 && difference > 10){
            guessesSoFar = updateGuessesSoFar(guess,'W',guessesSoFar)
            warm(direction)
          }else if(difference <= 10 && difference != 0){
            guessesSoFar = updateGuessesSoFar(guess,'H',guessesSoFar)
            hot(direction)
          }else if(difference === 0){
            winner()
          }else{
            thereIsNoHelpingYou()
          }
        }
      }
    });
    $("#hint").click(function(){
      var header = "<h2>Well, just know you lost already but the answer is</h2>"
      var body = "<h1>" + randomNumber.toString() + "</h2>"
      setModalWindow(header,body)
    })
    $(document).keypress(function(event){
      if(event.which == 13){
        $('#submit').trigger("click");
      }
    });
})

function updateGuessesSoFar(guess,temp,guessesSoFar){
  guessesSoFar[0].push(guess)
  guessesSoFar[1].push(temp)
  updateGuessesSoFarHTML(guessesSoFar)
  return guessesSoFar
}

function dontRepeatYourself(){
  $("#talk").html("Come on. Don't repeat yourself.")
  $("#indicator").html('<span class="label label-default">Repeat</span></h1>')
  var header = "<h2>You already guessed that number.</h2>"
  var body = '<img src="img/repeat.png" alt="Repeat">'
  setModalWindow(header,body)
}

function updateGuessesSoFarHTML(guessesSoFar){
  var string = createString(guessesSoFar)
  $("#guessesSoFar").html('<span class="label label-info">' + string + '</span></h1>')
}

function createString(guessesSoFar){
  var string = ""
  for(var i = 0; i < guessesSoFar[0].length;i++){
    var guess = guessesSoFar[0][i]
    var temp = guessesSoFar[1][i]
    string = string + guess.toString() + " " + temp + " | "
  }
  //string = substring(0,string.length-1)
  return string
}

function pickRandomNumber(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

function updateNumberOfGuesses(numberOfGuesses){
  var string = numberOfGuesses.toString()
  $("#number").html('<span class="label label-primary">Guesses Left: ' + string +'</span></h1>')
}

function gameOver(numberOfGuesses,randomNumber,guess){
  var difference = Math.abs(randomNumber-guess)
  if(numberOfGuesses == 0){
    if(difference == 0){
      winner()
    }else{
      return true
    }
  }
}

function illegalMove(){
  var header = "<h2>Read this rule.</h2>"
  var body = '<div class ="row"><div class="col-sm-12"><h2>Only numbers are valid inputs.</h2><b class = "glyphicon glyphicon-ok"></b></div></div>'
  setModalWindow(header,body)
}

function loser(){
  $("#talk").html("You my friend, have lost.")
  $("#indicator").html('<span class="label label-default">Loser</span></h1>')
  $(".btn-group").html('<a class = "btn btn-primary btn-lg" href="game.html">Play Again</a>')
  var header = "<h2>Don't worry. This man lost too.</h2>"
  var body = '<img src="img/lebron.png" alt="Lebron">'
  setModalWindow(header,body)
}

function okayFirstTime(){
  $("#talk").html("I hope you read the rules this time.")
  $("#indicator").html('<span class="label label-info">Ilegal Move</span></h1>')
  illegalMove();
}

function comeOnMan(){
  $("#talk").html("If you don't want to play, then just stop.")
  $("#indicator").html('<span class="label label-info">Ilegal Move</span></h1>')
  illegalMove();
}

function betterGetYourActTogether(){
  $("#talk").html("Why am I even talking to you.")
  $("#indicator").html('<span class="label label-info">Ilegal Move</span></h1>')
  illegalMove();
}

function yourGoingToLose(){
  $("#talk").html("Ladies and gentlemen, we have a loser in our midst.")
  $("#indicator").html('<span class="label label-info">Ilegal Move</span></h1>')
  illegalMove();
}

function superCold(direction){
  $("#talk").html("We have found the cure to global warming people.")
  $("#indicator").html('<span class="label label-primary">Super Cold. Guess ' + direction + '</span></h1>')
  var header = "<h2>You have real problems.</h2>"
  var body = '<img src="img/supercold.png" alt="Super Cold">'
  setModalWindow(header,body)
}

function cold(direction){
  $("#talk").html("You are as cold as Lebron.")
  $("#indicator").html('<span class="label label-success">Cold. Guess ' + direction + '</span></h1>')
  var header = "<h2>Can you find that corner?</h2>"
  var body = '<img src="img/cold.jpg" alt="Cold">'
  setModalWindow(header,body)
}

function warm(direction){
  $("#talk").html("O, it's getting kind of toasty in here.")
  $("#indicator").html('<span class="label label-warning">Warm. Guess ' + direction + '</span></h1>')
  var header = "<h2>A joke for your success.</h2>"
  var body = '<img src="img/warm.png" alt="Warm">'
  setModalWindow(header,body)
}

function hot(direction){
  $("#talk").html("Maybe I should have you play the lotto for me.")
  $("#indicator").html('<span class="label label-danger">Hot. Guess ' + direction + '</span></h1>')
  var header = "<h2>You're about to erupt!!</h2>"
  var body = '<img src="img/hot.gif" alt="Hot">'
  setModalWindow(header,body)
}

function winner(){
  $("#talk").html("Lucky guess. Think you can do it again?")
  $("#indicator").html('<span class="label label-default">Winner</span></h1>')
  $(".btn-group").html('<a class = "btn btn-primary btn-lg" href="game.html">Play Again</a>')
  var header = "<h2>This is a true winner.</h2>"
  var body = '<img src="img/curry.png" alt="Curry">'
  setModalWindow(header,body)
}

function thereIsNoHelpingYou(){
  $("#talk").html("I literally just can't even. Just guess again")
  $("#indicator").html('<span class="label label-default">Worst than Super Cold</span></h1>')
}

function setModalWindow(header,body){
  $(".modal-title").html(header)
  $(".modal-body").html(body)
}

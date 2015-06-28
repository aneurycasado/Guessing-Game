$(function(){
//Pick a random number from 1-100
  var randomNumber = pickRandomNumber(1,100)
  var numberOfGuesses = 5
//Store the guess and the temperature of the guess
  var guessesSoFar = [[],[]]
//Keep track of the previous difference between guess and randomNumber
  var previousDifference = 0
  $("#submit").click(function(){
//Lower the number of guesses and update it on the page
    numberOfGuesses-=1
    updateNumberOfGuesses(numberOfGuesses)
//Get user input
    var guess = parseInt($("#guess").val())
//Is the game over
    if(gameOver(numberOfGuesses,randomNumber,guess)){
//If yes update the html page
      numberOfGuesses = updateGuessesSoFar(guess,'Loser',guessesSoFar)
      loser()
//If no, then handle the input
    }else{
//If the input is not valid, i.e not a number,
        if(isNaN(guess)){
          guessesSoFar = updateGuessesSoFar(guess,"IM",guessesSoFar)
//Tell the user it is not valid. Decided to be a little cute with it.
          if(numberOfGuesses == 4){
            illegalMove("Hope you read the rules.")
          }else if(numberOfGuesses == 3){
            illegalMove("Seriously, again.")
          }else if(numberOfGuesses == 2){
            illegalMove("If you don't want to play, then just stop.")
          }else if(numberOfGuesses == 1){
            illegalMove("Ladies and gentlemen, we have a loser in our midst.")
          }
//The number is valid but is it a repeat?
//I check if the number is a repeat by checking if the first array in guesses contains it
        }else if(guessesSoFar[0].indexOf(guess) > -1){
//If the number is a repeat, then update the html page accordingly.
          guessesSoFar = updateGuessesSoFar(guess,'R',guessesSoFar)
          dontRepeatYourself()
//Else the number is valid and not a repeat.
        }else{
          var difference = randomNumber - guess
          var direction = ""
//If the guess is lower than the random number then
          if(difference > 0){
//Notify the user to guess higher
            direction = "Higher"
//Else, the guess is lower than the random number
          }else{
//and they should guess lower
            direction = "Lower"
          }
//Using absolute here to focus on the distance from the guess is from the
//random number
          difference = Math.abs(difference)
//Set previous difference for the first case.
          if(previousDifference == 0){
            previousDifference = difference
          }
//After the first case, if the current difference is greater than the last difference
          if(difference > previousDifference){
//The user is colder
            judgement('Colder')
          }else if(difference < previousDifference){
//If the opposite is true than the user is hotter
            judgement('Hotter')
          }else if(difference == previousDifference){
//Happens with repeat numbers and the first guess
            judgement("Same")
          }
//Update the html page and guessesSoFar according to the absolute distance of
//the random number from the guess
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
//Set previousDifference
          previousDifference = difference
        }
      }
    });
//Establish the hint button to provide the user with the answer
    $("#hint").click(function(){
      var header = "<h2>Well, just know you lost already but the answer is</h2>"
      var body = "<h1>" + randomNumber.toString() + "</h2>"
      setModalWindow(header,body)
    })
//Enter key triggers submit button
    $(document).keypress(function(event){
      if(event.which == 13){
        $('#submit').trigger("click");
      }
    });
})

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

function updateGuessesSoFar(guess,temp,guessesSoFar){
  guessesSoFar[0].push(guess)
  guessesSoFar[1].push(temp)
  updateGuessesSoFarHTML(guessesSoFar)
  return guessesSoFar
}

function updateGuessesSoFarHTML(guessesSoFar){
  var string = createString(guessesSoFar)
  $("#guessesSoFar").html('<span class="label label-info">' + string + '</span></h1>')
}

function createString(guessesSoFar){
//Helper function that turns guessesSoFar into a string
  var string = ""
  for(var i = 0; i < guessesSoFar[0].length;i++){
    var guess = guessesSoFar[0][i]
    var temp = guessesSoFar[1][i]
    string = string + guess.toString() + " " + temp + " | "
  }
  return string
}

function loser(){
  $("#talk").html("You my friend, have lost.")
  $("#indicator").html('<span class="label label-default">Loser</span></h1>')
  $(".btn-group").html('<a class = "btn btn-primary btn-lg" href="game.html">Play Again</a>')
  var header = "<h2>Don't worry. This man lost too.</h2>"
  var body = '<img src="img/lebron.png" alt="Lebron">'
  setModalWindow(header,body)
}

function setModalWindow(header,body){
  $(".modal-title").html(header)
  $(".modal-body").html(body)
}

function illegalMove(string){
  $("#talk").html(string)
  $("#indicator").html('<span class="label label-info">Ilegal Move</span></h1>')
  var header = "<h2>Read this rule.</h2>"
  var body = '<div class ="row"><div class="col-sm-12"><h2>Only numbers are valid inputs.</h2><b class = "glyphicon glyphicon-ok"></b></div></div>'
  setModalWindow(header,body)
}

function dontRepeatYourself(){
  $("#talk").html("Don't pick the same number.")
  $("#indicator").html('<span class="label label-default">Repeat</span></h1>')
  var header = "<h2>You already guessed that number.</h2>"
  var body = '<img src="img/repeat.png" alt="Repeat">'
  setModalWindow(header,body)
}

function judgement(string){
//Changes the Judgment label on the html page
  if(string == "Hotter"){
    $("#judgement").html('<span class="label label-danger">' + string +'</span>')
  }else if(string == "Colder"){
    $("#judgement").html('<span class="label label-info">' + string +'</span>')
  }else{
    $("#judgement").html('<span class="label label-default">' + string +'</span>')
  }
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
  var header = "<h2>A joke for your good attempt.</h2>"
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

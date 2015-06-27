$(function(){
  var randomNumber = pickRandomNumber(1,100)
  console.log(randomNumber)
  var numberOfGuesses = 5
  $("#submit").click(function(){
    numberOfGuesses-=1
    updateNumberOfGuesses(numberOfGuesses)
    var guess = parseInt($("#guess").val())
    if(gameOver(numberOfGuesses,randomNumber,guess)){
      loser()
    }else{
        if(isNaN(guess)){
          if(numberOfGuesses == 4){
            okayFirstTime()
          }else if(numberOfGuesses == 3){
            comeOnMan()
          }else if(numberOfGuesses == 2){
            betterGetYourActTogether()
          }else if(numberOfGuesses == 1){
            yourGoingToLose()
          }
        }else{
          difference = Math.abs(randomNumber - guess)
          console.log(difference == 0)
          if(difference > 40){
            superCold()
          }else if(difference > 20 && difference < 40){
            cold()
          }else if(difference < 20 && difference > 10){
            warm()
          }else if(difference < 10 && difference != 0){
            hot()
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

function superCold(){
  $("#talk").html("We have found the cure to global warming people.")
  $("#indicator").html('<span class="label label-primary">Super Cold</span></h1>')
  var header = "<h2>You're colder than this place!</h2>"
  var body = '<img src="img/supercold.png" alt="Super Cold">'
  setModalWindow(header,body)
}

function cold(){
  $("#talk").html("You are as cold as Lebron.")
  $("#indicator").html('<span class="label label-success">Cold</span></h1>')
  var header = "<h2>Can you find that corner?</h2>"
  var body = '<img src="img/cold.jpg" alt="Cold">'
  setModalWindow(header,body)
}

function warm(){
  $("#talk").html("O, it's getting kind of toasty in here.")
  $("#indicator").html('<span class="label label-warning">Warm</span></h1>')
  var header = "<h2>A joke for your success.</h2>"
  var body = '<img src="img/warm.png" alt="Warm">'
  setModalWindow(header,body)
}

function hot(){
  $("#talk").html("Maybe I should have you play the lotto for me.")
  $("#indicator").html('<span class="label label-danger">Hot</span></h1>')
  var header = "<h2>You're about to erupt!!</h2>"
  var body = '<img src="img/hot.png" alt="Hot">'
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

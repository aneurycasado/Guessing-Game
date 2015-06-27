$(function(){
  var randomNumber = pickRandomNumber(1,100)
  var numberOfGuesses = 5
  $("#submit").click(function(){
    if(numberOfGuesses > 0){
      var guess = parseInt($("#guess").val())
      if(isNaN(guess)){
        console.log("seriously")
      }
      else{
        difference = Math.abs(randomNumber - guess)
        if(difference > 40){
          console.log("superCold")
        }else if(difference > 30 && difference < 40){
          console.log("cold")
        }else if(difference < 20 && difference > 10){
          console.log("warm")
        }else if(difference < 10){
          console.log("hot")
        }else if(difference == 0){
          console.log("You got it")
        }
      }
      numberOfGuesses-=1
    }else{
      console.log("You already lost")
    }
  });
})

function pickRandomNumber(min, max) {
    return Math.random() * (max - min) + min;
}

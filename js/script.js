//VARIABLES
let input = document.querySelector("#prix");
let error = document.querySelector("small");
let form = document.querySelector("#form");
let instructionMessages = document.querySelector("#instructions");
let money = document.querySelector("#money");
let numberOfTrials = 0;
let chosenNumber;
let timeInSecs;
let ticker;
let restart = false;

//TIMER
function startTimer(secs) {
    timeInSecs = parseInt(secs);
    ticker = setInterval("time()", 1000); 
}

function time() {
    var secs = timeInSecs;
    if (secs > 0) {
        timeInSecs--; 
    } else {
        clearInterval(ticker);
        input.disabled = true;
        alert("Dommage le temps s'est écoulé et vous n'avez pas trouver le juste prix !!!");
        setTimeout(reload, 1000);
    }

    var mins = Math.floor(secs/60);
    secs %= 60;
    var pretty = ((mins < 10) ? "0" : "" ) + mins + ":" + ((secs < 10) ? "0" : "" ) + secs;

    document.querySelector("#countdown").innerHTML = pretty;
}
startTimer(60);
/*** END TIMER ***/

//function reload when the user loose or win
function reload() {
    restart = confirm("Voulez vous recommencer ?");
    if (restart == true) {
            location.reload();
    } else {
        document.location.href="../index.html"; 
    }
}
/*** END RELOAD ***/

//Hide the error
error.style.display ="none";
money.style.display ="none";

//Function check if the user find the just price
function checked(number) {
    let instruction = document.createElement("div");

    if (number < randomNumber) {
        instruction.textContent = "Essai Nº" + numberOfTrials + ", numéro choisi ("+ number +") C'est plus !";
        instruction.className = "instruction plus";
    } else if(number > randomNumber) {
        instruction.textContent = "Essai Nº" + numberOfTrials + ", numéro choisi ("+ number +") C'est moins !";
        instruction.className = "instruction moins";
    } else {
        instruction.textContent = "#Essai Nº" + numberOfTrials + ", numéro choisi ("+ number +") Félicitation, vous avez trouvé le Juste prix !";
        instruction.className = "instruction fini";
        money.style.display ="block";
        input.disabled = true;
        setTimeout(reload, 1500);
    }

    instructionMessages.prepend(instruction);

}

//Generate a random integer number
let randomNumber = Math.floor(Math.random() * 1001);

//Check if the user gives a number
input.addEventListener("keyup", () => {
    if (isNaN(input.value)) {
        error.style.display ="inline";
    } else {
        error.style.display ="none";
    }
});
form.addEventListener("submit", (e) => {
    e.preventDefault();

    if(isNaN(input.value) || input.value == "") {
        input.style.borderColor = 'red';
    } else {
        input.style.borderColor = 'silver';
        numberOfTrials++;
        chosenNumber = input.value;
        input.value = '';
        checked(chosenNumber)
    }
});
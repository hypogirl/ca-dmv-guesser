var plates_info = new Array();
var curr_index = 0;
var guessed = 0;

//Fisher-Yates (aka Knuth) Shuffle
function shuffle(array) {
    let currentIndex = array.length,  randomIndex;
  
    // While there remain elements to shuffle.
    while (currentIndex != 0) {
  
        // Pick a remaining element.
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
  
        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
  
    return array;
}
  

function displayPlate(info) {
    if (!plates_info.length) plates_info = info;

    const verdict = document.getElementById("verdict");
    verdict.classList.add("d-none");

    const cus_dmv = document.getElementById("cus-dmv");
    cus_dmv.innerHTML = "Customer: " + plates_info[curr_index]['customer'] + "<br>DMV: " + plates_info[curr_index]['dmv'];

    const plate = document.getElementById("plate");
    plate.innerHTML = plates_info[curr_index]['plate'];

    const buttons = document.getElementById("buttons");
    buttons.innerHTML = "<div class=\"d-grid gap-2\"><button type=\"button\" class=\"btn btn-success\" onclick=\"checkAnswer(true)\">Accepted</button><button type=\"button\" class=\"btn btn-danger\" onclick=\"checkAnswer(false)\">Denied</button></div>"
}

function checkAnswer(bool) {
    const accepted = plates_info[curr_index++]['result'];
    const verdict = document.getElementById("verdict");

    if (accepted)  {
        verdict.innerHTML = "Verdict: Accepted";
        verdict.classList.remove("denied");
        verdict.classList.add("accepted");
        verdict.classList.remove("d-none");
    } 
    else {
        verdict.innerHTML = "Verdict: Denied";
        verdict.classList.remove("accepted");
        verdict.classList.add("denied");
        verdict.classList.remove("d-none");
    }

    var beginning;
    if (accepted == bool) {
        guessed++;
        beginning = "<h5>Correct! (";
    }
    else beginning = "<h5>Wrong! (";

    const percentage = Math.round(guessed / curr_index * 100 * 100) / 100;
    const buttons = document.getElementById("buttons");
    const guessed_bar = document.getElementById("guessed");
    buttons.innerHTML = beginning + percentage + "% correct answers so far)</h1><button type=\"button\" class=\"btn btn-primary\" onclick=\"displayPlate(info)\">Continue</button>";
    guessed_bar.innerHTML = "Plates guessed:" + guessed + "/" + curr_index;

}
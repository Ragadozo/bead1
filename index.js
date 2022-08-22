let gameOn = 0;
let setCalled = 0;
let playerNamesArray = [];
let numberOfCards = 12;
let numberOfCardsInDeck = 27;
let isThereSet = 1;
let currentPlayer = "";
let startTime = new Date();
let startSetCountBack = new Date();
let start3CardCount = new Date();
let timerStarter;
let timerStarter2;
let blockTimer = 0;



function $(id) {
    return document.getElementById(id);
}
class player {
    name = "";
    point = 0;
    isBlocked = 0;
}

function init() {
    $('numOfPlayer').addEventListener('input', write);
}
write();

function write() {
    if ($('numOfPlayer').value > 10) {
        $('numOfPlayer').value = 10;
    }
    if ($('numOfPlayer').value < 1) {
        $('numOfPlayer').value = 1;
    }
    let playerName = "<br>";
    for (let i = 1; i <= $('numOfPlayer').value; i++) {
        playerName += '<input type="text" value="Játékos' + i + '" id="player' + i + '" >';
        if (i === 5) {
            playerName += '<br>';
        }
    }
    $('playerNames').innerHTML = playerName;
}

function additionalSettingsShow() {
    $('plusSetting').style.display = "block";
}
function additionalSettings() {
    $('plusSetting').style.display = "none";
}
function startGame() {
    gameOn = 1;

    if ($('training').checked) {
        let trainingButtons = "<br>";
        if ($('setBut').checked) {
            trainingButtons += '<input type="button" id="isSetBut" name="isSetBut" value="Van Set?" onClick="checkSetForButton()">';
        }
        if ($('giveSet').checked) {
            trainingButtons += '<input type="button" id="showSetBut" name="showSetBut" onClick="showSet()" value="Mutass Set-et!">';
        }
        if ($('plus3C').checked) {
            trainingButtons += '<input type="button" id="plus3Card" name="plus3Card" value="Kérek 3 lapot!" onClick="plus3Card()">';
            blockTimer = 1;
        }
        $('trainButtons').innerHTML = trainingButtons;
    };

    savePlayers();
    createDeck();
    $('welcomePage').style.display = "none";
    console.log(cardSet);
    startTime = new Date();


}

class Cards {
    shape = 0;
    color = "";
    number = "";
    id = "";
}

let cardSet = new Cards;
for (let i = 0; i < numberOfCardsInDeck; i++) {
    cardSet[i] = new Cards();
}

cardSet.number = 2;
function createDeck() {
    let counter = 0;
    for (let i = 1; i < 4; i++) {
        for (let j = 0; j < 3; j++) {
            for (let k = 0; k < 3; k++) {
                cardSet[counter].number = i;
                cardSet[counter].id += i;
                if (j === 0) {
                    cardSet[counter].color = "Og";
                    cardSet[counter].id += "Og";
                }
                if (j === 1) {
                    cardSet[counter].color = "Op";
                    cardSet[counter].id += "Op";
                }
                if (j === 2) {
                    cardSet[counter].color = "Or";
                    cardSet[counter].id += "Or";
                }
                if (k === 0) {
                    cardSet[counter].shape = "D";
                    cardSet[counter].id += "D";
                }
                if (k === 1) {
                    cardSet[counter].shape = "P";
                    cardSet[counter].id += "P";
                }
                if (k === 2) {
                    cardSet[counter].shape = "S";
                    cardSet[counter].id += "S";
                }
                counter++;
            }
        }
    }
    shuffle(numberOfCardsInDeck);
    putCards(numberOfCards);
}

function checkSetForButton() {
    let checker = 0;
    checker = checkSet();
    if (checker === 0) {
        alert("nincs");
    }
    else {
        alert("van");
    }
}

function showSet() {
    isNumberGood = 0;
    isColorGood = 0;
    isShapeGood = 0;
    let localNumberOfCards = numberOfCards;
    for (let i = 0; i < localNumberOfCards; i++) {
        if (cardSet[i].id !== "") {
            for (let j = i + 1; j < localNumberOfCards; j++) {
                if (cardSet[j].id !== "") {
                    for (let k = j + 1; k < localNumberOfCards; k++) {
                        if (cardSet[k].id !== "") {
                            let a, b, c = 0;
                            let d, e, f = "";
                            a = cardSet[i].id.slice(0, 1);
                            b = cardSet[j].id.slice(0, 1);
                            c = cardSet[k].id.slice(0, 1);
                            d = cardSet[i].id.slice(1, 3);
                            e = cardSet[j].id.slice(1, 3);
                            f = cardSet[k].id.slice(1, 3);
                            if (a === b && b === c) {
                                isNumberGood++;
                            }
                            if (a !== b && a !== c && b !== c) {
                                isNumberGood++;
                            }
                            if ((d === e && e === f) || (d !== e && d !== f && e !== f)) {
                                isColorGood++;
                            }
                            d = cardSet[i].id.slice(3, 4);
                            e = cardSet[j].id.slice(3, 4);
                            f = cardSet[k].id.slice(3, 4);
                            if ((d === e && e === f) || (d !== e && d !== f && e !== f)) {
                                isShapeGood++;
                            }
                            if (isNumberGood === 1 && isColorGood === 1 && isShapeGood === 1) {
                                $(cardSet[i].id).style.border = "3px solid green";
                                $(cardSet[j].id).style.border = "3px solid green";
                                $(cardSet[k].id).style.border = "3px solid green";
                                a = i;
                                b = j;
                                c = k;
                                setTimeout(function () {

                                    $(cardSet[a].id).style.border = "";
                                    $(cardSet[b].id).style.border = "";
                                    $(cardSet[c].id).style.border = "";

                                }, 500);
                                i = localNumberOfCards;
                                j = localNumberOfCards;
                                k = localNumberOfCards;
                            }
                            isNumberGood = 0;
                            isColorGood = 0;
                            isShapeGood = 0;
                        }
                    }
                }
            }
        }
        else {
            if (localNumberOfCards < numberOfCards - 4) {
                localNumberOfCards++;
            }
        }
    }
}

function putCards(counter) {
    checkSet();
    start3CardCount = new Date();
    timerStarter2 = setInterval(timer2, 1000);

    if (gameOn) {
        let cardsOut = "<br>";
        let playerPoints = "";
        for (let i = 0; i < playerNamesArray.length; i++) {
            playerPoints += playerNamesArray[i].name;
            playerPoints += ": ";
            playerPoints += playerNamesArray[i].point;
            playerPoints += "<br>";
        }
        let countCurrentCards = 0;
        cardsOut += playerPoints;
        cardsOut += "<br><br>";
        let countRows = 0;
        for (let i = 0; i < counter; i++) {
            if (countCurrentCards === numberOfCardsInDeck) {
                i = counter;
                numberOfCards = i;
            }
            else {
                if (cardSet[i].id === "") {
                    if (counter < numberOfCardsInDeck) {
                        counter += 1;
                    }

                }
                else {
                    let save = "";
                    save += cardSet[i].number + cardSet[i].color + cardSet[i].shape;
                    cardsOut += '<img id="' + save + '" width="120" onClick="selected(' + i + ')" SRC="icons/' + save + '.svg">';
                    countRows++;
                    if ((countRows) % 3 === 0) {
                        cardsOut += "<br>";
                    }
                    countCurrentCards++;
                }
            }
        }
        cardsOut += '<br> <input type="button" onClick="setCall()" value="SET" id="setCallButton">';

        $('gameBoard').innerHTML = cardsOut;

    }
}


function checkSet() {

    let howMany = 0;
    isNumberGood = 0;
    isColorGood = 0;
    isShapeGood = 0;
    let localNumberOfCards = numberOfCards;
    for (let i = 0; i < localNumberOfCards; i++) {
        if (cardSet[i].id !== "") {
            for (let j = i + 1; j < localNumberOfCards; j++) {
                if (cardSet[j].id !== "") {
                    for (let k = j + 1; k < localNumberOfCards; k++) {
                        if (cardSet[k].id !== "") {
                            let a, b, c = 0;
                            let d, e, f = "";
                            a = cardSet[i].id.slice(0, 1);
                            b = cardSet[j].id.slice(0, 1);
                            c = cardSet[k].id.slice(0, 1);
                            d = cardSet[i].id.slice(1, 3);
                            e = cardSet[j].id.slice(1, 3);
                            f = cardSet[k].id.slice(1, 3);
                            if (a === b && b === c) {
                                isNumberGood++;
                            }
                            if (a !== b && a !== c && b !== c) {
                                isNumberGood++;
                            }
                            if ((d === e && e === f) || (d !== e && d !== f && e !== f)) {
                                isColorGood++;
                            }
                            d = cardSet[i].id.slice(3, 4);
                            e = cardSet[j].id.slice(3, 4);
                            f = cardSet[k].id.slice(3, 4);
                            if ((d === e && e === f) || (d !== e && d !== f && e !== f)) {
                                isShapeGood++;
                            }
                            if (isNumberGood === 1 && isColorGood === 1 && isShapeGood === 1) {
                                howMany++;
                            }
                            isNumberGood = 0;
                            isColorGood = 0;
                            isShapeGood = 0;
                        }
                    }
                }
            }

        }
        else {
            if (localNumberOfCards < numberOfCards - 4) {
                localNumberOfCards++;
            }
        }
    }

    if (howMany === 0 && localNumberOfCards < 24) {
        numberOfCards += 3;
        putCards(numberOfCards);
    }
    if (howMany === 0 && localNumberOfCards > numberOfCardsInDeck - 2) {
        endGame();
        gameOn = 0;
    }
    let sendHowMany = howMany;
    return (sendHowMany);


}
function plus3Card() {

    if (numberOfCards < numberOfCardsInDeck) {
        numberOfCards += 3;
        stopTimer2();
        putCards(numberOfCards);
    }
    else {
        alert("Nincs több lap!");
    }

}

function endGame() {
    $('gameBoard').innerHTML = ' Vége! <br>';
    $('trainButtons').innerHTML = "";
    endTime = new Date();
    var timeDiff = (endTime - startTime);
    timeDiff /= 1000;
    var seconds = Math.round(timeDiff);
    tempPlayer = new player();
    $('gameBoard').innerHTML += (seconds + " másodperc");

    let playerPoints = "<br>";
    for (let i = 0; i < playerNamesArray.length; i++) {
        for (let j = i + 1; j < playerNamesArray.length; j++) {
            if (playerNamesArray[i].point < playerNamesArray[j].point) {
                tempPlayer = playerNamesArray[i];
                playerNamesArray[i] = playerNamesArray[j];
                playerNamesArray[j] = tempPlayer;
            }
        }
    }
    for (let i = 0; i < playerNamesArray.length; i++) {
        let rank = i + 1;
        playerPoints += rank;
        playerPoints += ": ";
        playerPoints += playerNamesArray[i].name;
        playerPoints += ": ";
        playerPoints += playerNamesArray[i].point;
        playerPoints += "<br>";
    }
    $('gameBoard').innerHTML += playerPoints;

}

function savePlayers() {
    for (let i = 0; i < $('numOfPlayer').value; i++) {

        playerNamesArray[i] = new player();

    }
    for (let i = 0; i < $('numOfPlayer').value; i++) {

        idOfPlayer = "player";
        idOfPlayer += (i + 1);
        playerNamesArray[i].name = $(idOfPlayer).value;

    }
}
function setCall() {
    clearInterval(timerStarter2);
    $('setCallButton').remove();
    if (playerNamesArray.length > 1) {
        let ddList = '<select id="playerList" name="playerList">';
        for (let i = 0; i < playerNamesArray.length; i++) {
            if (!playerNamesArray[i].isBlocked) {
                ddList += '<option value="' + playerNamesArray[i].name + '"> ' + playerNamesArray[i].name + '</option>';
            }
        }
        ddList += '</select><input type="button" id="submit" value="Kiválaszt" onClick="readyToSet()">'
        $('gameBoard').innerHTML += ddList;
    }
    else {
        setCalled = 1;
        currentPlayer = playerNamesArray[0].name;
    }
}

function readyToSet() {
    setCalled = 1;
    //$('playerList').value;
    $('submit').remove();
    $('playerList').style.display = "none";
    currentPlayer = $('playerList').value;
    startSetCountBack = new Date();
    timerStarter = setInterval(timer, 1000);
}

function timer() {
    var d = new Date();
    var timeDiff = d - startSetCountBack;
    timeDiff /= 1000;
    t = Math.round(timeDiff);
    if (t === 10) {
        isItSet();
        stopTimer();
    }
}
function timer2() {

    if (numberOfCards < 26 && !blockTimer) {
        let f = new Date();
        let timeDiff = f - start3CardCount;
        timeDiff /= 1000;
        t = Math.round(timeDiff);
        if (t % 8 === 0) {
            plus3Card();
            stopTimer2();
        }
    }
    else {
        stopTimer2();
    }

}

function stopTimer() {
    clearInterval(timerStarter);
}
function stopTimer2() {
    clearInterval(timerStarter2);
}


let selectedCards = [];
function selected(e) {
    let thereWas = 0;
    if (setCalled) {
        if (selectedCards.length < 3) {
            for (let i = 0; i < selectedCards.length; i++) {
                if (event.target.id === selectedCards[i]) {
                    $(event.target.id).style.border = "";
                    selectedCards.splice(i, 1);
                    thereWas = 1;
                }
            }
            if (!thereWas) {

                $(event.target.id).style.border = "3px solid black";
                selectedCards.push(event.target.id);
                if (selectedCards.length === 3) {
                    isItSet();
                }
            }
        }
    }
    else {
        alert("A set gomb megnyomása szükséges, a játék folytatásához ! (Többjátékos módban játékos választás is)")
    }
}

function shuffle(counter) {
    for (let i = 0; i < counter; i++) {

        let t = Math.floor(Math.random() * counter);
        let tempCard = cardSet[t];
        cardSet[t] = cardSet[i];
        cardSet[i] = tempCard;

    }
}

function isItSet() {
    if (playerNamesArray.length > 1) {
        stopTimer();
    }
    let isNumberGood = 0;
    let isColorGood = 0;
    let isShapeGood = 0;
    for (let i = 0; i < selectedCards.length - 1; i++) {
        for (let j = 1; j < selectedCards.length; j++) {
            if (i !== j) {
                if (selectedCards[i].slice(0, 1) === selectedCards[j].slice(0, 1)) {
                    isNumberGood++;
                }
                if (selectedCards[j].slice(1, 3) === selectedCards[i].slice(1, 3)) {
                    isColorGood++;
                }
                if (selectedCards[j].slice(3, 4) === selectedCards[i].slice(3, 4)) {
                    isShapeGood++;
                }
            }
        }
    }
    if (selectedCards.length === 3 && ((isNumberGood === 3 || isNumberGood === 0) && (isColorGood === 3 || isColorGood === 0) && (isShapeGood === 3 || isShapeGood === 0))) {

        for (let i = 0; i < selectedCards.length; i++) {
            $(selectedCards[i]).style.display = "none";
        }
        for (let i = 0; i < playerNamesArray.length; i++) {
            if (playerNamesArray[i].name === currentPlayer) {
                playerNamesArray[i].isBlocked = 1;
                playerNamesArray[i].point += 1;
                alert(playerNamesArray[i].point);
            }
            playerNamesArray[i].isBlocked = 0;
        }
        for (let i = 0; i < selectedCards.length; i++) {
            for (let j = 0; j < numberOfCardsInDeck; j++) {
                if (selectedCards[i] === cardSet[j].id) {
                    cardSet[j].id = "";
                }
            }
        }
        selectedCards.splice(0, selectedCards.length);
        setCalled = 0;
        if (playerNamesArray.length > 1) {
            $('playerList').remove();
        }
        putCards(numberOfCards);
    }
    else {
        for (let i = 0; i < selectedCards.length; i++) {
            $(selectedCards[i]).style.border = "";
        }
        for (let i = 0; i < playerNamesArray.length; i++) {
            if (playerNamesArray[i].name === currentPlayer) {
                playerNamesArray[i].isBlocked = 1;
                playerNamesArray[i].point -= 1;
                alert(playerNamesArray[i].point);
            }
        }

        if (playerNamesArray.length > 1) {
            $('playerList').remove();
            isEveryoneBlocked();
        }
        selectedCards.splice(0, selectedCards.length);
        setCalled = 0;
        putCards(numberOfCards);
    }
}
function isEveryoneBlocked() {
    let k = 0;
    for (let i = 0; i < playerNamesArray.length; i++) {
        if (playerNamesArray[i].isBlocked === 1) {
            k += 1;
        }
    }
    if (k === playerNamesArray.length) {
        for (let i = 0; i < playerNamesArray.length; i++) {

            playerNamesArray[i].isBlocked = 0;

        }
    }
}
window.addEventListener('load', init, false);
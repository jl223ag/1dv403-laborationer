"use strict";

JOCKE.memory = function () {  
    var bodyArr, theArray, playArray, gameCount, playCount, failCount, successCount, amountCount, big, small, board, wrapper, failTag, winTag, htwo;

    bodyArr = JOCKE.CreateWindow("Memory", "pictures/memory.png", 360, 380, JOCKE.memoryCount);
    JOCKE.memoryCount[0] += 30;
    JOCKE.memoryCount[1] += 30;
    JOCKE.memoryCount = JOCKE.checkPosition(JOCKE.memoryCount, 360, 580, 400, 5);

    theArray = [];
    playArray = [];
    gameCount = 0;
    playCount = 0; // för att köra play funktionen när 2 bilder är klickade
    failCount = 0;
    successCount = 0;
    amountCount = 0;    

    wrapper = document.createElement("div");
    board = document.createElement("div");
    big = document.createElement("button");
    small = document.createElement("button");
    failTag = document.createElement("p");
    winTag = document.createElement("p");
    htwo = document.createElement("h2");

    wrapper.className = "wrappingDiv";
    htwo.className = "victory";
    failTag.className = "amount";
    winTag.className = "anotherAmount";
    board.className = "memory";
    big.className = "big";
    small.className = "small";

    big.innerHTML = "stor";
    small.innerHTML = "liten";
    winTag.innerHTML = "Hittade: 0";
    failTag.innerHTML = "Misslyckade försök: 0";

    big.onclick = function () {
        reset();
        start(4, 4);
    };
    small.onclick = function () {
        reset();
        start(2, 4);
    };

    wrapper.appendChild(htwo);
    wrapper.appendChild(winTag);
    wrapper.appendChild(failTag);    
    wrapper.appendChild(board);
    wrapper.appendChild(big);
    wrapper.appendChild(small);

    bodyArr[0].appendChild(wrapper);

    start(4, 4);

    function start(num1, num2) {
        theArray = RandomGenerator.getPictureArray(num1, num2);
        makeTable();
    };

    function makeTable() { // bygger upp bordet med bilder osv

        var memoryBoard, cardArray, imageCount;
        memoryBoard = document.createElement("div");
        cardArray = [];
        imageCount = 0;

        if (theArray.length === 8) { // enbart för css
            memoryBoard.className = "smallMemory";
        }
        else {
            memoryBoard.className = "bigMemory";
        }            

        for (var i = 0; i < theArray.length; i++) {
            createImages(theArray[i]);
        }

        function createImages(imageNr) {
            var atag, image, newImg;

            atag = document.createElement("a");
            atag.href = "#";
            atag.className = imageNr;
            image = document.createElement("img");
            image.src = "pics/0.png";

            memoryBoard.appendChild(atag);
            board.appendChild(memoryBoard);
            atag.appendChild(image);

            atag.onclick = function () {
                if ((playCount < 2) && (atag.firstChild !== newImg)) { // klickar man på en bild som redan är uppvänd händer ingenting
                    newImg = document.createElement("img");
                    newImg.src = "pics/" + imageNr + ".png";
                    atag.replaceChild(newImg, image);
                    playCount++;
                    play(atag, newImg, image);
                }
                return false;
            };
        };
    };

    function play (atag, newImg, image) {
        playArray.push(atag, newImg, image); // sparar atag + båda bilderna i en array

        if (playCount >= 2) {
            amountCount++;

            if (playArray[0].className !== playArray[3].className) { // om det är 2 olika bilder

                setTimeout(function () {
                    for (var i = 0; i <= 3; i += 3) {
                        playArray[i].replaceChild(playArray[i + 2], playArray[i + 1]); // återställer de båda ataggarnas bilder
                    }
                    playArray.splice(0, 6);
                    playCount = 0;

                }, 700);
                failCount++;
                failTag.innerHTML = "Misslyckade försök: " + failCount;
            }
            else {
                gameCount++;
                successCount++;
                playArray.splice(0, 6);
                playCount = 0;
                winTag.innerHTML = "Hittade: " + successCount;
            }

            if (gameCount === (theArray.length / 2)) {
                htwo.innerHTML = "Grattis du klarade det på " + amountCount + " försök!!!!";
            }
        }
    };

    function reset() { // resettar allt för ett nytt spel

        htwo.innerHTML = "";
        failTag.innerHTML = "Misslyckade försök: 0";
        winTag.innerHTML = "Hittade: 0";
        board.innerHTML = "";

        amountCount = 0;
        gameCount = 0;
        playCount = 0;
        failCount = 0;
        successCount = 0;
        theArray.splice(0, theArray.length);
        playArray.splice(0, playArray.length)
    };
};
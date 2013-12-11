"use strict";

var MemoryApp = {

    theArray: [],
    playArray: [],
    gameCount: 0,
    playCount: 0, // för att köra play funktionen när 2 bilder är klickade
    failCount: 0,
    successCount: 0,
    amountCount: 0,

    init: function () {                
        var big, small, board, game;

        big = document.querySelector("#big");
        small = document.querySelector("#small");
        board = document.querySelector("#memory");

        big.onclick = function () {
            MemoryApp.reset(board);
            game = new Memory(4, 4, board);
            game.start();
        };
        small.onclick = function () {
            MemoryApp.reset(board);
            game = new Memory(2, 4, board);
            game.start();
        };
    },
    
    makeTable: function (board) { // bygger upp bordet med bilder osv

        var memoryBoard, cardArray, imageCount;

        memoryBoard = document.createElement("div");
        cardArray = [];
        imageCount = 0;

        if (MemoryApp.theArray.length === 8) { // enbart för css
            memoryBoard.className = "smallMemory";
        }
        else {
            memoryBoard.className = "bigMemory";
        }

        board.appendChild(memoryBoard);

        for (var i = 0; i < MemoryApp.theArray.length; i++) {
            createImages(MemoryApp.theArray[i]);
        }

        function createImages(imageNr) {
            var atag, image, newImg;

            atag = document.createElement("a");
            atag.href = "#";
            atag.className = imageNr;
            image = document.createElement("img");
            image.src = "pics/0.png";

            memoryBoard.appendChild(atag);
            atag.appendChild(image);

            atag.onclick = function () {
                if ((MemoryApp.playCount < 2) && (atag.firstChild !== newImg)) { // klickar man på en bild som redan är uppvänd händer ingenting
                    newImg = document.createElement("img");
                    newImg.src = "pics/" + imageNr + ".png";
                    atag.replaceChild(newImg, image);
                    MemoryApp.playCount++;
                    MemoryApp.play(atag, newImg, image);                    
                }
                return false;
            };
        };
    },

    play: function (atag, newImg, image) {
        MemoryApp.playArray.push(atag, newImg, image); // sparar atag + båda bilderna i en array
        var failCount, successCount, win;

        failCount = document.querySelector("#anotherAmount");
        successCount = document.querySelector("#amount");

        if (MemoryApp.playCount >= 2) {
            MemoryApp.amountCount++;            

            if (MemoryApp.playArray[0].className !== MemoryApp.playArray[3].className) { // om det är 2 olika bilder

                setTimeout(function () {
                    for (var i = 0; i <= 3; i += 3) {
                        MemoryApp.playArray[i].replaceChild(MemoryApp.playArray[i + 2], MemoryApp.playArray[i + 1]); // återställer de båda ataggarnas bilder
                    }
                    MemoryApp.playArray.splice(0, 6);
                    MemoryApp.playCount = 0;
                                        
                }, 700);
                MemoryApp.failCount++;                
                failCount.innerHTML = "Misslyckade försök: " + MemoryApp.failCount;
            }
            else {
                MemoryApp.gameCount++;
                MemoryApp.successCount++;
                MemoryApp.playArray.splice(0, 6);
                MemoryApp.playCount = 0;                
                successCount.innerHTML = "Hittade: " + MemoryApp.successCount;
            }

            if (MemoryApp.gameCount === (MemoryApp.theArray.length / 2)) {
                win = document.querySelector("#victory");
                win.innerHTML = "Grattis du klarade det på " + MemoryApp.amountCount + " försök!!!!";
            }
        }
    },

    reset: function (board) { // resettar allt för ett nytt spel
        var win, sucessCount, failCount;

        win = document.querySelector("#victory");
        sucessCount = document.querySelector("#amount");
        failCount = document.querySelector("#anotherAmount");

        win.innerHTML = "";
        failCount.innerHTML = "Misslyckade försök: 0";
        sucessCount.innerHTML = "Hittade: 0";
        board.innerHTML = "";
        
        MemoryApp.amountCount = 0;
        MemoryApp.gameCount = 0;
        MemoryApp.playCount = 0;
        MemoryApp.failCount = 0;
        MemoryApp.successCount = 0;
        MemoryApp.theArray.splice(0, MemoryApp.theArray.length);
        MemoryApp.playArray.splice(0, MemoryApp.playArray.length)
    }
}
window.onload = MemoryApp.init;
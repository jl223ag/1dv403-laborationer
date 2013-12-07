"use strict";

var MemoryApp = {

    theArray: [],
    playArray: [],
    gameCount: 0,
    playCount: 0,
    amountCount: 0,

    init: function () {                
        var big = document.querySelector("#big");
        var small = document.querySelector("#small");
        var board = document.querySelector("#memory");

        big.onclick = function () {
            MemoryApp.reset(board);
            var game = new Memory(4, 4, board);
            game.start();
        };
        small.onclick = function () {
            MemoryApp.reset(board);
            var game = new Memory(2, 4, board);
            game.start();
        };

    },
    
    makeTable: function (board) { // bygger upp bordet med bilder osv

        var memoryBoard = document.createElement("div");
        var cardArray = [];
        var imageCount = 0;

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

            var atag = document.createElement("a");
            atag.href = "#";
            atag.className = imageNr;

            var image = document.createElement("img");
            image.src = "pics/0.png";

            memoryBoard.appendChild(atag);
            atag.appendChild(image);


            atag.onclick = function () {
                if (MemoryApp.playCount < 2) {
                    try {
                        var newImg = document.createElement("img");
                        newImg.src = "pics/" + imageNr + ".png";
                        atag.replaceChild(newImg, image);
                        MemoryApp.playCount++;
                        MemoryApp.play(atag, newImg, image);
                        return false;
                    }
                    catch (Exception) {
                        console.log("Du har redan klickat på den här brickan");
                    }
                }
            };

        };

    },

    play: function (atag, newImg, image) {
        MemoryApp.playArray.push(atag, newImg, image); // sparar atag + båda bilderna i en array

        if (MemoryApp.playCount >= 2) {

            MemoryApp.amountCount++;
            var p = document.querySelector("#amount");
            p.innerHTML = "Antal försök: " + MemoryApp.amountCount;

            if (MemoryApp.playArray[0].className !== MemoryApp.playArray[3].className) { // om det är 2 olika bilder

                setTimeout(function () {
                    for (var i = 0; i <= 3; i += 3) {
                        MemoryApp.playArray[i].replaceChild(MemoryApp.playArray[i + 2], MemoryApp.playArray[i + 1]); // återställer de båda ataggarnas bilder
                    }
                    MemoryApp.playArray.splice(0, 6);
                    MemoryApp.playCount = 0;
                }, 700);

            }
            else {
                MemoryApp.gameCount++;
                MemoryApp.playArray.splice(0, 6);
                MemoryApp.playCount = 0;
            }

            if (MemoryApp.gameCount === (MemoryApp.theArray.length / 2)) {

                var win = document.querySelector("#victory");
                win.innerHTML = "Grattis du klarade det på " + MemoryApp.amountCount + " försök!!!!";
            }
        }
    },

    reset: function (board) { // resettar allt för ett nytt spel
        var win = document.querySelector("#victory");
        var p = document.querySelector("#amount");
        win.innerHTML = "";
        p.innerHTML = "Antal försök: 0";
        board.innerHTML = "";
        MemoryApp.amountCount = 0;
        MemoryApp.gameCount = 0;
        MemoryApp.playCount = 0;
        MemoryApp.theArray.splice(0, MemoryApp.theArray.length);
        MemoryApp.playArray.splice(0, MemoryApp.playArray.length)
    }
}
window.onload = MemoryApp.init;
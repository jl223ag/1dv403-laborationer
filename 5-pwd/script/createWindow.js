"use strict";

JOCKE.CreateWindow = function (text, imagesrc, x, y, count) {
    var main, aWindow, windowTop, windowBody, windowBottom, topImg, pTop, pBottom, aMin, aClose;

    main = document.querySelector("main");
    aWindow = document.createElement("div");
    windowTop = document.createElement("div");
    windowBody = document.createElement("div");
    windowBottom = document.createElement("div");
    aWindow.className = "aWindow";
    windowTop.className = "windowTop";
    windowBody.className = "windowBody";
    windowBottom.className = "windowBottom";

    topImg = document.createElement("img");
    topImg.src = imagesrc;

    pTop = document.createElement("p");
    pTop.innerHTML = text;

    aMin = document.createElement("a");
    aClose = document.createElement("a");
    aMin.className = "minimize";
    aMin.innerHTML = "-";
    aClose.className = "close";
    aClose.innerHTML = "x";

    aWindow.tabIndex = 0; // för att focus/blur ska funka (men såklart inte i ie >_<)

    aWindow.onfocus = function () {
        aWindow.id = "focused";
    };
    aWindow.onblur = function () {
        aWindow.id = "";
    };

    aMin.onclick = function () { // minimera fönstret
        aWindow.className = "aWindowSmall";
        removeCssStyles();
        return false;
    };
    aClose.onclick = function () { // stäng fönstret
        main.removeChild(aWindow);
        return false;
    };
    topImg.onclick = function () { // förstora minimerat fönster
        if (aWindow.className === "aWindowSmall") {
            aWindow.className = "aWindow";
            someCssStyles();
        }
    };

    someCssStyles(); // positionera fönstret

    windowTop.appendChild(topImg);
    windowTop.appendChild(pTop);
    windowTop.appendChild(aClose);
    windowTop.appendChild(aMin);
    aWindow.appendChild(windowTop);
    aWindow.appendChild(windowBody);
    aWindow.appendChild(windowBottom);
    main.appendChild(aWindow);

    aWindow.focus();

    return [windowBody, windowBottom];

    function someCssStyles() {
        aWindow.style.width = x + "px";
        aWindow.style.height = y + "px";
        aWindow.style.left = count[0] + "px";
        aWindow.style.top = count[1] + "px";
        aWindow.style.bottom = "";
    };

    function removeCssStyles() {
        aWindow.style.width = "60px";
        aWindow.style.height = "60px";
        aWindow.style.left = "150px";
        aWindow.style.bottom = "-30px";
        aWindow.style.top = "";
    };
};
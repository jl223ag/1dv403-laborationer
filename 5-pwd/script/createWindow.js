"use strict";

JOCKE.CreateWindow = function (text, imagesrc, theWidth, theHeight) {
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

    aWindow.tabIndex = 0; // för att focus/blur ska funka

    aWindow.addEventListener("focus", theFocus, true); // capture istället för bubbling
    aWindow.addEventListener("blur", theBlur, true);
    aMin.addEventListener("click", theMin, false);
    topImg.addEventListener("click", theMax, false);
    aClose.addEventListener("click", theClose, false);

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

    function someCssStyles() { //---------------------------------------------------- css
        aWindow.style.width = theWidth + "px";
        aWindow.style.height = theHeight + "px";
        aWindow.style.bottom = "";
    };

    function removeCssStyles() {
        aWindow.style.width = "60px";
        aWindow.style.height = "60px";
        aWindow.style.left = "210px";
        aWindow.style.bottom = "-30px";
        aWindow.style.top = "";
    };

    function theFocus() { aWindow.id = "focused"; }; //---------------------------------------------------- event handlers

    function theBlur() { aWindow.id = ""; };

    function theMin() { aWindow.className = "aWindowSmall"; removeCssStyles(); JOCKE.checkPosition(); return false; }; // minimera fönstret

    function theMax() { // förstora minimerat fönster
        if (aWindow.className === "aWindowSmall") {
            aWindow.className = "aWindow";
            someCssStyles();
            JOCKE.checkPosition();
        }
    };

    function theClose() { // stäng fönstret och ta bort alla event handlers
        aWindow.removeEventListener("focus", theFocus, true);
        aWindow.removeEventListener("focus", theBlur, true);
        aMin.removeEventListener("click", theMin, false);
        topImg.removeEventListener("click", theMax, false);
        aClose.removeEventListener("click", theClose, false);
        main.removeChild(aWindow);
        JOCKE.checkPosition();
        return false;
    };
};
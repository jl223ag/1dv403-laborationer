"use strict";

JOCKE.CreateWindow = function (text, imagesrc) {
    var aWindow, windowTop, windowBody, windowBottom, topImg, pTop, pBottom, aMin, aClose, main;

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
    pBottom = document.createElement("p");
    pTop.innerHTML = text;

    aMin = document.createElement("a");
    aClose = document.createElement("a");
    aMin.className = "minimize";
    aMin.innerHTML = "-";
    aClose.className = "close";
    aClose.innerHTML = "x";

    aMin.onclick = function () {
        aWindow.className = "aWindowSmall";
        return false;
    };
    aClose.onclick = function () {
        main.removeChild(aWindow);
        return false;
    };
    topImg.onclick = function () {
        if (aWindow.className === "aWindowSmall") {
            aWindow.className = "aWindow";
        }
    };

    main = document.querySelector("main");
    main.appendChild(aWindow);
    aWindow.appendChild(windowTop);
    windowTop.appendChild(topImg);
    windowTop.appendChild(pTop);
    windowTop.appendChild(aMin);
    windowTop.appendChild(aClose);
    aWindow.appendChild(windowBody);
    aWindow.appendChild(windowBottom);
    windowBottom.appendChild(pBottom);

    return [windowBody, windowBottom];
};
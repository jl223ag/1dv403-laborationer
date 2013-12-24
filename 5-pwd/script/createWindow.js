"use strict";

var createWindow = function (text, imagesrc) {

    var aWindow = document.createElement("div");
    var windowTop = document.createElement("div");
    var windowBody = document.createElement("div");
    var windowBottom = document.createElement("div");
    aWindow.className = "aWindow";
    windowTop.className = "windowTop";
    windowBody.className = "windowBody";
    windowBottom.className = "windowBottom";

    var topImg = document.createElement("img");
    topImg.src = imagesrc;

    var pTop = document.createElement("p");
    var pBottom = document.createElement("p");
    pTop.innerHTML = text;

    var aMin = document.createElement("a");
    var aClose = document.createElement("a");
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

    var main = document.querySelector("main");
    main.appendChild(aWindow);
    aWindow.appendChild(windowTop);
    windowTop.appendChild(topImg);
    windowTop.appendChild(pTop);
    windowTop.appendChild(aMin);
    windowTop.appendChild(aClose);
    aWindow.appendChild(windowBody);
    aWindow.appendChild(windowBottom);
    windowBottom.appendChild(pBottom);

    return [windowBody, pBottom];
};
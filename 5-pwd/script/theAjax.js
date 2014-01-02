"use strict";

JOCKE.TheAjax = function (url, imgHolder, callback) {
    var xhr, loadImg;

    xhr = new XMLHttpRequest();
    loadImg = document.createElement("img");
    loadImg.src = "pictures/ajax.gif";
    var time = new Date();

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 1) { // laddar...
            imgHolder.appendChild(loadImg);
        }
        if (xhr.readyState === 4) { // laddat klart
            if ((xhr.status >= 200 && xhr.status < 300) || xhr.status === 304) {
                if (xhr.responseXML === true) {
                    callback(xhr.responseXML);
                }
                else {
                    callback(xhr.responseText);
                }
            }
            else {
                console.log("Ett fel inträffade " + xhr.status);
            }
            var time2 = new Date();
            imgHolder.removeChild(loadImg);
            imgHolder.innerHTML = "Laddade på: " + ((time2.getTime() - time.getTime()) / 1000) + " sekunder";
        }
    };

    xhr.open("get", url, true);
    xhr.send(null);
};
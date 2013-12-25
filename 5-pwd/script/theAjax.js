"use strict";

JOCKE.TheAjax = function (url, imgHolder, callback) {
    var xhr, loadImg;

    xhr = new XMLHttpRequest();
    loadImg = document.createElement("img");
    loadImg.src = "pictures/ajax.gif";

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 1) {            
            imgHolder.appendChild(loadImg);
        }
        if (xhr.readyState === 4) {
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
            imgHolder.removeChild(loadImg);
        }
    };

    xhr.open("get", url, true);
    xhr.send(null);
};
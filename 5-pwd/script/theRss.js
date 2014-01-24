"use strict";

JOCKE.theRss = function (url) {
    var aBodyArr = JOCKE.CreateWindow("Rss läsare", "pictures/rss.png", 360, 380);
    JOCKE.checkPosition();

    new JOCKE.TheAjax(url, aBodyArr[1], function (data) {

        aBodyArr[0].innerHTML = data;        
    });
};
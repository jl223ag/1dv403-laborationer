"use strict";

JOCKE.theRss = function (url) {
    var aBodyArr = JOCKE.CreateWindow("Rss läsare", "pictures/rss.png", 360, 380, JOCKE.placementCount);
    JOCKE.placementCount[0] += 30;
    JOCKE.placementCount[1] += 30;
    JOCKE.placementCount = JOCKE.checkPosition(JOCKE.placementCount, 360, 580, 5, 5);

    new JOCKE.TheAjax(url, aBodyArr[1], function (data) {

        aBodyArr[0].innerHTML = data;        
    });
};
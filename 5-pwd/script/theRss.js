"use strict";

JOCKE.theRss = function (url) {
    var aBodyArr = JOCKE.CreateWindow("Rss läsare", "pictures/rss.png", 360, 380, JOCKE.galleryCount);
    JOCKE.galleryCount[0] += 30;
    JOCKE.galleryCount[1] += 30;
    JOCKE.galleryCount = JOCKE.checkPosition(JOCKE.galleryCount, 360, 580, 5, 5);

    new JOCKE.TheAjax(url, aBodyArr[1], function (data) {

        aBodyArr[0].innerHTML = data;
        
    });

};
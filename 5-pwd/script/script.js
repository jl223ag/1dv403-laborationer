"use strict";

var JOCKE = {
    placementCount: [5, 5],
    bigImagesCount: [400, 5],
    whichRss: 0,
    run: function () {
        var atags;

        atags = document.querySelectorAll("footer a");

        atags[0].onclick = function () { // galleriet
            new JOCKE.Gallery();
            return false;
        };

        atags[1].onclick = function () { // rss
            JOCKE.whichRss++;

            if (JOCKE.whichRss === 1) {
                new JOCKE.theRss("http://homepage.lnu.se/staff/tstjo/labbyServer/rssproxy/?url=" + escape("http://www.dn.se/m/rss/senaste-nytt"));
            }
            else if (JOCKE.whichRss === 2) {
                new JOCKE.theRss("http://homepage.lnu.se/staff/tstjo/labbyServer/rssproxy/?url=" + escape("http://www.aftonbladet.se/rss.xml"));
            }
            else {
                new JOCKE.theRss("http://homepage.lnu.se/staff/tstjo/labbyServer/rssproxy/?url=" + escape("http://rss.nwt.se/nwtse_senaste?format=xml"));
                JOCKE.whichRss = 0;
            }            
            return false;
        };

        atags[2].onclick = function () { // memory
            new JOCKE.memory();
            return false;
        };
    },
    checkPosition: function(countArr, xValue, yValue, resetValueX, resetValueY) { // ser till att fönstren inte hamnar utanför skärmen
        var theWidth, theHeight;

        if ((countArr[0] + xValue) >= screen.width) {
            theWidth = resetValueX;
            theHeight = resetValueY;
            return [theWidth, theHeight];
        }
        else if ((countArr[1] + yValue) >= screen.height) {
            theHeight = resetValueY;
            return [countArr[0], theHeight];
        }
        else {
            return countArr;
        }
    }
};
window.onload = JOCKE.run;
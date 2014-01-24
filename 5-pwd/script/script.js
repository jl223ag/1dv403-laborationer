"use strict";

var JOCKE = {
    count: 0,
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

        atags[3].onclick = function () { // labbymezzage
            new JOCKE.labby();
            return false;
        };
    },

    checkPosition: function () { // ser till så fönstren lägger sig snyggt

        var theWindows = document.getElementsByClassName("aWindow");
        var pattern = /\d+/;
        var i = 0;
        var leftPos = 0;
        var topPos = 0;        
        var rightCount = 5;
        var bottomCount = 5;

        while (i < theWindows.length) {
            theWindows[i].style.top = (5 + (topPos * 30)) + "px";
            theWindows[i].style.left = (5 + (leftPos * 30)) + "px";

            if ((+(theWindows[i].style.height.match(pattern)) + 200 + bottomCount) >= screen.height) { // så det inte hamnar under botten
                topPos = 0;
                bottomCount = 0;
            }

            if ((+(theWindows[i].style.width.match(pattern)) + 30 + rightCount) >= screen.width) { // inte utanför sidan
                leftPos = 0;
                topPos = 0;
                rightCount = 0;
            }

            i++;
            topPos++;
            leftPos++;
            bottomCount += 30;
            rightCount += 30;
        }
    }
};
window.onload = JOCKE.run;
"use strict";

var JOCKE = {
    galleryCount: [5, 5],
    bigImagesCount: [200, 50],
    run: function () {
        var atags;

        atags = document.querySelectorAll("footer a");

        atags[0].onclick = function () {
            new JOCKE.Gallery();
            return false;
        };
    },
    checkPosition: function(countArr, xValue, yValue, resetValueX, resetValueY) {
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
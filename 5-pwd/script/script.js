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
    }
};
window.onload = JOCKE.run;
"use strict";

var JOCKE = {
    run: function () {
        var atags = document.querySelectorAll("footer a");
        
        atags[0].onclick = function () {
            new Gallery;
            return false;
        };
    }
}
window.onload = JOCKE.run;

var Gallery = function () {
    var bodyArr = createWindow("Image viewer", "pictures/gallery.png");
    bodyArr[0].innerHTML = "lalala";

};
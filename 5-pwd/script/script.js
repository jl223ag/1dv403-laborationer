"use strict";

var JOCKE = {
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

JOCKE.Gallery = function () {
    var bodyArr;

    bodyArr = JOCKE.CreateWindow("Image viewer", "pictures/gallery.png");
    new JOCKE.TheAjax("http://homepage.lnu.se/staff/tstjo/labbyServer/imgviewer/", bodyArr[1], function (data) {
        var images, widths, heights;

        images = JSON.parse(data);

        widths = images.map(function (a) { return a.thumbWidth; });
        heights = images.map(function (a) { return a.thumbHeight; });
        widths.sort();
        heights.sort();

        for (var i = 0; i < images.length; i++) {
            displayImage(i);
        }

        function displayImage(nr) {
            var main, img, imgBox;

            main = document.querySelector("main");
            img = document.createElement("img");
            imgBox = document.createElement("div");

            img.src = images[nr].thumbURL;
            imgBox.style.width = widths[widths.length - 1] + "px";
            imgBox.style.height = heights[heights.length - 1] + "px";
            bodyArr[0].appendChild(imgBox);
            imgBox.appendChild(img);

            imgBox.onclick = function () {
                var displayer, topBar, thisImg, aX;

                displayer = document.createElement("div");
                topBar = document.createElement("div");
                thisImg = document.createElement("img");
                aX = document.createElement("a");

                displayer.className = "displayer";
                aX.className = "close";
                aX.innerHTML = "x";
                thisImg.width = images[nr].width;
                thisImg.height = images[nr].height;
                thisImg.src = images[nr].URL;
                
                aX.onclick = function () {
                    main.removeChild(displayer);
                    return false;
                };

                main.appendChild(displayer);
                displayer.appendChild(topBar);
                topBar.appendChild(aX);
                displayer.appendChild(thisImg);
            };
        };
    });
};
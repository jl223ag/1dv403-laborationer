"use strict";

JOCKE.Gallery = function () {
    var bodyArr;
    bodyArr = JOCKE.CreateWindow("Image viewer", "pictures/gallery.png", 360, 380);
    JOCKE.checkPosition();

    new JOCKE.TheAjax("http://homepage.lnu.se/staff/tstjo/labbyServer/imgviewer/", bodyArr[1], function (data) {
        var images, widths, heights;

        images = JSON.parse(data);
        widths = images.map(function (a) { return a.thumbWidth; }); // hämtar ut största bredd å höjd på småbilderna
        heights = images.map(function (a) { return a.thumbHeight; });
        widths.sort();
        heights.sort();

        for (var i = 0; i < images.length; i++) {
            displayImages(i);
        }

        function displayImages(nr) { // bild placeras ut och onclick läggs till
            var main, img, imgBox;

            main = document.querySelector("main");
            img = document.createElement("img");
            imgBox = document.createElement("div");
            imgBox.className = "imgBox";

            img.src = images[nr].thumbURL;
            imgBox.style.width = widths[widths.length - 1] + "px";
            imgBox.style.height = heights[heights.length - 1] + "px";
            imgBox.title = "bredd: " + images[nr].width + "px\nhöjd: " + images[nr].height + "px";

            bodyArr[0].appendChild(imgBox);
            imgBox.appendChild(img);

            imgBox.onclick = function () {
                var photo, bigImg;

                photo = JOCKE.CreateWindow("Image viewer", "pictures/gallery.png", (images[nr].width + 40), (images[nr].height + 22));
                JOCKE.checkPosition();
                bigImg = document.createElement("img");
                bigImg.src = images[nr].URL;
                photo[0].appendChild(bigImg);
            };
        };
    });
};
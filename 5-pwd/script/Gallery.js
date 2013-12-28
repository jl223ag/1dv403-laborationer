JOCKE.Gallery = function () {
    var bodyArr;
    bodyArr = JOCKE.CreateWindow("Image viewer", "pictures/gallery.png", 360, 380, JOCKE.galleryCount);
    JOCKE.galleryCount[0] += 20;
    JOCKE.galleryCount[1] += 20;
    JOCKE.galleryCount = JOCKE.checkPosition(JOCKE.galleryCount, 360, 580, 5, 5);    

    new JOCKE.TheAjax("http://homepage.lnu.se/staff/tstjo/labbyServer/imgviewer/", bodyArr[1], function (data) {
        var images, widths, heights;

        images = JSON.parse(data);
        widths = images.map(function (a) { return a.thumbWidth; });
        heights = images.map(function (a) { return a.thumbHeight; });
        widths.sort();
        heights.sort();

        for (var i = 0; i < images.length; i++) {
            displayImages(i);
        }

        function displayImages(nr) {
            var main, img, imgBox;

            main = document.querySelector("main");
            img = document.createElement("img");
            imgBox = document.createElement("div");

            img.src = images[nr].thumbURL;
            imgBox.style.width = widths[widths.length - 1] + "px";
            imgBox.style.height = heights[heights.length - 1] + "px";
            imgBox.title = "bredd: " + images[nr].width + "px\nhöjd: " + images[nr].height + "px";

            bodyArr[0].appendChild(imgBox);
            imgBox.appendChild(img);

            imgBox.onclick = function () {
                var photo, bigImg;

                photo = JOCKE.CreateWindow("Image viewer", "pictures/gallery.png", (images[nr].width + 40), (images[nr].height + 22), JOCKE.bigImagesCount);
                bigImg = document.createElement("img");
                JOCKE.bigImagesCount[0] += 20;
                JOCKE.bigImagesCount[1] += 20;
                JOCKE.bigImagesCount = JOCKE.checkPosition(JOCKE.bigImagesCount, (images[nr].width + 30), (images[nr].height + 220), 200, 50);
                bigImg.src = images[nr].URL;
                photo[0].appendChild(bigImg);
            };
        };
    });
};
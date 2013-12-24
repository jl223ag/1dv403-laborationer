"use strict";

var theAjax = function (url, loadIcon, callback) {

    var xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function () {

        if (xhr.readyState === 3) {
            loadIcon.innerHTML = "Loading..";
        }
        if (xhr.readyState === 4) {
            if ((xhr.status >= 200 && xhr.status < 300) || xhr.status === 304) {

                callback(xhr.responseText);
            }
            else {
                console.log("Ett fel inträffade " + xhr.status);
            }
        }
    };

    xhr.open("get", url, true);

    xhr.setRequestHeader('If-Modified-Since', 'Mon, 01 Sep 2007 00:00:00 GMT');

    xhr.send(null);
};
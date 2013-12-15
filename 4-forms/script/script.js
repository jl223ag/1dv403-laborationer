"use strict";

var Validate = {
    run: function () {
        var form = document.querySelector("#form1");        
        var first = form.elements["firstname"];
        var last = form.elements["lastname"];
        var boxnr = form.elements["boxnumber"];
        
        first.onblur = function () { doNameInput(first, last); };
        last.onblur = function () { doNameInput(last, first); };
        boxnr.onblur = function () { checkBoxNr(); };



        var doNameInput = function (name, secondname) {
            if (name.value === "") {
                name.className = "fail";
            }
            else if (name.value === secondname.value) {
                name.className = "fail";
                secondname.className = "fail";
            }
            else if ((name.value !== secondname.value) && (name.value !== "") && (secondname.value !== "")) {
                name.className = "win";
                secondname.className = "win";
            }
            else {
                name.className = "win";
            }
        };

        var checkBoxNr = function () {
            var boxPattern = /^([se]{2}\s?)?[\d]{3}[\-\s]?[\d]{2}$/i;
            var numberPattern = /[a-z]|\-|\s/;
            var numberArray = [];

            if (boxnr.value.match(boxPattern)) {
                boxnr.className = "win";

                for (var i = 0; i < boxnr.value.length; i++) {

                    if (!boxnr.value[i].match(numberPattern)){
                        numberArray[i] = boxnr.value[i];
                    }
                }
                boxnr.value = dude.join("");
            }
            else {
                boxnr.className = "fail";
            }
        };
        


    }
}

window.onload = Validate.run;
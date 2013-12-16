"use strict";

var Validate = {
    run: function () {
        var form = document.querySelector("#form1"); // hämtar ut formelementen
        var sub = document.querySelector("#theButton");
        var first = form.elements["firstname"];
        var last = form.elements["lastname"];
        var boxnr = form.elements["boxnumber"];
        var email = form.elements["email"];
        var pricemodel = form.elements["pricemodel"];

        form.reset(); // resettar alla inputfields vid laddning av sidan

        var firstnamePtag = document.querySelector("#firstname"); // hämtar ptaggarna och skapar en node för varje
        var firstText = document.createTextNode("");
        var lastnamePtag = document.querySelector("#lastname");
        var lastText = document.createTextNode("");
        var boxPtag = document.querySelector("#boxnumber");
        var boxText = document.createTextNode("");
        var emailPtag = document.querySelector("#email");
        var emailText = document.createTextNode("");

        firstnamePtag.appendChild(firstText); // lägg till noderna i ptaggarna
        lastnamePtag.appendChild(lastText);
        boxPtag.appendChild(boxText);
        emailPtag.appendChild(emailText);

        first.onblur = function () { checkName(first, last, firstText, lastText); }; // blur events
        last.onblur = function () { checkName(last, first, lastText, firstText); };
        boxnr.onblur = function () { checkBoxNr(); };
        email.onblur = function () { checkEmail(); };

        sub.onclick = function () {
            if (first.className === "win" && last.className === "win" && boxnr.className === "win" && email.className === "win") {
                popup();
                
            }
            return false;
        };

        var checkName = function (name, secondname, text, secondText) { // kollar för och efternamn      
            if (name.value === "") {
                name.className = "fail";
                text.nodeValue = "Kan inte vara tom";
            }
            else if (name.value === secondname.value) {
                name.className = "fail";
                secondname.className = "fail";
                text.nodeValue = "samma för och efternamn";
                secondText.nodeValue = "samma för och efternamn";
            }
            else if ((name.value !== secondname.value) && (name.value !== "") && (secondname.value !== "")) {
                name.className = "win";
                secondname.className = "win";
                text.nodeValue = "";
                secondText.nodeValue = "";
            }
            else {
                name.className = "win";
                text.nodeValue = "";
            }
        };

        var checkBoxNr = function () { // kollar postnummer
            var boxPattern = /^([se]{2}\s?)?[\d]{3}[\-\s]?[\d]{2}$/i;
            var numberPattern = /[a-z]|\-|\s/;
            var numberArray = [];

            if (boxnr.value.match(boxPattern)) {
                boxnr.className = "win";
                boxText.nodeValue = "";

                for (var i = 0; i < boxnr.value.length; i++) {

                    if (!boxnr.value[i].match(numberPattern)){
                        numberArray[i] = boxnr.value[i];
                    }
                }
                boxnr.value = numberArray.join("");
            }
            else {
                boxnr.className = "fail";
                boxText.nodeValue = "Felaktigt format"
            }
        };

        var checkEmail = function () { // kollar email
            var emailPattern = /^(?!\.)(\w|-|\.|#){1,64}(?!\.)@(?!\.)[-.a-zåäö0-9]{4,253}$/i;

            if (email.value.match(emailPattern)) {
                email.className = "win";
                emailText.nodeValue = "";
            }
            else {
                email.className = "fail";
                emailText.nodeValue = "felaktigt emailformat";
            }
        };

        var popup = function () { // bygger upp popup fönstret
            var megadiv = document.createElement("div");
            var div = document.createElement("div");
            megadiv.className = "megadiv";
            div.className = "popup";

            var top = document.createElement("div");
            var bottom = document.createElement("div");
            var xButton = document.createElement("a");
            xButton.href = "#";
            var xButtonText = document.createTextNode("X");
            var header = document.createElement("h2");
            var headerText = document.createTextNode("Vänligen godkänn ditt köp");
            var p1 = document.createElement("p");
            var p1Text = document.createTextNode("Förnamn:\t" + first.value);
            var p2 = document.createElement("p");
            var p2Text = document.createTextNode("Efternamn:\t" + last.value);
            var p3 = document.createElement("p");
            var p3Text = document.createTextNode("Postnummer:\t" + boxnr.value);
            var p4 = document.createElement("p");
            var p4Text = document.createTextNode("Email:\t" + email.value);
            var p5 = document.createElement("p");
            var p5Text = document.createTextNode("Prismodell:\t" + pricemodel.value);
            var cancel = document.createElement("button");
            var cancelText = document.createTextNode("Avbryt");
            var confirmButton = document.createElement("button");
            var confirmButtonText = document.createTextNode("Bekräfta");

            document.body.appendChild(megadiv);
            document.body.appendChild(div);
            div.appendChild(top);
            top.appendChild(xButton);
            xButton.appendChild(xButtonText);

            div.appendChild(header);
            header.appendChild(headerText);
            
            div.appendChild(p1);
            p1.appendChild(p1Text);
            div.appendChild(p2);
            p2.appendChild(p2Text);
            div.appendChild(p3);
            p3.appendChild(p3Text);
            div.appendChild(p4);
            p4.appendChild(p4Text);
            div.appendChild(p5);
            p5.appendChild(p5Text);

            div.appendChild(bottom);
            bottom.appendChild(confirmButton);
            confirmButton.appendChild(confirmButtonText);
            bottom.appendChild(cancel);
            cancel.appendChild(cancelText);

            xButton.onclick = function () {
                document.body.removeChild(megadiv);
                document.body.removeChild(div);
                return false;
            };
            cancel.onclick = function () {
                document.body.removeChild(megadiv);
                document.body.removeChild(div);
            };
            confirmButton.onclick = function () { 
                document.body.removeChild(megadiv);
                document.body.removeChild(div);
                form.submit(); // här submittas formen
            };
        };
    }
}

window.onload = Validate.run;
"use strict";

JOCKE.labby = function() {
    var bodyArr, labcount, messages, msgcount, theDiv, textwall, field, sendmsg, div, p, p2, a, a2, clock, kill;

    bodyArr = JOCKE.CreateWindow("Labby mezzage", "pictures/labby.png", 360, 380);
    JOCKE.checkPosition();

    labcount = 0;
    messages = []; // arrayen som håller meddelandena
    msgcount = document.createElement("p");
    msgcount.className = "numberMessages";
    msgcount.innerHTML = "Antal meddelanden: 0";

    theDiv = document.createElement("div");    
    textwall = document.createElement("div");
    theDiv.className = "labbymezzage";
    textwall.className = "textWall";

    field = document.createElement("textarea");
    field.rows = 5;
    field.cols = 500;
    field.className = "theText";
    field.onkeypress = function (e) {
        if (!e) { var e = window.event; }
        if ((e.keyCode === 13) && (!e.shiftKey)) {
            e.preventDefault();
            sendmsg.onclick();
        }
    };

    sendmsg = document.createElement("button"); // skapa skickaknapp
    sendmsg.innerHTML = "skriv";
    sendmsg.className = "abutton";

    theDiv.appendChild(msgcount);
    theDiv.appendChild(field);
    theDiv.appendChild(sendmsg);
    theDiv.appendChild(textwall);    
    bodyArr[0].appendChild(theDiv);

    sendmsg.onclick = function () {
        var mess;
        mess = new JOCKE.Message();
        mess.getText = field.value;
        mess.getDate = new Date();
        messages.push(mess); // in med objektet i arrayen

        labcount++;
        renderMessages();
        countDisplayer();
        field.value = "";
    };

    function countDisplayer () { // antal meddelanden
        
        msgcount.innerHTML = "Antal meddelanden: " + labcount;
    };

    function removeMessage (messageId){ // tar bort valda meddelandet

        messages.splice(messageId, 1);
        labcount--;
        renderMessages();
        countDisplayer();
    };

    function renderMessage(messageId) { // skapar ett meddelande
        
        div = document.createElement("div");
        p = document.createElement("p");
        p2 = document.createElement("p");
        a = document.createElement("a");
        a2 = document.createElement("a");
        clock = document.createElement("img");
        kill = document.createElement("img");
        a.href = "#";
        a.onclick = function () {
            var conf = confirm("Vill du radera meddelandet?");
            if (conf === true) {
                removeMessage(messageId);
            }
            return false;
        };

        a2.href = "#";
        a2.onclick = function () {
            var time;
            time = messages[messageId].getDateText(messages[messageId].getDate);
            alert(time);
            return false;
        };

        clock.src = "pictures/clock.png";
        kill.src = "pictures/x.png";

        textwall.appendChild(div);
        div.appendChild(p);
        div.appendChild(a2);
        div.appendChild(a);
        div.appendChild(p2);

        p.innerHTML = messages[messageId].getHTMLText(messages[messageId].getText);
        a2.appendChild(clock);
        a.appendChild(kill);
        p2.className = "textTime";
        p2.innerHTML = messages[messageId].getDate.toLocaleTimeString();
    };

    function renderMessages() {

        textwall.innerHTML = ""; // tar bort alla meddelanden

        for (var i = 0; i < messages.length; i++) { // skriver ut dem på nytt
            renderMessage(i);
        }
    };
};
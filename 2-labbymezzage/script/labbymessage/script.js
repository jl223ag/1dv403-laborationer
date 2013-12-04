"use strict";

function labby (msgId) {

    var count = 0;
    var messages = []; // arrayen som håller meddelandena
    var msgcount = document.createElement("p");
    msgcount.className = "numberMessages";
    msgcount.innerHTML = "Antal meddelanden: 0";

    var theDiv = document.getElementById(msgId);    
    var textwall = document.createElement("div");
    textwall.className = "textWall";

    var field = document.createElement("textarea");
    field.rows = 10;
    field.cols = 500;
    field.className = "theText";
    field.onkeypress = function (e) {
        if (!e) { var e = window.event; }
        if ((e.keyCode === 13) && (!e.shiftKey)) {
            e.preventDefault();
            sendmsg.onclick();
        }
    };

    theDiv.appendChild(msgcount);
    theDiv.appendChild(textwall);
    theDiv.appendChild(field);

    var sendmsg = document.createElement("button"); // skapa skickaknapp
    sendmsg.innerHTML = "skriv";
    sendmsg.className = "abutton";
    theDiv.appendChild(sendmsg);

    sendmsg.onclick = function () {
        var mess = new Message();
        mess.getText = field.value;
        mess.getDate = new Date();
        messages.push(mess); // in med objektet i arrayen

        count++;
        renderMessages();
        countDisplayer();
        field.value = "";
        console.log(count);
    };

    function countDisplayer () { // antal meddelanden
        
        msgcount.innerHTML = "Antal meddelanden: " + count;
    };

    function removeMessage (messageId){ // tar bort valda meddelandet

        messages.splice(messageId, 1);
        count--;
        renderMessages();
        countDisplayer();
    };

    function renderMessage(messageId) { // skapar ett meddelande
        
        var div = document.createElement("div");
        var p = document.createElement("p");
        var p2 = document.createElement("p");
        var a = document.createElement("a");
        var a2 = document.createElement("a");
        var clock = document.createElement("img");
        var kill = document.createElement("img");
        a.href = "#";
        a.onclick = function () {
            var conf = confirm("Vill du radera meddelandet?")
            if (conf === true) {
                removeMessage(messageId);
            }
            return false;
        };

        a2.href = "#";
        a2.onclick = function () {
            var time = messages[messageId].getDateText(messages[messageId].getDate);
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

window.onload = function () {
    
    new labby("field1");
    new labby("field2");
}
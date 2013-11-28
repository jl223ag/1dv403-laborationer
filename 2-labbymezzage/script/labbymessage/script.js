"use strict"


function Message(text, date) {

    this.getText = function () { return text; };
    this.setText = function (_text) { text = _text; };

    this.getDate = function () { return date; };
    this.setDate = function (_date) { date = _date; };

};

Message.prototype.toString = function () {
    return this.getText + " (" + this.getDate + ")";
};

Message.prototype.getHTMLText = function () {
};

Message.prototype.getDateText = function (now) {
    return "Meddelandet skapades den " + now.toLocaleDateString() + " klockan " + now.toLocaleTimeString();
};

var labby = {
    count: 0,
    messages: [], // arrayen som håller meddelandena
    countDisplayer: function (msgcount) { // antal meddelanden

        msgcount = document.querySelector("#numberMessages");
        msgcount.innerHTML = "Antal meddelanden: " + labby.count;
    },    
    removeMessage: function(messageId){ // tar bort valda meddelandet

        labby.messages.splice(messageId, 1);
        labby.count--;
        labby.renderMessages();
        labby.countDisplayer();
    },
    renderMessage: function (messageId) { // skapar ett meddelande
        console.log(labby.messages[messageId]);
        var wall = document.querySelector("#textWall");
        var div = document.createElement("div");
        var p = document.createElement("p");
        var a = document.createElement("a");
        var a2 = document.createElement("a");
        var clock = document.createElement("img");        
        var kill = document.createElement("img");

        a.setAttribute("href", "#");
        a.onclick = function () {
            var conf = confirm("Vill du radera meddelandet?")
            if (conf === true)
            {
                labby.removeMessage(messageId);
            }
            return false;
        };
        
        a2.setAttribute("href", "#");
        a2.onclick = function () {
            var time = labby.messages[messageId].getDateText(labby.messages[messageId].getDate);
            alert(time);
            return false;
        };

        clock.src = "pictures/clock.png";
        kill.src = "pictures/x.png";

        wall.appendChild(div);
        div.appendChild(p);
        div.appendChild(a2);
        div.appendChild(a);
        
        p.innerHTML = labby.messages[messageId].getText;
        a2.appendChild(clock);
        a.appendChild(kill);
    },
    renderMessages: function () {

        document.querySelector("#textWall").innerHTML = ""; // tar bort alla meddelanden

        for (var i = 0; i < labby.messages.length; i++) { // skriver ut dem på nytt
            labby.renderMessage(i);
        }
    },
    run: function () {
        var sendmsg = document.querySelector("#abutton");
        sendmsg.onclick = function () {

            var mess = new Message();
            mess.getText = document.querySelector("#theText").value;
            mess.getDate = new Date();
            labby.messages.push(mess); // in med objektet i arrayen

            labby.count++;
            mess.getText.value = "";
            labby.renderMessages();
            labby.countDisplayer();
        };
    }
};

window.onload = labby.run;
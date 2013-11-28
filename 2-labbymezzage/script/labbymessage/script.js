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
};

var labby = {
    count: 0,
    messages: [],
    countDisplayer: function (msgcount) {

        msgcount = document.querySelector("#numberMessages");
        msgcount.innerHTML = "Antal meddelanden: " + labby.count;
    },    
    removeMessage: function(messageId){

        labby.messages.splice(messageId, 1);
        labby.count--;
        labby.countDisplayer();
        labby.renderMessages();        
    },
    renderMessage: function (messageId) { // skapar ett meddelande

        var wall = document.querySelector("#textWall");
        var div = document.createElement("div");
        var p = document.createElement("p");
        var a = document.createElement("a");
        var ab = document.createElement("a");
        var clock = document.createElement("img");        
        var kill = document.createElement("img");

        a.setAttribute("href", "#");
        a.onclick = function () {
            labby.removeMessage(messageId);
            return false;
        }
        ab.setAttribute("href", "#");

        clock.src = "pictures/clock.png";
        kill.src = "pictures/x.png";

        wall.appendChild(div);
        div.appendChild(p);
        div.appendChild(ab);
        div.appendChild(a);
        
        p.innerHTML = labby.messages[messageId];
        ab.appendChild(clock);
        a.appendChild(kill);
        console.log(labby.messages[messageId]);
    },
    renderMessages: function () {

        document.querySelector("#textWall").innerHTML = ""; // tar bort alla meddelanden

        for (var i = 0; i < labby.messages.length; i++) { // skriver ut dem på nytt
            labby.renderMessage(i);
        }
    },
    run: function () {
                      
        var mess = new Message();
        var sendmsg = document.querySelector("#abutton");

        sendmsg.onclick = function () {

            var input = document.querySelector("#theText").value;
            labby.messages.push(input); // in med inputen i arrayen
            labby.count++;
            labby.renderMessages();
            labby.countDisplayer();
        };
    }
};

window.onload = labby.run;
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
    renderMessage: function(messageId){

        var wall = document.querySelector("#textWall");
        var div = document.createElement("div");
        var p = document.createElement("p");
        wall.appendChild(div);
        div.appendChild(p);
        p.innerHTML = labby.messages[messageId];


        console.log(labby.messages[messageId]);
    },
    renderMessages: function () {

        document.querySelector("#textWall").innerHTML = "";

        for (var i = 0; i < labby.messages.length; i++) {
            labby.renderMessage(i);
        }

    },
    run: function () {

	}
};

window.onload = labby.run;

function getInput() {
    var mess = new Message();
    mess.getDate = new Date();
    
    var input = document.querySelector("#theText").value;   
    labby.messages.push(input); // in med inputen i arrayen

    labby.renderMessages();
    
    labby.count += 1;

};
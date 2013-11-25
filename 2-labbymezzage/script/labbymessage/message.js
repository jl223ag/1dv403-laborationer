function Message(text, date) {

    this.getText = function () { return text; };
    this.setText = function (_text) { text = _text; };

    this.getDate = function () { return date; };
    this.setDate = function (_date) { date = _date; };

};

Message.prototype.toString = function () {
    return this.getText() + " (" + this.getDate() + ")";
};

Message.prototype.getHTMLText = function () {
    return this.getText();
};

Message.prototype.getDateText = function () {
    return this.getDate();
};
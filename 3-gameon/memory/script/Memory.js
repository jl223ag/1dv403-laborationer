"use strict";

function Memory(cols, rows, id) {

    this.cols = cols;
    this.rows = rows;
    this.id = id;

};
Memory.prototype.start = function () {
    MemoryApp.theArray = RandomGenerator.getPictureArray(this.rows, this.cols);
    MemoryApp.makeTable(this.id);
};
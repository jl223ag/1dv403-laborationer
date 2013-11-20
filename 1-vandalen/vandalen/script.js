"use strict";

var makePerson = function(persArr) {
    
    var theNames,
    theAges,
    ageSum,
    result;
    
	persArr.name = persArr.map(function(a){ return a.name; }); // namnen
	theNames = persArr.name.sort(function(a, b) { return a.localeCompare(b) });
	theNames = theNames.join(", ");
	
	persArr.age = persArr.map(function(a) { return a.age; }); // åldrarna
	theAges = persArr.age;
    theAges.sort();
	
    ageSum = theAges.reduce(function(a, b){ return a + b; }); // summan av alla åldrar
    
    result = {
        names: theNames,
        minAge: theAges[0],
        maxAge: theAges[theAges.length - 1],
        averageAge: Math.round(ageSum / theAges.length)
    };

    return result;
};
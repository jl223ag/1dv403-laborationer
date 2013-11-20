"use strict";

window.onload = function(){

	
	var birthday = function(date){
	 
	errorcheck(date);
    
    var userDate = new Date(date);
    var now = new Date();
    
    userDate.setFullYear(now.getFullYear());
    
    var days = Math.ceil((userDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    if (days < 0){
        var nextYear = new Date();
        nextYear.setFullYear(now.getFullYear() + 1);
        days = days + (nextYear.getTime() - now.getTime()) / (1000 * 60 * 60 * 24);
    }

    return days;
	
        function errorcheck(thedate){
        
        var check = +thedate.substr(0,4);
        var check2 = +thedate.substr(5,2);
        var check3 = +thedate.substr(8,2);
        
        if (thedate.charAt(4) != "-" || thedate.charAt(7) != "-" || isNaN(check) || isNaN(check2) || isNaN(check3)){ // använda typeof istället?
            
            throw new Error("Detta är inget giltigt datum mannen!");
        }
        if (check2 < 1 ||check2 > 12){
            
            throw new Error("Månaden finns inte");
        }
        if (check3 < 1 || check3 > 31){
            
            throw new Error("Dagen finns inte");
        }
        
    };
	
};
	// ------------------------------------------------------------------------------


	// Kod för att hantera utskrift och inmatning. Denna ska du inte behöva förändra
	var p = document.querySelector("#value"); // Referens till DOM-noden med id="#value"
	var input = document.querySelector("#string");
	var submit = document.querySelector("#send");

	// Vi kopplar en eventhanterare till formulärets skickaknapp som kör en anonym funktion.
	submit.addEventListener("click", function(e){
		e.preventDefault(); // Hindra formuläret från att skickas till servern. Vi hanterar allt på klienten.

		p.classList.remove( "error");

		try {
			var answer = birthday(input.value); // Läser in texten från textrutan och skickar till funktionen "convertString"
			var message;
			switch (answer){
				case 0: message = "Grattis på födelsedagen!";
					break;
				case 1: message = "Du fyller år imorgon!";
					break;
				default: message = "Du fyller år om " + answer + " dagar";
					break;
			}

			p.innerHTML = message;
		} catch (error){
			p.classList.add( "error"); // Växla CSS-klass, IE10+
			p.innerHTML = error.message;
		}
	
	});



};
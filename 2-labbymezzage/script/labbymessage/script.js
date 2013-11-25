var labby = {
	run: function(){
		
	    var mess = new Message("test", new Date());

	    alert(mess);
	    alert(mess.getText());
	    mess.setText("new test");
	    alert(mess);
		
		
		
		
		
		
		
		
		
		
	}
};

window.onload = labby.run;
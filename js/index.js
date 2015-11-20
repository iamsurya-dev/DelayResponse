$(function() {
	console.log("Inside js file");
	$('#responseBook').hide();
	$('#postResponse').hide();
	$('#bookSubmit').on('click', function(e){
		e.preventDefault();
		var data = {};
		data.title = $('#bookSearch').val();
		console.log("Book title :: ", data);
		$.ajax({
					type: 'POST',
					data: JSON.stringify(data),
					contentType: 'application/json',
		        	url: '/search',						
		        	success: function(data) {
		        		console.log('inside post success');
		            	console.log(JSON.stringify(data));
		            	$('#postResponse').show();
		            	getGlobalVariable();
		        	}
		        });

	}); 

	function getGlobalVariable() {
		console.log("Inside get global variable");
		$.ajax({
					type: 'GET',
		        	url: '/getGlobal',						
		        	success: function(data) {
		        		console.log('inside get success :: ' + data);
		        		if(data == 0) 
		        			getGlobalVariable();
		        		else 
		        			$('#responseBook').show();
		        	}
		        });
	}

});
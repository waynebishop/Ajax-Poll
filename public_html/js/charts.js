$(document).ready(function(){
	
	// Set up AJAX
	$.ajax({

		type: 'get',
		datatype: "json",
		url: 'api/charts.php',
		success:function(dataFromServer){
			console.log(dataFromServer);
			// Load Visualization API
			google.charts.load("current", {packages:["corechart"]});
			// Set a callback to eun when Vis API is loaded
    		google.charts.setOnLoadCallback(drawChart);

    		function drawChart(){

    			var data = new google.visualization.DataTable();
    			data.addColumn('string', 'Yes');
    			data.addColumn('number', 'TotalYes');

                data.addColumn('string', 'No');
                data.addColumn('number', 'TotalNo');

    			var options = {
    				title: 'Poll results do you like icecream - Yes or No?'
    			};

    			var chart = new google.visualization.BarChart(document.getElementById('barchart'));

    			chart.draw(data, options);

    		}




		},
		error:function(){
			console.log('Cannot connect to server..')
		}

	});


});
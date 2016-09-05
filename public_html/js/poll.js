$(document).ready(function(){
	// Listen to the form for a submit event

	//Load Google Charts packages
	google.charts.load('current', {packages: ['corechart', 'bar']});

	$('#poll').submit(function(event){

		//Stop the form form submitting
		event.preventDefault();

		// Find the checked option
		var voteValue = $('[name=vote]:checked').val(); 

		// Make sure the vote is valid
		if( voteValue == undefined){
			// Display an error message
			$('#message').html('Please select your vote!');
			$('#message').removeClass('success').addClass('error');
		}
		if(voteValue == undefined) return;

		// AJAX
		// Add new vote to the DB and show it in a graph
		$.ajax({
			type: 'get',
			url: 'api/poll.php',
			data: {
				vote:voteValue
			},
			success: function(dataFromServer){
				console.log(dataFromServer);
				if(dataFromServer['status'] === false){
					//Something went wrong
					$('#message').removeClass('success').addClass('error');
					$('#message').html(dataFromServer['message']);	
				} else {
					//Vote was successfully uploaded

					// Empty the chart div
					$('#chart_div').empty(); 

					$('#message').removeClass('error').addClass('success');
					$('#message').html(dataFromServer['message']);

					google.charts.setOnLoadCallback(drawBarChart);

					function drawBarChart(){

						//Prepare data for graph
						//Create 3 columns in the table
						//Rows must send related data to each of the columns
						var data = google.visualization.arrayToDataTable([
							['Vote', 'Number of Votes', { rolse: 'style'}],
							['Yes', parseFloat(dataFromServer['totalYes']), '#4cae4c'],
							['No', parseFloat(dataFromServer['totalNo']), '#d43f3a'],
						]);

						//Set the Options for the graph
						var options = {
							title: 'Do you like icecream?',
							chartArea: {width: '50%'},
							legent: 'none',
							hAxis: {format: '#'},
							animation: {
								duration: 1000,
								easing: 'out',
								startup: true
							}
						};

						// Set wehere chart to go
						var chart = new google.visualization.BarChart(document.getElementById('chart_div'));

						//Draw the Chart
						chart.draw(data, options);

					}	
				}
			},
			error: function(){
				console.log("Cannot connect to server.");
			} 

		});

	});

});
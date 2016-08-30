<?php
// Include our config file
include('../../config.inc.php'); 


// Capture the Vote
$vote = strtolower($_GET['vote']);

// Acceptable values
$validVotes = ['yes','no'];

// Validate the vote
$isValid = in_array($vote, $validVotes);

if($isValid == false){
	$message = [

		'status' => false,
		'message' => 'Vote is invalid'

	];

	// Convert the message into JSON
	$message->json_encode($message);

	//Prepare the header
	header('Content-Type: application/json');

	echo $message;

	exit();

}

// Get the users IP address
// For testing comment out
// $ipaddress = $_SERVER['REMOTE_ADDR'];

// For testing create a random number 
$ipaddress = rand(1,15);

// Connect to database
$dbc = new mysqli(DB_HOST, DB_USER, DB_PASSWORD, DB_NAME);


//Prepare the insert query
$sql = "INSERT INTO vote VALUES (null, '$vote', '$ipaddress')";

// Run the query
$dbc->query($sql);


if($dbc->affected_rows == 1) {

	// Vote sent

	// get the vote summary
	$sql = "SELECT SUM( (CASE WHEN vote = 'yes' THEN 1 ELSE 0 END) ) AS TotalYes, SUM( (CASE WHEN vote = 'no' THEN 1 ELSE 0 END) ) AS TotalNo FROM vote";

	$result = $dbc->query($sql);

	// Convert ino an associative array
	$result = $result->fetch_assoc();

	$message = [
		'status' => true,
		'message' => 'Thank you for your vote',
		'totalYes' => $result['TotalYes'],
		'totalNo' => $result['TotalNo']

	];

	//Prepare the header
	header('Content-Type: application/json');

	echo json_encode($message); 


}







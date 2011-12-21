<?php
	### ACTION DISPATCHER ###
	
	$action_name = $_REQUEST["action"];
	
	$action_result = array(
		"action" => $action_name,
		"timestamp" => "",
		"status" => "unknown"
	);
	
	$allowed_methods = array("GET", "POST");
	
	header("Cache-Control: no-cache, must-revalidate");
	header("Expires: Mon, 26 Jul 1997 05:00:00 GMT");
	header("Content-type: application/json");

	if (!in_array($_SERVER["REQUEST_METHOD"], $allowed_methods)) 
	{
		$action_result["status"] = "failed";
		$action_result["error"] = "invalid-invocation";
	}
	else
	{
		$action_file = "./actions/${action_name}.php";
		
		if (file_exists($action_file))
		{
			include($action_file);
		}
		else
		{
			$action_result["status"] = "failed";
			$action_result["error"] = "invalid-action-name";
		}
	}

	$action_result["timestamp"] = gmdate("Y-m-d\TH:i:s\Z");
	echo json_encode($action_result);
?>

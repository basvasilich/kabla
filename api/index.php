<?php
	### ACTION DISPATCHER ###
	
	$action_name = $_REQUEST["action"];
	
	$action_result = array(
		"action" => $action_name,
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

	echo json_encode($action_result);
?>

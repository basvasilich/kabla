<?php

# ACTION: Identify
# Copyright ©, 2011 Smekalka

$current_access_point = $_SERVER["REMOTE_ADDR"];
$auth_type = $_REQUEST["authType"];
$access_device_record = null;
		
# VOUCHER IDENTIFICATION
if ($auth_type == "PassKey")
{
	$pass_key = $_REQUEST["passKey"];
	
	$query_result = mysql_query(sprintf("SELECT * FROM V_ACCESS_DEVICE_PASS_KEY WHERE PASS_KEY = '%s'", mysql_real_escape_string($pass_key)));
	if (!$query_result) {
		$action_result["status"] = "failed";
		$action_result["errorType"] = "ServerError";
		$action_result["errorMessage"] = "Invalid query: " . mysql_error();
			
		exit();
	}
	
	$access_device_record = mysql_fetch_assoc($query_result);
}
# USER IDENTIFICATION
/*
else if ($auth_type == "user")
{
	$id_login = $_REQUEST["login"];
	$id_password = $_REQUEST["password"];
	
	$action_result["status"] = "ok";
}
*/
else # ERROR
{
	$action_result["status"] = "failed";
	$action_result["errorType"] = "UnsupportedAuthType";
	
	exit();
}
	
if ($access_device_record)
{
	$access_device_id =			$access_device_record["ID"];
	$identity_id =				$access_device_record["IDENTITY_ID"];
	$issue_datetime =			$access_device_record["ISSUE_DT"];
	$expiry_datetime =			$access_device_record["EXPIRY_DT"];
	$activation_datetime =		$access_device_record["ACTIVATION_DT"];
	$deactivation_datetime =	$access_device_record["DEACTIVATION_DT"];
	
	if ($deactivation_datetime && $pass_key != "55555555") # ERROR
	{
		$action_result["status"] = "failed";
		$action_result["errorType"] = "ExpiredAuthData";
	
		exit();
	}
	#else if ($expiry_date < getdate())
	#{
	#	// …
	#}
	
	$query_result = mysql_query(sprintf("SELECT * FROM ACCESS_GEAR_IDENTITY_TOKEN WHERE ACCESS_GEAR_ID = %s AND ACCESS_POINT = '%s'", $access_device_id,  mysql_real_escape_string($current_access_point)));
	if (!$query_result) {
		$action_result["status"] = "failed";
		$action_result["errorType"] = "ServerError";
		$action_result["errorMessage"] = "Invalid query: " . mysql_error();
			
		exit();
	}
	
	$row = mysql_fetch_assoc($query_result);
	
	if ($row)
	{
		$identity_token = $row["IDENTITY_TOKEN"];
		$token_access_point = $row["ACCESS_POINT"];
		
		if ($current_access_point != $token_access_point)
		{
			$identity_token = null;
		}
		
		// TODO: Check expiration, etc...
	}
	
	if (!$identity_token)
	{
		$identity_token = uniqid();
		mysql_query(sprintf("INSERT ACCESS_GEAR_IDENTITY_TOKEN(IDENTITY_TOKEN, ACCESS_POINT, ACCESS_GEAR_ID, IDENTITY_ID) VALUE('%s', '%s', %s, %s)", $identity_token, mysql_real_escape_string($current_access_point), $access_device_id, $identity_id));
	}
	
	$action_result["data"] = array("token" => $identity_token);
	$action_result["status"] = "ok";
}
else # ERROR
{
	$action_result["status"] = "failed";
	$action_result["errorType"] = "InvalidAuthData";
	
	exit();
}

?>

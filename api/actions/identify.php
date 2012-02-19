<?php

# ACTION: Identify
# Copyright ©, 2011 Smekalka

$auth_type = $_REQUEST["authType"];
if (!$auth_type) $auth_type = $_REQUEST["identification-type"];
$current_access_point = $_SERVER["REMOTE_ADDR"];

$access_device_record = null;
		
# VOUCHER IDENTIFICATION
if ($auth_type == "AuthCode" || $auth_type == "voucher")
{
	$access_code = $_REQUEST["authCode"];
	if (!$access_code) $access_code = $_REQUEST["activation-code"];
	
	$query_result = mysql_query(sprintf("SELECT * FROM V_ACCESS_DEVICE_AUTH_CODE WHERE AUTH_CODE = '%s'", mysql_real_escape_string($access_code)));
	if (!$query_result) {
		$action_result["status"] = "failed";
		$action_result["error-type"] = "ServerError";
		$action_result["error-message"] = "Invalid query: " . mysql_error();
			
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
	$action_result["error-type"] = "UnsupportedAuthType";
	
	exit();
}
	
if ($access_device_record)
{
	$access_device_id =			$access_device_record["ID"];
	$issue_datetime =			$access_device_record["ISSUE_DT"];
	$expiry_datetime =			$access_device_record["EXPIRY_DT"];
	$activation_datetime =		$access_device_record["ACTIVATION_DT"];
	$deactivation_datetime =	$access_device_record["DEACTIVATION_DT"];
	$activation_date =			$access_device_record["ACTIVATION_DATE"];
	
	if ($activation_date && $access_code != "55555555") # ERROR
	{
		$action_result["status"] = "failed";
		$action_result["error-type"] = "ExpiredAuthData";
	
		exit();
	}
	#else if ($expiry_date < getdate())
	#{
	#	// …
	#}
	
	$query_result = mysql_query(sprintf("SELECT * FROM ACCESS_GEAR_IDENTITY_TOKEN WHERE ACCESS_GEAR_ID = %s AND ACCESS_POINT = '%s'", $access_device_id,  mysql_real_escape_string($current_access_point)));
	if (!$query_result) {
		$action_result["status"] = "failed";
		$action_result["error-type"] = "ServerError";
		$action_result["error-message"] = "Invalid query: " . mysql_error();
			
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
		mysql_query(sprintf("INSERT ACCESS_GEAR_IDENTITY_TOKEN(IDENTITY_TOKEN, ACCESS_POINT, ACCESS_GEAR_ID) VALUE('%s', '%s', %s)", $identity_token, mysql_real_escape_string($current_access_point), $access_device_id));
	}
	
	$action_result["data"] = array("token" => $identity_token);
	$action_result["status"] = "ok";
}
else # ERROR
{
	$action_result["status"] = "failed";
	$action_result["error-type"] = "InvalidAuthData";
	
	exit();
}

?>

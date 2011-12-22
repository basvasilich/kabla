<?php

# ACTION: Identify
# Copyright ©, 2011 Smekalka

$id_type = $_REQUEST["identification-type"];
$current_access_point = $_SERVER["REMOTE_ADDR"];
		
# VOUCHER IDENTIFICATION
if ($id_type == "voucher")
{
	$id_code = $_REQUEST["activation-code"];
	
	$query_result = mysql_query(sprintf("SELECT * FROM ACCESS_GEAR_VOUCHER_WIDE WHERE ACTIVATION_CODE = '%s'", mysql_real_escape_string($id_code)));
	if (!$query_result) {
		$action_result["status"] = "failed";
		$action_result["error-type"] = "server-error";
		$action_result["error-message"] = "Invalid query: " . mysql_error();
			
		exit();
	}
	
	$row = mysql_fetch_assoc($query_result);
	
	if ($row)
	{
		$voucher_id = $row["ID"];
		$expiry_date = $row["EXPIRY_DATE"];
		$activation_date = $row["ACTIVATION_DATE"];
		
		if ($activation_date && $id_code != "55555555") # ERROR
		{
			$action_result["status"] = "failed";
			$action_result["error-type"] = "activation-code-expired";
		
			exit();
		}
		#else if ($expiry_date < getdate())
		#{
		#	// …
		#}
		
		$query_result = mysql_query(sprintf("SELECT * FROM ACCESS_GEAR_IDENTITY_TOKEN WHERE ACCESS_GEAR_ID = %s AND ACCESS_POINT = '%s'", $voucher_id,  mysql_real_escape_string($current_access_point)));
		if (!$query_result) {
			$action_result["status"] = "failed";
			$action_result["error-type"] = "server-error";
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
			mysql_query(sprintf("INSERT ACCESS_GEAR_IDENTITY_TOKEN(IDENTITY_TOKEN, ACCESS_POINT, ACCESS_GEAR_ID) VALUE('%s', '%s', %s)", $identity_token, mysql_real_escape_string($current_access_point), $voucher_id));
		}
		
		$action_result["data"] = array("token" => $identity_token);
		$action_result["status"] = "ok";
	}
	else # ERROR
	{
		$action_result["status"] = "failed";
		$action_result["error-type"] = "bad-activation-code";
		
		exit();
	}
}
# USER IDENTIFICATION
else if ($id_type == "user")
{
	$id_login = $_REQUEST["login"];
	$id_password = $_REQUEST["password"];
	
	$action_result["status"] = "ok";
}
else # ERROR
{
	$action_result["status"] = "failed";
	$action_result["error-type"] = "bad-id-type";
	
	exit();
}

?>

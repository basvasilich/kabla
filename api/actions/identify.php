<?php

# ACTION: Identify
# Copyright ©, 2011 Smekalka

$id_type = $_REQUEST["identification-type"];
		
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
		
		if ($activation_date) # ERROR
		{
			$action_result["status"] = "failed";
			$action_result["error-type"] = "activation-code-expired";
		
			exit();
		}
		#else if ($expiry_date < getdate())
		#{
		#	// …
		#}
		
		$query_result = mysql_query(sprintf("SELECT * FROM ACCESS_GEAR_IDENTITY_TOKEN WHERE ACCESS_GEAR_ID = %s", mysql_real_escape_string($voucher_id)));
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
			// TODO: Check expiration, etc...
		}
		else
		{
			$identity_token = uniqid();
			mysql_query(sprintf("INSERT ACCESS_GEAR_IDENTITY_TOKEN(IDENTITY_TOKEN, ACCESS_GEAR_ID) VALUE('%s', %s)", $identity_token, $voucher_id));
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

<?php

### ACTION: Identify ###

$id_type = $_REQUEST["identification-type"];
		
# VOUCHER
if ($id_type == "voucher")
{
	$id_code = $_REQUEST["activation-code"];
	
	if ($id_code == "777")
	{
		$identity_token = uniqid();
		
		$action_result["data"] = array("token" => $identity_token);
		$action_result["status"] = "ok";
	}
	else
	{
		$action_result["status"] = "failed";
		$action_result["error"] = "bad-activation-code";
	}
}
# USER
else if ($id_type == "user")
{
	$id_login = $_REQUEST["login"];
	$id_password = $_REQUEST["password"];
	
	$action_result["status"] = "ok";
}
else
{
	$action_result["status"] = "failed";
	$action_result["error"] = "bad-id-type";
}

?>
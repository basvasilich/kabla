<?php

# ACTION: getAccountInfo
# VERSION: 1
# DESCRIPTION: Provides account information
# COPYRIGHT: 2011-2012, Smekalka

$identity_token = $_REQUEST["token"];

# CHECK IDENTITY TOKEN

if (!$identity_token) # ERROR
{
	$action_result["status"] = "failed";
	$action_result["error-type"] = "security-error";
	$action_result["error-message"] = "Invalid identity token.";
	
	exit();
}

$query_result = mysql_query(sprintf("SELECT * FROM ACCESS_GEAR_IDENTITY_TOKEN WHERE IDENTITY_TOKEN = '%s'", mysql_real_escape_string($identity_token)));
if (!$query_result) {
	$action_result["status"] = "Failed";
	$action_result["error-type"] = "ServerError";
	$action_result["error-message"] = "Invalid query: " . mysql_error();
		
	exit();
}

$row = mysql_fetch_assoc($query_result);

if ($row)
{
	// TODO: Check expiration, etc...

	$access_gear_id = $row["ACCESS_GEAR_ID"];
	$identity_id = $row["IDENTITY_ID"];
}
else # ERROR
{
	$action_result["status"] = "Failed";
	$action_result["error-type"] = "SecurityError";
	$action_result["error-message"] = "Invalid identity token.";
	
	exit();
}

# RETRIEVE ACCOUNTS

$query_result = mysql_query(sprintf("SELECT * FROM V_IDENTITY_ACCOUNTS WHERE IDENTITY_ID = '%s'", $identity_id));
if (!$query_result) {
	$action_result["status"] = "Failed";
	$action_result["error-type"] = "ServerError";
	$action_result["error-message"] = "Invalid query: " . mysql_error();
		
	exit();
}

if (mysql_num_rows($query_result) == 0)  # ERROR
{
	$action_result["status"] = "Failed";
	$action_result["error-type"] = "NoAccountAvailable";
	$action_result["error-message"] = "No account available.";
	
	exit();
}

$data_set = array();

while ($row = mysql_fetch_assoc($query_result))
{
	$data_item = array(
    	"uid" => $row["RECORD_UID"],
    	"type" => $row["TYPE_NAME"],
    	"currency" => $row["CURRENCY_ALPHA_CD"],
		"balance" => number_format($row["BALANCE"], 0, '.', ''),
		"openToBuy" => number_format($row["OPEN_TO_BUY"], 0, '.', '')
    );
    array_push($data_set, $data_item);
}

$action_result["data"] = $data_set;
$action_result["status"] = "ok";

?>

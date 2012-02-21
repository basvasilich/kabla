<?php

# ACTION: getAccountInfo
# VERSION: 2
# DESCRIPTION: Provides account information
# COPYRIGHT: 2011-2012, Smekalka

$identity = new Identity($_REQUEST["token"]);

# RETRIEVE ACCOUNTS

$query_result = mysql_query(sprintf("SELECT * FROM V_IDENTITY_ACCOUNTS WHERE IDENTITY_ID = '%s'", $identity->id));
if (!$query_result) {
	$action_result["status"] = "Failed";
	$action_result["errorType"] = "ServerException";
	$action_result["errorMessage"] = "Invalid query: " . mysql_error();
		
	exit();
}

if (mysql_num_rows($query_result) == 0)  # ERROR
{
	$action_result["status"] = "Failed";
	$action_result["errorType"] = "NoAccountAvailable";
	$action_result["errorMessage"] = "No account available.";
	
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

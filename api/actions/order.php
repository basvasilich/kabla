<?php

# ACTION: Order
# Copyright ©, 2011 Smekalka

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
	$action_result["status"] = "failed";
	$action_result["error-type"] = "server-error";
	$action_result["error-message"] = "Invalid query: " . mysql_error();
		
	exit();
}

$row = mysql_fetch_assoc($query_result);

if ($row)
{
	// TODO: Check expiration, etc...

	$access_gear_id = $row["ACCESS_GEAR_ID"];
}
else # ERROR
{
	$action_result["status"] = "failed";
	$action_result["error-type"] = "security-error";
	$action_result["error-message"] = "Invalid identity token.";
	
	exit();
}

# MAKE ORDER

$selected_product = $_REQUEST["gift"];
$contact_name = $_REQUEST["name"];
$contact_phone_code = $_REQUEST["mobileCode]"];
$contact_phone_number = $_REQUEST["mobileNumber"];
$contact_email = $_REQUEST["email"];
$contact_city = $_REQUEST["city"];
$contact_address = $_REQUEST["address"];



$action_result["data"] = array("order-number" => 12345);
$action_result["status"] = "ok";

?>

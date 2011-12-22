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
$contact_phone_code = $_REQUEST["mobileCode"];
$contact_phone_number = $_REQUEST["mobileNumber"];
$contact_email = $_REQUEST["email"];
$contact_city = $_REQUEST["city"];
$contact_address = $_REQUEST["address"];

mysql_query("SET AUTOCOMMIT=0");
mysql_query("START TRANSACTION");

$query_result = mysql_query(sprintf(
	"INSERT PURCHASE_ORDER(ACCESS_GEAR_ID, IDENTITY_TOKEN, CONTACT_NAME, CONTACT_PHONE_CODE, CONTACT_PHONE_NUMBER, CONTACT_EMAIL, CONTACT_CITY, CONTACT_ADDRESS) VALUE('%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s')",
	mysql_real_escape_string($access_gear_id),
	mysql_real_escape_string($identity_token),
	mysql_real_escape_string($contact_name),
	mysql_real_escape_string($contact_phone_code),
	mysql_real_escape_string($contact_phone_number),
	mysql_real_escape_string($contact_email),
	mysql_real_escape_string($contact_city),
	mysql_real_escape_string($contact_address)
));

if (!$query_result) # ERROR
{
	$action_result["status"] = "failed";
	$action_result["error-type"] = "server-error";
	$action_result["error-message"] = "Invalid query: " . mysql_error();
	
	mysql_query("ROLLBACK");
	exit();
}

$order_id = mysql_insert_id();

$query_result = mysql_query(sprintf("INSERT PURCHASE_ORDER_PRODUCTS(ORDER_ID, PRODUCT_ID) VALUE('%s', '%s')", $order_id, mysql_real_escape_string($selected_product)));

if (!$query_result) # ERROR
{
	$action_result["status"] = "failed";
	$action_result["error-type"] = "server-error";
	$action_result["error-message"] = "Invalid query: " . mysql_error();
	
	mysql_query("ROLLBACK");
	exit();
}

$query_result = mysql_query(sprintf("UPDATE ACCESS_GEAR_VOUCHER SET ACTIVATION_DATE = '%s' WHERE ID = %s", gmdate("Y-m-d\TH:i:s\Z"), $access_gear_id));

if (!$query_result) # ERROR
{
	$action_result["status"] = "failed";
	$action_result["error-type"] = "server-error";
	$action_result["error-message"] = "Invalid query: " . mysql_error();
	
	mysql_query("ROLLBACK");
	exit();
}

mysql_query("COMMIT");

$action_result["data"] = array("order-number" => $order_id);
$action_result["status"] = "ok";

?>

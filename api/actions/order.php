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

# GET PARAMS

$selected_product = $_REQUEST["gift"];
$contact_name = $_REQUEST["contact_name"];					if (empty($contact_name)) $contact_name = $_REQUEST["name"]; 
$contact_phone_code = $_REQUEST["contact_phone_code"];		if (empty($contact_phone_code)) $contact_phone_code = $_REQUEST["mobileCode"];
$contact_phone_number = $_REQUEST["contact_phone_number"];	if (empty($contact_phone_number)) $contact_phone_number = $_REQUEST["mobileNumber"];
$contact_email = $_REQUEST['contact_email'];				if (empty($contact_email)) $contact_email = $_REQUEST["email"];
$contact_city = $_REQUEST["city"];
$contact_address = $_REQUEST["address"];
$delivery_point_country = $_REQUEST["deliveryPoint_country"];
$delivery_point_postcode = $_REQUEST["deliveryPoint_postcode"];
$delivery_point_region = $_REQUEST["deliveryPoint_region"];
$delivery_point_place = $_REQUEST["deliveryPoint_place"];
$delivery_point_location = $_REQUEST["deliveryPoint_location"];
$delivery_comment = $_REQUEST["deliveryComment"];
$comment = $_REQUEST["comment"];

# CHECK PRODUCT

$query_result = mysql_query(sprintf("SELECT * FROM PRODUCT_GIFT_CARD_WIDE WHERE ID = '%s'", mysql_real_escape_string($selected_product)));
if (!$query_result) {
	$action_result["status"] = "failed";
	$action_result["error-type"] = "server-error";
	$action_result["error-message"] = "Invalid query: " . mysql_error();
		
	exit();
}

$row = mysql_fetch_assoc($query_result);

if ($row)
{
	// TODO: Check availability, etc...

	$selected_product_name = $row["NAME"];
}
else # ERROR
{
	$action_result["status"] = "failed";
	$action_result["error-type"] = "security-error";
	$action_result["error-message"] = "Invalid product id.";
	
	exit();
}

# MAKE ORDER

mysql_query("SET AUTOCOMMIT=0");
mysql_query("START TRANSACTION");

$query_result = mysql_query(sprintf(
	"INSERT PURCHASE_ORDER(
		`ACCESS_GEAR_ID`,
		`IDENTITY_TOKEN`,
		`CONTACT_NAME`,
		`CONTACT_PHONE_CODE`,
		`CONTACT_PHONE_NUMBER`,
		`CONTACT_EMAIL`,
		`CONTACT_CITY`,
		`CONTACT_ADDRESS`,
		`COMMENT`,
		`DELIVERY_POINT_COUNTRY`,
		`DELIVERY_POINT_POSTCODE`,
		`DELIVERY_POINT_REGION`,
		`DELIVERY_POINT_PLACE`,
		`DELIVERY_POINT_LOCATION`,
		`DELIVERY_COMMENT`
		) VALUE('%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s')",
	mysql_real_escape_string($access_gear_id),
	mysql_real_escape_string($identity_token),
	mysql_real_escape_string($contact_name),
	mysql_real_escape_string($contact_phone_code),
	mysql_real_escape_string($contact_phone_number),
	mysql_real_escape_string($contact_email),
	mysql_real_escape_string($contact_city),
	mysql_real_escape_string($contact_address),
	mysql_real_escape_string($comment),
	mysql_real_escape_string($delivery_point_country),
	mysql_real_escape_string($delivery_point_postcode),
	mysql_real_escape_string($delivery_point_region),
	mysql_real_escape_string($delivery_point_place),
	mysql_real_escape_string($delivery_point_location),
	mysql_real_escape_string($delivery_comment)
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

$delivery_address = $contact_address;
if (empty($delivery_address) && isset($delivery_point_place, $delivery_point_location))
{
	if (!empty($delivery_point_postcode)) $delivery_address .= $delivery_point_postcode;
	if (!empty($delivery_point_region)) $delivery_address .= ", " . $delivery_point_region;
	if (!empty($delivery_point_place)) $delivery_address .= ", " . $delivery_point_place;
	if (!empty($delivery_point_location)) $delivery_address .= ", " . $delivery_point_location;
}
else
{
	if (!isset($delivery_address)) $delivery_address = $contact_email;
}

$from_name = "Boomcard";
$from_address = "info@boomcard.ru";
$to_name = $contact_name;
$to_address = $contact_email;
$subject = "Карт Бланш - Ваш заказ №${order_id}";
$body = "<h2>${contact_name}, поздравляем Вас с удачным выбором!</h2>\n
<p>Вы заказали карту &laquo;${selected_product_name}&raquo; номиналом 3000 рублей.</p>\n
<p>Номер вашего заказа &#151; <b>${order_id}</b>.</p>\n
<p>Заказ будет доставлен по адресу: ${delivery_address}</p>\n
<p>Доставка подарочных карт будет осуществляться с 1 февраля 2012 года.\n
Срок доставки может составлять до 2 недель.</p>\n\n
<p>Искренне ваш,<br/><b>Карт Бланш</b></p>";

require_once("Mail.php");

$headers = array(
	'From' => mb_encode_mimeheader($from_name, "UTF-8", "B") . " <${from_address}>",
	'To' =>  mb_encode_mimeheader($to_name, "UTF-8", "B") . " <${to_address}>",
	'Subject' => mb_encode_mimeheader($subject, "UTF-8", "B"),
	'Reply-To' => $from_address,
	'Return-Path' => $from_address,
	'Content-Type' => "text/html; charset=UTF-8",
	'MIME-Version' => "1.0"
	);

$smtp = Mail::factory("smtp",
	array(
	   	'host' => $config["smtp.host"],
	   	'port' => $config["smtp.port"],
	    'auth' => true,
	    'username' => $config["smtp.username"],
	    'password' => $config["smtp.password"])
	);

$mail = $smtp->send($to_address, $headers, $body);

if (PEAR::isError($mail)) # ERROR
{
	$action_result["status"] = "failed";
	$action_result["error-type"] = "server-error";
	$action_result["error-message"] = $mail->getMessage();

	exit();
}

$action_result["data"] = array("order-number" => $order_id);
$action_result["status"] = "ok";

?>

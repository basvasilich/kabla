<?php

# ACTION DISPATCHER
# Copyright ©, 2011 Smekalka

mb_internal_encoding("UTF-8");
error_reporting(E_ERROR | E_PARSE);

$config = array();
include_once("./config/db.conf.php");
include_once("./config/smtp.conf.php");

$action_name = $_REQUEST["action"];

$action_result = array(
	"action" => $action_name,
	"timestamp" => "",
	"status" => "unknown"
);

$db_connect = null;

function shutdown_function()
{
	global $action_result, $db_connect;
	
	$action_result["timestamp"] = gmdate("Y-m-d\TH:i:s\Z");
	echo json_encode($action_result);
	
	if ($db_connect) mysql_close($db_connect);
}

register_shutdown_function(shutdown_function);

$allowed_methods = array("GET", "POST");

header("Cache-Control: no-cache, must-revalidate");
//header("Expires: Mon, 26 Jul 1997 05:00:00 GMT");
header("Expires: -1");
header("Content-type: application/json");
header("Content-Transfer-Encoding: binary");
//header("Encoding: utf-8");

if (!in_array($_SERVER["REQUEST_METHOD"], $allowed_methods)) # ERROR
{
	$action_result["status"] = "failed";
	$action_result["error-type"] = "deprecated-invocation-method";
	
	exit();
}

if (!$action_name) # ERROR
{
	$action_result["status"] = "failed";
	$action_result["error-type"] = "no-action-name-specified";

	exit();
}

$action_file = "./actions/${action_name}.php";

if (!file_exists($action_file)) # ERROR
{
	$action_result["status"] = "failed";
	$action_result["error-type"] = "invalid-action-name";

	exit();
}

$db_connect = mysql_connect($db_host, $db_user, $db_password);
if (!$db_connect) # ERROR
{
	$action_result["status"] = "failed";
	$action_result["error-type"] = "server-error";
	$action_result["error-message"] = "Could not connect: " . mysql_error();
	
	exit();
}

mysql_select_db($db_database, $db_connect);
mysql_set_charset($db_charset, $db_connect); 

include($action_file);

?>

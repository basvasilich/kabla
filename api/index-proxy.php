<?php

# ACTION DISPATCHER
# Copyright ©, 2011 Smekalka

error_reporting(E_ERROR | E_PARSE);

$action_server_url = "http://da.boomcard.smekalka.net/api/";

$action_name = $_REQUEST["action"];

$action_result = array(
	"action" => $action_name,
	"timestamp" => "",
	"status" => "unknown"
);

function shutdown_function()
{
	global $action_result;
	
	$action_result["timestamp"] = gmdate("Y-m-d\TH:i:s\Z");
	echo json_encode($action_result);
}

register_shutdown_function(shutdown_function);

$allowed_methods = array("GET", "POST");

header("Cache-Control: no-cache, must-revalidate");
//header("Expires: Mon, 26 Jul 1997 05:00:00 GMT");
header("Expires: -1");
header("Content-type: application/json");
header("Content-Transfer-Encoding: binary");
//header("Encoding: utf-8");

#error_reporting(E_ALL);

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

# ACTION SERVER REQUEST

foreach ($_REQUEST as $param => &$value)
{
	if (is_array($value)) $value = implode(',', $value);
	$post_params[] = $param.'='.urlencode($value);
}

$post_string = implode('&', $post_params);

$url_parts = parse_url($action_server_url);
$request_path = $url_parts['path'];
if (isset($url_parts['query'])) $request_path.= "?".$url_parts['query'];

$request = "POST ".$request_path." HTTP/1.1\r\n";
$request.= "Host: ".$url_parts['host']."\r\n";
$request.= "Content-Type: application/x-www-form-urlencoded\r\n";
$request.= "Content-Length: ".strlen($post_string)."\r\n";
$request.= "Connection: Close\r\n\r\n";

if (isset($post_string)) $request.= $post_string;

$fp = fsockopen($url_parts['host'], isset($url_parts['port'])?$url_parts['port']:80, $error_code, $error_string, 30);

if (!$fp) # ERROR
{
	$action_result["status"] = "failed";
	$action_result["error-type"] = "server-error";
	$action_result["error-message"] = $error_string;

	exit();
}

if (!fwrite($fp, $request)) # ERROR
{
	$action_result["status"] = "failed";
	$action_result["error-type"] = "server-error";
	#$action_result["error-message"] = error_get_last()["message"];

	exit();
}

$response = "";
while (!feof($fp)) { $response .= fread($fp, 1024); }
fclose($fp);

$response_body = substr($response, strpos($response, "\r\n\r\n") + 4);

if (is_numeric(substr($response_body, 0, 1))) { $response_body = substr(substr($response_body, 4), 0, -7); }
#$response_body = substr(substr($response_body, 4), 0, -7);

$remote_action_result = json_decode($response_body, true);

if ($remote_action_result)
{
	$action_result = $remote_action_result;
}
else
{
	$action_result["status"] = "failed";
	$action_result["error-type"] = "server-error";
	$action_result["error-message"] = "Can't parse remote result.";

	exit();
}

?>

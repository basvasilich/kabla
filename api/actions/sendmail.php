<?php

# ACTION: Order
# Copyright ©, 2011 Smekalka

$identity_token = $_REQUEST["token"];

# CHECK IDENTITY TOKEN

/*
if (!$identity_token) # ERROR
{
	$action_result["status"] = "failed";
	$action_result["error-type"] = "security-error";
	$action_result["error-message"] = "Invalid identity token.";
	
	exit();
}
*/

// TODO: True verification of identity token...

require_once("Mail.php");

$from = $_REQUEST["from"];
$to = $_REQUEST["to"];
$subject = $_REQUEST["subject"];
$body = $_REQUEST["body"];

$headers = array('From' => $from, 'To' => $to, 'Subject' => $subject);

$smtp = Mail::factory("smtp",
	array(
	   	'host' => $config["smtp.host"],
	   	'port' => $config["smtp.port"],
	    'auth' => true,
	    'username' => $config["smtp.username"],
	    'password' => $config["smtp.password"])
	);

$mail = $smtp->send($to, $headers, $body);

if (PEAR::isError($mail)) # ERROR
{
	$action_result["status"] = "failed";
	$action_result["error-type"] = "server-error";
	$action_result["error-message"] = $mail->getMessage();

	exit();
}

$action_result["status"] = "ok";

?>

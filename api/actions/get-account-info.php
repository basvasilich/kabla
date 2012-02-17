<?php

# ACTION: get-account-info
# VERSION: 1
# DESCRIPTION: Provides account information
# COPYRIGHT: 2011-2012, Smekalka

$account_info = array(
		"id" => "12345",
		"currency" => "RUB",
		"balance" => 15000,
		"openToBuy" => 14999.55
	);

$action_result["data"] = $account_info;
$action_result["status"] = "ok";

?>

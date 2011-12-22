<?php

# ACTION: Get Products
# Copyright ©, 2011 Smekalka

$query_result = mysql_query('SELECT * FROM PRODUCT_GIFT_CARD_WIDE');
if (!$query_result) {
	$action_result["status"] = "failed";
	$action_result["error-type"] = "server-error";
	$action_result["error-message"] = "Invalid query: " . mysql_error();
		
	exit();
}

$data_set = array();

while ($row = mysql_fetch_assoc($query_result)) {
    $data_item = array(
    	"id" => $row["ID"],
    	"uid" => $row["RECORD_UID"],
    	"name" => $row["NAME"],
    	"description" => $row["DESCRIPTION"]
    );
    array_push($data_set, $data_item);
}

$action_result["data"] = $data_set;
$action_result["status"] = "ok";

?>
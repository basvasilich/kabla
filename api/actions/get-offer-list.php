<?php

# ACTION: get-offer-list
# VERSION: 1
# DESCRIPTION: Provides personalized offer list for the specified customer
# COPYRIGHT: 2011-2012, Smekalka

$data_set = array();

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
    	"uid" => $row["RECORD_UID"],
    	"type" => "card",
    	"name" => $row["NAME"],
    	"description" => $row["DESCRIPTION"]
    );
    array_push($data_set, $data_item);
}

/*

$data_item = array(
	"id" => 1,
	"title" => "М.Видео",
	"description" => ""
);

$data_item = array(
	"id" => 2,
	"title" => "Эльдорадо",
	"description" => "Компания «Эльдорадо» — крупнейшая сеть магазинов электроники и бытовой техники в России и ближнем зарубежье. Сегодня под брендом «Эльдорадо» работают 700 магазинов. «Эльдорадо» напрямую работает с Bosch, Philips, Samsung, Sony, Panasonic, LG, HP, Nokia и другими ведущими брендами, обеспечивая низкие ценыи высокое качество."
);
*/

$action_result["data"] = $data_set;
$action_result["status"] = "ok";

?>

<?

# ACTION: getOrderInfo
# VERSION: 1
# DESCRIPTION: Provides account information
# COPYRIGHT: 2011-2012, Smekalka

$identity = new Identity($_REQUEST["token"]);

$data_set = array();

$data_item = array(
    	"uid" => "12345",
    	"name" => $row["NAME"],
    	"description" => $row["DESCRIPTION"]
    );


array_push($data_set, $data_item);


$action_result["data"] = $data_set;
$action_result["status"] = "ok";

?>

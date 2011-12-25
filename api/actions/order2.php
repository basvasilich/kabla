<?php

$contact_name = "Михаил Соколов";
$contact_email = "mikhail.sokolov@smekalka.ru";
$order_id = 123;

$params["action"] = "sendmail";
$params["token"] = "$$$$$";
$params["from"] = "Boomcard <info@boomcard.ru>";
$params["to"] = "${contact_name} <${contact_email}>";
$params["subject"] = "Ваш заказ Карт Бланш №${order_id}";
$params["body"] = "${contact_name}, поздравляем Вас с удачным выбором!\n
Заказ №${order_id}\n
Вы заказали карту ... номиналом 3000 рублей.\n
Доставка подарочный карты будет осуществляться с 1 февраля 2012 года.\n
Срок доставки до 2 недель.\n\n
Искренне ваш,
Карт Бланш";


function http_post_async($url, $params)
{
	foreach ($params as $key => &$val)
	{
		if (is_array($val)) $val = implode(',', $val);
		$post_params[] = $key.'='.urlencode($val);
	}

	$post_string = implode('&', $post_params);

	$parts = parse_url($url);
	$path = $parts['path'];
	if (isset($parts['query'])) $path.= "?".$parts['query'];

	$out = "POST ".$path." HTTP/1.1\r\n";
	$out.= "Host: ".$parts['host']."\r\n";
	$out.= "Content-Type: application/x-www-form-urlencoded\r\n";
	$out.= "Content-Length: ".strlen($post_string)."\r\n";
	$out.= "Connection: Close\r\n\r\n";
	
	if (isset($post_string)) $out.= $post_string;

	echo $out;

	$fp = fsockopen($parts['host'], isset($parts['port'])?$parts['port']:80, $errno, $errstr, 30);
	fwrite($fp, $out);
	fclose($fp);
}

http_post_async("http://da.boomcard.smekalka.net/api/", $params);

#$response = http_post_fields("http://da.boomcard.smekalka.net/api/?action=sendmail", $params);

#echo $response;

/*
require_once("HttpRequest");

$r = new HttpRequest("http://da.boomcard.smekalka.net/api/?action=sendmail", HttpRequest::METH_POST);
$r->addPostFields($params);
try {
    echo $r->send()->getBody();
} catch (HttpException $ex) {
    echo $ex;
}
*/

$action_result["status"] = "ok";
#$action_result["data"] = $params;

?>

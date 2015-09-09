<?php
if (is_ajax()){
	if (isset($_POST['width']) && isset($_POST['height']) && isset($_POST['count'])){
		echo 'Hello!';
	}
}

function is_ajax (){
	return isset($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest';
}
<?php
if (is_ajax()){
	if (isset($_POST['formats'])){
	
	$return = var_dump(json_decode($_POST['formats']));
	
		echo $return;
	}
}

function is_ajax (){
	return isset($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest';
}

class Format_placement {
	
	public  $placement_arr = array();
	private $format_data;
	private $format_num;
	
	public function __construct ($media_sizes, $format_sizes){
		$this->format_data = array(
			'medias'=>$media_sizes,
			'formats'=>$format_sizes,
		);
	}
	
	public function get_optimal_placement(){
		echo var_dump($this->placement_arr);
	}
	
	public function sorting_media (){
		$medias = $this->format_data['medias'];
		$medias_count = count($medias);
		$fn = $this->format_num = 0;
		//$formats = $this->format_data['formats'];
		//$formats_count = count($formats);
		
		for($i = 0; $i < $medias_count; $i++){
			$this->place_format($medias[$i], $formats[$fn]);
		}
	}
	
	private function place_format($media_width, $format){
		$w_obj = new Place_params ($format['width'], $format['height'], $format['count'], $media_width);
		$h_obj = new Place_params ($format['height'], $format['width'], $format['count'], $media_width);
		
	//	$this->check_fit_data($w_obj);
	//	$this->check_fit_data($h_obj);
	}
	
	private function check_fit_data ($wh_obj){
		if($wh_obj->media_capacity != 0 ){
			if ($wh_obj->rest_count != 0){
				$this->place_format($wh_obj->media_width, $wh_obj->format);
			}
			$this->set_fit_data($wh_obj);
			//$wh_obj = array('mediaSquareRest' => -1);
		}
		/*else {
			set bigger media width on the same media if exists
		}*/
	}
/*	
	private function set_fit_data ($wh_obj){
		
	}
	*/
}


/**
Place_params - constructor, that contains relations between the current media width and current file size.
It is used for creating wObj and hObj, to fit copies on the media
 **/
class Place_params {
    public function __construct ($image_width, $image_height, $count, $media_width){
		$this->format = array(
							'width' => $image_width,
							'height' => $image_height,
							'count' => $count
							);
        $this->media_width = $media_width;
        $this->media_coef = $this->get_media_coef();
        $this->media_capacity = floor($this->media_coef);
        if ($this->media_capacity != 0) {
            $this->rest_count = $this->get_rest_count();
            $this->complete_lined_count = $this->format['count'] - $this->rest_count;
			$this->media_width_rest = get_media_width_rest();
        };
    }
	
	private function get_media_coef(){
		return $this->media_width / $this->format['width'];
	}
	
	private function get_rest_count(){
		if ($this->format['count'] < $this->media_capacity){
			return 0;
		}
		return $this->format['count'] % $this->media_capacity;
	}
	
	private function get_media_width_rest(){
		if($this->format['count'] === $this->rest_count || $this->rest_count === 0){
			$count = $this->rest_count;
			if($this->rest_count === 0){
				$count = $this->media_capacity;
			};
			$this->media_width_rest = $this->media_width - $count * $this->format['width'];
		}
	}
}
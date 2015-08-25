<?php
/**
 * Created by PhpStorm.
 * User: Boooober
 * Date: 24.08.2015
 * Time: 21:04
 */

$formats = array( 0 => array('width'=>63,'height'=>42,'printCount'=>5) );
$medias = array (127, 152, 160);
$formatPlacement = new formatPlacement ($medias, $formats);
$formatPlacement->pickingMedia();


class formatPlacement {

    public $formatData;

    public function __construct ($mediaSizes, $formatSizes){
        $this->formatData = array(
            'medias'=>$mediaSizes,
            'formats'=>$formatSizes,
        );
    }

    public function pickingMedia (){
        $medias = $this->formatData['medias'];
        $formats = $this->formatData['formats'];
        $mediasCount = count($medias);
        $optimalMediaData = new OptimalMediaData();


        for ($i = 0; $i < $mediasCount; $i++ ){
            $optObj = $this->getOptObj($medias[$i], $formats[0]);
            if( $optimalMediaData->checkValue($optObj->mediaSquareRest) == 1 ){
                $optimalMediaData->setData($optObj);
            }
        }
        print_r($optimalMediaData->fitObj);
        return $optimalMediaData;
    }

    private function getOptObj($mediaWidth, $format){

        $wObj = new SetObjParams($format['width'], $format['height'], $format['printCount'], $mediaWidth);
        $hObj = new SetObjParams($format['height'], $format['width'], $format['printCount'], $mediaWidth);



        $wFit = $this->checkAndGetFitData($wObj);
        $hFit = $this->checkAndGetFitData($hObj);

        $optObj = $this->getObjByOptimalSquare($wFit, $hFit);

        return $optObj;
    }

    private function checkAndGetFitData ($whObj){
        if($whObj->mediaCapacity != 0 ){
            $fitObj = $this->getFitDataObj($whObj);
        } else {
            $fitObj = array('mediaSquareRest' => -1);
        }
        return $fitObj;
    }

    private function getFitDataObj ($whObj){
        $recParams = array('width' => $whObj->width, 'height' => $whObj->height, 'printCount' => $whObj->restCount);
        $fitData = new FitDataObj($whObj);

        if ($recParams['printCount'] === 0) {
            $storeObj = new StoreObj($whObj);
        } else {
            $storeObj = $this->getOptObj($whObj->mediaWidth, $recParams);
        };

        $dataObj = $storeObj->updateStoreObj($fitData, $storeObj);
        return $dataObj;
    }

    private function getObjByOptimalSquare ($obj1, $obj2){
        if ($obj1->mediaSquareRest !=-1 && $obj2->mediaSquareRest !=-1){
            if($obj1->mediaSquareRest <= $obj2->mediaSquareRest){
                return $obj1;
            }else{
                return $obj2;
            }
        };
        if ($obj1->mediaSquareRest ===-1 && $obj2->mediaSquareRest !=-1 ){
            return $obj2;
        };
        if ($obj2->mediaSquareRest ===-1 && $obj1->mediaSquareRest !=-1 ){
            return $obj1;
        };
        if ($obj1->mediaSquareRest ===-1 && $obj2->mediaSquareRest ===-1 ){
            return $obj1;
        };
    }
};
/**
SetObjParams - constructor, that contains relations between the current media width and current file size.
It is used for creating wObj and hObj, to fit copies on the media
 **/
class SetObjParams {
    public function __construct ($width, $height, $printCount, $mediaWidth){
        $this->width = $width;
        $this->height = $height;
        $this->mediaWidth = $mediaWidth;
        $this->mediaCoef = $this->mediaWidth / $this->width;
        $this->mediaCapacity = floor($this->mediaCoef);
        $this->totalCount = $printCount;
        if ($this->mediaCapacity != 0) {
            $this->restCount = $this->totalCount % $this->mediaCapacity;
            if($this->totalCount === $this->restCount || $this->restCount === 0){
                if($this->restCount === 0){
                    $this->restCount = $this->mediaCapacity;
                }
                $this->mediaWidthRest = $this->mediaWidth - $this->restCount * $this->width;
                $this->restCount = 0;
            };
            $this->completeLinedCount = $this->totalCount - $this->restCount;
        };
    }
}
/**
FitDataObj - Retrieves necessary data with additional information about placement.
Create useful structure for comparison and fit visualization.
 **/
class FitDataObj {

    public function __construct ($whObj){
        $this->mediaSquareRest = $this->getSquareRest($whObj);
        $this->arr = array(
            0 => array( 'width'=>$whObj->width,
                'height'=>$whObj->height,
                'count'=>$whObj->completeLinedCount,
            )
        );

        if( $whObj->mediaCoef == $whObj->mediaCapacity ){
            $this->arr[0]['edgeToEdge'] = 'true';
        };
    }

    private function getSquareRest ($whObj){
        $length = $this->calcPrintLength($whObj);
        $printSquare = $whObj->width * $whObj->height * $whObj->completeLinedCount;
        $mediaSquare = $whObj->mediaWidth * $length;
        return $mediaSquare - $printSquare;
    }

    private function calcPrintLength ($whObj){
        $lines = $this->calcCountOfLines($whObj->completeLinedCount, $whObj->mediaCapacity);
        return $lines * $whObj->height;
    }

    private function calcCountOfLines($copies, $mediaCapacity){
        return ceil($copies/$mediaCapacity);
    }
}

/**
OptimalMediaData - constructor, which value stores the most optimal variant of the squareRest.
Instance contains the most optimal variant of file fitting thought all media widths.
 **/
class OptimalMediaData {

    private $value = 0;
    public function checkValue ($currentValue){
        if ($this->value == 0 || $currentValue != -1 && $currentValue < $this->value){
            return true;
        }
        return false;
    }
    public function setData ($optObj){
        $this->fitObj = $optObj;
        $this->value = $optObj->mediaSquareRest;
    }
}

/**
StoreObj returns compound object that contains concatenated optimal placement variants from FitDataObj.
Contains the result returned by recursion.
 **/
class StoreObj {
    public function __construct($whObj){
        $this->mediaWidth = $whObj->mediaWidth;
        $this->mediaWidthRest = $whObj->mediaWidthRest;
        $this->mediaSquareRest = 0;
        $this->arr = array();
        if($this->checkAdditionalCopies($whObj)){
            $this->additionalCopies = $this->setAdditionalCopies($whObj);
        }
    }

    private function checkAdditionalCopies ($whObj){
        if($whObj->mediaCapacity > $whObj->completeLinedCount){
            return true;
        };
        return false;
    }

    private function setAdditionalCopies ($whObj){
        return $whObj->mediaCapacity - $whObj->completeLinedCount;
    }

    public function updateStoreObj ($data, $storeObj){
        $storeObj->mediaSquareRest += $data->mediaSquareRest;
        array_push($storeObj->arr, $data->arr);
        return $storeObj;
    }
}
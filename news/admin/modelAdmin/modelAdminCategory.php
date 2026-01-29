<?php
class modelAdminCategory{

    // List
    public static function getCategoryList(){
        $sql = "SELECT * FROM category ORDER BY category.name ASC";
        $db = new Database();
        //$rows = massiv dann6h
        $rows = $db->getAll($sql);
        //
        return $rows;
    }
} //class
?>
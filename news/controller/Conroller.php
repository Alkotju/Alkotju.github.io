<?php 
class Controller {
    public static function StartSite(){
        $arr = News::getLast10News();
        include_once 'view/start.php';
    }

    public static function AllCaregory(){
        $arr = Category::getAllCategory();
        include_once 'view/category.php';
    }

    public static function AllNews(){
        $arr = News::getAllNews();
        include_once 'view/allnews.php';
    }

    public static function NewsByCatID($id){
        $arr = News::getNewsByCategoryID($id);
        include_once 'view/catnews.php';
    }

    public static function NewsByID($id){
        $arr = News::getNewsByID($id);
        include_once 'view/readnews.php';
    }
    public static function error404(){
        include_once 'view/error404.php';
    }

    public static function InsertConmment($c, $id) {
        Comments::InsertComment($c, $id);
        //self::NEwsByID($id);
        header ('Location:news?id='.$id.'#ctable');
    }


    //список комментариев
    public static function Comments ($newsid){
        $arr = Comments::getCommentByNewsID($newsid);
        ViewComments::getCommentsByNews($arr);
    }

    //количество комментариев к новости
    public static function CommentsCount($newsid){
        $arr = Comments::getCommentsCountByNewsID($newsid);
        ViewComments::CommentsCount($arr);
    }

    // ссылка - переход к списку комментариев
    public static function CommentsCountWithAncor($newsid){
        $arr = Comments::getCommentsCountByNewsID($newsid);
        ViewComments::CommentsCountWithAncor($arr);
    }

    //Регистрация
    public function registerForm(){
        include_once('view/formRegister.php');
    }
    public function registerUser(){
        $result = Register::registerUser();
        include_once('view/answerRegister.php');
    }
} // end class
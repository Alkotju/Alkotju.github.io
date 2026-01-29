<!DOCTYPE html>
<html>
    <head>
        <title> NEWSPORTAL</title>
        <link rel="stylesheet" href="">
        <link rel="stylesheet" type="text/css" href="style.css">
        <link href="">
        <meta charset="utf-8">
    </head>
    <body>


        <nav class="one">
            <ul class="topmenu">
                <li> <a href="#">Kategooriad<i class="fa fa-angle-down"></i></a>
            <ul class="submenu">
                <?php
                Controller::AllCategory();
                ?>
            </ul></li>
            <li><a href="testError">Info</a></li>
            <li><a href="./">Stardileht</a></li>
            <li><a href="registerForm">Register</a></li>
            </ul>
        </nav>

        <section>
            <div class="divBox">
                <?php
                if (isset($connect)){
                    echo $connect;
                } else {
                    echo '<h1> connect is gone!</h1>';
                }
                ?>
            </div>
        </section>

    <hr>
    <p style="display:block; text-align:center;">JKTV24 2025a. &copy;</p>
    </body>
</html>
<?php
if (isset($_SESSION['userId'])) {
    header('Location: login');
}
?>
<!DOCTYPE html>
<html>
    <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, intial-scale=1">
    <title>Admin dashboard</title>
    <link href="public/css/bootstrap.min.css" rel = "stylesheet">
    <link href="public/css/login.css" rel = "stylesheet">
    </head>
    <body>
        <div class="container">
            <form class="form-signin" action="login" method="POST">
                <h3 class="form-signin-heading">Введите ваши данные</h3>
                <input type="text" name="email" class="form-controll" 
                placeholder="Email" autofocus> <!--required-->
                <input type="text" name="password" class="form-controll" 
                placeholder="Пароль" autofocus> <!--required-->
                <button class="btn btn-lg btn-primary btn-block" type="submit" name="btnLogin">Войти</button>

                <p style="padding-top:10px;">
                    <?php
                    if (isset($_SESSION['errorString'])){
                        echo $_SESSION['errorString'];
                        unset ($_SESSION['errorString']);
                    }
                    ?>
                </p>
                <p style="padding-top:10px;"><a href="../">Web site</a></p>
            </form>
        </div> <!-- /container-->
    </body>
</html>
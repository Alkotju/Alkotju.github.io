<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <title>Register User</title>
        <link href="public/css/bootstrap.min.css" rel="stylesheet">
        <link href="public/css/login.css" rel="stylesheet">
    </head>
    <body>
        <div class="container">
            <div class="row">
                <div class="col-md-8 col-md-offset-2">
                    <div class="panel panel-default">
                        <div class="panel-heading"><h3>Register</h3></div>
                        <div class="panel-body">
                            <form class="form-horizontal" role="form" method="POST" action="registerAnswer">
                                <div class="form-group">
                                    <label for="name" class="col-md-4 controll-label">Name</label>
                                    <div class="col-md-6">
                                        <input id="name" type="text" class="form-controll" name="name" value="" required autofocus>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label for="email" class="col-md-4 controll-label">E-Mail Address</label>
                                    <div class="col-md-6">
                                        <input id="email" type="email" class="form-controll" name="email" value="" required>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label for="email" class="col-md-4 controll-label">Password</label>
                                    <div class="col-md-6">
                                        <input id="password" type="password" class="form-controll" name="password" value="" required>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label for="email" class="col-md-4 controll-label">Confirm password</label>
                                    <div class="col-md-6">
                                        <input id="password-confirm" type="password" class="form-controll" name="confirm" value="" required>
                                    </div>
                                </div>
                                <div class="form-goup">
                                    <div class="col-md-6 col-md-offset-4">
                                        <button type="submit" class="btn btn-primary" name="save">
                                            Register
                                        </button>
                                    </div>
                                </div>
                                <p style="padding-top: 10px;"><a href="./">Web site</a></p>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </body>
</html>

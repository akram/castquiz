<!doctype html>
<html lang="en" ng-app="app">
  <head>
    <meta charset="utf-8">
    <title>Chromecast Quiz</title>

    <!-- Styles -->
    <link rel="stylesheet" href="css/reset.css"/>
    <link rel="stylesheet" href="css/bootstrap.min.css"/>
    <link rel="stylesheet" href="css/app.css"/>

  </head>
  <body ng-controller="MainCtrl">

    <!-- Wrapper -->
    <div id="wrap">

      <!-- Content -->
      <div id="content" ng-view></div>

    </div>

    <!-- Footer -->
    <div id="footer" ng-controller="FooterCtrl" ng-include src="'partials/footer.html'"></div>

    <!-- Libraries -->
    <script src="lib/angular/angular.min.js"></script>
    <script src="lib/angular/angular-route.min.js"></script>
    <script src="lib/angular/angular-animate.min.js"></script>
    <script src="lib/cast_receiver.js"></script>

    <!-- App -->
    <script src="js/app.js"></script>

    <!-- Controllers -->
    <script src="js/controllers/main.js"></script>
    <script src="js/controllers/quiz.js"></script>
    <script src="js/controllers/footer.js"></script>

    <!-- Services -->
    <script src="js/services/cast.js"></script>

    <!-- Filters -->

    <!-- Directives -->

  </body>
</html>
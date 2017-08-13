angular.module('app', [
    'ngRoute',
    'ngAnimate',
    'app.controller.Quiz',
    'app.service.Cast',
    'app.service.Quiz',
    'app.service.Player',
    'app.service.Message',
    'app.service.Command',
    'ngAnimate-animate.css'
])
    .config(['$routeProvider',
        function($routeProvider) {
            $routeProvider.when('/castquiz/quiz', {
                templateUrl: '/castquiz/partials/quiz.html',
                controller: 'QuizCtrl'
            }).otherwise({
                redirectTo: '/castquiz/quiz'
            });
        }
    ]);

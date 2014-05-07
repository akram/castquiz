angular.module('app.controller.Quiz', ['ngAnimate'])

.controller('QuizCtrl', ['$scope', 'CastService', 'QuizService', 'PlayerService',
    function($scope, CastService, QuizService, PlayerService) {

        window.$scope = $scope;

        // Keep track of the game state
        $scope.currentIndex = QuizService.currentIndex;
        $scope.$watch(function() {
            return QuizService.currentIndex
        }, function(newVal, oldVal) {
            if (typeof newVal !== 'undefined') {
                $scope.currentIndex = QuizService.currentIndex;
            }
        });
        
        $scope.gameState = QuizService.gameState;
        $scope.$watch(function() {
            return QuizService.gameState
        }, function(newVal, oldVal) {
            if (typeof newVal !== 'undefined') {
                $scope.gameState = QuizService.gameState;
            }
        });

        // Keep track of the players
        $scope.players = PlayerService.players;
        $scope.$watch(function() {
            return PlayerService.players
        }, function(newVal, oldVal) {
            if (typeof newVal !== 'undefined') {
                $scope.players = PlayerService.players;
            }
        });

        $scope.displayPlayer = PlayerService.displayPlayer;
        $scope.$watch(function() {
            return PlayerService.displayPlayer
        }, function(newVal, oldVal) {
            if (typeof newVal !== 'undefined') {
                $scope.displayPlayer = PlayerService.displayPlayer;
            }
        });

        $scope.winner = PlayerService.winner;
        $scope.$watch(function() {
            return PlayerService.winner
        }, function(newVal, oldVal) {
            if (typeof newVal !== 'undefined') {
                $scope.winner = PlayerService.winner;
            }
        });

        // Keep track of the current question
        $scope.currentQuestion = QuizService.currentQuestion;
        $scope.$watch(function() {
            return QuizService.currentQuestion
        }, function(newVal, oldVal) {
            if (typeof newVal !== 'undefined') {
                $scope.currentQuestion = QuizService.currentQuestion;
            }
        });

        $scope.timer = QuizService.timer;
        $scope.$watch(function() {
            return QuizService.timer
        }, function(newVal, oldVal) {
            if (typeof newVal !== 'undefined') {
                $scope.timer = QuizService.timer;
            }
        });

    }
]);

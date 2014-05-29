angular.module('app.service.Player', [])

.service('PlayerService', ['$rootScope', 'MessageService', 'QuizService', '$animate', '$timeout',
    function($rootScope, MessageService, QuizService, $animate, $timeout) {

        this.players = {};
        this.playerCount = 0;
        this.displayPlayer = [];

        function QuizPlayer(event) {
            this.name = event.data.name;
            this.score = 0;
            this.fastestAnswer = 1000;
            this.slowestAnswer = -1;
            this.correct = 0;
            this.incorrect = 0;
            this.answered = false;
        }

        this.setAnswered = function(senderId) {
            this.players[senderId].answered = true;
        }

        this.setHost = function(senderId) {
            this.players[senderId].host = true;
        }

        this.playerJoin = function(event) {
            var senderId = event.senderId;
            this.players[senderId] = new QuizPlayer(event);
            this.playerCount++;
        }

        this.sendStats = function(event) {
            var player = this.players[event.senderId];
            MessageService.sendMessage(event.senderId, player);
        }

        this.removePlayer = function(event) {
            // Remove the player
            delete this.players[event.senderId];
            this.playerCount--;

            // If there is no players left then kill the game
            if (this.playerCount === 0) {
                QuizService.killGame(QuizService);
            }
        }

        this.setWinners = function() {
            var winningScore;
            for (key in this.players) {
                var player = this.players[key];
                if (!winningScore) {
                    winningScore = player.score
                    this.winner = player.name;
                } else if (player.score > winningScore) {
                    winningScore = player.score
                    this.winner = player.name;
                } else if (player.score === winningScore) {
                    this.winner += " " + player.name;
                }
            }
        }

        this.updateScore = function(senderId, points, seconds, correct) {
            _this = this;
            if (correct) {
                _this.players[senderId].correct++;
            } else {
                _this.players[senderId].incorrect++;
            }
            if (seconds < _this.players[senderId].fastestAnswer) {
                _this.players[senderId].fastestAnswer = seconds
            }

            if (seconds > _this.players[senderId].slowestAnswer) {
                _this.players[senderId].slowestAnswer = seconds
            }
            _this.players[senderId].answered = false;
            _this.players[senderId].score += points;
            if (correct) {
                $animate.addClass($("#" + _this.players[senderId].name), "correct", function() {
                    $animate.removeClass($("#" + _this.players[senderId].name), "correct")
                });
            }
        }

        this.clearPlayers = function() {
            this.players = {};
        }

        this.cyclePlayers = function() {
            _this = this;
            var playerList = [];
            for (id in this.players) {
                playerList.push(this.players[id]);
            }
            this.show(_this, playerList, -1);
        }

        this.show = function(_this, playerList, index) {

            index++;
            if (index > playerList.length) {
                index = 0;
            }
            _this.timerPromise = $timeout(function(event) {
                _this.displayPlayer[0] = playerList[index];
                _this.hide(_this, playerList, index);
            }, 600);
        }

        this.hide = function(_this, playerList, index) {

            _this.timerPromise = $timeout(function(event) {
                _this.displayPlayer = [];
                _this.show(_this, playerList, index);
            }, 600);
        }

    }
]);

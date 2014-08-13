angular.module('app.service.Command', [])

.service('CommandService', ['$rootScope', 'QuizService', 'PlayerService', 'MessageService', '$location', '$window',
    function($rootScope, QuizService, PlayerService, MessageService, $location, $window) {

        this.executeCommand = function(event) {
            var state = QuizService.gameState.toLowerCase();
            var commandHandler = this[state];
            var sender = event.senderId;

            if (commandHandler) {
                var commandExecuted = commandHandler(event);
                if (!commandExecuted) {
                    MessageService.sendMessage(sender, {
                        gameState: state,
                        errorCode: 400,
                        errorMessage: "Sorry you can't do that right now"
                    });
                }
            } else {
                MessageService.sendMessage(sender, {
                    gameState: state,
                    errorCode: 401,
                    errorMessage: "Please wait"
                });
            }
        }

        this.title = function(event) {
            var message = event.data;
            var senderId = event.senderId;

            switch (message.command) {
                case "categories":
                    console.log("Player " + senderId + " asked for categories");
                    QuizService.sendCategories(senderId);
                    return true;
                case "newgame":
                    PlayerService.clearPlayers();
                    console.log("Player " + senderId + ": New Game with Category: " + message.categoryId);
                    PlayerService.playerJoin(event);
                    PlayerService.setHost(senderId);
                    QuizService.loadQuiz(message.categoryId);
                    return true;
            }
            return false;
        }

        this.lobby = function(event) {
            var message = event.data;
            var senderId = event.senderId;

            switch (message.command) {
                case "join":
                    console.log("Player " + senderId + ": Join Game with Name: " + message.name);
                    PlayerService.playerJoin(event);
                    return true;
                case "start":
                    console.log("Player " + senderId + ": Start Game");
                    QuizService.startGame(QuizService);
                    console.log(JSON.stringify(PlayerService.players));
                    return true;
                case "leave":
                    console.log("Player " + senderId + ": Leave Game");
                    PlayerService.removePlayer(event);
                    return true;
            }

            return false;

        }

        this.started = function(event) {
            var message = event.data;
            var senderId = event.senderId;

            switch (message.command) {
                case "answer":
                    console.log("Player " + senderId + ": Answered With : " + message.answer);
                    QuizService.receiveAnswer(event);
                    return true;
                case "quit":
                    console.log("Player " + senderId + ": Quit Current Game");
                    return true;
                case "leave":
                    console.log("Player " + senderId + ": Leave Game");
                    PlayerService.removePlayer(event);
                    return true;

            }
            return false;

        }

        this.game_over = function(event) {

            var commandExecuted = this.started(event);
            if (!commandExecuted) {
                switch (message.command) {
                    case "stats":
                        console.log("Player " + senderId + ": Get Stats");
                        PlayerService.sendStats(event);
                        return true;
                }
                return false;
            }
            return true;
        }

    }
]);

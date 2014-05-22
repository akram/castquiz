angular.module('app.service.Cast', [])

.service('CastService', ['$rootScope', 'QuizService', 'PlayerService', 'MessageService', '$location', '$window',
    function($rootScope, QuizService, PlayerService, MessageService, $location, $window) {

        this.messages = [];

        this.onSenderConnected = function(event) {
            var senderId = event.data;
            var message = {
                gameState: QuizService.gameState
            };
            MessageService.sendMessage(senderId, message);
        }

        this.onSenderDisconnected = function(event) {
            PlayerService.removePlayer(event);
        }

        this.onMessage = function(event) {
            var message = event.data;
            var senderId = event.senderId;

            this.messages.push(message);

            switch (message.command) {
                case "categories":
                    QuizService.sendCategories(senderId);
                    break;
                case "newgame":
                    PlayerService.clearPlayers();
                    console.log("Player " + senderId + ": New Game with Category: " + message.categoryId);
                    PlayerService.playerJoin(event);
                    PlayerService.setHost(senderId);
                    QuizService.loadQuiz(message.categoryId);
                    break;
                case "join":
                    console.log("Player " + senderId + ": Join Game with Name: " + message.name);
                    PlayerService.playerJoin(event);
                    break;
                case "leave":
                    console.log("Player " + senderId + ": Leave Game");
                    PlayerService.removePlayer(event);
                    break;
                case "answer":
                    console.log("Player " + senderId + ": Answered With : " + message.answer);
                    QuizService.receiveAnswer(event);
                    break;
                case "quit":
                    console.log("Player " + senderId + ": Quit Current Game");
                    break;
                case "start":
                    console.log("Player " + senderId + ": Start Game");
                    QuizService.startGame(QuizService);
                    console.log(JSON.stringify(PlayerService.players));
                    break;
                case "stats":
                    console.log("Player " + senderId + ": Get Stats");
                    PlayerService.sendStats(event);
                    break;
                default:
                    console.log("ERROR: INVALID COMMAND");
            }

            $rootScope.$apply();
        }

        // Cast Receiver Manager
        this.castReceiverManager = cast.receiver.CastReceiverManager.getInstance();
        this.castReceiverManager.onSenderConnected = this.onSenderConnected.bind(this);
        this.castReceiverManager.onSenderDisconnected = this.onSenderDisconnected.bind(this);

        // Cast Receiver Message Bus
        this.castMessageBus = this.castReceiverManager.getCastMessageBus('urn:x-cast:com.google.cast.sample.helloworld', cast.receiver.CastMessageBus.MessageType.JSON);
        MessageService.castMessageBus = this.castMessageBus;
        this.castMessageBus.onMessage = this.onMessage.bind(this);

        // Start Cast Receiving
        this.castReceiverManager.start({
            statusText: "Application is starting"
        });
    }
]);

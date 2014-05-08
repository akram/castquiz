angular.module('app.service.Cast', [])

.service('CastService', ['$rootScope', 'QuizService', 'PlayerService', 'MessageService', 'CommandService', '$location', '$window',
    function($rootScope, QuizService, PlayerService, MessageService, CommandService, $location, $window) {

        this.messages = [];

        this.onSenderConnected = function(event) {
            console.log("Sender Connected");

            var senderId = event.data;
            var message = {
                gameState: QuizService.gameState
            };
            MessageService.sendMessage(senderId, message);
        }

        this.onSenderDisconnected = function(event) {
            console.log("Sender Disconnected");
            console.log(event);
            PlayerService.removePlayer(event);
        }

        this.onMessage = function(event) {
            CommandService.executeCommand(event);

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
        console.log("It begins");
        // QuizService.testAnimate();
        // QuizService.gameState = "TITLE";

    }
]);

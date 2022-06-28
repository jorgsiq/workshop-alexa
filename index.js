const Alexa = require('ask-sdk-core');
//Estas variáveis são globais
let alexaChoice = "";
let myChoice = "";
let myName = "";

//É executado automaticamente quando o usuário dá o primeiro comando de voz (chama a skill)
const LaunchRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest';
    },
    handle(handlerInput) {
        //Faz a próxima pergunta
        const speakOutput = 'Ok, mas antes preciso saber com quem vou jogar. Como você se chama?';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

// I) Captura nosso nome
const CaptureNameIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'CaptureNameIntent';
    },
    handle(handlerInput) {
        //Salva o nome na variável myName
        myName = handlerInput.requestEnvelope.request.intent.slots.myName.value;
        //Faz a próxima pergunta
        const speakOutput = `Oi ${myName}! Prazer em te conhecer! Agora me conta qual você vai escolher: par, ou ímpar?`; 
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

// II) Captura nossa escolha (par ou ímpar)
const CaptureChoiceIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'CaptureChoiceIntent';
    },
    handle(handlerInput) {
        //Salva nossa escolha na variável myChoice como "par" ou como "ímpar"
        myChoice = handlerInput.requestEnvelope.request.intent.slots.choice.value;

        //Queremos salvar quem ficou com par e quem ficou com ímpar
        /* //COMPLETAR CÓDIGO AQUI <----------------------------
        if (myChoice === "par"){
            //COMPLETAR COM CÓDIGO
        }else{
            //lembre-se que alexaChoice significa se Alexa será par ou se será ímpar
            alexaChoice = "par"; 
        }
        */
    
        //Faz a próxima pergunta
        const speakOutput = `E eu fico com ${alexaChoice}! um, dois, três, jogar! Agora me diga quantos dedos você levantou.`; 
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

// III) Captura quantos dedos levantamos
const CaptureHandIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'CaptureHandIntent';
    },
    handle(handlerInput) {
        //Salva quantos dedos levantamos na variável myHand
        const myHand = handlerInput.requestEnvelope.request.intent.slots.hand.value / 1;
        
        //Precisamos fazer a Alexa executar sua jogada entre 0 e 5 sem que seja sempre o mesmo valor
        const alexaHand = 0;//COMPLETAR CÓDIGO
        //Soma dos dedos da Alexa com os nossos dedos
        const result = alexaHand + myHand;
        let decision = "";
        let speakOutput = "";
        
        //Precisamos saber se o resultado do jogo é um número par ou um número ímpar
        /* //COMPLETAR CÓDIGO AQUI <----------------------------
        if (COMPLETAR COM CÓDIGO){
            COMPLETAR COM CÓDIGO
        }else{
            decision = "ímpar"; 
        }
        */
        
        if (decision === alexaChoice){
            speakOutput = `Eu escolhi ${alexaHand}, você escolheu ${myHand}, a soma das nossas mãos deu ${result}. Eba! eu venci!`;
        }else{
            speakOutput = `Eu escolhi ${alexaHand}, você escolheu ${myHand}, a soma das nossas mãos deu ${result}. Parabéns! Você venceu.`;
        }
    
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .getResponse();
    }
};

//Caso o usuário solicite ajuda à Alexa enquanto estiver no jogo
const HelpIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.HelpIntent';
    },
    handle(handlerInput) {
        const speakOutput = 'Esta skill consiste em um simples jogo de par ou ímpar.';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

//Caso o usuário solicite sair à Alexa enquanto estiver no jogo
const CancelAndStopIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && (Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.CancelIntent'
                || Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.StopIntent');
    },
    handle(handlerInput) {
        const speakOutput = 'Tudo bem, nós jogamos outra hora!';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .getResponse();
    }
};

//Caso o usuário dê uma ordem inexistente à Alexa
const FallbackIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.FallbackIntent';
    },
    handle(handlerInput) {
        const speakOutput = 'Essa alternativa não é válida, tente novamente!';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

const SessionEndedRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'SessionEndedRequest';
    },
    handle(handlerInput) {
        console.log(`~~~~ Session ended: ${JSON.stringify(handlerInput.requestEnvelope)}`);
        return handlerInput.responseBuilder.getResponse(); 
    }
};

const IntentReflectorHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest';
    },
    handle(handlerInput) {
        const intentName = Alexa.getIntentName(handlerInput.requestEnvelope);
        const speakOutput = `You just triggered ${intentName}`;

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .getResponse();
    }
};

//Caso ocorra algum erro durante o jogo
const ErrorHandler = {
    canHandle() {
        return true;
    },
    handle(handlerInput, error) {
        const speakOutput = 'Desculpe, eu tive um problema fazendo o que você pediu. Por favor, tente novamente.';
        console.log(`~~~~ Error handled: ${JSON.stringify(error)}`);

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

 
//Exporta e executa os comandos nessa precisa ordem
exports.handler = Alexa.SkillBuilders.custom()
    .addRequestHandlers(
        LaunchRequestHandler,
        CaptureNameIntentHandler,
        CaptureChoiceIntentHandler,
        CaptureHandIntentHandler,
        HelpIntentHandler,
        CancelAndStopIntentHandler,
        FallbackIntentHandler,
        SessionEndedRequestHandler,
        IntentReflectorHandler)
    .addErrorHandlers(
        ErrorHandler)
    .withCustomUserAgent('sample/hello-world/v1.2')
    .lambda();
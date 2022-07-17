const Alexa = require('ask-sdk-core');
//Estas variáveis são globais
let alexaChoice = "";
let myChoice = "";
let myName = "";

//É executado quando o usuário dá o primeiro comando de voz (chama a skill)
const LaunchRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest';
    },
    handle(handlerInput) {
        const speakOutput = 'Ok, mas antes preciso saber com quem vou jogar. Como você se chama?';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

//Captura o nosso nome
const CaptureNameIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'CaptureNameIntent';
    },
    handle(handlerInput) {
        myName = handlerInput.requestEnvelope.request.intent.slots.myName.value;
        const speakOutput = `Oi ${myName}! Prazer em te conhecer! Agora me conta qual você vai escolher: par, ou ímpar?`; 
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

//Captura nossa escolha (par ou ímpar)
const CaptureChoiceIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'CaptureChoiceIntent';
    },
    handle(handlerInput) {
        myChoice = handlerInput.requestEnvelope.request.intent.slots.choice.value;
        if (myChoice === "par"){
            alexaChoice = "ímpar";
        }else{
            alexaChoice = "par"; 
        }
    
        const speakOutput = `E eu fico com ${alexaChoice}! um, dois, três, jogar! Agora me diga quantos dedos você levantou.`; 
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

//Captura quantos dedos levantamos
const CaptureHandIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'CaptureHandIntent';
    },
    handle(handlerInput) {
        const myHand = handlerInput.requestEnvelope.request.intent.slots.hand.value / 1;
    
        const alexaHand = Math.floor(Math.random() * 5) / 1;
        const result = alexaHand + myHand;
        let decision = "";
        let winner = "";
        let speakOutput = "";
        
        if (result % 2 === 0){
            decision = "par";
        }else{
            decision = "ímpar"; 
        }
        
        if (decision === alexaChoice){
            speakOutput = `Eu escolhi ${alexaHand}, você escolheu ${myHand}, a soma das nossas mãos deu ${result}. Eba! eu venci!`;
        }else{
            speakOutput = `Eu escolhi ${alexaHand}, você escolheu ${myHand}, a soma das nossas mãos deu ${result}. Parabéns! Você venceu.`;
        }
    
        return handlerInput.responseBuilder
            .speak(speakOutput)
            //.reprompt(speakOutput) este é o fim da execução planejada, por isso não utilizaremos o reprompt
            .getResponse();
    }
};

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

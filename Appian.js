var validationsChannel = new BroadcastChannel('validations');
var saveValueChannel = new BroadcastChannel('saveInto');
var onNewValueChannel = new BroadcastChannel('newParameters');
onNewValueChannel.onmessage = function(message){
  Appian.Component.newValueCallback(message.data);
};
var mockClientApiResponseChannel = new BroadcastChannel('apiResponse');
mockClientApiResponseChannel.onmessage = function(message){
  Appian.Component.setMockClientApi(message.data.key, message.data.response);
};

Appian = {
  Component: {
    newValueCallback:function(variables){console.error("Your code never called 'Appian.Component.onNewValue(function(parameters){...});' Your component will not receive new parameters");},
    onNewValue:function(valueCallback){Appian.Component.newValueCallback = valueCallback},
    setValidations: function(validations){validationsChannel.postMessage(validations)},
    saveValue: function(channel, value){saveValueChannel.postMessage({variable: channel, value: JSON.stringify(value, null, 4)});},
    mockClientApiResponse: {},
    setMockClientApi: function(stringClientApi, response){Appian.Component.mockClientApiResponse[stringClientApi] = response},
    invokeClientApi:function(connectedSystem, stringClientApi, data) {return Promise.resolve(Appian.Component.mockClientApiResponse[stringClientApi]);}
  },
  getAccentColor: function(){ return '#1d659c';},
  getLocale: function(){ return 'en-US';}
};

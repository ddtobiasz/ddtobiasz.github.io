var container = document.getElementById('componentContainer');
var componentDiv = document.createElement('object');
componentDiv.setAttribute('id', 'componentEntryPoint')
componentDiv.setAttribute('type', 'text/html');
componentDiv.setAttribute('data', 'component/index.html');

container.appendChild(componentDiv);

var variableInputs = document.getElementById('variableInputs');

componentDescriptor = [{"name":["richText"],"category":["input-output"],"type":["Text"]},{"name":["readOnly"],"category":["input-only"],"type":["Boolean"]},{"name":["maxSize"],"category":["input-only"],"type":["Integer"]},{"name":["placeholder"],"category":["input-only"],"type":["Text"]},{"name":["enableProgressBar"],"category":["input-only"],"type":["Boolean"]},{"name":["allowedFormats"],"category":["input-only"],"type":["Text?list"]}];
var defaultValues = {"richText":[null],"readOnly":[false],"maxSize":[1024],"placeholder":["Start typing (maxSize is set at 1024)"],"enableProgressBar":[true],"allowedFormats":["header","size","bold","italic","underline","strike","color","background","link","align","indent","list"]};

connectedSystemKeys = [];
dictionaryKeys = [];
numberKeys = [];
listKeys = [];

var heightDiv = document.createElement('div');
heightDiv.setAttribute('class', 'variableDiv');
var heightLabel = document.createElement('label');
heightLabel.innerHTML = 'Height';
heightDiv.appendChild(heightLabel);

var height = document.createElement('div');
height.setAttribute('class', 'heightContainer');
var optionAutoLabel = document.createElement('label');
optionAutoLabel.innerHTML = 'Auto';
var optionAuto = document.createElement('input');
optionAuto.setAttribute('type', 'radio');
optionAuto.setAttribute('name', 'height');
optionAuto.setAttribute('value','auto');
optionAuto.setAttribute('checked', true);
optionAuto.innerHTML = 'Auto';
var optionShortLabel = document.createElement('label');
optionShortLabel.innerHTML = 'Short';
var optionShort = document.createElement('input');
optionShort.setAttribute('type', 'radio');
optionShort.setAttribute('name', 'height');
optionShort.setAttribute('value','280px');
optionShort.innerHTML = 'Short';
var optionMediumLabel = document.createElement('label');
optionMediumLabel.innerHTML = 'Medium';
var optionMedium = document.createElement('input');
optionMedium.setAttribute('type', 'radio');
optionMedium.setAttribute('name', 'height');
optionMedium.setAttribute('value','490px');
optionMedium.innerHTML = 'Medium';
var optionTallLabel = document.createElement('label');
optionTallLabel.innerHTML = 'Tall';
var optionTall = document.createElement('input');
optionTall.setAttribute('type', 'radio');
optionTall.setAttribute('name', 'height');
optionTall.setAttribute('value','840px');
optionTall.innerHTML = 'Tall';
height.appendChild(optionAuto);
height.appendChild(optionAutoLabel);
height.appendChild(optionShort);
height.appendChild(optionShortLabel);
height.appendChild(optionMedium);
height.appendChild(optionMediumLabel);
height.appendChild(optionTall);
height.appendChild(optionTallLabel);
heightDiv.appendChild(height);

variableInputs.append(heightDiv);


componentDescriptor.forEach(function(item){
  var containerDiv = document.createElement('div');
  containerDiv.setAttribute('class', 'variableDiv');
  var label = document.createElement('label');
  var itemName = item.name[0];
  if (item.category[0] == 'input-output'){
    var outputLabel = document.createElement('label');
    outputLabel.innerHTML = '' + itemName + 'SaveInto';
    var output = document.createElement('p');
    output.setAttribute('id', itemName + 'SaveInto');

    containerDiv.appendChild(outputLabel);
    containerDiv.appendChild(output);
  }

  if (item.category[0] == 'event'){
    label.innerHTML = '' + itemName;
    var output = document.createElement('p');
    output.setAttribute('id', itemName + 'SaveInto');

    containerDiv.appendChild(label);
    containerDiv.appendChild(output);
  }else{
    label.innerHTML = '' + itemName;
    var input = document.createElement('input');
    if (defaultValues.hasOwnProperty(itemName)){
      try{
          input.value = defaultValues[itemName][0];
        }catch(e){
          console.log("Invalid value in default variables in " + itemName);
        }
    }
    input.setAttribute('name', itemName);
    var typeWithoutList = item.type[0].replace('?list','');
    switch (typeWithoutList) {
      case 'Boolean':
        containerDiv.setAttribute('class', 'variableDiv checkboxContainer');
        input.setAttribute('type', 'checkbox');
        if (defaultValues.hasOwnProperty(itemName) && defaultValues[itemName][0]){
          input.setAttribute('checked', true);
        }
        break;
      case 'Text':
        input.setAttribute('type', 'text');
        break;
      case 'Integer':
      case 'Decimal':
      case 'Number':
        numberKeys.push(itemName);
        input.setAttribute('type', 'number');
        break;
      case 'Dictionary':
        dictionaryKeys.push(itemName);
        input.setAttribute('value', '{}');
        input.setAttribute('type', 'text');
        if (defaultValues.hasOwnProperty(itemName)){
          try{
            input.value = JSON.stringify(defaultValues[itemName][0]);
          }catch(e){
            console.log(e);
            input.value = '{}';
          }
        }
        break;
      case 'ConnectedSystem':
        connectedSystemKeys.push(itemName);
        input = document.createElement('div');
        input.setAttribute('class', 'variableDiv');

        var keyLabel = document.createElement('label');
        keyLabel.innerHTML = 'Client API ID';
        var valLabel = document.createElement('label');
        valLabel.innerHTML = 'payload';

        var keyInput = document.createElement('input');
        keyInput.setAttribute('name', itemName + '.key');
        keyInput.setAttribute('type', 'text');

        var valInput = document.createElement('input');
        valInput.setAttribute('name', itemName + '.value');
        valInput.setAttribute('type', 'text');
        if (defaultValues.hasOwnProperty(itemName)){
          try{
            keyInput.value = defaultValues[itemName][0].key;
            valInput.value = JSON.stringify(defaultValues[itemName][0].response);
            if (defaultValues[itemName].length > 1){
              for (var i = 1; i < defaultValues[itemName].length; i++){
               var inputClone = input.cloneNode(true);
               inputClone.getElementsByName(itemName + '.key')[0].value = defaultValues[itemName][i].key;
               inputClone.getElementsByName(itemName + '.value')[0].value = JSON.stringify(defaultValues[itemName][i].response);
               containerDiv.appendChild(inputClone);
             }
            }
          }catch(e){
            console.log("Invalid value in default variables in " + itemName);
          }
        }
        input.appendChild(keyLabel)
        input.appendChild(keyInput);
        input.append(valLabel);
        input.appendChild(valInput);
        break;
      default:
        input.setAttribute('type', 'text');
    }
    if (item.type[0].replace('?list', '') === 'Boolean') {
      var div = document.createElement('div');
      div.setAttribute('class', 'checkboxContainer');
      div.appendChild(input);
      div.appendChild(label);
      containerDiv.appendChild(div);
     } else {
       containerDiv.appendChild(label);
       containerDiv.appendChild(input);
     }

    if (item.type[0].includes('?list')){
      listKeys.push(itemName);
      var addEntry = document.createElement('button');
      addEntry.setAttribute('type','button');
      addEntry.innerHTML = 'Add Entry';
      addEntry.setAttribute('class', 'addEntry');
      containerDiv.appendChild(addEntry);
      addEntry.addEventListener("click", function () {
        if (typeWithoutList === 'Boolean') {
          var inputClone = input.cloneNode(false);
          var label = document.createElement('label');
          var div = document.createElement('div');
          div.setAttribute('class', 'checkboxContainer');
          containerDiv.insertBefore(div, addEntry);
          div.appendChild(inputClone);
          div.appendChild(label);
          return false;
        } else {
          var inputClone = input.cloneNode(false);
          containerDiv.insertBefore(inputClone, addEntry);
          return false;
        }
      });
      if (defaultValues.hasOwnProperty(itemName) && defaultValues[itemName].length > 1) { //Add list default values
        try{
          for (var i = 1; i < defaultValues[itemName].length; i++){
            var inputClone = input.cloneNode(false);
            if (typeWithoutList == 'Boolean'){
              if (defaultValues.hasOwnProperty(itemName)){
                if (defaultValues[itemName][i]){
                  inputClone.setAttribute('checked', true);
                }else{
                   inputClone.removeAttribute('checked');
                }
                var checkLabel = document.createElement('label');
                var checkDiv = document.createElement('div');
                checkDiv.setAttribute('class', 'checkboxContainer');
                containerDiv.insertBefore(checkDiv, addEntry);
                checkDiv.appendChild(inputClone);
                checkDiv.appendChild(checkLabel);
              }
            }else if (typeWithoutList == 'Dictionary'){
              try{
                inputClone.value = JSON.stringify(defaultValues[itemName][i]);
              }catch(e){
                console.log(e);
                inputClone.value = '{}';
              }
              containerDiv.insertBefore(inputClone, addEntry);
            }else{
              inputClone.value = defaultValues[itemName][i];
              containerDiv.insertBefore(inputClone, addEntry);
            }
          }
        }catch(e){
          console.log("Invalid value in default variables in " + itemName);
        }
      }
    }
    if (item.type[0] == 'ConnectedSystem'){
       var addEntry = document.createElement('button');
        addEntry.setAttribute('type','button');
        addEntry.innerHTML = 'Add Entry';
        addEntry.setAttribute('class', 'addEntry');
        containerDiv.appendChild(addEntry);
        addEntry.addEventListener("click", function() {
          var inputClone = input.cloneNode(true);
          containerDiv.insertBefore(inputClone, addEntry);
          return false;
        });
    }
  }
  variableInputs.appendChild(containerDiv);
});


var validationsChannel = new BroadcastChannel('validations');
validationsChannel.onmessage = function(message){
  if (message.data != null && message.data != [] && message.data != ''){
    console.error('Validation: ' + message.data);
  }
};
var saveIntoChannel = new BroadcastChannel('saveInto');
saveIntoChannel.onmessage = function(message){
  var saveInto = document.getElementById(message.data['variable'] + 'SaveInto');
  saveInto.innerHTML = escapeHtml(message.data['value']);
};

var newParametersChannel = new BroadcastChannel('newParameters');

var mockClientApiResponseChannel = new BroadcastChannel('apiResponse');
sendButton.onclick = function() {

  var formData = $('#variableInputs').serializeArray({ checkboxesAsBools: true });
  var formDataMap = {};
  var tmpKey;
  formData.forEach(function(element){
    var name = element.name;
    var value = element.value;
    //convert to number, if applicable;
    if (numberKeys.includes(name)){
      value = Number.parseFloat(value);
    }else if (dictionaryKeys.includes(name)){
      if (value != null){
        try{
          value = JSON.parse(value);
        }catch(e){
          console.error("Input '" + name + "' is not valid JSON");
          value = {};
        } 
      }else {
        value = {};
      }
    }
    if (formDataMap.hasOwnProperty(name) && listKeys.includes(name)){ // if already is a list, append value
      formDataMap[name].push(value);
    }else {
      if(listKeys.includes(name)) { // if item is a new list, create list with first value
        if (value != null && value != ''){
          formDataMap[name] = [value];
        }
      }else {
        if(dictionaryKeys.includes(name)) {
          formDataMap[name] = value;
        } else if (connectedSystemKeys.includes(name.split('.')[0])) {
          var dictKey = name.split('.')[0];
          if (name.split('.')[1] == 'key'){
            tmpKey = value;
          }else{
            var payload = {};
            try {
              payload = JSON.parse(value);
            }catch(e){
              console.log(e);
            }
            if (formDataMap.hasOwnProperty(dictKey)){
              formDataMap[dictKey].clientApis.push({key: tmpKey, response: {payload: payload}});
            }else{
              formDataMap[dictKey] = {id:123, clientApis: [ {key: tmpKey, response: {payload: payload }}]};
            }
          }
        }else {
          formDataMap[name] = value;
        }
      }
    }
  });
  connectedSystemKeys.forEach(function(cs){
    formDataMap[cs]['clientApis'].forEach(function(clientApi){
      mockClientApiResponseChannel.postMessage({
        key:clientApi.key,
        response:clientApi.response
      });
    });
  });

  createVariableSaveValues(formDataMap);
  newParametersChannel.postMessage(formDataMap,'*');
  return false;
};

function createVariableSaveValues(formDataMap) {
  jsonMap = JSON.parse(JSON.stringify(formDataMap));
  connectedSystemKeys.forEach(function(element){
    try{
      var clientApiArray = [];
      jsonMap[element].clientApis.forEach(function(element){
        var clientApiMap = {};
        clientApiMap["key"] = element.key;
        clientApiMap["response"] = element.response.payload;
        clientApiArray.push(clientApiMap);
      });
      jsonMap[element] = clientApiArray;
    }catch(e){
      console.log(e);
    }
  });
  Object.keys(jsonMap).forEach(function(element) {
    if (!listKeys.includes(element) && !connectedSystemKeys.includes(element)) {
      jsonMap[element] = [jsonMap[element]];
    }
  });
  console.log("To save these values as default, copy the following string into your Default Inputs File");
  console.log(JSON.stringify(jsonMap));
}

(function ($) {
 
     $.fn.serialize = function (options) {
         return $.param(this.serializeArray(options));
     };
 
     $.fn.serializeArray = function (options) {
         var o = $.extend({
         checkboxesAsBools: false
     }, options || {});
 
     var rselectTextarea = /select|textarea/i;
     var rinput = /text|hidden|password|search|number/i;
 
     return this.map(function () {
         return this.elements ? $.makeArray(this.elements) : this;
     })
     .filter(function () {
         return this.name && !this.disabled &&
             (this.checked
             || (o.checkboxesAsBools && this.type === 'checkbox')
             || rselectTextarea.test(this.nodeName)
             || rinput.test(this.type));
         })
         .map(function (i, elem) {
             var val = $(this).val();
             return val == null ?
             null :
             $.isArray(val) ?
             $.map(val, function (val, i) {
                 return { name: elem.name, value: val };
             }) :
             {
                 name: elem.name,
                 value: (o.checkboxesAsBools && this.type === 'checkbox') ? 
                        (this.checked ? true : false) :
                        val
             };
         }).get();
     };
 
})(jQuery);
var tagsToReplace = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;'
};
function replaceTag(tag) {
    return tagsToReplace[tag] || tag;
}
function escapeHtml(str) {
    return str.replace(/[&<>]/g, replaceTag);
}
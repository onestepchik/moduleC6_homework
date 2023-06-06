const inputMessage = document.getElementById('inputMessage');
const btnSend = document.querySelector('.btnSend');
const btnGeo = document.querySelector('.btnGeo');
const wsUri = "wss://ws.postman-echo.com/raw";

const chatArea = document.querySelector(".chatArea");
var receiveMessages = true;


function writeToScreen(message, side) {
  let pre = document.createElement("p");
  pre.style.wordWrap = "break-word";
  pre.innerHTML = message;
  pre.style.textAlign = side;
  chatArea.appendChild(pre);
}

btnSend.addEventListener('click', () => {
  writeToScreen(inputMessage.value,"right");
  websocket.send(inputMessage.value);
  inputMessage.value = "";

});

btnGeo.addEventListener('click', () => {

  if (!navigator.geolocation) {
    writeToScreen('Geolocation не поддерживается вашим браузером',"center");
  } else {
    writeToScreen('Определение местоположения…',"center");
    navigator.geolocation.getCurrentPosition(success, error);
  }
});

let websocket;
websocket = new WebSocket(wsUri);
  websocket.onopen = function(evt) {
    writeToScreen("CONNECTED","center");
  };
  websocket.onclose = function(evt) {
    writeToScreen("DISCONNECTED","center");
  };
  websocket.onmessage = function(evt) {
    if (receiveMessages){
      writeToScreen(
      '<span style="color: blue;">RESPONSE: ' + evt.data+'</span>', "left"
      );
    }else{
      receiveMessages = true;
    }
  };
  websocket.onerror = function(evt) {
    writeToScreen(
      '<span style="color: red;">ERROR:</span> ' + evt.data, "center"
    );
  };

// Функция, выводящая текст об ошибке
const error = () => {
  writeToScreen('Невозможно получить ваше местоположение', "center");
}

// Функция, срабатывающая при успешном получении геолокации
const success = (position) => {
  
  console.log('position', position);
  const latitude  = position.coords.latitude;
  const longitude = position.coords.longitude;


      var a = document.createElement('a');
      a.target = "_blank";
      a.classList.add('geoLink');
      var linkText = document.createTextNode("Геолокация");
      a.appendChild(linkText);
      a.title = "Геолокация";
      a.href = `https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`;

      writeToScreen(`Широта: ${latitude} °, Долгота: ${longitude} °`,"right");
      chatArea.appendChild(a);
  receiveMessages = false;    
  websocket.send(`Широта: ${latitude} °, Долгота: ${longitude} °`);
}
const webUrl = `wss://echo-ws-service.herokuapp.com`;
const btnSend = document.querySelector(`.btn_send`);
const btnGeo = document.querySelector(`.btn_geo`);
const inpText = document.querySelector(`.inpText`);
const chatField = document.querySelector(`.chat_field`);

let websocket = new WebSocket(webUrl);

btnSend.addEventListener(`click`, () => {
  let sendMessage = inpText.value;
  websocket.send(sendMessage);
  chatField.insertAdjacentHTML(
    "beforeend",
    `<p><span class="message_sent">Вы: ${sendMessage}</span></p>`
  );
});

websocket.onmessage = function (event) {
  let message = event.data;
  if (message != `[object GeolocationPosition]`) {
    chatField.insertAdjacentHTML(
      "beforeend",
      `<p><span class="message_received">Сервер: ${message}</span></p>`
    );
  }
};

btnGeo.addEventListener(`click`, () => {
  navigator.geolocation.getCurrentPosition((position) => {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    websocket.send(position);
    chatField.insertAdjacentHTML(
      "beforeend",
      `<p><span class="message_geo"><a target="_blank" href="https://www.openstreetmap.org/#map=18/${latitude}/${longitude}">Гео-локация</a></span></p>`
    );
  });
});

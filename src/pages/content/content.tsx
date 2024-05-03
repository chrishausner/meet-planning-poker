chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request === "REVEAL_ESTIMATIONS") {
    console.log('button pressed')

    const messageButton = sendMessageButton();
    if(messageButton) {
      sendResponse('Estimations revealed!');
    }
    sendResponse('Estimations not revealed!');
  }
});

const sendMessageButton = () => {
  return document.querySelector('[aria-label="Nachricht senden"]');
}
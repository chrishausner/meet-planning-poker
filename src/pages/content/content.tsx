import { getTextInputField, getMessageField, writeMessageInChat } from "@pages/content/utils";

const config = {childList: true, subtree: true};

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === "REVEAL_ESTIMATIONS") {
    writeMessageInChat(request.value)
    sendResponse(true);
  } else if (request.type === "ESTIMATION") {
    writeMessageInChat('👍');
  }
});

const chatWindowObserver = new MutationObserver((mutations) => {
  mutations.forEach(() => {
    const textInputField = getTextInputField();
    if (textInputField) {
      chatWindowObserver.disconnect();
      revealCommandObserver.observe(getMessageField(), config)
    }
  })
});

const revealCommandObserver = new MutationObserver((mutations) => {
  let commandDetected = false;
  mutations.forEach((mutation) => {
    const addedNode = mutation.addedNodes;
    addedNode.forEach((node) => {
      if (node.textContent.includes("--------Estimations--------") && !commandDetected) {
        commandDetected = true;
        chrome.runtime.sendMessage({type: "REVEAL_TRIGGERED"}, (response) => {
          writeMessageInChat(response.value)
        });
      }
    })
  })
  commandDetected = false;
});

chatWindowObserver.observe(document.body, config);

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
  let isMessageSent = false;
  mutations.forEach((mutation, index) => {
    const commandDetected = Array.prototype.some.call(mutation.addedNodes, (node) => node.textContent.includes("--------Estimations--------"));
    if (commandDetected && !isMessageSent) {
      isMessageSent = true;
      chrome.runtime.sendMessage({type: "REVEAL_TRIGGERED"}, (response) => {
        try {
          if (response.value !== null) writeMessageInChat(response.value)
        } catch (error) {
          console.log('there was an revealing the estimation value')
        }
      });
    }
  })
  isMessageSent = false;
});

chatWindowObserver.observe(document.body, config);

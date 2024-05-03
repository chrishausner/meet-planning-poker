import { getTextInputField, getSendMessageButton } from "@pages/content/utils";

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === "REVEAL_ESTIMATIONS") {
    const textInputField: any = getTextInputField();
    const sendButton: any = getSendMessageButton();

    if(textInputField && sendButton) {
      sendResponse('Estimations revealed!');
      textInputField.value = request.value;
      textInputField.dispatchEvent(new Event('input', { bubbles: true }));

      sendButton.click();
    }
    sendResponse('error');
  }
});

// TODO: observer here sending message to background script, when the user clicks on the reveal button
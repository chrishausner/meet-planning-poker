export const getTextInputField = () => {
  try {
    return document.querySelector('[data-panel-container-id=sidePanel2]');
  }
  catch (error) {
    sendMessageToPanel({type: 'ERROR'});
  }
}

export const getSendMessageButton = () => {
  try{
    return getTextInputField().parentNode.parentNode.parentNode.lastChild.firstChild;
  }
  catch (error) {
    sendMessageToPanel({type: 'ERROR'});
  }
}

export const getMessageField = () => {
  try {
    return getTextInputField().parentNode.parentNode.parentNode.parentNode.parentNode;
  }
  catch (error) {
    // do nothing
  }
}

export const sendMessageToPanel = (data: { type: string; value?: number | string; }) => {
  chrome.runtime.sendMessage(data);
}

export const writeMessageInChat = (message: string) => {
  try {
    const textInputField: any = getTextInputField();
    const sendButton: any = getSendMessageButton();

    textInputField.value = message;
    textInputField.dispatchEvent(new Event('input', { bubbles: true }));
    sendButton.click();
  }
  catch (error) {
    // do nothing
  }
}
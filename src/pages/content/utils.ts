export const getTextInputField = () => {
  return document.querySelector('[aria-label="Nachricht senden"]');
}

export const getSendMessageButton = () => {
  return getTextInputField().parentNode.parentNode.parentNode.lastChild.firstChild;
}

export const getMessageField = () => {
  return getTextInputField().parentNode.parentNode.parentNode.parentNode.parentNode;
}

export const writeMessageInChat = (message: string) => {
  const textInputField: any = getTextInputField();
  const sendButton: any = getSendMessageButton();

  textInputField.value = message;
  textInputField.dispatchEvent(new Event('input', { bubbles: true }));
  sendButton.click();
}
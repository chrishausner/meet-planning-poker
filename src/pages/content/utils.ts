export const getTextInputField = () => {
  return document.querySelector('[aria-label="Nachricht senden"]');
}

export const getSendMessageButton = () => {
  return getTextInputField().parentNode.parentNode.parentNode.lastChild.firstChild;
}
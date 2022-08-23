export function loginRef(email, password, message, gmessage) {
  const emailValue = email.current.value;
  const passwordValue = password.current.value;
  const newMessage = message.current;
  const newalert = gmessage.current;
  return {
    emailValue,
    passwordValue,
    newMessage,
    newalert,
  };
}

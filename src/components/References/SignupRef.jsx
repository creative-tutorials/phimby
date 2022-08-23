export function signupRef(username, email, password, age, message, gmessage) {
  const usernameValue = username.current.value;
  const emailValue = email.current.value;
  const passwordValue = password.current.value;
  const ageValue = age.current.value;
  const newMessage = message.current;
  const newalert = gmessage.current;
  return {
    usernameValue,
    emailValue,
    passwordValue,
    ageValue,
    newMessage,
    newalert,
  };
}

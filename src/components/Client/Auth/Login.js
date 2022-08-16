import { useRef } from "react";
const LoginPage = () => {
  const email = useRef();
  const password = useRef();
  const SubmitForm = (e) => {
    const emailValue = email.current.value;
    const passwordValue = password.current.value;
    e.preventDefault();
    // check if both inputs are valid
    if (emailValue !== "" && passwordValue !== "") {
      console.log("input is valid");
      createCredentials(emailValue, passwordValue);
    } else {
      console.log("input are not valid");
    }

    function createCredentials(emailValue, passwordValue) {
      const createUID = Math.floor(
        Math.random() * (passwordValue.length + 5000 || 8000)
      );
      console.log("createCredentials: " + emailValue + " " + passwordValue);
      console.log(createUID);

      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      var raw = JSON.stringify({
        id: parseInt(createUID),
        name: undefined,
        email: emailValue,
        password: passwordValue,
      });

      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      fetch("http://localhost:5000/api/users/login", requestOptions)
        .then((response) => response.json())
        .then((result) => console.log(result))
        .catch((error) => console.log("error", error));
    }
  };
  return (
    <div className="form login">
      <form className="form_box" onSubmit={SubmitForm}>
        <div className="input-fields">
          <input
            type="text"
            name=""
            id="email"
            placeholder="Email"
            ref={email}
          />
          <label htmlFor="email" className="labels">
            Email Here
          </label>
        </div>
        <div className="input-fields">
          <input
            type="text"
            name=""
            id="password"
            placeholder="Password"
            ref={password}
          />
          <label htmlFor="password" className="labels">
            Password Here
          </label>
        </div>
        <div className="submit_button">
          <button>Login</button>
        </div>
      </form>
    </div>
  );
};
export default LoginPage;

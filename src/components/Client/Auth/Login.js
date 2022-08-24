import { newLocalStorage } from "../../LocalStorage/storage";
import { loginRef } from "../../References/LoginRef";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { GoogleAuthSign } from "../GoogleAuth/AuthGoogle";
import "../../../styles/forms.css";
const LoginPage = () => {
  const email = useRef();
  const password = useRef();
  const message = useRef();
  const gmessage = useRef();
  const [Auth, setAuth] = useState(false);
  const SubmitForm = (e) => {
    const { emailValue, passwordValue, newMessage, newalert } = loginRef(
      email,
      password,
      message,
      gmessage
    );
    e.preventDefault();
    // check if both inputs are valid
    if (emailValue !== "" && passwordValue !== "") {
      console.log("input is valid");
      createCredentials(emailValue, passwordValue);
    } else {
      console.log("input are not valid");
      const xLocal = newLocalStorage("Please fill all the required fields");
      newMessage.innerHTML = `${localStorage.getItem("error")}`;
      newalert.classList.add("reveal");
      setTimeout(() => {
        newalert.classList.remove("reveal");
      }, 5000);
    }

    async function createCredentials(emailValue, passwordValue) {
      const createUID = Math.floor(
        Math.random() * (passwordValue.length + 5000 || 8000) // create a unique id for each credential in the database
      );
      console.log("createCredentials: " + emailValue + " " + passwordValue);
      console.log(createUID);

      const options = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: emailValue,
          password: passwordValue,
        }),
      };

      fetch("https://phimby-api.vercel.app/api/users/login", options)
        .then((response) => {
          // if status code is 401 alert error
          if (response.status === 401) {
            const xLocal = newLocalStorage(
              "User doesn't exist, Try creating an account"
            );
            setAuth(false);
            newalert.classList.remove("success");
            newalert.classList.add("reveal");
            newMessage.innerHTML = `${localStorage.getItem("error")}`;
            setTimeout(() => {
              newalert.classList.remove("reveal");
            }, 5000);
          } else {
            setAuth(true);
            return response;
          }
        })
        .then((data) => {
          console.log(data);
          if (!Auth) {
            console.log("No authentication");
          } else {
            newalert.classList.remove("reveal");
            newalert.classList.add("success");
            const xLocal = newLocalStorage("Login Success");
            newMessage.innerHTML = `${localStorage.getItem("error")}`;
            setTimeout(() => {
              newalert.classList.remove("success");
              localStorage.setItem("user", JSON.stringify(options));
            }, 5000);
          }
        })
        .catch((err) => console.error(err));
    }
  };
  const GoogleAuthHandler = GoogleAuthSign;
  return (
    <div className="forms login">
      <form className="form_box" autoComplete="off" onSubmit={SubmitForm}>
        <p className="side_link">
          Don't have an account?
          <Link to="/signup">Signup</Link>
        </p>
        <h2>Enjoy high quality movies with Phimby</h2>
        <p>Login to access your intresting movies</p>
        <div className="input-fields">
          <label htmlFor="email" className="labels">
            Email Here
          </label>
          <input
            type="text"
            name=""
            id="email"
            placeholder="Email"
            ref={email}
          />
        </div>
        <div className="input-fields">
          <label htmlFor="password" className="labels">
            Password Here
          </label>
          <input
            type="text"
            name=""
            id="password"
            placeholder="Password"
            ref={password}
          />
        </div>
        {/* forget password */}
        <div className="btm">
          <Link to="/login" className="fgt">
            Forget Password
          </Link>
        </div>
        <div className="submit_button">
          <button>Login</button>
        </div>
        <div className="lineBreak">
          <p>or</p>
        </div>
        <div className="googleOAuth" onClick={GoogleAuthHandler}>
          <button>
            <img src="/google.png" alt="" /> Sign in with Google
          </button>
        </div>
      </form>
      <div className="alertBx" ref={gmessage}>
        <div className="alert-message" ref={message}>
          <i className="fa-regular fa-circle-exclamation"></i> This is an error
        </div>
      </div>
    </div>
  );
};
export default LoginPage;

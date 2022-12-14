import { newLocalStorage } from "../../LocalStorage/storage";
import { signupRef } from "../../References/SignupRef";
import { GoogleAuthSign } from "../GoogleAuth/AuthGoogle";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import "../../../styles/forms.css";

function SingupPage() {
  const username = useRef();
  const email = useRef();
  const password = useRef();
  const age = useRef();
  const message = useRef();
  const gmessage = useRef();
  const [Auth, setAuth] = useState(false);
  const SubmitForm = (e) => {
    const {
      usernameValue,
      emailValue,
      passwordValue,
      ageValue,
      newMessage,
      newalert,
    } = signupRef(username, email, password, age, message, gmessage);
    e.preventDefault();

    if (!usernameValue || !emailValue || !passwordValue || !ageValue) {
      const xLocal = newLocalStorage("Please fill all the required fields");
      newalert.classList.add("reveal");
      newMessage.innerHTML = `${localStorage.getItem("error")}`;
      setTimeout(() => {
        newalert.classList.remove("reveal");
      }, 5000);
    } else {
      createCrendentials(usernameValue, emailValue, passwordValue, ageValue);
    }
    async function createCrendentials(
      usernameValue,
      emailValue,
      passwordValue,
      ageValue
    ) {
      const createUID = Math.floor(
        Math.random() * (passwordValue.length + 5000 || 8000) // create a unique id for each credential in the database
      );
      const options = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: createUID,
          name: usernameValue,
          email: emailValue,
          password: passwordValue,
          age: parseInt(ageValue),
        }),
      };

      fetch("https://phimby-api.vercel.app/api/users/signup", options)
        .then((response) => {
          // return response;
          // if status code is 401 alert the user
          if (response.status === 406) {
            setAuth(false);
            const xLocal = newLocalStorage(
              "Unauthorized: You're younger than age of 18yrs"
            );
            newMessage.innerHTML = `${localStorage.getItem("error")}`;
            newalert.classList.add("reveal");
            newalert.classList.remove("success");
            setTimeout(() => {
              newalert.classList.remove("reveal");
            }, 5000);
          } else if (response.status === 401) {
            setAuth(false);
            const xLocal = newLocalStorage("Unauthorized: User already exists");
            newMessage.innerHTML = `${localStorage.getItem("error")}`;
            newalert.classList.add("reveal");
            newalert.classList.remove("success");
            setTimeout(() => {
              newalert.classList.remove("reveal");
            }, 5000);
          } else {
            setAuth(true)
            return response;
          }
        })
        .then((data) => {
          console.log(data);
          if (!Auth) {
            console.log("No authentication");
          } else {
            console.log("Auth present")
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
    <div className="forms signup">
      <form className="form_box" autoComplete="off" onSubmit={SubmitForm}>
        <p className="side_link">
          Already have an account?
          <Link to="/login">Login</Link>
        </p>
        <h2>Phimby High Quality Movies</h2>
        <p>Signup to access the app</p>
        <div className="input-fields">
          <label htmlFor="username" className="labels">
            Username Here
          </label>
          <input
            type="text"
            name=""
            id="username"
            placeholder="Username"
            ref={username}
          />
        </div>
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
        <div className="input-fields">
          <label htmlFor="age" className="labels">
            Age Here
          </label>
          <input type="text" name="" id="age" placeholder="Age" ref={age} />
        </div>
        {/* forget password */}
        <div className="btm">
          <Link to="/login" className="fgt">
            Forget Password
          </Link>
        </div>
        <div className="submit_button">
          <button>Signup</button>
        </div>
        <div className="lineBreak">
          <p>or</p>
        </div>
        <div className="googleOAuth" onClick={GoogleAuthHandler}>
          <button>
            <img src="/google.png" alt="" /> Sign up with Google
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
}
export default SingupPage;

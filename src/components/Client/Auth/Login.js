import { useRef } from "react";
import { Link } from "react-router-dom";
import { GoogleAuthSign } from '../GoogleAuth/AuthGoogle';
import "../../../styles/forms.css";
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
      alert("Please enter email address and password");
    }

    async function createCredentials(emailValue, passwordValue) {
      const createUID = Math.floor(
        Math.random() * (passwordValue.length + 5000 || 8000) // create a unique id for each credential in the database
      );
      console.log("createCredentials: " + emailValue + " " + passwordValue);
      console.log(createUID);

      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      var raw = JSON.stringify({
        email: emailValue,
        password: passwordValue,
      });

      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      await fetch(
        "https://phimby-api.vercel.app/api/users/login",
        requestOptions
      )
        .then((response) => {
          response.json();
          // if status code is 401 alert error
          if (response.status === 401) {
            alert("Invalid Credentials!");
          } else {
            return response;
          }
        })
        .then((result) => {
          console.log(result);
          const userobj = {
            email: emailValue,
            password: passwordValue,
          };
          localStorage.setItem("user", JSON.stringify(userobj));
          setTimeout(() => {
            window.location.pathname = "/";
          }, 5000);
        })
        .catch((error) => console.log("error", error));
    }
  };
  const GoogleAuthHandler = GoogleAuthSign
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
    </div>
  );
};
export default LoginPage;

import { GoogleAuthSign } from "../GoogleAuth/AuthGoogle";
import { useRef } from "react";
import { Link } from "react-router-dom";
import "../../../styles/forms.css";

function SingupPage() {
  const username = useRef();
  const email = useRef();
  const password = useRef();
  const age = useRef();
  const SubmitForm = (e) => {
    const usernameValue = username.current.value;
    const emailValue = email.current.value;
    const passwordValue = password.current.value;
    const ageValue = age.current.value;
    e.preventDefault();

    if (!usernameValue || !emailValue || !passwordValue || !ageValue) {
      alert("Please fill or the required fields 🛑");
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
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      var raw = JSON.stringify({
        id: createUID,
        name: usernameValue,
        email: emailValue,
        password: passwordValue,
        age: ageValue,
      });

      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      await fetch(
        "https://phimby-api.vercel.app/api/users/singup",
        requestOptions
      )
        .then((response) => {
          response.json();
          // if status code is 401 alert the user
          if (response.status === 401) {
            alert(response.message);
          } else {
            return response;
          }
        })
        .then((result) => {
          console.log(result);
          const userobj = {
            id: createUID,
            name: usernameValue,
            email: emailValue,
            password: passwordValue,
            age: ageValue,
            token: result.token,
          };
          localStorage.setItem("user", JSON.stringify(userobj));
          setTimeout(() => {
            window.location.pathname = "/";
          }, 5000);
        })
        .catch((error) => console.log("error", error));
    }
  };
  const GoogleAuthHandler = GoogleAuthSign;
  return (
    <div className="forms login">
      <form className="form_box" autoComplete="off" onSubmit={SubmitForm}>
        <p className="side_link">
          Already have an account?
          <Link to="/login">Login</Link>
        </p>
        <h2>Enjoy high quality movies with Phimby</h2>
        <p>Login to access your intresting movies</p>
        <div className="input-fields">
          <label htmlFor="username" className="labels">
            Email Here
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
          <button>Login</button>
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
    </div>
  );
}
export default SingupPage;

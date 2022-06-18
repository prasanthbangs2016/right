import AllImages from "../../Components/AllImages";
import "./login.scss";
import CommonModal from "../../Components/commonmodal";
import { useState } from "react";
import Message from "../../Components/TableTemplate/message";
function Login(props) {
  function LoginEvent(event) {
    var user = event.target[0].value;
    var pass = event.target[1].value;
    if (user == "admin" && pass == "admin") {
      localStorage.setItem("Ralogin", false);
      props.callback(false);
    }
    event.preventDefault();
  }
  return (
    <form onSubmit={LoginEvent}>
      <div className="login">
        <div className="Login">
          <div className="logoset">
            <img className="logo" src={AllImages.white_logo} alt="" />
          </div>
          <div className="loginBox">
            <h2>LOGIN</h2>
            <div className="loggedBox">
              <input
                className="textbox"
                placeholder="Enter User Name"
                type="text"
                name="user"
              />
              <input
                className="textbox"
                name="pass"
                placeholder="Password"
                type="password"
              />
              <div className="forgot">
                <CommonModal
                  data={{
                    heading: (
                      <a style={{ color: "#0791f8" }}>Forgot Password</a>
                    ),
                    header: "Forgot Password",
                    body: <ForgetPassword />,
                  }}
                />
              </div>
              <input className="submitButton" type="submit" value="Login" />
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
export default Login;
function ForgetPassword() {
  const callback = (value) => setModal(value);
  function Events(event) {
    var email = event.target[0].value;
    if (email === "") setError("Please enter a Email ID");
    else {
      setError("");
      setModal(
        <Message
          key="emailSent"
          callback={callback}
          data={{
            open: true,
            title: "",
            content:
              "An email has successfully been sent. Please log into your e-mail to reset your password",
          }}
        />
      );
    }
    event.preventDefault();
  }
  const [error, setError] = useState(false);
  const [modal, setModal] = useState("");
  return (
    <form onSubmit={Events}>
      {modal}
      <div className="forgetpassword">
        <div>
          <div>
            <label>User ID</label>
          </div>
          <input
            className="textbox"
            placeholder="Enter your email id"
            type="email"
          />
          <div className="error">{error}</div>
        </div>
        <input className="submitButton" type="submit" value="Submit" />
      </div>
    </form>
  );
}

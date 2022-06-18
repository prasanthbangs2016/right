import "./App.css";
import { useState } from "react";
import Routing from "./Components/routing";
import Header from "./Components/Header/header";
import SideMenu from "./Components/SideMenu/sidemenu";
import Login from "./Pages/Login/login";
import { useSelector } from "react-redux";
import LoadingScreen from "./Components/LoadingScreen/loadingscreen";
function App() {
  const [state, usestate] = useState(false);
  const [login, setLogin] = useState(true);
  const callback = (value) => usestate(value);
  const Logincallback = (value) => setLogin(value);
  const reducers = useSelector((state) => state.reduceR);
  let Load = reducers.loader.Loader;
  let logged = localStorage.getItem("Ralogin");
  return (
    <div>
      {Load === true ? <LoadingScreen /> : ""}
      {logged === "false" ? (
        <div className="MainPage">
          <div className={state === false ? "sideMenu w15" : "sideMenu w0"}>
            <SideMenu />
          </div>
          <div className={state === false ? "main main85" : "main main100"}>
            <Header callback={callback} />
            <div className="routingpage">
              <Routing />
            </div>
          </div>
        </div>
      ) : (
        <Login callback={Logincallback} />
      )}
    </div>
  );
}

export default App;

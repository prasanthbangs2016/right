import { GrLogout } from "react-icons/gr";
import { useSelector } from "react-redux";
import { FaBars } from "react-icons/fa";
import "./header.scss";
import { useState } from "react";
function Header(props) {
  let HeaderName = useSelector((state) => state.reduceR);
  const [sidebar, setSidebar] = useState(false);
  function LogOut(event) {
    localStorage.setItem("Ralogin", true);
  }
  return (
    <div className="Header">
      <span className="heading">
        <FaBars
          fontSize={20}
          style={{ cursor: "pointer" }}
          onClick={() => {
            setSidebar(!sidebar);
            props.callback(!sidebar);
          }}
        />
        <span style={{ marginLeft: 10 }}></span>
        {HeaderName.header}
      </span>
      <span className="right_header">
        <span>Admin</span>
        <span className="Log">
          <form onSubmit={LogOut}>
            <input className="logout" type="submit" value="Logout" />
          </form>
          <GrLogout size={24} />
        </span>
      </span>
    </div>
  );
}
export default Header;

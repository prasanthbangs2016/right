import "./permissions.scss";
import { Collapse } from "react-bootstrap";
import { SiAddthis } from "react-icons/si";
import { FaMinusSquare } from "react-icons/fa";
import { useState } from "react";
import AllImages from "../../../Components/AllImages";
const data = [
  {
    name: "Dashboard",
    list: [],
  },
  {
    name: "RA Tasker",
    list: [{ item: "Manage Taskers" }, { item: "Profile Verfication" }],
  },
  {
    name: "RA Service Requesters",
    list: [],
  },
  {
    name: "RA Bookings",
    list: [],
  },
  {
    name: "Service Categories",
    list: [],
  },
];
const crud = (
  <div className="subdata">
    <div className="crud">
      <span>Create</span> <input type="checkbox" />
    </div>
    <div className="crud">
      <span>Edit</span> <input type="checkbox" />
    </div>
    <div className="crud">
      <span>View</span> <input type="checkbox" />
    </div>
    <div className="crud">
      <span>Delete</span> <input type="checkbox" />
    </div>
  </div>
);
export default function Permissions(props) {
  return (
    <div className="Permissions">
      <div className="roleSelect">
        <label>Role</label>
        <select>
          <option value="superAdmin">Super Admin</option>
          <option value="Admin">Admin</option>
          <option value="customerSupport">Customer Support</option>
        </select>
      </div>
      <div>
        {data.map((item, i) => {
          return <Collapser key={i} data={item} />;
        })}
      </div>
      <div className="ModalButton">
        <center>
          <input
            type="submit"
            className="button"
            value="Save"
            style={{ backgroundColor: "#4285f4" }}
          />
          <input
            type="button"
            className="button"
            value="Cancel"
            style={{ backgroundColor: "grey" }}
            onClick={() => {
              props.callback(false);
            }}
          />
        </center>
      </div>
    </div>
  );
}
function Collapser(props) {
  let Data = props.data;
  const [collapse, setCollapse] = useState(false);
  return (
    <div className="collapser">
      <div
        onClick={() => setCollapse(!collapse)}
        aria-controls="data"
        aria-expanded={collapse}
      >
        {collapse === false ? (
          <SiAddthis size={20} style={{ marginRight: "10px" }} />
        ) : (
          <FaMinusSquare size={20} style={{ marginRight: "10px" }} />
        )}
        {Data.name}
      </div>
      <Collapse in={collapse}>
        <div className="collapse_items" id="data">
          {Data.list.length === 0
            ? crud
            : Data.list.map((item, i) => {
                return <Subcollapser name={item.item} key={i} />;
              })}
        </div>
      </Collapse>
    </div>
  );
}
function Subcollapser(props) {
  const [subcollapse, setsubCollapse] = useState(false);
  return (
    <div>
      <div
        onClick={() => setsubCollapse(!subcollapse)}
        aria-controls="subdata"
        aria-expanded={subcollapse}
      >
        {subcollapse === false ? (
          <SiAddthis
            size={20}
            style={{ marginRight: "10px", marginLeft: "15px" }}
          />
        ) : (
          <FaMinusSquare
            size={20}
            style={{ marginRight: "10px", marginLeft: "15px" }}
          />
        )}
        {props.name}
      </div>
      <Collapse in={subcollapse}>
        <div id="subdata">{crud}</div>
      </Collapse>
    </div>
  );
}

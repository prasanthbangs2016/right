import List from "../../../Components/TableTemplate/List";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ToggleButton from "../../../Components/ToggleButton/toggleButton";
import { GET } from "../../../API/api";
import { Loaders, CurrentID } from "../../../Redux/Reducers/reducers";
import Permissions from "./permissions";
import { Modal } from "react-bootstrap";
const create = {
  name: "Custom Role",
  nameKey: "rolename",
  fields: [
    { name: "Enter Role Name", type: "text" },
    {
      name: "Status",
      type: "selectbox",
      option: [
        { id: "Active", value: "Active" },
        { id: "Inactive", value: "Inactive" },
      ],
    },
  ],
  apiData: [
    { name: "rolename", type: "textbox" },
    { name: "b_status", type: "button" },
  ],
  addon: [{ name: "enabled", value: true }],
  api: {
    create: "",
    edit: "",
    delete: "",
  },
};
const Data = {
  Header: "Roles & Privileges",
  name: "Roles & Privileges",
  nameKey: "rolename",
  List: {
    columns: [
      { label: "S.No", field: "sno" },
      { label: "Role Name", field: "rolename" },
      { label: "Set Privilege", field: "setprivilege" },
      { label: "Status", field: "b_status" },
    ],
    rows: [
      {
        rolename: "Super Admin",
      },
      {
        rolename: "Admin",
      },
      {
        rolename: "Customer Support",
      },
    ],
  },
  filters: [],
  create: create,
};
export default function RolesPriviliges() {
  const dispatch = useDispatch();
  const reducers = useSelector((state) => state.reduceR);
  const [modal, setModal] = useState(false);
  const callback = (value) => {
    return setModal(value);
  };
  let Load = reducers.loader.Loader;
  useEffect(async () => {
    dispatch(CurrentID("mastercategoryid"));
    let row = Data.List.rows;
    row.map((item) => {
      item["b_status"] = (
        <ToggleButton data={{ state: item.enabled, disabled: true }} />
      );
      item["setprivilege"] = (
        <span
          onClick={() => setModal(true)}
          style={{
            color: "#33b5e5",
            textDecoration: "underline",
            cursor: "pointer",
          }}
        >
          Privilege
        </span>
      );
      return "";
    });
  }, []);
  return (
    <>
      <Modal backdrop={"static"} show={modal} onHide={() => setModal(false)}>
        <Modal.Header>Roles & Privileges</Modal.Header>
        <Modal.Body>
          <Permissions callback={callback} />
        </Modal.Body>
      </Modal>
      <div>{Load === false ? <List data={Data} /> : ""}</div>
    </>
  );
}

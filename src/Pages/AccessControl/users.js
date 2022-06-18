import List from "../../Components/TableTemplate/List";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GET } from "../../API/api";
import { Loaders, CurrentID } from "../../Redux/Reducers/reducers";
import OptionGenerate from "../../Components/optionsGenerate";
import { BsKeyFill } from "react-icons/bs";
import { Modal } from "react-bootstrap";
import Message from "../../Components/TableTemplate/message";
const create = {
  name: "New User",
  nameKey: "firstName",
  fields: [
    { name: "First Name", type: "text" },
    { name: "Last Name", type: "text" },
    {
      name: "Role",
      type: "selectbox",
      option: [
        { id: "Super Admin", value: "Super Admin" },
        { id: "Admin", value: "Admin" },
        { id: "Engineer", value: "Engineer" },
        { id: "Customer Support", value: "Customer Support" },
      ],
    },
    { name: "Phone Number", type: "number" },
    { name: "Email ID", type: "email" },
    {
      name: "Status",
      type: "selectbox",
      option: [
        { id: "Active", value: "Active" },
        { id: "inactive", value: "InActive" },
      ],
    },
    { name: "Password", type: "password", addon: "create" },
    {
      name: "Confirm Password",
      type: "password",
      addon: "create",
    },
    {
      name: "Select Reason for Edit",
      type: "selectbox",
      option: [
        { id: "Name", value: "Name Change" },
        { id: "Role", value: "Role Change" },
        { id: "Phone", value: "Phone Number Change" },
        { id: "Email", value: "Email ID Change" },
        { id: "Status", value: "Status Change" },
        { id: "Other", value: "Other" },
      ],
      addon: "edit",
    },
  ],
  apiData: [
    { name: "firstName", type: "textbox" },
    { name: "lastName", type: "textbox" },
    { name: "role", type: "selectbox" },
    { name: "phoneNumber", type: "textbox" },
    { name: "emailID", type: "textbox" },
    { name: "status", type: "selectbox" },
    { name: "password", type: "textbox" },
    { name: "confirmPassword", type: "textbox" },
    { name: "editReason", type: "selectbox" },
  ],
  addon: [],
  api: {
    create: "",
    edit: "",
    delete: "",
  },
};
const Data = {
  Header: "Admin Users",
  name: "Users",
  nameKey: "firstName",
  List: {
    columns: [
      { label: "S.No", field: "sno" },
      { label: "First Name", field: "firstName" },
      { label: "Last Name", field: "lastName" },
      { label: "Role", field: "role" },
      { label: "Phone Number", field: "phoneNumber" },
      { label: "Email ID", field: "emailID" },
      { label: "Logins", field: "logins" },
      { label: "Last Logins", field: "lastLogin" },
      { label: "Status", field: "status" },
      { label: "Action", field: "action" },
    ],
    rows: [
      {
        firstName: "Scott",
        lastName: "Martin",
        role: "Admin",
        phoneNumber: "4848733661",
        emailID: "scottMartin@gmail.com",
        logins: 15,
        lastLogin: "07-04-21 10:20am",
        status: "Active",
        password: "123456789",
        confirmPassword: "123456789",
        editReason: "",
      },
    ],
  },
  filters: [
    { name: "Select by", option: ["USA", "Russia", "India"] },
    { name: "From Date", type: "dateBox" },
    { name: "To Date", type: "dateBox" },
    { name: "Country", option: ["USA", "Russia", "India"] },
    { name: "Region", option: ["All Cities"] },
    { name: "State", option: ["All States", "New York"] },
  ],
  create: create,
};
export default function Users() {
  const dispatch = useDispatch();
  const reducers = useSelector((state) => state.reduceR);
  const [show, setShow] = useState(false);
  const [modal, setModal] = useState(false);
  let Load = reducers.loader.Loader;
  const callback = (value) => {
    setModal(value);
  };
  useEffect(async () => {
    dispatch(CurrentID("categoryid"));
    Data.List.rows.map((item, i) => {
      item["logins"] = <span className="boldblue">{item["logins"]}</span>;
    });
    //dispatch(Loaders({ Loader: true, Error: false }));
  }, []);
  return (
    <div>
      {modal}
      <Modal
        backdrop={"static"}
        size="sm"
        show={show}
        onHide={() => setShow(false)}
      >
        <Modal.Header>Reset Password</Modal.Header>
        <Modal.Body>
          <div className="Resetpassword">
            <div className="formBox">
              <span className="boxLabel">New Password</span>
              <input className="inputBox" type="text" />
              <span className="Error"></span>
            </div>
            <div className="formBox">
              <span className="boxLabel">Confirm New Password</span>
              <input className="inputBox" type="text" />
              <span className="Error"></span>
            </div>
            <div className="ModalButton">
              <center>
                <input
                  type="submit"
                  className="button"
                  value={"Reset"}
                  style={{ backgroundColor: "#4285f4" }}
                  onClick={() => {
                    setShow(false);
                    setModal(
                      <Message
                        key="resetPassword"
                        callback={callback}
                        data={{
                          open: true,
                          title: "",
                          content: "Your password is changed successfully",
                        }}
                      />
                    );
                  }}
                />
                <input
                  type="button"
                  className="button"
                  value="Cancel"
                  style={{ backgroundColor: "grey" }}
                  onClick={() => {
                    setShow(false);
                  }}
                />
              </center>
            </div>
          </div>
        </Modal.Body>
      </Modal>
      {Load === false ? (
        <List
          data={Data}
          actioncustom={
            <BsKeyFill color="black" size={18} onClick={() => setShow(true)} />
          }
        />
      ) : (
        ""
      )}
    </div>
  );
}

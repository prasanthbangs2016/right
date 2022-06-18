import List from "../../Components/TableTemplate/List";
import { useEffect, useState } from "react";
import ToggleButton from "../../Components/ToggleButton/toggleButton";
import { Modal } from "react-bootstrap";
import Message from "../../Components/TableTemplate/message";
import Denominations from "./denominations";
const headingStyle = {
  fontWeight: "bold",
  position: "absolute",
  fontSize: "18px",
};
const create = {
  name: "New Credit Plan",
  nameKey: "CreditPlan",
  fields: [
    { name: "Credit Plan", type: "text" },
    { name: "Start Date", type: "date" },
    { name: "End Date", type: "date" },
    { name: "", type: "button" },
  ],
  apiData: [
    { name: "CreditPlan", type: "textbox" },
    { name: "StartDate", type: "date" },
    { name: "EndDate", type: "date" },
    { name: "Status", type: "button" },
  ],
  addon: [{ name: "enabled", value: true }],
  api: {
    create: "",
    edit: "",
    delete: "",
  },
};
const Data = {
  Header: "Credit Configuration and Denomination",
  name: "Credit Configuration",
  nameKey: "CreditPlan",
  List: {
    columns: [
      { label: "S.No", field: "sno" },
      { label: "Credit Plan", field: "CreditPlan" },
      { label: "Start Date", field: "StartDate" },
      { label: "End Date", field: "EndDate" },
      { label: "Status", field: "b_status" },
      { label: "", field: "configure" },
      { label: "Action", field: "action" },
    ],
    rows: [
      {
        CreditPlan: "Thanks Giving",
        StartDate: "08-06-2021",
        EndDate: "08-10-2021",
      },
    ],
  },
  filters: [],
  create: create,
};
export default function CreditConfiguration() {
  const [modal, setModal] = useState(false);
  const [show, setShow] = useState(false);
  const callback = (value) => {
    setModal(value);
  };
  useEffect(() => {
    let row = Data.List.rows;
    row.map((item) => {
      item["b_status"] = (
        <ToggleButton data={{ state: item.enabled, disabled: true }} />
      );
      item["configure"] = (
        <span
          style={{
            color: "blue",
            textDecoration: "underline",
            cursor: "pointer",
          }}
          onClick={() => {
            setShow({ modal: true, value: item.CreditPlan });
            console.log(show);
          }}
        >
          Configure
        </span>
      );
      return "";
    });
  });
  return (
    <>
      {modal}
      <Modal
        size="sm"
        show={show.modal}
        onHide={() => setShow({ modal: false, value: "" })}
        backdrop={"static"}
      >
        <Modal.Header>Credit Configuration</Modal.Header>
        <Modal.Body>
          <center>
            <span>
              <span>1 Credit=</span>
              <span style={{ marginLeft: "5px" }}>
                $<input type="number" />
              </span>
            </span>
          </center>
          <div className="ModalButton">
            <center>
              <input
                type="submit"
                className="button"
                value={"Save"}
                style={{ backgroundColor: "#4285f4" }}
                onClick={() => {
                  setShow({ modal: false, value: "" });
                  setModal(
                    <Message
                      key="resetPassword"
                      callback={callback}
                      data={{
                        open: true,
                        title: "",
                        content:
                          "Credit Configuration for " +
                          show.value +
                          " credit plan has been saved successfully",
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
                  setShow({ modal: false, value: "" });
                }}
              />
            </center>
          </div>
        </Modal.Body>
      </Modal>
      <div>
        <div style={headingStyle}>Credit Configuration</div>
        <List data={Data} />
      </div>
      <div>
        <div style={headingStyle}>Denominations</div>
        <Denominations />
      </div>
    </>
  );
}

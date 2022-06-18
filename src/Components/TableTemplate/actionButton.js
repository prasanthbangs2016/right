import { useState } from "react";
import { FaTrashAlt, FaEdit } from "react-icons/fa";
import CreateEdit from "./createEdit";
import Message from "./message";
import { useSelector } from "react-redux";
import { DELETE } from "../../API/api";
import CommonModal from "../commonmodal";
function ActionButtons(props) {
  let create = props.data;
  let deleteApi = create.api.delete;
  let rows = props.rowValues;
  let nameKey = props.nameKey;
  let CutomComponent = props.CutomComponent;
  let actionED = props.actionED;
  let ID = rows[useSelector((state) => state.reduceR).ID];
  const [modal, setModal] = useState(null);
  function callback(value) {
    if (value.key === "yes") {
      DELETE(deleteApi + ID).then((response) => {
        if (response.status === 200) {
          setModal(value);
        }
      });
    } else {
      setModal(value);
    }
  }
  return (
    <div className="ActionButtons">
      {actionED === undefined ? (
        <CommonModal
          customCallback={callback}
          data={{
            heading: (
              <FaEdit color="black" size={18} style={{ marginRight: "10px" }} />
            ),
            header: "Edit " + create.name,
            size: "",
            body: (
              <CreateEdit
                key="Edit"
                rows={rows}
                data={{
                  open: true,
                  type: "Edit",
                  title: rows[nameKey],
                  data: create,
                  id: ID,
                }}
              />
            ),
          }}
        />
      ) : (
        ""
      )}
      <CommonModal
        customCallback={callback}
        data={{
          heading: (
            <FaTrashAlt
              color="black"
              size={18}
              style={{ marginRight: "10px" }}
            />
          ),
          header: "Delete " + rows[nameKey],
          size: "sm",
          body: (
            <Message
              key="delete"
              data={{
                title: "Delete " + rows[nameKey],
                name: rows[nameKey],
                content:
                  "Are you sure you want to delete " + rows[nameKey] + " ?",
              }}
            />
          ),
        }}
      />
      {CutomComponent}
      {modal}
    </div>
  );
}
export default ActionButtons;

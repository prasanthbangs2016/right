import React, { useState } from "react";
import { MDBDataTable } from "mdbreact";
import CreateEdit from "./createEdit";
import ActionButtons from "./actionButton";
import { useDispatch } from "react-redux";
import { Headers } from "../../Redux/Reducers/reducers";
import { useEffect } from "react";
import ToggleButton from "../ToggleButton/toggleButton";
import CommonModal from "../commonmodal";
import "./list.scss";
function List(props) {
  let Filters = props.data.filters;
  let create = props.data.create;
  let list = props.data.List;
  let HeaderName = props.data.Header;
  let nameKey = props.data.nameKey;
  let Addbutton = props.data.add;
  let ActioncustomComponent = props.actioncustom;
  let actionED = props.actionED;
  const [modal, setModal] = useState(null);
  const dispatch = useDispatch();
  function callback(value) {
    setModal(value);
  }
  useEffect(() => {
    let row = list.rows;
    row.map((item, i) => {
      item["sno"] = i + 1;
      item["action"] = (
        <ActionButtons
          actionED={actionED}
          data={create}
          key={"action" + i}
          nameKey={nameKey}
          rowValues={row[i]}
          CutomComponent={ActioncustomComponent}
        />
      );
      item["b_status"] = (
        <ToggleButton
          key={"status" + i}
          data={{ state: item.status, disabled: true }}
        />
      );
      item["bgcheck"] = (
        <ToggleButton
          key={"bgcheck" + i}
          data={{ state: item.bgcheck, disabled: true }}
        />
      );
      return "";
    });
    dispatch(Headers(HeaderName));
  }, []);
  return (
    <div className="TemplateList">
      {modal}
      {Addbutton === false ? (
        ""
      ) : (
        <CommonModal
          data={{
            heading: <button className="addNew">Add New</button>,
            header: "Create " + create.name,
            body: (
              <CreateEdit
                key="create"
                callback={callback}
                data={{
                  open: true,
                  type: "Create",
                  data: create,
                }}
              />
            ),
          }}
        />
      )}
      <div className="filters">
        {Filters.map((item, i) => {
          return (
            <div className="Filter" key={item.name}>
              {item.type === "dateBox" ? (
                <div key={item.name} className="filterBox">
                  <span className="label">{item.name}</span>
                  <input
                    type="date"
                    placeholder="mm/dd/yyyy"
                    style={{
                      padding: "4px",
                      borderRadius: "5px",
                      border: "2px solid #80808085",
                    }}
                  />
                </div>
              ) : (
                <div key={item.name} className="filterBox">
                  <span className="label">{item.name}</span>
                  <select className="selectBox">
                    {item.option.map((item, i) => {
                      return (
                        <option value={item} key={item}>
                          {item}
                        </option>
                      );
                    })}
                  </select>
                </div>
              )}
            </div>
          );
        })}
      </div>
      <MDBDataTable small data={list} responsive />
    </div>
  );
}
export default List;

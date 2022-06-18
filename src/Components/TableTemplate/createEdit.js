import { useState } from "react";
import Message from "./message";
import ToggleButton from "../ToggleButton/toggleButton";
import { POST, PUT } from "../../API/api";
import { useSelector } from "react-redux";
import Multiselect from "multiselect-react-dropdown";
import PhoneInput from "react-phone-number-input/input";
import CommonModal from "../commonmodal";
import UploadField from "./upload_field";
import "./list.scss";
function CreateEdit(props) {
  const [error, setError] = useState(false);
  const [value, setValue] = useState();
  const [modal, setModal] = useState("");
  let UploadStatus = "";
  let Uploadcallback = (values) => (UploadStatus = values);
  let key = useSelector((state) => state.reduceR).ID;
  let ID = props.data.id;
  let buttonName = props.buttonName;
  let nameKey = props.data.data.nameKey;
  let data = props.data.data.fields;
  let title = props.data.data.name;
  let rowData = props.rows;
  let type = props.data.type;
  let api = props.data.data.api;
  let apiData = props.data.data.apiData;
  let newDate = new Date();
  let addonData = props.data.data.addon;
  let APP = {
    createdby: 777,
    createdon: newDate.toISOString(),
    modifiedby: 777,
    modifiedon: newDate.toISOString(),
  };
  let Error = [];
  let Errorcheck = (value) => setError(value);
  function Eventsubmit(event) {
    if (addonData.length !== 0) {
      addonData.map((item, i) => {
        return (APP[item.name] = item.value);
      });
    }
    for (var i = 0; i <= event.target.length - 3; i++) {
      console.log(event.target[i]);
      let value =
        apiData[i].type === "button"
          ? event.target[i].checked
          : event.target[i].value;
      if (apiData[i].type === "selectbox")
        APP[apiData[i].name] = parseInt(value);
      else if (
        apiData[i].type === "upload" &&
        type !== "Create" &&
        value.toString() === ""
      )
        APP[apiData[i].name] = rowData[apiData[i].name];
      else if (apiData[i].type === "upload") {
        APP[apiData[i].name] = value.split(/(\\|\/)/g).pop();
      } else APP[apiData[i].name] = value;
      // console.log(value);
      // console.log(APP);

      if (value === "") {
        if (apiData[i].type === "textbox" || apiData[i].type === "numberbox")
          Error[i] = data[i].name + " must not be empty";
        else if (apiData[i].type === "selectbox")
          Error[i] = data[i].name + " must not be empty";
        else if (apiData[i].type === "upload" && type === "Create")
          Error[i] = "Please select a file";
      } else {
        Error[i] = null;
      }
      var Noerrorexist = Error.every((value) => value === null);
      if (Noerrorexist) {
        if (apiData[i].type === "upload") {
          POST("FilesandImages/UploadFileorImage", UploadStatus).then(
            (response) => {
              console.log(response);
              if (response.status !== 200) {
                Error[i] = "Unable to upload image";
              }
            }
          );
        }
      }
    }
    Errorcheck(Error);
    var NoerrorExist = Error.every((value) => value === null);
    if (NoerrorExist) {
      //console.log(APP);
      if (type === "Create") {
        POST(api.create, APP).then((response) => {
          if (response.status === 200) {
            setModal(
              <CommonModal
                data={{
                  open: true,
                  heading: "",
                  header: "",
                  size: "",
                  body: (
                    <Message
                      key="success"
                      data={{
                        open: true,
                        title: "",
                        content:
                          title +
                          ' "' +
                          APP[nameKey] +
                          '"' +
                          " has been created successfully",
                      }}
                    />
                  ),
                }}
              />
            );
          } else if (response.status === 409) {
            setModal(
              <CommonModal
                data={{
                  open: true,
                  heading: "",
                  header: "",
                  size: "",
                  body: (
                    <Message
                      key="conflict"
                      data={{
                        open: true,
                        title: "",
                        content:
                          title + ' "' + APP[nameKey] + '"' + " already exists",
                      }}
                    />
                  ),
                }}
              />
            );
          } else if (response.status === 500) {
            setModal(
              <CommonModal
                data={{
                  open: true,
                  heading: "",
                  header: "",
                  size: "",
                  body: (
                    <Message
                      key="conflict"
                      data={{
                        open: true,
                        title: "",
                        content: "Something went wrong",
                      }}
                    />
                  ),
                }}
              />
            );
          }
        });
      } else {
        APP[key] = ID;
        PUT(api.edit, APP).then((response) => {
          if (response.status === 200) {
            setModal(
              <CommonModal
                data={{
                  open: true,
                  heading: "",
                  header: "",
                  size: "sm",
                  body: (
                    <Message
                      key="success"
                      data={{
                        open: true,
                        title: "",
                        content:
                          title +
                          ' "' +
                          APP[nameKey] +
                          '"' +
                          " has been updated successfully",
                      }}
                    />
                  ),
                }}
              />
            );
          } else if (response.status === 409) {
            setModal(
              <CommonModal
                data={{
                  open: true,
                  heading: "",
                  header: "",
                  size: "",
                  body: (
                    <Message
                      key="conflict"
                      data={{
                        open: true,
                        title: "",
                        content:
                          title + ' "' + APP[nameKey] + '"' + " already exists",
                      }}
                    />
                  ),
                }}
              />
            );
          } else if (response.status === 500) {
            setModal(
              <CommonModal
                data={{
                  open: true,
                  heading: "",
                  header: "",
                  size: "",
                  body: (
                    <Message
                      key="conflict"
                      data={{
                        open: true,
                        title: "",
                        content: "Something went wrong",
                      }}
                    />
                  ),
                }}
              />
            );
          }
        });
      }
    }
    event.preventDefault();
  }
  return (
    <div>
      {modal}
      <form onSubmit={Eventsubmit}>
        <div className="Box">
          {data.map((item, i) => {
            if (item.addon === "create" && type === "Create") {
              return FieldBoxes(item, i);
            } else if (item.addon === "edit" && type === "Edit") {
              console.log(item);
              return FieldBoxes(item, i);
            }
            if (item.addon === undefined) {
              return FieldBoxes(item, i);
            }
            return "";
          })}
        </div>
        <div className="ModalButton">
          <center>
            <input
              type="submit"
              className="button"
              value={
                buttonName !== undefined
                  ? buttonName
                  : type === "Edit"
                  ? "Update"
                  : "Create"
              }
              style={{ backgroundColor: "#4285f4" }}
            />
            <input
              type="button"
              className="button"
              value="Cancel"
              style={{ backgroundColor: "grey" }}
              onClick={() => props.callback(false)}
            />
          </center>
        </div>
      </form>
    </div>
  );
  function FieldBoxes(item, i) {
    var defaultValue = "Select File";
    if (item.type === "file") {
      if (type === "Edit") defaultValue = rowData[apiData[i].name];
      else defaultValue = "Select File";
    }
    if (item.type === "selectbox") {
      return (
        <div className="formBox" key={i}>
          <span className="boxLabel">{item.name}</span>
          <select
            className={
              item.disabled === type ? "selectBox disabledBox" : "selectBox"
            }
            defaultValue={type === "Edit" ? rowData[apiData[i].name] : ""}
            disabled={item.disabled === type ? "disabled" : ""}
          >
            {item.option.map((item, i) => {
              return (
                <option value={item.id} key={i}>
                  {item.value}
                </option>
              );
            })}
          </select>
          <span className="Error">{error[i]}</span>
        </div>
      );
    } else if (item.type === "multiBox") {
      return (
        <div className="formBox" key={i}>
          <span className="boxLabel">{item.name}</span>
          <Multiselect
            displayValue="value"
            showCheckbox
            options={item.option}
            selectedValues={
              type === "Edit"
                ? rowData[apiData[i].name].map((item) => {
                    return { id: item, value: item };
                  })
                : ""
            }
          />
          <span className="Error">{error[i]}</span>
        </div>
      );
    } else if (item.type === "file") {
      return (
        <UploadField
          key={i}
          callback={Uploadcallback}
          data={{
            name: item.name,
            type: type,
            disabled: item.disabled,
            defaultValue: defaultValue,
            errorvalue: error[i],
          }}
        />
      );
    } else if (item.type === "button") {
      return (
        <div className="toogleButton" key={i}>
          <span className="tb">
            <span className="boxLabel">Status</span>
            <ToggleButton
              data={{
                state: type === "Edit" ? rowData[apiData[i].name] : "",
                disabled: false,
              }}
            />
          </span>
        </div>
      );
    } else if (item.type === "bgcheck") {
      return (
        <div className="toogleButton" key={i}>
          <span className="tb">
            <span className="boxLabel">BG Check</span>
            <ToggleButton
              data={{
                state: type === "Edit" ? rowData[apiData[i].name] : "",
                disabled: false,
              }}
            />
          </span>
        </div>
      );
    } else if (item.type === "PhoneNumber") {
      return (
        <div className="formBox" key={i}>
          <span className="boxLabel">{item.name}</span>
          <PhoneInput
            length="10"
            className="inputBox"
            country="US"
            value={type === "Edit" ? "+1" + rowData[apiData[i].name] : value}
            onChange={setValue}
          />
          <span className="Error">{error[i]}</span>
        </div>
      );
    } else
      return (
        <div className="formBox" key={i}>
          <span className="boxLabel">{item.name}</span>
          <input
            style={item.type === "textarea" ? { height: "100px" } : {}}
            className={
              item.disabled === type ? "inputBox disabledBox" : "inputBox"
            }
            type={item.type}
            defaultValue={type === "Edit" ? rowData[apiData[i].name] : ""}
            disabled={item.disabled === type ? "disabled" : ""}
          />
          <span className="Error">{error[i]}</span>
        </div>
      );
  }
}
export default CreateEdit;

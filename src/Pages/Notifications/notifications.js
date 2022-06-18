import List from "../../Components/TableTemplate/List";
import { HiMail } from "react-icons/hi";
import Message from "../../Components/TableTemplate/message";
import { useEffect, useState } from "react";
import { GrAttachment, GrSchedulePlay } from "react-icons/gr";
import CommonModal from "../../Components/commonmodal";
import CreateEdit from "../../Components/TableTemplate/createEdit";
import "./notifications.scss";
const create = {
  name: "Notification Settings",
  nameKey: "NotificationTitle",
  fields: [
    {
      name: "Notification Title",
      type: "text",
    },
    {
      name: "Purpose/Reason",
      type: "selectbox",
      option: [
        { id: "", value: "General" },
        { id: "", value: "Campaign" },
        { id: "", value: "Technical error" },
        { id: "", value: "Maintenance downtime" },
        { id: "", value: "Others" },
      ],
    },
    {
      name: "Start Data and Time",
      type: "datetime-local",
    },
    {
      name: "End Data and Time",
      type: "datetime-local",
    },
    {
      name: "Message To",
      type: "selectbox",
      option: [],
    },
    {
      name: "Message",
      type: "textarea",
    },
  ],
  apiData: [
    {
      name: "NotificationTitle",
      type: "textbox",
    },
    {
      name: "PurposeReason",
      type: "selectbox",
    },
    {
      name: "MessageStartDate",
      type: "datetime-local",
    },
    {
      name: "MessageEndDate",
      type: "datetime-local",
    },
    {
      name: "to",
      type: "selectbox",
      option: [],
    },
    {
      name: "Message",
      type: "textarea",
    },
  ],
  addon: [],
  api: {
    create: "",
    edit: "",
    delete: "",
  },
};
const Data = {
  Header: "Notification Settings",
  name: "Notification Settings",
  nameKey: "NotificationTitle",
  List: {
    columns: [
      { label: "S.No", field: "sno" },
      { label: "Notification Title", field: "NotificationTitle" },
      { label: "Message", field: "Message" },
      { label: "Purpose/Reason", field: "PurposeReason" },
      { label: "To", field: "to" },
      { label: "Message Status", field: "MessageStatus" },
      { label: "Reached Users", field: "ReachedUsers" },
      { label: "Message Date", field: "MessageCreationDate" },
      //{ label: "Message Start Date", field: "MessageStartDate" },
      //{ label: "Message End Date", field: "MessageEndDate" },
      { label: "Action", field: "action" },
      { label: "", field: "Customaction" },
    ],
    rows: [
      {
        NotificationTitle: "New App Update",
        Message: "New Version of app is available, click here to update",
        PurposeReason: "App updates",
        to: "RA Requesters",
        MessageStatus: "Pending",
        ReachedUsers: "10",
        MessageCreationDate: "12-07-2021",
        MessageStartDate: "12-07-2021",
        MessageEndDate: "12-08-2021",
      },
      {
        NotificationTitle: "New App",
        Message: "New Version of app is available, click here to update",
        PurposeReason: "App updates",
        to: "RA Requesters",
        MessageStatus: "Pending",
        ReachedUsers: "10",
        MessageCreationDate: "12-07-2021",
        MessageStartDate: "12-07-2021",
        MessageEndDate: "12-08-2021",
      },
    ],
  },
  filters: [],
  create: create,
};
export default function Notifications() {
  useEffect(() => {
    Data.List.rows.map((item, i) => {
      item["Customaction"] = (
        <CommonModal
          key={i}
          data={{
            heading: (
              <GrSchedulePlay
                color="black"
                size={18}
                style={{ marginRight: "10px" }}
              />
            ),
            header: "Schedule Notifications",
            body: (
              <CreateEdit
                key={"schedule" + i}
                buttonName="Schedule"
                schedule={true}
                rows={item}
                data={{
                  open: true,
                  type: "Edit",
                  title: create.nameKey,
                  data: create,
                }}
              />
            ),
          }}
        />
      );
    });
  }, []);
  return (
    <div>
      <List
        data={Data}
        actioncustom={
          <CommonModal
            data={{
              heading: (
                <HiMail
                  color="black"
                  size={18}
                  style={{ marginRight: "10px" }}
                />
              ),
              header: "Email Notifications",
              body: <Email />,
            }}
          />
        }
      />
    </div>
  );
}
function Email(props) {
  const [fileName, setfileName] = useState("");
  return (
    <div className="Resetpassword notifications">
      <div className="formBoxs">
        <span className="boxLabel">To Name:</span>
        <input className="inputBox" type="text" />
      </div>
      <div className="formBoxs">
        <span className="boxLabel">To Address:</span>
        <input className="inputBox" type="email" />
      </div>
      <div className="formBoxs">
        <span className="boxLabel">CC:</span>
        <input className="inputBox" type="email" />
      </div>
      <div className="formBoxs">
        <span className="boxLabel">Subject:</span>
        <input className="inputBox" type="text" />
      </div>
      <div className="formBoxs">
        <span className="boxLabel">Attachment:</span>
        <span className="inputBox" style={{ paddingLeft: "5px" }}>
          <span className="fileName">{fileName}</span>
          <label className="filetype" htmlFor="file-upload">
            <GrAttachment />
            <input
              id="file-upload"
              style={{ display: "none" }}
              type="file"
              name="file"
              onChange={(event) => {
                setfileName(event.target.files[0].name);
              }}
            />
          </label>
        </span>
      </div>
      <div className="formBoxs">
        <input
          className="inputBox"
          type="textarea"
          style={{ height: "100px", width: "100%", marginTop: "10px" }}
        />
      </div>
      <div className="ModalButton">
        <center>
          <CommonModal
            data={{
              heading: (
                <input
                  type="submit"
                  className="button"
                  value={"Send"}
                  style={{ backgroundColor: "#4285f4" }}
                />
              ),
              header: "Email Notifications",
              body: (
                <Message
                  key="emailNotification"
                  //callback={callback}
                  data={{
                    open: true,
                    title: "",
                    content: "Email Sent sucessfully",
                  }}
                />
              ),
            }}
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
    </div>
  );
}

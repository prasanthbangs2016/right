import List from "../../../Components/TableTemplate/List";
import { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import Verfication from "./verfication";
import { AiOutlineClose } from "react-icons/ai";
export default function ProfileVerfication() {
  const [modal, setModal] = useState(false);
  const Data = {
    Header: "Profile Verfication",
    name: "Profile Verfication",
    nameKey: "fullname",
    add: false,
    List: {
      columns: [
        { label: "S.No", field: "sno" },
        { label: "Full Name", field: "fullname" },
        { label: "Master Category", field: "mastercategory" },
        { label: "Email", field: "email" },
        { label: "Phone Numbers", field: "phoneNumber" },
        { label: "Reference Check Status", field: "reference_check" },
        { label: "BG Check", field: "bgcheck" },
      ],
      rows: [
        {
          fullname: "Billy",
          mastercategory: "Haircut",
          email: "Billy@pena4.com",
          phoneNumber: "239-445-5572",
          ReferenceCheckStatus: "Pending",
          bgcheck: "Submitted",
        },
        {
          fullname: "Billy",
          mastercategory: "Haircut",
          email: "Billy@pena4.com",
          phoneNumber: "239-445-5572",
          ReferenceCheckStatus: "Approved",
          bgcheck: "Submitted",
        },
      ],
    },
    filters: [],
    create: null,
  };
  useEffect(() => {
    Data.List.rows.map((item, i) => {
      item["sno"] = i + 1;
      item["reference_check"] = (
        <div key={i}>
          {item.ReferenceCheckStatus}
          <br />
          {item.ReferenceCheckStatus === "Pending" ? (
            <span
              style={{
                color: "#33b5e5",
                textDecoration: "underline",
                cursor: "pointer",
              }}
              onClick={() => {
                console.log("befsfr");
                setModal(true);
              }}
            >
              Verify
            </span>
          ) : (
            ""
          )}
        </div>
      );
    });
  });
  return (
    <>
      <Modal
        show={modal}
        size="lg"
        onHide={() => setModal(false)}
        backdrop={"static"}
      >
        <Modal.Header>
          Profile Verfication
          <AiOutlineClose
            style={{ float: "right" }}
            onClick={() => setModal(false)}
          />
        </Modal.Header>
        <Modal.Body>
          <Verfication />
        </Modal.Body>
      </Modal>
      <List data={Data} />
    </>
  );
}

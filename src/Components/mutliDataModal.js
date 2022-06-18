import { useState } from "react";
import { Modal } from "react-bootstrap";
import { GrClose } from "react-icons/gr";
const st = {
  boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
  width: "auto",
  padding: "5px",
  margin: "5px",
  width: "fit-content",
  background: "black",
  borderRadius: "10px",
  color: "white",
};
const row = {
  display: "grid",
  gridTemplateColumns: "auto auto auto",
};
export default function MultiDataModal(props) {
  const [modal, setModal] = useState(false);
  return (
    <>
      <Modal show={modal} onHide={() => setModal(false)}>
        <Modal.Header>
          {props.data.header}
          <span onClick={() => setModal(false)}>
            <GrClose />
          </span>
        </Modal.Header>
        <Modal.Body>
          <div style={row}>
            {props.data.Data.map((item, i) => {
              return (
                <div style={st} key={i}>
                  {item}
                </div>
              );
            })}
          </div>
        </Modal.Body>
      </Modal>
      <span>{props.name}</span>
      <span
        style={{
          marginLeft: "10px",
          color: "skyblue",
          cursor: "pointer",
          textDecoration: "underline",
        }}
        onClick={() => {
          setModal(true);
        }}
      >
        ...View More
      </span>
    </>
  );
}

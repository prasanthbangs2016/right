import { cloneElement, useState } from "react";
import { Modal } from "react-bootstrap";
import { AiOutlineClose } from "react-icons/ai";
export default function CommonModal(props) {
  const [modal, SetModal] = useState(props.data.open);
  const callback = (value) => {
    SetModal(value);
    if (props.customCallback !== undefined) props.customCallback(value);
  };
  const heading = props.data.heading;
  const header = props.data.header;
  const body = props.data.body;
  const size = props.data.size;
  const fullscreen = props.data.screen;
  return (
    <>
      <Modal
        backdrop={"static"}
        show={modal}
        size={size}
        onHide={() => SetModal(false)}
        className={fullscreen}
      >
        {header !== "" ? (
          <Modal.Header>
            {header}
            <span onClick={() => SetModal(false)}>
              <AiOutlineClose />
            </span>
          </Modal.Header>
        ) : (
          ""
        )}
        <Modal.Body>{cloneElement(body, { callback: callback })}</Modal.Body>
      </Modal>
      <span onClick={() => SetModal(true)}>{heading}</span>
    </>
  );
}

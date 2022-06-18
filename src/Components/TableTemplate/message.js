import CommonModal from "../commonmodal";
import "./list.scss";
function Message(props) {
  var content = props.data.content;
  var title = props.data.title;
  var name = props.data.name;
  return (
    <div className="messageModal">
      <div>
        <center>
          <p>{content}</p>
        </center>
        <div className="ModalButton">
          {title !== "" ? (
            <center>
              <input
                type="button"
                className="button"
                value="Yes"
                style={{ backgroundColor: "#4285f4" }}
                onClick={() =>
                  props.callback(
                    <CommonModal
                      key="yes"
                      data={{
                        open: true,
                        heading: "",
                        header: "",
                        size: "sm",
                        body: (
                          <Message
                            key="yes"
                            data={{
                              title: "",
                              content: name + " has been deleted successfully",
                            }}
                          />
                        ),
                      }}
                    />
                  )
                }
              />
              <input
                type="button"
                className="button"
                value="Cancel"
                style={{ backgroundColor: "grey" }}
                onClick={() => {
                  props.callback(false);
                }}
              />
            </center>
          ) : (
            <center>
              <input
                type="button"
                className="button"
                value="Ok"
                style={{ backgroundColor: "#4285f4" }}
                onClick={() => {
                  props.callback(false);
                  window.location.reload(false);
                }}
              />
            </center>
          )}
        </div>
      </div>
    </div>
  );
}
export default Message;

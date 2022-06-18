import ServicesList from "../ServiceLocations/manageLocations/serviceslist";
export default function LinkedServices(props) {
  return (
    <div>
      <ServicesList filter={false} />
      <div className="ModalButton">
        <center>
          <input
            type="submit"
            className="button"
            value="Save"
            style={{ backgroundColor: "#4285f4" }}
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
      </div>
    </div>
  );
}

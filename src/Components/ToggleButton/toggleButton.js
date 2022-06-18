import "./toggleButton.scss";
function ToggleButton(props) {
  return (
    <div className="toggleButton">
      <label className="switch">
        <input type="checkbox" defaultChecked={props.data.state} />
        <span className="slider round"></span>
      </label>
    </div>
  );
}
export default ToggleButton;
